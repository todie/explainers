# /private — runtime-fetched source notes

Private markdown documents stored in **Cloudflare R2** and served via
**CF Pages Functions** gated by **Cloudflare Access**. The content is never
bundled into the public JS chunks, so it cannot be extracted by scraping the
CDN.

## Architecture

```
Browser
  ├─ GET /private                         (public React app, no content)
  ├─ GET /api/private/                    → CF Access gate
  │                                          ↓ on auth success
  │                                       → Pages Function returns catalog JSON
  └─ GET /api/private/<doc>               → CF Access gate
                                             ↓ on auth success
                                          → Pages Function reads R2 binding
                                             PRIVATE_DOCS → explainers-private-docs
                                          → returns markdown body
```

- **React app** (`App.jsx`) renders the catalog + markdown but holds **zero
  content at build time**. Calls `fetchCatalog()` on mount.
- **Pages Functions** (`functions/api/private/index.js`,
  `functions/api/private/[doc].js`) validate the
  `Cf-Access-Authenticated-User-Email` header (defense in depth — the
  primary gate is the CF Access application config) and fetch from the R2
  binding.
- **R2 bucket** `explainers-private-docs` holds the markdown objects. Contents
  are uploaded out of band (see "Adding a doc" below); the repo contains no
  copy of them.

## Why this exists

These are **working notes** — Linear exports, founder diligence drafts, deal
templates, financial models, research material — version-controlled elsewhere
but served from this site to a small audience behind SSO.

## Adding a doc

1. Drop the markdown file in your local source of truth (wherever that is).
2. Upload it to the R2 bucket with a key like `NN-slug.md`:
   ```bash
   source ~/.secrets    # loads CLOUDFLARE_CLAUDE_EXPLAINERS_R2_PAGES_TOKEN
   ACCOUNT=07ae57cca8fc1a438f9c9b875d1e2283
   BUCKET=explainers-private-docs
   KEY=NN-slug.md
   curl -X PUT \
     -H "Authorization: Bearer $CLOUDFLARE_CLAUDE_EXPLAINERS_R2_PAGES_TOKEN" \
     -H "Content-Type: text/markdown" \
     --data-binary @"/path/to/$KEY" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/r2/buckets/$BUCKET/objects/$KEY"
   ```
3. Add the slug to `ALLOWED_DOCS` + `slugToKey` in
   `functions/api/private/[doc].js`.
4. Add the metadata (id, title, category, date) to `CATALOG.docs` in
   `functions/api/private/index.js`.
5. Commit + push + deploy.

## Removing a doc

```bash
curl -X DELETE \
  -H "Authorization: Bearer $CLOUDFLARE_CLAUDE_EXPLAINERS_R2_PAGES_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/r2/buckets/$BUCKET/objects/$KEY"
```

Then remove from `ALLOWED_DOCS`, `slugToKey`, and `CATALOG.docs`.

## Access policy

The CF Access application on `explain.todie.io/api/private/*` is configured
in the Cloudflare Zero Trust dashboard. Current policy: email matches specific
allowed addresses. To add a new reader, add their email under
Zero Trust → Access → Applications → `explainers-private`.

No secrets live in the repo. The Pages Function uses an R2 binding
(`PRIVATE_DOCS`, declared in `wrangler.toml` and attached in the CF Pages
dashboard under Settings → Functions → R2 bindings), not a token.
