/**
 * Private document registry — runtime fetch via CF Access-gated API.
 *
 * Unlike the previous build-time `?raw` import approach this replaces,
 * private docs are NOT bundled into the public JS chunks. They live only
 * in the Cloudflare R2 bucket `explainers-private-docs` and are served by
 * CF Pages Functions at:
 *
 *   GET /api/private/            — catalog (categories + docs list, no bodies)
 *   GET /api/private/:id         — individual markdown doc body
 *
 * Both endpoints are gated by a Cloudflare Access application on the
 * `/api/private/*` path. When a user hits the endpoints, Access intercepts
 * and routes them through email OTP / SSO. After successful auth, Access
 * forwards to the Pages Function with an `Cf-Access-Authenticated-User-Email`
 * header, which the function checks defensively before touching R2.
 *
 * The frontend flow:
 *   1. User navigates to /private
 *   2. PrivateApp calls fetchCatalog() → GET /api/private/
 *   3. If 401: redirect via CF Access SSO, then retry
 *   4. On success, render the doc list
 *   5. User clicks a doc → fetchDoc(id) → GET /api/private/<id>
 *   6. Render markdown
 *
 * To add a doc:
 *   1. Upload NN-name.md to the explainers-private-docs R2 bucket
 *      (via the R2 dashboard or a local one-shot upload script).
 *   2. Add the slug to ALLOWED_DOCS + slugToKey in functions/api/private/[doc].js.
 *   3. Add the metadata entry to CATALOG.docs in functions/api/private/index.js.
 */

const API_BASE = '/api/private'

class UnauthorizedError extends Error {
  constructor() {
    super('unauthorized')
    this.name = 'UnauthorizedError'
    this.status = 401
  }
}

export async function fetchCatalog() {
  const res = await fetch(`${API_BASE}/`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (res.status === 401) throw new UnauthorizedError()
  if (!res.ok) {
    throw new Error(`catalog fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function fetchDoc(id) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    credentials: 'include',
    headers: { Accept: 'text/markdown' },
  })
  if (res.status === 401) throw new UnauthorizedError()
  if (res.status === 404) {
    const err = new Error('not found')
    err.status = 404
    throw err
  }
  if (!res.ok) {
    throw new Error(`doc fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.text()
}

/**
 * Trigger CF Access login by navigating to the API endpoint as a top-level
 * GET. Access will intercept, handle SSO, then redirect back to the original
 * URL. We land the user back on /private so the catalog can re-fetch
 * with fresh credentials.
 */
export function redirectToLogin(returnTo = '/private') {
  const next = encodeURIComponent(returnTo)
  // CF Access uses /cdn-cgi/access/login/<aud> under the hood, but the
  // simplest trigger is just hitting the protected endpoint as a top-level
  // navigation — Access sees no auth cookie, 302s to its login flow, then
  // 302s back to this URL on success. We pick /api/private/ because it's
  // guaranteed to be gated.
  window.location.href = `/api/private/?return_to=${next}`
}
