// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version used rounded cards with colored left-border accents,
// gradient borders, and colored title text. This version keeps the
// semantic green/red split (it IS load-bearing — the color encodes the
// advantages/failure-modes binary per .impeccable.md's "semantic color
// when it does work" rule) but restrains it to small-caps column headers
// and hairline separators. No rounded boxes, no gradient backgrounds.

import { PROS_CONS } from '../data/gestaltCognition'

const smallCaps = {
  fontSize: 10, fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 14, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

function ItemList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((p, i) => {
        const isLast = i === items.length - 1
        return (
          <div
            key={p.id}
            style={{
              paddingBottom: isLast ? 0 : 24,
              marginBottom: isLast ? 0 : 24,
              borderBottom: isLast ? 'none' : '1px solid #1f2937',
            }}
          >
            <h4 style={{
              fontSize: 15, fontWeight: 700, color: '#f9fafb',
              margin: '0 0 8px 0', lineHeight: 1.35,
            }}>
              {p.title}
            </h4>
            <p style={body}>{p.description}</p>
            {p.domains && p.domains.length > 0 && (
              <p style={{
                fontSize: 11, color: '#6b7280', marginTop: 10, margin: '10px 0 0 0',
                fontFamily: 'var(--mono, monospace)', letterSpacing: '0.04em',
              }}>
                {p.domains.join(' · ')}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ProsCons() {
  const pros = PROS_CONS.filter(p => p.type === 'pro')
  const cons = PROS_CONS.filter(p => p.type === 'con')

  return (
    <section>
      <header style={{ marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          Advantages &amp; Failure Modes
        </h2>
        <p style={{ ...body, fontSize: 15, color: '#9ca3af' }}>
          Gestalt cognition is powerful but not infallible. Knowing the failure
          modes is as important as knowing the strengths.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48,
      }}>
        <div>
          <div style={{
            ...smallCaps, color: '#4ade80', marginBottom: 18,
            paddingBottom: 10, borderBottom: '1px solid #4ade8033',
          }}>
            Advantages
          </div>
          <ItemList items={pros} />
        </div>
        <div>
          <div style={{
            ...smallCaps, color: '#f87171', marginBottom: 18,
            paddingBottom: 10, borderBottom: '1px solid #f8717133',
          }}>
            Failure Modes
          </div>
          <ItemList items={cons} />
        </div>
      </div>
    </section>
  )
}
