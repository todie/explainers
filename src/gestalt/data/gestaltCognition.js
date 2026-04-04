/**
 * Gestalt Cognition — Research Data
 *
 * Real-world examples, pros/cons, first-person phenomenology, and
 * visualization metaphors for gestalt thinking as a cognitive mode.
 *
 * Every entry includes citations. This is NOT about gestalt psychology
 * principles (closure, proximity, etc.) — it's about the lived experience
 * of perceiving wholes before parts.
 */

// ---------------------------------------------------------------------------
// 1. Real-World Examples of Gestalt Cognition
// ---------------------------------------------------------------------------

/**
 * @typedef {{ id: string, domain: string, domainColor: string, title: string, description: string, quote?: string, quoteAttribution?: string, mechanism: string, source: { label: string, url: string, year?: number } }} Example
 * @typedef {{ id: string, type: 'pro'|'con', title: string, description: string, domains?: string[], source?: { label: string, url: string, year?: number } }} ProCon
 * @typedef {{ id: string, person: string, context: string, quote: string, concept: string, source: { label: string, url: string, year?: number } }} PhenomenologyEntry
 * @typedef {{ id: string, title: string, verbal: string, gestalt: string, animationHint: string }} VisualizationMetaphor
 * @typedef {{ id: string, condition: string, description: string, passes: string[], fails: string[] }} TrustCondition
 * @typedef {{ label: string, url: string, year?: number }} Source
 */

