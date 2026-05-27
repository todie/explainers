import { MECHANISMS } from '../data'

export default function NeuroscienceMap() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        10 Neuroscience Mechanisms
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
        Each mechanism from biological memory consolidation maps to a specific implementation
        in the Reverie daemon. This isn't metaphor — it's architecture derived from neuroscience.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MECHANISMS.map((m) => (
          <div key={m.id} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 10, padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#e5e7eb' }}>{m.name}</span>
              <span style={{
                fontSize: 10, color: '#4b5563',
                fontFamily: 'var(--mono)', letterSpacing: '0.06em',
              }}>{m.category}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Biology</div>
                <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{m.bioFunction}</p>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Reverie mapping</div>
                <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>{m.reverieMapping}</p>
              </div>
              <div style={{
                display: 'flex', gap: 16, padding: '10px 14px',
                background: '#0f172a', borderRadius: 6, border: '1px solid #1e293b',
              }}>
                <div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>Implementation</div>
                  <code style={{ fontSize: 11, color: '#a855f7' }}>{m.implementation}</code>
                </div>
              </div>
              <div style={{
                padding: '8px 12px', borderRadius: 6,
                background: '#a855f708', borderLeft: '3px solid #a855f7',
                fontSize: 12, color: '#d1d5db', fontStyle: 'italic',
              }}>
                {m.keyInsight}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
