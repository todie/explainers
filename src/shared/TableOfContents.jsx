import { useState, useEffect } from 'react'
import Emoji from './Emoji'

/**
 * Floating table of contents with scroll spy.
 * sections: [{ id, title, icon? }]
 * accent: color string
 */
export default function TableOfContents({ sections, accent = '#60a5fa' }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  const activeIdx = sections.findIndex(s => s.id === activeId)
  const progress = sections.length > 1 ? (activeIdx / (sections.length - 1)) * 100 : 0

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 90,
          width: 44, height: 44, borderRadius: '50%',
          background: accent + '15', border: `1px solid ${accent}30`,
          color: accent, fontSize: 18, cursor: 'pointer',
          display: 'none', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        }}
        className="toc-mobile-toggle"
      >
        ☰
      </button>

      {/* TOC panel */}
      <nav
        className={`toc-panel ${open ? 'toc-open' : ''}`}
        style={{
          position: 'fixed', top: 56, right: 16, zIndex: 80,
          width: 200, maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          background: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(31, 41, 55, 0.6)',
          borderRadius: 12, padding: '14px 0',
        }}
      >
        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: `${progress}%`, height: 2, background: accent, borderRadius: '12px 0 0 0', transition: 'width 0.3s ease' }} />

        <div style={{ padding: '0 14px 8px', fontSize: 9, fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Contents
        </div>

        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '6px 14px',
              background: activeId === s.id ? accent + '0a' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              borderLeft: activeId === s.id ? `2px solid ${accent}` : '2px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            {s.icon && <Emoji size={12} style={{ opacity: 0.7, fontSize: 12 }}>{s.icon}</Emoji>}
            <span style={{
              fontSize: 11, color: activeId === s.id ? '#e5e7eb' : '#6b7280',
              fontWeight: activeId === s.id ? 600 : 400,
              lineHeight: 1.4,
            }}>
              {s.title}
            </span>
          </button>
        ))}
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .toc-panel { display: none !important; }
          .toc-panel.toc-open { display: block !important; top: auto !important; bottom: 72px !important; right: 16px !important; }
          .toc-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}
