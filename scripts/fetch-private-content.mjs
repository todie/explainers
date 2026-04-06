#!/usr/bin/env node
/**
 * Fetch private markdown content from a Cloudflare R2 bucket into
 * src/private/.cache/. Runs as the npm `prebuild` step.
 *
 * Required environment variables (set as CF Pages build env vars and
 * GitHub Actions secrets):
 *   R2_ACCOUNT_ID         — Cloudflare account id (e.g. 07ae57c...2283)
 *   R2_BUCKET             — bucket name (e.g. explainers-private-docs)
 *   R2_ACCESS_KEY_ID      — R2 token access key
 *   R2_SECRET_ACCESS_KEY  — R2 token secret
 *
 * Behavior:
 *   - If all four env vars are set: fetches each file in PRIVATE_FILES
 *     from R2 over its S3-compatible endpoint and writes to .cache/.
 *     Build fails on any 4xx/5xx.
 *   - If env vars are NOT set: assumes the cache is populated locally
 *     (e.g. by `git crypt unlock` + `cp src/private/content/* .cache/`
 *     or by a previous fetch) and exits 0 with a warning. This keeps
 *     local dev working while you migrate.
 *   - The cache dir is gitignored.
 *
 * Why pure-Node SigV4 instead of @aws-sdk/client-s3:
 *   - Zero new dependencies.
 *   - The script is fully auditable in ~150 lines.
 *   - Works in any Node 18+ environment (CF Pages, GH Actions, local).
 */

import { createHash, createHmac } from 'node:crypto'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const CACHE_DIR = resolve(REPO_ROOT, 'src/private/.cache')

// Source-of-truth list of private files. Mirrors src/private/docs.js.
// If you add a doc, add it here AND to docs.js AND upload it to R2.
const PRIVATE_FILES = [
  '01-market-research-full.md',
  '02-market-research-short.md',
  '03-term-sheet.md',
  '04-financial-model.md',
  '05-mission-statement.md',
  '06-founder-intake-alex.md',
  '07-brand-guide.md',
  '08-portfolio-scorecard.md',
  '09-memory-system-rework.md',
  '10-hypothesis-v2-bipolar-ii.md',
  '11-neurochemistry-session.md',
]

const env = process.env
const ACCOUNT_ID = env.R2_ACCOUNT_ID
const BUCKET = env.R2_BUCKET || 'explainers-private-docs'
const ACCESS_KEY = env.R2_ACCESS_KEY_ID
const SECRET_KEY = env.R2_SECRET_ACCESS_KEY
const REGION = 'auto' // R2 uses 'auto' as the region for SigV4
const SERVICE = 's3'

// ────────────────────────────────────────────────────────────────────
// AWS SigV4 implementation (R2 is S3-compatible)
// Reference: https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
// ────────────────────────────────────────────────────────────────────

function sha256Hex(data) {
  return createHash('sha256').update(data).digest('hex')
}

function hmac(key, data) {
  return createHmac('sha256', key).update(data).digest()
}

function signingKey(secret, dateStamp, region, service) {
  const kDate = hmac('AWS4' + secret, dateStamp)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, service)
  return hmac(kService, 'aws4_request')
}

function buildAuthHeader({ accessKey, secret, method, host, path, region, service }) {
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const payloadHash = sha256Hex('')
  const canonicalHeaders =
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'

  const canonicalRequest = [
    method,
    path,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n')

  const sigKey = signingKey(secret, dateStamp, region, service)
  const signature = createHmac('sha256', sigKey).update(stringToSign).digest('hex')

  const authHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`

  return {
    Host: host,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    Authorization: authHeader,
  }
}

async function fetchObject(key) {
  const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`
  const path = `/${BUCKET}/${encodeURIComponent(key)}`
  const url = `https://${host}${path}`

  const headers = buildAuthHeader({
    accessKey: ACCESS_KEY,
    secret: SECRET_KEY,
    method: 'GET',
    host,
    path,
    region: REGION,
    service: SERVICE,
  })

  const res = await fetch(url, { method: 'GET', headers })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`R2 GET ${key} failed: ${res.status} ${res.statusText}\n${body.slice(0, 500)}`)
  }
  return await res.text()
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(CACHE_DIR, { recursive: true })

  if (!ACCOUNT_ID || !ACCESS_KEY || !SECRET_KEY) {
    // Local dev fallback path 1: cache already populated → use it as-is
    const allCached = PRIVATE_FILES.every(f => existsSync(resolve(CACHE_DIR, f)))
    if (allCached) {
      console.log('[fetch-private] R2 env vars not set; using existing local cache')
      return
    }

    // Local dev fallback path 2: copy from src/private/content/ if it exists
    // and is plaintext (i.e. git-crypt has been unlocked locally).
    const localContentDir = resolve(REPO_ROOT, 'src/private/content')
    const localExists = PRIVATE_FILES.every(f => existsSync(resolve(localContentDir, f)))
    if (localExists) {
      console.log('[fetch-private] R2 env vars not set; copying from local src/private/content/')
      for (const key of PRIVATE_FILES) {
        const body = await readFile(resolve(localContentDir, key), 'utf8')
        // Sanity check: if the first byte is the git-crypt magic NUL, the
        // local files are still encrypted — bail with a useful message.
        if (body.charCodeAt(0) === 0) {
          console.error(
            `[fetch-private] error: ${key} appears to still be git-crypt encrypted.\n` +
            `  Run \`git crypt unlock\` first, or set R2_* env vars to fetch from R2.`
          )
          process.exit(1)
        }
        await writeFile(resolve(CACHE_DIR, key), body, 'utf8')
      }
      console.log(`[fetch-private] copied ${PRIVATE_FILES.length} files from local content dir`)
      return
    }

    console.warn(
      '[fetch-private] R2 env vars not set AND no local source found.\n' +
      '\n' +
      '  For local dev: `git crypt unlock` so src/private/content/*.md is plaintext.\n' +
      '  For CI builds: set R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.\n' +
      '\n' +
      'Build will continue but the /private route will render empty.'
    )
    return
  }

  console.log(`[fetch-private] fetching ${PRIVATE_FILES.length} files from r2://${BUCKET}/`)
  let bytes = 0
  for (const key of PRIVATE_FILES) {
    const body = await fetchObject(key)
    await writeFile(resolve(CACHE_DIR, key), body, 'utf8')
    bytes += Buffer.byteLength(body, 'utf8')
    process.stdout.write(`  ✓ ${key} (${body.length} chars)\n`)
  }
  console.log(`[fetch-private] done — ${PRIVATE_FILES.length} files, ${bytes} bytes total`)
}

main().catch(err => {
  console.error(`[fetch-private] FAILED: ${err.message}`)
  process.exit(1)
})
