import ArchitectureDiagram from './components/ArchitectureDiagram'
import ContextBlock from './components/ContextBlock'
import FlowTimeline from './components/FlowTimeline'
import Roadmap from './components/Roadmap'

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)', overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(74, 222, 128, 0.06) 0%, rgba(96, 165, 250, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.15)',
            fontSize: 12, color: 'var(--green)', fontFamily: 'var(--mono)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            todie.io / explainers
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #4ade80 0%, #60a5fa 40%, #a855f7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Memory Retrieval & Injection
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--muted)', maxWidth: 620,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            How Claude Code remembers across sessions. Three persistence layers — injected context, file-based memory, and a searchable observation database — keep the shared mental model intact.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        <ArchitectureDiagram />
        <ContextBlock />
        <FlowTimeline />
        <Roadmap />

        {/* Footer */}
        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>
            Built by{' '}
            <a href="https://todie.io" style={{ color: 'var(--green)', textDecoration: 'none' }}>todie.io</a>
            {' '}with Claude Code. Engram is{' '}
            <a href="https://github.com/Gentleman-Programming/engram" style={{ color: 'var(--blue)', textDecoration: 'none' }}>open source</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
