import TableOfContents from '../shared/TableOfContents'
import {
  SECTIONS,
  HERO_STATS,
  FRAMINGS,
  FINDINGS,
  MODEL,
  EVIDENCE,
  PRACTICAL,
  SOURCES,
} from './data'

const ACCENT = '#f87171'

function StatCard({ label, value, sub, color }) {
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

function FramingCard({ position }) {
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

function FindingCard({ f }) {
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
        letterSpacing: '-0.01em', marginBottom: 12, lineHeight: 1.3,
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

function TenetCard({ t }) {
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

function EvidenceRow({ e }) {
  return (
    <div style={{
      background: '#0b1220',
      border: `1px solid ${e.color}22`,
      borderRadius: 10,
      padding: '14px 18px',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 20,
      alignItems: 'start',
    }}
    className="evidence-row">
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

export default function EmbodiedMindApp() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0308 0%, #030712 15%, #030712 100%)' }}>
      <TableOfContents sections={SECTIONS} accent={ACCENT} />

      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 560, height: 360,
          background: 'radial-gradient(ellipse, rgba(248, 113, 113, 0.08) 0%, rgba(236, 72, 153, 0.05) 40%, transparent 70%)',
          pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.18)',
            fontSize: 12, color: ACCENT, fontFamily: 'var(--mono, monospace)',
            letterSpacing: '0.04em', marginBottom: 20,
          }}>
            Neuroscience · Phenomenology · Evidence
          </div>

          <h1 style={{
            fontSize: 'clamp(30px, 6vw, 52px)', fontWeight: 800, lineHeight: 1.08, marginBottom: 18,
            background: 'linear-gradient(135deg, #f87171 0%, #fb923c 40%, #ec4899 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            The Body Is Not A Vessel
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#9ca3af',
            maxWidth: 720, margin: '0 auto', lineHeight: 1.7,
          }}>
            Also: the mind is not a chip. Both framings are still dualism. A short tour of the evidence
            that mind and body are not two systems with a relationship — they are one system at two
            levels of description.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12, marginTop: -28, position: 'relative', zIndex: 2,
        }}>
          {HERO_STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* The Question — two framings */}
        <div id="framings" style={{ scrollMarginTop: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
              The question
            </h2>
            <p style={{ fontSize: 14, color: '#9ca3af', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              {FRAMINGS.intro}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 24 }}>
            {FRAMINGS.positions.map(p => <FramingCard key={p.label} position={p} />)}
          </div>

          <div style={{
            padding: '24px 28px',
            background: 'rgba(248, 113, 113, 0.04)',
            border: '1px solid rgba(248, 113, 113, 0.18)',
            borderRadius: 14,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: ACCENT,
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
            }}>
              The structural error
            </div>
            <p style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.75, margin: 0 }}>
              {FRAMINGS.punchline}
            </p>
          </div>
        </div>

        {/* Findings */}
        <div id="findings" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 8 }}>
            Four findings
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', maxWidth: 620, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Each of these is a research program spanning decades, not a single paper. Any one of them would
            be enough to falsify strict dualism. Together, the picture is decisive.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FINDINGS.map(f => <FindingCard key={f.id} f={f} />)}
          </div>
        </div>

        {/* Model */}
        <div id="model" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 10 }}>
            What replaces dualism
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', maxWidth: 640, margin: '0 auto 28px', lineHeight: 1.7 }}>
            {MODEL.intro}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
            {MODEL.tenets.map(t => <TenetCard key={t.label} t={t} />)}
          </div>

          <div style={{
            padding: '24px 28px',
            background: 'rgba(236, 72, 153, 0.04)',
            border: '1px solid rgba(236, 72, 153, 0.18)',
            borderRadius: 14,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#ec4899',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
            }}>
              Conclusion
            </div>
            <p style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.75, margin: 0 }}>
              {MODEL.conclusion}
            </p>
          </div>
        </div>

        {/* Evidence */}
        <div id="evidence" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 8 }}>
            Evidence lines
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', maxWidth: 620, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Specific studies and cases. Not a complete survey — eight rows that each, in their own way,
            would have embarrassed Descartes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EVIDENCE.map(e => <EvidenceRow key={e.id} e={e} />)}
          </div>
        </div>

        {/* Practical */}
        <div id="practical" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#e5e7eb', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 28 }}>
            So what
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {PRACTICAL.map(p => (
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
        </div>

        {/* Sources */}
        <div id="sources" style={{ scrollMarginTop: 60 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>
            Sources
          </h2>
          <p style={{ fontSize: 12, color: '#4b5563', textAlign: 'center', maxWidth: 580, margin: '0 auto 20px', lineHeight: 1.7 }}>
            Canonical references. Books link to publishers / archive.org; journal papers link to the
            publisher version. Nothing here is cited on vibes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 760, margin: '0 auto' }}>
            {SOURCES.map(s => (
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
        </div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Written 2026-04-06 in response to a Threads exchange. Built by{' '}
            <a href="https://todie.io" style={{ color: '#f87171', textDecoration: 'none' }}>todie.io</a>.
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 700px) {
          .evidence-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
