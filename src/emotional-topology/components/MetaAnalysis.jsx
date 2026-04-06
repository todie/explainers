import { useState } from 'react'
import { META_PATTERNS } from '../data'

export default function MetaAnalysis() {
  const [active, setActive] = useState(null)

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid #1f2937',
      borderRadius: 16,
      padding: '32px 28px',
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e5e7eb', margin: '0 0 6px' }}>
          Portfolio-Level Patterns
        </h2>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
          Four recurring structures in how todie.io prompts manage emotional content.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {META_PATTERNS.map(p => (
          <div
            key={p.id}
            onClick={() => setActive(active === p.id ? null : p.id)}
            style={{
              borderRadius: 10,
              border: `1px solid ${active === p.id ? p.color + '40' : '#1f2937'}`,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease',
            }}
          >
            {/* Pattern header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px',
              background: active === p.id ? p.color + '08' : 'transparent',
            }}>
              <span style={{
                fontSize: 18, width: 32, textAlign: 'center',
                color: p.color,
              }}>
                {p.icon}
              </span>
              <span style={{
                fontSize: 14, fontWeight: 600,
                color: active === p.id ? '#e5e7eb' : '#9ca3af',
                flex: 1,
              }}>
                {p.title}
              </span>
              <span style={{
                fontSize: 12, color: '#4b5563',
                transform: active === p.id ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}>
                ▾
              </span>
            </div>

            {/* Expanded body */}
            {active === p.id && (
              <div style={{
                padding: '0 18px 18px 64px',
                borderTop: `1px solid ${p.color}20`,
              }}
                onClick={e => e.stopPropagation()}
              >
                <p style={{
                  fontSize: 13, color: '#9ca3af', lineHeight: 1.75, margin: '14px 0 0',
                }}>
                  {p.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
