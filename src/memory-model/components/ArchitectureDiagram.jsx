import { useState } from 'react'

const LAYERS = [
  {
    id: 'claude',
    label: 'Claude Code',
    sub: 'Context Window',
    color: '#60a5fa',
    icon: '⚡\uFE0F',
    y: 0,
    desc: 'The active conversation. Everything visible here — tool calls, file reads, errors, user messages — forms the working context. Ephemeral by default.',
  },
  {
    id: 'claudemd',
    label: 'CLAUDE.md',
    sub: 'Injected at session start',
    color: '#a855f7',
    icon: '📋',
    y: 1,
    desc: 'Deterministic context injection. Loaded into every conversation automatically. Contains environment constraints, tool priorities, project table, code quality defaults, safety invariants. Not retrieved — always present.',
  },
  {
    id: 'automem',
    label: 'Auto-Memory',
    sub: '~/.claude/projects/*/memory/',
    color: '#22d3ee',
    icon: '📁',
    y: 2,
    desc: 'File-based per-project memory. MEMORY.md index with pointers to individual files — feedback, user preferences, project context. Loaded alongside CLAUDE.md. Lightweight persistence for things that don\'t need a database.',
  },
  {
    id: 'engram',
    label: 'Engram',
    sub: 'SQLite + FTS5 (~3ms reads)',
    color: '#4ade80',
    icon: '🧠',
    y: 3,
    desc: 'Long-term memory. Go binary + SQLite with full-text search. Observations stored with topic keys, project tags, scopes. Reads via HTTP (~3ms), writes via MCP for dedup/upsert. Survives across all sessions indefinitely.',
  },
]

const FLOWS = [
  { from: 'claude', to: 'claudemd', label: 'inject on start', dir: 'up', color: '#a855f7' },
  { from: 'claude', to: 'automem', label: 'load MEMORY.md', dir: 'up', color: '#22d3ee' },
  { from: 'claude', to: 'engram', label: 'mem_save (MCP)', dir: 'down', color: '#4ade80' },
  { from: 'engram', to: 'claude', label: 'mem raw (HTTP ~3ms)', dir: 'up', color: '#4ade80' },
]

const box = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '20px 24px',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
}

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(null)

  return (
    <div style={{ position: 'relative' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: 'var(--text-bright)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Architecture
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 500, margin: '0 auto' }}>
          Tap any layer to see how it works. Data flows down to persist, up to retrieve.
        </p>
      </div>

      {/* Diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600, margin: '0 auto', position: 'relative' }}>

        {/* The context window block (top) */}
        <div
          onClick={() => setActive(active === 'claude' ? null : 'claude')}
          style={{
            ...box,
            borderColor: active === 'claude' ? LAYERS[0].color + '60' : 'var(--border)',
            boxShadow: active === 'claude' ? `0 0 30px ${LAYERS[0].color}15` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: LAYERS[0].color + '12', border: `1px solid ${LAYERS[0].color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{LAYERS[0].icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: LAYERS[0].color }}>{LAYERS[0].label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{LAYERS[0].sub}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
              ephemeral
            </div>
          </div>

          {/* Context block visualization */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 6 }}>
            {['tool calls', 'file reads', 'errors', 'user msgs', 'agent output', 'compaction'].map((item, i) => (
              <div key={item} style={{
                fontSize: 10, fontFamily: 'var(--mono)', color: LAYERS[0].color,
                background: LAYERS[0].color + '08', border: `1px solid ${LAYERS[0].color}15`,
                padding: '5px 8px', borderRadius: 6, textAlign: 'center',
                animation: `fadeUp 0.4s ease ${i * 80}ms both`,
              }}>{item}</div>
            ))}
          </div>

          {active === 'claude' && (
            <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text)', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              {LAYERS[0].desc}
            </div>
          )}
        </div>

        {/* Arrow: injection zone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-light), transparent)' }} />
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>↑ injected at session start ↑</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-light), transparent)' }} />
        </div>

        {/* CLAUDE.md + Auto-Memory side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {LAYERS.slice(1, 3).map(layer => (
            <div
              key={layer.id}
              onClick={() => setActive(active === layer.id ? null : layer.id)}
              style={{
                ...box,
                borderColor: active === layer.id ? layer.color + '60' : 'var(--border)',
                boxShadow: active === layer.id ? `0 0 30px ${layer.color}15` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{layer.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: layer.color }}>{layer.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{layer.sub}</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 6, border: '1px solid var(--border)', display: 'inline-block' }}>
                {layer.id === 'claudemd' ? 'deterministic' : 'per-project'}
              </div>

              {active === layer.id && (
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text)', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {layer.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrow: read/write zone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px' }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-light), transparent)' }} />
          <div style={{ display: 'flex', gap: 16, fontSize: 10, fontFamily: 'var(--mono)' }}>
            <span style={{ color: '#4ade80' }}>↓ mem_save (MCP write)</span>
            <span style={{ color: '#facc15' }}>↑ mem raw (HTTP read ~3ms)</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-light), transparent)' }} />
        </div>

        {/* Engram (bottom) */}
        <div
          onClick={() => setActive(active === 'engram' ? null : 'engram')}
          style={{
            ...box,
            borderColor: active === 'engram' ? LAYERS[3].color + '60' : 'var(--border)',
            boxShadow: active === 'engram' ? `0 0 30px ${LAYERS[3].color}15` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: LAYERS[3].color + '12', border: `1px solid ${LAYERS[3].color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>🧠</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: LAYERS[3].color }}>{LAYERS[3].label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{LAYERS[3].sub}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', background: 'var(--surface2)', padding: '3px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
              permanent
            </div>
          </div>

          {/* DB visualization */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {['decisions', 'bugs', 'conventions', 'discoveries', 'sessions', 'heuristics'].map((item, i) => (
              <div key={item} style={{
                fontSize: 10, fontFamily: 'var(--mono)', color: LAYERS[3].color,
                background: LAYERS[3].color + '08', border: `1px solid ${LAYERS[3].color}15`,
                padding: '5px 8px', borderRadius: 6, textAlign: 'center',
                animation: `fadeUp 0.4s ease ${i * 80}ms both`,
              }}>{item}</div>
            ))}
          </div>

          {active === 'engram' && (
            <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text)', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              {LAYERS[3].desc}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
