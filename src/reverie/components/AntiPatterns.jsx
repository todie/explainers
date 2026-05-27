import { ANTI_PATTERNS } from '../data'

export default function AntiPatterns() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        Anti-Patterns
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8, lineHeight: 1.6 }}>
        None of the failure modes below are model problems. They are <em>placement</em> problems — the
        same class of failure that operating systems solved with a cache hierarchy and brains solved with
        hippocampal consolidation. Six documented failure modes from auditing a real harness, each with
        a specific fix.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ANTI_PATTERNS.map((ap) => (
          <div key={ap.id} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
            padding: '16px 20px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, fontFamily: 'var(--mono)',
                  color: '#ef4444', background: '#ef444410', padding: '2px 6px', borderRadius: 4,
                }}>{ap.id}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb' }}>{ap.name}</span>
              </div>
              <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{ap.description}</p>
            </div>
            <div style={{
              background: '#0f172a', borderRadius: 8, padding: '12px 14px',
              borderLeft: '3px solid #22c55e',
            }}>
              <div style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>Fix</div>
              <p style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.5, margin: 0 }}>{ap.fix}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
