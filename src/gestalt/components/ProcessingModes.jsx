import { useState } from 'react'

const MODES = [
  {
    id: 'verbal',
    name: 'Verbal / Linguistic',
    color: '#60a5fa',
    icon: '💬',
    inner: 'An internal monologue — words and sentences stream through consciousness. Thinking feels like talking to yourself. The voice is continuous, narrating, arguing, rehearsing.',
    thoughtform: 'The basic unit of thought is a proposition — a sentence-shaped claim that can be true or false. Verbal thinkers build understanding by chaining propositions: premise, inference, conclusion. Each thought has a beginning, middle, and end. Thoughts queue — you finish one before starting the next. Complex ideas are built by nesting sentences inside sentences, like parenthetical clauses. When a verbal thinker encounters a new concept, they try to define it — to trap it in words. If the words come easily, they feel they understand. If not, they feel confused, even if they could demonstrate the concept through action.',
    generation: 'Thoughts arrive as language. A verbal thinker solving a problem literally talks through it internally: "OK, so if this is true, then that means..." Understanding is inseparable from articulation. The thought doesn\'t exist in a pre-verbal form — the words ARE the thought. This means verbal thinkers can communicate precisely but are bottlenecked by the serial nature of language.',
    memory: 'Verbal thinkers remember by rehearsal — repeating information in inner speech. They recall conversations as dialogue, not scenes. They often remember what was said better than how it was said or how it felt. Notes and written records feel like extensions of thought, not translations of it.',
    blind: 'Anything that resists serialization. Spatial relationships, musical structure, emotional texture, system dynamics — these have to be narrated to be "understood," and the narration is always lossy. A verbal thinker can describe a face but cannot reconstruct it from the description.',
    experience: '"I think in sentences. When I solve a problem, I narrate the steps internally. My understanding IS my explanation. If I can\'t say it clearly, I don\'t understand it yet. Sometimes I catch myself mid-thought and rephrase — the thought literally changes when the words change."',
  },
  {
    id: 'visual',
    name: 'Visual / Spatial',
    color: '#a855f7',
    icon: '🎨',
    inner: 'Mental images — scenes, diagrams, spatial layouts, colors. Thinking feels like watching an internal screen or manipulating objects in a mental workspace. The images can be rotated, zoomed, overlaid.',
    thoughtform: 'The basic unit of thought is a scene or configuration — a spatial arrangement of elements in a mental workspace. Visual thinkers understand by seeing where things are in relation to each other. A "concept" is a shape. A "relationship" is a spatial proximity or connection line. Complexity is handled by zooming in and out — the big picture is literally a picture that can be inspected at different scales. When a visual thinker encounters something new, they try to map it — where does it go? What does it connect to? What shape is it?',
    generation: 'Thoughts arrive as images. A visual thinker solving an architecture problem sees the boxes and arrows form. They don\'t describe the system to themselves — they see it. The image is the thought. It can be inspected without being serialized. Multiple relationships are visible simultaneously because spatial layout encodes them in parallel. This means visual thinkers can hold more relational complexity at once than verbal thinkers, but only for things that have spatial analogs.',
    memory: 'Visual thinkers remember by imagery — they recall scenes, positions, colors, spatial layouts. They often remember where something was on a page, what a person looked like, or the layout of a room. They may struggle to recall exact wording but can reconstruct the diagram from memory.',
    blind: 'Abstract concepts that don\'t map to space. Ethics, logic, temporal sequences, causation — these have to be spatialized (as timelines, flowcharts, force diagrams) to be "seen," and the spatial metaphor shapes the understanding in ways that may not match the domain.',
    experience: '"I see the solution before I can explain it. When I think about code architecture, I see boxes and arrows. When something is wrong, the picture looks wrong — a gap, a tangle, a shape that doesn\'t fit. I often sketch things not to communicate but to think. The sketch IS my thinking process."',
  },
  {
    id: 'auditory',
    name: 'Auditory / Musical',
    color: '#22d3ee',
    icon: '🎵',
    inner: 'Sounds, rhythms, tonal patterns, cadences. Thinking feels like hearing — internal music, echoes of conversations, patterns in pitch and timing. The sounds have texture, weight, movement.',
    thoughtform: 'The basic unit of thought is a pattern in time — a rhythm, a melody, a cadence, a resonance. Auditory thinkers understand by hearing whether something "sounds right." Harmony signals correctness. Dissonance signals error. Repetition signals structure. Variation signals development. A concept isn\'t a word or an image — it\'s a tonal quality, a feeling of resonance or dissonance. When an auditory thinker encounters something new, they listen for its rhythm — does it fit the pattern? Does it clash?',
    generation: 'Thoughts arrive as patterns. An auditory thinker reading code doesn\'t just parse logic — they hear the cadence of the functions, the rhythm of the control flow, the harmony of the naming. A function that\'s too long doesn\'t just look wrong — it sounds wrong, like a musical phrase that goes on past its natural resolution. This is the least understood processing mode because its outputs are the hardest to translate.',
    memory: 'Auditory thinkers remember by echo — they can replay conversations internally, recall the exact tone someone used, remember melodies decades after hearing them. They may remember the feel of a conversation (warm, tense, rushed) more accurately than the visual scene or the exact words.',
    blind: 'Static structures. Spatial layout, visual design, still images — things without temporal movement or pattern. An auditory thinker may struggle with maps, diagrams, or any representation that requires simultaneous spatial comparison rather than temporal unfolding.',
    experience: '"Code has a rhythm. When a function is too long, it doesn\'t sound right — the cadence breaks. I hear bugs before I see them. When I\'m learning something new, I know I understand it when it stops sounding like noise and starts sounding like music. I often catch errors because something \'sounds off\' before I can identify what."',
  },
  {
    id: 'gestalt',
    name: 'Gestalt / Configurational',
    color: '#f87171',
    icon: '👁',
    inner: 'Neither words, images, nor sounds. A direct apprehension of the whole configuration — its structure, its tensions, its completeness or incompleteness. Thinking feels like a shape that exists before any representation of it. Not a shape you see — a shape you ARE.',
    thoughtform: 'The basic unit of thought is a configuration — the total structure of relationships, tensions, completions, and gaps in a situation, perceived all at once. This is not a metaphor. Gestalt thinkers do not "see" a whole and then describe it. They perceive the whole directly, the way you perceive balance — you don\'t calculate it, you feel it. A concept is not a word, an image, or a sound — it\'s a felt sense of structural completeness or incompleteness. When a gestalt thinker encounters something new, they don\'t ask "what is it?" — they feel whether the current configuration is complete or has a gap where this new thing might fit. Understanding is not knowing facts but perceiving how everything relates.',
    generation: 'Thoughts arrive as wholes. A gestalt thinker solving a problem doesn\'t build toward a solution — the solution arrives complete, as a sudden reorganization of the entire problem space. This is the "aha" moment that all modalities experience occasionally, but for gestalt thinkers it is the primary mode of thought. The insight is pre-verbal, pre-visual, pre-everything. It exists as pure structure before any representation is generated. The gestalt thinker then faces the translation problem: the insight has no native format. Every expression of it — words, diagrams, code — is a lossy compression of the original perception.',
    memory: 'Gestalt thinkers remember by configuration — they recall the shape of a situation, the feel of a relationship between parts, the sense of what was resolved and what was left open. They may not remember exact words or visual details but will remember whether something "fit" or "didn\'t fit." They often surprise others by connecting ideas from completely different domains — because they stored them by structural shape, not by content.',
    blind: 'Sequential explanation. The gestalt perception is instantaneous and total, but communication is sequential and partial. Gestalt thinkers frequently know something is true but cannot explain why. They may be perceived as "intuitive" (dismissive) or "hand-wavy" (critical) by verbal thinkers who demand step-by-step justification. The translation cost is the highest of any modality — not because the perception is vague, but because it is too complete for any single format.',
    experience: '"I don\'t think in words or pictures. I just... know the shape of the problem. The answer arrives whole — not as a sentence or an image but as a felt certainty about structure. Then I spend 20 minutes figuring out how to explain it to someone who thinks in words. Sometimes I can\'t. Sometimes the best I can do is \'trust me, this is the shape of it\' — and that\'s not an argument. That\'s the hardest part."',
  },
]

