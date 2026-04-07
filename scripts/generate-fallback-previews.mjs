#!/usr/bin/env node
/**
 * Generate fallback OG preview JPEGs for every explainer.
 *
 * Why this exists:
 *   Slack / iMessage / Twitter / LinkedIn unfurlers fetch the `og:image`
 *   URL when a link is posted. If that URL 404s (or worse, returns the
 *   SPA-fallback HTML that Cloudflare Pages serves for unknown paths),
 *   the unfurl shows no image or looks broken.
 *
 *   The CI workflow at .github/workflows/generate-previews.yml takes
 *   real Playwright screenshots of each route and commits them, but it
 *   runs weekly and can miss newly-added routes. This script produces
 *   branded ImageMagick-generated placeholders so every route has a
 *   guaranteed-good preview image immediately.
 *
 * Usage:
 *   node scripts/generate-fallback-previews.mjs           # regenerate all
 *   node scripts/generate-fallback-previews.mjs --force   # overwrite real screenshots
 *
 *   Requires ImageMagick 6+ (`convert` on $PATH). Not invoked by `npm run build` —
 *   CI runs Playwright instead. Run manually when adding a new explainer.
 */

import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = join(ROOT, 'public', 'previews')
mkdirSync(OUT, { recursive: true })

// Parse explainers registry without importing (project is type:commonjs)
const src = readFileSync(join(ROOT, 'src', 'shared', 'explainers.js'), 'utf-8')
const match = src.match(/\[[\s\S]*\]/)
if (!match) throw new Error('Could not parse EXPLAINERS array')
const EXPLAINERS = new Function(`return ${match[0]}`)()

const force = process.argv.includes('--force')

// Brand palette — matches src/shared/Home.jsx gradient
const BG = 'gradient:#0a0510-#030712'

// Per-explainer accent (maps to the hero gradient on each page)
const ACCENTS = {
  'memory-model':      '#60a5fa',  // blue
  'gestalt':           '#a855f7',  // purple
  'prompt-cache':      '#34d399',  // green
  'lsp':               '#facc15',  // yellow
  'token-optimization':'#f59e0b',  // amber
  'reverie':           '#8b5cf6',  // violet
  'emotional-topology':'#ec4899',  // pink
  'pidgin-tokens':     '#f87171',  // red
  'home':              '#60a5fa',
}

function render({ id, title, short }, outfile) {
  const accent = ACCENTS[id] || '#60a5fa'
  // Escape single quotes in strings passed to annotate
  const esc = (s) => s.replace(/'/g, "'\\''").replace(/:/g, '\\:')
  const args = [
    '-size', '1200x630',
    '-define', 'gradient:angle=135',
    BG,
    // Top-left brand label
    '-fill', accent,
    '-font', 'DejaVu-Sans-Bold',
    '-pointsize', '16',
    '-gravity', 'NorthWest',
    '-annotate', '+72+84', 'TODIE.IO / EXPLAINERS',
    // Huge title
    '-fill', '#f3f4f6',
    '-font', 'DejaVu-Sans-Bold',
    '-pointsize', '88',
    '-annotate', '+72+140', esc(title),
    // Subtitle
    '-fill', '#9ca3af',
    '-font', 'DejaVu-Sans',
    '-pointsize', '32',
    '-annotate', '+72+290', esc(short),
    // Bottom-left canonical URL
    '-fill', '#6b7280',
    '-font', 'DejaVu-Sans',
    '-pointsize', '20',
    '-annotate', '+72+500', 'explain.todie.io',
    // Accent stripe on the left
    '-fill', accent,
    '-draw', 'rectangle 0,0 8,630',
    '-quality', '88',
    outfile,
  ]
  execFileSync('/usr/bin/convert', args, { stdio: 'inherit' })
}

// Home card
const homeOut = join(OUT, 'home.jpeg')
if (force || !existsSync(homeOut)) {
  render(
    { id: 'home', title: 'Explainers', short: 'Visual deep-dives into how things work.' },
    homeOut,
  )
  console.log(`  home.jpeg`)
}

for (const ex of EXPLAINERS) {
  const out = join(OUT, `${ex.id}.jpeg`)
  if (!force && existsSync(out)) {
    console.log(`  ${ex.id}.jpeg (exists, skip)`)
    continue
  }
  render(ex, out)
  console.log(`  ${ex.id}.jpeg`)
}

console.log(`\nGenerated fallback previews in ${OUT}`)
