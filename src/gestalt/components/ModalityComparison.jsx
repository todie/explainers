import { useState } from 'react'

const MODALITIES = [
  {
    id: 'analytical',
    name: 'Analytical',
    color: '#60a5fa',
    core: 'Decompose into parts, examine each, reconstruct',
    strength: 'Precision. Every component is understood in isolation. Causal chains are explicit.',
    blindspot: 'Loses emergent properties. The whole is different from the sum of parts — analysis can\'t recover what decomposition destroys.',
    relationship: 'Gestalt is the inverse. Where analysis breaks down, gestalt perceives the structure that decomposition misses. Use analysis on the parts gestalt identifies.',
  },
  {
    id: 'linear',
    name: 'Linear / Sequential',
    color: '#22d3ee',
    core: 'Step-by-step progression, A → B → C',
    strength: 'Reproducibility. Anyone can follow the steps. Progress is measurable.',
    blindspot: 'Assumes order matters. Some problems are spatial, not sequential — the answer exists in the relationship between all parts simultaneously.',
    relationship: 'Gestalt perception is instantaneous, not sequential. You don\'t "figure out" a face one feature at a time — you recognize it all at once. Linear thinking explains how; gestalt grasps what.',
  },
  {
    id: 'systems',
    name: 'Systems Thinking',
    color: '#4ade80',
    core: 'Feedback loops, interdependencies, emergent behavior',
    strength: 'Handles complexity. Sees second-order effects, delay, and nonlinearity.',
    blindspot: 'Can over-model. Not everything is a system. Sometimes the pattern is perceptual, not structural — the map is the territory.',
    relationship: 'Closest cousin. Both see wholes. But systems thinking maps the structure explicitly (stocks, flows, delays). Gestalt is pre-structural — it\'s the perception that something is a system before you model it.',
  },
  {
    id: 'critical',
    name: 'Critical Thinking',
    color: '#f87171',
    core: 'Evaluate claims, identify assumptions, test logic',
    strength: 'Rigor. Catches errors, biases, and unfounded leaps.',
    blindspot: 'Evaluative, not generative. Can tell you what\'s wrong but not what to see. Gestalt provides the hypothesis that critical thinking then tests.',
    relationship: 'Complementary. Gestalt generates the "wait, I see something" moment. Critical thinking asks "is what you see actually there?" Without gestalt, nothing to evaluate. Without criticism, pattern-matching runs wild.',
  },
  {
    id: 'design',
    name: 'Design Thinking',
    color: '#a855f7',
    core: 'Empathize, define, ideate, prototype, test',
    strength: 'Human-centered. Iterative. Embraces ambiguity early.',
    blindspot: 'Process-oriented. The five stages are scaffolding, not cognition. The actual insight happens between the steps — in the gestalt moment when the problem reframes.',
    relationship: 'Design thinking borrowed from gestalt psychology. The "reframe" step in design thinking is literally a figure-ground reversal. Gestalt is the perceptual engine that design thinking wraps in a process.',
  },
  {
    id: 'convergent',
    name: 'Convergent / Divergent',
    color: '#facc15',
    core: 'Diverge to generate options, converge to select',
    strength: 'Structured creativity. Separates generation from judgment.',
    blindspot: 'Treats ideas as discrete items to produce and filter. Misses that the best insight is often a reperception of what you already have, not a new idea.',
    relationship: 'Gestalt is neither convergent nor divergent — it\'s a shift in perception. You don\'t generate the answer or narrow to it. You suddenly see it, because the configuration reorganizes.',
  },
]

export default function ModalityComparison() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Gestalt vs Other Modalities
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 540, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Not better or worse — different. Each modality has a blindspot that another covers.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, maxWidth: 700, margin: '0 auto' }}>
        {MODALITIES.map((m) => (
          <div
            key={m.id}
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            style={{
              background: expanded === m.id
                ? `linear-gradient(135deg, #111827 0%, ${m.color}06 100%)`
                : '#111827',
              border: `1px solid ${expanded === m.id ? m.color + '30' : '#1f2937'}`,
              borderRadius: 14, padding: '20px 22px', cursor: 'pointer',
              transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${m.color}, ${m.color}30)` }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: m.color }}>{m.name}</span>
              <span style={{ fontSize: 13, color: '#4b5563', transition: 'transform 0.2s', transform: expanded === m.id ? 'rotate(180deg)' : 'none' }}>▾</span>
            </div>

            <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'var(--mono, monospace)', marginBottom: expanded === m.id ? 16 : 0 }}>{m.core}</div>

            {expanded === m.id && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 14, borderTop: '1px solid #1f2937' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Strength</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{m.strength}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Blindspot</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{m.blindspot}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Relationship to gestalt</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{m.relationship}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
