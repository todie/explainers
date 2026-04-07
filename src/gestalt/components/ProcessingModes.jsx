// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// The previous version was a click-to-expand accordion with colored mode
// cards, gradient-on-active backgrounds, colored section labels, and a
// Show/Hide comparison-table button. That's dashboard UX. Readers came to
// read. This version shows everything inline, separated by hairline rules,
// with typography carrying the hierarchy. Semantic color is kept only in
// the comparison table header row where it does real work (letting the
// reader track a mode-column across many rows).

const MODES = [
  {
    id: 'verbal',
    name: 'Verbal / Linguistic',
    inner: 'An internal monologue — words and sentences stream through consciousness. Thinking feels like talking to yourself. The voice is continuous, narrating, arguing, rehearsing.',
    thoughtform: 'The basic unit of thought is a proposition — a sentence-shaped claim that can be true or false. Verbal thinkers build understanding by chaining propositions: premise, inference, conclusion. Each thought has a beginning, middle, and end. Thoughts queue — you finish one before starting the next. Complex ideas are built by nesting sentences inside sentences, like parenthetical clauses. When a verbal thinker encounters a new concept, they try to define it — to trap it in words. If the words come easily, they feel they understand. If not, they feel confused, even if they could demonstrate the concept through action.',
    generation: 'Thoughts arrive as language. A verbal thinker solving a problem literally talks through it internally: "OK, so if this is true, then that means..." Understanding is inseparable from articulation. The thought doesn\'t exist in a pre-verbal form — the words ARE the thought. This means verbal thinkers can communicate precisely but are bottlenecked by the serial nature of language.',
    memory: 'Verbal thinkers remember by rehearsal — repeating information in inner speech. They recall conversations as dialogue, not scenes. They often remember what was said better than how it was said or how it felt. Notes and written records feel like extensions of thought, not translations of it.',
    blind: 'Anything that resists serialization. Spatial relationships, musical structure, emotional texture, system dynamics — these have to be narrated to be "understood," and the narration is always lossy. A verbal thinker can describe a face but cannot reconstruct it from the description.',
    experience: 'I think in sentences. When I solve a problem, I narrate the steps internally. My understanding IS my explanation. If I can\'t say it clearly, I don\'t understand it yet. Sometimes I catch myself mid-thought and rephrase — the thought literally changes when the words change.',
  },
  {
    id: 'visual',
    name: 'Visual / Spatial',
    inner: 'Mental images — scenes, diagrams, spatial layouts, colors. Thinking feels like watching an internal screen or manipulating objects in a mental workspace. The images can be rotated, zoomed, overlaid.',
    thoughtform: 'The basic unit of thought is a scene or configuration — a spatial arrangement of elements in a mental workspace. Visual thinkers understand by seeing where things are in relation to each other. A "concept" is a shape. A "relationship" is a spatial proximity or connection line. Complexity is handled by zooming in and out — the big picture is literally a picture that can be inspected at different scales. When a visual thinker encounters something new, they try to map it — where does it go? What does it connect to? What shape is it?',
    generation: 'Thoughts arrive as images. A visual thinker solving an architecture problem sees the boxes and arrows form. They don\'t describe the system to themselves — they see it. The image is the thought. It can be inspected without being serialized. Multiple relationships are visible simultaneously because spatial layout encodes them in parallel. This means visual thinkers can hold more relational complexity at once than verbal thinkers, but only for things that have spatial analogs.',
    memory: 'Visual thinkers remember by imagery — they recall scenes, positions, colors, spatial layouts. They often remember where something was on a page, what a person looked like, or the layout of a room. They may struggle to recall exact wording but can reconstruct the diagram from memory.',
    blind: 'Abstract concepts that don\'t map to space. Ethics, logic, temporal sequences, causation — these have to be spatialized (as timelines, flowcharts, force diagrams) to be "seen," and the spatial metaphor shapes the understanding in ways that may not match the domain.',
    experience: 'I see the solution before I can explain it. When I think about code architecture, I see boxes and arrows. When something is wrong, the picture looks wrong — a gap, a tangle, a shape that doesn\'t fit. I often sketch things not to communicate but to think. The sketch IS my thinking process.',
  },
  {
    id: 'auditory',
    name: 'Auditory / Musical',
    inner: 'Sounds, rhythms, tonal patterns, cadences. Thinking feels like hearing — internal music, echoes of conversations, patterns in pitch and timing. The sounds have texture, weight, movement.',
    thoughtform: 'The basic unit of thought is a pattern in time — a rhythm, a melody, a cadence, a resonance. Auditory thinkers understand by hearing whether something "sounds right." Harmony signals correctness. Dissonance signals error. Repetition signals structure. Variation signals development. A concept isn\'t a word or an image — it\'s a tonal quality, a feeling of resonance or dissonance. When an auditory thinker encounters something new, they listen for its rhythm — does it fit the pattern? Does it clash?',
    generation: 'Thoughts arrive as patterns. An auditory thinker reading code doesn\'t just parse logic — they hear the cadence of the functions, the rhythm of the control flow, the harmony of the naming. A function that\'s too long doesn\'t just look wrong — it sounds wrong, like a musical phrase that goes on past its natural resolution. This is the least understood processing mode because its outputs are the hardest to translate.',
    memory: 'Auditory thinkers remember by echo — they can replay conversations internally, recall the exact tone someone used, remember melodies decades after hearing them. They may remember the feel of a conversation (warm, tense, rushed) more accurately than the visual scene or the exact words.',
    blind: 'Static structures. Spatial layout, visual design, still images — things without temporal movement or pattern. An auditory thinker may struggle with maps, diagrams, or any representation that requires simultaneous spatial comparison rather than temporal unfolding.',
    experience: 'Code has a rhythm. When a function is too long, it doesn\'t sound right — the cadence breaks. I hear bugs before I see them. When I\'m learning something new, I know I understand it when it stops sounding like noise and starts sounding like music. I often catch errors because something "sounds off" before I can identify what.',
  },
  {
    id: 'gestalt',
    name: 'Gestalt / Configurational',
    inner: 'Neither words, images, nor sounds. A direct apprehension of the whole configuration — its structure, its tensions, its completeness or incompleteness. Thinking feels like a shape that exists before any representation of it. Not a shape you see — a shape you ARE.',
    thoughtform: 'The basic unit of thought is a configuration — the total structure of relationships, tensions, completions, and gaps in a situation, perceived all at once. This is not a metaphor. Gestalt thinkers do not "see" a whole and then describe it. They perceive the whole directly, the way you perceive balance — you don\'t calculate it, you feel it. A concept is not a word, an image, or a sound — it\'s a felt sense of structural completeness or incompleteness. When a gestalt thinker encounters something new, they don\'t ask "what is it?" — they feel whether the current configuration is complete or has a gap where this new thing might fit. Understanding is not knowing facts but perceiving how everything relates.',
    generation: 'Thoughts arrive as wholes. A gestalt thinker solving a problem doesn\'t build toward a solution — the solution arrives complete, as a sudden reorganization of the entire problem space. This is the "aha" moment that all modalities experience occasionally, but for gestalt thinkers it is the primary mode of thought. The insight is pre-verbal, pre-visual, pre-everything. It exists as pure structure before any representation is generated. The gestalt thinker then faces the translation problem: the insight has no native format. Every expression of it — words, diagrams, code — is a lossy compression of the original perception.',
    memory: 'Gestalt thinkers remember by configuration — they recall the shape of a situation, the feel of a relationship between parts, the sense of what was resolved and what was left open. They may not remember exact words or visual details but will remember whether something "fit" or "didn\'t fit." They often surprise others by connecting ideas from completely different domains — because they stored them by structural shape, not by content.',
    blind: 'Sequential explanation. The gestalt perception is instantaneous and total, but communication is sequential and partial. Gestalt thinkers frequently know something is true but cannot explain why. They may be perceived as "intuitive" (dismissive) or "hand-wavy" (critical) by verbal thinkers who demand step-by-step justification. The translation cost is the highest of any modality — not because the perception is vague, but because it is too complete for any single format.',
    experience: 'I don\'t think in words or pictures. I just… know the shape of the problem. The answer arrives whole — not as a sentence or an image but as a felt certainty about structure. Then I spend 20 minutes figuring out how to explain it to someone who thinks in words. Sometimes I can\'t. Sometimes the best I can do is "trust me, this is the shape of it" — and that\'s not an argument. That\'s the hardest part.',
  },
]

