// Cloudflare Pages Function: list private document metadata.
//
// Returns the catalog of available private docs (id, title, category, date)
// WITHOUT their content. The frontend calls this on /private load to render
// the sidebar; individual doc bodies come from /api/private/[doc] on demand.
//
// Same auth model as /api/private/[doc]:
// - Cloudflare Access gates the path in Zero Trust (primary gate)
// - This function re-checks Cf-Access-Authenticated-User-Email (defense in depth)
//
// The catalog is statically baked into this function so we don't have to
// iterate R2 objects on every call. Adding a doc: update ALLOWED_DOCS here
// AND in [doc].js AND in the R2 bucket.

const CATALOG = {
  categories: [
    { id: 'unsigned-gg', label: 'unsigned.gg', icon: '🟢' },
    { id: 'research', label: 'Research', icon: '🧠' },
    { id: 'reverie', label: 'Reverie', icon: '💤' },
  ],
  docs: [
    {
      id: 'market-research-full',
      title: 'Market Research: Revenue Floor — Full Brief',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'market-research-short',
      title: 'Market Research: Revenue Floor — Executive Summary',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'term-sheet',
      title: 'Term Sheet: GTM-for-Equity Studio Deal',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'financial-model',
      title: 'Studio Financial Model v1',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'mission-statement',
      title: 'Mission Statement',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'founder-intake-alex',
      title: 'Founder Intake: Alex — Cludcode.com',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'brand-guide',
      title: 'Brand Guide v1.0',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'portfolio-scorecard',
      title: 'Portfolio Intake Scorecard v1',
      category: 'unsigned-gg',
      date: '2026-04-04',
    },
    {
      id: 'memory-system-rework',
      title: 'Research Inventory: Memory System Rework',
      category: 'research',
      date: '2026-04-04',
    },
    {
      id: 'hypothesis-v2-bipolar-ii',
      title: 'Hypothesis v2: Bipolar II as Emergent Phenomenon',
      category: 'reverie',
      date: '2026-04-06',
    },
    {
      id: 'neurochemistry-session',
      title: 'Neurochemistry, Medication Stack, Sleep Architecture',
      category: 'reverie',
      date: '2026-04-06',
    },
    {
      id: 'context-memory-citations',
      title: 'Citations: Context, Memory, and Expert-System Tuning',
      category: 'research',
      date: '2026-04-06',
    },
  ],
}

export async function onRequestGet({ request }) {
  const user = request.headers.get('Cf-Access-Authenticated-User-Email')
  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  return new Response(JSON.stringify(CATALOG), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store, max-age=0',
    },
  })
}

export async function onRequest({ request }) {
  if (request.method === 'GET') return
  return new Response('Method not allowed', {
    status: 405,
    headers: { 'Content-Type': 'text/plain', Allow: 'GET' },
  })
}
