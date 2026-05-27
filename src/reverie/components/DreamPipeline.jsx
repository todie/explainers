import { DREAM_PHASES, CONSOLIDATION_SCHEDULE } from '../data'

export default function DreamPipeline() {
  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        The Dream Pipeline
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8, lineHeight: 1.6 }}>
        Six phases run sequentially during each dream cycle — offline consolidation
        modeled on what the brain does during NREM sleep.
      </p>
      <p style={{ fontSize: 13, color: '#4b5563', marginBottom: 32, fontStyle: 'italic' }}>
        "Consolidation is not summarization. A system that only summarizes is doing roughly 25%
        of what biological consolidation does."
      </p>

      {/* Pipeline visualization */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
        {DREAM_PHASES.map((phase, i) => (
          <div key={phase.id}>
            <div style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '16px 20px',
              background: '#111827', borderRadius: 10,
              borderLeft: `3px solid ${phase.color}`,
            }}>
              {/* Phase number */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: phase.color + '15', border: `1px solid ${phase.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: phase.color, flexShrink: 0,
              }}>{i + 1}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#e5e7eb' }}>{phase.name}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--mono)', color: phase.color,
                    background: phase.color + '10', padding: '2px 8px', borderRadius: 4,
                  }}>{phase.mechanism}</span>
                </div>
                <div style={{ fontSize: 13, color: '#d1d5db', fontFamily: 'var(--mono)', marginBottom: 4 }}>
                  {phase.action}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>
                  {phase.details}
                </div>
              </div>
            </div>

            {/* Connector between phases */}
            {i < DREAM_PHASES.length - 1 && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                padding: '4px 0', fontSize: 14, color: '#374151',
              }}>↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Consolidation schedule */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e5e7eb', marginBottom: 16 }}>
        Consolidation Schedule
      </h3>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8,
      }}>
        {CONSOLIDATION_SCHEDULE.map((s) => (
          <div key={s.cycle} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
            padding: '14px 16px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', marginBottom: 2 }}>{s.cycle}</div>
            <div style={{ fontSize: 11, color: '#a855f7', fontFamily: 'var(--mono)', marginBottom: 8 }}>{s.frequency}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>
              <strong style={{ color: '#9ca3af' }}>Mechanisms:</strong> {s.mechanisms}
            </div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>
              <strong style={{ color: '#9ca3af' }}>Actions:</strong> {s.actions}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
