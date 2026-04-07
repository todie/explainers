/**
 * The Harness — explainer components.
 *
 * Post-audit rewrite applying the full /impeccable stack discipline:
 *   /distill  — deleted HeroStats, FramingsTriad, ReverieReplacesGrid,
 *               AudienceBadge; collapsed click-to-expand cards to inline.
 *   /quieter  — removed severity/category pills, gradient overlay
 *               backgrounds, colored card accents, "SHOT FIRED" pill,
 *               decorative monospace.
 *   /arrange  — replaced rounded-card chrome with hairline `border-top`
 *               rules and whitespace. Two legitimate grids retained
 *               (NeuroGrid for bio↔impl teaching, DreamPipeline as
 *               numbered sequence). Everything else is flowing prose.
 *   /typeset  — hierarchy via weight/size/small-caps/italics, not color.
 *               Component titles are plain `TEXT`. Color reserved for
 *               the single cyan accent + inline links + one blockquote
 *               style + one semantic good/bad palette.
 *   /adapt    — PlacementTree rebuilt with flex/grid reflow.
 *               ForgetCurve responsive wrapper + horizontal Y-axis label.
 *               Grid columns collapse cleanly below 600px.
 *   /harden   — aria-expanded on Foldable, focus-visible rings,
 *               12px minimum label size.
 *   /polish   — consistent vertical rhythm (48px between h2s,
 *               24px between subsections), single spacing scale.
 *
 * Design tokens are consistent with the site's existing palette
 * (.impeccable.md §"Color strategy") — one accent per explainer, hairlines
 * instead of cards, typography does the hierarchy.
 */

import { useState } from 'react'
import {
  RTK_SAVINGS,
  HOOKS,
  DIVISION_OF_LABOR,
  ENGRAM_AUDIT_HIGHLIGHTS,
  FORGET_CURVE_POINTS,
  HARNESS_SOURCES,
  REVERIE_REPLACES,
  REVERIE_AMBITIONS,
} from './data'
import { LAYERS, MECHANISMS, DREAM_PHASES, LOCOMO_LEADERBOARD, LOCOMO_STATS } from '../reverie/data'

// ── Design tokens ────────────────────────────────────────────────────
// Single accent per .impeccable.md §"Color strategy". Use for chrome,
// inline links, and one blockquote style. Do NOT use for component
// titles, card borders, or category pills.
const ACCENT = '#22d3ee'

// Surfaces and text. No gradients, no tints. Components rest directly on
// the page canvas (#030712, defined in shared/global CSS); only code
// blocks get a subtly-tinted slab background.
const SURFACE = '#0b1220'   // only for code blocks and one inline slab
const BORDER = '#1f2937'    // hairline rule color
const TEXT = '#e5e7eb'      // body / titles
const MUTED = '#9ca3af'     // body-secondary (AA on BG)
const DIM = '#6b7280'       // metadata (AA on BG)
const SEMANTIC_GOOD = '#22c55e'  // used only when teaching binary semantics
const SEMANTIC_BAD = '#ef4444'   // used only when teaching binary semantics

// Only these places get monospace: real code snippets, numeric data in
// charts, CLI-style text the reader is supposed to recognize as a shell
// command. NOT for eyebrow labels.
const MONO = 'var(--mono, ui-monospace, "JetBrains Mono", monospace)'

// ──────────────────────────────────────────────────────────────────────
// Primitives: hairline + small-caps + foldable + pull + adversarial
// ──────────────────────────────────────────────────────────────────────

function SmallCaps({ children, muted = true }) {
  return (
    <span style={{
      fontVariant: 'small-caps',
      letterSpacing: '0.03em',
      color: muted ? DIM : TEXT,
      fontWeight: 600,
    }}>{children}</span>
  )
}

/**
 * Foldable — minimal-chrome variant after the audit.
 *
 * `.impeccable.md` forbids click-to-expand accordions with custom chrome,
 * but the user asked to keep some folded sections with less chrome. This
 * is the stripped version: hairline top rule, plain prose title,
 * text-only expand affordance, hairline left-gutter for the revealed
 * content, no gradient, no rounded card, no colored border, no rotation
 * animation, no gamification.
 *
 * Use sparingly and only for genuinely optional reference-like content
 * (install guides, memory examples, audience-specific deep dives).
 * Anything that belongs in the main reading flow goes inline.
 */
