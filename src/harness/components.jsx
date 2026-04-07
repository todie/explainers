/**
 * The Harness — explainer components.
 *
 * One file. All visuals, all rendered, all consistent. Cyan accent (#22d3ee).
 *
 * Components:
 *   <Foldable>              — collapsible section with audience badges
 *   <AudienceBadge>         — newbie / engineer / scientist / advanced pill
 *   <Pull>                  — manifesto pull-quote
 *   <Adversarial>           — debunk callout, target + claim + rebuttal + cite
 *   <HeroStats>             — 6-stat grid below the title
 *   <FramingsTriad>         — three framings, side-by-side
 *   <HierarchyPyramid>      — 5-layer stacked diagram, click for detail
 *   <RTKFlow>               — PreToolUse rewrite flow + savings bars
 *   <EngramSplit>           — read/write two-column dataflow
 *   <EngramAuditTable>      — 6 audit findings, severity-coded
 *   <PlacementTree>         — SVG decision tree
 *   <HookGrid>              — 8-row enforcement matrix
 *   <DivisionOfLabor>       — 3-tier brain/nerves/hands
 *   <NeuroGrid>             — 10 neuroscience mechanisms (imports from reverie)
 *   <DreamPipeline>         — 6-phase vertical pipeline (imports from reverie)
 *   <ForgetCurve>           — SVG line chart, strong vs weak survival
 *   <LoCoMoChart>           — bar chart (imports from reverie)
 *   <ReverieReplacesCard>   — what reverie replaces, why, how
 *   <ReverieAmbitionGrid>   — 12 ambitious features w/ bio basis
 *   <InstallStep>           — numbered step card with code blocks
 *   <MemoryExampleCard>     — good/bad mem_save examples per layer
 *   <NeuroAside>            — neuroinformatics deep dive callout
 *   <ImplementationDetail>  — engineer-only deep dive
 */

import { useState } from 'react'
import {
  HERO_STATS,
  FRAMINGS,
  RTK_SAVINGS,
  HOOKS,
  DIVISION_OF_LABOR,
  ENGRAM_AUDIT_HIGHLIGHTS,
  FORGET_CURVE_POINTS,
  INSTALL_STEPS,
  MEMORY_EXAMPLES,
  IMPLEMENTATION_DETAILS,
  NEUROINFORMATICS_NOTES,
  HARNESS_SOURCES,
  REVERIE_REPLACES,
  REVERIE_AMBITIONS,
} from './data'
import { LAYERS, MECHANISMS, DREAM_PHASES, LOCOMO_LEADERBOARD, LOCOMO_STATS } from '../reverie/data'

const ACCENT = '#22d3ee'
const SURFACE = '#111827'
const BORDER = '#1f2937'
const TEXT = '#e5e7eb'
const MUTED = '#9ca3af'
const DIM = '#6b7280'
const FAINT = '#4b5563'
const MONO = 'var(--mono, ui-monospace, monospace)'

// ──────────────────────────────────────────────────────────────────────
// Primitives
// ──────────────────────────────────────────────────────────────────────

export function AudienceBadge({ kind }) {
  const palette = {
    newbie:    { bg: '#22c55e10', fg: '#22c55e', label: 'Newbie path'    },
    advanced:  { bg: '#a855f710', fg: '#a855f7', label: 'Advanced'       },
    engineer:  { bg: '#22d3ee10', fg: '#22d3ee', label: 'For engineers'  },
    scientist: { bg: '#ec489910', fg: '#ec4899', label: 'For scientists' },
    optional:  { bg: '#6b728010', fg: '#9ca3af', label: 'Optional'       },
  }
  const p = palette[kind] || palette.optional
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 10, fontWeight: 700, fontFamily: MONO,
      color: p.fg, background: p.bg, border: `1px solid ${p.fg}30`,
      padding: '2px 8px', borderRadius: 4, marginRight: 6,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{p.label}</span>
  )
}

