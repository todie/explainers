import RadarChart from './RadarChart'
import { PROJECTS, DIMENSIONS } from '../data'

/** Average scores across all projects. */
function averageScores() {
  const sums = {}
  DIMENSIONS.forEach(d => { sums[d.key] = 0 })
  PROJECTS.forEach(p => {
    DIMENSIONS.forEach(d => { sums[d.key] += p.scores[d.key] })
  })
  const result = {}
  DIMENSIONS.forEach(d => { result[d.key] = Math.round(sums[d.key] / PROJECTS.length) })
  return result
}

const AVG = averageScores()

export default function PortfolioRadar() {
  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid #1f2937',
      borderRadius: 16,
      padding: '32px 28px',
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontSize: 18, fontWeight: 700, color: '#e5e7eb', margin: '0 0 6px',
        }}>
          Portfolio Average
        </h2>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
          Mean emotional scores across all 10 projects. Where the system lives on average.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Large radar */}
        <div style={{ flexShrink: 0 }}>
          <RadarChart scores={AVG} color="#60a5fa" size={220} showLabels />
        </div>

        {/* Dimension breakdown */}
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {DIMENSIONS.map(d => (
            <div key={d.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: d.color, fontFamily: 'var(--mono, monospace)' }}>
                  {d.label}
                </span>
                <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'var(--mono, monospace)' }}>
                  {AVG[d.key]}
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: '#1f2937', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${AVG[d.key]}%`,
                  background: d.color,
                }} />
              </div>
              {/* Per-project dots */}
              <div style={{ position: 'relative', height: 10, marginTop: 2 }}>
                {PROJECTS.map(p => (
                  <div
                    key={p.id}
                    title={`${p.name}: ${p.scores[d.key]}`}
                    style={{
                      position: 'absolute',
                      left: `calc(${p.scores[d.key]}% - 3px)`,
                      top: 2,
                      width: 5, height: 5, borderRadius: '50%',
                      background: p.accentColor,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          <p style={{ fontSize: 11, color: '#4b5563', margin: '8px 0 0', fontFamily: 'var(--mono, monospace)' }}>
            dots = individual projects; bar = mean
          </p>
        </div>
      </div>
    </div>
  )
}
