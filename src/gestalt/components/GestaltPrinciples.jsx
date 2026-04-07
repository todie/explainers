// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified"
// + "liberal use of visuals". Every principle now gets a real hand-built
// SVG figure that demonstrates it — not clipart, not ASCII art. The
// figures use only two ink colors (muted gray scaffolding + off-white
// load-bearing ink) so the reader's eye goes to the phenomenon.

const INK = '#e5e7eb'    // load-bearing ink — the thing the figure is about
const GHOST = '#4b5563'  // supporting ink — scaffolding, grid, edges

function EmergenceFigure() {
  // A constellation of dots forms an arrow shape. No dot IS the arrow;
  // the arrow exists only in the arrangement.
  const dots = [
    // spine
    [20, 52], [28, 52], [36, 52], [44, 52], [52, 52],
    [60, 52], [68, 52], [76, 52], [84, 52],
    // arrowhead upper wing
    [68, 28], [76, 36], [84, 44],
    // arrowhead lower wing
    [68, 76], [76, 68], [84, 60],
    // tail
    [92, 52],
  ]
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Emergence: dots forming an arrow">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={INK} />
      ))}
    </svg>
  )
}

function ClosureFigure() {
  // Kanizsa-style triangle: three pac-man shapes at the corners of a
  // triangle that exists only in the viewer's perception.
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Closure: Kanizsa triangle">
      {/* top */}
      <path d="M 56 20 A 10 10 0 1 1 48 36 L 56 30 Z" fill={INK} />
      {/* bottom-left */}
      <path d="M 30 78 A 10 10 0 1 1 40 84 L 34 76 Z" fill={INK} />
      {/* bottom-right */}
      <path d="M 82 78 A 10 10 0 1 0 72 84 L 78 76 Z" fill={INK} />
      {/* faint hint of the implied triangle (not drawn as solid — you
          see it whether this is here or not; this just accents what the
          mind is already constructing) */}
      <path d="M 56 30 L 34 76 L 78 76 Z" fill="none" stroke={GHOST} strokeWidth="0.6" strokeDasharray="1 3" opacity="0.6" />
    </svg>
  )
}

function ProximityFigure() {
  // Two clusters of identical dots separated by whitespace — grouping
  // comes from distance, nothing else.
  const pts = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      pts.push([14 + c * 10, 30 + r * 16])    // left cluster
      pts.push([68 + c * 10, 30 + r * 16])    // right cluster
    }
  }
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Proximity: two clusters">
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={INK} />
      ))}
    </svg>
  )
}

function SimilarityFigure() {
  // A uniform 6x4 grid — identical spacing — but alternating filled vs
  // hollow dots makes the eye group by column, not row.
  const cells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      cells.push({ x: 14 + c * 16, y: 20 + r * 20, filled: c % 2 === 0 })
    }
  }
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Similarity: alternating filled and hollow columns">
      {cells.map((d, i) =>
        d.filled
          ? <circle key={i} cx={d.x} cy={d.y} r="3.2" fill={INK} />
          : <circle key={i} cx={d.x} cy={d.y} r="3.2" fill="none" stroke={INK} strokeWidth="1.2" />
      )}
    </svg>
  )
}

function FigureGroundFigure() {
  // Rubin vase stylized — the vase in the center is also two faces in
  // the negative space. You can only see one at a time.
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Figure / ground: Rubin vase">
      <rect x="14" y="14" width="84" height="76" fill={GHOST} opacity="0.22" rx="2" />
      <path
        d="M 44 18
           C 44 30, 54 34, 54 46
           C 54 58, 44 62, 44 76
           L 44 86
           L 68 86
           L 68 76
           C 68 62, 58 58, 58 46
           C 58 34, 68 30, 68 18
           Z"
        fill={INK}
      />
    </svg>
  )
}

