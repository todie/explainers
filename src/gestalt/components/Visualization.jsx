// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version had two rounded cards (verbal vs gestalt) with colored
// borders, an auto-looping token-by-token animation, a "Replay" button, and
// a set of click-to-expand metaphor cards. Academic articles don't have
// replay buttons. The demonstration animation is kept — it IS load-bearing,
// it shows the difference the essay is about — but stripped of the colored
// card chrome. Metaphors are shown inline as a two-column reading-first
// layout.

import { useState, useEffect } from 'react'
import { VISUALIZATION_METAPHORS } from '../data/gestaltCognition'

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

function VerbalAnimation() {
  const [step, setStep] = useState(0)
  const words = ['The', 'answer', 'builds', 'one', 'word', 'at', 'a', 'time']

  useEffect(() => {
    if (step >= words.length) return
    const t = setTimeout(() => setStep(s => s + 1), 400)
    return () => clearTimeout(t)
  }, [step, words.length])

  return (
    <div style={{ minHeight: 72, display: 'flex', alignItems: 'center' }}>
      <div style={{ fontFamily: 'var(--mono, monospace)', fontSize: 15, color: '#e5e7eb' }}>
        {words.slice(0, step).map((w, i) => (
          <span key={i} style={{ opacity: 1, animation: 'fadeUp 0.3s ease both', marginRight: 6 }}>
            {w}
          </span>
        ))}
        {step < words.length && <span style={{ color: '#374151', animation: 'pulse 1s infinite' }}>|</span>}
      </div>
    </div>
  )
}

function GestaltAnimation() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight: 72, display: 'flex', alignItems: 'center' }}>
      <div style={{
        fontSize: 15, fontFamily: 'var(--mono, monospace)', color: '#e5e7eb',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'none' : 'translateY(4px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        lineHeight: 1.6,
      }}>
        The whole answer arrives at once.
        <br />
        <span style={{ fontSize: 12, color: '#6b7280' }}>Then you spend 20 minutes explaining it.</span>
      </div>
    </div>
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

      {/* Side-by-side demonstration. No card chrome, no replay button — it
          plays once when it scrolls into view and then rests. */}
      <figure style={{
        margin: '0 0 48px 0', padding: '28px 0',
        borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 32, alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ ...smallCaps, marginBottom: 12 }}>Verbal / sequential</div>
            <VerbalAnimation />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 14 }}>
              One token at a time.
            </div>
          </div>
          <div style={{ paddingLeft: 32, borderLeft: '1px solid #1f2937' }}>
            <div style={{ ...smallCaps, marginBottom: 12 }}>Gestalt / instantaneous</div>
            <GestaltAnimation />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 14 }}>
              The whole at once.
            </div>
          </div>
        </div>
        <figcaption style={{
          fontSize: 12, color: '#6b7280', marginTop: 24, textAlign: 'center',
          fontStyle: 'italic',
        }}>
          Figure 1. The irreducible temporal difference.
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
