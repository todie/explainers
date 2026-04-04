import { useState } from 'react'

const PHASES = [
  {
    id: 0,
    label: 'Phase 0',
    title: 'Housekeeping',
    color: '#6b7280',
    status: 'planned',
    items: [
      'Deduplicate engram observations vs auto-memory markdown files',
      'Add project filtering to boot context hook',
      'Remove duplicated protocol instructions from system-reminder (~500 token savings)',
      'Measure baseline: boot token cost + search recall before changes',
    ],
  },
  {
    id: 1,
    label: 'Phase 1',
    title: 'Hybrid Search',
    color: '#60a5fa',
    status: 'planned',
    items: [
      'Scaffold engram-embed Rust crate with fastembed-rs + sqlite-vec',
      'Create observations_vec virtual table in engram.db (float[384])',
      'Full reindex: embed all observations, populate vector table (<10s for 103 obs)',
      'Implement hybrid search with Reciprocal Rank Fusion (FTS5 + vector)',
      'Hook incremental embedding into engram write path',
      'Add /search/hybrid HTTP endpoint (sidecar or patched into Go)',
      'Run recall benchmark: hybrid vs FTS5-only on 10 conceptual queries',
    ],
  },
  {
    id: 2,
    label: 'Phase 2',
    title: 'Smart Context Injection',
    color: '#a855f7',
    status: 'planned',
    items: [
      'Implement /context/smart endpoint with project-aware tiered loading',
      'Tiering: always-load (prefs, rules) → project-specific → never auto-load (old summaries)',
      'Update engram-start.sh hook to use /context/smart',
      'Consolidate engram protocol instructions into CLAUDE.md only',
      'Measure post-Phase-2 boot tokens: target 40% reduction',
    ],
  },
  {
    id: 3,
    label: 'Phase 3',
    title: 'Auto-Memory Reconciliation',
    color: '#4ade80',
    status: 'planned',
    items: [
      'Build engram-to-automemory sync hook (auto-memory = L1 cache of engram L2)',
      'Define observation priority schema for L1/L2 tiering',
      'Migrate existing auto-memory files into engram as canonical source',
      'Add graceful degradation: Claude works without engram daemon (L1 still loads)',
      'End-to-end validation: full memory lifecycle test across 3 sessions',
    ],
  },
  {
    id: 4,
    label: 'Phase 4',
    title: 'Full Rust Rewrite',
    color: '#facc15',
    status: 'planned',
    items: [
      'Reverse-engineer Go binary: map all HTTP routes and MCP tools',
      'Scaffold engram-rs crate: absorb engram-embed + add HTTP/MCP server (axum + tokio)',
      'Implement all HTTP routes with drop-in API compatibility',
      'Implement MCP stdio adapter in Rust',
      'Inline auto-memory and Obsidian sync as subcommands',
      'Cutover: replace Go engram with engram-rs, update all configs',
    ],
  },
]

export default function Roadmap() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: 'var(--text-bright)', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        engram v2 Roadmap
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 560, margin: '0 auto 32px', textAlign: 'center' }}>
        Planned improvements: hybrid search, smart context injection, unified memory, and a full Rust rewrite.
      </p>

      <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
        {/* Vertical progress line */}
        <div style={{ position: 'absolute', left: 23, top: 24, bottom: 24, width: 2, background: 'linear-gradient(180deg, #6b728040, #60a5fa40, #a855f740, #4ade8040, #facc1540)' }} />

        {PHASES.map((phase) => (
          <div
            key={phase.id}
            onClick={() => setExpanded(expanded === phase.id ? null : phase.id)}
            style={{
              position: 'relative',
              paddingLeft: 56,
              cursor: 'pointer',
            }}
          >
            {/* Phase dot */}
            <div style={{
              position: 'absolute', left: 12, top: 18,
              width: 24, height: 24, borderRadius: '50%',
              background: phase.color + '18', border: `2px solid ${phase.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: phase.color }} />
            </div>

            <div style={{
              background: expanded === phase.id
                ? `linear-gradient(135deg, var(--surface) 0%, ${phase.color}06 100%)`
                : 'var(--surface)',
              border: `1px solid ${expanded === phase.id ? phase.color + '30' : 'var(--border)'}`,
              borderRadius: 12, padding: '16px 20px',
              transition: 'all 0.25s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)', color: phase.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {phase.label}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                    {phase.title}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
                    {phase.items.length} tasks
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', transition: 'transform 0.2s', transform: expanded === phase.id ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
              </div>

              {expanded === phase.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid var(--border)`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {phase.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, marginTop: 1, flexShrink: 0,
                        border: `1.5px solid ${phase.color}40`, background: 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }} />
                      <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
