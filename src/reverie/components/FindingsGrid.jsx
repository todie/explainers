import { FINDINGS, INSIGHTS } from '../data'

const CATEGORY_COLORS = {
  architecture: '#6366f1',
  duplication: '#f97316',
  quality: '#eab308',
  misplacement: '#ef4444',
}

export default function FindingsGrid() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        13 Findings + 5 Insights
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>
        Empirical findings from auditing a real memory system: 105 engram observations,
        140 Obsidian notes, 7 auto-memory files, CLAUDE.md, 3 rules files, 1 loose file.
      </p>

      {/* Insights — highlighted */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 8, marginBottom: 32 }}>
        {INSIGHTS.map((ins) => (
          <div key={ins.id} style={{
            background: 'linear-gradient(135deg, #1e1b4b10, #3730a810)',
            border: '1px solid #4338ca20', borderRadius: 10,
            padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{ins.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb' }}>{ins.title}</span>
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{ins.summary}</p>
          </div>
        ))}
      </div>

      {/* Findings — compact grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 6 }}>
        {FINDINGS.map((f) => {
          const color = CATEGORY_COLORS[f.category] || '#6b7280'
          return (
            <div key={f.id} style={{
              background: '#111827', border: '1px solid #1f2937', borderRadius: 8,
              padding: '12px 14px', borderLeft: `3px solid ${color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)', color }}>{f.id}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#e5e7eb' }}>{f.title}</span>
              </div>
              <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{f.summary}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
