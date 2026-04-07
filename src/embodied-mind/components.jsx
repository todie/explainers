/**
 * Reusable card/row components for the embodied-mind explainer. Extracted
 * from the original App.jsx so the same pieces can be imported into
 * content.mdx (MDX form) alongside Markdown prose.
 *
 * Nothing here is embodied-mind-specific apart from the color palette —
 * future MDX explainers can copy this file or import select components.
 */

export function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${color}06 100%)`,
      border: `1px solid ${color}25`,
      borderRadius: 14,
      padding: '20px 20px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.5,
      }} />
      <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: 'var(--mono, monospace)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: '#4b5563', marginTop: 6, lineHeight: 1.4 }}>{sub}</div>
    </div>
  )
}

export function HeroStatsGrid({ stats }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 12,
      margin: '24px 0 40px',
      listStyle: 'none',
    }}>
      {stats.map(s => <StatCard key={s.label} {...s} />)}
    </div>
  )
}

export function FramingCard({ position }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #0b1220 0%, ${position.color}08 100%)`,
      border: `1px solid ${position.color}30`,
      borderRadius: 14,
      padding: '24px 28px',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: position.color,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
      }}>
        {position.label}
      </div>
      <div style={{
        fontSize: 17, fontWeight: 700, color: '#e5e7eb',
        fontStyle: 'italic', marginBottom: 14, lineHeight: 1.4,
      }}>
        {position.quote}
      </div>
      <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: '0 0 14px 0' }}>
        {position.body}
      </p>
      <div style={{
        paddingTop: 12,
        borderTop: `1px solid ${position.color}20`,
        fontSize: 12, color: position.color, fontWeight: 600, lineHeight: 1.6,
      }}>
        Why it fails → <span style={{ color: '#e5e7eb', fontWeight: 400 }}>{position.failure}</span>
      </div>
    </div>
  )
}

export function FramingGrid({ positions }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 16,
      margin: '24px 0 24px',
      listStyle: 'none',
    }}>
      {positions.map(p => <FramingCard key={p.label} position={p} />)}
    </div>
  )
}

export function Callout({ color = '#f87171', label = 'Note', children }) {
  return (
    <div style={{
      padding: '24px 28px',
      background: `${color}0a`,
      border: `1px solid ${color}30`,
      borderRadius: 14,
      margin: '24px 0',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  )
}

export function FindingCard({ f }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${f.color}06 100%)`,
      border: `1px solid ${f.color}25`,
      borderRadius: 14,
      padding: '24px 28px',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: f.color,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
      }}>
        Finding
      </div>
      <h3 style={{
        fontSize: 19, fontWeight: 800, color: '#e5e7eb',
        letterSpacing: '-0.01em', margin: '0 0 12px 0', lineHeight: 1.3,
      }}>
        {f.title}
      </h3>
      <p style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.75, margin: '0 0 12px 0' }}>
        {f.body}
      </p>
      <div style={{
        fontSize: 10, color: '#4b5563', fontFamily: 'var(--mono, monospace)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        refs: {f.citations.join(', ')}
      </div>
    </div>
  )
}

export function FindingList({ findings }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      margin: '24px 0',
      listStyle: 'none',
    }}>
      {findings.map(f => <FindingCard key={f.id} f={f} />)}
    </div>
  )
}

export function TenetCard({ t }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${t.color}06 100%)`,
      border: `1px solid ${t.color}25`,
      borderRadius: 14,
      padding: '22px 24px',
    }}>
      <div style={{
        fontSize: 13, fontWeight: 800, color: t.color,
        marginBottom: 10, letterSpacing: '-0.01em',
      }}>
        {t.label}
      </div>
      <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
        {t.body}
      </p>
    </div>
  )
}

export function TenetGrid({ tenets }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
      margin: '24px 0',
      listStyle: 'none',
    }}>
      {tenets.map(t => <TenetCard key={t.label} t={t} />)}
    </div>
  )
}

export function EvidenceRow({ e }) {
  return (
    <div
      className="evidence-row"
      style={{
        background: '#0b1220',
        border: `1px solid ${e.color}22`,
        borderRadius: 10,
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: 20,
        alignItems: 'start',
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: e.color, letterSpacing: '-0.01em', marginBottom: 4 }}>
          {e.label}
        </div>
        <div style={{
          fontSize: 10, color: '#6b7280', fontFamily: 'var(--mono, monospace)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {e.strand}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: '0 0 8px 0' }}>
          {e.finding}
        </p>
        <div style={{
          fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono, monospace)',
        }}>
          {e.ref}
        </div>
      </div>
    </div>
  )
}

export function EvidenceList({ items }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      margin: '24px 0',
      listStyle: 'none',
    }}>
      {items.map(e => <EvidenceRow key={e.id} e={e} />)}
      <style>{`
        @media (max-width: 700px) {
          .evidence-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export function PracticalGrid({ items }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 16,
      margin: '24px 0',
      listStyle: 'none',
    }}>
      {items.map(p => (
        <div key={p.label} style={{
          background: `linear-gradient(135deg, #111827 0%, ${p.color}06 100%)`,
          border: `1px solid ${p.color}25`,
          borderRadius: 14,
          padding: '22px 24px',
        }}>
          <div style={{
            fontSize: 13, fontWeight: 800, color: p.color,
            marginBottom: 14, letterSpacing: '-0.01em',
          }}>
            {p.label}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {p.items.map((item, i) => (
              <li key={i} style={{
                fontSize: 13, color: '#d1d5db', lineHeight: 1.65, paddingLeft: 16, position: 'relative',
              }}>
                <span style={{ position: 'absolute', left: 0, color: p.color }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SourceList({ sources }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      margin: '16px 0 24px',
      listStyle: 'none',
    }}>
      {sources.map(s => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#0b1220',
            border: '1px solid #1f2937',
            borderRadius: 10,
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          <div style={{ fontSize: 12, color: '#f87171', fontWeight: 600, marginBottom: 3 }}>
            {s.label}
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>
            {s.note}
          </div>
        </a>
      ))}
    </div>
  )
}