const COMPARISON = [
  {
    dimension: 'Basic unit of thought',
    verbal: 'A proposition (sentence)',
    visual: 'A scene (spatial layout)',
    auditory: 'A pattern (temporal rhythm)',
    gestalt: 'A configuration (total structure)',
  },
  {
    dimension: 'What arrives first',
    verbal: 'A sentence forming',
    visual: 'An image appearing',
    auditory: 'A sound or resonance',
    gestalt: 'A felt sense of the whole',
  },
  {
    dimension: 'How you know you understand',
    verbal: 'You can explain it in words',
    visual: 'You can picture it clearly',
    auditory: 'It sounds right / harmonious',
    gestalt: 'The configuration resolves — it clicks',
  },
  {
    dimension: 'How complexity is handled',
    verbal: 'Nested clauses, longer arguments',
    visual: 'Zoom in/out, more layers',
    auditory: 'More voices, richer harmony',
    gestalt: 'The whole simply has more structure',
  },
  {
    dimension: 'What error feels like',
    verbal: 'The logic doesn\'t follow',
    visual: 'The picture looks wrong',
    auditory: 'It sounds off / dissonant',
    gestalt: 'Something is incomplete or misaligned',
  },
  {
    dimension: 'Communication cost',
    verbal: 'Low — thought is already language',
    visual: 'Medium — draw it or describe it',
    auditory: 'High — "sounds wrong" isn\'t proof',
    gestalt: 'Highest — no native output format',
  },
  {
    dimension: 'Speed of insight',
    verbal: 'Sequential — speed of speech',
    visual: 'Parallel for spatial, slow for abstract',
    auditory: 'Real-time for temporal patterns',
    gestalt: 'Instant — whole arrives before parts',
  },
  {
    dimension: 'What gets stored in memory',
    verbal: 'Words, arguments, definitions',
    visual: 'Scenes, positions, colors',
    auditory: 'Tones, rhythms, echoes',
    gestalt: 'Configurations, relationships, fit',
  },
  {
    dimension: 'Cross-domain transfer',
    verbal: 'By analogy (naming similarities)',
    visual: 'By spatial mapping (same shape)',
    auditory: 'By resonance (same pattern)',
    gestalt: 'Automatic — stored by structure, not content',
  },
]

