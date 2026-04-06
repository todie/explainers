import { DIMENSIONS } from '../data'

/** Pure SVG radar chart. size: px, scores: {vulnerability, control, ...}, color: accent */
export default function RadarChart({ scores, color = '#60a5fa', size = 160, showLabels = false }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const n = DIMENSIONS.length
  const labelR = r + (showLabels ? 22 : 0)

  const angleOf = (i) => (Math.PI * 2 * i) / n - Math.PI / 2

  const pointAt = (i, val) => {
    const a = angleOf(i)
    const d = (val / 100) * r
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) }
  }

  const gridAt = (i, frac) => {
    const a = angleOf(i)
    return { x: cx + frac * r * Math.cos(a), y: cy + frac * r * Math.sin(a) }
  }

  // polygon points for the score shape
  const shapePoints = DIMENSIONS.map((d, i) => {
    const pt = pointAt(i, scores[d.key])
    return `${pt.x},${pt.y}`
  }).join(' ')

  // grid rings
  const rings = [0.25, 0.5, 0.75, 1.0]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {/* Grid rings */}
      {rings.map((frac) => {
        const pts = DIMENSIONS.map((_, i) => {
          const g = gridAt(i, frac)
          return `${g.x},${g.y}`
        }).join(' ')
        return (
          <polygon
            key={frac}
            points={pts}
            fill="none"
            stroke="rgba(75,85,99,0.4)"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Axis spokes */}
      {DIMENSIONS.map((_, i) => {
        const end = gridAt(i, 1.0)
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={end.x} y2={end.y}
            stroke="rgba(75,85,99,0.3)"
            strokeWidth={0.5}
          />
        )
      })}

      {/* Score shape */}
      <polygon
        points={shapePoints}
        fill={color + '22'}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {DIMENSIONS.map((d, i) => {
        const pt = pointAt(i, scores[d.key])
        return (
          <circle
            key={d.key}
            cx={pt.x} cy={pt.y} r={2.5}
            fill={color}
          />
        )
      })}

      {/* Labels (optional) */}
      {showLabels && DIMENSIONS.map((d, i) => {
        const a = angleOf(i)
        const lx = cx + labelR * Math.cos(a)
        const ly = cy + labelR * Math.sin(a)
        return (
          <text
            key={d.key}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fill={d.color}
            fontFamily="var(--mono, monospace)"
          >
            {d.short}
          </text>
        )
      })}
    </svg>
  )
}
