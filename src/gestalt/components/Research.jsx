// Rewritten 2026-04-06 against .impeccable.md "clean/academic, not gamified".
//
// Previous version had six collapsible colored "category" cards, each
// containing a rounded inner card per paper with a colored title, a
// coloured "View paper ↗" link, and a coloured caveat box. This is now
// a proper bibliography: plain numbered entries, citations in standard
// academic form, a small 'View paper ↗' link per item, caveats inline.
// All content visible on load. Semantic color is gone entirely — the
// paper's own prestige does the work.

const CATEGORIES = [
  {
    id: 'inner-experience',
    title: 'Inner Experience & Unsymbolized Thinking',
    description: 'Empirical evidence that not all thinking occurs in words, images, or symbols.',
    papers: [
      {
        authors: 'Hurlburt, R. T. & Akhter, S. A.',
        year: 2008,
        title: 'Unsymbolized Thinking',
        journal: 'Consciousness and Cognition, 17(4), 1364\u20131374',
        summary: 'Using Descriptive Experience Sampling (DES), Hurlburt demonstrated that roughly 22% of randomly sampled moments of inner experience contain "unsymbolized thinking" \u2014 thoughts with clear, differentiated content but no words, images, or any other symbols carrying that content. This is the empirical foundation for the claim that gestalt-mode cognition is not metaphorical: some people literally think without any representational medium.',
        link: 'https://hurlburt.faculty.unlv.edu/hurlburt-akhter-2008.pdf',
      },
      {
        authors: 'Heavey, C. L. & Hurlburt, R. T.',
        year: 2008,
        title: 'The Phenomena of Inner Experience',
        journal: 'Consciousness and Cognition, 17(3), 798\u2013810',
        summary: 'Catalogued the five most frequent features of inner experience: inner speech, inner seeing, unsymbolized thinking, feelings, and sensory awareness. Crucially, the frequency of each varies enormously across individuals \u2014 some people almost never experience inner speech, while others rarely experience anything else. This validates the premise that thinking modalities are not universal but architecturally different across people.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/S1053810008000032',
      },
    ],
  },
  {
    id: 'original-gestalt',
    title: 'Original Gestalt Psychology',
    description: 'The Berlin school foundations: perception, insight (Einsicht), and productive thinking.',
    papers: [
      {
        authors: 'Wertheimer, M.',
        year: 1923,
        title: 'Untersuchungen zur Lehre von der Gestalt II (Laws of Organization in Perceptual Forms)',
        journal: 'Psychologische Forschung, 4, 301\u2013350',
        summary: 'The founding paper of Gestalt perceptual psychology. Wertheimer identified the laws of proximity, similarity, closure, continuity, and common fate \u2014 demonstrating that perception is not built from atomic sensations but organized by the mind into structured wholes. The perceiver does not assemble a scene from parts; the whole configuration arrives first.',
        link: 'https://psychclassics.yorku.ca/Wertheimer/Forms/forms.htm',
      },
      {
        authors: 'Koffka, K.',
        year: 1935,
        title: 'Principles of Gestalt Psychology',
        journal: 'Harcourt, Brace & World',
        summary: 'The comprehensive theoretical treatise of the Gestalt school. Koffka formalized the principle that "the whole is different from the sum of its parts" (often misquoted as "greater than") and extended Gestalt principles from perception to memory and learning. Established the concept of functional wholes \u2014 that the properties of any part are determined by the intrinsic structural laws of the whole.',
        link: 'https://archive.org/details/in.ernet.dli.2015.7888',
      },
      {
        authors: 'K\u00f6hler, W.',
        year: 1925,
        title: 'The Mentality of Apes (Intelligenzpr\u00fcfungen an Menschenaffen, 1917)',
        journal: 'Harcourt, Brace & Company (English translation)',
        summary: 'K\u00f6hler\'s famous experiments with the chimpanzee Sultan demonstrated insight learning (Einsicht) \u2014 problem solutions that arrive suddenly and completely after a period of apparent inactivity, not through incremental trial and error. Sultan\'s joining of two sticks to reach bananas was the first experimental demonstration that cognition can reorganize a problem space all at once, producing the "aha" moment as a primary rather than incidental cognitive event.',
        link: 'https://en.wikipedia.org/wiki/The_Mentality_of_Apes',
      },
      {
        authors: 'Wertheimer, M.',
        year: 1945,
        title: 'Productive Thinking',
        journal: 'Harper & Brothers (posthumous)',
        summary: 'Wertheimer distinguished between reproductive thinking (rote, habitual) and productive thinking (insight-based). Productive thinking involves perceiving the structural requirements of a problem \u2014 seeing where the tensions and gaps are \u2014 and reorganizing the elements until the whole resolves. Included case studies from geometric proofs to Einstein\'s development of relativity, all analyzed as gestalt restructuring events.',
        link: 'https://psycnet.apa.org/record/1946-01036-000',
      },
      {
        authors: 'Duncker, K.',
        year: 1945,
        title: 'On Problem-Solving (Zur Psychologie des produktiven Denkens, 1935)',
        journal: 'Psychological Monographs, 58(5), i\u2013113',
        summary: 'Introduced the concept of functional fixedness \u2014 the inability to see an object beyond its typical use \u2014 as a failure of gestalt restructuring. The famous "candle problem" showed that insight requires perceiving a new configuration of the same elements: the box is not a container for tacks, it is a shelf. The solution is a perceptual reorganization, not a logical deduction.',
        link: 'https://en.wikipedia.org/wiki/Functional_fixedness',
      },
    ],
  },
  {
    id: 'chess-expertise',
    title: 'Chess, Chunking & Expert Perception',
    description: 'How experts perceive whole configurations where novices see individual pieces.',
    papers: [
      {
        authors: 'de Groot, A. D.',
        year: 1965,
        title: 'Thought and Choice in Chess',
        journal: 'Mouton (2nd ed.; original Dutch edition 1946)',
        summary: 'De Groot showed that chess grandmasters could reproduce entire board positions after viewing them for just five seconds, while novices could not. Critically, the masters were not calculating \u2014 they were perceiving. They grasped the position as a meaningful whole in a single perceptual act: the relative tensions, the structural weaknesses, the likely continuations. This is gestalt perception applied to expertise.',
        link: 'https://www.researchgate.net/publication/332863064_Thought_and_choice_in_chess',
      },
      {
        authors: 'Chase, W. G. & Simon, H. A.',
        year: 1973,
        title: 'Perception in Chess',
        journal: 'Cognitive Psychology, 4(1), 55\u201381',
        summary: 'Extended de Groot\'s work by demonstrating that expert chess perception operates through "chunks" \u2014 familiar configurations of pieces stored as single units in memory. Masters don\'t remember more pieces; they perceive fewer, larger structures. With randomized (non-game) positions, the master advantage disappeared, proving the superiority was perceptual-structural, not memorial. Expertise is the accumulation of meaningful gestalts.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/0010028573900042',
      },
    ],
  },
  {
    id: 'verbal-overshadowing',
    title: 'Verbal Overshadowing',
    description: 'Evidence that putting things into words can actively degrade non-verbal perception.',
    papers: [
      {
        authors: 'Schooler, J. W. & Engstler-Schooler, T. Y.',
        year: 1990,
        title: 'Verbal Overshadowing of Visual Memories: Some Things Are Better Left Unsaid',
        journal: 'Cognitive Psychology, 22(1), 36\u201371',
        summary: 'Participants who verbally described a previously seen face performed significantly worse on a subsequent recognition test than those who did not describe it. The act of translating a holistic visual memory into sequential verbal descriptors actively degraded the original percept. This is the core mechanism behind the gestalt thinker\'s translation tax: forcing a whole-configuration perception into words doesn\'t just lose information \u2014 it damages the original.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/001002859090003M',
      },
      {
        authors: 'Schooler, J. W., Ohlsson, S. & Brooks, K.',
        year: 1993,
        title: 'Thoughts Beyond Words: When Language Overshadows Insight',
        journal: 'Journal of Experimental Psychology: General, 122(2), 166\u2013183',
        summary: 'Extended verbal overshadowing from perception to problem-solving. Participants asked to verbalize their strategies while solving insight problems performed significantly worse than controls \u2014 but verbalization had no effect on non-insight (analytical) problems. This demonstrates that insight and analysis are genuinely different cognitive processes, and that the verbal channel can actively interfere with the non-verbal restructuring that insight requires.',
        link: 'https://psycnet.apa.org/record/1993-36184-001',
      },
    ],
  },
  {
    id: 'intuition-knowing',
    title: 'Intuition & the Feeling of Knowing',
    description: 'The capacity to detect coherence before being able to articulate what was detected.',
    papers: [
      {
        authors: 'Bowers, K. S., Regehr, G., Balthazard, C. & Parker, K.',
        year: 1990,
        title: 'Intuition in the Context of Discovery',
        journal: 'Cognitive Psychology, 22(1), 72\u2013110',
        summary: 'Demonstrated that people can respond discriminatively to coherence they cannot yet identify. Using word-triad and gestalt-closure tasks, participants reliably detected which stimuli "hung together" before they could say why. This tacit perception of coherence gradually guided them toward an explicit hypothesis. The feeling of knowing precedes the knowledge itself \u2014 the gestalt is perceived before it can be named.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/001002859090004N',
      },
      {
        authors: 'Bolte, A. & Goschke, T.',
        year: 2005,
        title: 'On the Speed of Intuition: Intuitive Judgments of Semantic Coherence Under Different Response Deadlines',
        journal: 'Memory & Cognition, 33(7), 1248\u20131255',
        summary: 'Participants could discriminate coherent from incoherent word triads reliably better than chance even with response deadlines as short as 1.5 seconds \u2014 far too fast for conscious deliberation. Intuitive coherence detection operates before and independently of analytical processing. This is the speed signature of gestalt perception: the whole is apprehended before the parts can be enumerated.',
        link: 'https://link.springer.com/article/10.3758/BF03193226',
      },
    ],
  },
  {
    id: 'neuroscience',
    title: 'Neuroscience of Holistic vs. Analytic Processing',
    description: 'Brain-level evidence for distinct global and local processing systems.',
    papers: [
      {
        authors: 'Navon, D.',
        year: 1977,
        title: 'Forest Before Trees: The Precedence of Global Features in Visual Perception',
        journal: 'Cognitive Psychology, 9(3), 353\u2013383',
        summary: 'Using hierarchical letter stimuli (a large "H" made of small "S"s), Navon demonstrated global precedence: people identify the large letter faster than the small ones, and conflicting global information interferes with local processing but not the reverse. The perceptual system defaults to whole-first processing. This is the laboratory analog of what gestalt thinkers describe experientially \u2014 the shape of the whole arrives before the details.',
        link: 'https://www.sciencedirect.com/science/article/abs/pii/0010028577900123',
      },
      {
        authors: 'Volz, K. G. & von Cramon, D. Y.',
        year: 2006,
        title: 'What Neuroscience Can Tell about Intuitive Processes in the Context of Perceptual Discovery',
        journal: 'Journal of Cognitive Neuroscience, 18(12), 2077\u20132087',
        summary: 'Using fMRI during a modified Gestalt Closure Task, the researchers found that the left orbitofrontal cortex activates specifically when participants perceive coherence in incomplete stimuli \u2014 before they can identify what the stimulus is. The brain has a dedicated mechanism for detecting "this hangs together" that operates prior to and independently of explicit object recognition. Gestalt perception has a neural signature.',
        link: 'https://direct.mit.edu/jocn/article-abstract/18/12/2077/4254/',
      },
      {
        authors: 'Dijksterhuis, A. & Nordgren, L. F.',
        year: 2006,
        title: 'A Theory of Unconscious Thought',
        journal: 'Perspectives on Psychological Science, 1(2), 95\u2013109',
        summary: 'Proposed that unconscious thought outperforms conscious deliberation for complex decisions involving many variables. Conscious thought is constrained by working memory limits and uses schema-driven shortcuts; unconscious processing integrates information bottom-up without those bottlenecks. While the theory\'s replication record is mixed, it articulates the mechanism by which gestalt-mode processing could handle more relational complexity than verbal-analytical processing.',
        link: 'https://journals.sagepub.com/doi/10.1111/j.1745-6916.2006.00007.x',
        caveat: 'Replication attempts have produced mixed results. The theoretical framework remains influential even as specific experimental claims are debated.',
      },
    ],
  },
]

