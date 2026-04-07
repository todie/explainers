// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version: per-domain colored pill (blue PHYSICS, green CHEMISTRY,
// etc.), click-to-expand rounded cards, gradient-on-active backgrounds,
// colored left-border accents, colored blockquote tints. "Filter UI on an
// essay" — dashboard not article. This version inlines every example,
// uses typography-only hierarchy, puts the domain in small-caps before the
// title instead of in a colored chip, and formats the quote as a plain
// distill-style blockquote with a hairline rule.

import { EXAMPLES } from '../data/gestaltCognition'

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 15, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

export default function Examples() {
  return (
    <section>
      <header style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          Gestalt in the Wild
        </h2>
        <p style={{ ...body, color: '#9ca3af' }}>
          Real cases where the whole arrived before the parts — from physics
          to chess to emergency medicine.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {EXAMPLES.map((ex, i) => {
          const isLast = i === EXAMPLES.length - 1
          return (
            <article
              key={ex.id}
              style={{
                paddingBottom: isLast ? 0 : 40,
                marginBottom: isLast ? 0 : 40,
                borderBottom: isLast ? 'none' : '1px solid #1f2937',
              }}
            >
              <div style={{ ...smallCaps, marginBottom: 8 }}>
                {ex.domain} · Example {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontSize: 19, fontWeight: 700, color: '#f9fafb',
                letterSpacing: '-0.01em', margin: '0 0 14px 0', lineHeight: 1.3,
              }}>
                {ex.title}
              </h3>
              <p style={{ ...body, marginBottom: ex.quote ? 20 : 16 }}>
                {ex.description}
              </p>

              {ex.quote && (
                <blockquote style={{
                  margin: '0 0 20px 0', padding: '2px 0 2px 20px',
                  borderLeft: '2px solid #374151',
                }}>
                  <p style={{ ...body, fontStyle: 'italic', color: '#9ca3af' }}>
                    "{ex.quote}"
                  </p>
                  {ex.quoteAttribution && (
                    <p style={{
                      fontSize: 12, color: '#6b7280', marginTop: 8, margin: '8px 0 0 0',
                    }}>
                      — {ex.quoteAttribution}
                    </p>
                  )}
                </blockquote>
              )}

              <div style={{ marginBottom: 14 }}>
                <div style={{ ...smallCaps, marginBottom: 6 }}>Mechanism</div>
                <p style={{ ...body, fontSize: 14, color: '#9ca3af' }}>{ex.mechanism}</p>
              </div>

              <a
                href={ex.source.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12, color: '#a855f7', textDecoration: 'none',
                  borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
                  paddingBottom: 1,
                }}
              >
                {ex.source.label}{ex.source.year ? ` (${ex.source.year})` : ''} →
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
