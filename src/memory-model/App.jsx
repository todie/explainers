import TableOfContents from '../shared/TableOfContents'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import ContextBlock from './components/ContextBlock'
import FlowTimeline from './components/FlowTimeline'
import Roadmap from './components/Roadmap'

const SECTIONS = [
  { id: 'architecture', title: 'Architecture', icon: '⚙\uFE0F' },
  { id: 'context-window', title: 'Context Window', icon: '◧' },
  { id: 'retrieval-flow', title: 'Retrieval Flow', icon: '↓' },
  { id: 'roadmap', title: 'Roadmap', icon: '◈' },
]

export default function MemoryModelApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #040a08 0%, #030712 15%, #030712 100%)',
    }}>
      <TableOfContents sections={SECTIONS} accent="#4ade80" />

      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Matrix rain — faint falling characters in the header */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.04,
          fontFamily: 'var(--mono)', fontSize: 12, color: '#4ade80', lineHeight: 1.8,
        }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${8 + i * 8}%`,
              top: -200,
              animation: `flowDown ${8 + (i % 4) * 3}s linear ${i * 0.7}s infinite`,
              whiteSpace: 'pre', writingMode: 'vertical-rl',
            }}>
              {['mem_save', 'sqlite', 'fts5', 'topic_key', 'context', 'session', 'engram', 'search', 'observe', 'recall', 'inject', 'persist'][i]}
            </div>
          ))}
        </div>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 350,
          background: 'radial-gradient(ellipse, rgba(74, 222, 128, 0.06) 0%, rgba(96, 165, 250, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.15)',
            fontSize: 12, color: '#4ade80', fontFamily: 'var(--mono)', letterSpacing: '0.04em', marginBottom: 20,
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
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 620,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            How Claude Code remembers across sessions. Three persistence layers — injected context, file-based memory, and a searchable observation database — keep the shared mental model intact.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        <div id="architecture" style={{ scrollMarginTop: 60 }}><ArchitectureDiagram /></div>
        <div id="context-window" style={{ scrollMarginTop: 60 }}><ContextBlock /></div>
        <div id="retrieval-flow" style={{ scrollMarginTop: 60 }}><FlowTimeline /></div>
        <div id="roadmap" style={{ scrollMarginTop: 60 }}><Roadmap /></div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Built by{' '}
            <a href="https://todie.io" style={{ color: '#4ade80', textDecoration: 'none' }}>todie.io</a>
            {' '}with Claude Code. Engram is{' '}
            <a href="https://github.com/Gentleman-Programming/engram" style={{ color: '#60a5fa', textDecoration: 'none' }}>open source</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
