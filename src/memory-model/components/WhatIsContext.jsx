import { useState, useEffect } from 'react'
import { CONCEPTS, CONCEPT_CATEGORY_META } from '../data/contextResearch'

function AttentionViz() {
  const [step, setStep] = useState(0)
  const tokens = ['The', 'cat', 'sat', 'on', 'the', 'mat', 'because', 'it', 'was', 'tired']
  const target = 7 // "it"
  // Attention weights from "it" back to other tokens
  const weights = [0.02, 0.45, 0.08, 0.03, 0.02, 0.05, 0.12, 1.0, 0.03, 0.20]

  useEffect(() => {
    if (step < tokens.length) {
      const t = setTimeout(() => setStep(s => s + 1), 300)
      return () => clearTimeout(t)
    }
  }, [step, tokens.length])

  return (
    <div style={{ padding: 24, background: '#0d1117', borderRadius: 12, border: '1px solid #1f2937' }}>
      <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, fontFamily: 'var(--mono, monospace)' }}>
        Self-attention: what does "it" attend to?
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {tokens.map((tok, i) => {
          const visible = i < step
          const w = weights[i]
          const isTarget = i === target
          const color = isTarget ? '#f87171' : `rgba(74, 222, 128, ${Math.min(w * 1.5, 1)})`
          const borderColor = isTarget ? '#f87171' : w > 0.3 ? '#4ade80' : '#1f2937'
          return (
            <div key={i} style={{
              padding: '8px 14px', borderRadius: 8,
              background: visible ? `${color}15` : '#111827',
              border: `2px solid ${visible ? borderColor : '#111827'}`,
              opacity: visible ? 1 : 0.2,
              transition: 'all 0.4s ease',
              textAlign: 'center', minWidth: 48,
            }}>
              <div style={{ fontSize: 15, fontFamily: 'var(--mono, monospace)', color: visible ? '#e5e7eb' : '#374151', fontWeight: isTarget ? 700 : 400 }}>
                {tok}
              </div>
              {visible && (
                <div style={{ fontSize: 9, fontFamily: 'var(--mono, monospace)', color: isTarget ? '#f87171' : '#4ade80', marginTop: 4 }}>
                  {isTarget ? 'query' : (w * 100).toFixed(0) + '%'}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
        "it" attends strongly to "cat" (45%) and "tired" (20%) — resolving the pronoun by looking back through context.
        <br />
        <span style={{ color: '#4b5563' }}>This is what a transformer does on every token, for every layer, in parallel.</span>
      </div>
      <button onClick={() => setStep(0)} style={{
        display: 'block', margin: '12px auto 0', background: '#1f2937', border: '1px solid #374151',
        borderRadius: 6, padding: '5px 14px', fontSize: 11, color: '#9ca3af', cursor: 'pointer',
      }}>Replay</button>
    </div>
  )
}

function ConceptCard({ concept }) {
  const [open, setOpen] = useState(false)
  const catMeta = CONCEPT_CATEGORY_META[concept.category] || { color: '#6b7280', label: concept.category }

  return (
    <div
      onClick={() => setOpen(v => !v)}
      style={{
        background: open ? `linear-gradient(135deg, #111827 0%, ${catMeta.color}06 100%)` : '#111827',
        border: `1px solid ${open ? catMeta.color + '25' : '#1f2937'}`,
        borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
          background: catMeta.color + '12', color: catMeta.color, border: `1px solid ${catMeta.color}20`,
          textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--mono, monospace)',
        }}>{catMeta.label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', flex: 1 }}>{concept.title}</span>
        <span style={{ fontSize: 12, color: '#4b5563', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>
        {open ? concept.explanation : concept.explanation.slice(0, 120) + '...'}
      </div>
      {open && concept.keyInsight && (
        <div style={{
          marginTop: 12, padding: '10px 14px', background: catMeta.color + '08',
          border: `1px solid ${catMeta.color}12`, borderRadius: 8,
          fontSize: 12, color: '#d1d5db', lineHeight: 1.6,
        }}>
          <strong style={{ color: catMeta.color }}>Key insight: </strong>{concept.keyInsight}
        </div>
      )}
    </div>
  )
}

export default function WhatIsContext() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        What Is Context?
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 600, margin: '0 auto 32px', textAlign: 'center', lineHeight: 1.7 }}>
        In a transformer, context is everything the model can attend to when generating the next token.
        Every prior token, every instruction, every tool result — all visible simultaneously through self-attention.
      </p>

      <AttentionViz />

      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 700, margin: '40px auto 0' }}>
        {CONCEPTS.map(c => <ConceptCard key={c.id} concept={c} />)}
      </div>
    </div>
  )
}
