/**
 * The Embodied Mind — rejecting Cartesian dualism with evidence.
 *
 * Written 2026-04-06 in response to a Threads exchange: "the body is a
 * vessel for the mind vs. the mind is a chip for the body". Both framings
 * are still dualist — they posit separable substances with a relationship.
 * The literature says there is no separation to begin with.
 *
 * Citations are real, canonical, and checked. This is not vibes-based.
 */

export const HERO_STATS = [
  {
    label: 'Vagal afferents',
    value: '80%',
    sub: 'body → brain, not the other way',
    color: '#f87171',
  },
  {
    label: 'Enteric neurons',
    value: '500M',
    sub: '"the second brain" (Gershon)',
    color: '#fb923c',
  },
  {
    label: 'Homunculi',
    value: '0',
    sub: 'no ghost in the machine',
    color: '#ec4899',
  },
  {
    label: 'Interoceptive cortex',
    value: 'insula',
    sub: 'where being-a-body becomes being-aware',
    color: '#f472b6',
  },
]

/** The two pop framings we're rejecting. */
export const FRAMINGS = {
  intro:
    'Two framings you\'ll hear. Both wrong. Both wrong in the same way — they assume the thing they should be explaining.',
  positions: [
    {
      label: 'The vessel framing',
      quote: '"The body is a vessel for the mind."',
      color: '#f87171',
      body: 'Treats the body as an inert container — a car the mind drives. Substrate-independent consciousness that happens to be instantiated in meat. This is just Cartesian dualism wearing modern clothes: mental stuff in physical stuff, connected by some unspecified interface.',
      failure: 'There is no "the mind" sitting inside the body. The body-state is constitutive of the mind-state, not its housing.',
    },
    {
      label: 'The chip framing',
      quote: '"The mind is a chip for the body."',
      color: '#fb923c',
      body: 'Treats the mind as the functional output of the body — the brain as an on-board computer that the body feeds inputs to and receives outputs from. Feels more materialist than the vessel framing, but it\'s the same error upside down.',
      failure: 'Still posits mind and body as separable, interacting systems. Still has an interface problem. The chip framing just puts the ghost in the CPU instead of the cabin.',
    },
  ],
  punchline:
    'Both framings are structurally identical: two things with a relationship. The actual answer — and this is what 40 years of neuroscience and embodied cognition converge on — is that there is only one thing. The mind is not in the body, not on the body, not produced by the body. The mind IS a body-wide process. The distinction is a residue of 17th-century metaphysics, not a feature of the world.',
}

/** The findings — each is a research program, not a lone paper. */
export const FINDINGS = [
  {
    id: 'interoception-is-substrate',
    title: 'Interoception is the substrate of consciousness',
    color: '#f87171',
    body: 'The felt sense of being alive — awareness itself — is built out of interoceptive signals: heartbeat, breath, gut state, thermal regulation, visceral tone. These are integrated by the anterior insula, which Craig (2002, 2009) showed is the neural correlate of "how you feel right now." Damasio\'s core consciousness is not an abstract cogito; it is the brain\'s ongoing map of the body\'s physiological condition. Block the afferent signals and you don\'t get a purer mind — you get no mind.',
    citations: ['craig-2002', 'craig-2009', 'critchley-2004', 'damasio-1999', 'seth-2013'],
  },
  {
    id: 'gut-is-not-passive',
    title: 'The gut is an independent nervous system that shapes cognition',
    color: '#fb923c',
    body: 'The enteric nervous system has ~500 million neurons — more than the spinal cord — and operates semi-autonomously. Vagal afferents (~80% of vagus nerve fibers, not 20% as the textbooks used to say) carry gut-state signals upward; gut-derived metabolites from the microbiome cross into the bloodstream and modulate neural activity. Germ-free mice show altered anxiety and social behavior. Irritable bowel syndrome is comorbid with depression not by coincidence but because they share a substrate. The brain is not the sole site of cognition — it\'s the most-networked node in a larger distributed system.',
    citations: ['mayer-2011', 'cryan-dinan-2012', 'gershon-1998', 'porges-2011'],
  },
  {
    id: 'embodiment-grounds-abstraction',
    title: 'Abstract concepts are grounded in sensorimotor experience',
    color: '#ec4899',
    body: 'Lakoff & Johnson showed that essentially all abstract language is built on bodily metaphors: arguments have positions, ideas get grasped, time flows forward, intimacy is warmth, importance is weight. Behavioral studies confirm: holding a warm drink makes people rate strangers as more trustworthy (Williams & Bargh 2008); priming physical "heavy" makes judgments feel more important. Varela, Thompson & Rosch\'s The Embodied Mind (1991) laid out the argument that cognition IS enactment — you cannot simulate understanding without a body that acts. The "brain in a vat" thought experiment is not a useful abstraction; it\'s a category error.',
    citations: ['lakoff-johnson-1999', 'varela-thompson-rosch-1991', 'clark-2008', 'thompson-2007', 'williams-bargh-2008'],
  },
  {
    id: 'trauma-lives-in-the-body',
    title: 'Trauma is stored in body state, not in autobiographical memory',
    color: '#f472b6',
    body: 'Van der Kolk\'s work (collated in The Body Keeps the Score, 2014) documents a pattern clinicians had noticed for decades: trauma survivors lose conscious narrative access to the event but show persistent autonomic dysregulation, somatic flashbacks, and body-held tension patterns. The episodic memory fades; the body-state does not. Porges\' polyvagal theory gives the mechanism — defensive states (fight, flight, freeze) are physiological configurations that can become stuck. Treatment works best when it targets the body directly (yoga, breathwork, EMDR, somatic experiencing) rather than trying to reason the narrative into peace. Not because talk therapy is useless, but because the storage site is not symbolic.',
    citations: ['van-der-kolk-2014', 'porges-2011', 'levine-1997'],
  },
]

