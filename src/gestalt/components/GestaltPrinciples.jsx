import { useState } from 'react'

const PRINCIPLES = [
  {
    id: 'emergence',
    title: 'Emergence',
    color: '#60a5fa',
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
    color: '#a855f7',
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
    color: '#4ade80',
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
    color: '#facc15',
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
    color: '#f87171',
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
    color: '#22d3ee',
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

export default function GestaltPrinciples() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        The Principles
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 540, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Six laws of perceptual organization. Each one describes how the mind creates structure from ambiguity.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 700, margin: '0 auto' }}>
        {PRINCIPLES.map((p) => (
          <div
            key={p.id}
            onClick={() => setActive(active === p.id ? null : p.id)}
            style={{
              background: active === p.id
                ? `linear-gradient(135deg, #111827 0%, ${p.color}06 100%)`
                : '#111827',
              border: `1px solid ${active === p.id ? p.color + '30' : '#1f2937'}`,
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              {/* Visual mini */}
              <div style={{
                minWidth: 80, padding: '8px 0',
                fontFamily: 'var(--mono, monospace)', fontSize: 9, lineHeight: 1.4,
                color: p.color, opacity: 0.7, whiteSpace: 'pre', textAlign: 'center',
              }}>
                {p.visual.join('\n')}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: p.color, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{p.description}</div>
              </div>

              <span style={{
                fontSize: 14, color: '#4b5563', transition: 'transform 0.2s',
                transform: active === p.id ? 'rotate(180deg)' : 'none', marginTop: 4,
              }}>▾</span>
            </div>

            {active === p.id && (
              <div style={{ padding: '0 24px 24px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    Example
                  </div>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{p.example}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    What other thinking misses
                  </div>
                  <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, fontStyle: 'italic' }}>{p.antipattern}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
