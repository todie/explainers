import { useState } from 'react'
import { SEQUENCES } from '../data/componentArchitecture'

const ACTOR_W = 90
const STEP_H = 36
const MARGIN_TOP = 60
const MARGIN_LEFT = 30

export default function SequenceDiagrams() {
  const [selected, setSelected] = useState('mem-save')
  const seq = SEQUENCES.find(s => s.id === selected)

  const canvasW = seq ? MARGIN_LEFT + seq.actors.length * (ACTOR_W + 20) + 40 : 600
  const canvasH = seq ? MARGIN_TOP + seq.steps.length * STEP_H + 40 : 400

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        Sequence Diagrams
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
        Key interactions traced step-by-step. Each arrow shows data type and protocol.
      </p>

      {/* Diagram selector */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
        {SEQUENCES.map(s => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
              fontSize: 12, fontWeight: selected === s.id ? 700 : 400,
              background: selected === s.id ? '#1e1b4b40' : '#111827',
              border: `1px solid ${selected === s.id ? '#6366f1' : '#1f2937'}`,
              color: selected === s.id ? '#e5e7eb' : '#6b7280',
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {seq && (
        <>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16, lineHeight: 1.6 }}>
            {seq.description}
          </div>

          {canvasW > 900 && (
            <div style={{ fontSize: 11, color: '#4b5563', marginBottom: 6, textAlign: 'right', fontFamily: 'var(--mono)' }}>
              ← scroll →
            </div>
          )}
          <div style={{
            background: '#0a0a0f', border: '1px solid #1f2937', borderRadius: 12,
            overflow: 'auto', padding: '8px 0',
          }}>
            <svg width={canvasW} height={canvasH} style={{ display: 'block', minWidth: '100%' }}>
              <defs>
                <marker id="seq-arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
              </defs>

              {/* Actor lifelines */}
              {seq.actors.map((actor, i) => {
                const x = MARGIN_LEFT + i * (ACTOR_W + 20) + ACTOR_W / 2
                return (
                  <g key={actor}>
                    {/* Actor box */}
                    <rect
                      x={x - ACTOR_W / 2} y={8} width={ACTOR_W} height={28} rx={6}
                      fill="#111827" stroke="#374151" strokeWidth={1}
                    />
                    <text x={x} y={26} textAnchor="middle" fill="#e5e7eb" fontSize={10} fontWeight={700} fontFamily="var(--mono, monospace)">
                      {actor}
                    </text>

                    {/* Lifeline */}
                    <line
                      x1={x} y1={36} x2={x} y2={canvasH - 10}
                      stroke="#1f2937" strokeWidth={1} strokeDasharray="4 3"
                    />
                  </g>
                )
              })}

              {/* Steps */}
              {seq.steps.map((step, i) => {
                const y = MARGIN_TOP + i * STEP_H
                const fromX = MARGIN_LEFT + step.from * (ACTOR_W + 20) + ACTOR_W / 2
                const toX = MARGIN_LEFT + step.to * (ACTOR_W + 20) + ACTOR_W / 2
                const color = step.color || '#6b7280'
                const isSelf = step.self || step.from === step.to
                const midX = (fromX + toX) / 2

                if (isSelf) {
                  // Self-call (loop back)
                  const loopW = 40
                  return (
                    <g key={i}>
                      <path
                        d={`M ${fromX} ${y} h ${loopW} v 16 h ${-loopW}`}
                        fill="none" stroke={color} strokeWidth={1}
                        markerEnd="url(#seq-arrow)"
                        opacity={0.6}
                      />
                      <text x={fromX + loopW + 4} y={y + 5} fill={color} fontSize={8} fontFamily="var(--mono, monospace)">
                        {step.label}
                      </text>
                      {step.protocol && (
                        <text x={fromX + loopW + 4} y={y + 15} fill="#4b5563" fontSize={7} fontFamily="var(--mono, monospace)">
                          [{step.protocol}]
                        </text>
                      )}
                    </g>
                  )
                }

                return (
                  <g key={i}>
                    {/* Arrow */}
                    <line
                      x1={fromX} y1={y} x2={toX} y2={y}
                      stroke={color} strokeWidth={1.5}
                      markerEnd="url(#seq-arrow)"
                      opacity={0.8}
                    />

                    {/* Label */}
                    <rect
                      x={midX - 2} y={y - 14} width={Math.max(step.label.length * 5.5, 80)} height={12} rx={2}
                      fill="#030712" opacity={0.9}
                    />
                    <text x={midX} y={y - 5} textAnchor="middle" fill={color} fontSize={8} fontWeight={600} fontFamily="var(--mono, monospace)">
                      {step.label.length > 50 ? step.label.slice(0, 48) + '...' : step.label}
                    </text>

                    {/* Protocol badge */}
                    {step.protocol && (
                      <text x={midX} y={y + 10} textAnchor="middle" fill="#4b5563" fontSize={7} fontFamily="var(--mono, monospace)">
                        [{step.protocol}]
                      </text>
                    )}

                    {/* Note */}
                    {step.note && (
                      <text x={toX + 8} y={y + 3} fill="#6b728080" fontSize={7} fontStyle="italic">
                        {step.note}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </>
      )}
    </section>
  )
}
