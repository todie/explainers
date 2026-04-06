#!/usr/bin/env node
/**
 * One-shot uploader: pushes the local plaintext src/private/content/*.md
 * files to the Cloudflare R2 bucket so the build pipeline can fetch them.
 *
 * Run this ONCE when migrating off the in-repo git-crypt content. After
 * the upload succeeds and you've verified the build works via the fetch
 * script, you can `git rm src/private/content/*.md` and remove the
 * git-crypt filter from .gitattributes.
 *
 * Required environment variables:
 *   R2_ACCOUNT_ID         — Cloudflare account id
 *   R2_BUCKET             — bucket name (default: explainers-private-docs)
 *   R2_ACCESS_KEY_ID      — R2 token access key
 *   R2_SECRET_ACCESS_KEY  — R2 token secret
 *
 * Usage:
 *   git crypt unlock                          # ensure files are plaintext
 *   export R2_ACCOUNT_ID=07ae57cca8fc1a438f9c9b875d1e2283
 *   export R2_ACCESS_KEY_ID=...
 *   export R2_SECRET_ACCESS_KEY=...
 *   node scripts/upload-private-to-r2.mjs
 */

import { createHash, createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const SOURCE_DIR = resolve(REPO_ROOT, 'src/private/content')

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
const REGION = 'auto'
const SERVICE = 's3'

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

function buildAuthHeader({ method, host, path, payload, contentType }) {
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const payloadHash = sha256Hex(payload)

  // Canonical headers must be alphabetically sorted by lowercased name.
  const headerEntries = [
    ['content-type', contentType],
    ['host', host],
    ['x-amz-content-sha256', payloadHash],
    ['x-amz-date', amzDate],
  ]
  const canonicalHeaders = headerEntries.map(([k, v]) => `${k}:${v}`).join('\n') + '\n'
  const signedHeaders = headerEntries.map(([k]) => k).join(';')

  const canonicalRequest = [
    method,
    path,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')

  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n')

  const sigKey = signingKey(SECRET_KEY, dateStamp, REGION, SERVICE)
  const signature = createHmac('sha256', sigKey).update(stringToSign).digest('hex')

  return {
    Host: host,
    'Content-Type': contentType,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    Authorization:
      `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`,
  }
}

async function uploadObject(key, body) {
  const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`
  const path = `/${BUCKET}/${encodeURIComponent(key)}`
  const url = `https://${host}${path}`
  const contentType = 'text/markdown; charset=utf-8'

  const headers = buildAuthHeader({
    method: 'PUT',
    host,
    path,
    payload: body,
    contentType,
  })

  const res = await fetch(url, { method: 'PUT', headers, body })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`R2 PUT ${key} failed: ${res.status} ${res.statusText}\n${text.slice(0, 500)}`)
  }
}

async function main() {
  if (!ACCOUNT_ID || !ACCESS_KEY || !SECRET_KEY) {
    console.error('error: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY must all be set')
    process.exit(1)
  }
  console.log(`uploading ${PRIVATE_FILES.length} files to r2://${BUCKET}/`)
  for (const key of PRIVATE_FILES) {
    const body = await readFile(resolve(SOURCE_DIR, key), 'utf8')
    await uploadObject(key, body)
    console.log(`  ✓ ${key} (${body.length} chars)`)
  }
  console.log('done.')
}

main().catch(err => {
  console.error(`FAILED: ${err.message}`)
  process.exit(1)
})
