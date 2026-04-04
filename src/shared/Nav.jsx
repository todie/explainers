import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { EXPLAINERS } from './explainers'

function fuzzyMatch(query, text) {
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  if (t.includes(q)) return 2
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  return qi === q.length ? 1 : 0
}

function scoreExplainer(query, ex) {
  const titleScore = fuzzyMatch(query, ex.title) * 3
  const shortScore = fuzzyMatch(query, ex.short) * 2
  const tagScore = ex.tags.reduce((best, tag) => Math.max(best, fuzzyMatch(query, tag)), 0)
  return titleScore + shortScore + tagScore
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const results = query.trim()
    ? EXPLAINERS
        .map(ex => ({ ...ex, score: scoreExplainer(query, ex) }))
        .filter(ex => ex.score > 0)
        .sort((a, b) => b.score - a.score)
    : EXPLAINERS

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelectedIdx(0)
  }, [])

  const go = useCallback((path) => {
    navigate(path)
    close()
  }, [navigate, close])

  // Keyboard: Cmd+K / Ctrl+K to open, Escape to close
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  // Reset selection when results change
  useEffect(() => { setSelectedIdx(0) }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      go(results[selectedIdx].path)
    }
  }

  const currentExplainer = EXPLAINERS.find(ex => location.pathname.startsWith(ex.path))

  return (
    <>
      {/* Top bar — thin, unintrusive */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(31, 41, 55, 0.6)',
      }}>
        {/* Left: breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'var(--mono, monospace)' }}>
          <a
            href="/explainers/"
            onClick={(e) => { e.preventDefault(); navigate('/explainers/') }}
            style={{ color: '#6b7280', textDecoration: 'none', cursor: 'pointer' }}
          >
            explainers
          </a>
          {currentExplainer && (
            <>
              <span style={{ color: '#374151' }}>/</span>
              <span style={{ color: '#9ca3af' }}>{currentExplainer.id}</span>
            </>
          )}
        </div>

        {/* Right: search trigger */}
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(31, 41, 55, 0.5)', border: '1px solid rgba(55, 65, 81, 0.5)',
            borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
            fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono, monospace)',
          }}
        >
          <span>Search</span>
          <kbd style={{
            fontSize: 10, color: '#4b5563', background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid #374151', borderRadius: 3, padding: '1px 5px',
          }}>
            {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}K
          </kbd>
        </button>
      </nav>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div style={{ height: 40 }} />

      {/* Command palette overlay */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', paddingTop: 120,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 480,
              background: '#111827', border: '1px solid #1f2937',
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              animation: 'fadeUp 0.15s ease',
            }}
          >
            {/* Search input */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #1f2937' }}>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search explainers..."
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 15, color: '#e5e7eb', fontFamily: 'var(--font, system-ui)',
                }}
              />
            </div>

            {/* Results */}
            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {results.length === 0 && (
                <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
                  No matches
                </div>
              )}
              {results.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => go(ex.path)}
                  onMouseEnter={() => setSelectedIdx(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    width: '100%', padding: '10px 16px',
                    background: i === selectedIdx ? 'rgba(96, 165, 250, 0.08)' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderLeft: i === selectedIdx ? '2px solid #60a5fa' : '2px solid transparent',
                  }}
                >
                  <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{ex.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: i === selectedIdx ? '#e5e7eb' : '#9ca3af' }}>
                      {ex.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{ex.short}</div>
                  </div>
                  {location.pathname.startsWith(ex.path) && (
                    <span style={{
                      marginLeft: 'auto', fontSize: 9, fontFamily: 'var(--mono, monospace)',
                      color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)',
                      border: '1px solid rgba(74, 222, 128, 0.2)',
                      padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase',
                    }}>current</span>
                  )}
                </button>
              ))}
            </div>

            {/* Footer hints */}
            <div style={{
              padding: '8px 16px', borderTop: '1px solid #1f2937',
              display: 'flex', gap: 12, fontSize: 10, color: '#4b5563', fontFamily: 'var(--mono, monospace)',
            }}>
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
