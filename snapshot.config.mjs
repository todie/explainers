/**
 * uri-snapshot config for todie/explainers
 * Generates preview images for the emotional-topology explainer project cards.
 * Run: node_modules/.bin/uri-snapshot --config snapshot.config.mjs
 */

/** @type {import('@todie/uri-snapshot').SnapshotOptions} */
export default {
  outDir: './public/previews',
  format: 'jpeg',
  quality: 85,
  viewport: { width: 1200, height: 630 },
  timeout: 20000,
  waitUntil: 'load',
  fullPage: false,
  targets: [
    { id: 'nahbro',         url: 'https://nahbro.dev' },
    { id: 'mcp-honeypot',   url: 'https://honeypot.vip' },
    { id: 'reach',          url: 'https://github.com/todie/reach' },
    { id: 'revenant',       url: 'https://github.com/todie/revenant' },
    { id: 'sessionswipe',   url: 'https://github.com/todie/sessionswipe' },
    { id: 'tradecraft',     url: 'https://github.com/todie/engram-rs' },
  ],
}
