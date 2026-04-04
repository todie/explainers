import { useState } from 'react'

const TECHNIQUES = [
  {
    id: 'normalize',
    title: 'Request Normalization',
    color: '#60a5fa',
    what: 'Strip fields that change between requests but don\'t affect the response: request IDs, timestamps, volatile headers, non-deterministic tool ordering.',
    why: 'The cache key is the request prefix. Any byte difference breaks the cache. A single reordered tool definition invalidates everything.',
    how: 'Sort tool arrays alphabetically. Strip metadata fields. Canonicalize whitespace. Hash the normalized prefix to detect drift.',
    saving: 'Prevents false cache misses. Without this, cache hit rate drops to ~20% even on identical conversations.',
  },
  {
    id: 'breakpoints',
    title: 'Cache Breakpoint Injection',
    color: '#4ade80',
    what: 'Insert cache_control: {"type": "ephemeral"} markers at strategic positions in the message array — typically after the system prompt and after the last assistant turn.',
    why: 'The API caches from the start of the request up to each breakpoint. Breakpoints tell the API "everything before this point is stable — cache it."',
    how: 'Inject breakpoint after system message block (stable across all requests). Inject breakpoint after the last assistant response (stable until next turn). Remove breakpoints from user messages (they change).',
    saving: 'System prompt (often 2-4K tokens) cached for entire session = free after first request.',
  },
  {
    id: 'prefix',
    title: 'Prefix Stability Maximization',
    color: '#a855f7',
    what: 'Ensure the shared prefix between consecutive requests is as long as possible. Every token in the stable prefix is cached; every token after the first difference is reprocessed.',
    why: 'Cache is prefix-based, not content-addressed. If you change anything in the middle of the conversation, everything after that point is a cache miss.',
    how: 'Never reorder messages. Never edit previous turns. Append-only conversation structure. If you must edit, edit only the last message.',
    saving: 'In a 20-turn conversation, request 20 might be 25K tokens with 24K cached — you pay for 1K.',
  },
  {
    id: 'dedup',
    title: 'Tool Definition Deduplication',
    color: '#facc15',
    what: 'Tool definitions are sent on every request and can be 3-5K tokens. If they\'re identical and placed before the conversation, they become part of the cached prefix.',
    why: 'Tools are the biggest chunk of wasted tokens in Claude Code. 50+ tools at ~60 tokens each = 3,000 tokens repeated on every request.',
    how: 'Lock tool definitions to a stable order. Place them in the system message (cached first). Use tool choice to narrow active tools without changing the definition list.',
    saving: '3-5K tokens cached on every request after the first. Over a 50-request session = 150-250K tokens saved.',
  },
  {
    id: 'monitor',
    title: 'Cache Hit Rate Monitoring',
    color: '#f87171',
    what: 'Track cache_read_input_tokens vs input_tokens from the API response. Calculate hit rate per request and across the session.',
    why: 'Without monitoring, you don\'t know if the proxy is working. A single normalization bug can silently drop hit rate to 0%.',
    how: 'Log: total_input, cached_input, cache_hit_rate per request. Alert if hit rate drops below 80% after warmup. Track cumulative savings.',
    saving: 'The monitoring itself doesn\'t save tokens — it prevents the silent failures that waste them.',
  },
]

export default function ProxyTechniques() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Proxy Techniques
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 520, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Five things a caching proxy does to maximize cache hit rate.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 700, margin: '0 auto' }}>
        {TECHNIQUES.map((t) => (
          <div
            key={t.id}
            onClick={() => setExpanded(expanded === t.id ? null : t.id)}
            style={{
              background: expanded === t.id ? `linear-gradient(135deg, #111827 0%, ${t.color}06 100%)` : '#111827',
              border: `1px solid ${expanded === t.id ? t.color + '30' : '#1f2937'}`,
              borderRadius: 14, padding: '20px 24px', cursor: 'pointer', transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.color}, ${t.color}30)` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: t.color }}>{t.title}</span>
              <span style={{ fontSize: 14, color: '#4b5563', transition: 'transform 0.2s', transform: expanded === t.id ? 'rotate(180deg)' : 'none' }}>▾</span>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>{t.what}</div>

            {expanded === t.id && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 16, marginTop: 16, borderTop: '1px solid #1f2937' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Why it matters</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{t.why}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>How to implement</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{t.how}</div>
                </div>
                <div style={{
                  padding: '12px 16px', background: t.color + '08', border: `1px solid ${t.color}15`,
                  borderRadius: 8, fontSize: 12, color: '#d1d5db', lineHeight: 1.6,
                }}>
                  <strong style={{ color: t.color }}>Savings: </strong>{t.saving}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