const COMPARISON = [
  { dimension: 'Basic unit of thought', verbal: 'A proposition (sentence)', visual: 'A scene (spatial layout)', auditory: 'A pattern (temporal rhythm)', gestalt: 'A configuration (total structure)' },
  { dimension: 'What arrives first', verbal: 'A sentence forming', visual: 'An image appearing', auditory: 'A sound or resonance', gestalt: 'A felt sense of the whole' },
  { dimension: 'How you know you understand', verbal: 'You can explain it in words', visual: 'You can picture it clearly', auditory: 'It sounds right / harmonious', gestalt: 'The configuration resolves — it clicks' },
  { dimension: 'How complexity is handled', verbal: 'Nested clauses, longer arguments', visual: 'Zoom in/out, more layers', auditory: 'More voices, richer harmony', gestalt: 'The whole simply has more structure' },
  { dimension: 'What error feels like', verbal: 'The logic doesn\'t follow', visual: 'The picture looks wrong', auditory: 'It sounds off / dissonant', gestalt: 'Something is incomplete or misaligned' },
  { dimension: 'Communication cost', verbal: 'Low — thought is already language', visual: 'Medium — draw it or describe it', auditory: 'High — "sounds wrong" isn\'t proof', gestalt: 'Highest — no native output format' },
  { dimension: 'Speed of insight', verbal: 'Sequential — speed of speech', visual: 'Parallel for spatial, slow for abstract', auditory: 'Real-time for temporal patterns', gestalt: 'Instant — whole arrives before parts' },
  { dimension: 'What gets stored in memory', verbal: 'Words, arguments, definitions', visual: 'Scenes, positions, colors', auditory: 'Tones, rhythms, echoes', gestalt: 'Configurations, relationships, fit' },
  { dimension: 'Cross-domain transfer', verbal: 'By analogy (naming similarities)', visual: 'By spatial mapping (same shape)', auditory: 'By resonance (same pattern)', gestalt: 'Automatic — stored by structure, not content' },
]

