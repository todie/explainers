import CacheArchitecture from './components/CacheArchitecture'
import ProxyTechniques from './components/ProxyTechniques'

const STATS = [
  { label: 'Cache Discount', value: '90%', sub: 'cached input tokens', color: '#4ade80' },
  { label: 'Typical Hit Rate', value: '85-95%', sub: 'after warmup', color: '#60a5fa' },
  { label: 'Cache TTL', value: '5 min', sub: 'Anthropic API default', color: '#a855f7' },
  { label: 'Break-even', value: '2 req', sub: 'pays for itself', color: '#facc15' },
]

export default function PromptCacheApp() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        background: 'linear-gradient(180deg, #111827 0%, #030712 100%)', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(74, 222, 128, 0.06) 0%, rgba(96, 165, 250, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.15)',
            fontSize: 12, color: '#4ade80', fontFamily: 'var(--mono, monospace)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Token Efficiency
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #4ade80 0%, #60a5fa 40%, #a855f7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Caching Prompt Proxies
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 660,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Every API request sends the entire conversation. A caching proxy makes 90% of that free
            by ensuring the prefix is stable and cacheable. Here's how it works.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: -28, position: 'relative', zIndex: 2,
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: `linear-gradient(135deg, #111827 0%, ${s.color}06 100%)`,
              border: `1px solid ${s.color}20`, borderRadius: 14,
              padding: '20px 20px 16px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, opacity: 0.5 }} />
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: 'var(--mono, monospace)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#4b5563', marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Core thesis */}
        <div style={{
          maxWidth: 660, margin: '0 auto', padding: '28px', textAlign: 'center',
          background: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.15)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 15, color: '#d1d5db', lineHeight: 1.8 }}>
            Without caching, a 20-turn conversation processes <strong style={{ color: '#f87171' }}>~250K input tokens total</strong> —
            resending everything every turn. With a caching proxy, the same conversation processes
            <strong style={{ color: '#4ade80' }}> ~30K unique tokens</strong>. Same results, <strong style={{ color: '#4ade80' }}>88% cheaper</strong>.
            The proxy doesn't change what you send — it changes <em>how</em> you send it.
          </div>
        </div>

        <CacheArchitecture />
        <ProxyTechniques />

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Based on Anthropic's{' '}
            <a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" style={{ color: '#4ade80', textDecoration: 'none' }}>prompt caching docs</a>
            {' '}and real-world proxy implementations. Built by{' '}
            <a href="https://todie.io" style={{ color: '#60a5fa', textDecoration: 'none' }}>todie.io</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