export function Foldable({ title, note, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ margin: '48px 0 24px' }}>
      <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: 20 }} />
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          color: TEXT,
          display: 'block',
          textAlign: 'left',
          font: 'inherit',
          width: '100%',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: DIM, fontVariant: 'small-caps', letterSpacing: '0.04em', minWidth: 48 }}>
            {open ? '— hide' : '+ show'}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: TEXT, letterSpacing: '-0.01em' }}>
            {title}
          </span>
          {note && (
            <span style={{ fontSize: 14, color: DIM, fontStyle: 'italic' }}>— {note}</span>
          )}
        </span>
      </button>
      {open && (
        <div
          style={{
            marginTop: 20,
            paddingLeft: 20,
            borderLeft: `1px solid ${BORDER}`,
            fontSize: 15,
            color: MUTED,
            lineHeight: 1.75,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Pull — one blockquote style, earns the accent per .impeccable.md.
 * Stripped of the gradient background that was part of the AI-slop pass.
 */
export function Pull({ children }) {
  return (
    <blockquote
      style={{
        margin: '40px 0',
        padding: '8px 0 8px 24px',
        borderLeft: `2px solid ${ACCENT}`,
        fontSize: 20,
        lineHeight: 1.5,
        color: TEXT,
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </blockquote>
  )
}

/**
 * Adversarial — "shot fired" callout, stripped of the red pill.
 * The rebuttal already does the work; the performative urgency label did
 * not. This version uses a small-caps eyebrow prefix ("contra") and a
 * quiet left rule.
 */
export function Adversarial({ target }) {
  return (
    <div
      style={{
        margin: '28px 0',
        paddingLeft: 20,
        borderLeft: `2px solid ${DIM}`,
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <SmallCaps>Contra</SmallCaps>{' '}
        <strong style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>{target.name}</strong>
      </div>
      <div style={{ fontSize: 14, color: MUTED, marginBottom: 8, lineHeight: 1.7 }}>
        <em>Their claim.</em> {target.claim}
      </div>
      <div style={{ fontSize: 15, color: TEXT, marginBottom: 8, lineHeight: 1.7 }}>
        <em>Rebuttal.</em> {target.rebuttal}
      </div>
      <div style={{ fontSize: 13, color: DIM, lineHeight: 1.7 }}>
        <em>Evidence.</em> {target.evidence}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hierarchy — inline, no click-to-expand, hairline rows
// ──────────────────────────────────────────────────────────────────────

export function HierarchyPyramid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            style={{
              padding: '18px 0',
              borderTop: i === 0 ? `1px solid ${BORDER}` : 'none',
              borderBottom: `1px solid ${BORDER}`,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: 24,
              alignItems: 'baseline',
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 2 }}>
                {layer.name}
              </div>
              <div style={{ fontSize: 12, color: DIM, fontFamily: MONO }}>
                {layer.cpuAnalog} · {layer.brainAnalog}
              </div>
              <div style={{ fontSize: 12, color: DIM, marginTop: 4 }}>
                {layer.autoLoaded ? 'always loaded' : 'on demand'} · {layer.latency}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 6 }}>
                {layer.description}
              </div>
              <div style={{ fontSize: 12, color: DIM, fontStyle: 'italic', lineHeight: 1.6 }}>
                Constraint: {layer.constraint}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// RTK — horizontal bar chart, solid fills, hairline row separators
// ──────────────────────────────────────────────────────────────────────

export function RTKFlow() {
  const maxRaw = Math.max(...RTK_SAVINGS.map((r) => r.raw))
  return (
    <section style={{ margin: '32px 0' }}>
      <div
        style={{
          fontSize: 14,
          color: MUTED,
          fontFamily: MONO,
          marginBottom: 20,
          padding: '12px 16px',
          background: SURFACE,
          borderLeft: `2px solid ${BORDER}`,
        }}
      >
        <div style={{ color: DIM, marginBottom: 4 }}># model emits</div>
        <div>curl api.cf/zones</div>
        <div style={{ color: DIM, margin: '8px 0 4px' }}># hook rewrites to</div>
        <div>rtk curl api/zones</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 28 }}>
        {RTK_SAVINGS.map((r) => {
          const savedPct = Math.round(((r.raw - r.compressed) / r.raw) * 100)
          const rawW = (r.raw / maxRaw) * 100
          const compW = (r.compressed / maxRaw) * 100
          return (
            <div
              key={r.command}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 220px) minmax(0, 1fr)',
                gap: 16,
                alignItems: 'center',
                paddingBottom: 8,
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <div style={{ fontSize: 12, color: TEXT, fontFamily: MONO, textAlign: 'right' }}>
                {r.command}
              </div>
              <div style={{ position: 'relative', height: 24 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: `${rawW}%`,
                    background: BORDER,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    bottom: 4,
                    width: `${compW}%`,
                    background: ACCENT,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 12,
                    fontFamily: MONO,
                    color: TEXT,
                    paddingLeft: 8,
                  }}
                >
                  {(r.raw / 1024).toFixed(1)}K → {(r.compressed / 1024).toFixed(1)}K ({savedPct}%)
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: DIM, fontStyle: 'italic', marginTop: 16 }}>
        Accent bar = bytes the model sees after the hook. Rule behind = original stdout.
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Engram — two-column read/write, hairline-only
// ──────────────────────────────────────────────────────────────────────

export function EngramSplit() {
  const Col = ({ title, latency, code, footer }) => (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{title}</div>
        <div style={{ fontSize: 12, color: DIM, fontFamily: MONO }}>{latency}</div>
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          background: SURFACE,
          borderLeft: `2px solid ${BORDER}`,
          fontSize: 12,
          color: MUTED,
          fontFamily: MONO,
          lineHeight: 1.7,
          overflow: 'auto',
        }}
      >
        {code}
      </pre>
      <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginTop: 12 }}>
        {footer}
      </div>
    </div>
  )
  return (
    <section
      style={{
        margin: '32px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 32,
        paddingTop: 20,
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <Col
        title="Read path"
        latency="bash + curl, ~3 ms"
        code={`$ mem raw "/search?q=auth+bug"
  ↓
curl localhost:7437
  ↓
SQLite + FTS5`}
        footer={
          <>Dozens of calls per session. The 60× speed advantage over MCP is what makes the memory system <em>get used</em> instead of <em>get skipped</em>.</>
        }
      />
      <Col
        title="Write path"
        latency="MCP stdio, ~200 ms"
        code={`mem_save(topic_key=...)
  ↓
stdio JSON-RPC
  ↓
dedup · upsert · scope
  ↓
SQLite + FTS5`}
        footer={
          <>A handful of calls per session. Paid only when writing matters. Discipline at the write site beats cleverness at the read site.</>
        }
      />
    </section>
  )
}

// Audit findings — hairline list, no pills, severity as small-caps prefix
export function EngramAuditTable() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {ENGRAM_AUDIT_HIGHLIGHTS.map((f) => (
          <div
            key={f.id}
            style={{
              padding: '18px 0',
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <div style={{ fontSize: 15, color: TEXT, marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: DIM, fontFamily: MONO, marginRight: 12 }}>
                {f.id}
              </span>
              <SmallCaps muted={f.severity !== 'critical'}>{f.severity}</SmallCaps>
              {' · '}
              <strong style={{ fontWeight: 700 }}>{f.title}</strong>
            </div>
            <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, paddingLeft: 52 }}>
              {f.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Placement tree — flex/grid, reflows on narrow viewports
// ──────────────────────────────────────────────────────────────────────

export function PlacementTree() {
  const Leaf = ({ label, note }) => (
    <div
      style={{
        padding: '10px 16px',
        borderLeft: `2px solid ${BORDER}`,
      }}
    >
      <div style={{ fontSize: 14, color: TEXT, fontWeight: 700, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, color: DIM }}>{note}</div>
    </div>
  )
  const Q = ({ text, children }) => (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 13, color: MUTED, fontStyle: 'italic', marginBottom: 8 }}>
        {text}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          paddingLeft: 20,
        }}
      >
        {children}
      </div>
    </div>
  )
  return (
    <section style={{ margin: '32px 0', paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
      <Q text="Is it derivable from code or git?">
        <Leaf label="DON'T STORE" note="Let the source of truth win." />
        <Q text="Is it a behavioral directive?">
          <Leaf label="CLAUDE.md / auto-memory" note="Always loaded. Zero-sum." />
          <Q text="Atomic fact, prose, or spec?">
            <Leaf label="ENGRAM" note="Searchable. Upsertable. Project-scoped." />
            <Leaf label="OBSIDIAN" note="Browsable. Wikilinks. Long-form." />
            <Leaf label="LINEAR" note="Acceptance criteria. The contract." />
          </Q>
        </Q>
      </Q>
      <div style={{ fontSize: 12, color: DIM, fontStyle: 'italic', marginTop: 20 }}>
        Every save runs through this tree before it lands. Decided once, at design time, binding.
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hooks — hairline list, no pills, no colored borders
// ──────────────────────────────────────────────────────────────────────

export function HookGrid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {HOOKS.map((h) => (
          <div
            key={h.intent}
            style={{
              padding: '18px 0',
              borderBottom: `1px solid ${BORDER}`,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: 24,
              alignItems: 'baseline',
            }}
          >
            <div>
              <div style={{ fontSize: 15, color: TEXT, fontWeight: 700, marginBottom: 4 }}>
                {h.intent}
              </div>
              <div style={{ fontSize: 12, color: DIM, fontFamily: MONO }}>{h.hook}</div>
              <div style={{ fontSize: 12, color: DIM, marginTop: 2 }}>
                <SmallCaps>{h.severity}</SmallCaps> · {h.trigger} → {h.action}
              </div>
            </div>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{h.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Division of labor — three columns, hairline separators, typographic
// ──────────────────────────────────────────────────────────────────────

export function DivisionOfLaborGrid() {
  return (
    <section
      style={{
        margin: '32px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 32,
        paddingTop: 20,
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      {DIVISION_OF_LABOR.map((role) => (
        <div key={role.role}>
          <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 2, letterSpacing: '-0.01em' }}>
            {role.role}
          </div>
          <div style={{ fontSize: 13, color: DIM, fontStyle: 'italic', marginBottom: 16 }}>
            {role.analog.toLowerCase()}
          </div>
          <div style={{ marginBottom: 14 }}>
            <SmallCaps>Does</SmallCaps>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none' }}>
              {role.duties.map((d) => (
                <li
                  key={d}
                  style={{
                    fontSize: 13,
                    color: TEXT,
                    lineHeight: 1.6,
                    paddingLeft: 16,
                    position: 'relative',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: SEMANTIC_GOOD }}>✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SmallCaps>Does not</SmallCaps>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none' }}>
              {role.notDuties.map((d) => (
                <li
                  key={d}
                  style={{
                    fontSize: 13,
                    color: MUTED,
                    lineHeight: 1.6,
                    paddingLeft: 16,
                    position: 'relative',
                    marginBottom: 4,
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: SEMANTIC_BAD }}>✕</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Neuroscience grid — two-column bio↔impl, no pills, no nested callout
// ──────────────────────────────────────────────────────────────────────

export function NeuroGrid() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {MECHANISMS.map((m) => (
          <div
            key={m.id}
            style={{
              padding: '20px 0',
              borderBottom: `1px solid ${BORDER}`,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: 24,
            }}
          >
            <div style={{ gridColumn: '1 / -1', marginBottom: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>
                {m.name}{' '}
                <span style={{ fontSize: 12, color: DIM, fontStyle: 'italic', fontWeight: 400 }}>
                  — {m.category}
                </span>
              </div>
            </div>
            <div>
              <SmallCaps>Biology</SmallCaps>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginTop: 4 }}>
                {m.bioFunction}
              </div>
            </div>
            <div>
              <SmallCaps>Reverie mapping</SmallCaps>
              <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.7, marginTop: 4 }}>
                {m.reverieMapping}
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1', fontSize: 12, color: DIM, fontStyle: 'italic', marginTop: 6 }}>
              Key insight: {m.keyInsight}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Dream pipeline — numbered sequence, hairline rows, no gradient connector
// ──────────────────────────────────────────────────────────────────────

export function DreamPipeline() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {DREAM_PHASES.map((p, i) => (
          <div
            key={p.id}
            style={{
              padding: '20px 0',
              borderBottom: `1px solid ${BORDER}`,
              display: 'grid',
              gridTemplateColumns: '40px minmax(0, 1fr)',
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: DIM,
                fontFamily: MONO,
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>
                {p.name}{' '}
                <span style={{ fontSize: 12, color: DIM, fontStyle: 'italic', fontWeight: 400 }}>
                  — {p.mechanism}
                </span>
              </div>
              <div style={{ fontSize: 13, color: TEXT, fontFamily: MONO, marginTop: 6 }}>
                {p.action}
              </div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginTop: 6 }}>
                {p.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Forget curve — responsive SVG, horizontal Y-axis label
// ──────────────────────────────────────────────────────────────────────

export function ForgetCurve() {
  const W = 720, H = 300, PL = 52, PR = 20, PT = 40, PB = 44
  const xs = (cycle) => PL + (cycle / 10) * (W - PL - PR)
  const ys = (pct) => H - PB - (pct / 100) * (H - PT - PB)
  const strongPath = FORGET_CURVE_POINTS.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.cycle)} ${ys(d.strong)}`).join(' ')
  const weakPath = FORGET_CURVE_POINTS.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.cycle)} ${ys(d.weak)}`).join(' ')
  return (
    <figure style={{ margin: '32px 0' }}>
      <div style={{ fontSize: 12, color: DIM, marginBottom: 4 }}>survival (%)</div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Decay curve showing strong observations persisting while weak observations fall below threshold over 10 dream cycles"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke={BORDER} strokeWidth={1} />
        <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke={BORDER} strokeWidth={1} />
        {[0, 25, 50, 75, 100].map((pct) => (
          <g key={pct}>
            <line x1={PL} y1={ys(pct)} x2={W - PR} y2={ys(pct)} stroke={BORDER} strokeWidth={0.5} strokeDasharray="2 4" />
            <text x={PL - 8} y={ys(pct) + 4} textAnchor="end" fontSize={11} fill={DIM} fontFamily={MONO}>
              {pct}
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10].map((c) => (
          <text key={c} x={xs(c)} y={H - PB + 16} textAnchor="middle" fontSize={11} fill={DIM} fontFamily={MONO}>
            {c}
          </text>
        ))}
        <text x={(W - PR + PL) / 2} y={H - 12} textAnchor="middle" fontSize={12} fill={MUTED}>
          dream cycles (weeks)
        </text>
        <path d={strongPath} stroke={ACCENT} strokeWidth={2.5} fill="none" />
        <path d={weakPath} stroke={TEXT} strokeWidth={1.5} fill="none" strokeDasharray="5 4" opacity={0.55} />
        <g transform={`translate(${W - 260}, ${PT + 6})`}>
          <line x1={0} y1={0} x2={24} y2={0} stroke={ACCENT} strokeWidth={2.5} />
          <text x={30} y={4} fontSize={12} fill={TEXT}>strong (high access × depth)</text>
          <line x1={0} y1={20} x2={24} y2={20} stroke={TEXT} strokeWidth={1.5} strokeDasharray="5 4" opacity={0.55} />
          <text x={30} y={24} fontSize={12} fill={TEXT}>weak (bare facts, unused)</text>
        </g>
      </svg>
      <figcaption style={{ fontSize: 12, color: DIM, fontStyle: 'italic', marginTop: 8 }}>
        Synaptic Homeostasis (SHY) translated to a daemon: proportional decay every cycle, ranking
        preserved, weak observations fall below the retention threshold and archive.
      </figcaption>
    </figure>
  )
}

// ──────────────────────────────────────────────────────────────────────
// LoCoMo leaderboard — solid bars, no gradient
// ──────────────────────────────────────────────────────────────────────

export function LoCoMoChart() {
  const max = 100
  return (
    <section style={{ margin: '32px 0' }}>
      <div
        style={{
          marginBottom: 24,
          paddingLeft: 20,
          borderLeft: `2px solid ${ACCENT}`,
          fontSize: 14,
          color: TEXT,
          lineHeight: 1.6,
        }}
      >
        <SmallCaps>Key finding</SmallCaps>
        <div style={{ marginTop: 4 }}>{LOCOMO_STATS.keyFinding}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {LOCOMO_LEADERBOARD.map((s) => (
          <div
            key={s.name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 140px) minmax(0, 1fr) 40px',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: s.highlight ? TEXT : MUTED,
                fontWeight: s.highlight ? 700 : 400,
                textAlign: 'right',
              }}
            >
              {s.name}
            </div>
            <div style={{ position: 'relative', height: 20 }}>
              <div style={{ position: 'absolute', inset: 0, background: BORDER, opacity: 0.3 }} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(s.score / max) * 100}%`,
                  background: s.highlight ? ACCENT : MUTED,
                  opacity: s.highlight ? 1 : 0.55,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 12,
                fontFamily: MONO,
                color: s.highlight ? TEXT : DIM,
                textAlign: 'right',
              }}
            >
              {s.score}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Reverie replacements — inline prose blocks with hairlines
// ──────────────────────────────────────────────────────────────────────

export function ReverieReplacesBlocks() {
  return (
    <section style={{ margin: '32px 0' }}>
      {REVERIE_REPLACES.map((r, i) => (
        <div
          key={r.target}
          style={{
            padding: '24px 0',
            borderTop: i === 0 ? `1px solid ${BORDER}` : 'none',
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <SmallCaps>Replaces</SmallCaps>
          <div style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginTop: 2, letterSpacing: '-0.01em' }}>
            {r.target}
          </div>
          <div style={{ fontSize: 13, color: DIM, fontFamily: MONO, marginBottom: 14 }}>{r.layer}</div>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: '0 0 12px' }}>
            <em>Why.</em> {r.why_replaced}
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: '0 0 12px' }}>
            <em>How.</em> {r.how_replaced}
          </p>
          <div style={{ marginTop: 8 }}>
            <SmallCaps>New capabilities</SmallCaps>
            <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
              {r.new_capabilities.map((c) => (
                <li key={c} style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, marginBottom: 4 }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Reverie ambitions — inline stack, no click-to-expand
// ──────────────────────────────────────────────────────────────────────

export function ReverieAmbitionList() {
  return (
    <section style={{ margin: '32px 0' }}>
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        {REVERIE_AMBITIONS.map((a) => (
          <div
            key={a.id}
            style={{
              padding: '22px 0',
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
              {a.name}
            </div>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: '0 0 10px' }}>
              {a.motivation}
            </p>
            <div style={{ fontSize: 13, color: DIM, lineHeight: 1.75, marginBottom: 6 }}>
              <em>Bio basis.</em> {a.bio_basis}
            </div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.75 }}>
              <em>Implementation.</em> {a.implementation}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Install guide — plain headings + fenced code, no card chrome
// ──────────────────────────────────────────────────────────────────────

export function InstallGuide() {
  // Small, inline, newbie-friendly walk-through of the current setup.
  // Reads as a numbered list of prose + code, not a grid of cards.
  const steps = [
    {
      n: 1,
      title: 'Install Claude Code',
      why: 'The CLI is what executes the hooks, loads CLAUDE.md, and talks to MCP servers.',
      code: 'curl -fsSL https://claude.ai/install.sh | sh\nclaude --version',
    },
    {
      n: 2,
      title: 'Install Engram',
      why: 'The persistent memory daemon. Runs as a local HTTP server on localhost:7437 and exposes MCP tools for writes.',
      code: 'cargo install --git https://github.com/todie/engram-rs\nengram serve &\nmem raw "/health"   # → {"status":"ok"}',
    },
    {
      n: 3,
      title: 'Install RTK',
      why: 'The shell-output compression proxy. Wraps git / curl / docker / gh / kubectl and returns schema-extracted stdout.',
      code: 'cargo install --git https://github.com/todie/rtk\nrtk --version\nrtk git status   # try it directly',
    },
    {
      n: 4,
      title: 'Wire the PreToolUse hook',
      why: 'Makes Claude Code rewrite bash calls through rtk transparently. This is where the 60–90% savings come from.',
      code: `# ~/.claude/settings.json (excerpt)
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "command": "~/.claude/hooks/rtk-rewrite.sh" }
    ]
  }
}`,
    },
    {
      n: 5,
      title: 'Add the secret-leak guard',
      why: 'Blocks echo $SECRET_VAR, ${VAR:-fallback} expansions on credential names, and curl|sh patterns. Absolute, not probabilistic.',
      code: `# Download and enable
curl -o ~/.claude/hooks/guard-dangerous-commands.sh \\
  https://raw.githubusercontent.com/todie/claude-hooks/main/guard-dangerous-commands.sh
chmod +x ~/.claude/hooks/guard-dangerous-commands.sh`,
    },
    {
      n: 6,
      title: 'Populate CLAUDE.md and auto-memory',
      why: 'The zero-cost context layer. CLAUDE.md holds behavioral rules, auto-memory holds who-you-are facts. Both load on every session.',
      code: `~/.claude/CLAUDE.md                    # global rules
~/.claude/memory/MEMORY.md             # auto-memory index
~/.claude/memory/user_profile.md       # "who is this engineer"
~/.claude/memory/feedback_testing.md   # "never mock the DB in tests"`,
    },
    {
      n: 7,
      title: 'Add the MCP servers',
      why: 'Linear, Obsidian, Gmail, Google Calendar — whatever external systems the work touches. Managed in claude.ai for cloud servers, settings.json for local ones.',
      code: `# Local MCP server entry in ~/.claude/settings.json
"mcpServers": {
  "obsidian": {
    "command": "node",
    "args": ["~/.claude/mcp/obsidian/index.js"]
  }
}`,
    },
  ]
  return (
    <section style={{ margin: '16px 0' }}>
      {steps.map((s) => (
        <div key={s.n} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
            <span style={{ color: DIM, fontFamily: MONO, fontSize: 13, marginRight: 10 }}>
              {String(s.n).padStart(2, '0')}
            </span>
            {s.title}
          </div>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: '0 0 8px 32px' }}>
            {s.why}
          </p>
          <pre
            style={{
              margin: '0 0 0 32px',
              padding: 14,
              background: SURFACE,
              borderLeft: `2px solid ${BORDER}`,
              fontSize: 12,
              color: TEXT,
              fontFamily: MONO,
              lineHeight: 1.65,
              overflow: 'auto',
            }}
          >
            {s.code}
          </pre>
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Memory examples — good/bad pairs, hairlines only
// ──────────────────────────────────────────────────────────────────────

export function MemoryExamples() {
  // Inline examples per layer. Color is used only to teach good/bad
  // semantics — that's the one case .impeccable.md allows.
  const layers = [
    {
      layer: 'CLAUDE.md (behavioral directive)',
      when: 'A rule that must be true on every turn. Blast radius justifies always-on cost.',
      examples: [
        {
          kind: 'good',
          text: '- **sudo:** password-protected. Suggest userspace alternatives first; ask before using sudo.',
          why: 'Short, imperative, names the action, gives the fallback.',
        },
        {
          kind: 'bad',
          text: '- We usually prefer not to use sudo unless really needed, and even then we should probably ask first most of the time.',
          why: 'Hedged, verbose, no imperative. The model cannot honor "usually" / "probably" reliably.',
        },
      ],
    },
    {
      layer: 'Auto-memory (always-loaded fact)',
      when: 'Stable fact about the user or project that must be present before the first question is asked.',
      examples: [
        {
          kind: 'good',
          text: '---\ntype: user\n---\nChristian Todie: platform/infra engineer. Rust-first. Deep C++/systems/security background. Frame explanations for a peer.',
          why: 'Typed, short, names the audience frame so the model can adjust register automatically.',
        },
        {
          kind: 'bad',
          text: 'User is probably an engineer and likes Rust',
          why: 'No front-matter, no type, hedged. Will not be treated as load-bearing.',
        },
      ],
    },
    {
      layer: 'Engram (atomic project fact)',
      when: 'Decision, bug root cause, convention, or discovery that only matters inside a project scope.',
      examples: [
        {
          kind: 'good',
          text: 'mem_save(topic_key="bug/anthropic-key-leak", project="explainers", content="${VAR:-fallback} echoes the VALUE when set, not the fallback. Hook guard-dangerous-commands.sh now blocks this class end-anchored. 35/35 adversarial tests pass.")',
          why: 'Topic-key named under a family, scoped to project, describes cause + fix + evidence.',
        },
        {
          kind: 'bad',
          text: 'mem_save(content="fixed a bug with env vars today")',
          why: 'No topic key (unfindable), no project (will leak across scopes), no cause, no fix, no evidence.',
        },
      ],
    },
    {
      layer: 'Obsidian (long-form prose)',
      when: 'Design doc, post-mortem, research notes — anything that flows over multiple paragraphs and wants wikilinks.',
      examples: [
        {
          kind: 'good',
          text: '# Reverie — consolidation daemon\n\n## Problem\n[[engram]] is flat-keyword-only. 62% tombstone rate after proactive-save Goodharted itself...',
          why: 'H1 title, wikilinks to related notes, structured sections, lives in ~/vault/projects/ for PARA.',
        },
        {
          kind: 'bad',
          text: 'engram notes.md: "engram is good but we need more"',
          why: 'No structure, no links, no context, will rot. Also a single atomic claim — belongs in Engram, not Obsidian.',
        },
      ],
    },
    {
      layer: 'Linear (specification)',
      when: 'The contract for a unit of work. Must be written before the model starts, and must refuse drift.',
      examples: [
        {
          kind: 'good',
          text: 'Title: Reduce session-token TTL from 3600s to 900s.\nAC: existing sessions stay valid, /health returns 200, tests in test_auth pass.\nOut of scope: refresh path, cookie domain, OAuth migration.',
          why: 'Acceptance criteria are testable. Out-of-scope is explicit. The model can refuse drift.',
        },
        {
          kind: 'bad',
          text: 'Title: Fix the auth bug',
          why: 'No criteria. The model will wander. The PR will sprawl. The review will reopen settled questions.',
        },
      ],
    },
  ]
  return (
    <section style={{ margin: '16px 0' }}>
      {layers.map((layer) => (
        <div key={layer.layer} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 2 }}>
            {layer.layer}
          </div>
          <div style={{ fontSize: 13, color: DIM, fontStyle: 'italic', marginBottom: 14 }}>
            {layer.when}
          </div>
          {layer.examples.map((ex, i) => (
            <div
              key={i}
              style={{
                marginBottom: 12,
                paddingLeft: 16,
                borderLeft: `2px solid ${ex.kind === 'good' ? SEMANTIC_GOOD : SEMANTIC_BAD}`,
              }}
            >
              <div style={{ fontSize: 12, color: ex.kind === 'good' ? SEMANTIC_GOOD : SEMANTIC_BAD, marginBottom: 4 }}>
                <SmallCaps muted={false}>{ex.kind === 'good' ? 'Good' : 'Bad'}</SmallCaps>
              </div>
              <pre
                style={{
                  margin: '0 0 6px',
                  padding: 0,
                  fontSize: 12,
                  color: TEXT,
                  fontFamily: MONO,
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                  background: 'none',
                }}
              >
                {ex.text}
              </pre>
              <div style={{ fontSize: 12, color: DIM, fontStyle: 'italic', lineHeight: 1.65 }}>
                {ex.why}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Engineer + scientist asides — inline, hairline only
// ──────────────────────────────────────────────────────────────────────

const IMPLEMENTATION_NOTES = [
  {
    title: 'Why FTS5 over a vector DB',
    body:
      'FTS5 gives you bm25 + prefix matching + phrase queries + boolean operators in one query language, with sub-millisecond latency on sub-gigabyte indexes, with zero infrastructure beyond a SQLite file. Vector stores add an embedding step at write, another at read, and a similarity-not-semantics failure mode where a query and its negation are near-neighbors. For a single-user coding harness the payoff curve favors keyword search by a wide margin. The LoCoMo leaderboard agrees: consolidation-based systems outperform vector-based systems across the board, and the substrate is not the differentiator.',
  },
  {
    title: 'Topic-key conventions',
    body:
      'Every Engram write uses a topic_key of the form family/slug. Families are fixed: pattern/, bug/, decision/, discovery/, convention/, reference/, user/, feedback/, project/. Slugs are kebab-case, project-scoped, and deterministic given the content — which is what makes upsert-not-append work. Writing the same fact twice under the same topic_key updates the existing observation; writing it under a different topic_key creates a second row and starts the drift we spent the audit cleaning up.',
  },
  {
    title: 'Read vs. write split in practice',
    body:
      'The bash client (mem raw, hitting localhost:7437 via curl) is used for every search, every context load, every session-start pull. The MCP tools (mem_save, mem_update) are used only when actually writing. The split exists because MCP round-trips are ~60× slower than the bash client, and a 200ms cost per read would cause the model to skip memory entirely on most turns — and atrophied memory is the failure mode of every memory system that exists today.',
  },
]

export function ImplementationDetails() {
  return (
    <section>
      {IMPLEMENTATION_NOTES.map((d) => (
        <div key={d.title} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
            {d.title}
          </div>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>{d.body}</p>
        </div>
      ))}
    </section>
  )
}

const NEURO_NOTES = [
  {
    title: 'Why FIFO is the wrong scheduler',
    body:
      'Sharp-wave ripple replay during NREM is reward-modulated and novelty-biased, not chronological. Buzsáki 2015 measured the replay bias directly in rodents and humans — the experiences that mattered for performance the next day were preferentially reactivated during sleep. A replay queue scored purely on recency is throwing away the signal that decides what should be consolidated at all.',
  },
  {
    title: 'Why catastrophic interference is a Complementary Learning Systems failure',
    body:
      'McClelland, McNaughton & O\'Reilly 1995 is the foundational paper. The argument: you need fast one-shot learning (hippocampus) and slow statistical learning (neocortex) because they solve different problems and fight each other if you try to do both in one substrate. Writing directly to a distributed representation overwrites prior learning in predictable, mathematical ways. Every agent-that-learns-from-its-conversations that skips the staging buffer is re-running the same experiment the paper already ran, and getting the same answer.',
  },
  {
    title: 'Why "infinite memory" is biologically illiterate',
    body:
      'Tononi & Cirelli 2014 — the Synaptic Homeostasis Hypothesis — argues that slow-wave sleep exists primarily to proportionally downscale synaptic weights across the brain. Awake learning saturates synapses; sleep prunes the weakest. Without the pruning, signal-to-noise collapses. Patient H.M. (Scoville & Milner 1957) is the existence proof that forgetting and remembering are dual operations on the same substrate: remove the hippocampus, lose both. A memory system that cannot forget is not more powerful — it is failing in a way that biology already warned about.',
  },
  {
    title: 'Why spacing > frequency',
    body:
      'Cepeda et al. 2008 meta-analyzed hundreds of spacing studies: the optimal retention interval is 10–30% of the target retention period. Five distinct sessions spread over two weeks beats fifty accesses in one afternoon by a wide margin. Engram\'s current importance proxy is access count; Reverie\'s will be session_spread with an exponential stability parameter, following the Ebbinghaus-style model A-MEM (Feb 2025) and EverMemOS (Jan 2026) are already using.',
  },
]

export function NeuroAsides() {
  return (
    <section>
      {NEURO_NOTES.map((d) => (
        <div key={d.title} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
            {d.title}
          </div>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>{d.body}</p>
        </div>
      ))}
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Newbie primer — inline body, used inside a Foldable
// ──────────────────────────────────────────────────────────────────────

export function NewbiePrimer() {
  const Q = ({ q, a }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{q}</div>
      <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: 0 }}>{a}</p>
    </div>
  )
  return (
    <section>
      <Q
        q="What is Claude Code?"
        a="Anthropic's official CLI and IDE extension for using Claude as a coding assistant. You give it a task, it reads files, writes files, runs commands, and produces a diff you review. The product is a chat-driven IDE-adjacent agent, but the interesting surface is the configuration layer underneath: settings, hooks, MCP servers, slash commands, auto-memory. That configuration layer is where this entire piece lives."
      />
      <Q
        q="What is a hook?"
        a="A small program — usually a bash script — that the Claude Code runtime executes around tool calls. Hooks run before a tool call (PreToolUse) where you can rewrite or block the call, after (PostToolUse) where you can transform the result, on session start, on session stop, and so on. Hooks are how you make guarantees instead of requests. The model can be persuaded; a hook cannot."
      />
      <Q
        q="What is MCP?"
        a="The Model Context Protocol — a wire format Anthropic standardized for plugging external tools and data sources into a model. JSON-RPC over stdio or HTTP. When this piece says Engram exposes itself via MCP for writes, that's the protocol: the daemon advertises named tools, the model invokes them by name, the daemon executes them and returns results. MCP is transport, not semantics — and that distinction matters when we get to the misconception about MCP fixing memory."
      />
      <Q
        q="What is a memory system, and why do you need one?"
        a="A model's context window resets every conversation. Anything you want it to remember next session — decisions, bug root causes, your name — has to live somewhere durable that gets loaded into context when needed. The default approach is shove it all in the system prompt and hope. The serious approach is a memory system: a database with a query interface, a write discipline, and a consolidation policy. Half this piece is about exactly this."
      />
      <Q
        q="What is Engram, what is Reverie?"
        a="Engram is the persistent memory daemon we run today — SQLite + FTS5 keyword search, 3 ms reads, MCP writes with upsert. Reverie is its successor, currently in design — a neuroscience-grounded consolidation daemon that adds dreaming, decay, replay, and reconsolidation to the same socket Engram exposes. Reverie replaces both Engram and the Obsidian sync layer."
      />
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Sources list — compact, no cards
// ──────────────────────────────────────────────────────────────────────

export function HarnessSourceList() {
  return (
    <section style={{ margin: '16px 0' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {HARNESS_SOURCES.map((s, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              padding: '8px 0',
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