// --- Figure 1: the trade-off matrix -----------------------------------
//
// Each mode plotted against two axes that the rest of the section then
// explores: how fast the insight arrives (y) vs how expensive it is to
// communicate afterward (x). Gestalt sits in the top-right (fastest
// insight, highest communication cost), verbal sits in the bottom-left
// (slowest insight, trivially communicated). This visualizes the
// section's core thesis before the prose unpacks it.
//
// Coordinates are % of plot area. Plot area is 360x280 inside a 440x340
// viewBox (40 for left axis, 40 for bottom axis, 40 for top padding).
const TRADEOFF_POINTS = [
  // [x_cost_pct, y_speed_pct, label, anchor]
  { id: 'verbal',   x: 12, y: 18, label: 'Verbal',   anchor: 'start' },
  { id: 'visual',   x: 38, y: 48, label: 'Visual',   anchor: 'start' },
  { id: 'auditory', x: 62, y: 62, label: 'Auditory', anchor: 'start' },
  { id: 'gestalt',  x: 88, y: 92, label: 'Gestalt',  anchor: 'end'   },
]

function TradeoffFigure() {
  // Plot coordinates:  viewBox 440 x 340
  // Plot area:         x ∈ [60, 420], y ∈ [40, 260]   (360 wide × 220 tall)
  const plotLeft = 60
  const plotRight = 420
  const plotTop = 40
  const plotBottom = 260
  const plotWidth = plotRight - plotLeft
  const plotHeight = plotBottom - plotTop

  const toX = (pct) => plotLeft + (pct / 100) * plotWidth
  const toY = (pct) => plotBottom - (pct / 100) * plotHeight  // invert y

  return (
    <svg viewBox="0 0 440 340" width="100%" style={{ maxWidth: 560, display: 'block', margin: '0 auto' }} role="img" aria-label="Figure 1: speed of insight versus communication cost, plotted for each thinking mode">
      {/* Plot background — very faint for readability without chrome */}
      <rect
        x={plotLeft} y={plotTop}
        width={plotWidth} height={plotHeight}
        fill="none"
        stroke="#1f2937" strokeWidth="1"
      />
      {/* Grid lines */}
      {[25, 50, 75].map(pct => (
        <line
          key={`gx-${pct}`}
          x1={toX(pct)} y1={plotTop} x2={toX(pct)} y2={plotBottom}
          stroke="#1f2937" strokeWidth="0.6" strokeDasharray="2 4"
        />
      ))}
      {[25, 50, 75].map(pct => (
        <line
          key={`gy-${pct}`}
          x1={plotLeft} y1={toY(pct)} x2={plotRight} y2={toY(pct)}
          stroke="#1f2937" strokeWidth="0.6" strokeDasharray="2 4"
        />
      ))}

      {/* Diagonal: the trade-off frontier. Each mode has to land
          somewhere on this trade-off; there's no point with high speed
          AND low cost. */}
      <line
        x1={toX(5)} y1={toY(5)}
        x2={toX(95)} y2={toY(95)}
        stroke="#374151" strokeWidth="1" strokeDasharray="1 5"
      />
      <text
        x={toX(52)} y={toY(58)}
        fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)"
        transform={`rotate(-32 ${toX(52)} ${toY(58)})`}
      >
        trade-off frontier
      </text>

      {/* Data points */}
      {TRADEOFF_POINTS.map(p => {
        const isGestalt = p.id === 'gestalt'
        return (
          <g key={p.id}>
            <circle
              cx={toX(p.x)} cy={toY(p.y)} r={isGestalt ? 6 : 5}
              fill={isGestalt ? '#a855f7' : '#e5e7eb'}
              stroke={isGestalt ? '#a855f7' : '#9ca3af'}
              strokeWidth="1"
            />
            <text
              x={toX(p.x) + (p.anchor === 'end' ? -10 : 10)}
              y={toY(p.y) + 4}
              fill="#f9fafb"
              fontSize="13"
              fontWeight={isGestalt ? 700 : 500}
              textAnchor={p.anchor}
            >
              {p.label}
            </text>
          </g>
        )
      })}

      {/* X axis */}
      <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="#4b5563" strokeWidth="1.25" />
      <text x={plotLeft} y={plotBottom + 18} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)">low</text>
      <text x={plotRight} y={plotBottom + 18} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="end">high</text>
      <text
        x={(plotLeft + plotRight) / 2} y={plotBottom + 32}
        fill="#9ca3af" fontSize="11" textAnchor="middle"
        textTransform="uppercase" letterSpacing="0.08em"
      >
        Communication cost →
      </text>

      {/* Y axis */}
      <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke="#4b5563" strokeWidth="1.25" />
      <text x={plotLeft - 8} y={plotBottom} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="end">slow</text>
      <text x={plotLeft - 8} y={plotTop + 8} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="end">fast</text>
      <text
        x={16} y={(plotTop + plotBottom) / 2}
        fill="#9ca3af" fontSize="11" textAnchor="middle"
        textTransform="uppercase" letterSpacing="0.08em"
        transform={`rotate(-90 16 ${(plotTop + plotBottom) / 2})`}
      >
        ← Speed of insight
      </text>
    </svg>
  )
}

