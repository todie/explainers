import { useState } from 'react'
import {
  OLD_NODES, OLD_EDGES, OLD_PROBLEMS,
  NEW_NODES, NEW_EDGES, NEW_IMPROVEMENTS,
  NODE_STYLES, STATUS_COLORS,
} from '../data/architecture'

const CANVAS_W = 820
const CANVAS_H = 480

function GraphNode({ node, isSelected, onSelect, style }) {
  const s = style || NODE_STYLES[node.type] || NODE_STYLES.component
  const statusColor = STATUS_COLORS[node.status] || '#6b7280'

  return (
    <g
      onClick={() => onSelect(node.id)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow on selection */}
      {isSelected && (
        <circle cx={node.x} cy={node.y} r={38} fill={s.border + '15'} />
      )}

      {/* Node body */}
      <rect
        x={node.x - 56} y={node.y - 20} width={112} height={40} rx={8}
        fill={s.bg} stroke={isSelected ? statusColor : s.border}
        strokeWidth={isSelected ? 2 : 1}
        opacity={0.95}
      />

      {/* Status indicator */}
      <circle cx={node.x + 48} cy={node.y - 12} r={4} fill={statusColor} />

      {/* Label */}
      <text
        x={node.x} y={node.y + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill="#e5e7eb" fontSize={11} fontWeight={600}
        fontFamily="var(--mono, monospace)"
      >
        {node.label}
      </text>

      {/* Type badge */}
      <text
        x={node.x} y={node.y + 14}
        textAnchor="middle" dominantBaseline="middle"
        fill="#6b7280" fontSize={8}
        fontFamily="var(--mono, monospace)"
      >
        {node.type}
      </text>
    </g>
  )
}

function GraphEdge({ edge, nodes, animated }) {
  const from = nodes.find(n => n.id === edge.from)
  const to = nodes.find(n => n.id === edge.to)
  if (!from || !to) return null

  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / len
  const ny = dy / len

  // Offset start/end to node edges
  const x1 = from.x + nx * 30
  const y1 = from.y + ny * 22
  const x2 = to.x - nx * 30
  const y2 = to.y - ny * 22

  // Midpoint for label
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2

  // Curve control point (slight bend)
  const perpX = -ny * 20
  const perpY = nx * 20
  const cx = mx + perpX * 0.3
  const cy = my + perpY * 0.3

  const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
  const color = edge.color || '#4b5563'

  return (
    <g>
      {/* Edge line */}
      <path
        d={path} fill="none"
        stroke={color} strokeWidth={edge.internal ? 1 : 1.5}
        strokeDasharray={edge.dashed ? '4 3' : 'none'}
        opacity={edge.internal ? 0.5 : 0.7}
        markerEnd="url(#arrow)"
      />

      {/* Animated flow particles */}
      {animated && (
        <circle r={2} fill={color} opacity={0.8}>
          <animateMotion dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" path={path} />
        </circle>
      )}

      {/* Protocol label */}
      <rect
        x={mx - 30} y={my - 8} width={60} height={16} rx={3}
        fill="#030712" stroke={color + '30'} strokeWidth={0.5}
      />
      <text
        x={mx} y={my + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={7}
        fontFamily="var(--mono, monospace)"
      >
        {edge.protocol}
      </text>

      {/* Edge label */}
      <text
        x={mx} y={my - 12}
        textAnchor="middle" dominantBaseline="middle"
        fill="#6b7280" fontSize={8}
      >
        {edge.label}
      </text>
    </g>
  )
}

export default function ArchitectureGraph() {
  const [mode, setMode] = useState('new') // 'old' | 'new'
  const [selected, setSelected] = useState(null)
  const [animated, setAnimated] = useState(true)

  const nodes = mode === 'old' ? OLD_NODES : NEW_NODES
  const edges = mode === 'old' ? OLD_EDGES : NEW_EDGES
  const annotations = mode === 'old' ? OLD_PROBLEMS : NEW_IMPROVEMENTS

  const selectedNode = selected ? nodes.find(n => n.id === selected) : null
  const selectedAnnotations = annotations.filter(a =>
    (a.node === selected) || (a.component === selected) ||
    (a.edge && a.edge.includes(selected))
  )

  return (
    <section>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>
        System Architecture
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
        Before and after — how knowledge flows between components.
        Click nodes to inspect. Toggle to compare architectures.
      </p>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {['old', 'new'].map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setSelected(null) }}
            style={{
              padding: '6px 16px', borderRadius: 6, cursor: 'pointer',
              fontSize: 12, fontWeight: 600, fontFamily: 'var(--mono)',
              background: mode === m ? (m === 'old' ? '#7f1d1d20' : '#1e1b4b40') : '#111827',
              border: `1px solid ${mode === m ? (m === 'old' ? '#ef4444' : '#6366f1') : '#1f2937'}`,
              color: mode === m ? '#e5e7eb' : '#6b7280',
            }}
          >
            {m === 'old' ? 'Before (fragmented)' : 'After (Reverie)'}
          </button>
        ))}
        <button
          onClick={() => setAnimated(a => !a)}
          style={{
            marginLeft: 'auto', padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
            fontSize: 11, background: '#111827', border: '1px solid #1f2937',
            color: animated ? '#22c55e' : '#6b7280',
          }}
        >
          {animated ? 'Flow: ON' : 'Flow: OFF'}
        </button>
      </div>

      {/* SVG Graph */}
      <div style={{
        background: '#0a0a0f', border: '1px solid #1f2937', borderRadius: 12,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Grid background */}
        <svg width="100%" viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} style={{ display: 'block' }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f293720" strokeWidth="0.5" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
            </marker>
          </defs>

          <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

          {/* Render edges first (behind nodes) */}
          {edges.map((edge, i) => (
            <GraphEdge key={i} edge={edge} nodes={nodes} animated={animated} />
          ))}

          {/* Render nodes */}
          {nodes.map(node => (
            <GraphNode
              key={node.id}
              node={node}
              isSelected={selected === node.id}
              onSelect={setSelected}
            />
          ))}

          {/* Internal boundary for reveried (new mode only) */}
          {mode === 'new' && (
            <rect
              x={340} y={230} width={320} height={210} rx={12}
              fill="none" stroke="#4338ca15" strokeWidth={1} strokeDasharray="6 4"
            />
          )}
          {mode === 'new' && (
            <text x={345} y={248} fill="#4338ca30" fontSize={9} fontFamily="var(--mono)">
              reveried process boundary
            </text>
          )}
        </svg>
      </div>

      {/* Detail panel */}
      {selectedNode && (
        <div style={{
          marginTop: 12, padding: '14px 18px',
          background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
          animation: 'fadeUp 0.15s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: STATUS_COLORS[selectedNode.status],
            }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#e5e7eb' }}>{selectedNode.label}</span>
            <span style={{
              fontSize: 10, fontFamily: 'var(--mono)', color: '#6b7280',
              background: '#1f2937', padding: '2px 8px', borderRadius: 4,
            }}>{selectedNode.type}</span>
          </div>
          <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6, margin: '0 0 8px' }}>
            {selectedNode.desc}
          </p>

          {/* Problems (old) or improvements (new) */}
          {selectedAnnotations.map((ann, i) => (
            <div key={i} style={{
              padding: '8px 12px', borderRadius: 6, marginTop: 6,
              background: mode === 'old' ? '#7f1d1d10' : '#1e1b4b15',
              borderLeft: `3px solid ${mode === 'old' ? '#ef4444' : '#22c55e'}`,
              fontSize: 12, color: '#d1d5db', lineHeight: 1.5,
            }}>
              <span style={{ fontWeight: 700, color: mode === 'old' ? '#ef4444' : '#22c55e', marginRight: 6 }}>
                {mode === 'old' ? 'Problem:' : 'Improvement:'}
              </span>
              {ann.problem || ann.improvement}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16,
        fontSize: 10, color: '#6b7280', fontFamily: 'var(--mono)',
      }}>
        <span><span style={{ color: '#22c55e' }}>●</span> healthy</span>
        <span><span style={{ color: '#eab308' }}>●</span> warn</span>
        <span><span style={{ color: '#ef4444' }}>●</span> degraded</span>
        <span style={{ marginLeft: 8 }}>─── solid = active</span>
        <span>- - - dashed = async/optional</span>
        <span>● animated = data flow</span>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