function ContinuityFigure() {
  // Two smooth curves crossing. The eye perceives two continuous paths,
  // not four segments meeting at a point.
  return (
    <svg viewBox="0 0 112 104" width="112" height="104" role="img" aria-label="Continuity: two crossing curves">
      <path d="M 10 82 C 30 28, 82 28, 102 82" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M 10 22 C 30 76, 82 76, 102 22" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const PRINCIPLES = [
  {
    id: 'emergence',
    title: 'Emergence',
    description: 'The whole is perceived before the parts. You see a face before you see two eyes, a nose, and a mouth. The gestalt emerges from the arrangement — it doesn\'t exist in any single component.',
    example: 'A flock of birds forms a shape in the sky. No single bird "is" the shape. The shape exists only in the relationship between all of them.',
    antipattern: 'Analytical thinking: decompose the flock into individual bird positions, velocities, and trajectories. You gain precision but lose the shape.',
    Figure: EmergenceFigure,
  },
  {
    id: 'closure',
    title: 'Closure',
    description: 'The mind fills in missing information to perceive a complete form. You see a triangle even when only three pac-man shapes are arranged at the corners. The completed form exists in your perception, not in the stimulus.',
    example: 'Reading redacted text: "The ███ jumped over the ███." You can\'t see the words, but your mind constructs plausible completions from context.',
    antipattern: 'Linear thinking: "I don\'t have complete information, so I can\'t proceed." Gestalt says: the gaps are informative. What your mind fills in reveals your model.',
    Figure: ClosureFigure,
  },
  {
    id: 'proximity',
    title: 'Proximity',
    description: 'Elements near each other are perceived as a group. Distance creates boundaries. This is spatial, but it generalizes: things that happen near each other in time, in code, in conversation — get grouped.',
    example: 'Code architecture: functions in the same file feel related. Move one to a different module and it immediately feels separate, even if the logic is identical.',
    antipattern: 'Categorical thinking: group by type regardless of proximity. All "utils" in one folder — even though each util is only used by one module.',
    Figure: ProximityFigure,
  },
  {
    id: 'similarity',
    title: 'Similarity',
    description: 'Elements that look alike are perceived as part of the same group. Color, shape, size, orientation — any shared attribute creates an implicit grouping in the mind.',
    example: 'In a codebase, consistent naming conventions (snake_case vs camelCase) create perceived boundaries between systems even without explicit separation.',
    antipattern: 'Reductionist thinking: treat every element as independent. Miss the pattern that all the failing tests share a common setup function.',
    Figure: SimilarityFigure,
  },
  {
    id: 'figure-ground',
    title: 'Figure / Ground',
    description: 'Perception organizes into a foreground figure and a background. You can\'t see both simultaneously — attention selects one. The same information produces different meanings depending on which layer you attend to.',
    example: 'Debugging: the error message is figure, the working code is ground. Flip it: the working code is figure, and the error reveals what the working code assumes.',
    antipattern: 'Analytical thinking treats everything as figure — equal weight, no depth. Gestalt says: what you choose to foreground is itself a decision that shapes understanding.',
    Figure: FigureGroundFigure,
  },
  {
    id: 'continuity',
    title: 'Continuity',
    description: 'The mind follows lines and curves in the smoothest path. When two lines cross, you perceive two continuous lines, not four segments meeting at a point. The trajectory carries meaning.',
    example: 'Reading code: you follow the data flow, not the file structure. A value that flows through 5 functions across 3 files is perceived as one continuous path.',
    antipattern: 'Discrete thinking: analyze each function in isolation. Miss that the real unit of meaning is the flow, not the boundary.',
    Figure: ContinuityFigure,
  },
]

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

export default function GestaltPrinciples() {
  return (
    <section>
      <header style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          The Principles
        </h2>
        <p style={{ ...body, color: '#9ca3af' }}>
          Six laws of perceptual organization, formalized by the Berlin-school
          Gestalt psychologists in the 1920s. Each one describes how the mind
          creates structure from ambiguity.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PRINCIPLES.map((p, i) => {
          const isLast = i === PRINCIPLES.length - 1
          const PrincipleFigure = p.Figure
          return (
            <article
              key={p.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 32,
                paddingBottom: isLast ? 0 : 44,
                marginBottom: isLast ? 0 : 44,
                borderBottom: isLast ? 'none' : '1px solid #1f2937',
              }}
            >
              <figure style={{ margin: 0 }}>
                <div style={{ ...smallCaps, marginBottom: 10 }}>Figure {i + 3}</div>
                <div style={{
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid #1f2937',
                  borderRadius: 2,
                  padding: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <PrincipleFigure />
                </div>
              </figure>
              <div>
                <h3 style={{
                  fontSize: 18, fontWeight: 700, color: '#f9fafb',
                  letterSpacing: '-0.01em', margin: '0 0 12px 0',
                }}>
                  {p.title}
                </h3>
                <p style={{ ...body, marginBottom: 16 }}>{p.description}</p>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...smallCaps, marginBottom: 6 }}>Example</div>
                  <p style={{ ...body, fontSize: 14 }}>{p.example}</p>
                </div>
                <div>
                  <div style={{ ...smallCaps, marginBottom: 6 }}>What other thinking misses</div>
                  <p style={{ ...body, fontSize: 14, color: '#9ca3af', fontStyle: 'italic' }}>{p.antipattern}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
