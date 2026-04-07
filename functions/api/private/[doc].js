// Cloudflare Pages Function: private document fetcher.
//
// Serves individual markdown docs from the explainers-private-docs R2 bucket.
// Protected at the edge by a Cloudflare Access application on
// `explain.todie.io/api/private/*`. When a request reaches this function,
// Cloudflare Access has already validated the visitor's identity via SSO /
// email OTP / whatever policy is configured in Zero Trust.
//
// The authenticated user's email is injected by Access as the
// `Cf-Access-Authenticated-User-Email` header. We defensively require it
// here too — if for any reason the Access policy is misconfigured and
// requests arrive without the header, we return 401 instead of leaking
// content. This is defense in depth; the edge policy is the primary gate.
//
// The function also enforces the list of known doc slugs to prevent
// arbitrary R2 object path access via path traversal or guessed keys.
//
// Required Pages Function bindings (Settings → Functions → R2 bindings):
//   PRIVATE_DOCS  →  explainers-private-docs

const ALLOWED_DOCS = new Set([
  'market-research-full',
  'market-research-short',
  'term-sheet',
  'financial-model',
  'mission-statement',
  'founder-intake-alex',
  'brand-guide',
  'portfolio-scorecard',
  'memory-system-rework',
  'hypothesis-v2-bipolar-ii',
  'neurochemistry-session',
  'context-memory-citations',
])

// Maps the URL slug to the R2 object key.
function slugToKey(slug) {
  // R2 object keys use the NN-slug.md layout. We enforce a known mapping so
  // callers can't influence the R2 key.
  const map = {
    'market-research-full': '01-market-research-full.md',
    'market-research-short': '02-market-research-short.md',
    'term-sheet': '03-term-sheet.md',
    'financial-model': '04-financial-model.md',
    'mission-statement': '05-mission-statement.md',
    'founder-intake-alex': '06-founder-intake-alex.md',
    'brand-guide': '07-brand-guide.md',
    'portfolio-scorecard': '08-portfolio-scorecard.md',
    'memory-system-rework': '09-memory-system-rework.md',
    'hypothesis-v2-bipolar-ii': '10-hypothesis-v2-bipolar-ii.md',
    'neurochemistry-session': '11-neurochemistry-session.md',
    'context-memory-citations': '12-context-memory-citations.md',
  }
  return map[slug]
}

export async function onRequestGet({ params, env, request }) {
  const slug = params.doc

  // Validate slug before touching R2
  if (!slug || !ALLOWED_DOCS.has(slug)) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  // Defense in depth: ensure CF Access actually gated this request. The
  // primary gate is the Access policy on /api/private/* in Zero Trust.
  const user = request.headers.get('Cf-Access-Authenticated-User-Email')
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  // Fetch from R2 binding
  if (!env.PRIVATE_DOCS) {
    // Binding missing — surface the config error clearly, but don't leak
    // any content (there isn't any to leak at this point).
    return new Response('Server misconfigured: PRIVATE_DOCS R2 binding not attached', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const key = slugToKey(slug)
  const obj = await env.PRIVATE_DOCS.get(key)
  if (!obj) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  const body = await obj.text()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Never cache authenticated content at the edge or in intermediaries.
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })
}

// Block all other methods explicitly.
export async function onRequest({ request }) {
  if (request.method === 'GET') {
    // Fall through — onRequestGet handles it.
    return
  }
  return new Response('Method not allowed', {
    status: 405,
    headers: { 'Content-Type': 'text/plain', Allow: 'GET' },
  })
}