/** @type {Example[]} */
export const EXAMPLES = [
  // --- Science ---
  {
    id: "einstein-light-beam",
    domain: "Physics",
    domainColor: "#60a5fa",
    title: "Einstein's Light-Beam Thought Experiment",
    description:
      "At age 16, Einstein imagined riding alongside a beam of light and perceived — not deduced — a paradox: a spatially oscillating electromagnetic field at rest should not exist, yet Maxwell's equations demanded it. The whole contradiction arrived as a single visual gestalt, not a chain of logical steps. He spent the next ten years translating that image into the mathematics of special relativity.",
    quote:
      "If I pursue a beam of light with the velocity c, I should observe such a beam of light as an electromagnetic field at rest though spatially oscillating. There seems to be no such thing, however, neither on the basis of experience nor according to Maxwell's equations.",
    quoteAttribution: "Albert Einstein, Autobiographical Notes (1949)",
    mechanism:
      "Visual thought experiment (Gedankenexperiment) — Einstein perceived the entire scenario as a single image, recognized the impossibility holistically, then worked backward to formal proof.",
    source: {
      label: "Einstein's Most Famous Thought Experiment — John D. Norton, University of Pittsburgh",
      url: "https://sites.pitt.edu/~jdnorton/Goodies/Chasing_the_light/",
      year: 2013,
    },
  },
  {
    id: "kekule-benzene",
    domain: "Chemistry",
    domainColor: "#22c55e",
    title: "Kekule's Benzene Ring Dream",
    description:
      "Friedrich August Kekule had spent years trying to determine benzene's molecular structure. During a reverie in front of his fireplace in Ghent (winter 1861-62), he saw atoms dancing in chains, then one chain formed a snake that seized its own tail — the ouroboros. He woke with the ring structure of benzene fully formed. The image preceded the chemistry.",
    quote:
      "Again the atoms were juggling before my eyes... My mind's eye, sharpened by repeated sights of a similar kind, could now distinguish larger structures... all in a snake-like motion. One of the snakes seized its own tail and the image whirled scornfully before my eyes. As though from a flash of lightning I awoke.",
    quoteAttribution: "August Kekule, Benzolfest speech (1890)",
    mechanism:
      "Hypnagogic visual insight — the unconscious mind restructured the problem into a visual whole (ring topology) that the conscious mind had failed to reach through sequential analysis.",
    source: {
      label: "Kekule's Daydream — Chemistry World",
      url: "https://www.chemistryworld.com/features/snakes-sausages-and-structural-formulae/9038.article",
      year: 2015,
    },
  },
  {
    id: "poincare-bus-step",
    domain: "Mathematics",
    domainColor: "#a855f7",
    title: "Poincare's Bus-Step Illumination",
    description:
      "Henri Poincare had been working on Fuchsian functions for weeks with no breakthrough. He set the work aside and went on a geological excursion. While stepping onto an omnibus mid-conversation, the connection between Fuchsian functions and non-Euclidean geometry struck him with total certainty — a sudden, complete insight. He didn't need to verify it; he felt its truth before working through the proof.",
    quote:
      "At the moment when I put my foot on the step, the idea came to me, without anything in my former thoughts seeming to have paved the way for it, that the transformations I had used to define the Fuchsian functions were identical with those of non-Euclidian geometry.",
    quoteAttribution: "Henri Poincare, Science and Method (1908)",
    mechanism:
      "Unconscious incubation followed by sudden illumination — Poincare theorized that the unconscious mind performs combinatorial work, testing possibilities by aesthetic criteria ('mathematical beauty'), and only surfaces results that pass this filter.",
    source: {
      label: "Poincare on How Creativity Works — The Marginalian",
      url: "https://www.themarginalian.org/2013/08/15/henri-poincare-on-how-creativity-works/",
      year: 2013,
    },
  },
  {
    id: "ramanujan-dreams",
    domain: "Mathematics",
    domainColor: "#a855f7",
    title: "Ramanujan's Dream Formulas",
    description:
      "Srinivasa Ramanujan claimed his mathematical formulas were revealed by the goddess Namagiri in his dreams. A hand would appear, writing elliptic integrals on a screen. He would wake and commit them to paper. G.H. Hardy — an atheist who dismissed the divine attribution — still rated Ramanujan's raw mathematical talent at 100 on a scale where Hilbert scored 80 and Hardy himself scored 25.",
    quote:
      "While asleep, I had an unusual experience. There was a red screen formed by flowing blood, as it were. I was observing it. Suddenly a hand began to write on the screen. I became all attention. That hand wrote a number of elliptic integrals. They stuck to my mind. As soon as I woke up, I committed them to writing.",
    quoteAttribution: "Srinivasa Ramanujan, as reported by his wife S. Janaki",
    mechanism:
      "Complete mathematical structures arriving pre-formed in consciousness — no sequential derivation, no intermediate steps visible to introspection. The 'proof' had to be constructed after the fact to communicate the result.",
    source: {
      label: "It Came to Me in a Dream: Srinivasa Ramanujan — The Sublime Blog",
      url: "https://thesublimeblog.org/2022/08/09/it-came-to-me-in-a-dream-the-intuitive-mathematician-srinivasa-ramanujan/",
      year: 2022,
    },
  },

  // --- Chess ---
  {
    id: "chess-chunking",
    domain: "Chess",
    domainColor: "#facc15",
    title: "Grandmaster Board Perception (de Groot / Chase & Simon)",
    description:
      "When shown a mid-game chess position for 5 seconds, grandmasters recalled 93% of piece positions. Novices recalled about 51%. But with randomly placed pieces, masters performed no better than novices. Masters don't have better memory — they perceive the board as 5-6 meaningful chunks (attack formations, pawn structures, king safety patterns) rather than 32 individual pieces. They see the story of the position, not the pixels.",
    mechanism:
      "Chunking — ~50,000 learned patterns stored in long-term memory allow instant recognition of meaningful configurations. The 'whole' is a template, not a reconstruction from parts.",
    source: {
      label: "Perception in Chess — Chase & Simon (1973), Cognitive Psychology",
      url: "https://www.sciencedirect.com/science/article/abs/pii/0010028573900042",
      year: 1973,
    },
  },
  {
    id: "chess-blitz",
    domain: "Chess",
    domainColor: "#facc15",
    title: "Blitz Chess: Pattern Recognition Under Time Pressure",
    description:
      "In blitz chess (3-5 minutes per game), grandmasters make strong moves in under 10 seconds — far too fast for deep calculation. They rely on pattern recognition to generate candidate moves instantly. The position triggers a template, the template suggests a move, and only then does analysis begin. The gestalt comes first; the search tree comes second.",
    mechanism:
      "Recognition-primed move generation — patterns in visual field trigger stored move-pattern associations, producing 'base moves' that subsequent analysis refines or confirms.",
    source: {
      label: "Visualization, Pattern Recognition, and Forward Search — Chabris & Hearst (2003)",
      url: "https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog2704_3",
      year: 2003,
    },
  },

  // --- Medicine ---
  {
    id: "clinical-gestalt",
    domain: "Medicine",
    domainColor: "#f87171",
    title: "Clinical Gestalt: The Experienced Doctor's First Glance",
    description:
      "Experienced clinicians generate a list of possible diagnoses quickly and intuitively within seconds of data collection, drawing on previous experience. They remember specific disease exemplars, which enables rapid access to diagnostic possibilities and gives them an intuitive sense of base rates. This is called 'clinical gestalt' — the physician's holistic, instantaneous impression of what's wrong.",
    mechanism:
      "Dual-process cognition (Kahneman's System 1) — pattern matching against thousands of previously seen cases. The diagnosis arrives before the reasoning. System 2 (analytical) then confirms or overrides.",
    source: {
      label: "Is Clinical Gestalt Good Enough? — PMC / Journal of General Internal Medicine",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2704346/",
      year: 2009,
    },
  },
  {
    id: "radiology-gestalt",
    domain: "Medicine",
    domainColor: "#f87171",
    title: "Radiologist Gestalt: 70% in 0.5 Seconds",
    description:
      "An experienced radiologist picks up 70% of abnormalities on a chest X-ray in less than half a second via a rapid global search. Remarkably, allowing more than 5 seconds of viewing showed no improvement in true-positive detection. The first glance captures a 'normal gestalt' — deviations from it are felt before they're analyzed.",
    mechanism:
      "Two-phase interpretation: (1) rapid global search that identifies deviations from the learned 'normal gestalt,' then (2) systematic analytical scan. Most abnormalities are caught in phase 1.",
    source: {
      label: "Chest Gestalt and Detectability of Lung Lesions — European Journal of Radiology",
      url: "https://www.sciencedirect.com/science/article/abs/pii/0720048X9390015F",
      year: 1993,
    },
  },

  // --- Engineering / Debugging ---
  {
    id: "firefighter-rpd",
    domain: "Emergency Decision-Making",
    domainColor: "#fb923c",
    title: "Klein's Firefighters: Recognition-Primed Decisions",
    description:
      "Gary Klein studied experienced fire ground commanders (avg. 23 years experience) and found they almost never compared options. Instead, they immediately recognized the situation as a prototype, mentally simulated one course of action, and executed if it worked. The RPD (Recognition-Primed Decision) model shows that experts don't decide — they recognize.",
    quote:
      "The commanders' secret was that their experience let them see a situation, even a novel one, as an example of a prototype, so they knew the typical course of action right away.",
    quoteAttribution: "Gary Klein, Sources of Power (1998)",
    mechanism:
      "Recognition-Primed Decision Making — a blend of pattern matching (gestalt recognition of situation type) and mental simulation (running the action forward in imagination to check for problems).",
    source: {
      label: "Sources of Power: How People Make Decisions — Gary Klein, MIT Press",
      url: "https://mitpress.mit.edu/9780262611466/sources-of-power/",
      year: 1998,
    },
  },
  {
    id: "senior-debugging",
    domain: "Software Engineering",
    domainColor: "#fb923c",
    title: "Senior Developer Debugging Intuition",
    description:
      "Expert programmers report 'seeing' the bug before tracing it — recognizing patterns in stack traces, log output, or even the shape of code on screen that signal specific failure modes. Their mental models of the system are rich enough to generate hypotheses from gestalt impressions. One study found experts read compiler feedback holistically while novices processed it character-by-character. Until you've built your pattern library for 'normal,' you can't perceive what's an outlier.",
    mechanism:
      "Accumulated mental models + pattern libraries allow instant anomaly detection. The expert perceives 'this doesn't fit the shape of working code' before they can articulate why.",
    source: {
      label: "Analysis of Experts' and Novices' Thinking Process in Program Debugging — Springer",
      url: "https://link.springer.com/chapter/10.1007/978-3-642-31398-1_12",
      year: 2012,
    },
  },

  // --- Music ---
  {
    id: "mozart-whole-piece",
    domain: "Musical Composition",
    domainColor: "#ec4899",
    title: "Mozart's Simultaneous Hearing (Disputed)",
    description:
      "A famous letter attributed to Mozart describes hearing an entire composition simultaneously: 'I hear it not successively, but as it were all at once.' While the letter's authenticity is disputed (likely by Friedrich Rochlitz, 1815), the description resonated because it matches how many composers report the experience: the whole piece exists as a felt structure before any note is written. Even debunkers acknowledge that eureka moments do happen — they're just the tip of months of labor.",
    quote:
      "Nor do I hear in my imagination the parts successively, but I hear them, as it were, all at once. What a delight this is I cannot tell! All this inventing, this producing, takes place in a pleasing lively dream.",
    quoteAttribution: "Attributed to Mozart (likely apocryphal, c. 1815)",
    mechanism:
      "Whether authentic or not, this describes a documented phenomenon: experienced composers report a felt sense of the whole piece's structure — its emotional arc, tension patterns, and proportions — before the sequential work of notation begins.",
    source: {
      label: "Debunking the Mozart Myth — The Creativity Post / Psychology Today",
      url: "https://www.psychologytoday.com/us/blog/imagine/200812/teaching-creativity-2-debunking-the-mozart-myth-0",
      year: 2008,
    },
  },

  // --- Engineering / Visualization ---
  {
    id: "tesla-mental-lab",
    domain: "Engineering",
    domainColor: "#fb923c",
    title: "Tesla's Mental Laboratory",
    description:
      "Nikola Tesla built, tested, and iterated entire machines in his imagination before committing anything to paper. He would run a device mentally for weeks, monitoring it for wear and tear, adjusting parts, and observing performance. The pieces of apparatus appeared before his eyes 'exhibiting the appearance of solidity and massiveness' — so vivid he sometimes couldn't distinguish vision from reality.",
    quote:
      "The pieces of apparatus I conceived were to me absolutely real and tangible in every detail, even to the minute marks and signs of wear.",
    quoteAttribution: "Nikola Tesla, My Inventions (1919)",
    mechanism:
      "Extreme eidetic visualization — Tesla perceived complete, functioning systems as wholes, then refined them in imagination before any physical prototype existed. The whole preceded every part.",
    source: {
      label: "My Inventions: The Autobiography of Nikola Tesla — Electrical Experimenter (1919)",
      url: "https://en.wikiquote.org/wiki/My_Inventions:_The_Autobiography_of_Nikola_Tesla",
      year: 1919,
    },
  },
];

