// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version had two rounded cards (verbal vs gestalt) with colored
// borders, an auto-looping token-by-token animation, a "Replay" button, and
// a set of click-to-expand metaphor cards. Academic articles don't have
// replay buttons. The demonstration animation is kept — it IS load-bearing,
// it shows the difference the essay is about — but stripped of the colored
// card chrome. Metaphors are shown inline as a two-column reading-first
// layout.

import { useEffect, useState } from 'react'
import { VISUALIZATION_METAPHORS } from '../data/gestaltCognition'

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

// --- Figure 2: timing diagram ---------------------------------------
//
// Two tracks on a shared time axis. The verbal track builds 8 tokens
// one after another, each a small filled square arriving at a fixed
// cadence. The gestalt track stays empty until a single instant near
// the start, at which point the entire answer shape appears all at
// once. This is the section's central claim rendered as a chart.
//
// Animation is pure SVG + CSS: we start the two tracks on mount, they
// play once, and then rest. No replay button, no hover state — it's a
// static figure that happens to auto-reveal.
function TimingFigure() {
  const [frame, setFrame] = useState(0) // 0..8 — 8 is "both done"
  const FRAME_MS = 380
  const VERBAL_STEPS = 8
  const GESTALT_REVEAL_AT = 2   // gestalt reveals at frame 2

  useEffect(() => {
    if (frame >= VERBAL_STEPS) return
    const t = setTimeout(() => setFrame(f => f + 1), FRAME_MS)
    return () => clearTimeout(t)
  }, [frame])

  // Layout constants for the 560 × 220 viewBox
  const trackX = 110
  const trackW = 420
  const verbalY = 70
  const gestaltY = 150
  const stepSize = trackW / VERBAL_STEPS

  const gestaltVisible = frame >= GESTALT_REVEAL_AT

  return (
    <svg viewBox="0 0 560 220" width="100%" style={{ maxWidth: 620, display: 'block', margin: '0 auto' }} role="img" aria-label="Figure 2: timing of verbal versus gestalt processing across one insight">
      {/* Time axis at the bottom */}
      <line x1={trackX} y1={190} x2={trackX + trackW} y2={190} stroke="#4b5563" strokeWidth="1.25" />
      {Array.from({ length: VERBAL_STEPS + 1 }, (_, i) => (
        <line
          key={`tick-${i}`}
          x1={trackX + i * stepSize} y1={190}
          x2={trackX + i * stepSize} y2={195}
          stroke="#4b5563" strokeWidth="1"
        />
      ))}
      <text x={trackX} y={212} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)">t = 0</text>
      <text x={trackX + trackW} y={212} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="end">t = finished</text>
      <text
        x={trackX + trackW / 2} y={212}
        fill="#9ca3af" fontSize="11" textAnchor="middle"
        textTransform="uppercase" letterSpacing="0.08em"
      >
        time →
      </text>

      {/* Verbal track label + guide */}
      <text x={trackX - 12} y={verbalY + 4} fill="#9ca3af" fontSize="11" textAnchor="end" fontWeight={600}>Verbal</text>
      <line x1={trackX} y1={verbalY} x2={trackX + trackW} y2={verbalY} stroke="#1f2937" strokeWidth="0.8" strokeDasharray="2 4" />

      {/* Verbal tokens — one square per step, appearing in sequence */}
      {Array.from({ length: VERBAL_STEPS }, (_, i) => {
        const visible = frame > i
        return (
          <rect
            key={`tok-${i}`}
            x={trackX + i * stepSize + 6}
            y={verbalY - 10}
            width={stepSize - 12}
            height={20}
            fill="#e5e7eb"
            rx="2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(2px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          />
        )
      })}

      {/* Gestalt track label + guide */}
      <text x={trackX - 12} y={gestaltY + 4} fill="#a855f7" fontSize="11" textAnchor="end" fontWeight={700}>Gestalt</text>
      <line x1={trackX} y1={gestaltY} x2={trackX + trackW} y2={gestaltY} stroke="#1f2937" strokeWidth="0.8" strokeDasharray="2 4" />

      {/* Gestalt "the whole answer" — a single wide shape that fades in
          all at once early in the timeline. */}
      <rect
        x={trackX + GESTALT_REVEAL_AT * stepSize + 6}
        y={gestaltY - 14}
        width={(VERBAL_STEPS - GESTALT_REVEAL_AT) * stepSize - 12}
        height={28}
        fill="rgba(168, 85, 247, 0.22)"
        stroke="#a855f7"
        strokeWidth="1.5"
        rx="2"
        style={{
          opacity: gestaltVisible ? 1 : 0,
          transform: gestaltVisible ? 'scale(1)' : 'scale(0.97)',
          transformOrigin: `${trackX + GESTALT_REVEAL_AT * stepSize + 6}px ${gestaltY}px`,
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <text
        x={trackX + GESTALT_REVEAL_AT * stepSize + (VERBAL_STEPS - GESTALT_REVEAL_AT) * stepSize / 2}
        y={gestaltY + 4}
        fill="#f9fafb" fontSize="11" fontWeight={600}
        textAnchor="middle"
        style={{
          opacity: gestaltVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.15s',
        }}
      >
        the whole answer
      </text>

      {/* Annotation arrow — "arrives at once" */}
      {gestaltVisible && (
        <g style={{ opacity: gestaltVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
          <path
            d={`M ${trackX + GESTALT_REVEAL_AT * stepSize + 6} ${gestaltY - 26}
                L ${trackX + GESTALT_REVEAL_AT * stepSize + 6} ${gestaltY - 18}`}
            stroke="#a855f7" strokeWidth="1.25" fill="none"
            markerEnd="url(#arrow-head)"
          />
        </g>
      )}

      <defs>
        <marker id="arrow-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
        </marker>
      </defs>

      {/* Title above the tracks */}
      <text x={trackX - 12} y={36} fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="end">mode</text>
      <text x={(trackX + trackW) / 2 + 60} y={36} fill="#9ca3af" fontSize="11" textAnchor="middle" textTransform="uppercase" letterSpacing="0.08em">One insight, two timelines</text>
    </svg>
  )
}

export default function Visualization() {
  return (
    <section>
      <header style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          What It Looks Like
        </h2>
        <p style={{ ...body, color: '#9ca3af' }}>
          The difference between sequential and gestalt processing, shown in
          two side-by-side demonstrations and then a sequence of metaphors.
        </p>
      </header>

      {/* Figure 2: timing diagram. Plays once on mount and then rests. */}
      <figure style={{
        margin: '0 0 56px 0', padding: '32px 16px 24px',
        borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937',
      }}>
        <div style={{ ...smallCaps, marginBottom: 16, textAlign: 'center' }}>Figure 2</div>
        <TimingFigure />
        <figcaption style={{
          fontSize: 12, color: '#6b7280', marginTop: 24, textAlign: 'center',
          fontStyle: 'italic', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Figure 2. The same insight, plotted against time. The verbal track
          accumulates tokens step by step until the answer is complete. The
          gestalt track stays empty until a single moment, then the whole
          answer arrives at once. The difference is not in the content —
          it is in the temporal shape.
        </figcaption>
      </figure>

      {/* Metaphors. All shown inline — no click-to-expand. */}
      <div>
        <div style={{ ...smallCaps, marginBottom: 10 }}>Six metaphors</div>
        <h3 style={{
          fontSize: 20, fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.01em',
          margin: '0 0 28px 0',
        }}>
          Metaphors for the difference
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {VISUALIZATION_METAPHORS.map((m, i) => {
            const isLast = i === VISUALIZATION_METAPHORS.length - 1
            return (
              <div
                key={m.id}
                style={{
                  paddingBottom: isLast ? 0 : 32,
                  marginBottom: isLast ? 0 : 32,
                  borderBottom: isLast ? 'none' : '1px solid #1f2937',
                }}
              >
                <h4 style={{
                  fontSize: 16, fontWeight: 700, color: '#e5e7eb',
                  margin: '0 0 14px 0',
                }}>
                  {m.title}
                </h4>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
                }}>
                  <div>
                    <div style={{ ...smallCaps, marginBottom: 6 }}>Verbal</div>
                    <p style={{ ...body, fontSize: 14 }}>{m.verbal}</p>
                  </div>
                  <div style={{ paddingLeft: 28, borderLeft: '1px solid #1f2937' }}>
                    <div style={{ ...smallCaps, marginBottom: 6 }}>Gestalt</div>
                    <p style={{ ...body, fontSize: 14 }}>{m.gestalt}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