const smallCaps = {
  fontSize: 10, fontWeight: 700, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.12em',
  fontFamily: 'var(--mono, monospace)',
}
const body = { fontSize: 14, color: '#d1d5db', lineHeight: 1.75, margin: 0 }

// --- Figure 9: research timeline ------------------------------------
//
// Shows the century of convergent evidence at a glance. Each dot is a
// paper from the bibliography below, plotted on a horizontal time axis
// with a short label. The gestalt hypothesis is not one finding; it's
// the same finding, replicated from 1923 to 2008.
const TIMELINE = [
  { year: 1923, author: 'Wertheimer',   label: 'Laws of organization' },
  { year: 1925, author: 'Köhler',       label: 'Insight in apes' },
  { year: 1935, author: 'Koffka',       label: 'Principles' },
  { year: 1945, author: 'Duncker',      label: 'Functional fixedness' },
  { year: 1965, author: 'de Groot',     label: 'Chess perception' },
  { year: 1973, author: 'Chase & Simon', label: 'Chunking' },
  { year: 1977, author: 'Navon',        label: 'Global precedence' },
  { year: 1990, author: 'Schooler',     label: 'Verbal overshadowing' },
  { year: 1990, author: 'Bowers',       label: 'Intuitive coherence' },
  { year: 2005, author: 'Bolte',        label: 'Intuition speed' },
  { year: 2006, author: 'Volz',         label: 'Orbitofrontal activation' },
  { year: 2008, author: 'Hurlburt',     label: 'Unsymbolized thinking' },
]

