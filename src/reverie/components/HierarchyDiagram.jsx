import { useState } from 'react'
import { LAYERS } from '../data'

export default function HierarchyDiagram() {
  const [selected, setSelected] = useState(null)
  const sel = selected !== null ? LAYERS[selected] : null

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        The 5-Layer Memory Hierarchy
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
        Like a CPU cache hierarchy — each layer trades capacity for speed. Knowledge lives in the layer
        whose affordance matches its access pattern. Click a layer to explore.
      </p>

      {/* Stack visualization */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
        {LAYERS.map((layer, i) => {
          const widthPct = 40 + i * 15
          const isSelected = selected === i
          return (
            <button
              key={layer.id}
              onClick={() => setSelected(isSelected ? null : i)}
              style={{
                width: `${widthPct}%`, margin: '0 auto',
                padding: '12px 16px',
                background: isSelected ? layer.color + '15' : '#111827',
                border: `1px solid ${isSelected ? layer.color + '40' : '#1f2937'}`,
                borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: layer.color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{layer.name}</span>
                <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono)' }}>{layer.cpuAnalog}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#6b7280' }}>
                <span>{layer.autoLoaded ? '✓ auto-loaded' : '○ on-demand'}</span>
                <span>{layer.latency}</span>
                <span>{layer.capacity}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      {sel && (
        <div style={{
          background: '#111827', border: `1px solid ${sel.color}30`,
          borderRadius: 12, padding: 24,
          animation: 'fadeUp 0.2s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: sel.color }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e5e7eb', margin: 0 }}>{sel.name}</h3>
            <span style={{
              fontSize: 10, fontFamily: 'var(--mono)', color: sel.color,
              background: sel.color + '10', border: `1px solid ${sel.color}20`,
              padding: '2px 8px', borderRadius: 4,
            }}>{sel.cpuAnalog}</span>
            <span style={{
              fontSize: 10, fontFamily: 'var(--mono)', color: '#9ca3af',
              background: '#1f293740', border: '1px solid #374151',
              padding: '2px 8px', borderRadius: 4,
            }}>{sel.brainAnalog}</span>
          </div>

          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, marginBottom: 16 }}>
            {sel.description}
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Best for</div>
              <div style={{ fontSize: 13, color: sel.color, fontWeight: 600 }}>{sel.bestFor}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Examples</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sel.examples.map(ex => (
                  <span key={ex} style={{
                    fontSize: 11, color: '#9ca3af', background: '#1f2937',
                    padding: '2px 8px', borderRadius: 4,
                  }}>{ex}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 16, padding: '10px 14px', borderRadius: 6,
            background: '#0f172a', border: '1px solid #1e293b',
            fontSize: 12, color: '#f87171', fontFamily: 'var(--mono)',
          }}>
            ⚠ {sel.constraint}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
