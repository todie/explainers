import { useState, useEffect } from 'react'

const BLOCK_ITEMS = [
  { label: 'CLAUDE.md', type: 'inject', color: '#a855f7', size: 15, desc: 'Environment, tools, conventions' },
  { label: 'MEMORY.md', type: 'inject', color: '#22d3ee', size: 8, desc: 'Per-project feedback & preferences' },
  { label: 'Engram context', type: 'retrieve', color: '#4ade80', size: 12, desc: 'Recent observations loaded at start' },
  { label: 'User messages', type: 'live', color: '#60a5fa', size: 20, desc: 'Current conversation turns' },
  { label: 'Tool results', type: 'live', color: '#60a5fa', size: 25, desc: 'File reads, bash output, search results' },
  { label: 'Agent output', type: 'live', color: '#60a5fa', size: 10, desc: 'Sub-agent research results' },
  { label: 'Free space', type: 'free', color: '#374151', size: 10, desc: 'Remaining tokens until compaction' },
]

export default function ContextBlock() {
  const [hovered, setHovered] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const total = BLOCK_ITEMS.reduce((s, b) => s + b.size, 0)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: 'var(--text-bright)', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Context Window
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 520, margin: '0 auto 32px', textAlign: 'center' }}>
        What Claude sees during a session. The block fills from injected context, retrieved memory, and live conversation.
      </p>

      {/* Visual block */}
      <div style={{
        maxWidth: 640, margin: '0 auto',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
        padding: 24, position: 'relative', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--mono)' }}>
            context_window
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            ~200K tokens
          </span>
        </div>

        {/* Stacked bar */}
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 48, marginBottom: 20 }}>
          {BLOCK_ITEMS.map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: mounted ? `${(item.size / total) * 100}%` : '0%',
                height: '100%',
                background: hovered === i ? item.color + 'cc' : item.color + '80',
                transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms, background 0.2s ease`,
                cursor: 'pointer',
                position: 'relative',
                borderRight: i < BLOCK_ITEMS.length - 1 ? '1px solid var(--bg)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {BLOCK_ITEMS.filter(b => b.type !== 'free').map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={() => setHovered(BLOCK_ITEMS.indexOf(item))}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                opacity: hovered !== null && hovered !== BLOCK_ITEMS.indexOf(item) ? 0.4 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
              <span style={{ fontSize: 11, color: 'var(--text)', fontFamily: 'var(--mono)' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hovered !== null && (
          <div style={{
            marginTop: 16, padding: '12px 16px',
            background: BLOCK_ITEMS[hovered].color + '08',
            border: `1px solid ${BLOCK_ITEMS[hovered].color}20`,
            borderRadius: 8, animation: 'fadeUp 0.2s ease',
          }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: BLOCK_ITEMS[hovered].color, marginBottom: 4 }}>
              {BLOCK_ITEMS[hovered].label}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {BLOCK_ITEMS[hovered].desc}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginTop: 4 }}>
              ~{BLOCK_ITEMS[hovered].size}% of context
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