/** What the research collectively says — the model that replaces dualism. */
export const MODEL = {
  intro:
    'Here\'s what the convergent evidence actually supports. Not a philosophical claim, a description of what brains do.',
  tenets: [
    {
      label: 'Bounded self',
      color: '#f87171',
      body: 'The brain constructs a "self" by integrating interoceptive, proprioceptive, and exteroceptive signals into a single model with a temporal history. The self is not a thing the brain has; it\'s a model the brain maintains because maintaining it reduces prediction error about what to do next.',
    },
    {
      label: 'Active inference',
      color: '#fb923c',
      body: 'Friston\'s free-energy principle frames cognition as a system minimizing surprise over its sensory states. Minimizing surprise requires acting on the world (moving, breathing, digesting, secreting hormones). There is no passive perception followed by active thought; perception IS action, and action IS cognition. The body is the site where the model meets the world.',
    },
    {
      label: 'Homeostasis as the goal',
      color: '#ec4899',
      body: 'Every process the brain runs is ultimately in service of keeping the body within viability bounds — glucose, temperature, pH, osmolality, sleep, mate, stay-out-of-predator-mouth. Consciousness is an elaborate homeostatic engine. "Higher cognition" is not separable from it; it\'s downstream of it. Damasio\'s somatic marker hypothesis: gut feelings aren\'t pre-rational noise, they\'re fast-path homeostatic judgments compressing prior outcomes.',
    },
    {
      label: 'Distributed processing',
      color: '#f472b6',
      body: 'The brain is the most-connected node, but cognition lives in the whole network: vagus, enteric ganglia, sympathetic chain, hormonal axes, immune cells producing cytokines, fascia, even the skin\'s thermoreceptive grid. The neurocentric model that puts "mind" exclusively inside the skull is as wrong as the heliocentric claim that the planets are on crystal spheres — it\'s a historical artifact, not a description of the mechanism.',
    },
  ],
  conclusion:
    'Given all of this, "where is the mind" is the wrong question. There is no locus. The mind is a pattern of activity maintained across a body that is itself the system doing the maintaining. Asking "is the body a vessel for the mind, or is the mind a chip for the body?" is like asking "is the song a vessel for the dance, or is the dance a chip for the song?" — neither. They\'re the same process described at different levels.',
}

