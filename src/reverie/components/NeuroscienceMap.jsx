import { useState } from 'react'
import { MECHANISMS } from '../data'

const CATEGORY_COLORS = {
  replay: '#ef4444',
  transfer: '#f97316',
  architecture: '#eab308',
  update: '#22c55e',
  integration: '#14b8a6',
  forgetting: '#3b82f6',
  importance: '#6366f1',
  separation: '#8b5cf6',
  encoding: '#a855f7',
  retrieval: '#ec4899',
}

export default function NeuroscienceMap() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        10 Neuroscience Mechanisms
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
        Each mechanism from biological memory consolidation maps to a specific implementation
        in the Reverie daemon. This isn't metaphor — it's architecture derived from neuroscience.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MECHANISMS.map((m) => {
          const isExpanded = expanded === m.id
          const color = CATEGORY_COLORS[m.category] || '#6b7280'
          return (
            <button
              key={m.id}
              onClick={() => setExpanded(isExpanded ? null : m.id)}
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: isExpanded ? '#111827' : '#0d1117',
                border: `1px solid ${isExpanded ? color + '30' : '#1f2937'}`,
                borderRadius: 10, padding: '14px 18px',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb', flex: 1 }}>{m.name}</span>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--mono)', color,
                  background: color + '10', padding: '2px 8px', borderRadius: 4,
                }}>{m.category}</span>
                <span style={{ fontSize: 14, color: '#4b5563', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
              </div>

              {isExpanded && (
                <div style={{ marginTop: 14, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Biology</div>
                    <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{m.bioFunction}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Reverie mapping</div>
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
                    background: color + '08', borderLeft: `3px solid ${color}`,
                    fontSize: 12, color: '#d1d5db', fontStyle: 'italic',
                  }}>
                    {m.keyInsight}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
