// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version had six click-to-expand cards, one per principle, each
// coloured differently (blue/purple/green/yellow/red/cyan) — an entire
// rainbow per section. Now inlined as numbered academic entries with
// hairline separators, mono ASCII figures, and everything visible on load.

const PRINCIPLES = [
  {
    id: 'emergence',
    title: 'Emergence',
    description: 'The whole is perceived before the parts. You see a face before you see two eyes, a nose, and a mouth. The gestalt emerges from the arrangement — it doesn\'t exist in any single component.',
    example: 'A flock of birds forms a shape in the sky. No single bird "is" the shape. The shape exists only in the relationship between all of them.',
    antipattern: 'Analytical thinking: decompose the flock into individual bird positions, velocities, and trajectories. You gain precision but lose the shape.',
    visual: [
      '·  ·  ·',
      ' ·    · ',
      '  ·  ·  ',
      '   ··   ',
    ],
  },
  {
    id: 'closure',
    title: 'Closure',
    description: 'The mind fills in missing information to perceive a complete form. You see a triangle even when only three pac-man shapes are arranged at the corners. The completed form exists in your perception, not in the stimulus.',
    example: 'Reading redacted text: "The ███ jumped over the ███." You can\'t see the words, but your mind constructs plausible completions from context.',
    antipattern: 'Linear thinking: "I don\'t have complete information, so I can\'t proceed." Gestalt says: the gaps are informative. What your mind fills in reveals your model.',
    visual: [
      '╭───      ───╮',
      '│            │',
      '              ',
      '│            │',
      '╰───      ───╯',
    ],
  },
  {
    id: 'proximity',
    title: 'Proximity',
    description: 'Elements near each other are perceived as a group. Distance creates boundaries. This is spatial, but it generalizes: things that happen near each other in time, in code, in conversation — get grouped.',
    example: 'Code architecture: functions in the same file feel related. Move one to a different module and it immediately feels separate, even if the logic is identical.',
    antipattern: 'Categorical thinking: group by type regardless of proximity. All "utils" in one folder — even though each util is only used by one module.',
    visual: [
      '■ ■ ■    ■ ■ ■',
      '■ ■ ■    ■ ■ ■',
      '',
      '■ ■ ■    ■ ■ ■',
    ],
  },
  {
    id: 'similarity',
    title: 'Similarity',
    description: 'Elements that look alike are perceived as part of the same group. Color, shape, size, orientation — any shared attribute creates an implicit grouping in the mind.',
    example: 'In a codebase, consistent naming conventions (snake_case vs camelCase) create perceived boundaries between systems even without explicit separation.',
    antipattern: 'Reductionist thinking: treat every element as independent. Miss the pattern that all the failing tests share a common setup function.',
    visual: [
      '● ○ ● ○ ● ○',
      '● ○ ● ○ ● ○',
      '● ○ ● ○ ● ○',
    ],
  },
  {
    id: 'figure-ground',
    title: 'Figure / Ground',
    description: 'Perception organizes into a foreground figure and a background. You can\'t see both simultaneously — attention selects one. The same information produces different meanings depending on which layer you attend to.',
    example: 'Debugging: the error message is figure, the working code is ground. Flip it: the working code is figure, and the error reveals what the working code assumes.',
    antipattern: 'Analytical thinking treats everything as figure — equal weight, no depth. Gestalt says: what you choose to foreground is itself a decision that shapes understanding.',
    visual: [
      '█░░░░░░░█',
      '█░░░░░░░█',
      '█░░    ░░█',
      '█░░░░░░░█',
      '█░░░░░░░█',
    ],
  },
  {
    id: 'continuity',
    title: 'Continuity',
    description: 'The mind follows lines and curves in the smoothest path. When two lines cross, you perceive two continuous lines, not four segments meeting at a point. The trajectory carries meaning.',
    example: 'Reading code: you follow the data flow, not the file structure. A value that flows through 5 functions across 3 files is perceived as one continuous path.',
    antipattern: 'Discrete thinking: analyze each function in isolation. Miss that the real unit of meaning is the flow, not the boundary.',
    visual: [
      '      ╱    ',
      '    ╱  ╲   ',
      '  ╱  ╳  ╲  ',
      '╱  ╱    ╲  ',
      ' ╱        ╲',
    ],
  },
]

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi']

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
          return (
            <article
              key={p.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 24,
                paddingBottom: isLast ? 0 : 36,
                marginBottom: isLast ? 0 : 36,
                borderBottom: isLast ? 'none' : '1px solid #1f2937',
              }}
            >
              <div>
                <div style={{ ...smallCaps, marginBottom: 10 }}>Principle {roman[i]}</div>
                <pre style={{
                  fontFamily: 'var(--mono, monospace)', fontSize: 10, lineHeight: 1.5,
                  color: '#6b7280', margin: 0, whiteSpace: 'pre',
                }}>{p.visual.join('\n')}</pre>
              </div>
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
