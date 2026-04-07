import TableOfContents from '../shared/TableOfContents'
import {
  VARIANTS,
  RESULTS,
  HERO_STATS,
  FINDINGS,
  TWO_FORCES,
  PRACTICAL_TAKEAWAYS,
  METHODOLOGY,
  SOURCES,
  DOMAINS,
} from './data'

const SECTIONS = [
  { id: 'thesis', title: 'The Question', icon: '?' },
  { id: 'results', title: 'Results', icon: '#' },
  { id: 'findings', title: 'Findings', icon: '!' },
  { id: 'theory', title: 'The Two Forces', icon: '⚖\uFE0F' },
  { id: 'samples', title: 'Sample Prompts', icon: '"' },
  { id: 'practical', title: 'Practical', icon: '✓' },
  { id: 'method', title: 'Method', icon: 'M' },
]

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${color}06 100%)`,
      border: `1px solid ${color}20`,
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
      <div style={{ fontSize: 11, color: '#4b5563', marginTop: 6 }}>{sub}</div>
    </div>
  )
}

function ResultsBar({ row, controlMaxTok }) {
  // Width as proportion of the largest variant. Pirate sets the upper bound.
  const widthPctA = (row.tokA / controlMaxTok) * 100
  const widthPctB = (row.tokB / controlMaxTok) * 100

  // Color savings: green = saves, red = loses, gray = baseline
  const savingsColor = row.avg < -1 ? '#4ade80' : row.avg > 1 ? '#f87171' : '#9ca3af'
  const sign = row.avg >= 0 ? '+' : ''

  return (
    <div style={{
      background: '#0b1220',
      border: `1px solid ${row.color}25`,
      borderRadius: 10,
      padding: '14px 16px',
      display: 'grid',
      gridTemplateColumns: '180px 1fr 90px',
      alignItems: 'center',
      gap: 14,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: row.color, letterSpacing: '-0.01em' }}>
            {row.label}
          </span>
          {row.flag && (
            <span style={{
              fontSize: 9, fontWeight: 700, color: row.color,
              background: `${row.color}15`, border: `1px solid ${row.color}30`,
              borderRadius: 4, padding: '1px 6px',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {row.flag}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, color: '#6b7280', width: 18, fontFamily: 'var(--mono, monospace)' }}>A</span>
          <div style={{
            height: 8, background: row.color, opacity: 0.7, borderRadius: 4,
            width: `${widthPctA}%`, minWidth: 4,
          }} />
          <span style={{ fontSize: 11, fontFamily: 'var(--mono, monospace)', color: '#9ca3af' }}>
            {row.tokA}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, color: '#6b7280', width: 18, fontFamily: 'var(--mono, monospace)' }}>B</span>
          <div style={{
            height: 8, background: row.color, opacity: 0.4, borderRadius: 4,
            width: `${widthPctB}%`, minWidth: 4,
          }} />
          <span style={{ fontSize: 11, fontFamily: 'var(--mono, monospace)', color: '#9ca3af' }}>
            {row.tokB}
          </span>
        </div>
      </div>

      <div style={{
        fontSize: 14, fontWeight: 800, color: savingsColor,
        fontFamily: 'var(--mono, monospace)', textAlign: 'right',
      }}>
        {sign}{row.avg.toFixed(1)}%
      </div>
    </div>
  )
}

function FindingCard({ f }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #111827 0%, ${f.color}06 100%)`,
      border: `1px solid ${f.color}25`,
      borderRadius: 14,
      padding: '22px 24px',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: f.color,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
      }}>
        Finding
      </div>
      <h3 style={{
        fontSize: 18, fontWeight: 800, color: '#e5e7eb',
        letterSpacing: '-0.01em', marginBottom: 12, lineHeight: 1.3,
      }}>
        {f.title}
      </h3>
      <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
        {f.body}
      </p>
    </div>
  )
}