function TimelineFigure() {
  // viewBox 620 × 260
  const axisLeft = 50
  const axisRight = 580
  const axisY = 170
  const minYear = 1920
  const maxYear = 2010
  const toX = (year) => axisLeft + ((year - minYear) / (maxYear - minYear)) * (axisRight - axisLeft)

  // Stagger labels vertically so they don't collide when years are close
  const labelRows = []
  TIMELINE.forEach((item, i) => {
    // try to place at row 0, then 1, 2 — skip a row if there's a collision
    // in x within 48px in that row
    const itemX = toX(item.year)
    let row = 0
    while (labelRows.some(l => l.row === row && Math.abs(l.x - itemX) < 56)) {
      row += 1
    }
    labelRows.push({ ...item, row, x: itemX, i })
  })

  return (
    <svg viewBox="0 0 620 260" width="100%" style={{ maxWidth: 680, display: 'block', margin: '0 auto' }} role="img" aria-label="Figure 9: research timeline, 1923 to 2008">
      {/* Main axis */}
      <line x1={axisLeft} y1={axisY} x2={axisRight} y2={axisY} stroke="#4b5563" strokeWidth="1.25" />

      {/* Decade ticks */}
      {[1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010].map(year => (
        <g key={year}>
          <line
            x1={toX(year)} y1={axisY}
            x2={toX(year)} y2={axisY + 5}
            stroke="#4b5563" strokeWidth="1"
          />
          <text
            x={toX(year)} y={axisY + 20}
            fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)"
            textAnchor="middle"
          >{year}</text>
        </g>
      ))}

      {/* Data points + stem lines + labels (labels go above the axis) */}
      {labelRows.map(item => {
        const stemTop = axisY - 18 - item.row * 36
        return (
          <g key={`${item.year}-${item.author}`}>
            {/* Stem line from dot up to label */}
            <line
              x1={item.x} y1={axisY}
              x2={item.x} y2={stemTop + 4}
              stroke="#374151" strokeWidth="0.9"
            />
            {/* Dot on the axis */}
            <circle cx={item.x} cy={axisY} r="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
            {/* Author + label */}
            <text x={item.x} y={stemTop - 2} fill="#f9fafb" fontSize="11" fontWeight={600} textAnchor="middle">
              {item.author}
            </text>
            <text x={item.x} y={stemTop + 11} fill="#9ca3af" fontSize="10" textAnchor="middle">
              {item.label}
            </text>
          </g>
        )
      })}

      {/* Axis caption */}
      <text
        x={(axisLeft + axisRight) / 2} y={244}
        fill="#9ca3af" fontSize="11" textAnchor="middle"
        textTransform="uppercase" letterSpacing="0.08em"
      >
        A century of convergent evidence
      </text>
    </svg>
  )
}

