import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'inner-experience',
    title: 'Inner Experience & Unsymbolized Thinking',
    color: '#f87171',
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
    color: '#a855f7',
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
    color: '#60a5fa',
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
    color: '#22d3ee',
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
    color: '#4ade80',
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
    color: '#facc15',
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
        caveat: 'Note: replication attempts have produced mixed results. The theoretical framework remains influential even as specific experimental claims are debated.',
      },
    ],
  },
]

export default function Research() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb',
        letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center',
      }}>
        Further Reading
      </h2>
      <p style={{
        fontSize: 14, color: '#6b7280', maxWidth: 600, margin: '0 auto 12px',
        textAlign: 'center', lineHeight: 1.7,
      }}>
        The claims in this explainer are grounded in a century of research. These papers
        demonstrate that gestalt-mode cognition is not a metaphor, a personality trait, or a
        learning style myth &mdash; it is a measurable processing architecture with distinct
        perceptual, cognitive, and neural signatures.
      </p>
      <p style={{
        fontSize: 13, color: '#4b5563', maxWidth: 560, margin: '0 auto 36px',
        textAlign: 'center', lineHeight: 1.6,
      }}>
        Organized by research thread. Each paper includes why it matters for understanding
        gestalt thinking as a cognitive mode.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto' }}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActive(active === cat.id ? null : cat.id)}
            style={{
              background: active === cat.id
                ? `linear-gradient(135deg, #111827 0%, ${cat.color}06 100%)`
                : '#111827',
              border: `1px solid ${active === cat.id ? cat.color + '30' : '#1f2937'}`,
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transition: 'all 0.25s ease', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
              background: `linear-gradient(180deg, ${cat.color}, ${cat.color}40)`,
            }} />

            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: cat.color, marginBottom: 6 }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>
                  {cat.description}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{
                  fontSize: 11, color: '#4b5563',
                  fontFamily: 'var(--mono, monospace)',
                }}>
                  {cat.papers.length} {cat.papers.length === 1 ? 'paper' : 'papers'}
                </span>
                <span style={{
                  fontSize: 14, color: '#4b5563', transition: 'transform 0.2s',
                  transform: active === cat.id ? 'rotate(180deg)' : 'none',
                }}>
                  &#9662;
                </span>
              </div>
            </div>

            {active === cat.id && (
              <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {cat.papers.map((paper, pi) => (
                  <div
                    key={pi}
                    style={{
                      padding: '18px 20px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Citation line */}
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 600 }}>
                        {paper.authors}
                      </span>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>
                        {' '}({paper.year}).{' '}
                      </span>
                      <span style={{ fontSize: 13, color: cat.color, fontStyle: 'italic' }}>
                        {paper.title}
                      </span>
                      <span style={{ fontSize: 12, color: '#4b5563' }}>
                        . {paper.journal}.
                      </span>
                    </div>

                    {/* Relevance summary */}
                    <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.8 }}>
                      {paper.summary}
                    </div>

                    {/* Caveat if present */}
                    {paper.caveat && (
                      <div style={{
                        marginTop: 10, padding: '10px 14px',
                        background: 'rgba(250, 204, 21, 0.04)',
                        border: '1px solid rgba(250, 204, 21, 0.12)',
                        borderRadius: 8, fontSize: 12, color: '#facc15',
                        lineHeight: 1.7, fontStyle: 'italic',
                      }}>
                        {paper.caveat}
                      </div>
                    )}

                    {/* Link */}
                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block', marginTop: 10,
                          fontSize: 12, color: cat.color, textDecoration: 'none',
                          opacity: 0.7, transition: 'opacity 0.15s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                        onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                      >
                        View paper &#8599;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary note */}
      <div style={{
        maxWidth: 640, margin: '36px auto 0', padding: '20px 24px',
        background: 'rgba(168, 85, 247, 0.04)',
        border: '1px solid rgba(168, 85, 247, 0.12)',
        borderRadius: 12, textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.8 }}>
          The convergence is striking: Wertheimer and K&ouml;hler observed it in perception and
          problem-solving. De Groot and Chase &amp; Simon measured it in expertise. Schooler proved
          that words can damage it. Bowers and Bolte showed it operates before conscious access.
          Navon demonstrated it is the brain's default processing order. Hurlburt confirmed that
          some people experience it as their primary mode of thought. Gestalt thinking is not one
          finding &mdash; it is the same finding, replicated across a century of research from
          different angles.
        </div>
      </div>
    </div>
  )
}
