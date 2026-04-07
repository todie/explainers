// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version had six click-to-expand cards, one per ramification,
// each coloured differently (red/blue/green/yellow/purple/cyan) — another
// rainbow-per-section. Now inlined as numbered academic entries with
// hairline separators. All content visible on load.

const RAMIFICATIONS = [
  {
    id: 'translation',
    title: 'The Translation Tax',
    summary: 'Every thought crosses a format boundary before it reaches another person. The tax varies by mode.',
    detail: 'Verbal thinkers pay almost nothing — thought is already language. Visual thinkers pay moderately — they draw or describe. Auditory thinkers pay heavily — "it sounds wrong" is not an accepted proof. Gestalt thinkers pay the most — the perception has no native output format at all. Every communication from a gestalt thinker is a compression of something that was originally richer than any single format can hold. This is why gestalt thinkers are often perceived as vague or hand-wavy: they\'re not being imprecise, they\'re trying to transmit a 4D structure through a 1D channel.',
  },
  {
    id: 'credibility',
    title: 'The Credibility Asymmetry',
    summary: 'Verbal thinkers are automatically credible in verbal cultures. Gestalt thinkers are automatically suspect.',
    detail: 'Most professional environments are verbal-dominant: meetings, documents, Slack, email, code reviews. The currency of credibility is explanation. "I can articulate why" beats "I know this is right." Verbal thinkers start with credibility because their internal process matches the external expectation. Gestalt thinkers start in debt — they have the answer but not the proof. They must reverse-engineer a verbal justification for an insight that arrived pre-verbally. The justification is real but was constructed after the fact, which makes it feel dishonest even though the insight is sound.',
  },
  {
    id: 'collaboration',
    title: 'Cross-Mode Collaboration',
    summary: 'The most productive teams contain multiple modes — but only if each mode is recognized as valid.',
    detail: 'A gestalt thinker detects the problem shape. A visual thinker maps it. An auditory thinker notices the temporal pattern. A verbal thinker articulates the plan. This is the ideal. In practice, the verbal thinker\'s contribution is treated as the "real" work because it produced the document. The gestalt thinker\'s contribution — the initial perception that oriented everyone — is invisible because it was never recorded in a legible format. The failure mode is not disagreement but erasure: the non-verbal contributions are consumed but not credited.',
  },
  {
    id: 'education',
    title: 'Educational Mismatch',
    summary: 'Most education is verbal-first. Non-verbal thinkers are taught that their native mode is not real thinking.',
    detail: 'School rewards articulation: essays, proofs, step-by-step solutions, oral presentations. A gestalt thinker who perceives the answer but can\'t show their work is marked wrong. A visual thinker who solves a geometry problem by seeing the shape is told to "show the proof." An auditory thinker who detects the pattern is told "how do you know?" Over time, non-verbal thinkers internalize the message: the thought doesn\'t count unless it\'s in words. Some learn to translate efficiently. Others lose access to their native mode entirely — they learn to think in words because that\'s what\'s rewarded, even though it\'s not their strongest processing channel.',
  },
  {
    id: 'speed',
    title: 'Speed vs Legibility Trade-off',
    summary: 'Gestalt processing is the fastest mode for insight but the slowest for communication.',
    detail: 'The gestalt perception is instantaneous — the whole configuration resolves in a single perceptual act. A verbal thinker building toward the same conclusion might take ten steps. But the verbal thinker\'s conclusion is already in communicable form. The gestalt thinker has the answer but now needs ten minutes (or an hour) to translate it. In time-pressured environments, this creates a paradox: the fastest thinker appears to be the slowest because their output arrives last. The verbal thinker who talks through their reasoning appears faster because they produce output continuously, even though the reasoning is still in progress.',
  },
  {
    id: 'ai',
    title: 'Implications for AI Interaction',
    summary: 'LLMs are verbal processors. The interface between gestalt humans and verbal AI has a fundamental impedance mismatch.',
    detail: 'Large language models think in tokens — the most extreme form of verbal processing. When a gestalt thinker gives a terse prompt ("it\'s broken"), the LLM needs to reconstruct the whole from a fragment. It can do this because it has accumulated context. But it does it verbally — by narrating a chain of inferences. The gestalt thinker doesn\'t need the narration; they need the shape of the answer. This is why terse-prompt workflows work well for gestalt thinkers: they provide the structural direction, the LLM fills in the verbal detail. The human sees the whole; the AI generates the parts. It\'s a natural partnership when each side does what it\'s best at.',
  },
]

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }
const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi']

export default function Ramifications() {
  return (
    <section>
      <header style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          Ramifications
        </h2>
        <p style={{ ...body, color: '#9ca3af' }}>
          Thinking mode isn't a personality trait — it's cognitive
          infrastructure. It shapes credibility, collaboration, education,
          and how you interact with AI.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {RAMIFICATIONS.map((r, i) => {
          const isLast = i === RAMIFICATIONS.length - 1
          return (
            <article
              key={r.id}
              style={{
                paddingBottom: isLast ? 0 : 36,
                marginBottom: isLast ? 0 : 36,
                borderBottom: isLast ? 'none' : '1px solid #1f2937',
              }}
            >
              <div style={{ ...smallCaps, marginBottom: 10 }}>Ramification {roman[i]}</div>
              <h3 style={{
                fontSize: 19, fontWeight: 700, color: '#f9fafb',
                letterSpacing: '-0.01em', margin: '0 0 10px 0',
              }}>
                {r.title}
              </h3>
              <p style={{ ...body, fontStyle: 'italic', color: '#9ca3af', marginBottom: 14 }}>
                {r.summary}
              </p>
              <p style={body}>{r.detail}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
