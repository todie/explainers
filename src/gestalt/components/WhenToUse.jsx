const SCENARIOS = [
  {
    signal: 'You have all the facts but no insight',
    gestalt: 'Step back. Stop analyzing. Let the configuration speak. The answer is in the arrangement, not the elements.',
    color: '#60a5fa',
  },
  {
    signal: 'The problem keeps reframing itself',
    gestalt: 'You\'re experiencing multistability — the same data supports multiple interpretations. Don\'t force one. Hold both until a figure-ground reversal clicks.',
    color: '#a855f7',
  },
  {
    signal: 'Experts disagree despite seeing the same data',
    gestalt: 'They\'re perceiving different gestalts. The disagreement isn\'t about facts — it\'s about which whole they see. Make the competing wholes explicit.',
    color: '#4ade80',
  },
  {
    signal: 'You feel like something is off but can\'t articulate it',
    gestalt: 'That\'s pre-verbal gestalt perception. Your mind has detected a pattern break before your language system can name it. Trust the feeling, then investigate.',
    color: '#facc15',
  },
  {
    signal: 'Adding more detail makes things less clear',
    gestalt: 'You\'ve crossed the threshold where parts obscure the whole. Zoom out. Blur the details. What shape does the mess form?',
    color: '#f87171',
  },
  {
    signal: 'The solution was obvious in hindsight',
    gestalt: 'It was always visible — you were just attending to the wrong layer. Gestalt thinking is the practice of flipping figure and ground before hindsight does it for you.',
    color: '#22d3ee',
  },
]

export default function WhenToUse() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        When to Reach for Gestalt
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 520, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Signals that the problem needs a perceptual shift, not more analysis.
      </p>

      <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SCENARIOS.map((s, i) => (
          <div key={i} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 14,
            padding: '20px 24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${s.color}, ${s.color}30)` }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 8 }}>
              "{s.signal}"
            </div>
            <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{s.gestalt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
