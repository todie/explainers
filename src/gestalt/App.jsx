import TableOfContents from '../shared/TableOfContents'
import ProcessingModes from './components/ProcessingModes'
import Visualization from './components/Visualization'
import Examples from './components/Examples'
import GestaltPrinciples from './components/GestaltPrinciples'
import ProsCons from './components/ProsCons'
import Ramifications from './components/Ramifications'
import Research from './components/Research'

// Section icons: all real emoji, no text-glyph mix-ins.
// The registry used to mix '◉', '◫', '↯', '⚖︎' (text glyphs that fall
// through the <Emoji> component as plain <span>s) with '💬', '👁️', '⚡︎',
// '📄' (Twemoji SVGs). Two icon styles in one list violates .impeccable.md
// Principle 3 (restraint). Every item now renders via Twemoji for a
// single, consistent look.
const SECTIONS = [
  { id: 'thesis', title: 'Thesis', icon: '💡' },
  { id: 'thoughtforms', title: 'Thoughtforms', icon: '💬' },
  { id: 'visualization', title: 'What It Looks Like', icon: '👁\uFE0F' },
  { id: 'examples', title: 'In the Wild', icon: '⚡\uFE0F' },
  { id: 'principles', title: 'Principles', icon: '🔷' },
  { id: 'pros-cons', title: 'Pros & Cons', icon: '⚖\uFE0F' },
  { id: 'ramifications', title: 'Ramifications', icon: '🌊' },
  { id: 'research', title: 'Further Reading', icon: '📄' },
]

export default function GestaltApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0510 0%, #030712 15%, #030712 100%)',
    }}>
      <TableOfContents sections={SECTIONS} accent="#a855f7" />

      <header style={{
        padding: '96px 24px 56px', textAlign: 'left',
        maxWidth: 720, margin: '0 auto',
      }}>
        {/* No ambient glow, no gradient chrome — the page is an essay, not
            a landing page. Per .impeccable.md: "typography does the hierarchy,
            not color". The hero is left-aligned, small overline, heavy title
            in solid accent, lede in muted body copy. */}
        <div style={{
          fontSize: 11, color: '#a855f7', fontFamily: 'var(--mono, monospace)',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16,
        }}>
          todie.io / explainers
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.08,
          letterSpacing: '-0.02em', color: '#f9fafb', marginBottom: 20,
        }}>
          Gestalt Thinking
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 19px)', color: '#9ca3af',
          lineHeight: 1.6, maxWidth: 620,
        }}>
          Some people think in words. Some in images. Some in sounds.
          Gestalt thinkers process in none of these — they perceive the whole
          configuration directly, before any representation exists. This is a
          model of how that works, what it means, and what it costs.
        </p>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 72 }}>
        {/* Thesis: no rounded-box container, no tinted background. A single
            purple hairline on the left, a plain block of prose. This is
            the ONE blockquote style the explainer accent earns per
            .impeccable.md "one source of color per page". */}
        <blockquote id="thesis" style={{
          margin: 0, padding: '4px 0 4px 24px',
          borderLeft: '2px solid #a855f7',
          scrollMarginTop: 72,
        }}>
          <p style={{ fontSize: 17, color: '#d1d5db', lineHeight: 1.75, margin: 0 }}>
            The medium of thought is not neutral. A verbal thinker and a gestalt
            thinker looking at the same problem are not "thinking different
            things" — they are <em>thinking in different dimensions</em>. The
            verbal thinker builds understanding sequentially, proposition by
            proposition. The gestalt thinker perceives the entire configuration
            at once — then spends the rest of the conversation trying to
            compress that perception into words. Neither is better. But the
            mismatch between modes is the source of most communication failures
            between smart people who agree on the facts.
          </p>
        </blockquote>

        <div id="thoughtforms" style={{ scrollMarginTop: 72 }}><ProcessingModes /></div>
        <div id="visualization" style={{ scrollMarginTop: 72 }}><Visualization /></div>
        <div id="examples" style={{ scrollMarginTop: 72 }}><Examples /></div>
        <div id="principles" style={{ scrollMarginTop: 72 }}><GestaltPrinciples /></div>
        <div id="pros-cons" style={{ scrollMarginTop: 72 }}><ProsCons /></div>
        <div id="ramifications" style={{ scrollMarginTop: 72 }}><Ramifications /></div>
        <div id="research" style={{ scrollMarginTop: 72 }}><Research /></div>

        <footer style={{ paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
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
