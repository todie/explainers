import { useState } from 'react'
import { EXAMPLES } from '../data/gestaltCognition'

export default function Examples() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Gestalt in the Wild
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 560, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Real cases where the whole arrived before the parts — from physics to chess to emergency medicine.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720, margin: '0 auto' }}>
        {EXAMPLES.map((ex) => (
          <div
            key={ex.id}
            onClick={() => setActive(active === ex.id ? null : ex.id)}
            style={{
              background: active === ex.id ? `linear-gradient(135deg, #111827 0%, ${ex.domainColor}06 100%)` : '#111827',
              border: `1px solid ${active === ex.id ? ex.domainColor + '30' : '#1f2937'}`,
              borderRadius: 14, padding: '18px 22px', cursor: 'pointer', transition: 'all 0.25s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                background: ex.domainColor + '12', color: ex.domainColor, border: `1px solid ${ex.domainColor}20`,
                textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mono, monospace)',
              }}>{ex.domain}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#e5e7eb', flex: 1 }}>{ex.title}</span>
              <span style={{ fontSize: 13, color: '#4b5563', transition: 'transform 0.2s', transform: active === ex.id ? 'rotate(180deg)' : 'none' }}>▾</span>
            </div>

            <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
              {active === ex.id ? ex.description : ex.description.slice(0, 140) + '...'}
            </div>

            {active === ex.id && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16, paddingTop: 16, borderTop: '1px solid #1f2937' }}>
                {ex.quote && (
                  <div style={{
                    padding: '14px 18px', background: ex.domainColor + '06', border: `1px solid ${ex.domainColor}12`,
                    borderRadius: 10, borderLeft: `3px solid ${ex.domainColor}40`,
                  }}>
                    <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8, fontStyle: 'italic' }}>"{ex.quote}"</div>
                    {ex.quoteAttribution && (
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 8 }}>— {ex.quoteAttribution}</div>
                    )}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: ex.domainColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Mechanism</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{ex.mechanism}</div>
                </div>
                <a href={ex.source.url} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: 11, color: '#60a5fa', textDecoration: 'none' }}>
                  {ex.source.label}{ex.source.year ? ` (${ex.source.year})` : ''} →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