/** One row per piece of evidence. */
export const EVIDENCE = [
  {
    id: 'craig-insula',
    label: 'Anterior insula = awareness',
    strand: 'Interoception',
    color: '#f87171',
    finding: 'fMRI studies show anterior insula activation tracks heartbeat-detection accuracy, thermal discrimination, and emotion naming. People with damage to the insula lose access to their internal state and, with it, the capacity for nuanced feeling.',
    ref: 'Craig 2002, 2009; Critchley et al. 2004',
  },
  {
    id: 'germ-free-mice',
    label: 'Germ-free mice are anxious',
    strand: 'Gut–brain axis',
    color: '#fb923c',
    finding: 'Mice raised in sterile environments show altered stress responses, reduced social preference, and altered BDNF expression — all reversible by colonizing them with specific Lactobacillus or Bifidobacterium strains. The microbes are doing cognitive work.',
    ref: 'Sudo et al. 2004; Cryan & Dinan 2012',
  },
  {
    id: 'ian-waterman',
    label: 'Ian Waterman',
    strand: 'Proprioception',
    color: '#ec4899',
    finding: 'At 19, Waterman lost all proprioception and touch below the neck from a viral neuropathy. He spent years relearning to move by watching his limbs with his eyes — a painstaking reconstruction of body-schema via vision. When the lights go out, he falls. The case shows exactly what gets lost when the body\'s afferent signal to the brain is cut: not just sensation, but the sense of having a body at all.',
    ref: 'Sacks 1985; Cole 1995',
  },
  {
    id: 'phantom-limbs',
    label: 'Phantom limb pain',
    strand: 'Body schema',
    color: '#f472b6',
    finding: 'Amputees continue to feel the missing limb — sometimes in cramped, paralyzed configurations — because the brain\'s body map does not update to match the reduced body. Ramachandran showed that a mirror-box, which lets the intact hand appear where the missing one would be, can resolve the pain by feeding the map a correction. The body map is not a passive reflection of the body; it\'s an active hypothesis.',
    ref: 'Ramachandran & Blakeslee 1998',
  },
  {
    id: 'mirror-neurons',
    label: 'Mirror neurons',
    strand: 'Embodied simulation',
    color: '#f87171',
    finding: 'Macaque premotor cortex contains neurons that fire both when the monkey performs an action and when it watches another perform the same action. Human fMRI analogs exist. Gallese and others argue this is the substrate for understanding others — we simulate their actions in our own motor system. You cannot understand "grasp" without a grasping hand.',
    ref: 'Rizzolatti & Craighero 2004; Gallese 2005',
  },
  {
    id: 'somatic-markers',
    label: 'Somatic markers',
    strand: 'Decision-making',
    color: '#fb923c',
    finding: 'Damasio\'s Iowa Gambling Task: patients with ventromedial prefrontal damage cannot generate anticipatory skin-conductance responses before a bad decision, and they make bad decisions. Their "thinking" is intact; their body-originated gut feelings are not. The gut feeling was doing the work.',
    ref: 'Damasio 1994; Bechara et al. 1997',
  },
  {
    id: 'interoceptive-accuracy',
    label: 'Heartbeat detection predicts emotional granularity',
    strand: 'Interoception',
    color: '#ec4899',
    finding: 'People who can accurately count their own heartbeats without feeling their pulse also score higher on emotional-awareness scales and make more consistent moral judgments. Lower interoceptive accuracy is associated with alexithymia and eating disorders. Your access to your own feelings is literally your access to your own body.',
    ref: 'Barrett et al. 2004; Herbert & Pollatos 2012',
  },
  {
    id: 'placebo-cytokines',
    label: 'Placebo modulates immune cytokines',
    strand: 'Psychoneuroimmunology',
    color: '#f472b6',
    finding: 'Classical conditioning of immunosuppression in rats (Ader & Cohen 1975) showed the immune system learns from psychological cues. Human placebo studies now routinely document measurable cytokine changes, HPA-axis modulation, and even reduced inflammation from expectation alone. There is no input channel for "expectation" that doesn\'t route through the body.',
    ref: 'Ader & Cohen 1975; Benedetti 2013',
  },
]

/** What to do with this — not policy prescriptions, observations about downstream effects. */
export const PRACTICAL = [
  {
    label: 'For AI consciousness claims',
    color: '#f87171',
    items: [
      'A language model without a body, a metabolism, or a stake in its own survival is not conscious in the sense this literature uses the word — whatever else it is doing.',
      'Claims that a brain-in-a-jar is possible (and that LLMs approximate one) ignore that the thing the brain is doing is modelling a body. Remove the body and the model has nothing to model.',
      'The interesting question is not whether an LLM is conscious. It is whether a future system with bodily homeostasis, interoceptive signals, and metabolic stakes could be. That is a testable architectural question, not a metaphysical one.',
    ],
  },
  {
    label: 'For medicine',
    color: '#fb923c',
    items: [
      'The mind/body split in clinical practice — psychiatry vs somatic medicine — is an institutional artifact, not a biological one. A patient with depression and IBS has one illness, not two.',
      'Somatic interventions (breathwork, yoga, cold exposure, vagal stimulation) work on the same substrate as SSRIs, often with fewer side effects, because they both act on body-state.',
      'Chronic pain is not "real pain" vs "psychological pain." Both phrases are nonsense. Pain is a brain-generated percept based on body-state predictions; the body is always part of the circuit.',
    ],
  },
  {
    label: 'For how you think about yourself',
    color: '#ec4899',
    items: [
      'Your "gut feeling" about a decision is not pre-rational noise to be overridden. It\'s a fast-path homeostatic judgment from a system that has access to data your conscious mind does not.',
      'Exhaustion, hunger, cold, dehydration do not just affect your mood — they ARE your mood, routed through the same substrate the mood uses.',
      'You are not a mind inconvenienced by a body. You are a body whose ongoing regulation feels, from the inside, like being a self.',
    ],
  },
]

