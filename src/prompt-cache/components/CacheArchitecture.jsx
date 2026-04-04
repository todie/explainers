import { useState } from 'react'

const LAYERS = [
  {
    id: 'client',
    label: 'Claude Code / Client',
    color: '#60a5fa',
    icon: '⚡',
    tag: 'requests',
    desc: 'The client sends prompts to the API. Every request includes the full conversation history, system prompt, tools, and the new user message. Most of this content is identical between requests — only the last turn changes.',
    items: ['system prompt', 'tool definitions', 'conversation history', 'new message'],
  },
  {
    id: 'proxy',
    label: 'Caching Proxy',
    color: '#4ade80',
    icon: '🔄',
    tag: 'intercept + normalize',
    desc: 'Sits between client and API. Normalizes requests (strips volatile headers, stabilizes tool ordering, canonicalizes whitespace), injects cache breakpoints at optimal positions, and routes to cache or upstream. The key insight: most API requests are 90%+ identical to the previous one.',
    items: ['normalize request', 'inject cache_control breakpoints', 'strip volatile fields', 'route to cache or API'],
  },
  {
    id: 'api',
    label: 'Claude API',
    color: '#a855f7',
    icon: '🧠',
    tag: 'processes cached prefix',
    desc: 'Anthropic\'s prompt caching reads the request prefix from cache instead of reprocessing it. Cached tokens cost 90% less (0.30 → 0.03 per MTok for input). The proxy\'s job is to maximize the cacheable prefix length by ensuring request stability.',
    items: ['cache lookup on prefix', 'process only new tokens', '90% discount on cached input', 'cache TTL: 5 minutes'],
  },
]

const FLOW_STEPS = [
  { label: 'Request 1', tokens: '12,000', cached: '0', new: '12,000', cost: '$0.0036', note: 'Cold start — everything processed fresh' },
  { label: 'Request 2', tokens: '12,800', cached: '12,000', new: '800', cost: '$0.0006', note: 'System + history cached, only new turn processed' },
  { label: 'Request 3', tokens: '13,600', cached: '12,800', new: '800', cost: '$0.0006', note: 'Cache extends — previous response now in prefix' },
  { label: 'Request 10', tokens: '18,400', cached: '17,600', new: '800', cost: '$0.0007', note: '95.6% cache hit rate — paying for 800 tokens instead of 18,400' },
]

export default function CacheArchitecture() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Architecture
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 540, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Three layers: client, proxy, API. The proxy's job is to make requests as cache-friendly as possible.
      </p>

      {/* Layer diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640, margin: '0 auto' }}>
        {LAYERS.map((layer, li) => (
          <div key={layer.id}>
            <div
              onClick={() => setActive(active === layer.id ? null : layer.id)}
              style={{
                background: active === layer.id ? `linear-gradient(135deg, #111827 0%, ${layer.color}06 100%)` : '#111827',
                border: `1px solid ${active === layer.id ? layer.color + '30' : '#1f2937'}`,
                borderRadius: 14, padding: '20px 24px', cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: layer.color + '12', border: `1px solid ${layer.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{layer.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: layer.color }}>{layer.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono, monospace)' }}>{layer.tag}</div>
                </div>
                <span style={{ fontSize: 14, color: '#4b5563', transition: 'transform 0.2s', transform: active === layer.id ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>

              {/* Mini items */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {layer.items.map(item => (
                  <span key={item} style={{
                    fontSize: 10, fontFamily: 'var(--mono, monospace)', color: layer.color,
                    background: layer.color + '08', border: `1px solid ${layer.color}15`,
                    padding: '4px 10px', borderRadius: 6,
                  }}>{item}</span>
                ))}
              </div>

              {active === layer.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1f2937', fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>
                  {layer.desc}
                </div>
              )}
            </div>

            {/* Arrow between layers */}
            {li < LAYERS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                <span style={{ fontSize: 11, color: '#374151', fontFamily: 'var(--mono, monospace)' }}>
                  {li === 0 ? '↓ raw request' : '↓ normalized + cache-optimized'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cost progression */}
      <div style={{ maxWidth: 640, margin: '40px auto 0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#d1d5db', marginBottom: 16, textAlign: 'center' }}>
          Cost Across a 10-Turn Conversation
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FLOW_STEPS.map((step, i) => {
            const cachePct = parseInt(step.cached.replace(',', '')) / parseInt(step.tokens.replace(',', '')) * 100
            return (
              <div key={i} style={{
                background: '#111827', border: '1px solid #1f2937', borderRadius: 10, padding: '14px 18px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{step.label}</span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--mono, monospace)', color: '#4ade80', fontWeight: 600 }}>{step.cost}</span>
                </div>
                {/* Bar */}
                <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ width: `${cachePct}%`, background: '#4ade8060', transition: 'width 0.6s ease' }} />
                  <div style={{ flex: 1, background: '#60a5fa40' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', fontFamily: 'var(--mono, monospace)' }}>
                  <span><span style={{ color: '#4ade80' }}>cached: {step.cached}</span> / <span style={{ color: '#60a5fa' }}>new: {step.new}</span></span>
                  <span>{i > 0 ? `${cachePct.toFixed(0)}% hit` : 'cold'}</span>
                </div>
                <div style={{ fontSize: 11, color: '#4b5563', marginTop: 4 }}>{step.note}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