// Shared typography tokens for this component.
const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

function ModeSection({ m, isLast }) {
  return (
    <article style={{
      paddingBottom: isLast ? 0 : 56,
      borderBottom: isLast ? 'none' : '1px solid #1f2937',
      marginBottom: isLast ? 0 : 56,
    }}>
      <header style={{ marginBottom: 24 }}>
        <div style={{ ...smallCaps, marginBottom: 10 }}>Mode {m.id === 'verbal' ? 'i' : m.id === 'visual' ? 'ii' : m.id === 'auditory' ? 'iii' : 'iv'}</div>
        <h3 style={{
          fontSize: 22, fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.01em',
          margin: '0 0 12px 0',
        }}>
          {m.name}
        </h3>
        <p style={{ ...body, color: '#9ca3af', fontSize: 15 }}>{m.inner}</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ ...smallCaps, marginBottom: 8 }}>The thoughtform</div>
          <p style={body}>{m.thoughtform}</p>
        </div>
        <div>
          <div style={{ ...smallCaps, marginBottom: 8 }}>How thoughts generate</div>
          <p style={body}>{m.generation}</p>
        </div>
        <div>
          <div style={{ ...smallCaps, marginBottom: 8 }}>What gets remembered</div>
          <p style={body}>{m.memory}</p>
        </div>
        <div>
          <div style={{ ...smallCaps, marginBottom: 8 }}>What this mode can't reach</div>
          <p style={body}>{m.blind}</p>
        </div>
        <blockquote style={{
          margin: 0, padding: '0 0 0 20px',
          borderLeft: '2px solid #374151',
        }}>
          <p style={{ ...body, fontStyle: 'italic', color: '#9ca3af' }}>"{m.experience}"</p>
        </blockquote>
      </div>
    </article>
  )
}

