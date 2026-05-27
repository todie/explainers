import { useState } from 'react'
import { CRATE_FLOWS } from '../data/componentArchitecture'

export default function CrateFlows() {
  const [selected, setSelected] = useState('reverie-store')
  const crate = CRATE_FLOWS.find(c => c.crate === selected)

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        Crate Data Flows
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
        Reverie compiles into four crates: <code style={{ color: '#a855f7', fontSize: 12 }}>reverie-store</code> (the knowledge layer),{' '}
        <code style={{ color: '#a855f7', fontSize: 12 }}>reverie-gate</code> (the pre-write placement filter),{' '}
        <code style={{ color: '#a855f7', fontSize: 12 }}>reverie-dream</code> (offline consolidation), and{' '}
        <code style={{ color: '#a855f7', fontSize: 12 }}>reverie-sync</code> (cross-layer replication).
        Select a crate to trace its internal data flow.
      </p>

      {/* Crate selector tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
        {CRATE_FLOWS.map(c => (
          <button
            key={c.crate}
            onClick={() => setSelected(c.crate)}
            style={{
              padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
              fontSize: 12, fontWeight: 600, fontFamily: 'var(--mono)',
              background: selected === c.crate ? c.color + '15' : '#111827',
              border: `1px solid ${selected === c.crate ? c.color : '#1f2937'}`,
              color: selected === c.crate ? '#e5e7eb' : '#6b7280',
            }}
          >
            {c.crate}
          </button>
        ))}
      </div>

      {crate && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {/* Modules */}
          <div style={{
            background: '#111827', border: `1px solid ${crate.color}20`,
            borderRadius: 12, padding: 18,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: crate.color, marginBottom: 4, fontFamily: 'var(--mono)' }}>
              {crate.crate}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
              {crate.description}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {crate.modules.map(m => (
                <div key={m.name} style={{
                  padding: '8px 12px', background: '#0f172a',
                  border: '1px solid #1e293b', borderRadius: 6,
                  borderLeft: `3px solid ${crate.color}40`,
                }}>
                  <code style={{ fontSize: 12, fontWeight: 700, color: '#e5e7eb', fontFamily: 'var(--mono)' }}>{m.name}.rs</code>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Data flow */}
          <div style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 12, padding: 18,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Internal Data Flow
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {crate.dataFlow.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', background: '#0f172a',
                  borderRadius: 6, border: '1px solid #1e293b',
                }}>
                  {f.from && (
                    <code style={{ fontSize: 11, color: crate.color, fontFamily: 'var(--mono)', minWidth: 60 }}>{f.from}</code>
                  )}
                  {f.to && (
                    <>
                      <span style={{ color: '#374151', fontSize: 12 }}>→</span>
                      <code style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'var(--mono)', minWidth: 60 }}>{f.to}</code>
                    </>
                  )}
                  <span style={{ fontSize: 10, color: '#6b7280', flex: 1, textAlign: 'right' }}>
                    {f.label}
                  </span>
                  <span style={{
                    fontSize: 9, color: crate.color + 'aa', fontFamily: 'var(--mono)',
                    background: crate.color + '08', padding: '1px 6px', borderRadius: 3,
                  }}>
                    {f.protocol}
                  </span>
                </div>
              ))}
            </div>

            {crate.dataFlow.some(f => f.desc) && (
              <div style={{ marginTop: 12, padding: '8px 12px', background: '#0f172a', borderRadius: 6, borderLeft: `3px solid ${crate.color}` }}>
                {crate.dataFlow.filter(f => f.desc).map((f, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>{f.desc}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
