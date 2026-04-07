import TableOfContents from '../shared/TableOfContents'
import Protocol from './components/Protocol'
import Servers from './components/Servers'

const SECTIONS = [
  { id: 'how-it-works', title: 'How It Works', icon: '⚙\uFE0F' },
  { id: 'servers', title: 'Language Servers', icon: '🧠' },
]

export default function LSPApp() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0904 0%, #030712 15%, #030712 100%)' }}>
      <TableOfContents sections={SECTIONS} accent="#facc15" />
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(250, 204, 21, 0.06) 0%, rgba(96, 165, 250, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.15)',
            fontSize: 12, color: '#facc15', fontFamily: 'var(--mono, monospace)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Developer Tools
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #facc15 0%, #60a5fa 40%, #4ade80 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Language Server Protocol
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 660,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Before LSP, every editor reimplemented code intelligence for every language.
            LSP decouples the two: editors speak one protocol, language servers speak one protocol.
            M editors + N languages = M + N implementations instead of M &times; N.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Core thesis */}
        <div style={{
          maxWidth: 660, margin: '0 auto', padding: '28px', textAlign: 'center',
          background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.15)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 15, color: '#d1d5db', lineHeight: 1.8 }}>
            <strong style={{ color: '#facc15' }}>The M &times; N problem:</strong> 10 editors &times; 20 languages = 200 integrations.
            {' '}<strong style={{ color: '#4ade80' }}>LSP's solution:</strong> 10 editors + 20 servers = 30 integrations.
            Each editor implements the LSP client once. Each language implements its server once.
            Everyone gets go-to-definition, find-references, hover, completions, diagnostics — for free.
          </div>
        </div>

        <div id="how-it-works" style={{ scrollMarginTop: 60 }}><Protocol /></div>
        <div id="servers" style={{ scrollMarginTop: 60 }}><Servers /></div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            LSP was created by Microsoft for VS Code (2016) and is now an{' '}
            <a href="https://microsoft.github.io/language-server-protocol/" style={{ color: '#facc15', textDecoration: 'none' }}>open specification</a>.
            Used by VS Code, Neovim, Helix, Zed, Claude Code, and most modern editors.
          </p>
        </footer>
      </div>
    </div>
  )
}
