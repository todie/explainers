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

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
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

// Default fallback image for any route whose dedicated preview hasn't
// been generated yet. Committed in public/previews/home.jpeg, so it is
// always available on the deployed site.
const FALLBACK_IMAGE = `${SITE}${BASE}/previews/home.jpeg`

// Check whether a route-specific preview exists in the built dist/previews
// directory. If not, fall back to the home preview so unfurlers never 404.
function previewFor(id) {
  const jpeg = join(DIST, 'previews', `${id}.jpeg`)
  return existsSync(jpeg) ? `${SITE}${BASE}/previews/${id}.jpeg` : FALLBACK_IMAGE
}

function writePage({ outDir, title, description, url, image, imageAlt }) {
  // Replace the generic OG tags with per-route values. The template
  // already has og:image:type/alt/width/height + twitter:image:alt so we
  // only need to rewrite the mutable fields here.
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
    .replace(/og:title" content="[^"]*"/, `og:title" content="${title}"`)
    .replace(/og:description" content="[^"]*"/, `og:description" content="${description}"`)
    .replace(/og:url" content="[^"]*"/, `og:url" content="${url}"`)
    .replace(/og:image" content="[^"]*"/, `og:image" content="${image}"`)
    .replace(/og:image:alt" content="[^"]*"/, `og:image:alt" content="${imageAlt}"`)
    .replace(/twitter:title" content="[^"]*"/, `twitter:title" content="${title}"`)
    .replace(/twitter:description" content="[^"]*"/, `twitter:description" content="${description}"`)
    .replace(/twitter:image" content="[^"]*"/, `twitter:image" content="${image}"`)
    .replace(/twitter:image:alt" content="[^"]*"/, `twitter:image:alt" content="${imageAlt}"`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)

  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

let fellBack = 0
for (const ex of EXPLAINERS) {
  const title = `${ex.title} — todie.io`
  const description = ex.short
  const url = `${SITE}${BASE}${ex.path}`
  const image = previewFor(ex.id)
  if (image === FALLBACK_IMAGE) fellBack++

  writePage({
    outDir: join(DIST, ex.id),
    title,
    description,
    url,
    image,
    imageAlt: `${ex.title} — ${ex.short}`,
  })

  const marker = image === FALLBACK_IMAGE ? ' (fallback image)' : ''
  console.log(`  ${ex.icon} ${ex.id}/index.html${marker}`)
}

// Generate auth-gated pages. These share the home preview and do not
// need per-route screenshots.
const extraPages = [
  { id: 'private', title: 'Private Documents', short: 'Authorized access only' },
]

for (const page of extraPages) {
  const title = `${page.title} — todie.io`
  const url = `${SITE}${BASE}/${page.id}`
  writePage({
    outDir: join(DIST, page.id),
    title,
    description: page.short,
    url,
    image: FALLBACK_IMAGE,
    imageAlt: `${page.title} — ${page.short}`,
  })
  console.log(`  🔒 ${page.id}/index.html`)
}

const total = EXPLAINERS.length + extraPages.length
console.log(
  `\nGenerated ${total} OG pages (${EXPLAINERS.length} explainers + ${extraPages.length} extra).` +
  (fellBack > 0 ? ` ${fellBack} using fallback image — run Playwright preview workflow to refresh.` : '')
)
