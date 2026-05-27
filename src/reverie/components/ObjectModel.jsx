import { ENTITIES, ENUMS, RELATIONSHIPS } from '../data/componentArchitecture'

export default function ObjectModel() {
  const entity = ENTITIES[0]

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        Object-Relational Model
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
        The <code style={{ color: '#a855f7', background: '#a855f710', padding: '1px 6px', borderRadius: 3 }}>Chunk</code> is
        the atomic unit of knowledge in reverie-store. Every field maps to a neuroscience mechanism
        or a placement constraint — nothing is accidental.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 280px)',
        gap: 16,
      }} className="orm-grid">
        {/* Entity card */}
        <div style={{
          background: '#111827', border: `1px solid ${entity.color}30`,
          borderRadius: 12, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 18px', background: entity.color + '10',
            borderBottom: `1px solid ${entity.color}20`,
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: entity.color, flexShrink: 0 }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#e5e7eb', fontFamily: 'var(--mono)' }}>{entity.name}</span>
            <span style={{ fontSize: 11, color: '#6b7280' }}>{entity.description}</span>
          </div>

          {/* Field groups — all expanded */}
          {entity.fields.map(group => (
            <div key={group.group}>
              <div style={{
                padding: '8px 18px',
                background: '#0f172a',
                borderBottom: '1px solid #1f2937',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {group.group}
                </span>
                <span style={{ fontSize: 10, color: '#4b5563' }}>{group.fields.length} fields</span>
              </div>

              <div style={{ padding: '0 18px 12px' }}>
                {group.fields.map(f => (
                  <div key={f.name} style={{
                    display: 'flex', gap: 8, padding: '6px 0',
                    borderBottom: '1px solid #1f293740',
                    alignItems: 'baseline', flexWrap: 'wrap',
                  }}>
                    <code style={{ fontSize: 12, color: '#e5e7eb', fontFamily: 'var(--mono)', minWidth: 140 }}>{f.name}</code>
                    <code style={{ fontSize: 10, color: '#6366f1', fontFamily: 'var(--mono)', minWidth: 100 }}>{f.type}</code>
                    <span style={{ fontSize: 11, color: '#6b7280' }}>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enums sidebar — all expanded */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ENUMS.map(e => (
            <div key={e.name} style={{
              background: '#111827', border: `1px solid ${e.color}20`,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                padding: '10px 14px',
                background: e.color + '08',
                borderBottom: `1px solid ${e.color}15`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: e.color }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#e5e7eb', fontFamily: 'var(--mono)' }}>{e.name}</span>
              </div>

              <div style={{ padding: '6px 14px 10px' }}>
                {e.variants.map(v => (
                  <div key={v.name} style={{
                    display: 'flex', alignItems: 'baseline', gap: 6,
                    padding: '4px 0', borderBottom: '1px solid #1f293730',
                  }}>
                    <code style={{ fontSize: 11, color: e.color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{v.name}</code>
                    <span style={{ fontSize: 10, color: '#6b7280' }}>{v.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Relationships */}
          <div style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 10, padding: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Relationships
            </div>
            {RELATIONSHIPS.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 0', fontSize: 11,
              }}>
                <code style={{ color: '#a855f7', fontFamily: 'var(--mono)' }}>{r.from}</code>
                <span style={{ color: '#374151' }}>→</span>
                <code style={{ color: '#6366f1', fontFamily: 'var(--mono)' }}>{r.to}</code>
                <span style={{ color: '#6b7280', fontSize: 10 }}>{r.cardinality}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .orm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
