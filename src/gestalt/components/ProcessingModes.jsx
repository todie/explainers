import { useState } from 'react'

const MODES = [
  {
    id: 'verbal',
    name: 'Verbal / Linguistic',
    color: '#60a5fa',
    icon: '💬',
    inner: 'An internal monologue — words and sentences stream through consciousness. Thinking feels like talking to yourself.',
    generation: 'Thoughts arrive as language. Understanding something means being able to say it. If you can\'t articulate it, you don\'t know it yet.',
    strength: 'Precise communication. Can explain reasoning step by step. Arguments are structured. Good at debate, writing, sequential logic.',
    limitation: 'Bottlenecked by the speed of language. Can only think one sentence at a time. Struggles with spatial problems, music, or anything that doesn\'t serialize into words.',
    experience: '"I think in sentences. When I solve a problem, I narrate the steps internally. My understanding is my explanation."',
  },
  {
    id: 'visual',
    name: 'Visual / Spatial',
    color: '#a855f7',
    icon: '🎨',
    inner: 'Mental images — scenes, diagrams, spatial layouts. Thinking feels like watching a movie or manipulating objects in a mental workspace.',
    generation: 'Thoughts arrive as pictures. Understanding something means having a clear mental image of it. Diagrams are thought, not communication aids.',
    strength: 'Spatial reasoning, architecture, design. Can rotate objects mentally, see how things fit together. Good at planning physical systems.',
    limitation: 'Translating images to words is lossy. "I can see it but I can\'t explain it." May struggle to communicate insights that are inherently spatial.',
    experience: '"I see the solution. When I think about code architecture, I see boxes and arrows. When something is wrong, the picture doesn\'t look right."',
  },
  {
    id: 'auditory',
    name: 'Auditory / Musical',
    color: '#22d3ee',
    icon: '🎵',
    inner: 'Sounds, rhythms, tonal patterns. Thinking feels like hearing — internal music, echoes of conversations, patterns in cadence and pitch.',
    generation: 'Thoughts arrive as sounds or rhythmic patterns. Understanding something means it "sounds right." Dissonance signals error before logic does.',
    strength: 'Pattern recognition in temporal sequences. Good at languages, music, detecting tone/mood. Sensitive to rhythm in speech, code, prose.',
    limitation: 'Hard to communicate pattern-sense to non-auditory thinkers. "It just sounds wrong" isn\'t an argument most people accept.',
    experience: '"Code has a rhythm. When a function is too long, it doesn\'t sound right — the cadence breaks. I hear bugs before I see them."',
  },
  {
    id: 'gestalt',
    name: 'Gestalt / Holistic',
    color: '#f87171',
    icon: '👁',
    inner: 'Neither words, images, nor sounds — a direct sense of the whole configuration. Thinking feels like a shape that exists before any representation of it.',
    generation: 'Thoughts don\'t arrive as any specific modality. Understanding comes as a felt sense of the entire structure — relationships, tensions, completeness — all at once. The insight exists before any words, images, or sounds are generated to express it.',
    strength: 'Sees what others miss by not decomposing. Detects when something is "off" before knowing why. Rapid pattern recognition across domains. Reframes problems by flipping figure and ground.',
    limitation: 'The hardest modality to communicate from. The insight is pre-verbal, pre-visual, pre-everything. Translation into any format is lossy. Often perceived as "intuition" and dismissed.',
    experience: '"I don\'t think in words or pictures. I just... know the shape of the problem. The answer arrives whole. Then I spend 20 minutes figuring out how to explain it."',
  },
]

