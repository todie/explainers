import { useState } from 'react'
import TableOfContents from '../shared/TableOfContents'
import { CATEGORIES, TECHNIQUES, HERO_STATS, CLAUDE_PRICING, TOOLS, SOURCES, techniquesByCategory } from './data'

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${color}06 100%)`,
      border: `1px solid ${color}20`, borderRadius: 14,
      padding: '20px 20px 16px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.5 }} />
      <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: 'var(--mono, monospace)', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#4b5563', marginTop: 6 }}>{sub}</div>}
    </div>
  )
}

function TechniqueCard({ t }) {
  const [open, setOpen] = useState(false)
  const diffColor = { low: '#4ade80', medium: '#facc15', high: '#f87171' }[t.difficulty]

  return (
    <div
      onClick={() => setOpen(v => !v)}
      style={{
        background: open ? `linear-gradient(135deg, #111827 0%, ${t.color}06 100%)` : '#111827',
        border: `1px solid ${open ? t.color + '30' : '#1f2937'}`,
        borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: t.color, flex: 1 }}>{t.title}</span>
        <span style={{
          fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
          background: diffColor + '12', color: diffColor, border: `1px solid ${diffColor}20`,
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>{t.difficulty}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono, monospace)', color: '#4ade80',
        }}>{t.savings}</span>
        <span style={{ fontSize: 12, color: '#4b5563', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{t.what}</div>

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 14, marginTop: 14, borderTop: '1px solid #1f2937' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>How it saves</div>
            <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{t.howItSaves}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Trade-offs</div>
            <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{t.tradeoffs}</div>
          </div>
          {t.claudeNotes && (
            <div style={{
              padding: '10px 14px', background: '#a855f708', border: '1px solid #a855f715', borderRadius: 8,
              fontSize: 12, color: '#d1d5db', lineHeight: 1.6,
            }}>
              <strong style={{ color: '#a855f7' }}>Claude: </strong>{t.claudeNotes}
            </div>
          )}
          {t.source && (
            <a href={t.source} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#60a5fa', textDecoration: 'none' }}
              onClick={e => e.stopPropagation()}>
              Source →
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function TokenOptimizationApp() {
  const [activeCategory, setActiveCategory] = useState(null)

  const tocSections = [
    { id: 'overview', title: 'Overview', icon: '#' },
    ...CATEGORIES.map(c => ({ id: c.id, title: c.title, icon: c.icon })),
    { id: 'pricing', title: 'Pricing', icon: '$' },
    { id: 'tools', title: 'Tools', icon: '⚙' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0804 0%, #030712 15%, #030712 100%)' }}>
      <TableOfContents sections={tocSections} accent="#facc15" />
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(74, 222, 128, 0.06) 0%, rgba(250, 204, 21, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.15)',
            fontSize: 12, color: '#facc15', fontFamily: 'var(--mono, monospace)', letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Cost Engineering
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #facc15 0%, #4ade80 40%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Token Optimization
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 660,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            Every technique for spending fewer tokens and less money on LLM API calls.
            {' '}{TECHNIQUES.length} techniques across {CATEGORIES.length} categories — from quick config changes to architectural overhauls.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 64 }}>
        {/* Stats */}
        <div id="overview" style={{ scrollMarginTop: 60 }} />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: -28, position: 'relative', zIndex: 2,
        }}>
          {HERO_STATS.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Techniques by category */}
        {CATEGORIES.map(cat => {
          const techs = techniquesByCategory(cat.id)
          const isOpen = activeCategory === cat.id || activeCategory === null
          return (
            <div key={cat.id} id={cat.id} style={{ scrollMarginTop: 60 }}>
              <button
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: isOpen ? 16 : 0,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: cat.color + '12', border: `1px solid ${cat.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: cat.color, fontFamily: 'var(--mono, monospace)',
                }}>{cat.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em' }}>{cat.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{cat.description}</div>
                </div>
                <span style={{ fontSize: 11, fontFamily: 'var(--mono, monospace)', color: '#4b5563' }}>
                  {techs.length} techniques
                </span>
              </button>
              {isOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {techs.map(t => <TechniqueCard key={t.id} t={t} />)}
                </div>
              )}
            </div>
          )
        })}

        {/* Pricing table */}
        <div id="pricing" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', marginBottom: 16, textAlign: 'center' }}>
            Claude Pricing (April 2026)
          </h2>
          <div style={{ overflowX: 'auto', maxWidth: 700, margin: '0 auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr>
                  {['Model', 'Input', 'Output', 'Cache Write', 'Cache Read', 'Batch'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #1f2937', color: '#6b7280', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLAUDE_PRICING.models.map(m => (
                  <tr key={m.name}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#e5e7eb', fontWeight: 600 }}>{m.name}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#d1d5db', fontFamily: 'var(--mono, monospace)' }}>${m.input}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#f87171', fontFamily: 'var(--mono, monospace)' }}>${m.output}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#facc15', fontFamily: 'var(--mono, monospace)' }}>${m.cacheWrite5m}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#4ade80', fontFamily: 'var(--mono, monospace)' }}>${m.cacheRead}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #111827', color: '#60a5fa', fontFamily: 'var(--mono, monospace)' }}>${m.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontSize: 10, color: '#4b5563', marginTop: 8, textAlign: 'center' }}>
              {CLAUDE_PRICING.note} — All prices per MTok (million tokens)
            </div>
          </div>
        </div>

        {/* Tools */}
        <div id="tools" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', marginBottom: 16, textAlign: 'center' }}>
            Open Source Tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, maxWidth: 700, margin: '0 auto' }}>
            {TOOLS.map(tool => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
                  padding: '14px 16px', textDecoration: 'none', display: 'block',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e5e7eb', fontFamily: 'var(--mono, monospace)' }}>{tool.name}</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{tool.what}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Sources */}
        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sources</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 600, margin: '0 auto' }}>
            {SOURCES.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: '#60a5fa', textDecoration: 'none' }}>
                {s.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#4b5563', marginTop: 20 }}>
            Built by <a href="https://todie.io" style={{ color: '#facc15', textDecoration: 'none' }}>todie.io</a>.
            {' '}{TECHNIQUES.length} techniques researched and cataloged.
          </p>
        </footer>
      </div>
    </div>
  )
}