// ---------------------------------------------------------------------------
// 2. Pros and Cons of Gestalt Thinking as a Primary Cognitive Mode
// ---------------------------------------------------------------------------

/** @type {ProCon[]} */
export const PROS_CONS = [
  // --- Advantages ---
  {
    id: "pro-speed",
    type: "pro",
    title: "Speed of Recognition",
    description:
      "Pattern recognition operates in milliseconds. Radiologists detect 70% of abnormalities in 0.5 seconds. Chess grandmasters find strong moves in under 10 seconds. Firefighters choose action plans without comparing options. In any domain where speed matters and the pattern library is rich enough, gestalt thinking is orders of magnitude faster than analytical reasoning.",
    domains: ["medicine", "chess", "emergency response", "debugging"],
    source: {
      label: "Sources of Power — Gary Klein (1998)",
      url: "https://mitpress.mit.edu/9780262611466/sources-of-power/",
      year: 1998,
    },
  },
  {
    id: "pro-complexity",
    type: "pro",
    title: "Handles Overwhelming Complexity",
    description:
      "Gestalt perception compresses dozens of variables into a single felt impression. A chess master sees 5-6 chunks, not 32 pieces. An experienced doctor sees 'this patient looks septic,' not 47 individual lab values. The compression lets you work with systems that exceed the 7-item working memory limit by perceiving structure rather than enumerating components.",
    domains: ["systems architecture", "medicine", "strategy", "design"],
  },
  {
    id: "pro-novel-connections",
    type: "pro",
    title: "Novel Connections Across Domains",
    description:
      "Because gestalt thinkers perceive structural relationships rather than surface features, they're more likely to see isomorphisms across domains — benzene rings in snake dreams, non-Euclidean geometry in Fuchsian functions, electromagnetic paradoxes in visual thought experiments. The whole-pattern perception enables transfer that sequential analysis would miss.",
    domains: ["science", "mathematics", "invention", "interdisciplinary research"],
    source: {
      label: "Poincare, Science and Method (1908)",
      url: "https://www.themarginalian.org/2013/08/15/henri-poincare-on-how-creativity-works/",
      year: 1908,
    },
  },
  {
    id: "pro-incubation",
    type: "pro",
    title: "Unconscious Incubation Works",
    description:
      "Poincare's four-stage model (preparation, incubation, illumination, verification) is empirically supported. The unconscious mind continues combinatorial work during rest, filtering by aesthetic and structural criteria. Gestalt thinkers benefit from stepping away — the insight often arrives when conscious effort stops.",
    domains: ["mathematics", "science", "creative arts", "engineering"],
    source: {
      label: "Incubation and Intuition in Creative Problem Solving — Frontiers in Psychology",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4956660/",
      year: 2016,
    },
  },
  {
    id: "pro-anomaly-detection",
    type: "pro",
    title: "Instant Anomaly Detection",
    description:
      "Once you have a strong 'normal gestalt,' deviations leap out. Experienced radiologists sense something is wrong before they can name what. Senior developers spot code smells before static analysis tools. The felt deviation from the expected pattern is the fastest form of error detection known.",
    domains: ["medicine", "security", "quality assurance", "debugging"],
  },

  // --- Disadvantages ---
  {
    id: "con-cant-show-work",
    type: "con",
    title: "The 'Can't Show Your Work' Problem",
    description:
      "Gestalt insights arrive as wholes — the conclusion precedes the reasoning. When asked 'how did you get there?', the honest answer is often 'I just saw it.' This creates legitimacy crises in any context that demands stepwise justification: peer review, legal proceedings, management decisions, teaching. The insight may be correct but unprovable on arrival. The expert must reverse-engineer a post-hoc justification, which feels dishonest even when the conclusion is right.",
    source: {
      label: "Expert Blind Spot — Nathan et al., Carnegie Mellon (2001)",
      url: "https://pact.cs.cmu.edu/pubs/2001_NathanEtAl_ICCS_EBS.pdf",
      year: 2001,
    },
  },
  {
    id: "con-expert-blind-spot",
    type: "con",
    title: "Expert Blind Spot / Curse of Knowledge",
    description:
      "Once expertise is internalized as gestalt perception, the intermediate steps become invisible. Experts literally cannot reconstruct the path a novice needs to follow. They've reached 'unconscious competence' — they handle challenges without much thought, but they also can't decompose their process for teaching. This makes brilliant practitioners terrible teachers and can make entire teams dependent on one person's intuition.",
    source: {
      label: "The Curse of Knowledge: Why Experts Can't Teach Beginners — Science Array",
      url: "https://humans.sciencearray.com/curse-of-knowledge-why-experts-struggle-to-teach",
    },
  },
  {
    id: "con-apophenia",
    type: "con",
    title: "Apophenia: Seeing Patterns That Aren't There",
    description:
      "The same machinery that perceives real patterns also generates false ones. Apophenia — detecting meaningful patterns in random data — is the shadow side of gestalt perception. It drives pareidolia (faces in clouds), conspiracy theories (connecting unrelated events), gambler's fallacy (patterns in random sequences), and premature closure in medical diagnosis. In statistics, it's a Type I error. The pattern-recognizer can't distinguish signal from noise without analytical verification.",
    source: {
      label: "Apophenia — Psychology Today",
      url: "https://www.psychologytoday.com/us/basics/apophenia",
    },
  },
  {
    id: "con-confirmation-bias",
    type: "con",
    title: "Confirmation Bias Amplification",
    description:
      "Once a gestalt impression forms, it biases all subsequent perception. In clinical medicine, this manifests as five documented errors: representative heuristic (this looks like X, so it must be X), availability heuristic (recent cases dominate), confirmatory bias (seeking evidence that fits), illusory correlation (connecting unrelated symptoms), and overconfidence. The whole-pattern perception that makes diagnosis fast also makes it resistant to disconfirming evidence.",
    source: {
      label: "Is Clinical Gestalt Good Enough? — Journal of General Internal Medicine",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2704346/",
      year: 2009,
    },
  },
  {
    id: "con-translation-burden",
    type: "con",
    title: "The Translation / Communication Burden",
    description:
      "Gestalt perception operates in a dimension that language is poorly suited to capture. The thinker must translate a simultaneous, multi-dimensional perception into sequential words — a lossy compression that can take 10x longer than the insight itself. This creates a constant feeling of being misunderstood: 'I know the answer but I can't explain it fast enough.' In collaborative settings, this looks like arrogance or hand-waving to sequential thinkers who need the intermediate steps.",
  },
  {
    id: "con-domain-dependence",
    type: "con",
    title: "Domain-Dependent: Fails Outside Pattern Library",
    description:
      "Kahneman identifies three conditions for reliable expert intuition: (1) a sufficiently regular environment, (2) prolonged practice, and (3) immediate feedback. In domains that lack these — financial markets, political forecasting, novel pandemics — gestalt thinking produces confident but wrong answers. The chess master's pattern library is useless in a domain they haven't studied. Expertise is not transferable; the gestalt is domain-specific.",
    source: {
      label: "Thinking, Fast and Slow — Daniel Kahneman (2011)",
      url: "https://www.greenbook.org/insights/insights-industry-news/lessons-from-thinking-fast-038-slow-system-1-and-system-2",
      year: 2011,
    },
  },
  {
    id: "con-rigidity",
    type: "con",
    title: "Functional Fixedness / Einstellung Effect",
    description:
      "A strong gestalt can prevent restructuring. Wertheimer's Gestalt psychologists identified this: when a pattern is perceived as a whole, it resists decomposition. This manifests as functional fixedness (can't see alternative uses for components) and the Einstellung effect (a known solution pattern blocks discovery of a better one). The very thing that makes gestalt perception fast — its resistance to decomposition — makes it rigid when the situation requires novel restructuring.",
    source: {
      label: "Gestalt's Perspective on Insight — PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10743969/",
      year: 2023,
    },
  },
];