export function Foldable({ title, audience = [], defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      margin: '24px 0',
      border: `1px solid ${open ? ACCENT + '30' : BORDER}`,
      borderRadius: 12,
      background: open ? `linear-gradient(180deg, ${SURFACE} 0%, ${ACCENT}04 100%)` : SURFACE,
      transition: 'all 0.2s ease',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', textAlign: 'left', cursor: 'pointer',
          background: 'none', border: 'none',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
          color: TEXT,
        }}>
        <span style={{
          display: 'inline-block', width: 18, height: 18,
          fontSize: 14, color: open ? ACCENT : MUTED,
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}>▶</span>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700 }}>{title}</span>
        {audience.map(a => <AudienceBadge key={a} kind={a} />)}
      </button>
      {open && (
        <div style={{
          padding: '0 24px 24px 50px',
          fontSize: 14, color: MUTED, lineHeight: 1.75,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

export function Pull({ children }) {
  return (
    <blockquote style={{
      margin: '32px 0',
      padding: '20px 28px',
      borderLeft: `3px solid ${ACCENT}`,
      background: `linear-gradient(90deg, ${ACCENT}08 0%, transparent 60%)`,
      fontSize: 18, lineHeight: 1.55, color: TEXT, fontWeight: 600,
      fontStyle: 'normal',
    }}>
      {children}
    </blockquote>
  )
}

export function Adversarial({ target }) {
  return (
    <div style={{
      margin: '24px 0',
      border: '1px solid #f8717130',
      borderLeft: '3px solid #f87171',
      borderRadius: 8,
      background: 'linear-gradient(180deg, #111827 0%, #f8717108 100%)',
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, fontFamily: MONO,
          color: '#f87171', background: '#f8717112',
          border: '1px solid #f8717130',
          padding: '2px 8px', borderRadius: 4,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>Shot fired</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{target.name}</span>
      </div>
      <div style={{ fontSize: 12, color: MUTED, marginBottom: 6 }}>
        <strong style={{ color: '#f87171' }}>Their claim: </strong>{target.claim}
      </div>
      <div style={{ fontSize: 13, color: TEXT, marginBottom: 8, lineHeight: 1.65 }}>
        <strong style={{ color: ACCENT }}>Rebuttal: </strong>{target.rebuttal}
      </div>
      <div style={{ fontSize: 11, color: DIM, fontStyle: 'italic' }}>
        <strong style={{ color: FAINT, fontStyle: 'normal' }}>Evidence: </strong>{target.evidence}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────────────

export function HeroStats() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 10, margin: '32px 0 48px',
    }}>
      {HERO_STATS.map(s => (
        <div key={s.label} style={{
          background: `linear-gradient(135deg, ${SURFACE} 0%, ${s.color}08 100%)`,
          border: `1px solid ${s.color}25`,
          borderRadius: 12, padding: '16px 18px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
            opacity: 0.6,
          }} />
          <div style={{
            fontSize: 9, color: DIM, textTransform: 'uppercase',
            letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4,
          }}>{s.label}</div>
          <div style={{
            fontSize: 24, fontWeight: 800, color: s.color,
            fontFamily: MONO, lineHeight: 1,
          }}>{s.value}</div>
          <div style={{ fontSize: 10, color: FAINT, marginTop: 4 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

export function FramingsTriad() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 12, margin: '24px 0 40px',
    }}>
      {FRAMINGS.map(f => (
        <div key={f.id} style={{
          background: `linear-gradient(180deg, ${SURFACE} 0%, ${f.color}06 100%)`,
          border: `1px solid ${f.color}25`,
          borderLeft: `3px solid ${f.color}`,
          borderRadius: 8, padding: '16px 18px',
        }}>
          <div style={{
            fontSize: 9, color: f.color, fontFamily: MONO, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
          }}>{f.label}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.4 }}>
            {f.title}
          </div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{f.body}</div>
        </div>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hierarchy
// ──────────────────────────────────────────────────────────────────────

export function HierarchyPyramid() {
  const [sel, setSel] = useState(null)
  const layers = LAYERS
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
        {layers.map((layer, i) => {
          const w = 50 + i * 12
          const isOn = sel === i
          return (
            <button key={layer.id}
              onClick={() => setSel(isOn ? null : i)}
              style={{
                width: `${w}%`, margin: '0 auto',
                padding: '12px 16px',
                background: isOn ? layer.color + '15' : SURFACE,
                border: `1px solid ${isOn ? layer.color + '50' : BORDER}`,
                borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: layer.color, flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{layer.name}</span>
                <span style={{ fontSize: 10, color: DIM, fontFamily: MONO }}>{layer.cpuAnalog}</span>
                <span style={{ fontSize: 10, color: FAINT, fontFamily: MONO }}>↔ {layer.brainAnalog}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, fontSize: 10, color: DIM, fontFamily: MONO }}>
                <span>{layer.autoLoaded ? '● always' : '○ on-demand'}</span>
                <span>{layer.latency}</span>
              </div>
            </button>
          )
        })}
      </div>
      {sel !== null && (
        <div style={{
          background: SURFACE, border: `1px solid ${layers[sel].color}30`,
          borderRadius: 12, padding: 20, animation: 'fadeUp 0.2s ease',
        }}>
          <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 12 }}>
            {layers[sel].description}
          </div>
          <div style={{
            padding: '10px 14px', borderRadius: 6,
            background: '#0f172a', border: '1px solid #1e293b',
            fontSize: 11, color: '#f87171', fontFamily: MONO,
          }}>
            ⚠ {layers[sel].constraint}
          </div>
        </div>
      )}
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// RTK
// ──────────────────────────────────────────────────────────────────────

export function RTKFlow() {
  const maxRaw = Math.max(...RTK_SAVINGS.map(r => r.raw))
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: 16, alignItems: 'center', marginBottom: 24,
      }}>
        <div style={{
          background: SURFACE, border: `1px solid ${BORDER}`,
          borderRadius: 8, padding: '14px 18px',
        }}>
          <div style={{ fontSize: 10, color: DIM, fontFamily: MONO, marginBottom: 4 }}>MODEL EMITS</div>
          <code style={{ fontSize: 12, color: TEXT, fontFamily: MONO }}>curl api.cf/zones</code>
        </div>
        <div style={{ fontSize: 18, color: ACCENT }}>→</div>
        <div style={{
          background: SURFACE, border: `1px solid ${ACCENT}30`,
          borderRadius: 8, padding: '14px 18px',
        }}>
          <div style={{ fontSize: 10, color: ACCENT, fontFamily: MONO, marginBottom: 4 }}>HOOK REWRITES</div>
          <code style={{ fontSize: 12, color: TEXT, fontFamily: MONO }}>rtk curl api/zones</code>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RTK_SAVINGS.map(r => {
          const savedPct = Math.round(((r.raw - r.compressed) / r.raw) * 100)
          const rawW = (r.raw / maxRaw) * 100
          const compW = (r.compressed / maxRaw) * 100
          return (
            <div key={r.command} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 200, fontSize: 11, color: TEXT, fontFamily: MONO,
                textAlign: 'right', flexShrink: 0,
              }}>{r.command}</div>
              <div style={{ flex: 1, position: 'relative', height: 22 }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${rawW}%`,
                  background: `${r.color}20`, borderRadius: 4,
                  border: `1px solid ${r.color}40`,
                }} />
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${compW}%`,
                  background: r.color, borderRadius: 4,
                }} />
                <span style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 10, fontWeight: 700, fontFamily: MONO,
                  color: savedPct > 30 ? TEXT : DIM,
                }}>
                  {(r.raw / 1024).toFixed(1)}KB → {(r.compressed / 1024).toFixed(1)}KB ({savedPct}% saved)
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        marginTop: 16, fontSize: 11, color: DIM, fontFamily: MONO, textAlign: 'center',
      }}>
        Filled bar = compressed bytes the model sees · Outlined bar = original bytes
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Engram
// ──────────────────────────────────────────────────────────────────────

export function EngramSplit() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
      }}>
        <div style={{
          background: SURFACE, border: `1px solid ${ACCENT}25`,
          borderRadius: 12, padding: 20,
        }}>
          <div style={{
            fontSize: 10, fontFamily: MONO, color: ACCENT, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}>Read path · ~3 ms</div>
          <div style={{ fontSize: 13, color: TEXT, fontWeight: 700, marginBottom: 12 }}>
            Bash + curl (hot, dumb)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, color: MUTED, fontFamily: MONO }}>
            <div>$ mem raw "/search?q=auth+bug"</div>
            <div style={{ color: DIM }}>↓</div>
            <div>curl localhost:7437</div>
            <div style={{ color: DIM }}>↓</div>
            <div>SQLite + FTS5</div>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
            Used dozens of times per session. The 60× speed advantage over MCP is the precondition for memory being <em>used</em> instead of <em>skipped</em>.
          </div>
        </div>
        <div style={{
          background: SURFACE, border: `1px solid #a855f725`,
          borderRadius: 12, padding: 20,
        }}>
          <div style={{
            fontSize: 10, fontFamily: MONO, color: '#a855f7', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}>Write path · ~200 ms</div>
          <div style={{ fontSize: 13, color: TEXT, fontWeight: 700, marginBottom: 12 }}>
            MCP (slow, smart)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, color: MUTED, fontFamily: MONO }}>
            <div>mem_save(topic_key=...)</div>
            <div style={{ color: DIM }}>↓</div>
            <div>stdio JSON-RPC</div>
            <div style={{ color: DIM }}>↓</div>
            <div>dedup · upsert · scope</div>
            <div style={{ color: DIM }}>↓</div>
            <div>SQLite + FTS5</div>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
            Used a handful of times per session. Cost is real, paid only when writing matters. Discipline at the write site beats cleverness at the read site.
          </div>
        </div>
      </div>
    </section>
  )
}

