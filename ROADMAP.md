# Roadmap

Loose ordering of what's coming. Update as priorities shift.

## Now

- [x] Per-route OG meta tags for fancy link embeds
- [x] Private documents section gated by Cloudflare Access (R2 + Pages Functions + CF Access on `/api/private/*`)
- [x] Canonical URL → `explain.todie.io` (with `rant.todie.io` as alias)
- [x] Migrate hosting to Cloudflare Pages
- [x] Add `rant.todie.io` as second custom domain on the CF Pages project
- [ ] Switch CF Pages project from direct-upload to Git integration (TOD-306)

## Next

- [ ] **Per-mode component tags** — let explainer pages opt into rendering different content based on which subdomain the visitor is on. Working sketch:

  ```jsx
  import { Mode, Explain, Rant } from '../shared/mode'

  <Explain>
    <p>The retrieval-augmented generation pipeline shown above…</p>
  </Explain>

  <Rant>
    <p>Look, RAG is just "grep + concatenate" with extra steps, but…</p>
  </Rant>
  ```

  - `<Explain>` renders only on `explain.todie.io`
  - `<Rant>` renders only on `rant.todie.io`
  - Default content (no wrapper) renders on both
  - Detection: `window.location.hostname.startsWith('rant.')`
  - Default to `explain` mode for SSR / build-time / unknown hosts
  - This is the foundation for "same content, two voices" — explain is the rigorous deep-dive, rant is the irreverent take, and most of each page is shared

- [ ] Promote private docs to full React explainers as time allows. Each doc in the `explainers-private-docs` R2 bucket is a queue item, not a final form.

- [ ] Reduce main bundle (currently ~590KB gzipped 178KB). Code-split the explainer apps via `React.lazy`.

## Maybe

- [ ] RSS feed for explainer updates
- [ ] Search across all explainer text (lunr or pagefind)
- [ ] Dark/light theme toggle (currently dark only)
- [ ] CF Pages Function for hostname-aware OG tags so `rant.todie.io` shares show "Rants — todie.io" while still canonicalizing to explain
