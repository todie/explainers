/**
 * uri-snapshot config for todie/explainers
 *
 * Two target sets:
 *   1. External project cards (upstream URLs, always available)
 *   2. Explainer OG images (local dev server, set EXPLAINER_BASE_URL env var)
 *
 * Run:
 *   # External only (default)
 *   node_modules/.bin/uri-snapshot --config snapshot.config.mjs
 *
 *   # With explainer pages (CI sets the env var after building + serving)
 *   EXPLAINER_BASE_URL=http://localhost:4173/explainers \
 *     node_modules/.bin/uri-snapshot --config snapshot.config.mjs
 */

const BASE = process.env.EXPLAINER_BASE_URL // e.g. http://localhost:4173/explainers

const externalTargets = [
  { id: 'nahbro',         url: 'https://nahbro.dev' },
  { id: 'mcp-honeypot',   url: 'https://honeypot.vip' },
  { id: 'reach',          url: 'https://github.com/todie/reach' },
  { id: 'revenant',       url: 'https://github.com/todie/revenant' },
  { id: 'sessionswipe',   url: 'https://github.com/todie/sessionswipe' },
  { id: 'tradecraft',     url: 'https://github.com/todie/engram-rs' },
]

const explainerTargets = BASE ? [
  { id: 'home',                url: `${BASE}/` },
  { id: 'memory-model',        url: `${BASE}/memory-model` },
  { id: 'gestalt',             url: `${BASE}/gestalt` },
  { id: 'prompt-cache',        url: `${BASE}/prompt-cache` },
  { id: 'lsp',                 url: `${BASE}/lsp` },
  { id: 'token-optimization',  url: `${BASE}/token-optimization` },
  { id: 'reverie',             url: `${BASE}/reverie` },
  { id: 'emotional-topology',  url: `${BASE}/emotional-topology` },
  { id: 'pidgin-tokens',       url: `${BASE}/pidgin-tokens` },
] : []

/** @type {import('@todie/uri-snapshot').SnapshotOptions} */
export default {
  outDir: './public/previews',
  format: 'jpeg',
  quality: 85,
  viewport: { width: 1200, height: 630 },
  timeout: 20000,
  waitUntil: 'load',
  fullPage: false,
  targets: [...externalTargets, ...explainerTargets],
}