export default function ProcessingModes() {
  return (
    <section>
      <header style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          Thoughtforms
        </h2>
        <p style={{ ...body, color: '#9ca3af' }}>
          People don't all think in the same medium. Each processing mode has a
          different basic unit of thought — a different shape that ideas take
          before they're communicated. These aren't preferences. They're
          architectures. The medium of thought determines what's easy to think,
          what's hard to think, what gets remembered, and what gets lost in
          translation.
        </p>
      </header>

      {/* Figure 1: trade-off matrix. Visualizes the section's thesis
          before the prose unpacks it. */}
      <figure style={{
        margin: '0 0 56px 0', padding: '32px 16px 24px',
        borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937',
      }}>
        <div style={{ ...smallCaps, marginBottom: 16, textAlign: 'center' }}>Figure 1</div>
        <TradeoffFigure />
        <figcaption style={{
          fontSize: 12, color: '#6b7280', marginTop: 20, textAlign: 'center',
          fontStyle: 'italic', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Figure 1. Each thinking mode trades speed of insight against
          communication cost. Verbal thought is slow to arrive but trivially
          communicated; gestalt thought arrives instantly but has no native
          output format.
        </figcaption>
      </figure>

      {MODES.map((m, i) => (
        <ModeSection key={m.id} m={m} isLast={i === MODES.length - 1} />
      ))}

      {/* Comparison table: always visible. Semantic color only in the
          header row, so the reader can track a column across rows without
          the whole table turning into a kaleidoscope. */}
      <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid #1f2937' }}>
        <div style={{ ...smallCaps, marginBottom: 10 }}>Table 1</div>
        <h3 style={{
          fontSize: 20, fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.01em',
          margin: '0 0 20px 0',
        }}>
          Side-by-side comparison
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left', padding: '12px 14px 12px 0',
                  borderBottom: '1px solid #374151',
                  color: '#6b7280', fontWeight: 700, fontSize: 10,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}>
                  Dimension
                </th>
                {['Verbal', 'Visual', 'Auditory', 'Gestalt'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 14px',
                    borderBottom: '1px solid #374151',
                    color: '#e5e7eb', fontWeight: 700, fontSize: 10,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, ri) => (
                <tr key={ri}>
                  <td style={{
                    padding: '12px 14px 12px 0', borderBottom: '1px solid #111827',
                    color: '#9ca3af', fontWeight: 500, fontSize: 12,
                    whiteSpace: 'nowrap', verticalAlign: 'top',
                  }}>{row.dimension}</td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #111827', color: '#d1d5db', verticalAlign: 'top' }}>{row.verbal}</td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #111827', color: '#d1d5db', verticalAlign: 'top' }}>{row.visual}</td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #111827', color: '#d1d5db', verticalAlign: 'top' }}>{row.auditory}</td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #111827', color: '#d1d5db', verticalAlign: 'top' }}>{row.gestalt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
