import { useNavigate } from 'react-router-dom'
import { EXPLAINERS } from './explainers'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        padding: '80px 24px 48px', textAlign: 'center',
        background: 'linear-gradient(180deg, #111827 0%, #030712 100%)',
      }}>
        <div style={{
          display: 'inline-block', padding: '5px 14px', borderRadius: 999,
          background: 'rgba(96, 165, 250, 0.08)', border: '1px solid rgba(96, 165, 250, 0.15)',
          fontSize: 12, color: '#60a5fa', fontFamily: 'var(--mono, monospace)', marginBottom: 20,
        }}>
          todie.io
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 14,
          background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #f87171 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}>
          Explainers
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 480, margin: '0 auto' }}>
          Visual deep-dives into how things work. Tap one or press <kbd style={{
            fontSize: 11, background: '#1f2937', border: '1px solid #374151',
            borderRadius: 3, padding: '1px 6px', color: '#9ca3af',
          }}>{navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}K</kbd> to search.
        </p>
      </header>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EXPLAINERS.map((ex) => (
          <button
            key={ex.id}
            onClick={() => navigate(ex.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              width: '100%', padding: '20px 24px', textAlign: 'left',
              background: '#111827', border: '1px solid #1f2937', borderRadius: 12,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.background = '#162031' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.background = '#111827' }}
          >
            <span style={{ fontSize: 28 }}>{ex.icon}</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e5e7eb', marginBottom: 2 }}>{ex.title}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{ex.short}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 18, color: '#374151' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
