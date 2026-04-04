/**
 * Cognitive Science Memory Models Applied to AI
 * Research compiled April 2026
 */





export const COGNITIVE_MODELS = [
  {
    id: "atkinson-shiffrin",
    name: "Atkinson-Shiffrin Model",
    authors: "Richard Atkinson & Richard Shiffrin",
    year: 1968,
    citation: "Atkinson & Shiffrin, \"Human Memory: A Proposed System and its Control Processes,\" Psychology of Learning and Motivation, 1968",
    humanModel:
      "Memory flows through three stages: sensory register (brief, high-bandwidth), " +
      "short-term store (limited capacity, ~7 items, active processing), " +
      "and long-term store (effectively unlimited, but retrieval-dependent). " +
      "Information must be rehearsed in short-term memory to transfer to long-term storage.",
    components: [
      {
        name: "Sensory Register",
        humanRole: "Brief buffering of all incoming stimuli (~250ms visual, ~3s auditory)",
        aiAnalog: "Token stream / raw API input — everything the model receives before any processing",
      },
      {
        name: "Short-Term Store",
        humanRole: "Active processing workspace, ~7 items, decays in 15-30 seconds without rehearsal",
        aiAnalog: "The context window — limited tokens, actively processed, lost at session end",
      },
      {
        name: "Long-Term Store",
        humanRole: "Effectively unlimited capacity, organized by meaning, retrieval can fail",
        aiAnalog: "External memory systems (engram, databases, filesystem) — persistent but search-dependent",
      },
    ],
    aiMapping:
      "The LightMem framework (2024) directly implements this three-stage pipeline: " +
      "sensory memory rapidly filters irrelevant information through lightweight compression, " +
      "short-term memory preserves interaction sequences for immediate processing, " +
      "and long-term memory provides durable storage with continuous reorganization through updating, abstraction, and forgetting. " +
      "The PRIME system (EMNLP 2025) uses this model for LLM personalization with dual episodic/semantic memory.",
    keyInsight:
      "The critical bottleneck is the transfer from short-term to long-term memory. " +
      "In humans, this requires rehearsal and encoding. In LLM agents, this is the explicit save/capture step " +
      "that most sessions skip entirely — conversations are 'sensory register' that never makes it to 'long-term store' " +
      "because there's no automatic rehearsal mechanism.",
    relevanceToEngram:
      "Engram's mem_save is the rehearsal mechanism — it's the explicit act of transferring information from " +
      "the context window (short-term) to SQLite (long-term). The gap: this transfer is manual and requires " +
      "the agent to decide what's worth saving. Auto-capture (like claude-mem's PostToolUse hooks) " +
      "would automate this rehearsal, but risks storing noise.",
    color: "#60a5fa",
  },
  {
    id: "baddeley-hitch",
    name: "Working Memory (Baddeley & Hitch)",
    authors: "Alan Baddeley & Graham Hitch",
    year: 1974,
    citation: "Baddeley & Hitch, \"Working Memory,\" Psychology of Learning and Motivation, 1974; Baddeley, \"The Episodic Buffer,\" Trends in Cognitive Sciences, 2000",
    humanModel:
      "Replaces the unitary short-term store with a multi-component system: " +
      "central executive (attention controller), phonological loop (verbal rehearsal), " +
      "visuospatial sketchpad (spatial/visual processing), and episodic buffer (integrates information across domains). " +
      "Each subsystem has independent capacity limits.",
    components: [
      {
        name: "Central Executive",
        humanRole: "Directs attention, coordinates subsystems, limited capacity for control",
        aiAnalog: "The LLM itself — decides what to attend to, what tools to call, what to ignore",
      },
      {
        name: "Phonological Loop",
        humanRole: "Maintains and rehearses verbal/acoustic information (~2 seconds of speech)",
        aiAnalog: "System prompt + recent conversation turns — the 'verbal' context being actively processed",
      },
      {
        name: "Visuospatial Sketchpad",
        humanRole: "Holds and manipulates visual/spatial information",
        aiAnalog: "File system state, code structure, project architecture — spatial relationships between artifacts",
      },
      {
        name: "Episodic Buffer",
        humanRole: "Integrates information from all subsystems into coherent episodes, links to long-term memory",
        aiAnalog: "The compaction summary — integrates conversation history, file state, and errors into a coherent episode",
      },
    ],
    aiMapping:
      "The paper 'Working Memory Identifies Reasoning Limits in Language Models' (EMNLP 2024) " +
      "uses human working memory benchmarks to evaluate LLM capacity limits, finding that reasoning failures " +
      "in LLMs correlate with tasks that exceed human working memory capacity. " +
      "The Cognitive Workspace (2025) framework implements active memory management inspired by this model " +
      "with salience-based resource allocation following global workspace theory.",
    keyInsight:
      "Working memory isn't just 'small long-term memory' — it's an active processing workspace with specialized subsystems. " +
      "The context window is often treated as a flat token buffer, but Baddeley shows it should have " +
      "specialized channels for different information types (verbal instructions vs spatial code structure vs episodic history). " +
      "The capacity limit isn't about total tokens — it's about how many independent threads of information can be coordinated.",
    relevanceToEngram:
      "Engram's context injection treats all memories as interchangeable text, but Baddeley suggests different memory types " +
      "need different treatment. Decisions (semantic) vs session history (episodic) vs code patterns (procedural) " +
      "should be injected differently — not all flattened into the same boot context block. " +
      "The episodic buffer concept maps to compaction summaries that integrate across memory types.",
    color: "#a855f7",
  },
  {
    id: "tulving",
    name: "Tulving's Memory Systems",
    authors: "Endel Tulving",
    year: 1972,
    citation: "Tulving, \"Episodic and Semantic Memory,\" Organization of Memory, 1972; Tulving, \"Elements of Episodic Memory,\" 1983",
    humanModel:
      "Five memory systems: procedural (skills, habits), priming (perceptual facilitation), " +
      "perceptual (object recognition), semantic (facts, general knowledge), and episodic (personal experiences). " +
      "Episodic memory is uniquely characterized by 'autonoetic consciousness' — the ability to mentally time-travel, " +
      "re-experiencing past events from a first-person perspective.",
    components: [
      {
        name: "Episodic Memory",
        humanRole: "Personal experiences: 'I debugged that race condition last Tuesday at 2am'",
        aiAnalog: "Session histories, conversation logs, time-stamped interaction records — what happened and when",
      },
      {
        name: "Semantic Memory",
        humanRole: "General knowledge: 'React 19 uses compiler-based optimization instead of manual memo'",
        aiAnalog: "Extracted facts, user preferences, project decisions — knowledge without experiential context",
      },
      {
        name: "Procedural Memory",
        humanRole: "Skills and habits: how to ride a bike, typing, language syntax",
        aiAnalog: "Model weights (pretrained skills), prompt templates, system instructions — how to do things",
      },
      {
        name: "Priming",
        humanRole: "Unconscious influence of prior exposure on current processing",
        aiAnalog: "Boot context injection — memories loaded at session start that bias subsequent behavior without explicit reference",
      },
      {
        name: "Perceptual Memory",
        humanRole: "Recognition of objects and patterns based on prior exposure",
        aiAnalog: "Pattern recognition in code: recognizing project conventions, naming patterns, architectural styles",
      },
    ],
    aiMapping:
      "Tulving's taxonomy has become the dominant framing for AI agent memory design (2024-2026). " +
      "The 'Memory in the Age of AI Agents' survey (arXiv 2512.13564) uses it as the primary organizing principle. " +
      "Zep implements episodic + semantic + community subgraphs. " +
      "LangMem SDK explicitly supports episodic, semantic, and procedural memory types. " +
      "The consolidation pathway (episodic -> semantic) is key: specific experiences should generalize into reusable knowledge.",
    keyInsight:
      "LLMs are strong at semantic memory (facts encoded in weights) and weak at episodic memory " +
      "(no personal timeline, no autonoetic consciousness). They cannot natively say 'I remember when we tried X and it failed' " +
      "— that requires external episodic storage. Procedural memory (skills) is partially baked into weights " +
      "but can't be updated without fine-tuning, which is why prompt-based procedural memory (LangMem) " +
      "and self-editing core memory (MemGPT) are significant innovations.",
    relevanceToEngram:
      "Engram stores observations that blend episodic and semantic content but doesn't distinguish between them. " +
      "A 'bug fix' observation is episodic (what happened), but the lesson learned is semantic (reusable knowledge). " +
      "The topic_key system partially addresses this (bug/ vs decision/ vs pattern/), but the retrieval system " +
      "treats all observations identically. The vision: separate retrieval strategies for 'what happened' vs 'what we know'.",
    color: "#4ade80",
  },
  {
    id: "ebbinghaus",
    name: "Ebbinghaus Forgetting Curve",
    authors: "Hermann Ebbinghaus",
    year: 1885,
    citation: "Ebbinghaus, \"Uber das Gedachtnis,\" 1885; Murre & Dros, \"Replication and Analysis of Ebbinghaus' Forgetting Curve,\" PLOS ONE, 2015",
    humanModel:
      "Memory retention decays exponentially over time, with a steep initial decline. " +
      "Retention follows R = e^(-t/S) where t is time and S is memory strength. " +
      "Key finding: the spacing effect — relearning is easier than initial learning, " +
      "and regular reviews can reset the forgetting curve. " +
      "Emotional salience and personal relevance slow the decay.",
    components: [
      {
        name: "Initial Rapid Decay",
        humanRole: "~56% of information forgotten within 1 hour, ~66% within 1 day",
        aiAnalog: "Context window after compaction — most conversation detail is lost, only the summary survives",
      },
      {
        name: "Spacing Effect",
        humanRole: "Spaced repetition strengthens memory traces more than massed practice",
        aiAnalog: "Repeated retrieval of an observation strengthens its relevance score / recall probability",
      },
      {
        name: "Emotional Salience",
        humanRole: "Emotionally significant events resist forgetting",
        aiAnalog: "High-importance observations (bugs, architecture decisions) should decay slower than routine captures",
      },
    ],
    aiMapping:
      "MemoryBank (2023) implements a dynamic forgetting mechanism directly inspired by Ebbinghaus: " +
      "memories decay over time based on importance and recall frequency. " +
      "YourMemory MCP server applies the forgetting curve to retrieval scoring. " +
      "FOREVER (2025) uses forgetting-curve-inspired replay schedules for continual learning. " +
      "The 'Lost in the Middle' phenomenon (Liu et al., 2024) is a spatial analog: " +
      "LLMs exhibit U-shaped attention where information in the middle of context is 30%+ less likely to be used " +
      "— a form of positional forgetting within a single context window.",
    keyInsight:
      "Not all memories should be equally retrievable. Recency-sorted boot context (engram's current default) " +
      "violates the forgetting curve's key insight: relevance should be a function of both recency AND access frequency AND importance. " +
      "A decision made 6 months ago but accessed 20 times is more important than a bug fixed yesterday. " +
      "The 'Lost in the Middle' effect adds a spatial dimension: even within the context window, " +
      "position determines attention. Information injected at the start or end gets 30% more attention than information in the middle.",
    relevanceToEngram:
      "Engram's boot context loads recent observations, but this is pure recency bias. " +
      "A forgetting-curve-aware system would weight observations by: recency * access_frequency * importance_score. " +
      "The spacing effect suggests re-accessed observations should be promoted, not just recent ones. " +
      "Practical implication: track access counts per observation and use them in retrieval ranking.",
    color: "#f59e0b",
  },
  {
    id: "lost-in-middle",
    name: "Lost in the Middle (Positional Bias)",
    authors: "Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang",
    year: 2024,
    citation: "Liu et al., \"Lost in the Middle: How Language Models Use Long Contexts,\" TACL 2024, arXiv:2307.03172",
    humanModel:
      "Not a classical cognitive model, but a discovered property of LLMs that parallels the primacy and recency effects " +
      "in human serial position experiments (Murdock, 1962). Humans remember the first items (primacy) " +
      "and last items (recency) of a list better than middle items.",
    components: [
      {
        name: "Primacy Bias",
        humanRole: "First items in a list are better remembered (more rehearsal time)",
        aiAnalog: "System prompt and early context get disproportionate attention — architecturally guaranteed by causal masking",
      },
      {
        name: "Recency Bias",
        humanRole: "Last items in a list are still in short-term memory",
        aiAnalog: "Recent conversation turns dominate attention — residual connections create geometric recency bias",
      },
      {
        name: "Middle Neglect",
        humanRole: "Middle items in a list are hardest to recall",
        aiAnalog: "Information in the middle of long context gets 30%+ less attention. GPT-3.5 accuracy drops below random baseline for middle-positioned answers.",
      },
    ],
    aiMapping:
      "Liu et al. (2024) measured 30%+ accuracy drop when answer documents moved from position 1 to position 10 in a 20-document context. " +
      "The architectural explanation: causal masking algebraically guarantees primacy bias, residual connections guarantee recency bias, " +
      "and RoPE positional encoding introduces a decay effect. " +
      "A 2025 paper shows these biases shift as inputs approach context window limits — " +
      "near the context boundary, recency bias dominates even more strongly.",
    keyInsight:
      "Context injection order matters as much as context content. " +
      "Naively dumping 10 relevant memories into the boot context means memories in positions 3-7 are largely ignored. " +
      "Optimal strategy: put the most critical information at the start AND end of the context, " +
      "use the middle for supporting detail that's useful but not essential.",
    relevanceToEngram:
      "Engram's boot context injection doesn't consider position effects. " +
      "The most recent observations go in last (recency-sorted), which accidentally leverages recency bias, " +
      "but the most IMPORTANT observations may be in the middle of the injected block. " +
      "A position-aware injection strategy would place high-importance items at start/end " +
      "and lower-importance items in the middle.",
    color: "#ef4444",
  },
];