export function EngramAuditTable() {
  const sevColor = { critical: '#f87171', high: '#fb923c', medium: '#facc15' }
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        background: SURFACE, border: `1px solid ${BORDER}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 18px', borderBottom: `1px solid ${BORDER}`,
          background: '#0f172a',
          display: 'flex', alignItems: 'baseline', gap: 12,
        }}>
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Engram audit
          </span>
          <span style={{ fontSize: 11, color: DIM }}>13 findings total · 6 highlighted</span>
        </div>
        {ENGRAM_AUDIT_HIGHLIGHTS.map((f, i) => (
          <div key={f.id} style={{
            padding: '14px 18px',
            borderBottom: i < ENGRAM_AUDIT_HIGHLIGHTS.length - 1 ? `1px solid ${BORDER}` : 'none',
            display: 'grid', gridTemplateColumns: '40px 80px 1fr', gap: 12, alignItems: 'baseline',
          }}>
            <span style={{ fontSize: 11, fontFamily: MONO, color: DIM }}>{f.id}</span>
            <span style={{
              fontSize: 9, fontFamily: MONO, fontWeight: 700,
              color: sevColor[f.severity], background: sevColor[f.severity] + '12',
              border: `1px solid ${sevColor[f.severity]}30`,
              padding: '2px 8px', borderRadius: 4,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              justifySelf: 'start',
            }}>{f.severity}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{f.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Placement decision tree (SVG)
// ──────────────────────────────────────────────────────────────────────

export function PlacementTree() {
  const node = (x, y, label, color, sub) => (
    <g>
      <rect x={x - 90} y={y - 22} width={180} height={44} rx={8}
        fill={color + '15'} stroke={color + '60'} strokeWidth={1.5} />
      <text x={x} y={y - 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={TEXT}>{label}</text>
      {sub && <text x={x} y={y + 12} textAnchor="middle" fontSize={9} fill={DIM} fontFamily={MONO}>{sub}</text>}
    </g>
  )
  const edge = (x1, y1, x2, y2, label) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={FAINT} strokeWidth={1.2} />
      {label && (
        <text x={(x1 + x2) / 2 + 8} y={(y1 + y2) / 2} fontSize={10} fill={MUTED} fontFamily={MONO}>{label}</text>
      )}
    </g>
  )
  return (
    <section style={{ margin: '32px 0' }}>
      <svg viewBox="0 0 800 540" style={{ width: '100%', height: 'auto' }}>
        {/* Q1: derivable from code? */}
        {node(400, 30, 'Derivable from code?', ACCENT)}
        {edge(400, 52, 200, 105, 'yes')}
        {edge(400, 52, 600, 105, 'no')}
        {/* Yes leaf */}
        {node(200, 130, "DON'T STORE", '#6b7280', 'let code win')}
        {/* Q2: directive? */}
        {node(600, 130, 'Behavioral directive?', ACCENT)}
        {edge(600, 152, 420, 210, 'yes')}
        {edge(600, 152, 720, 210, 'no')}
        {/* Yes leaf */}
        {node(420, 235, 'CLAUDE.md / auto-mem', '#ef4444', 'always loaded')}
        {/* Q3: kind? */}
        {node(720, 235, 'Atomic? Prose? Spec?', ACCENT)}
        {edge(720, 257, 280, 340, 'atomic')}
        {edge(720, 257, 540, 340, 'prose')}
        {edge(720, 257, 720, 340, 'spec')}
        {node(280, 365, 'ENGRAM', '#facc15', 'searchable, upsertable')}
        {node(540, 365, 'OBSIDIAN', '#22c55e', 'browsable, MOC')}
        {node(720, 365, 'LINEAR', '#a855f7', 'contract')}
        {/* Bottom annotation */}
        <text x={400} y={460} textAnchor="middle" fontSize={11} fill={DIM} fontStyle="italic">
          Every save runs through this tree before it lands.
        </text>
        <text x={400} y={478} textAnchor="middle" fontSize={11} fill={DIM} fontStyle="italic">
          The friction of "where does this belong" was solved once, at design time, and is now binding.
        </text>
      </svg>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────

export function HookGrid() {
  const sevColor = { absolute: '#f87171', hard: '#fb923c', transparent: '#22d3ee' }
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gap: 8,
      }}>
        {HOOKS.map(h => (
          <div key={h.intent} style={{
            background: SURFACE, border: `1px solid ${h.color}30`,
            borderLeft: `3px solid ${h.color}`,
            borderRadius: 8, padding: '12px 16px',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 90px', gap: 12, alignItems: 'baseline',
          }}>
            <div>
              <div style={{ fontSize: 9, color: DIM, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Intent</div>
              <div style={{ fontSize: 13, color: TEXT, fontWeight: 700 }}>{h.intent}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: DIM, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hook</div>
              <div style={{ fontSize: 12, color: MUTED, fontFamily: MONO }}>{h.hook}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: DIM, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.06em' }}>On / Action</div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: MONO }}>{h.trigger}</div>
              <div style={{ fontSize: 11, color: h.color, fontFamily: MONO }}>→ {h.action}</div>
            </div>
            <span style={{
              justifySelf: 'end',
              fontSize: 9, fontFamily: MONO, fontWeight: 700,
              color: sevColor[h.severity], background: sevColor[h.severity] + '12',
              border: `1px solid ${sevColor[h.severity]}30`,
              padding: '2px 8px', borderRadius: 4,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              alignSelf: 'start',
            }}>{h.severity}</span>
            <div style={{
              gridColumn: '1 / -1',
              fontSize: 11, color: DIM, lineHeight: 1.6, marginTop: 4,
            }}>{h.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Division of labor
// ──────────────────────────────────────────────────────────────────────

export function DivisionOfLaborGrid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12,
      }}>
        {DIVISION_OF_LABOR.map(role => (
          <div key={role.role} style={{
            background: `linear-gradient(180deg, ${SURFACE} 0%, ${role.color}06 100%)`,
            border: `1px solid ${role.color}30`,
            borderRadius: 12, padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: role.color }}>{role.role}</span>
              <span style={{ fontSize: 11, color: DIM, fontFamily: MONO }}>= {role.analog}</span>
            </div>
            <div style={{ fontSize: 9, color: '#4ade80', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 12, marginBottom: 6 }}>
              Does
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {role.duties.map(d => (
                <li key={d} style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4ade80' }}>✓</span>{d}
                </li>
              ))}
            </ul>
            <div style={{ fontSize: 9, color: '#f87171', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 14, marginBottom: 6 }}>
              Does NOT
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {role.notDuties.map(d => (
                <li key={d} style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#f87171' }}>✕</span>{d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Reverie: neuroscience grid
// ──────────────────────────────────────────────────────────────────────

export function NeuroGrid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10,
      }}>
        {MECHANISMS.map(m => (
          <div key={m.id} style={{
            background: SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 8, padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{m.name}</span>
              <span style={{ fontSize: 9, fontFamily: MONO, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.category}</span>
            </div>
            <div style={{ fontSize: 10, color: '#ec4899', fontFamily: MONO, fontWeight: 700, marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Bio</div>
            <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.55, marginBottom: 6 }}>{m.bioFunction}</div>
            <div style={{ fontSize: 10, color: ACCENT, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Reverie</div>
            <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.55 }}>{m.reverieMapping}</div>
            <div style={{
              marginTop: 8, padding: '6px 10px',
              background: '#0f172a', border: `1px solid ${BORDER}`, borderRadius: 4,
              fontSize: 10, color: '#facc15', fontFamily: MONO, lineHeight: 1.5,
            }}>
              ★ {m.keyInsight}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Reverie: dream pipeline
// ──────────────────────────────────────────────────────────────────────

export function DreamPipeline() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {DREAM_PHASES.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <div style={{
              flexShrink: 0, width: 48, position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: p.color + '20', border: `2px solid ${p.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: p.color, fontFamily: MONO,
              }}>{i + 1}</div>
              {i < DREAM_PHASES.length - 1 && (
                <div style={{
                  flex: 1, width: 2, background: `linear-gradient(180deg, ${p.color}50, ${DREAM_PHASES[i + 1].color}50)`,
                  marginTop: 4, marginBottom: 4,
                }} />
              )}
            </div>
            <div style={{
              flex: 1, marginBottom: i < DREAM_PHASES.length - 1 ? 16 : 0,
              background: SURFACE, border: `1px solid ${p.color}30`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: 8, padding: '14px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: p.color }}>{p.name}</span>
                <span style={{ fontSize: 10, color: DIM, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {p.mechanism}
                </span>
              </div>
              <div style={{ fontSize: 12, color: TEXT, fontFamily: MONO, marginBottom: 6 }}>{p.action}</div>
              <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{p.details}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Forget curve (SVG)
// ──────────────────────────────────────────────────────────────────────

export function ForgetCurve() {
  const W = 600, H = 280, P = 40
  const xs = (cycle) => P + (cycle / 10) * (W - 2 * P)
  const ys = (pct) => H - P - (pct / 100) * (H - 2 * P)
  const strongPath = FORGET_CURVE_POINTS.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.cycle)} ${ys(d.strong)}`).join(' ')
  const weakPath = FORGET_CURVE_POINTS.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.cycle)} ${ys(d.weak)}`).join(' ')
  return (
    <section style={{ margin: '32px 0' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12 }}>
        {/* axes */}
        <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke={FAINT} strokeWidth={1} />
        <line x1={P} y1={P} x2={P} y2={H - P} stroke={FAINT} strokeWidth={1} />
        {/* gridlines */}
        {[0, 25, 50, 75, 100].map(pct => (
          <g key={pct}>
            <line x1={P} y1={ys(pct)} x2={W - P} y2={ys(pct)} stroke={BORDER} strokeWidth={0.5} strokeDasharray="2 4" />
            <text x={P - 6} y={ys(pct) + 3} textAnchor="end" fontSize={9} fill={DIM} fontFamily={MONO}>{pct}%</text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10].map(c => (
          <text key={c} x={xs(c)} y={H - P + 14} textAnchor="middle" fontSize={9} fill={DIM} fontFamily={MONO}>{c}</text>
        ))}
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={10} fill={MUTED}>dream cycles (weeks)</text>
        <text x={12} y={H / 2} textAnchor="middle" fontSize={10} fill={MUTED} transform={`rotate(-90 12 ${H / 2})`}>survival</text>
        {/* curves */}
        <path d={strongPath} stroke="#22d3ee" strokeWidth={2.5} fill="none" />
        <path d={weakPath} stroke="#f87171" strokeWidth={2.5} fill="none" strokeDasharray="6 4" />
        {/* legend */}
        <g transform={`translate(${W - 200}, ${P + 10})`}>
          <line x1={0} y1={0} x2={20} y2={0} stroke="#22d3ee" strokeWidth={2.5} />
          <text x={26} y={3} fontSize={10} fill={TEXT}>strong (high access × depth)</text>
          <line x1={0} y1={18} x2={20} y2={18} stroke="#f87171" strokeWidth={2.5} strokeDasharray="6 4" />
          <text x={26} y={21} fontSize={10} fill={TEXT}>weak (bare facts, unused)</text>
        </g>
      </svg>
      <div style={{ fontSize: 11, color: DIM, fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>
        Synaptic Homeostasis (SHY) translated to a daemon: proportional decay every cycle, ranking preserved, weak observations fall below threshold and archive.
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// LoCoMo leaderboard
// ──────────────────────────────────────────────────────────────────────

export function LoCoMoChart() {
  const max = 100
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        background: SURFACE, border: `1px solid ${ACCENT}30`,
        borderRadius: 10, padding: '14px 18px', marginBottom: 24,
        borderLeft: `3px solid ${ACCENT}`,
      }}>
        <div style={{ fontSize: 11, color: ACCENT, fontWeight: 700, marginBottom: 4, fontFamily: MONO, letterSpacing: '0.06em' }}>KEY FINDING</div>
        <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{LOCOMO_STATS.keyFinding}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {LOCOMO_LEADERBOARD.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 130, fontSize: 12, color: s.highlight ? TEXT : MUTED,
              fontWeight: s.highlight ? 700 : 400,
              textAlign: 'right', flexShrink: 0,
            }}>{s.name}</div>
            <div style={{ flex: 1, position: 'relative', height: 22 }}>
              <div style={{ position: 'absolute', inset: 0, background: '#0f172a', borderRadius: 4 }} />
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${(s.score / max) * 100}%`,
                background: s.highlight ? `linear-gradient(90deg, ${s.color}, ${s.color}cc)` : s.color + '55',
                borderRadius: 4,
                border: s.highlight ? `1px solid ${s.color}` : 'none',
              }} />
              <span style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, fontWeight: 700, fontFamily: MONO,
                color: s.highlight ? TEXT : MUTED,
              }}>{s.score}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Reverie replaces + ambitions
// ──────────────────────────────────────────────────────────────────────

export function ReverieReplacesGrid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14,
      }}>
        {REVERIE_REPLACES.map(r => (
          <div key={r.target} style={{
            background: `linear-gradient(180deg, ${SURFACE} 0%, ${r.color}06 100%)`,
            border: `1px solid ${r.color}30`,
            borderRadius: 12, padding: 18,
          }}>
            <div style={{ fontSize: 10, color: r.color, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Replaces
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 2 }}>{r.target}</div>
            <div style={{ fontSize: 11, color: DIM, fontFamily: MONO, marginBottom: 12 }}>{r.layer}</div>
            <div style={{ fontSize: 10, color: '#f87171', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Why</div>
            <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>{r.why_replaced}</div>
            <div style={{ fontSize: 10, color: '#4ade80', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>How</div>
            <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>{r.how_replaced}</div>
            <div style={{ fontSize: 10, color: ACCENT, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>New capabilities</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {r.new_capabilities.map(c => (
                <li key={c} style={{ fontSize: 12, color: TEXT, lineHeight: 1.55, paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: ACCENT }}>+</span>{c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ReverieAmbitionGrid() {
  const [openId, setOpenId] = useState(null)
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10,
      }}>
        {REVERIE_AMBITIONS.map(a => {
          const isOpen = openId === a.id
          return (
            <div key={a.id}
              onClick={() => setOpenId(isOpen ? null : a.id)}
              style={{
                background: isOpen ? `linear-gradient(180deg, ${SURFACE} 0%, ${a.color}10 100%)` : SURFACE,
                border: `1px solid ${isOpen ? a.color + '60' : a.color + '25'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: a.color }}>{a.name}</span>
                <span style={{ fontSize: 11, color: DIM, fontFamily: MONO }}>{isOpen ? '−' : '+'}</span>
              </div>
              <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{a.motivation}</div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: 9, color: '#ec4899', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Bio basis</div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.55, marginBottom: 10 }}>{a.bio_basis}</div>
                  <div style={{ fontSize: 9, color: ACCENT, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Implementation</div>
                  <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.55 }}>{a.implementation}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Install guide
// ──────────────────────────────────────────────────────────────────────

export function InstallGuide() {
  return (
    <section style={{ margin: '24px 0' }}>
      {INSTALL_STEPS.map((step, i) => (
        <div key={step.id} style={{
          marginBottom: 20,
          background: SURFACE, border: `1px solid ${BORDER}`,
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <span style={{
              fontSize: 11, fontFamily: MONO, color: ACCENT, fontWeight: 700,
              background: ACCENT + '12', border: `1px solid ${ACCENT}30`,
              padding: '2px 8px', borderRadius: 4,
            }}>STEP {i + 1}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>{step.title}</span>
            <div style={{ flex: 1 }} />
            {step.audience.map(a => <AudienceBadge key={a} kind={a} />)}
          </div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 12 }}>
            <strong style={{ color: ACCENT }}>Why: </strong>{step.why}
          </div>
          {step.steps.map((s, j) => (
            <pre key={j} style={{
              background: '#0f172a', border: `1px solid ${BORDER}`,
              borderRadius: 6, padding: '12px 14px',
              fontSize: 11, color: TEXT, fontFamily: MONO,
              overflowX: 'auto', margin: '8px 0', lineHeight: 1.55,
            }}>
              <code>{s.code}</code>
            </pre>
          ))}
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Memory population examples
// ──────────────────────────────────────────────────────────────────────

export function MemoryExamples() {
  return (
    <section style={{ margin: '24px 0' }}>
      {MEMORY_EXAMPLES.map(layer => (
        <div key={layer.layer} style={{
          marginBottom: 20,
          background: SURFACE, border: `1px solid ${layer.color}30`,
          borderLeft: `3px solid ${layer.color}`,
          borderRadius: 8, padding: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: layer.color }}>{layer.layer}</span>
          </div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
            {layer.when}
          </div>
          {layer.examples.map((ex, i) => (
            <div key={i} style={{
              marginBottom: 8,
              background: '#0f172a', border: `1px solid ${BORDER}`,
              borderLeft: `2px solid ${ex.kind === 'good' ? '#4ade80' : '#f87171'}`,
              borderRadius: 4, padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontSize: 9, fontWeight: 700, fontFamily: MONO,
                  color: ex.kind === 'good' ? '#4ade80' : '#f87171',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>{ex.kind === 'good' ? '✓ Good' : '✕ Bad'}</span>
              </div>
              <div style={{ fontSize: 12, color: TEXT, fontFamily: MONO, lineHeight: 1.55, marginBottom: 4 }}>
                {ex.text}
              </div>
              <div style={{ fontSize: 11, color: DIM, lineHeight: 1.55, fontStyle: 'italic' }}>{ex.why}</div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Engineer + scientist asides
// ──────────────────────────────────────────────────────────────────────

export function ImplementationDetails() {
  return (
    <section style={{ margin: '24px 0' }}>
      {IMPLEMENTATION_DETAILS.map(d => (
        <div key={d.title} style={{
          marginBottom: 14,
          background: SURFACE, border: `1px solid ${ACCENT}25`,
          borderLeft: `3px solid ${ACCENT}`,
          borderRadius: 6, padding: '14px 18px',
        }}>
          <div style={{ fontSize: 9, color: ACCENT, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>For engineers</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{d.title}</div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{d.body}</div>
        </div>
      ))}
    </section>
  )
}

export function NeuroAsides() {
  return (
    <section style={{ margin: '24px 0' }}>
      {NEUROINFORMATICS_NOTES.map(d => (
        <div key={d.title} style={{
          marginBottom: 14,
          background: SURFACE, border: '1px solid #ec489925',
          borderLeft: '3px solid #ec4899',
          borderRadius: 6, padding: '14px 18px',
        }}>
          <div style={{ fontSize: 9, color: '#ec4899', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Neuroinformatics aside</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{d.title}</div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{d.body}</div>
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// References
// ──────────────────────────────────────────────────────────────────────

export function HarnessSourceList() {
  return (
    <section style={{ margin: '24px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 6 }}>
        {HARNESS_SOURCES.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{
              background: SURFACE, border: `1px solid ${BORDER}`,
              borderRadius: 6, padding: '8px 12px',
              fontSize: 11, color: ACCENT, textDecoration: 'none',
              display: 'block',
            }}>
            {s.label}
          </a>
        ))}
      </div>
    </section>
  )
}
