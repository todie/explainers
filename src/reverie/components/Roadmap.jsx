import { MILESTONES, V1_GATE, ROADMAP_META } from '../data/roadmap'

const STATUS_STYLE = {
  shipped:     { label: 'Shipped',      border: '#22c55e', bg: '#22c55e08', dot: '#22c55e', textColor: '#86efac' },
  'in-progress': { label: 'In Progress', border: '#eab308', bg: '#eab30808', dot: '#eab308', textColor: '#fde047' },
  upcoming:    { label: 'Upcoming',     border: '#374151', bg: 'transparent', dot: '#4b5563', textColor: '#6b7280' },
  gate:        { label: 'v1.0 Gate',    border: '#a855f7', bg: '#a855f708', dot: '#a855f7', textColor: '#d8b4fe' },
}

const GROUPS = [
  { key: 'shipped',     label: 'Shipped' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'upcoming',    label: 'Upcoming' },
  { key: 'gate',        label: 'v1.0 Gate' },
]

function MilestoneCard({ m }) {
  const s = STATUS_STYLE[m.status]
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}30`,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: 10,
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
          color: s.textColor,
        }}>
          {m.version}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{m.name}</span>
        {m.date && (
          <span style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--mono)', marginLeft: 'auto' }}>
            {m.date}
          </span>
        )}
      </div>

      {m.status === 'in-progress' && m.progress > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ height: 3, background: '#1f2937', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${m.progress}%`,
              background: `linear-gradient(90deg, #eab308, #f59e0b)`,
              borderRadius: 2, transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{ fontSize: 10, color: '#6b7280', fontFamily: 'var(--mono)', marginTop: 3, display: 'block' }}>
            {m.progress}% complete
          </span>
        </div>
      )}

      {m.highlights.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {m.highlights.map((h, i) => (
            <li key={i} style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Roadmap() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        Roadmap
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 4, lineHeight: 1.6 }}>
        From current stable ({ROADMAP_META.currentVersion}) to v1.0 general release.
        v1.0 target: <strong style={{ color: '#a855f7' }}>{ROADMAP_META.v1Target}</strong>.
      </p>
      <p style={{ fontSize: 11, color: '#374151', marginBottom: 28, fontFamily: 'var(--mono)' }}>
        as of {ROADMAP_META.generatedAt} · source: Linear (cerebral-work/reverie) + docs/releases/v1.0-criteria.md
      </p>

      {GROUPS.map(({ key, label }) => {
        const ms = MILESTONES.filter(m => m.status === key)
        if (ms.length === 0) return null
        if (key === 'gate') {
          return (
            <div key={key} style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                {label}
              </div>

              <div style={{
                background: '#1a0a2e',
                border: '1px solid #a855f730',
                borderLeft: '3px solid #a855f7',
                borderRadius: 10,
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: '#d8b4fe' }}>v1.0.0</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>Full release</span>
                  <span style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--mono)', marginLeft: 'auto' }}>
                    {ROADMAP_META.v1Target}
                  </span>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#a855f7', marginBottom: 8 }}>Must (blocking)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {V1_GATE.must.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: '#4b5563', fontSize: 12, marginTop: 1, flexShrink: 0 }}>□</span>
                        <div>
                          <span style={{ fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 8 }}>{item.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', marginBottom: 8 }}>Quality bars</div>
                  <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {V1_GATE.qualityBars.map((bar, i) => (
                      <li key={i} style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{bar}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={key} style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              {label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ms.map(m => <MilestoneCard key={m.version} m={m} />)}
            </div>
          </div>
        )
      })}
    </section>
  )
}
