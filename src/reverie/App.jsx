import TableOfContents from '../shared/TableOfContents'
import HierarchyDiagram from './components/HierarchyDiagram'
import NeuroscienceMap from './components/NeuroscienceMap'
import DreamPipeline from './components/DreamPipeline'
import LeaderboardChart from './components/LeaderboardChart'
import FindingsGrid from './components/FindingsGrid'
import AntiPatterns from './components/AntiPatterns'
import References from './components/References'

const SECTIONS = [
  { id: 'hierarchy', title: 'Memory Hierarchy', icon: '▤' },
  { id: 'neuroscience', title: 'Neuroscience', icon: '🧬' },
  { id: 'dream-pipeline', title: 'Dream Pipeline', icon: '💤' },
  { id: 'leaderboard', title: 'LoCoMo Benchmark', icon: '📊' },
  { id: 'findings', title: 'Findings', icon: '🔍' },
  { id: 'anti-patterns', title: 'Anti-Patterns', icon: '⚠' },
  { id: 'references', title: 'References', icon: '📚' },
]

export default function ReverieApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0414 0%, #030712 15%, #030712 100%)',
    }}>
      <TableOfContents sections={SECTIONS} accent="#a855f7" />

      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Dreamy particle field */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.06,
        }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${5 + (i * 47) % 90}%`,
              top: `${10 + (i * 31) % 80}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: '50%',
              background: ['#a855f7', '#6366f1', '#ec4899'][i % 3],
              animation: `float ${6 + (i % 5) * 2}s ease-in-out ${i * 0.3}s infinite alternate`,
            }} />
          ))}
        </div>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 350,
          background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 8s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.15)',
            fontSize: 12, color: '#a855f7', fontFamily: 'var(--mono)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            todie.io / explainers
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 40%, #ec4899 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Reverie
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 680,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Neuroscience-grounded memory consolidation for LLM coding harnesses.
            How a daemon modeled on biological sleep manages knowledge across five
            persistence layers — from CPU registers to cold storage.
          </p>

          <div style={{
            display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28,
            fontSize: 13, color: '#4b5563', fontFamily: 'var(--mono)',
          }}>
            <span><strong style={{ color: '#a855f7' }}>10</strong> neuroscience mechanisms</span>
            <span><strong style={{ color: '#6366f1' }}>13</strong> empirical findings</span>
            <span><strong style={{ color: '#ec4899' }}>5</strong> persistence layers</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        <div id="hierarchy" style={{ scrollMarginTop: 60 }}><HierarchyDiagram /></div>
        <div id="neuroscience" style={{ scrollMarginTop: 60 }}><NeuroscienceMap /></div>
        <div id="dream-pipeline" style={{ scrollMarginTop: 60 }}><DreamPipeline /></div>
        <div id="leaderboard" style={{ scrollMarginTop: 60 }}><LeaderboardChart /></div>
        <div id="findings" style={{ scrollMarginTop: 60 }}><FindingsGrid /></div>
        <div id="anti-patterns" style={{ scrollMarginTop: 60 }}><AntiPatterns /></div>
        <div id="references" style={{ scrollMarginTop: 60 }}><References /></div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Built by{' '}
            <a href="https://todie.io" style={{ color: '#a855f7', textDecoration: 'none' }}>todie.io</a>
            {' '}with Claude Code. Reverie is{' '}
            <a href="https://github.com/todie/reverie" style={{ color: '#6366f1', textDecoration: 'none' }}>open source</a>.
          </p>
          <p style={{ fontSize: 11, color: '#374151', marginTop: 4 }}>
            "A designer knows he has achieved perfection not when there is nothing left to add,
            but when there is nothing left to take away."
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
