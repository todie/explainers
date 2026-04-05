import { LOCOMO_LEADERBOARD, LOCOMO_STATS } from '../data'

export default function LeaderboardChart() {
  const maxScore = 100

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        LoCoMo Benchmark
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
        The standard benchmark for long-term conversational memory.{' '}
        <strong style={{ color: '#9ca3af' }}>{LOCOMO_STATS.conversations} conversations</strong>,{' '}
        <strong style={{ color: '#9ca3af' }}>{LOCOMO_STATS.totalQuestions.toLocaleString()} questions</strong>,{' '}
        human ceiling at <strong style={{ color: '#a855f7' }}>{LOCOMO_STATS.questionTypes.singleHop.humanScore}%</strong> single-hop to{' '}
        <strong style={{ color: '#a855f7' }}>{LOCOMO_STATS.questionTypes.openDomain.humanScore}%</strong> open-domain.
      </p>

      {/* Key finding callout */}
      <div style={{
        background: '#111827', border: '1px solid #6366f130',
        borderRadius: 10, padding: '14px 18px', marginBottom: 32,
        borderLeft: '3px solid #6366f1',
      }}>
        <div style={{ fontSize: 12, color: '#6366f1', fontWeight: 700, marginBottom: 4 }}>Key Finding</div>
        <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>{LOCOMO_STATS.keyFinding}</div>
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {LOCOMO_LEADERBOARD.map((system) => (
          <div key={system.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 100, fontSize: 12, color: system.highlight ? '#e5e7eb' : '#9ca3af',
              fontWeight: system.highlight ? 700 : 400,
              textAlign: 'right', flexShrink: 0,
            }}>
              {system.name}
            </div>
            <div style={{ flex: 1, position: 'relative', height: 24 }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: '#0f172a', borderRadius: 4,
              }} />
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${(system.score / maxScore) * 100}%`,
                background: system.highlight
                  ? `linear-gradient(90deg, ${system.color}, ${system.color}cc)`
                  : system.color + '40',
                borderRadius: 4,
                transition: 'width 0.5s ease',
                border: system.highlight ? `1px solid ${system.color}60` : 'none',
              }} />
              <span style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
                color: system.highlight ? '#e5e7eb' : '#6b7280',
              }}>
                {system.score}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Question type breakdown */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#e5e7eb', marginTop: 32, marginBottom: 12 }}>
        Question Types (Human Ceiling)
      </h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {Object.entries(LOCOMO_STATS.questionTypes).map(([key, val]) => (
          <div key={key} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 8,
            padding: '10px 14px', flex: '1 1 140px',
          }}>
            <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'capitalize', marginBottom: 2 }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#a855f7' }}>{val.humanScore}%</span>
              <span style={{ fontSize: 10, color: '#4b5563' }}>{val.count.toLocaleString()} q's ({val.pct}%)</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
