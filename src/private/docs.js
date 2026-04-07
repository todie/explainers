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

/**
 * Cloudflare Access sends unauthenticated requests to a 302 redirect on
 * `<team>.cloudflareaccess.com`, which is cross-origin to `explain.todie.io`.
 * The browser's fetch() with default `redirect: 'follow'` will try to follow
 * that redirect cross-origin, fail CORS preflight on the Access hostname,
 * and reject with a TypeError (`Failed to fetch`). That's the signal that
 * auth is required — we detect it in two ways:
 *
 *   1. `redirect: 'manual'` → an intercepted cross-origin redirect returns
 *      `Response { type: 'opaqueredirect', status: 0 }` instead of throwing.
 *   2. If the browser still throws a TypeError (older engines / strict CORS
 *      policies), we catch it and also treat as unauthorized.
 *
 * A same-origin 401 from the Pages Function (e.g. the defense-in-depth
 * header check failing) is also handled. All three paths converge to
 * UnauthorizedError so the UI can show the "Sign in" CTA.
 */
async function apiFetch(path, accept) {
  let res
  try {
    res = await fetch(path, {
      credentials: 'include',
      headers: { Accept: accept },
      redirect: 'manual',
    })
  } catch (err) {
    // CORS preflight failure on cross-origin Access redirect → treat as auth needed
    const e = new UnauthorizedError()
    e.cause = err
    throw e
  }
  if (res.type === 'opaqueredirect' || res.status === 0) {
    throw new UnauthorizedError()
  }
  if (res.status === 401) {
    throw new UnauthorizedError()
  }
  return res
}

export async function fetchCatalog() {
  const res = await apiFetch(`${API_BASE}/`, 'application/json')
  if (!res.ok) {
    throw new Error(`catalog fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function fetchDoc(id) {
  const res = await apiFetch(`${API_BASE}/${encodeURIComponent(id)}`, 'text/markdown')
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
 * GET. Access sees no auth cookie → 302s to the Access login flow → user
 * authenticates → Access 302s back to /api/private/ with a session cookie.
 *
 * The Pages Function at /api/private/ detects browser navigation (Accept
 * header contains text/html) vs XHR requests and, for browser navigation,
 * responds with a 302 to /private so the user lands back on the real app
 * instead of seeing raw JSON.
 */
export function redirectToLogin() {
  window.location.href = '/api/private/'
}