// --- Figure 10: Hurlburt DES frequencies ----------------------------
//
// From Heavey & Hurlburt (2008), using Descriptive Experience Sampling
// to measure how often each of five features appears in random moments
// of inner experience. Unsymbolized thinking is highlighted because
// it's the empirical foundation for this entire explainer.
const DES_ROWS = [
  { label: 'Inner speech',          pct: 26 },
  { label: 'Inner seeing',          pct: 34 },
  { label: 'Unsymbolized thinking', pct: 22, highlight: true },
  { label: 'Feelings',              pct: 26 },
  { label: 'Sensory awareness',     pct: 22 },
]

function DESFigure() {
  // viewBox 560 × 240
  const rowHeight = 30
  const rowGap = 8
  const labelCol = 140
  const barLeft = labelCol + 16
  const barMax = 380  // max bar width
  const top = 24

  return (
    <svg viewBox="0 0 560 220" width="100%" style={{ maxWidth: 560, display: 'block', margin: '0 auto' }} role="img" aria-label="Figure 10: frequency of five inner-experience types">
      {DES_ROWS.map((row, i) => {
        const y = top + i * (rowHeight + rowGap)
        const w = (row.pct / 40) * barMax  // scale so 40% = full width
        const isHighlight = row.highlight
        return (
          <g key={row.label}>
            {/* Label */}
            <text
              x={labelCol} y={y + rowHeight / 2 + 4}
              fill={isHighlight ? '#f9fafb' : '#9ca3af'}
              fontSize="12" fontWeight={isHighlight ? 700 : 500}
              textAnchor="end"
            >{row.label}</text>
            {/* Track */}
            <rect
              x={barLeft} y={y}
              width={barMax} height={rowHeight}
              fill="none" stroke="#1f2937" strokeWidth="0.8"
            />
            {/* Bar */}
            <rect
              x={barLeft} y={y}
              width={w} height={rowHeight}
              fill={isHighlight ? '#a855f7' : '#4b5563'}
            />
            {/* Value */}
            <text
              x={barLeft + w + 8} y={y + rowHeight / 2 + 4}
              fill={isHighlight ? '#f9fafb' : '#9ca3af'}
              fontSize="12" fontWeight={isHighlight ? 700 : 500}
              fontFamily="var(--mono, monospace)"
            >{row.pct}%</text>
          </g>
        )
      })}
      {/* Axis caption */}
      <text
        x={barLeft + barMax / 2} y={top + DES_ROWS.length * (rowHeight + rowGap) + 20}
        fill="#6b7280" fontSize="10" fontFamily="var(--mono, monospace)" textAnchor="middle"
      >
        0%                                       40%
      </text>
    </svg>
  )
}

