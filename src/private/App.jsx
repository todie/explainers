import { useState, useEffect, useMemo } from 'react'
import { marked } from 'marked'
import { CATEGORIES, DOCS } from './docs'

marked.setOptions({ breaks: true, gfm: true })

export default function PrivateApp() {
  const [activeDoc, setActiveDoc] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const grouped = useMemo(() => {
    const map = {}
    for (const cat of CATEGORIES) map[cat.id] = { ...cat, docs: [] }
    for (const doc of DOCS) map[doc.category]?.docs.push(doc)
    return Object.values(map).filter(g => g.docs.length > 0)
  }, [])

  useEffect(() => {
    if (!activeDoc) return
    let cancelled = false
    setLoading(true)
    setContent('')
    activeDoc.file()
      .then(mod => {
        if (cancelled) return
        setContent(mod.default)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setContent(`# Failed to load\n\n${err.message}`)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [activeDoc])

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        padding: '60px 24px 36px', textAlign: 'center',
        background: 'linear-gradient(180deg, #111827 0%, #030712 100%)',
      }}>
        <div style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 999,
          background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: 11, color: '#f87171', fontFamily: 'var(--mono, monospace)', marginBottom: 16,
        }}>
          private
        </div>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#e5e7eb',
          letterSpacing: '-0.02em', marginBottom: 8,
        }}>
          {activeDoc ? activeDoc.title : 'Documents'}
        </h1>
        {activeDoc && (
          <button onClick={() => { setActiveDoc(null); setContent('') }} style={{
            background: 'none', border: '1px solid #374151', borderRadius: 6,
            color: '#9ca3af', fontSize: 12, padding: '4px 12px', cursor: 'pointer',
            fontFamily: 'var(--mono, monospace)',
          }}>
            ← back
          </button>
        )}
      </header>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 80px' }}>
        {!activeDoc ? (
          /* Document list */
          grouped.map(group => (
            <div key={group.id} style={{ marginBottom: 32 }}>
              <h2 style={{
                fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
                letterSpacing: '0.08em', fontFamily: 'var(--mono, monospace)', marginBottom: 10,
              }}>
                {group.icon} {group.label}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {group.docs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDoc(doc)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '14px 18px', textAlign: 'left',
                      background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
                      cursor: 'pointer', transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#1f2937'}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{doc.title}</span>
                    <span style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--mono, monospace)', flexShrink: 0, marginLeft: 12 }}>
                      {doc.date}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : loading ? (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>Loading...</p>
        ) : (
          /* Rendered markdown */
          <article
            className="private-doc"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
            style={{
              color: '#d1d5db', lineHeight: 1.7, fontSize: 15,
            }}
          />
        )}
      </div>

      {/* Markdown styles */}
      <style>{`
        .private-doc h1 { font-size: 24px; font-weight: 800; color: #e5e7eb; border-bottom: 1px solid #1f2937; padding-bottom: 8px; margin: 32px 0 16px; }
        .private-doc h2 { font-size: 18px; font-weight: 700; color: #e5e7eb; margin: 28px 0 12px; }
        .private-doc h3 { font-size: 15px; font-weight: 600; color: #9ca3af; margin: 20px 0 8px; }
        .private-doc p { margin: 0 0 12px; }
        .private-doc ul, .private-doc ol { padding-left: 20px; margin: 0 0 12px; }
        .private-doc li { margin-bottom: 4px; }
        .private-doc strong { color: #e5e7eb; }
        .private-doc blockquote { border-left: 3px solid #374151; padding-left: 16px; color: #9ca3af; font-style: italic; margin: 16px 0; }
        .private-doc table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
        .private-doc th { background: #1f2937; color: #9ca3af; font-weight: 600; text-align: left; padding: 8px 12px; border: 1px solid #374151; }
        .private-doc td { padding: 8px 12px; border: 1px solid #1f2937; color: #d1d5db; }
        .private-doc tr:hover td { background: rgba(96, 165, 250, 0.04); }
        .private-doc code { background: #1f2937; padding: 2px 6px; border-radius: 4px; font-size: 13px; font-family: var(--mono, monospace); }
        .private-doc pre { background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 16px 0; }
        .private-doc pre code { background: none; padding: 0; }
        .private-doc hr { border: none; border-top: 1px solid #1f2937; margin: 24px 0; }
        .private-doc a { color: #60a5fa; text-decoration: none; }
        .private-doc a:hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}
