import ProcessingModes from './components/ProcessingModes'
import GestaltPrinciples from './components/GestaltPrinciples'
import Ramifications from './components/Ramifications'
import Research from './components/Research'

export default function GestaltApp() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        background: 'linear-gradient(180deg, #111827 0%, #030712 100%)', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(248, 113, 113, 0.06) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.15)',
            fontSize: 12, color: '#f87171', fontFamily: 'var(--mono, monospace)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Cognitive Processing
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #f87171 0%, #a855f7 40%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Gestalt Thinking
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 660,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Some people think in words. Some in images. Some in sounds.
            Gestalt thinkers process in none of these — they perceive the whole configuration
            directly, before any representation exists. This is a model of how that works,
            what it means, and what it costs.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Core thesis */}
        <div style={{
          maxWidth: 660, margin: '0 auto', padding: '28px', textAlign: 'center',
          background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.15)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 15, color: '#d1d5db', lineHeight: 1.8 }}>
            The medium of thought is not neutral. A verbal thinker and a gestalt thinker
            looking at the same problem are not "thinking different things" — they are
            <strong style={{ color: '#a855f7' }}> thinking in different dimensions</strong>.
            The verbal thinker builds understanding sequentially, proposition by proposition.
            The gestalt thinker perceives the entire configuration at once — then spends
            the rest of the conversation trying to compress that perception into words.
            Neither is better. But the mismatch between modes is the source of most
            communication failures between smart people who agree on the facts.
          </div>
        </div>

        <ProcessingModes />
        <GestaltPrinciples />
        <Ramifications />
        <Research />

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Rooted in work by Wertheimer, Koffka, and K&ouml;hler (Berlin school, 1920s).
            Extended with modern cognitive processing and neuroscience research.
            Academic citations in the Further Reading section above. Built by{' '}
            <a href="https://todie.io" style={{ color: '#a855f7', textDecoration: 'none' }}>todie.io</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