// ---------------------------------------------------------------------------
// 3. Phenomenology: Attempts to Describe the Internal Experience
// ---------------------------------------------------------------------------

/** @type {PhenomenologyEntry[]} */
export const PHENOMENOLOGY = [
  {
    id: "grandin-pictures",
    person: "Temple Grandin",
    context: "Autistic scientist and animal behaviorist, describing her lifelong experience of visual thinking",
    quote:
      "I think in pictures. Words are like a second language to me. I translate both spoken and written words into full-color movies, complete with sound, which run like a VCR tape in my head. When somebody speaks to me, his words are instantly translated into pictures.",
    concept: "Visual thinking as primary cognitive mode",
    source: {
      label: "Thinking in Pictures: Autism and Visual Thought — Temple Grandin (1995)",
      url: "https://www.grandin.com/inc/visual.thinking.html",
      year: 1995,
    },
  },
  {
    id: "grandin-verbal-discovery",
    person: "Temple Grandin",
    context: "Discovering that other people think in words",
    quote:
      "Everything I think about is a picture. Now I didn't even know that verbal thinking existed till I was in my late thirties.",
    concept: "The invisibility of one's own cognitive mode — assumed universality",
    source: {
      label: "Thinking in Pictures — Temple Grandin (1995)",
      url: "https://www.grandin.com/inc/visual.thinking.html",
      year: 1995,
    },
  },
  {
    id: "tesla-solidity",
    person: "Nikola Tesla",
    context: "Describing his ability to visualize complete inventions",
    quote:
      "The pieces of apparatus I conceived were to me absolutely real and tangible in every detail, even to the minute marks and signs of wear. It is absolutely immaterial to me whether I run my turbine in thought or test it in my shop.",
    concept: "Eidetic internal simulation — no distinction between mental model and physical reality",
    source: {
      label: "My Inventions — Nikola Tesla (1919)",
      url: "https://en.wikiquote.org/wiki/My_Inventions:_The_Autobiography_of_Nikola_Tesla",
      year: 1919,
    },
  },
  {
    id: "einstein-combinatory-play",
    person: "Albert Einstein",
    context: "Describing his thought process in a letter to mathematician Jacques Hadamard",
    quote:
      "The words or the language, as they are written or spoken, do not seem to play any role in my mechanism of thought. The psychical entities which seem to serve as elements in thought are certain signs and more or less clear images which can be 'voluntarily' reproduced and combined... This combinatory play seems to be the essential feature in productive thought — before there is any connection with logical construction in words or other kinds of signs which can be communicated to others.",
    concept: "Pre-verbal combinatory play — thought exists before language can capture it",
    source: {
      label: "Einstein's letter to Jacques Hadamard, in The Psychology of Invention in the Mathematical Field (1945)",
      url: "https://sites.pitt.edu/~jdnorton/Goodies/Chasing_the_light/",
      year: 1945,
    },
  },
  {
    id: "poincare-certainty",
    person: "Henri Poincare",
    context: "Describing what happened after the bus-step illumination",
    quote:
      "I did not verify the idea; I should not have had time, as upon taking my seat in the omnibus, I went on with a conversation already commenced, but I felt a perfect certainty. On my return to Caen, for conscience's sake I verified the result at my leisure.",
    concept: "Felt certainty preceding verification — the insight carries its own conviction",
    source: {
      label: "Science and Method — Henri Poincare (1908)",
      url: "https://www.themarginalian.org/2013/08/15/henri-poincare-on-how-creativity-works/",
      year: 1908,
    },
  },
  {
    id: "poincare-unconscious-filter",
    person: "Henri Poincare",
    context: "Theorizing about why only certain insights surface to consciousness",
    quote:
      "The role of this unconscious work in mathematical invention appears to me incontestable... The subliminal self is in no way inferior to the conscious self; it is not purely automatic; it is capable of discernment; it has tact, delicacy; it knows how to choose, to divine. What can I say? It knows better how to divine than the conscious self, since it succeeds where that has failed.",
    concept: "The unconscious as an active, aesthetic filter — not a random generator",
    source: {
      label: "Science and Method — Henri Poincare (1908)",
      url: "https://www.bayesianspectacles.org/henri-poincare-unconscious-thought-theory-avant-la-lettre/",
      year: 1908,
    },
  },
  {
    id: "hurlburt-unsymbolized",
    person: "Russell Hurlburt (researcher, describing subjects' reports)",
    context: "Descriptive Experience Sampling — random beeper interrupts to capture inner experience",
    quote:
      "Abigail is wondering whether her friend will pick her up in his car or his pickup truck. This content is clear. But there are no words or images accompanying it, merely the content. She was specifically wondering whether Julio would be driving that truck or his car... even to the point of being able to discriminate the specific content, even though no words were present.",
    concept: "Unsymbolized thinking — explicit, differentiated thought without any words, images, or symbols",
    source: {
      label: "Unsymbolized Thinking — Hurlburt & Akhter (2008), Consciousness and Cognition",
      url: "https://hurlburt.faculty.unlv.edu/hurlburt-akhter-2008.pdf",
      year: 2008,
    },
  },
  {
    id: "hurlburt-frequency",
    person: "Russell Hurlburt",
    context: "On the prevalence of unsymbolized thinking and people's ignorance of it",
    quote:
      "Unsymbolized thinking is frequent, occurring in roughly a quarter of all everyday lived experiences. However, most people who experience unsymbolized thinking don't realize that they do so, and many people who engage in unsymbolized thinking nearly all the time believe that unsymbolized thinking is impossible, until the beeper reveals its existence to them.",
    concept: "The ubiquity and invisibility of non-verbal thought",
    source: {
      label: "Thinking Without Words — Psychology Today / Hurlburt",
      url: "https://www.psychologytoday.com/us/blog/pristine-inner-experience/201111/thinking-without-words",
      year: 2011,
    },
  },
  {
    id: "fodor-mentalese",
    person: "Jerry Fodor",
    context: "The Language of Thought hypothesis — arguing that thinking is NOT in natural language",
    quote:
      "Fodor's view is that language is but an input and output module to central cognition, not implicated in the central processes of thinking and reasoning themselves. These latter processes involve sentence-like structures, but these are not sentences of any natural language, but rather of an innate, universal, symbolic system — mentalese.",
    concept: "Mentalese — a pre-linguistic representational system underlying all thought, including thought that feels wordless",
    source: {
      label: "The Language of Thought Hypothesis — Stanford Encyclopedia of Philosophy",
      url: "https://plato.stanford.edu/entries/language-thought/",
      year: 2024,
    },
  },
  {
    id: "ramanujan-hand",
    person: "Srinivasa Ramanujan",
    context: "Describing how mathematical results arrived in dreams",
    quote:
      "While asleep I had an unusual experience. There was a red screen formed by flowing blood as it were. I was observing it. Suddenly a hand began to write on the screen. I became all attention. That hand wrote a number of elliptic integrals. They stuck to my mind. As soon as I woke up, I committed them to writing.",
    concept: "Mathematical truth arriving as direct perception — no derivation, no steps, just the result",
    source: {
      label: "The Secrets of Ramanujan's Garden — Science and Nonduality",
      url: "https://scienceandnonduality.com/article/the-secrets-of-ramanujans-garden/",
    },
  },
  {
    id: "wertheimer-productive",
    person: "Max Wertheimer",
    context: "Founder of Gestalt psychology, distinguishing productive from reproductive thinking",
    quote:
      "Productive thinking involves a restructuring of one's initial representation of the problem's elements, leading to a sudden leap of understanding phenomenologically indexed by the 'Aha!' feeling. Contrary to the process of solving problems in an analytical, stepwise fashion, insights are characterized by their sudden appearance into awareness as a whole.",
    concept: "The Aha! moment as a perceptual restructuring — the whole solution arriving at once, not step by step",
    source: {
      label: "Gestalt's Perspective on Insight — PMC",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10743969/",
      year: 2023,
    },
  },
];

