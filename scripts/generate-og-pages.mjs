#!/usr/bin/env node
/**
 * Post-build: generate per-route HTML files with unique OG meta tags.
 *
 * Reads the built dist/index.html as a template, then for each explainer
 * creates dist/{id}/index.html with the correct og:title, og:description,
 * og:image, og:url, and twitter:* tags so link unfurlers show rich embeds.
 *
 * OG images are generated separately by uri-snapshot in CI.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
// Canonical URL — explain.todie.io is the official home; rant.todie.io is
// an alias served from the same origin. All OG/canonical tags point at the
// canonical so search engines and link unfurlers see one source of truth.
const SITE = 'https://explain.todie.io'
const BASE = ''

// Parse the explainers registry from source (CJS module with `export const`)
// We extract the array literal rather than importing, since the project is type:commonjs
const srcText = readFileSync(join(ROOT, 'src', 'shared', 'explainers.js'), 'utf-8')
const arrayMatch = srcText.match(/\[[\s\S]*\]/)
if (!arrayMatch) throw new Error('Could not parse EXPLAINERS array from src/shared/explainers.js')
const EXPLAINERS = new Function(`return ${arrayMatch[0]}`)()

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

for (const ex of EXPLAINERS) {
  const title = `${ex.title} — todie.io`
  const description = ex.short
  const url = `${SITE}${BASE}${ex.path}`
  const image = `${SITE}${BASE}/previews/${ex.id}.jpeg`

  // Replace the generic OG tags with per-route values
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
    .replace(/og:title" content="[^"]*"/, `og:title" content="${title}"`)
    .replace(/og:description" content="[^"]*"/, `og:description" content="${description}"`)
    .replace(/og:url" content="[^"]*"/, `og:url" content="${url}"`)
    .replace(/og:image" content="[^"]*"/, `og:image" content="${image}"`)
    .replace(/twitter:title" content="[^"]*"/, `twitter:title" content="${title}"`)
    .replace(/twitter:description" content="[^"]*"/, `twitter:description" content="${description}"`)
    .replace(/twitter:image" content="[^"]*"/, `twitter:image" content="${image}"`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)

  const outDir = join(DIST, ex.id)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)

  console.log(`  ${ex.icon} ${ex.id}/index.html`)
}

// Generate auth-gated pages (no unique OG image, just title/desc)
const extraPages = [
  { id: 'private', title: 'Private Documents', short: 'Authorized access only' },
]

for (const page of extraPages) {
  const title = `${page.title} — todie.io`
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/og:title" content="[^"]*"/, `og:title" content="${title}"`)
    .replace(/og:description" content="[^"]*"/, `og:description" content="${page.short}"`)
    .replace(/og:url" content="[^"]*"/, `og:url" content="${SITE}${BASE}/${page.id}"`)
    .replace(/twitter:title" content="[^"]*"/, `twitter:title" content="${title}"`)
    .replace(/twitter:description" content="[^"]*"/, `twitter:description" content="${page.short}"`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${page.short}"`)

  const outDir = join(DIST, page.id)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log(`  🔒 ${page.id}/index.html`)
}

console.log(`\nGenerated OG pages for ${EXPLAINERS.length} explainers + ${extraPages.length} extra pages.`)