function Paper({ paper, index }) {
  return (
    <div style={{
      paddingBottom: 20,
      marginBottom: 20,
      borderBottom: '1px solid #1f2937',
    }}>
      <div style={{ ...smallCaps, marginBottom: 6 }}>[{index}]</div>
      <p style={{ fontSize: 14, color: '#e5e7eb', margin: '0 0 8px 0', lineHeight: 1.6 }}>
        <span style={{ fontWeight: 600 }}>{paper.authors}</span>
        <span style={{ color: '#9ca3af' }}> ({paper.year}). </span>
        <em style={{ color: '#f9fafb' }}>{paper.title}</em>
        <span style={{ color: '#9ca3af' }}>. {paper.journal}.</span>
      </p>
      <p style={{ ...body, color: '#9ca3af', marginBottom: 10 }}>{paper.summary}</p>
      {paper.caveat && (
        <p style={{
          ...body, fontSize: 13, color: '#6b7280', fontStyle: 'italic',
          padding: '0 0 0 14px', borderLeft: '2px solid #374151', marginBottom: 10,
        }}>
          {paper.caveat}
        </p>
      )}
      {paper.link && (
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12, color: '#a855f7', textDecoration: 'none',
            borderBottom: '1px solid rgba(168, 85, 247, 0.3)', paddingBottom: 1,
          }}
        >
          View paper ↗
        </a>
      )}
    </div>
  )
}