// ---------------------------------------------------------------------------
// 4. Visualization Metaphors: Verbal Processing vs. Gestalt Processing
// ---------------------------------------------------------------------------

/** @type {VisualizationMetaphor[]} */
export const VISUALIZATION_METAPHORS = [
  {
    id: "serial-vs-parallel",
    title: "Reading a Book vs. Seeing a Painting",
    verbal:
      "A sentence is processed word by word, left to right, building meaning incrementally. You can't skip to the end and still 'have' the sentence. The meaning is in the sequence.",
    gestalt:
      "A painting is perceived all at once. You see the composition, the mood, the relationship of elements in a single glance. You can then explore details, but the whole impression came first. Meaning is in the spatial relationships, not the sequence.",
    animationHint:
      "Left side: words appearing one by one in a horizontal line, each lighting up sequentially. Right side: an entire image fading in simultaneously, with no sequence — all parts arrive together.",
  },
  {
    id: "flashlight-vs-floodlight",
    title: "Flashlight vs. Floodlight",
    verbal:
      "Verbal/analytical processing is like a flashlight in a dark room — you see one thing at a time, brightly and clearly. You build a map by sweeping the beam. Coverage is sequential; understanding is assembled piece by piece.",
    gestalt:
      "Gestalt processing is like the room lights coming on all at once. You see everything simultaneously but with less detail on any single point. The relationships between objects are immediately apparent. You see the room, not a series of objects.",
    animationHint:
      "Left side: a small bright circle moving across a dark field, revealing objects one at a time. Right side: the entire field illuminating at once with a soft, even light — all objects visible simultaneously.",
  },
  {
    id: "building-vs-recognizing",
    title: "Building a Face vs. Recognizing a Face",
    verbal:
      "Imagine describing a face feature by feature: 'brown eyes, narrow nose, wide jaw, thin lips...' Each descriptor adds information, but at no point does the description 'become' the face. You could describe for minutes and still not convey the person.",
    gestalt:
      "Now imagine seeing a face. In 170 milliseconds, before any conscious processing, you know it — who it is, their mood, whether you trust them. No features were enumerated. The whole arrived before any part could be named. That's gestalt recognition.",
    animationHint:
      "Left side: facial features appearing one by one (eyes, then nose, then mouth) — a police sketch being assembled. Right side: a blurred face instantly sharpening to full resolution all at once — recognition, not construction.",
  },
  {
    id: "gps-vs-local-knowledge",
    title: "GPS Directions vs. Knowing the City",
    verbal:
      "GPS gives you sequential, turn-by-turn instructions. You follow each step without understanding the city. If one route is blocked, you need recalculation. The knowledge is in the sequence.",
    gestalt:
      "A taxi driver who's driven for 20 years doesn't follow instructions — they have a spatial map of the entire city. They 'feel' where things are, sense traffic patterns, take shortcuts they couldn't verbally describe. If one route is blocked, they immediately know alternatives because they hold the whole topology.",
    animationHint:
      "Left side: a highlighted route on a map, one segment lighting up at a time with arrow indicators. Right side: the entire street map visible at once, with a warm glow spreading from origin to destination showing multiple simultaneous possible paths.",
  },
  {
    id: "telescope-vs-peripheral",
    title: "Telescope vs. Peripheral Vision",
    verbal:
      "Analytical thinking is like looking through a telescope — high resolution, narrow field. You see one thing in great detail. Moving to the next thing requires repositioning. The tradeoff is depth vs. breadth.",
    gestalt:
      "Gestalt thinking is like peripheral vision — low resolution but vast field. You detect motion, shape, and pattern across the entire visual field simultaneously. You can't read text with peripheral vision, but you can detect a predator. Evolution optimized for this: survive first, analyze second.",
    animationHint:
      "Left side: a sharp circular viewport scanning across a field, showing high-detail fragments. Right side: a wide, slightly blurred panoramic view where the entire scene is visible but nothing is in sharp focus — shapes and relationships are clear, details are not.",
  },
  {
    id: "midi-vs-orchestra",
    title: "MIDI Sequencer vs. Hearing the Orchestra",
    verbal:
      "A MIDI sequencer shows music as individual note events on a timeline — pitch, duration, velocity, each specified separately. You can see every detail of every note, but the 'music' is not in the data. You have to play it to hear it.",
    gestalt:
      "When a conductor hears the full orchestra, they don't perceive 60 individual instruments playing separate note sequences. They hear a single harmonic texture — a gestalt of timbre, dynamics, and motion. They can then zoom into the oboe if needed, but the whole sound comes first.",
    animationHint:
      "Left side: piano-roll MIDI grid with notes appearing as colored rectangles, one instrument track at a time. Right side: a waveform or sound visualization where all frequencies are present simultaneously — a single, complex, unified signal.",
  },
];

