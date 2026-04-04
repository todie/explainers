/**
 * Neuroscience of Human Memory — Research Data
 *
 * Structured for React components. Every claim has a citation.
 * Designed to draw vivid parallels between biological memory
 * and AI memory systems (context windows, engram, semantic search).
 *
 * This is the section that makes people go "whoa, brains are wild."
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------















// ---------------------------------------------------------------------------
// 1. Memory Formation (Encoding)
// ---------------------------------------------------------------------------

export const MEMORY_FORMATION = [
  {
    id: "ltp",
    title: "Long-Term Potentiation — How Synapses Learn",
    description:
      "When neuron A repeatedly fires just before neuron B, the synapse between them strengthens. The presynaptic neuron releases more glutamate, the postsynaptic neuron grows more AMPA receptors, and — if the signal is strong enough — NMDA receptors open, flooding the cell with calcium. That calcium triggers gene expression that physically grows new synaptic connections. The neurons are literally rewiring themselves in real time. This is LTP: fire together, wire together. It's not a metaphor. It's structural change at the molecular level.",
    mechanism:
      "Hebbian learning via NMDA receptor activation → calcium influx → CREB-mediated gene expression → new dendritic spine growth. Early-phase LTP (1-3 hours) modifies existing proteins. Late-phase LTP (>3 hours) requires new protein synthesis — the memory is physically built into the architecture of the neuron.",
    vividDetail:
      "A single hippocampal neuron has ~10,000 synapses. LTP can selectively strengthen a handful of them while leaving the rest untouched — like highlighting specific lines in a 10,000-line codebase without touching the rest. The precision is staggering.",
    aiParallel:
      "LTP is gradient descent in slow motion. Each experience adjusts connection weights. But biological LTP is local and immediate — no backward pass through the entire network. More like an online learning rule than batch training.",
    source: {
      label: "Bliss & Lømo — Long-lasting potentiation of synaptic transmission in the dentate area of the anaesthetized rabbit, Journal of Physiology",
      url: "https://doi.org/10.1113/jphysiol.1973.sp010273",
      year: 1973,
    },
    color: "#60a5fa",
  },
  {
    id: "hippocampus-buffer",
    title: "The Hippocampus — Your Brain's Context Window",
    description:
      "The hippocampus is a seahorse-shaped structure deep in the medial temporal lobe, and it is the bottleneck through which all new explicit memories must pass. It doesn't store memories permanently — it's a rapid-learning temporary buffer that binds together the where, when, what, and who of an experience into a coherent episode. Think of it as a scratch pad that holds the current scene while the slow-learning neocortex gradually absorbs the pattern. Without it, you can recall old memories but can't form new ones — you're stuck in an eternal present.",
    mechanism:
      "The hippocampus uses pattern separation (dentate gyrus) to create distinct representations of similar experiences, and pattern completion (CA3 recurrent network) to reconstruct whole memories from partial cues. It binds distributed cortical representations into a unified memory trace via the entorhinal cortex relay.",
    vividDetail:
      "The hippocampus replays experiences during sleep at 5-20x speed — like a video editor scrubbing through footage on fast-forward. Each replay strengthens the neocortical traces a little more. After enough replays, the neocortex holds the memory independently and the hippocampus can release it. This transfer takes days to years.",
    aiParallel:
      "The hippocampus IS the context window. Limited capacity, fast access, temporary storage, everything-in-one-place. When the context window fills and compaction happens, that's sleep consolidation — the important stuff migrates to long-term storage (engram/filesystem) and the buffer clears.",
    source: {
      label: "Squire, L.R. — Memory and the Hippocampus: A Synthesis From Findings With Rats, Monkeys, and Humans, Psychological Review",
      url: "https://doi.org/10.1037/0033-295X.99.2.195",
      year: 1992,
    },
    color: "#a855f7",
  },
  {
    id: "encoding-specificity",
    title: "Encoding Specificity — Context Is the Key",
    description:
      "Endel Tulving's encoding specificity principle: a memory is stored with the context in which it was formed, and that context becomes part of the retrieval key. Divers who learned word lists underwater recalled them better underwater. Students who studied in a particular room performed better when tested in that same room. The environment, your mood, even the background music — all get woven into the memory trace. The memory isn't just the fact; it's the fact + everything around it.",
    mechanism:
      "During encoding, the hippocampus binds the target information with contextual features (spatial, temporal, emotional, semantic). At retrieval, matching context reactivates the full bound representation. Mismatched context means the retrieval cue doesn't align with the stored pattern — the key doesn't fit the lock.",
    vividDetail:
      "Godden & Baddeley's 1975 diving experiment: divers learned 40 words either on land or 20 feet underwater. Words learned underwater were recalled 50% better underwater than on land, and vice versa. The water itself became part of the memory address.",
    aiParallel:
      "This is why semantic search with context metadata (project, session, topic_key) outperforms raw keyword search. The observation \"use VACUUM after bulk deletes\" is more retrievable when stored with project=engram, scope=technical — the context IS the retrieval key, just like in the brain.",
    source: {
      label: "Tulving, E. & Thomson, D.M. — Encoding Specificity and Retrieval Processes in Episodic Memory, Psychological Review",
      url: "https://doi.org/10.1037/h0020071",
      year: 1973,
    },
    color: "#22c55e",
  },
  {
    id: "attention-gate",
    title: "Attention as Gatekeeper — You Only Encode What You Notice",
    description:
      "Attention is the bouncer at the door of memory. Without it, sensory information washes through working memory and vanishes. The famous 'invisible gorilla' experiment proved this brutally: 50% of people watching a basketball passing video completely failed to see a person in a gorilla suit walk through the scene, stop, beat their chest, and walk off. They weren't blind — they were attending to something else. Unattended information doesn't get encoded. Period.",
    mechanism:
      "The prefrontal cortex directs attention, which modulates activity in sensory cortices via top-down signals. Attended stimuli produce stronger, more synchronized neural firing, leading to better hippocampal encoding. The thalamic reticular nucleus acts as an attention filter, gating what reaches cortex. Divided attention during encoding dramatically reduces subsequent recall — the hippocampus needs focused input to bind effectively.",
    vividDetail:
      "Craik et al. (1996) showed that dividing attention during encoding reduced later recall by 30-46%, but dividing attention during retrieval had almost no effect. The bottleneck is getting information IN, not getting it OUT. This is why you can't remember where you put your keys — you weren't paying attention when you set them down.",
    aiParallel:
      "This is the save-or-drop decision. An AI memory system that saves everything is like a brain with no attention filter — drowning in noise. The engram protocol's proactive save rule (save decisions, bugs, discoveries) is attention gating: you decide what's worth encoding based on significance, not recency.",
    source: {
      label: "Simons, D.J. & Chabris, C.F. — Gorillas in Our Midst: Sustained Inattentional Blindness for Dynamic Events, Perception",
      url: "https://doi.org/10.1068/p281059",
      year: 1999,
    },
    color: "#facc15",
  },
  {
    id: "emotional-tagging",
    title: "Emotional Tagging — The Amygdala's Priority Stamp",
    description:
      "Everyone remembers where they were on 9/11 or when they got the phone call about a loved one. Emotional events get a priority stamp from the amygdala — a small almond-shaped structure that sits right next to the hippocampus and modulates its encoding strength. When the amygdala fires, it triggers norepinephrine release that tells the hippocampus: \"this matters, write it down in permanent ink.\" The result: emotional memories are encoded faster, consolidated more aggressively during sleep, and retrieved more easily — sometimes involuntarily, as in PTSD flashbacks.",
    mechanism:
      "The amygdala's basolateral nucleus detects emotional significance and triggers noradrenergic modulation of hippocampal consolidation via the locus coeruleus. Stress hormones (cortisol, norepinephrine) enhance synaptic consolidation in the hours after encoding. The amygdala also directly strengthens connections with sensory cortices, which is why emotional memories feel more vivid and sensory-rich.",
    vividDetail:
      "Cahill & McGaugh (1995) told two groups the same 12-slide story. One version had a neutral middle section; the other had an emotionally arousing middle (a boy is in a terrible accident). Two weeks later, the emotional group remembered the middle slides perfectly while the neutral group had largely forgotten them. The story bookends (same for both groups) were remembered equally. Emotion doesn't boost all memory — it spotlights specific moments.",
    aiParallel:
      "This maps to priority scoring in memory systems. Not all observations are equal — a critical bug fix, a fundamental architecture decision, a breaking API change should be encoded with higher weight than routine log entries. The amygdala is a relevance classifier. AI memory needs one too.",
    source: {
      label: "McGaugh, J.L. — Memory — a Century of Consolidation, Science",
      url: "https://doi.org/10.1126/science.287.5451.248",
      year: 2000,
    },
    color: "#f87171",
  },
  {
    id: "sleep-consolidation",
    title: "Sleep Consolidation — The Nightly Backup Job",
    description:
      "While you sleep, your brain runs a consolidation pipeline that would make any DevOps engineer jealous. During slow-wave sleep (deep sleep), the hippocampus replays the day's experiences in compressed bursts called sharp-wave ripples — the same neural firing patterns from waking experience, but at 5-20x speed. These replays are synchronized with neocortical slow oscillations and thalamic sleep spindles in a precise temporal dance. The result: memories gradually transfer from hippocampal-dependent (fragile, context-bound) to neocortical (stable, generalized, integrated with existing knowledge). Skip sleep and the transfer fails — the memories stay fragile or decay entirely.",
    mechanism:
      "Three nested oscillations coordinate the transfer: (1) Neocortical slow oscillations (~0.75 Hz) create alternating UP and DOWN states, (2) Thalamic sleep spindles (12-15 Hz) nest within the UP states, (3) Hippocampal sharp-wave ripples (80-120 Hz) nest within the spindles. This temporal nesting creates a relay: hippocampus → thalamus → neocortex. Memories replay in temporally compressed sequences, strengthening neocortical traces through repeated activation.",
    vividDetail:
      "Matt Walker's lab at UC Berkeley showed that a 90-minute nap containing sleep spindles improved fact recall by 20% compared to an equivalent period of waking rest. The spindle-rich sleep specifically enhanced the transfer from hippocampus to neocortex — you could see it on the fMRI. The hippocampus was less active post-nap for those memories, meaning the neocortex had taken over. The backup was complete.",
    aiParallel:
      "Sleep consolidation IS session-end summarization. The brain reviews the day's experiences, extracts what matters, integrates it with existing knowledge, and discards the noise. mem_session_summary does exactly this: it compresses the session's events into structured observations that migrate from the ephemeral context window to persistent storage. The context window clears (you wake up), but the important stuff survived.",
    source: {
      label: "Diekelmann, S. & Born, J. — The Memory Function of Sleep, Nature Reviews Neuroscience",
      url: "https://doi.org/10.1038/nrn2762",
      year: 2010,
    },
    color: "#c084fc",
  },
];

// ---------------------------------------------------------------------------
// 2. Memory Retrieval
// ---------------------------------------------------------------------------

export const RETRIEVAL_MECHANISMS = [
  {
    id: "cue-dependent",
    title: "Cue-Dependent Retrieval — You Need the Right Key",
    description:
      "Memories aren't stored like files in a folder where you can browse to them. They're stored as distributed patterns that require the right activation key — a cue — to reconstruct. Tulving showed that information that is 'available' in memory (it's in there somewhere) is not necessarily 'accessible' (you can't get to it). The right cue bridges the gap. A word, a smell, a fragment of melody — any element that was encoded with the original experience can serve as a retrieval cue, pulling the whole memory back into consciousness.",
    example:
      "Proust's madeleine: dipping a cookie into lime-blossom tea triggered an involuntary cascade of childhood memories so vivid and complete that it spawned seven volumes of literature. The taste was the cue; the entire world of Combray was the retrieved memory. This isn't literary exaggeration — odor-evoked memories are genuinely more vivid and emotional than memories triggered by other cue types (Herz & Schooler, 2002).",
    aiParallel:
      "This is semantic search. You don't retrieve a memory by its storage address — you retrieve it by matching a query (cue) against stored content. The better the cue matches the encoding context, the better the retrieval. 'mem search architecture decision engram' works because it provides multiple overlapping cues, just like how a combination of smell + place + emotion triggers a stronger memory than any single cue alone.",
    source: {
      label: "Tulving, E. — Cue-Dependent Forgetting, American Scientist",
      url: "https://doi.org/10.1037/h0020071",
      year: 1974,
    },
    color: "#60a5fa",
  },
  {
    id: "pattern-completion",
    title: "Pattern Completion — Whole Memory from a Fragment",
    description:
      "The hippocampal CA3 region is an autoassociative network — it stores complete patterns and can reconstruct the whole thing from a partial input. Show someone the first three notes of 'Happy Birthday' and their brain completes the entire melody, the candles, the cake, their sixth birthday party. This is pattern completion: the hippocampus takes a fragment and fills in the rest by reactivating the full original firing pattern. It's the brain's version of auto-complete, but for entire experiences.",
    example:
      "Walk into your grandmother's kitchen. The smell of her specific brand of dish soap activates a pattern in your hippocampus. Suddenly you're not just smelling soap — you're eight years old, it's Sunday afternoon, she's making pot roast, you can hear the clock ticking, and you feel the linoleum under your bare feet. One sensory fragment reconstructed a complete multi-modal experience. That's pattern completion.",
    aiParallel:
      "This is gestalt retrieval — the core thesis of the gestalt cognition explainer. A partial cue (a few keywords, a project name) should retrieve a coherent whole (the full decision, the complete context). FTS5 full-text search does a crude version of this, but true pattern completion would mean: given 'that caching bug we fixed last week,' retrieve the complete observation with error message, root cause, fix, and follow-up tasks.",
    source: {
      label: "Marr, D. — Simple Memory: A Theory for Archicortex, Philosophical Transactions of the Royal Society B",
      url: "https://doi.org/10.1098/rstb.1971.0078",
      year: 1971,
    },
    color: "#a855f7",
  },
  {
    id: "reconsolidation",
    title: "Reconsolidation — Memories Mutate on Access",
    description:
      "Here's the mind-bending part: every time you retrieve a memory, it becomes temporarily unstable and must be re-stored. During this reconsolidation window (lasting minutes to hours), the memory is malleable — it can be updated, strengthened, weakened, or contaminated with new information. Your memory of your wedding day isn't the original recording; it's the version you reconstructed last time you thought about it, with whatever emotions and knowledge you had at that point mixed in. Memories are not recordings. They're living documents under perpetual revision.",
    example:
      "Nader, Schacter & Le Doux (2000) trained rats to fear a tone paired with a shock. When they later played the tone (reactivating the fear memory) and immediately injected a protein-synthesis inhibitor, the fear memory was erased — not just suppressed, but gone. The memory had to be reconsolidated after retrieval, and blocking protein synthesis during that window prevented re-storage. This was revolutionary: it meant memories aren't permanent records. They're rebuilt every time.",
    aiParallel:
      "This is mem_update. When you retrieve an observation and update it with new context (a bug fix that turned out to have a deeper root cause, an architecture decision that evolved), you're performing reconsolidation. The original observation is modified by the act of accessing and updating it. The engram upsert model (same topic_key = update, not duplicate) mirrors this: memories consolidate rather than proliferate.",
    source: {
      label: "Nader, K., Schacter, G.E. & Le Doux, J.E. — Fear Memories Require Protein Synthesis in the Amygdala for Reconsolidation after Retrieval, Nature",
      url: "https://doi.org/10.1038/35021052",
      year: 2000,
    },
    color: "#22c55e",
  },
  {
    id: "tip-of-tongue",
    title: "Tip-of-the-Tongue — The Index Exists but Retrieval Fails",
    description:
      "You know you know it. You can feel the shape of the word. You know it starts with a 'C,' it's three syllables, it's related to architecture... but you can't produce it. The tip-of-the-tongue state (TOT) reveals that memory has layers: there's a meta-memory layer (you know you have the knowledge), a partial-feature layer (fragments like first letter, syllable count, semantic field), and the full phonological form. TOT happens when the index works but the final retrieval step fails — like having the right search query return 'I found 3 results' but refusing to show them.",
    example:
      "Brown & McNeill (1966) induced TOT states by reading definitions of uncommon words ('a small boat used in the Levant'). Subjects in TOT could identify the first letter (70% accuracy), the number of syllables (60% accuracy), and similar-sounding words — all without producing the target word ('sampan'). The metadata was accessible even when the content wasn't. The file exists; the download is corrupted.",
    aiParallel:
      "Every developer has experienced the AI memory version of TOT: you know the agent discussed a specific pattern three sessions ago, you can describe what it was about, but the search query returns nothing useful. The observation exists in engram, but the retrieval cues don't match the encoding. This is why topic_key conventions and structured metadata matter — they create reliable indices that survive cue mismatch.",
    source: {
      label: "Brown, R. & McNeill, D. — The 'Tip of the Tongue' Phenomenon, Journal of Verbal Learning and Verbal Behavior",
      url: "https://doi.org/10.1016/S0022-5371(66)80040-3",
      year: 1966,
    },
    color: "#facc15",
  },
  {
    id: "context-dependent",
    title: "Context-Dependent Memory — Same Room, Better Recall",
    description:
      "Smith, Glenberg & Bjork (1978) had students learn word lists in a distinctive room (cluttered basement with specific posters and smells). When tested in the same room, they recalled 18% more than those tested in a different room. Even mentally reinstating the original context ('imagine yourself back in that room') improved recall significantly, though not as much as physical return. The environment acts as a diffuse retrieval cue — the brain encoded the context along with the content, and matching context facilitates retrieval.",
    example:
      "Police use this principle in cognitive interviews: asking witnesses to mentally reconstruct the scene (time of day, weather, how they were feeling, what they were doing just before) before asking about the crime. This context reinstatement reliably increases recall accuracy by 25-35% compared to standard questioning. The witness hasn't suddenly gained new memories — the right retrieval context unlocked memories that were always there.",
    aiParallel:
      "This is why project-scoped memory outperforms global memory. When you search within project=engram, you're reinstating the project context, and observations encoded in that context become more accessible. It's also why session_start matters — it establishes a context frame that makes session-relevant memories more retrievable, just like walking back into the same room.",
    source: {
      label: "Smith, S.M., Glenberg, A.M. & Bjork, R.A. — Environmental Context and Human Memory, Memory & Cognition",
      url: "https://doi.org/10.3758/BF03197465",
      year: 1978,
    },
    color: "#f87171",
  },
];

// ---------------------------------------------------------------------------
// 3. Forgetting
// ---------------------------------------------------------------------------

export const FORGETTING = [
  {
    id: "ebbinghaus-curve",
    title: "The Forgetting Curve — Ebbinghaus's Brutal Numbers",
    description:
      "In 1885, Hermann Ebbinghaus memorized lists of nonsense syllables (DAX, BUP, ZOL) and tested himself at intervals. His data was devastating: memory decays exponentially. You don't gradually lose information — you hemorrhage it. The steepest drop happens in the first hour, then the curve flattens as only the most durable traces survive. This isn't failure — it's a feature. The brain is aggressively pruning information that isn't reinforced, making room for what matters.",
    data:
      "20 minutes: 42% forgotten. 1 hour: 56% forgotten. 9 hours: 64% forgotten. 1 day: 67% forgotten. 2 days: 72% forgotten. 6 days: 75% forgotten. 31 days: 79% forgotten. The retention formula: R = e^(-t/S) where R is retention, t is time, and S is the stability of the memory (how well it was encoded).",
    counterStrategy:
      "Spaced repetition exploits the forgetting curve by reviewing information just before it would be forgotten, each time extending the interval. After 5-6 optimally spaced reviews, a memory's stability increases so much that the next review isn't needed for months or years.",
    aiParallel:
      "Context window content follows this curve exactly. The most recent information is strongest; older context becomes progressively less influential in generation. Compaction is the AI version of forgetting — deliberate pruning that preserves the 21% that matters while dropping the 79% that was noise. Without compaction (forgetting), the context window would be an undifferentiated wall of text with no salience gradient.",
    source: {
      label: "Ebbinghaus, H. — Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie (Memory: A Contribution to Experimental Psychology)",
      url: "https://psychclassics.yorku.ca/Ebbinghaus/",
      year: 1885,
    },
    color: "#f87171",
  },
  {
    id: "interference",
    title: "Interference — Memories Overwriting Memories",
    description:
      "There are two kinds of interference, and both are insidious. Proactive interference: old memories block new learning (you keep writing your old password after changing it). Retroactive interference: new memories corrupt old ones (after learning your new phone number, you can't remember the old one). The brain doesn't have infinite non-overlapping address space — similar memories compete for the same neural real estate. The more similar two memories are, the more they interfere. This is why learning Spanish after French is harder than learning Japanese after French — similarity breeds confusion.",
    data:
      "Anderson & Neely (1996) showed that practicing retrieval of some items from a category (fruits: ORANGE, APPLE) caused 20-30% forgetting of unpracticed items from the same category (fruits: BANANA, GRAPE) — a phenomenon called retrieval-induced forgetting. Strengthening some memories literally weakens their neighbors.",
    counterStrategy:
      "Interleaving — mixing different topics during study — reduces interference by forcing the brain to build more distinctive representations. Instead of studying all Spanish then all French, alternate between them. Each switch forces deeper encoding of what makes each language distinct.",
    aiParallel:
      "This is the topic_key collision problem. If multiple observations share nearly identical content and metadata, they interfere with each other during retrieval — search returns a jumble of similar but not identical results. The engram upsert model (same topic_key = update, not new entry) is an anti-interference mechanism: it merges similar memories rather than letting them compete.",
    source: {
      label: "Anderson, M.C., Bjork, R.A. & Bjork, E.L. — Remembering Can Cause Forgetting: Retrieval Dynamics in Long-Term Memory, Journal of Experimental Psychology: Learning, Memory, and Cognition",
      url: "https://doi.org/10.1037/0278-7393.20.5.1063",
      year: 1994,
    },
    color: "#facc15",
  },
  {
    id: "spaced-repetition",
    title: "Spaced Repetition — The Spacing Effect",
    description:
      "One of the most robust findings in all of cognitive science: spreading study over time (distributed practice) produces dramatically better retention than cramming (massed practice). Cepeda et al. (2006) meta-analyzed 317 experiments spanning a century and found that the optimal gap between study sessions increases proportionally with the desired retention interval. Want to remember something for a week? Review it after 1-2 days. For a year? Review after 2-4 weeks. The spacing effect works because each retrieval at increasing intervals forces harder reconstruction, building stronger traces — like progressively heavier weight training for memory.",
    data:
      "Cepeda's optimal gap ratios: for a 7-day retention target, the optimal study gap is 1 day (20-30% improvement over massed practice). For a 35-day retention target, optimal gap is 11 days. For a 350-day retention target, optimal gap is 21 days. Diminishing returns beyond the optimal gap — spacing too widely loses the benefit.",
    counterStrategy:
      "Systems like Anki, SuperMemo, and Leitner boxes implement algorithmic spaced repetition with adaptive intervals. Each successful recall doubles (approximately) the interval to next review. Each failure resets it. The algorithm converges on the minimum number of reviews needed to maintain near-perfect retention.",
    aiParallel:
      "AI memory systems don't naturally do spaced repetition — but they could. Observations that are retrieved frequently could have their stability scores increased, making them surface more readily. Observations that are never retrieved could decay in ranking. The monthly maintenance VACUUM cycle is a crude version: periodically revisiting and pruning the memory store.",
    source: {
      label: "Cepeda, N.J. et al. — Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis, Psychological Bulletin",
      url: "https://doi.org/10.1037/0033-2909.132.3.354",
      year: 2006,
    },
    color: "#22c55e",
  },
  {
    id: "testing-effect",
    title: "The Testing Effect — Retrieval Practice Beats Re-Reading",
    description:
      "Roediger & Karpicke (2006) ran an elegant experiment: students either studied a passage four times (SSSS) or studied once and took three practice tests (STTT). Five minutes later, the study group performed slightly better. But after one week, the testing group outperformed the study group by 50%. Retrieving a memory strengthens it far more than passively re-exposing yourself to it. Every retrieval is a mini-encoding event that adds new connections and retrieval routes. The effort of pulling information out of memory — even when it's difficult — is what makes it stick.",
    data:
      "The magnitude is striking: after 1 week, the STTT group recalled 56% of the material vs. 42% for the SSSS group. After 2 months (Karpicke & Roediger, 2008), the gap widened further. Testing with feedback was even more powerful — errors corrected during testing were remembered better than items that were never gotten wrong.",
    counterStrategy:
      "Implication: re-reading notes is one of the least effective study strategies. Self-quizzing, flashcards, free recall (close the book and write what you remember), and practice problems all leverage the testing effect. The harder the retrieval, the stronger the benefit — a phenomenon called 'desirable difficulty.'",
    aiParallel:
      "When an AI agent searches memory before executing a task, that retrieval act is strengthening the relevance of the returned observations — they become more 'primed' for the current context. An AI system that proactively retrieves and uses its memories builds stronger associations than one that simply stores observations passively. Use strengthens memory; storage alone doesn't.",
    source: {
      label: "Roediger, H.L. & Karpicke, J.D. — Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention, Psychological Science",
      url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      year: 2006,
    },
    color: "#60a5fa",
  },
  {
    id: "decay-vs-interference",
    title: "Decay vs. Interference — Why Do We Forget?",
    description:
      "The oldest debate in memory research: does forgetting happen because memory traces simply fade over time (decay theory), or because other memories get in the way (interference theory)? The evidence tilts heavily toward interference. Jenkins & Dallenbach (1924) found that people forgot less during sleep than during waking hours — not because sleep preserved memories (though it does), but because sleep reduced the interference from new experiences. If decay were the primary mechanism, sleeping vs. waking shouldn't matter — the same time passes either way. But it does matter, enormously.",
    data:
      "Jenkins & Dallenbach: after 8 hours of sleep, subjects recalled ~6 of 10 syllables. After 8 hours awake, only ~1 of 10. Same time, radically different retention — because waking hours filled the brain with competing memories while sleep did not. Modern neuroscience suggests both mechanisms operate: some traces decay without reinforcement (use-it-or-lose-it), but interference is the dominant cause of everyday forgetting.",
    aiParallel:
      "In AI memory, 'decay' is TTL-based expiration (observations auto-delete after N days). 'Interference' is relevance dilution — as more observations accumulate, search quality degrades because similar entries compete for ranking. Both are real problems. Engram's topic_key upsert model fights interference (merge, don't accumulate). TTL or manual pruning fights decay. The maintenance protocol addresses both.",
    source: {
      label: "Jenkins, J.G. & Dallenbach, K.M. — Obliviscence During Sleep and Waking, American Journal of Psychology",
      url: "https://doi.org/10.2307/1414040",
      year: 1924,
    },
    color: "#c084fc",
  },
];

// ---------------------------------------------------------------------------
// 4. Memory Systems (Tulving + Baddeley)
// ---------------------------------------------------------------------------

export const MEMORY_SYSTEMS = [
  {
    id: "episodic",
    title: "Episodic Memory",
    whatItStores: "Events, experiences, autobiographical episodes",
    brainRegion: "Hippocampus + medial temporal lobe (encoding & retrieval), prefrontal cortex (temporal ordering)",
    description:
      "Episodic memory is mental time travel — the ability to re-experience past events from your own perspective, complete with sensory details, emotions, and temporal context. When you remember your first day of college, you're not recalling abstract facts — you're reliving the experience: the nervous feeling, the crowded hallway, the professor's voice. Endel Tulving proposed episodic memory as distinct from semantic memory in 1972, and it remains one of the most important distinctions in cognitive science. It's uniquely human in its richness (though some animals show simpler forms).",
    example:
      "'Last Tuesday, I was debugging the auth middleware in the coffee shop when I realized the token was expiring during the redirect. I remember the barista dropping a cup right as it clicked.' — Time-stamped, placed, first-person, emotionally tagged.",
    aiAnalog: "Session logs / conversation transcripts",
    aiAnalogDetail:
      "Each AI session IS an episode — it has a start time, a sequence of events, emotional valence (frustration from errors, satisfaction from shipping), and a unique context. Session transcripts are episodic memory. mem_session_summary is episodic consolidation: compressing the raw experience into a retrievable summary while preserving the narrative arc.",
    source: {
      label: "Tulving, E. — Episodic and Semantic Memory, in Organization of Memory (eds. Tulving & Donaldson)",
      url: "https://doi.org/10.1017/S0140525X00047257",
      year: 1972,
    },
    color: "#60a5fa",
  },
  {
    id: "semantic",
    title: "Semantic Memory",
    whatItStores: "Facts, concepts, general knowledge — decontextualized",
    brainRegion: "Anterior temporal lobe (semantic hub), distributed neocortical networks",
    description:
      "Semantic memory is knowledge stripped of personal context. You know that Paris is the capital of France without remembering when or where you learned it. You know what a dog is without recalling any specific dog encounter. Semantic memories begin as episodic memories — you DID learn about Paris at some point — but through repeated exposure and consolidation, the factual core separates from the experiential context. The fact becomes free-floating knowledge. This is arguably the most important transformation in memory: experience becomes wisdom.",
    example:
      "'VACUUM should be run after bulk deletes in SQLite to reclaim space and rebuild the FTS5 index.' — No memory of when I learned this. No timestamp. No session context. Just knowledge.",
    aiAnalog: "Engram observations / documented decisions",
    aiAnalogDetail:
      "Engram observations ARE semantic memory. When you save 'pattern: use topic_key for upsert, not new entry', that's a fact extracted from an episode and stored context-free. It's retrievable by content, not by when you learned it. The progression from episodic to semantic is exactly: session transcript (episodic) → session summary → observation (semantic). Each step strips context and preserves knowledge.",
    source: {
      label: "Patterson, K., Nestor, P.J. & Rogers, T.T. — Where Do You Know What You Know? The Representation of Semantic Knowledge in the Human Brain, Nature Reviews Neuroscience",
      url: "https://doi.org/10.1038/nrn2277",
      year: 2007,
    },
    color: "#a855f7",
  },
  {
    id: "procedural",
    title: "Procedural Memory",
    whatItStores: "Skills, habits, motor sequences — 'how to'",
    brainRegion: "Basal ganglia (habit formation), cerebellum (motor coordination), motor cortex",
    description:
      "Procedural memory is the memory of how to do things — riding a bike, typing on a keyboard, playing a guitar chord. It's acquired through repetition, expressed through performance, and largely unconscious. You can't articulate how you ride a bike (try explaining it to someone who's never ridden), but your body knows. Patient H.M. — who lost the ability to form new episodic or semantic memories — could still learn new motor skills. He improved at mirror-drawing over days while having no memory of ever practicing. This proved procedural memory is a separate system entirely.",
    example:
      "A developer's procedural memory: your fingers know vim keybindings, git command sequences, and the muscle memory of Ctrl+S after every edit. You don't think about these — they're automatic. If asked to list all your keyboard shortcuts, you'd struggle. But put your hands on the keyboard and they flow.",
    aiAnalog: "Learned code patterns / tool-use sequences",
    aiAnalogDetail:
      "An AI agent's 'procedural memory' is its trained capability — the model weights that encode how to write code, how to use tools, how to structure a git commit. These aren't stored in engram or the context window; they're baked into the model itself through training. Fine-tuning would be the equivalent of procedural learning. CLAUDE.md conventions are a hybrid — explicit procedural instructions that approximate the implicit knowledge of trained procedures.",
    source: {
      label: "Squire, L.R. — Declarative and Nondeclarative Memory: Multiple Brain Systems Supporting Learning and Memory, Journal of Cognitive Neuroscience",
      url: "https://doi.org/10.1162/jocn.1992.4.3.232",
      year: 1992,
    },
    color: "#22c55e",
  },
  {
    id: "working-memory",
    title: "Working Memory",
    whatItStores: "Currently active information — the contents of consciousness",
    brainRegion: "Prefrontal cortex (central executive), left hemisphere (phonological), right hemisphere + parietal (visuospatial)",
    description:
      "Baddeley & Hitch's (1974) working memory model replaced the old idea of a single 'short-term memory' with a multi-component system: a central executive (attention controller), a phonological loop (inner speech — why you can hear your own voice reading this), a visuospatial sketchpad (mental imagery), and an episodic buffer (integrates information across domains). The critical finding: capacity is brutally limited. George Miller's 'magical number seven, plus or minus two' (1956) was later revised by Cowan (2001) to about 4 chunks — four independent items held simultaneously. That's it. Four. Everything else is chunking, rehearsal, and offloading.",
    example:
      "Try multiplying 47 × 83 in your head. You need to hold the partial products (47 × 80 = 3,760; 47 × 3 = 141) while computing the sum. Most people fail because the partial products exceed working memory capacity. Write them down (offload to external memory) and it's trivial. This is why we invented paper.",
    aiAnalog: "Context window",
    aiAnalogDetail:
      "The context window IS working memory. It holds currently active information, has a hard capacity limit (tokens instead of chunks), uses attention mechanisms (literally — transformer attention) to maintain and manipulate that information, and loses everything when the session ends (unless consolidated to long-term storage). The 200K token limit in Claude is working memory — vast compared to human 4-chunk capacity, but fundamentally the same constraint: finite space, active contents only, everything else must be stored elsewhere or lost.",
    source: {
      label: "Baddeley, A.D. & Hitch, G.J. — Working Memory, in The Psychology of Learning and Motivation (ed. Bower)",
      url: "https://doi.org/10.1016/S0079-7421(08)60452-1",
      year: 1974,
    },
    color: "#facc15",
  },
];

// ---------------------------------------------------------------------------
// 5. Wild Facts (Visual-Worthy)
// ---------------------------------------------------------------------------

export const WILD_FACTS = [
  {
    id: "sleep-replay",
    title: "Your Brain Replays the Day at 20x Speed",
    description:
      "During slow-wave sleep, the hippocampus replays neural firing sequences from waking experience — but compressed to 5-20x speed. Wilson & McNaughton (1994) recorded from rat hippocampal place cells during maze-running, then during subsequent sleep. The same firing sequences appeared in the same order, but time-compressed. The rats were literally re-running the maze in their sleep. Human neuroimaging studies (Peigneux et al., 2004) showed the same: brain regions active during a spatial navigation task reactivated during subsequent deep sleep, and the degree of reactivation predicted next-day performance improvement.",
    whyItMatters:
      "This is the biological mechanism of memory consolidation. The brain doesn't just passively store — it actively rehearses, replays, and reorganizes. Every night, you run an optimization pass on the day's experiences.",
    visualHint:
      "Animation: a maze being solved in real-time, then the same path replaying at 20x speed with a 'sleep' overlay. Firing neurons pulse in sequence, faster and faster.",
    source: {
      label: "Wilson, M.A. & McNaughton, B.L. — Reactivation of Hippocampal Ensemble Memories During Sleep, Science",
      url: "https://doi.org/10.1126/science.8036517",
      year: 1994,
    },
    color: "#c084fc",
  },
  {
    id: "distributed-storage",
    title: "No Memory Lives in One Place",
    description:
      "A single memory of your birthday party is distributed across millions of neurons in different brain regions: visual cortex stores the cake's appearance, auditory cortex stores 'Happy Birthday,' motor cortex stores blowing out candles, amygdala stores the joy, prefrontal cortex stores the temporal context. The hippocampus held the index that bound them together during consolidation, but the mature memory is a distributed pattern with no single address. Destroy any one region and you lose an aspect of the memory — its color, its sound, its emotion — but not the whole thing. Memories are holograms, not photographs.",
    whyItMatters:
      "This is why brain damage causes specific, partial memory deficits rather than deleting specific memories entirely. A stroke in visual cortex might make all your memories lose their color, but you'd still remember the events. It's also why memories are so robust — redundancy through distribution.",
    visualHint:
      "Interactive brain diagram: tap different regions and see which aspect of a single memory lights up. Tap visual cortex → 'the cake was chocolate with blue candles.' Tap auditory cortex → 'they sang slightly off-key.' All regions together → the full experience.",
    source: {
      label: "Damasio, A.R. — Time-Locked Multiregional Retroactivation: A Systems-Level Proposal for the Neural Substrates of Recall and Recognition, Cognition",
      url: "https://doi.org/10.1016/0010-0277(89)90005-X",
      year: 1989,
    },
    color: "#60a5fa",
  },
  {
    id: "energy-efficiency",
    title: "20 Watts for a Lifetime of Memories",
    description:
      "The human brain consumes about 20 watts of power — roughly equivalent to a dim light bulb — and with that budget stores an estimated 2.5 petabytes of information over a lifetime (Merkle, 2016 estimate based on synapse count and information capacity per synapse). For comparison, a single NVIDIA H100 GPU draws 700 watts to run inference on a model that has, at most, a few terabytes of effective knowledge. The brain is approximately 1,000x more energy-efficient per bit of stored information. And it runs on glucose, not electricity.",
    whyItMatters:
      "Evolution optimized for energy efficiency above all else. The brain's computational tricks — sparse coding, predictive processing, sleep consolidation — are all energy-saving strategies. AI hardware is currently brute-forcing through problems that biology solved elegantly through 500 million years of iteration.",
    visualHint:
      "Side-by-side comparison: a light bulb (20W) labeled 'brain — 2.5 PB, 80+ years of memories' vs. a GPU rack (thousands of watts) labeled 'AI — a few TB, no persistent memory without external systems.'",
    source: {
      label: "Merkle, R.C. — Energy Limits on the Computational Capacity of the Human Brain, Foresight Institute",
      url: "https://www.foresight.org/brain.html",
      year: 2016,
    },
    color: "#22c55e",
  },
  {
    id: "patient-hm",
    title: "Patient H.M. — The Man Trapped in the Present",
    description:
      "In 1953, Henry Molaison (known as H.M. until his death in 2008) had his hippocampi surgically removed to treat severe epilepsy. The seizures stopped. So did his ability to form new long-term memories. For the remaining 55 years of his life, every conversation was his first. He could not remember his doctor's name despite meeting her thousands of times. He could read the same magazine repeatedly, each time with fresh interest. His old memories (pre-surgery) were largely intact — proving the hippocampus is needed for encoding, not storage. He could still learn new motor skills (procedural memory), proving that skill learning bypasses the hippocampus entirely.",
    whyItMatters:
      "H.M. is the single most important case study in the history of memory neuroscience. He proved that memory is not one thing — it's multiple systems with different neural substrates. He showed that the hippocampus is specifically required for converting experiences into lasting memories. Without it, you're conscious, intelligent, articulate — but stuck in an eternal present tense.",
    visualHint:
      "Timeline visualization: H.M.'s life with a sharp cut at 1953. Before: rich, accessible memories (shown in vivid color). After: no new memories form (shown in grayscale that fades immediately). One exception: a procedural memory path (mirror-drawing skill) shown accumulating despite the amnesia.",
    source: {
      label: "Scoville, W.B. & Milner, B. — Loss of Recent Memory After Bilateral Hippocampal Lesions, Journal of Neurology, Neurosurgery, and Psychiatry",
      url: "https://doi.org/10.1136/jnnp.20.1.11",
      year: 1957,
    },
    color: "#f87171",
  },
  {
    id: "taxi-drivers",
    title: "London Taxi Drivers Grow Bigger Hippocampi",
    description:
      "London taxi drivers must pass 'The Knowledge' — a grueling 2-4 year training process requiring memorization of 25,000 streets and thousands of landmarks within a 6-mile radius of Charing Cross. Maguire et al. (2000) used MRI to compare taxi drivers with matched controls and found that taxi drivers had significantly larger posterior hippocampi. More striking: the size correlated with years of experience. Longer careers = bigger hippocampi. Bus drivers — who follow fixed routes — showed no such enlargement. It wasn't driving that grew the hippocampus; it was the spatial memory demands of navigating without fixed routes.",
    whyItMatters:
      "This is neuroplasticity in action — the adult brain physically reshaping itself in response to sustained cognitive demand. The hippocampus isn't a fixed-capacity organ; it can grow. This overturned the dogma that adult brains can't generate new neurons or expand structurally. (Though there was a cost: Maguire's 2006 follow-up found taxi drivers were worse at learning new spatial layouts, suggesting the enlarged posterior hippocampus came at the expense of the anterior portion.)",
    visualHint:
      "Comparative MRI scans: control brain vs. taxi driver brain with the posterior hippocampus highlighted and measurably larger. A growth timeline showing the hippocampus expanding over years of 'The Knowledge' training.",
    source: {
      label: "Maguire, E.A. et al. — Navigation-Related Structural Change in the Hippocampi of Taxi Drivers, PNAS",
      url: "https://doi.org/10.1073/pnas.070039597",
      year: 2000,
    },
    color: "#facc15",
  },
  {
    id: "reconstructive-memory",
    title: "You Don't Remember — You Reconstruct",
    description:
      "Elizabeth Loftus spent decades proving that memory is not a video recording — it's a reconstruction that happens every time you remember. In her landmark 'Lost in the Mall' study (1995), she convinced 25% of adult participants that they had been lost in a shopping mall as children — an event that never happened. Through suggestion and family corroboration, subjects generated vivid, detailed, emotionally-charged 'memories' complete with descriptions of the rescuer's appearance and their own feelings. These weren't lies; the subjects genuinely believed they remembered. The brain cannot reliably distinguish between real and reconstructed memories.",
    whyItMatters:
      "This has staggering implications for eyewitness testimony (which is far less reliable than courts assume), for trauma therapy, and for our basic understanding of what memory IS. Every act of remembering is an act of imagination. You're not playing back a tape — you're reconstructing a scene from fragments, expectations, and current context. The 'memory' is a fresh creation every time, just heavily constrained by actual traces.",
    visualHint:
      "Animation: a memory being 'recalled' — but each recall introduces subtle changes (colors shift, faces change, new details appear). After 10 recalls, the memory is substantially different from the original while the subject's confidence remains high. A confidence meter stays at 90% while an accuracy meter drops to 60%.",
    source: {
      label: "Loftus, E.F. & Pickrell, J.E. — The Formation of False Memories, Psychiatric Annals",
      url: "https://doi.org/10.3928/0048-5713-19951201-07",
      year: 1995,
    },
    color: "#a855f7",
  },
];

// ---------------------------------------------------------------------------
// 6. Brain ↔ AI Parallels (Summary Table)
// ---------------------------------------------------------------------------

export const BRAIN_AI_PARALLELS = [
  {
    id: "hippocampus-context",
    brain: "Hippocampus",
    ai: "Context Window",
    explanation:
      "Both are temporary, high-bandwidth buffers with hard capacity limits. The hippocampus holds ~30 seconds of raw sensory experience; the context window holds ~200K tokens. Both serve as the workspace where current experience is integrated before being consolidated (or forgotten). Both lose everything if they 'crash' — hippocampal damage = anterograde amnesia; session termination = context loss.",
    strength: "strong",
    color: "#60a5fa",
  },
  {
    id: "neocortex-longterm",
    brain: "Neocortex",
    ai: "Long-Term Storage (engram, filesystem, databases)",
    explanation:
      "Both are vast-capacity, slow-write, distributed stores. The neocortex takes days to years to fully consolidate a memory; writing to engram is fast but the information only becomes truly useful after being organized, deduplicated, and integrated. Both store information in distributed patterns — a neocortical memory spans multiple regions; an engram observation connects to related topics through search. Neither can be directly accessed without a retrieval process.",
    strength: "strong",
    color: "#a855f7",
  },
  {
    id: "consolidation-summary",
    brain: "Sleep Consolidation",
    ai: "Session-End Summarization",
    explanation:
      "Both are scheduled processes that review recent experience, extract important patterns, integrate them with existing knowledge, and discard noise. Sleep replays experiences at 5-20x speed; session summaries compress hours of interaction into structured observations. Both are essential — without sleep consolidation, memories remain fragile; without session summaries, context window content vanishes entirely.",
    strength: "strong",
    color: "#22c55e",
  },
  {
    id: "cue-retrieval-search",
    brain: "Cue-Dependent Retrieval",
    ai: "Semantic Search",
    explanation:
      "Both match a query (cue) against stored content to find relevant information. Both work better with more specific, context-rich queries. Both can fail when the query doesn't match the encoding — Tulving's 'encoding specificity' maps directly to the 'wrong search terms' problem. The brain's pattern completion (reconstructing a whole memory from a fragment) is what vector search aspires to: finding the nearest match in embedding space.",
    strength: "strong",
    color: "#facc15",
  },
  {
    id: "working-memory-tokens",
    brain: "Working Memory Capacity (~4 chunks)",
    ai: "Token Limit",
    explanation:
      "Both impose an absolute ceiling on simultaneously active information. Humans hold ~4 independent chunks; Claude holds ~200K tokens. Both use the same strategies to cope: chunking (grouping related items), offloading (writing things down / tool use), and selective attention (focusing on what's relevant, ignoring the rest). Both degrade gracefully when overloaded — performance drops before catastrophic failure.",
    strength: "strong",
    color: "#f87171",
  },
  {
    id: "attention-save",
    brain: "Attention Gating",
    ai: "Save-or-Drop Decision (mem_save rules)",
    explanation:
      "The brain only encodes what it attends to — unattended sensory input vanishes. AI memory systems face the same filter problem: you can't save everything (noise overwhelms signal), so you need a relevance classifier. The engram protocol's 'save decisions, bugs, discoveries' rule is an explicit attention policy. The amygdala's emotional priority tagging is a natural version of importance scoring.",
    strength: "moderate",
    color: "#c084fc",
  },
  {
    id: "reconsolidation-update",
    brain: "Reconsolidation",
    ai: "Memory Upsert (topic_key update)",
    explanation:
      "Both modify memories through the act of retrieval. Biological reconsolidation makes a memory temporarily malleable when accessed; engram's upsert model updates observations when they share a topic_key. In both systems, memories are living documents that evolve with each access, not static records. The risk is also shared: each update can introduce distortions (false memory in brains, context drift in AI).",
    strength: "moderate",
    color: "#22c55e",
  },
  {
    id: "forgetting-compaction",
    brain: "Forgetting (Ebbinghaus Curve)",
    ai: "Context Compaction",
    explanation:
      "Both are pruning mechanisms that prevent information overload. The brain aggressively forgets ~80% of new information within a month; context compaction discards most raw conversation and preserves structured summaries. Both are features, not bugs — selective forgetting keeps the system responsive by maintaining a high signal-to-noise ratio. Without forgetting, both biological and artificial memory drown in their own noise.",
    strength: "moderate",
    color: "#facc15",
  },
  {
    id: "interference-collision",
    brain: "Memory Interference",
    ai: "Search Result Pollution",
    explanation:
      "Similar memories compete in both systems. In the brain, learning French interferes with Spanish recall because they share neural substrate. In AI memory, similar observations dilute search results because they share semantic space. The brain handles this through inhibition (suppressing competitors during retrieval); engram handles it through topic_key upsert (merging competitors into a single canonical entry).",
    strength: "moderate",
    color: "#60a5fa",
  },
  {
    id: "procedural-weights",
    brain: "Procedural Memory (basal ganglia)",
    ai: "Model Weights / Fine-Tuning",
    explanation:
      "Both encode 'how to' knowledge that is expressed through performance rather than explicit retrieval. You can't introspect your procedural memories (try explaining how you ride a bike); you can't inspect model weights to see what the model 'knows.' Both are trained through repetition (practice / training epochs). Both are the most robust form of memory — procedural skills survive amnesia; model weights survive context loss.",
    strength: "loose",
    color: "#a855f7",
  },
];

// ---------------------------------------------------------------------------
// Key Researchers (for attribution components)
// ---------------------------------------------------------------------------



export const KEY_RESEARCHERS = [
  {
    name: "Hermann Ebbinghaus",
    contribution: "Forgetting curve, spacing effect, nonsense syllable methodology — invented the quantitative study of memory",
    era: "1885",
    keyPaper: {
      label: "Memory: A Contribution to Experimental Psychology",
      url: "https://psychclassics.yorku.ca/Ebbinghaus/",
      year: 1885,
    },
  },
  {
    name: "Endel Tulving",
    contribution: "Episodic vs. semantic memory distinction, encoding specificity principle, cue-dependent forgetting",
    era: "1972-2002",
    keyPaper: {
      label: "Episodic Memory: From Mind to Brain, Annual Review of Psychology",
      url: "https://doi.org/10.1146/annurev.psych.53.100901.135114",
      year: 2002,
    },
  },
  {
    name: "Alan Baddeley",
    contribution: "Working memory model — central executive, phonological loop, visuospatial sketchpad, episodic buffer",
    era: "1974-present",
    keyPaper: {
      label: "Working Memory, in The Psychology of Learning and Motivation",
      url: "https://doi.org/10.1016/S0079-7421(08)60452-1",
      year: 1974,
    },
  },
  {
    name: "Brenda Milner",
    contribution: "Patient H.M. studies — proved hippocampal role in memory formation, multiple memory systems",
    era: "1957-present",
    keyPaper: {
      label: "Loss of Recent Memory After Bilateral Hippocampal Lesions (with Scoville)",
      url: "https://doi.org/10.1136/jnnp.20.1.11",
      year: 1957,
    },
  },
  {
    name: "Elizabeth Loftus",
    contribution: "False memory research, misinformation effect, reconstructive nature of memory — transformed forensic psychology",
    era: "1974-present",
    keyPaper: {
      label: "The Formation of False Memories, Psychiatric Annals",
      url: "https://doi.org/10.3928/0048-5713-19951201-07",
      year: 1995,
    },
  },
  {
    name: "James McGaugh",
    contribution: "Memory consolidation, emotional modulation of memory via amygdala-hippocampal interaction",
    era: "1966-present",
    keyPaper: {
      label: "Memory — a Century of Consolidation, Science",
      url: "https://doi.org/10.1126/science.287.5451.248",
      year: 2000,
    },
  },
  {
    name: "Karim Nader",
    contribution: "Memory reconsolidation — proved that retrieved memories become temporarily unstable and can be modified",
    era: "2000-present",
    keyPaper: {
      label: "Fear Memories Require Protein Synthesis in the Amygdala for Reconsolidation after Retrieval, Nature",
      url: "https://doi.org/10.1038/35021052",
      year: 2000,
    },
  },
  {
    name: "Eleanor Maguire",
    contribution: "London taxi driver hippocampal neuroplasticity — structural brain changes from spatial memory training",
    era: "2000-present",
    keyPaper: {
      label: "Navigation-Related Structural Change in the Hippocampi of Taxi Drivers, PNAS",
      url: "https://doi.org/10.1073/pnas.070039597",
      year: 2000,
    },
  },
  {
    name: "Matthew Walker",
    contribution: "Sleep and memory consolidation — mechanisms of sleep-dependent memory processing, sleep spindle role",
    era: "2005-present",
    keyPaper: {
      label: "Sleep-Dependent Memory Consolidation, Nature",
      url: "https://doi.org/10.1038/nature04286",
      year: 2005,
    },
  },
  {
    name: "Henry Roediger III",
    contribution: "Testing effect — proved that retrieval practice is more effective than re-study for long-term retention",
    era: "2006-present",
    keyPaper: {
      label: "Test-Enhanced Learning, Psychological Science",
      url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      year: 2006,
    },
  },
];

// ---------------------------------------------------------------------------
// Forgetting Curve Data Points (for chart component)
// ---------------------------------------------------------------------------



export const FORGETTING_CURVE_DATA = [
  { time: "0 min", timeMinutes: 0, retentionPercent: 100, label: "Just learned" },
  { time: "20 min", timeMinutes: 20, retentionPercent: 58, label: "58% — already losing it" },
  { time: "1 hour", timeMinutes: 60, retentionPercent: 44, label: "44% — majority gone" },
  { time: "9 hours", timeMinutes: 540, retentionPercent: 36, label: "36% — a third remains" },
  { time: "1 day", timeMinutes: 1440, retentionPercent: 33, label: "33% — one in three" },
  { time: "2 days", timeMinutes: 2880, retentionPercent: 28, label: "28% — leveling off" },
  { time: "6 days", timeMinutes: 8640, retentionPercent: 25, label: "25% — the durable core" },
  { time: "31 days", timeMinutes: 44640, retentionPercent: 21, label: "21% — what survived" },
];

// ---------------------------------------------------------------------------
// Section Copy (for section headers / intros)
// ---------------------------------------------------------------------------

export const SECTION_COPY = {
  formation: {
    title: "How Memories Form",
    subtitle: "Encoding: from experience to physical trace",
    intro:
      "Every memory begins as an electrical storm. Neurons fire in synchrony, synapses strengthen, proteins are synthesized, and the architecture of your brain physically changes. This isn't metaphor — it's molecular biology. Here's how experience becomes memory.",
  },
  retrieval: {
    title: "How Memories Come Back",
    subtitle: "Retrieval: reconstruction, not playback",
    intro:
      "You don't retrieve a memory the way you retrieve a file. You reconstruct it — assembling fragments from distributed brain regions, guided by cues, colored by current context, and subtly changed in the process. Every act of remembering is an act of creation.",
  },
  forgetting: {
    title: "Why We Forget (And Why That's Good)",
    subtitle: "Forgetting is a feature, not a bug",
    intro:
      "Your brain forgets roughly 80% of what it encounters within a month. This sounds like a defect, but it's a survival strategy: aggressive pruning keeps the signal-to-noise ratio high, prevents interference between similar memories, and ensures that what remains is what matters. The real question isn't 'why do we forget?' — it's 'how do we remember anything at all?'",
  },
  systems: {
    title: "The Memory Systems",
    subtitle: "Not one memory — four different kinds",
    intro:
      "Your brain doesn't have 'memory.' It has memories — plural, different systems, different brain regions, different rules. What happened to you (episodic) is stored differently from what you know (semantic), which is stored differently from what you can do (procedural), which operates within the narrow spotlight of what you're thinking right now (working memory). Damage one system and the others keep running. This is not a filing cabinet — it's an ecosystem.",
  },
  wildFacts: {
    title: "Brains Are Wild",
    subtitle: "The facts that made us go 'whoa'",
    intro:
      "Before we draw the parallels to AI memory, let's sit with how extraordinary biological memory actually is. These aren't obscure trivia — they're landmark findings that reshaped our understanding of what brains can do.",
  },
  parallels: {
    title: "Brain ↔ AI",
    subtitle: "Where the metaphors hold — and where they break",
    intro:
      "The parallels between biological and artificial memory aren't just poetic — they're structural. Both systems face the same fundamental problems: limited working capacity, the need for consolidation, the search-retrieval gap, and the forgetting-vs-hoarding tradeoff. Here's how they map.",
  },
};
