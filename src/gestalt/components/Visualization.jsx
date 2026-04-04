import { useState, useEffect } from 'react'
import { VISUALIZATION_METAPHORS } from '../data/gestaltCognition'

function VerbalAnimation() {
  const [step, setStep] = useState(0)
  const words = ['The', 'answer', 'builds', 'one', 'word', 'at', 'a', 'time']

  useEffect(() => {
    if (step >= words.length) return
    const t = setTimeout(() => setStep(s => s + 1), 400)
    return () => clearTimeout(t)
  }, [step, words.length])

  return (
    <div style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--mono, monospace)', fontSize: 16, color: '#60a5fa' }}>
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
    <div style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        fontSize: 16, fontFamily: 'var(--mono, monospace)', color: '#f87171',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'scale(1)' : 'scale(0.7)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center', lineHeight: 1.6,
      }}>
        The whole answer arrives at once.
        <br />
        <span style={{ fontSize: 12, color: '#6b7280' }}>Then you spend 20 minutes explaining it.</span>
      </div>
    </div>
  )
}

export default function Visualization() {
  const [activeMetaphor, setActiveMetaphor] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  const replay = () => setAnimKey(k => k + 1)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        What It Looks Like
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 560, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Attempting to visualize the difference between sequential and gestalt processing.
      </p>

      {/* Side-by-side animation */}
      <div style={{ maxWidth: 700, margin: '0 auto 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            background: '#111827', border: '1px solid #60a5fa20', borderRadius: 14,
            padding: '20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              Verbal Processing
            </div>
            <VerbalAnimation key={`v-${animKey}`} />
            <div style={{ fontSize: 11, color: '#4b5563', marginTop: 12 }}>Sequential — one token at a time</div>
          </div>
          <div style={{
            background: '#111827', border: '1px solid #f8717120', borderRadius: 14,
            padding: '20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              Gestalt Processing
            </div>
            <GestaltAnimation key={`g-${animKey}`} />
            <div style={{ fontSize: 11, color: '#4b5563', marginTop: 12 }}>Instantaneous — the whole at once</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button onClick={replay} style={{
            background: '#1f2937', border: '1px solid #374151', borderRadius: 6,
            padding: '6px 14px', fontSize: 11, color: '#9ca3af', cursor: 'pointer',
          }}>Replay</button>
        </div>
      </div>

      {/* Metaphors */}
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#9ca3af', textAlign: 'center', marginBottom: 16 }}>
          Metaphors for the difference
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {VISUALIZATION_METAPHORS.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMetaphor(activeMetaphor === m.id ? null : m.id)}
              style={{
                background: activeMetaphor === m.id ? 'linear-gradient(135deg, #111827 0%, #a855f706 100%)' : '#111827',
                border: `1px solid ${activeMetaphor === m.id ? '#a855f730' : '#1f2937'}`,
                borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#a855f7' }}>{m.title}</span>
                <span style={{ fontSize: 13, color: '#4b5563', transition: 'transform 0.2s', transform: activeMetaphor === m.id ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>

              {activeMetaphor === m.id && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14, paddingTop: 14, borderTop: '1px solid #1f2937' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Verbal</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{m.verbal}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Gestalt</div>
                    <div style={{ fontSize: 12, color: '#d1d5db', lineHeight: 1.7 }}>{m.gestalt}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