const COMPARISON = [
  {
    dimension: 'What arrives first',
    verbal: 'A sentence',
    visual: 'An image',
    auditory: 'A pattern/sound',
    gestalt: 'A felt sense of the whole',
  },
  {
    dimension: 'How you know you understand',
    verbal: 'You can explain it',
    visual: 'You can picture it',
    auditory: 'It sounds right',
    gestalt: 'It clicks — the configuration resolves',
  },
  {
    dimension: 'What error feels like',
    verbal: 'The logic doesn\'t follow',
    visual: 'The picture is wrong',
    auditory: 'It sounds off',
    gestalt: 'Something is missing from the whole',
  },
  {
    dimension: 'Communication cost',
    verbal: 'Low — thought is already language',
    visual: 'Medium — draw it or describe it',
    auditory: 'High — "it just sounds wrong" isn\'t proof',
    gestalt: 'Highest — the insight has no native format',
  },
  {
    dimension: 'Speed of insight',
    verbal: 'Sequential — speed of speech',
    visual: 'Parallel for spatial, slow for abstract',
    auditory: 'Real-time for patterns, slow for logic',
    gestalt: 'Instant — the whole arrives before the parts',
  },
  {
    dimension: 'Debugging style',
    verbal: 'Narrate the steps, find the broken one',
    visual: 'Look at the diagram, spot what\'s wrong',
    auditory: 'Listen for the dissonance',
    gestalt: 'Feel for what\'s incomplete, then zoom in',
  },
]

const modeColors = { verbal: '#60a5fa', visual: '#a855f7', auditory: '#22d3ee', gestalt: '#f87171' }

export default function ProcessingModes() {
  const [active, setActive] = useState(null)
  const [showTable, setShowTable] = useState(false)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        How Thoughts Generate
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 580, margin: '0 auto 12px', textAlign: 'center', lineHeight: 1.7 }}>
        People don't all think in the same medium. Some think in words, some in images, some in sounds.
        Gestalt thinkers process in none of these — they perceive the whole configuration directly.
      </p>
      <p style={{ fontSize: 13, color: '#4b5563', maxWidth: 540, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.6 }}>
        This isn't about preference or style. It's about what arrives in consciousness first — and what
        gets lost when you translate it.
      </p>

      {/* Mode cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 700, margin: '0 auto' }}>
        {MODES.map((m) => (
          <div
            key={m.id}
            onClick={() => setActive(active === m.id ? null : m.id)}
            style={{
              background: active === m.id ? `linear-gradient(135deg, #111827 0%, ${m.color}06 100%)` : '#111827',
              border: `1px solid ${active === m.id ? m.color + '30' : '#1f2937'}`,
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s ease',
              position: 'relative',
            }}
          >
            {/* Left accent */}
            {m.id === 'gestalt' && (
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${m.color}, ${m.color}40)` }} />
            )}

            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: m.color, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, fontStyle: 'italic' }}>{m.inner}</div>
              </div>
              <span style={{ fontSize: 14, color: '#4b5563', transition: 'transform 0.2s', transform: active === m.id ? 'rotate(180deg)' : 'none', marginTop: 4 }}>▾</span>
            </div>

            {active === m.id && (
              <div style={{ padding: '0 24px 24px 62px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    How thoughts generate
                  </div>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{m.generation}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Strength</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{m.strength}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Limitation</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{m.limitation}</div>
                  </div>
                </div>
                <div style={{
                  padding: '14px 18px', background: m.color + '08', border: `1px solid ${m.color}15`,
                  borderRadius: 10, fontSize: 13, color: '#d1d5db', lineHeight: 1.7, fontStyle: 'italic',
                }}>
                  {m.experience}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table toggle */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          onClick={() => setShowTable(v => !v)}
          style={{
            background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: 8, padding: '10px 20px', fontSize: 13, color: '#a855f7',
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          {showTable ? 'Hide' : 'Show'} side-by-side comparison
        </button>
      </div>

      {showTable && (
        <div style={{ maxWidth: 700, margin: '20px auto 0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #1f2937', color: '#6b7280', fontWeight: 600 }} />
                {['Verbal', 'Visual', 'Auditory', 'Gestalt'].map((h, i) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #1f2937',
                    color: [modeColors.verbal, modeColors.visual, modeColors.auditory, modeColors.gestalt][i],
                    fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, ri) => (
                <tr key={ri}>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.dimension}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#d1d5db' }}>{row.verbal}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#d1d5db' }}>{row.visual}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#d1d5db' }}>{row.auditory}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#f87171', fontWeight: 500 }}>{row.gestalt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