// ---------------------------------------------------------------------------
// 5. Kahneman's Conditions for Trustworthy Intuition
// ---------------------------------------------------------------------------

/** @type {TrustCondition[]} */
export const TRUST_CONDITIONS = [
  {
    id: "regularity",
    condition: "Sufficiently Regular Environment",
    description:
      "The environment must contain stable, learnable patterns. Causal relationships must be consistent enough for pattern recognition to work.",
    passes: ["chess", "radiology", "firefighting", "surgery", "animal behavior"],
    fails: ["stock market", "political forecasting", "long-range weather", "startup success prediction"],
  },
  {
    id: "practice",
    condition: "Prolonged Practice with Many Cases",
    description:
      "The expert must have encountered enough examples to build a rich pattern library. Chase & Simon estimated chess masters store ~50,000 chunks.",
    passes: ["10,000+ cases in medicine", "thousands of games in chess", "years of debugging in engineering"],
    fails: ["rare events", "novel pandemics", "unprecedented crises", "one-off decisions"],
  },
  {
    id: "feedback",
    condition: "Immediate and Unambiguous Feedback",
    description:
      "The expert must learn whether their pattern-match was correct, quickly enough to calibrate future recognition. Without feedback, confidence grows without accuracy.",
    passes: ["chess (win/lose)", "surgery (outcome visible)", "debugging (code works or not)"],
    fails: [
      "psychiatry (outcomes delayed years)",
      "hiring (many confounds)",
      "economic policy (no counterfactual)",
    ],
  },
];

