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
      <header style={{ marginBottom: 48 }}>
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
