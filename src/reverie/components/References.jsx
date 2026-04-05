import { REFERENCES } from '../data'

export default function References() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        References
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
        Key papers, benchmarks, and systems that inform Reverie's architecture.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {REFERENCES.map((ref) => (
          <a
            key={ref.title}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '12px 16px', background: '#111827', border: '1px solid #1f2937',
              borderRadius: 8, textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#374151'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1f2937'}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb', marginBottom: 2 }}>
                {ref.title}
              </div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>
                {ref.authors} — {ref.venue}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                {ref.relevance}
              </div>
            </div>
            <span style={{ fontSize: 14, color: '#374151', flexShrink: 0 }}>↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