// ---------------------------------------------------------------------------
// 6. Key Research Programs & Sources
// ---------------------------------------------------------------------------

/** @type {Source[]} */
export const KEY_SOURCES = [
  {
    label: "Chase & Simon — Perception in Chess (1973)",
    url: "https://www.sciencedirect.com/science/article/abs/pii/0010028573900042",
    year: 1973,
  },
  {
    label: "de Groot — Thought and Choice in Chess (1946/1978)",
    url: "https://www.researchgate.net/publication/49401082_Expert_and_novice_problem_solving_strategies_in_chess_Sixty_years_of_citing_de_Groot_1946",
    year: 1946,
  },
  {
    label: "Gary Klein — Sources of Power: How People Make Decisions (1998)",
    url: "https://mitpress.mit.edu/9780262611466/sources-of-power/",
    year: 1998,
  },
  {
    label: "Daniel Kahneman — Thinking, Fast and Slow (2011)",
    url: "https://www.greenbook.org/insights/insights-industry-news/lessons-from-thinking-fast-038-slow-system-1-and-system-2",
    year: 2011,
  },
  {
    label: "Hurlburt & Akhter — Unsymbolized Thinking (2008)",
    url: "https://hurlburt.faculty.unlv.edu/hurlburt-akhter-2008.pdf",
    year: 2008,
  },
  {
    label: "Jerry Fodor — The Language of Thought (1975)",
    url: "https://plato.stanford.edu/entries/language-thought/",
    year: 1975,
  },
  {
    label: "Temple Grandin — Thinking in Pictures (1995)",
    url: "https://www.grandin.com/inc/visual.thinking.html",
    year: 1995,
  },
  {
    label: "Henri Poincare — Science and Method (1908)",
    url: "https://www.themarginalian.org/2013/08/15/henri-poincare-on-how-creativity-works/",
    year: 1908,
  },
  {
    label: "Wertheimer — Productive Thinking (1945)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10743969/",
    year: 1945,
  },
  {
    label: "Chabris & Hearst — Visualization, Pattern Recognition, and Forward Search (2003)",
    url: "https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog2704_3",
    year: 2003,
  },
  {
    label: "Clinical Gestalt in Diagnosis — Journal of General Internal Medicine (2009)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2704346/",
    year: 2009,
  },
  {
    label: "Apophenia — Psychology Today",
    url: "https://www.psychologytoday.com/us/basics/apophenia",
  },
  {
    label: "Nathan et al. — Expert Blind Spot, Carnegie Mellon (2001)",
    url: "https://pact.cs.cmu.edu/pubs/2001_NathanEtAl_ICCS_EBS.pdf",
    year: 2001,
  },
  {
    label: "Gestalt Theory: Implications for Radiology Education — AJR (2008)",
    url: "https://ajronline.org/doi/10.2214/AJR.07.3268",
    year: 2008,
  },
  {
    label: "Tesla — My Inventions (1919)",
    url: "https://en.wikiquote.org/wiki/My_Inventions:_The_Autobiography_of_Nikola_Tesla",
    year: 1919,
  },
];