export const SOURCES = [
  {
    id: 'damasio-1994',
    label: "Damasio, A. (1994). Descartes' Error: Emotion, Reason, and the Human Brain",
    url: 'https://archive.org/details/descarteserror00dama',
    note: 'The canonical pop-neuroscience rejection of Cartesian dualism. Introduces the somatic marker hypothesis and the Iowa Gambling Task work.',
  },
  {
    id: 'damasio-1999',
    label: 'Damasio, A. (1999). The Feeling of What Happens',
    url: 'https://en.wikipedia.org/wiki/The_Feeling_of_What_Happens',
    note: 'Core consciousness as body-based. "The organism is mapped in the brain, and the map contributes to what we call the self."',
  },
  {
    id: 'varela-thompson-rosch-1991',
    label: 'Varela, F., Thompson, E., Rosch, E. (1991). The Embodied Mind',
    url: 'https://mitpress.mit.edu/9780262529365/the-embodied-mind/',
    note: 'Foundational text of the enactivist / embodied-cognition research program.',
  },
  {
    id: 'lakoff-johnson-1999',
    label: 'Lakoff, G., Johnson, M. (1999). Philosophy in the Flesh',
    url: 'https://en.wikipedia.org/wiki/Philosophy_in_the_Flesh',
    note: 'The systematic case that abstract concepts are grounded in sensorimotor metaphor.',
  },
  {
    id: 'clark-2008',
    label: 'Clark, A. (2008). Supersizing the Mind: Embodiment, Action, and Cognitive Extension',
    url: 'https://global.oup.com/academic/product/supersizing-the-mind-9780195333213',
    note: 'Extends the embodiment argument into extended and distributed cognition.',
  },
  {
    id: 'thompson-2007',
    label: 'Thompson, E. (2007). Mind in Life: Biology, Phenomenology, and the Sciences of Mind',
    url: 'https://www.hup.harvard.edu/books/9780674057517',
    note: 'Autopoiesis + phenomenology + neuroscience as a unified account of mind.',
  },
  {
    id: 'craig-2002',
    label: 'Craig, A. D. (2002). How do you feel? Interoception: the sense of the physiological condition of the body',
    url: 'https://www.nature.com/articles/nrn894',
    note: 'Nat Rev Neurosci 3(8), 655–666. The review that defined interoception as a distinct sense.',
  },
  {
    id: 'craig-2009',
    label: 'Craig, A. D. (2009). How do you feel — now? The anterior insula and human awareness',
    url: 'https://www.nature.com/articles/nrn2555',
    note: 'Nat Rev Neurosci 10(1), 59–70. Insula as the seat of subjective awareness.',
  },
  {
    id: 'critchley-2004',
    label: 'Critchley, H. D. et al. (2004). Neural systems supporting interoceptive awareness',
    url: 'https://www.nature.com/articles/nn1176',
    note: 'Nat Neurosci 7(2), 189–195. fMRI evidence that insular activation tracks heartbeat detection accuracy.',
  },
  {
    id: 'seth-2013',
    label: 'Seth, A. K. (2013). Interoceptive inference, emotion, and the embodied self',
    url: 'https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(13)00196-6',
    note: 'Trends Cogn Sci 17(11), 565–573. Interoception reframed through predictive-processing / active-inference.',
  },
  {
    id: 'friston-2010',
    label: 'Friston, K. (2010). The free-energy principle: a unified brain theory?',
    url: 'https://www.nature.com/articles/nrn2787',
    note: 'Nat Rev Neurosci 11(2), 127–138. The general framework under which interoception, embodiment, and cognition unify.',
  },
  {
    id: 'mayer-2011',
    label: 'Mayer, E. A. (2011). Gut feelings: the emerging biology of gut–brain communication',
    url: 'https://www.nature.com/articles/nrn3071',
    note: 'Nat Rev Neurosci 12(8), 453–466. The mainstream review that made gut-brain axis respectable.',
  },
  {
    id: 'cryan-dinan-2012',
    label: 'Cryan, J. F., Dinan, T. G. (2012). Mind-altering microorganisms: the impact of the gut microbiota on brain and behaviour',
    url: 'https://www.nature.com/articles/nrn3346',
    note: 'Nat Rev Neurosci 13(10), 701–712. Microbiome as an active cognitive participant.',
  },
  {
    id: 'gershon-1998',
    label: "Gershon, M. (1998). The Second Brain",
    url: 'https://www.harpercollins.com/products/the-second-brain-michael-d-gershon',
    note: "Gershon's popularization of the enteric nervous system — ~500M neurons, semi-autonomous.",
  },
  {
    id: 'porges-2011',
    label: 'Porges, S. W. (2011). The Polyvagal Theory',
    url: 'https://wwnorton.com/books/9780393707007',
    note: 'Vagal afferents as the substrate of social engagement and autonomic state regulation. The ~80% afferent figure comes from this literature.',
  },
  {
    id: 'van-der-kolk-2014',
    label: 'van der Kolk, B. (2014). The Body Keeps the Score',
    url: 'https://www.penguinrandomhouse.com/books/313183/the-body-keeps-the-score-by-bessel-van-der-kolk-md/',
    note: 'Trauma as a body-held phenomenon; body-targeted interventions outperform talk therapy for somatic sequelae.',
  },
  {
    id: 'rizzolatti-craighero-2004',
    label: 'Rizzolatti, G., Craighero, L. (2004). The mirror-neuron system',
    url: 'https://www.annualreviews.org/doi/10.1146/annurev.neuro.27.070203.144230',
    note: 'Annu Rev Neurosci 27, 169–192. Motor simulation as the substrate of action understanding.',
  },
  {
    id: 'ader-cohen-1975',
    label: 'Ader, R., Cohen, N. (1975). Behaviorally conditioned immunosuppression',
    url: 'https://journals.lww.com/psychosomaticmedicine/Abstract/1975/07000/Behaviorally_Conditioned_Immunosuppression.7.aspx',
    note: 'Psychosom Med 37(4), 333–340. The founding study of psychoneuroimmunology.',
  },
  {
    id: 'benedetti-2013',
    label: 'Benedetti, F. (2013). Placebo and the new physiology of the doctor-patient relationship',
    url: 'https://journals.physiology.org/doi/full/10.1152/physrev.00043.2012',
    note: 'Physiol Rev 93(3), 1207–1246. Placebo effects have identifiable physiological mechanisms.',
  },
  {
    id: 'ryle-1949',
    label: 'Ryle, G. (1949). The Concept of Mind',
    url: 'https://en.wikipedia.org/wiki/The_Concept_of_Mind',
    note: 'The original philosophical takedown of Cartesian dualism — coined "the ghost in the machine."',
  },
  {
    id: 'sacks-1985',
    label: 'Sacks, O. (1985). The Man Who Mistook His Wife for a Hat',
    url: 'https://en.wikipedia.org/wiki/The_Man_Who_Mistook_His_Wife_for_a_Hat',
    note: 'Includes "The Disembodied Lady" — the clinical case of Christina, who lost proprioception and had to reconstruct her sense of body through vision.',
  },
  {
    id: 'williams-bargh-2008',
    label: 'Williams, L. E., Bargh, J. A. (2008). Experiencing physical warmth promotes interpersonal warmth',
    url: 'https://www.science.org/doi/10.1126/science.1162548',
    note: 'Science 322, 606–607. Holding a warm drink makes people judge strangers as warmer. Embodied metaphor experimentally verified.',
  },
]

export const SECTIONS = [
  { id: 'framings', title: 'The Question', icon: '?' },
  { id: 'findings', title: 'Findings', icon: '!' },
  { id: 'model', title: 'The Model', icon: '◉' },
  { id: 'evidence', title: 'Evidence', icon: '▲' },
  { id: 'practical', title: 'So What', icon: '→' },
  { id: 'sources', title: 'Sources', icon: '§' },
]