export default function Research() {
  let paperCounter = 0

  return (
    <section>
      <header style={{ marginBottom: 40 }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#f9fafb',
          letterSpacing: '-0.02em', margin: '0 0 12px 0',
        }}>
          Further Reading
        </h2>
        <p style={{ ...body, color: '#9ca3af', marginBottom: 10 }}>
          The claims in this explainer are grounded in a century of research.
          These papers demonstrate that gestalt-mode cognition is not a
          metaphor, a personality trait, or a learning-style myth — it is a
          measurable processing architecture with distinct perceptual,
          cognitive, and neural signatures.
        </p>
        <p style={{ ...body, fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>
          Organized by research thread. Each paper includes a note on why it
          matters for understanding gestalt thinking as a cognitive mode.
        </p>
      </header>

      {/* Figure 9: research timeline. Shows all the papers below
          plotted on one axis so the convergence is visible at a glance. */}
      <figure style={{
        margin: '0 0 56px 0', padding: '32px 16px 24px',
        borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937',
      }}>
        <div style={{ ...smallCaps, marginBottom: 16, textAlign: 'center' }}>Figure 9</div>
        <TimelineFigure />
        <figcaption style={{
          fontSize: 12, color: '#6b7280', marginTop: 20, textAlign: 'center',
          fontStyle: 'italic', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Figure 9. Twelve papers on gestalt cognition, 1923–2008. The
          convergence across five decades and multiple disciplines
          (perception, problem-solving, expertise, phenomenology, fMRI) is
          the main evidence that gestalt thinking is a measurable
          processing architecture, not a metaphor.
        </figcaption>
      </figure>

      {/* Figure 10: Hurlburt DES frequencies. Backs up the "22% of
          sampled moments" claim in the Hurlburt entry below. */}
      <figure style={{
        margin: '0 0 56px 0', padding: '28px 16px 20px',
        borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937',
      }}>
        <div style={{ ...smallCaps, marginBottom: 14, textAlign: 'center' }}>Figure 10</div>
        <DESFigure />
        <figcaption style={{
          fontSize: 12, color: '#6b7280', marginTop: 16, textAlign: 'center',
          fontStyle: 'italic', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Figure 10. Frequencies of the five features of inner experience
          in Descriptive Experience Sampling, per Heavey &amp; Hurlburt
          (2008). "Unsymbolized thinking" is the empirical foundation for
          treating gestalt cognition as a literal processing mode.
        </figcaption>
      </figure>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <h3 style={{
              fontSize: 18, fontWeight: 700, color: '#f9fafb',
              letterSpacing: '-0.01em', margin: '0 0 8px 0',
              paddingBottom: 10, borderBottom: '1px solid #374151',
            }}>
              {cat.title}
            </h3>
            <p style={{ ...body, fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginTop: 10, marginBottom: 20 }}>
              {cat.description}
            </p>
            <div>
              {cat.papers.map((paper) => {
                paperCounter += 1
                return <Paper key={paper.title} paper={paper} index={paperCounter} />
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48, paddingTop: 32, borderTop: '1px solid #374151',
      }}>
        <div style={{ ...smallCaps, marginBottom: 12 }}>Coda</div>
        <p style={{ ...body, color: '#9ca3af' }}>
          The convergence is striking: Wertheimer and Köhler observed it in
          perception and problem-solving. De Groot and Chase &amp; Simon
          measured it in expertise. Schooler proved that words can damage it.
          Bowers and Bolte showed it operates before conscious access. Navon
          demonstrated it is the brain's default processing order. Hurlburt
          confirmed that some people experience it as their primary mode of
          thought. Gestalt thinking is not one finding — it is the same
          finding, replicated across a century of research from different
          angles.
        </p>
      </div>
    </section>
  )
}
