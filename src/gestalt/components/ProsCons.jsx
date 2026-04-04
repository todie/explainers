import { PROS_CONS } from '../data/gestaltCognition'

export default function ProsCons() {
  const pros = PROS_CONS.filter(p => p.type === 'pro')
  const cons = PROS_CONS.filter(p => p.type === 'con')

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Advantages & Failure Modes
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 540, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Gestalt cognition is powerful but not infallible. Knowing the failure modes is as important as knowing the strengths.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 720, margin: '0 auto' }}>
        {/* Pros */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, textAlign: 'center' }}>
            Advantages
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pros.map(p => (
              <div key={p.id} style={{
                background: '#111827', border: '1px solid #1f2937', borderRadius: 12,
                padding: '16px 18px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #4ade80, #4ade8030)' }} />
                <div style={{ fontWeight: 700, fontSize: 13, color: '#4ade80', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{p.description}</div>
                {p.domains && p.domains.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                    {p.domains.map(d => (
                      <span key={d} style={{
                        fontSize: 9, fontFamily: 'var(--mono, monospace)', color: '#6b7280',
                        background: '#1f2937', padding: '2px 8px', borderRadius: 4,
                      }}>{d}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, textAlign: 'center' }}>
            Failure Modes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cons.map(p => (
              <div key={p.id} style={{
                background: '#111827', border: '1px solid #1f2937', borderRadius: 12,
                padding: '16px 18px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #f87171, #f8717130)' }} />
                <div style={{ fontWeight: 700, fontSize: 13, color: '#f87171', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{p.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