function SampleCard({ v }) {
  return (
    <div style={{
      background: '#0b1220',
      border: `1px solid ${v.color}20`,
      borderRadius: 10,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: v.color }}>{v.label}</span>
        <span style={{ fontSize: 11, fontFamily: 'var(--mono, monospace)', color: '#6b7280' }}>
          {v.tokA} tok (A)
        </span>
      </div>
      <p style={{
        fontSize: 12, color: '#9ca3af', lineHeight: 1.6, fontStyle: 'italic',
        margin: '0 0 8px 0',
      }}>
        "{v.sample}"
      </p>
      <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
        {v.blurb}
      </p>
    </div>
  )
}

export default function PidginTokensApp() {
  const controlMaxTok = Math.max(...VARIANTS.map(v => v.tokA))

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0408 0%, #030712 15%, #030712 100%)' }}>
      <TableOfContents sections={SECTIONS} accent="#facc15" />

      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 350,
          background: 'radial-gradient(ellipse, rgba(250, 204, 21, 0.06) 0%, rgba(248, 113, 113, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.15)',
            fontSize: 12, color: '#facc15', fontFamily: 'var(--mono, monospace)',
            letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Tokenizer Empiricism
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 35%, #f87171 75%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Pidgin Tokens
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280',
            maxWidth: 660, margin: '0 auto', lineHeight: 1.7,
          }}>
            Pirate vs. caveman vs. eight pidgins vs. terse English. We benchmarked eleven ways to write
            the same prompt against the actual Claude tokenizer. The winner is unsurprising. The losers
            and the smoking gun are not.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: -28, position: 'relative', zIndex: 2,
        }}>
          {HERO_STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Thesis */}
        <div id="thesis" style={{ scrollMarginTop: 60 }} />
        <div style={{
          maxWidth: 720, margin: '0 auto', padding: '28px 32px',
          background: 'rgba(250, 204, 21, 0.04)',
          border: '1px solid rgba(250, 204, 21, 0.15)',
          borderRadius: 16,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#facc15',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
          }}>
            The question
          </div>
          <div style={{ fontSize: 15, color: '#d1d5db', lineHeight: 1.8 }}>
            Talking to LLMs costs money per token. There's a folk belief that
            unconventional prompt styles — terse imperatives, foreign grammars, contact languages —
            might encode meaning more cheaply than standard English. We took one short request,
            rewrote it eleven ways, and counted the actual tokens. The result is a clean falsification
            of two intuitions and a clean validation of one. <strong style={{ color: '#facc15' }}>The
            tokenizer doesn't care how clever you sound. It cares about byte-level vocabulary
            overlap with its training distribution.</strong>
          </div>
        </div>

        {/* Results table */}
        <div id="results" style={{ scrollMarginTop: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', margin: '0 0 6px 0' }}>
              Results — 11 styles × 2 domains
            </h2>
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
              Sorted by average savings vs the verbose English control. Lower bar = fewer tokens = cheaper.
              <br />
              <span style={{ fontFamily: 'var(--mono, monospace)' }}>A</span> = technical debugging request,{' '}
              <span style={{ fontFamily: 'var(--mono, monospace)' }}>B</span> = prose explanation request.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RESULTS.map(row => (
              <ResultsBar key={row.id} row={row} controlMaxTok={controlMaxTok} />
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: '12px 16px', fontSize: 11, color: '#6b7280',
            background: '#0b1220', border: '1px solid #1f2937', borderRadius: 8, textAlign: 'center',
          }}>
            Counts via Anthropic's <code style={{ color: '#facc15' }}>/v1/messages/count_tokens</code> endpoint.
            Exact tokens, not estimates. Same underlying meaning across all 11 variants.
          </div>
        </div>

        {/* Findings */}
        <div id="findings" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 24 }}>
            Four findings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FINDINGS.map(f => <FindingCard key={f.id} f={f} />)}
          </div>
        </div>

        {/* Theory */}
        <div id="theory" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 8 }}>
            The two forces
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', maxWidth: 600, margin: '0 auto 24px' }}>
            {TWO_FORCES.intro}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TWO_FORCES.forces.map(force => (
              <div key={force.label} style={{
                background: `linear-gradient(135deg, #111827 0%, ${force.color}06 100%)`,
                border: `1px solid ${force.color}25`,
                borderRadius: 14,
                padding: '22px 24px',
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: force.color,
                  marginBottom: 10, letterSpacing: '-0.01em',
                }}>
                  {force.label}
                </div>
                <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
                  {force.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: '20px 24px',
            background: 'rgba(250, 204, 21, 0.04)',
            border: '1px solid rgba(250, 204, 21, 0.15)',
            borderRadius: 14,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#facc15',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
            }}>
              Conclusion
            </div>
            <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
              {TWO_FORCES.conclusion}
            </p>
          </div>
        </div>

        {/* Sample prompts */}
        <div id="samples" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 8 }}>
            What each variant looks like
          </h2>
          <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 24 }}>
            All eleven framings of the same request (Domain A — technical debugging)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {VARIANTS.map(v => <SampleCard key={v.id} v={v} />)}
          </div>
        </div>

        {/* Practical takeaways */}
        <div id="practical" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 24 }}>
            Practical takeaways
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {PRACTICAL_TAKEAWAYS.map(t => (
              <div key={t.label} style={{
                background: `linear-gradient(135deg, #111827 0%, ${t.color}06 100%)`,
                border: `1px solid ${t.color}25`,
                borderRadius: 14,
                padding: '22px 24px',
              }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, color: t.color,
                  marginBottom: 12, letterSpacing: '-0.01em',
                }}>
                  {t.label}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.items.map((item, i) => (
                    <li key={i} style={{
                      fontSize: 13, color: '#d1d5db', lineHeight: 1.6, paddingLeft: 16, position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: t.color }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div id="method" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 24 }}>
            Method & caveats
          </h2>

          <div style={{
            background: '#0b1220', border: '1px solid #1f2937', borderRadius: 14,
            padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Tokenizer
              </div>
              <div style={{ fontSize: 13, color: '#d1d5db' }}>{METHODOLOGY.api}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Model
              </div>
              <div style={{ fontSize: 13, color: '#d1d5db', fontFamily: 'var(--mono, monospace)' }}>{METHODOLOGY.model}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Date
              </div>
              <div style={{ fontSize: 13, color: '#d1d5db', fontFamily: 'var(--mono, monospace)' }}>{METHODOLOGY.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Runs
              </div>
              <div style={{ fontSize: 13, color: '#d1d5db' }}>{METHODOLOGY.runs}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>
                Domains
              </div>
              <div style={{ fontSize: 13, color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DOMAINS.map(d => (
                  <div key={d.id}>
                    <strong style={{ color: '#facc15' }}>{d.label}.</strong> {d.description}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
                Caveats
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {METHODOLOGY.caveats.map((c, i) => (
                  <li key={i} style={{
                    fontSize: 12, color: '#9ca3af', lineHeight: 1.6,
                    paddingLeft: 14, position: 'relative',
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: '#f87171' }}>›</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>
            Sources
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 720, margin: '0 auto' }}>
            {SOURCES.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#0b1220', border: '1px solid #1f2937', borderRadius: 10,
                  padding: '12px 16px', textDecoration: 'none', display: 'block',
                }}
              >
                <div style={{ fontSize: 12, color: '#60a5fa', fontWeight: 600 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, lineHeight: 1.5 }}>
                  {s.note}
                </div>
              </a>
            ))}
          </div>
        </div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Two benchmark runs against{' '}
            <a href="https://docs.claude.com/en/api/messages-count-tokens" style={{ color: '#facc15', textDecoration: 'none' }}>
              Anthropic's count_tokens endpoint
            </a>
            . Built by{' '}
            <a href="https://todie.io" style={{ color: '#60a5fa', textDecoration: 'none' }}>todie.io</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