const modeColors = { verbal: '#60a5fa', visual: '#a855f7', auditory: '#22d3ee', gestalt: '#f87171' }

export default function ProcessingModes() {
  const [active, setActive] = useState(null)
  const [showTable, setShowTable] = useState(false)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Thoughtforms
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 600, margin: '0 auto 12px', textAlign: 'center', lineHeight: 1.7 }}>
        People don't all think in the same medium. Each processing mode has a different basic unit of thought —
        a different shape that ideas take before they're communicated. These aren't preferences. They're architectures.
      </p>
      <p style={{ fontSize: 13, color: '#4b5563', maxWidth: 560, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.6 }}>
        The medium of thought determines what's easy to think, what's hard to think, what gets remembered,
        and what gets lost in translation.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto' }}>
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
            {m.id === 'gestalt' && (
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${m.color}, ${m.color}40)` }} />
            )}

            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ fontSize: 24, lineHeight: 1, marginTop: 2 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: m.color, marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>{m.inner}</div>
              </div>
              <span style={{ fontSize: 14, color: '#4b5563', transition: 'transform 0.2s', transform: active === m.id ? 'rotate(180deg)' : 'none', marginTop: 4 }}>▾</span>
            </div>

            {active === m.id && (
              <div style={{ padding: '0 24px 28px 62px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                    The thoughtform
                  </div>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8 }}>{m.thoughtform}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                    How thoughts generate
                  </div>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8 }}>{m.generation}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                    What gets remembered
                  </div>
                  <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.8 }}>{m.memory}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                    What this mode can't reach
                  </div>
                  <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.8 }}>{m.blind}</div>
                </div>
                <div style={{
                  padding: '16px 20px', background: m.color + '06', border: `1px solid ${m.color}12`,
                  borderRadius: 12, fontSize: 13, color: '#d1d5db', lineHeight: 1.8, fontStyle: 'italic',
                }}>
                  {m.experience}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div style={{ textAlign: 'center', marginTop: 36 }}>
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
        <div style={{ maxWidth: 720, margin: '20px auto 0', overflowX: 'auto' }}>
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
