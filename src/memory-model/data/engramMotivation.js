/**
 * The Motivation for Engram Specifically
 * Why this exists, what gaps it fills, and where it's going
 * Research compiled April 2026
 */



export const GAPS = [
  {
    id: "ephemeral-sessions",
    title: "Sessions are Ephemeral",
    severity: "critical",
    description:
      "Claude Code sessions are stateless by design. Every decision, debugging chain, architectural understanding, " +
      "and user preference accumulated during a session is destroyed when the session ends. " +
      "The next session starts from zero — a complete amnesia event.",
    evidence:
      "LLM agents typically have constrained memory capacity limited by the number of tokens they can process, " +
      "with each interaction treated as an isolated episode with no linkage between sequential dialogues (arXiv:2312.17259). " +
      "This is the #1 developer pain point in agent-assisted coding — " +
      "repeatedly re-explaining project context, conventions, and recent decisions.",
    currentWorkaround:
      "MEMORY.md auto-memory captures some facts between sessions, " +
      "but it's append-only, unsearchable, and context-limit-constrained. " +
      "Developers also rely on CLAUDE.md project instructions, but these are hand-curated and static.",
    proposedSolution:
      "Engram provides a persistent observation database (SQLite + FTS5) that survives session boundaries. " +
      "mem_save stores decisions/bugs/discoveries during sessions; mem_context loads relevant history at session start. " +
      "Boot protocol: mem_session_start -> load context -> ready.",
    cognitiveAnalog:
      "Atkinson-Shiffrin: the context window is short-term memory that decays completely without transfer to long-term store. " +
      "Engram is the rehearsal mechanism that moves critical information to long-term storage before it's lost.",
    color: "#ef4444",
  },
  {
    id: "fts5-semantic-gap",
    title: "FTS5 Misses Conceptual Queries",
    severity: "high",
    description:
      "FTS5 keyword search can't find memories that are conceptually related but use different words. " +
      "Searching for 'what did we decide about error handling' won't match an observation titled " +
      "'Chose try/catch over Result types for API layer' because there's no keyword overlap.",
    evidence:
      "FTS5 works well for exact words but can't capture meaning: searching for 'whats OffSync?' " +
      "wouldn't match documents about 'SQLite-Sync', even though they refer to the same concept (Alex Garcia, 2024). " +
      "Pure keyword search may overlook semantic meaning behind words, especially if exact terms are not present (Oracle, 2025). " +
      "The fundamental limitation: FTS5 operates on token co-occurrence, not meaning.",
    currentWorkaround:
      "Users must know the exact keywords stored in observations, or rely on topic_key conventions " +
      "(decision/error-handling) to pre-categorize. Search requires thinking like a database, not like a conversation.",
    proposedSolution:
      "Hybrid search: FTS5 for exact keyword matches + sqlite-vec for semantic vector search. " +
      "Results merged via Reciprocal Rank Fusion (RRF). sqlite-vec is available as a SQLite extension " +
      "— no infrastructure change needed. Alex Garcia demonstrated this approach in Oct 2024 " +
      "running on CLI, mobile, Raspberry Pi, and WASM.",
    cognitiveAnalog:
      "Tulving's episodic vs semantic: FTS5 can find specific episodes ('the bug on Tuesday') " +
      "but can't perform semantic retrieval ('our error handling philosophy'). " +
      "Vector search enables the semantic dimension. Hybrid search covers both memory systems.",
    color: "#f59e0b",
  },
  {
    id: "dumb-boot-context",
    title: "Boot Context is Dumb",
    severity: "high",
    description:
      "Session startup loads the 10 most recent observations via mem_context. This is pure recency bias — " +
      "a bug fix from yesterday pushes out a critical architecture decision from last month. " +
      "No relevance ranking, no importance weighting, no position optimization.",
    evidence:
      "Lost in the Middle (Liu et al., 2024): information in middle positions of injected context gets 30%+ less attention. " +
      "Ebbinghaus: recency alone is a poor predictor of importance — access frequency and emotional salience matter more. " +
      "Baddeley: different types of information need different processing, not flat text injection.",
    currentWorkaround:
      "Users can manually search for specific context with mem_search, but the automatic boot context " +
      "doesn't benefit from this. Critical decisions are often buried or missing from boot context.",
    proposedSolution:
      "Smart context injection with multi-signal ranking: recency * access_frequency * importance_score. " +
      "Position-aware injection: critical items at start/end of context block (leveraging primacy/recency bias). " +
      "Type-aware injection: decisions and conventions first, session history last. " +
      "Relevance detection: infer what the new session is likely about (from initial prompt or project state) " +
      "and load contextually relevant memories, not just recent ones.",
    cognitiveAnalog:
      "Lost in the Middle = serial position effect. Ebbinghaus = forgetting curve. " +
      "The solution is to combine both insights: rank by importance (not just recency) " +
      "AND place in optimal positions within the context window.",
    color: "#f97316",
  },
  {
    id: "competing-memory-systems",
    title: "Two Competing Memory Systems",
    severity: "medium",
    description:
      "Claude Code has both engram (external observation database) and auto-memory (built-in MEMORY.md). " +
      "They don't coordinate. Both inject context at session start, consuming double the token budget. " +
      "Facts may be duplicated, contradicted, or split across systems with no reconciliation.",
    evidence:
      "MEMORY.md is append-only, stored as a flat markdown file, and edited by the agent during sessions. " +
      "Engram stores structured observations in SQLite with topic_keys and FTS5 indexing. " +
      "Both inject context at session start. Neither knows what the other has stored. " +
      "The user must manually coordinate what goes where.",
    currentWorkaround:
      "Use engram for detailed decisions/bugs/discoveries and MEMORY.md for high-level conventions. " +
      "Accept some duplication. Hope they don't contradict each other.",
    proposedSolution:
      "Unified memory layer: auto-memory becomes L1 (working memory — small, always-injected, frequently-updated) " +
      "while engram becomes L2 (long-term memory — large, search-retrieved, durable). " +
      "L1 is curated by the agent during sessions (like Baddeley's central executive maintaining working memory). " +
      "L2 is the searchable archive. Consolidation process: L1 items that persist across sessions get promoted to L2. " +
      "L2 items that are frequently accessed get promoted to L1.",
    cognitiveAnalog:
      "Baddeley: MEMORY.md is the episodic buffer (integrated working context), " +
      "engram is long-term storage. They should coordinate like the episodic buffer " +
      "coordinates between the central executive and long-term memory — not compete.",
    color: "#a855f7",
  },
  {
    id: "no-automatic-capture",
    title: "No Automatic Capture",
    severity: "medium",
    description:
      "Engram requires explicit mem_save calls to store observations. The agent must decide in real-time " +
      "what's worth saving, which means many valuable decisions and discoveries are never persisted. " +
      "This is like having a perfect filing cabinet but no habit of filing.",
    evidence:
      "claude-mem solves this with PostToolUse hooks that capture after every tool call. " +
      "Mem0 automatically extracts salient facts from conversation. " +
      "MemGPT/Letta agents explicitly manage their own memory (but each memory op costs an LLM call). " +
      "The PROACTIVE SAVE RULE in engram's MCP instructions tells the agent to save immediately, " +
      "but compliance is inconsistent.",
    currentWorkaround:
      "The MCP instructions include 'PROACTIVE SAVE RULE: Call mem_save immediately after ANY decision, bug fix, discovery.' " +
      "This works when the agent follows instructions, but is easily forgotten during complex multi-step tasks.",
    proposedSolution:
      "Passive capture via hooks (like claude-mem) with intelligent deduplication and compression. " +
      "The mem_capture_passive tool exists but needs to be triggered by lifecycle hooks rather than manual invocation. " +
      "Compression pipeline: raw observation -> LLM summary -> typed schema -> dedup check -> store. " +
      "Access tracking: observe what gets retrieved and used to improve future capture decisions.",
    cognitiveAnalog:
      "Atkinson-Shiffrin: automatic encoding vs effortful encoding. Humans automatically encode some information " +
      "(spatial location, time, frequency) without conscious effort. The equivalent for agents: " +
      "automatic capture of structural changes (new files, changed configs, error patterns) " +
      "while leaving conceptual captures (decisions, tradeoffs) to explicit mem_save.",
    color: "#06b6d4",
  },
];

/** The Vision: where engram is heading */


export const VISION = [
  {
    id: "hybrid-search",
    title: "Hybrid Search (FTS5 + Vectors)",
    description:
      "Add sqlite-vec embeddings alongside FTS5. Reciprocal Rank Fusion merges keyword and semantic results. " +
      "Enables conceptual queries ('our error handling philosophy') alongside exact matches ('FTS5 configuration'). " +
      "No infrastructure change — sqlite-vec is a SQLite extension, same deployment model.",
    cognitiveMapping:
      "Tulving: FTS5 retrieves episodic memories (specific events with known keywords), " +
      "vector search retrieves semantic memories (general knowledge by meaning). " +
      "Hybrid search = both memory systems working together.",
    status: "planned",
    priority: 1,
  },
  {
    id: "smart-context-injection",
    title: "Smart Context Injection",
    description:
      "Replace recency-sorted boot context with multi-signal ranking: " +
      "relevance (to initial prompt) * recency * access_frequency * importance. " +
      "Position-aware placement: critical items at start/end, supporting items in middle. " +
      "Type-aware grouping: decisions first, then conventions, then recent history.",
    cognitiveMapping:
      "Lost in the Middle + Ebbinghaus: position matters (primacy/recency bias), " +
      "recency alone isn't enough (forgetting curve shows access frequency and importance matter more). " +
      "Baddeley: different memory types need different treatment in the processing workspace.",
    status: "planned",
    priority: 2,
  },
  {
    id: "automatic-capture",
    title: "Automatic Capture via Hooks",
    description:
      "Lifecycle hooks trigger passive observation capture at key moments: " +
      "PostToolUse (file edits, command results), SessionEnd (summary), ErrorOccurrence (bugs). " +
      "AI compression reduces raw observations to typed, deduped schema before storage.",
    cognitiveMapping:
      "Atkinson-Shiffrin: automatic encoding — some information should transfer to long-term memory " +
      "without conscious effort. The hooks are the 'automatic encoding' channel.",
    status: "planned",
    priority: 3,
  },
  {
    id: "l1-l2-tiers",
    title: "L1/L2 Memory Tiers",
    description:
      "L1 (working memory): small, always-injected context. Curated by the agent, " +
      "maps to MEMORY.md-style auto-memory. Max ~20 items. Updated frequently. " +
      "L2 (long-term memory): the full engram observation database. Large, search-retrieved. " +
      "Consolidation: L1 items that persist across 3+ sessions get promoted to L2 as durable observations. " +
      "L2 items accessed 5+ times get promoted to L1 for automatic injection.",
    cognitiveMapping:
      "Baddeley: L1 is the episodic buffer (integrated working context), " +
      "L2 is the long-term store. The consolidation process mirrors " +
      "the transfer from working memory to long-term memory through rehearsal.",
    status: "speculative",
    priority: 4,
  },
  {
    id: "sleep-consolidation",
    title: "Offline Consolidation ('Sleep')",
    description:
      "Scheduled process (nightly or on-demand) that reorganizes stored observations: " +
      "merge related observations, promote recurring patterns from episodic to semantic, " +
      "flag stale/contradicted observations, update link graphs between related memories. " +
      "Uses LLM calls for intelligent reorganization, not just rule-based cleanup.",
    cognitiveMapping:
      "Human sleep consolidation: episodic memories are replayed and abstracted into semantic knowledge. " +
      "'We fixed the auth bug three different ways' consolidates into 'our auth error handling pattern is X'. " +
      "Ebbinghaus: spaced retrieval during consolidation strengthens important memory traces.",
    status: "speculative",
    priority: 5,
  },
];

/** How engram maps to cognitive science models */


export const COGNITIVE_MAPPINGS = [
  {
    cognitiveSystem: "Sensory Register (Atkinson-Shiffrin)",
    engramComponent: "N/A — raw input isn't stored",
    autoMemoryComponent: "N/A",
    contextWindowRole: "Token stream / API input — everything received before processing",
  },
  {
    cognitiveSystem: "Short-Term Memory (Atkinson-Shiffrin)",
    engramComponent: "N/A — engram is long-term",
    autoMemoryComponent: "N/A — auto-memory is persistent",
    contextWindowRole: "The context window itself — limited tokens, actively processed, lost at session end",
  },
  {
    cognitiveSystem: "Long-Term Memory (Atkinson-Shiffrin)",
    engramComponent: "SQLite observation database — persistent, searchable, unbounded",
    autoMemoryComponent: "MEMORY.md file — persistent but unsearchable and size-limited",
    contextWindowRole: "N/A — context window IS short-term memory, not long-term",
  },
  {
    cognitiveSystem: "Central Executive (Baddeley)",
    engramComponent: "N/A — engram doesn't control attention",
    autoMemoryComponent: "N/A",
    contextWindowRole: "The LLM itself — decides what to attend to, what tools to call, what to save",
  },
  {
    cognitiveSystem: "Episodic Buffer (Baddeley)",
    engramComponent: "mem_context at session start — integrates past observations into current context",
    autoMemoryComponent: "MEMORY.md injection — always-present integrated context",
    contextWindowRole: "Compaction summaries — integrate conversation, files, and errors into coherent episodes",
  },
  {
    cognitiveSystem: "Episodic Memory (Tulving)",
    engramComponent: "session/ and bug/ observations — what happened, when, what we tried",
    autoMemoryComponent: "Session-specific notes in MEMORY.md",
    contextWindowRole: "Conversation history — raw record of what happened this session",
  },
  {
    cognitiveSystem: "Semantic Memory (Tulving)",
    engramComponent: "decision/ and pattern/ observations — reusable knowledge extracted from experience",
    autoMemoryComponent: "Convention entries in MEMORY.md ('always use X for Y')",
    contextWindowRole: "System prompt / CLAUDE.md — project-level knowledge that transcends sessions",
  },
  {
    cognitiveSystem: "Procedural Memory (Tulving)",
    engramComponent: "N/A — engram stores facts, not skills",
    autoMemoryComponent: "N/A — auto-memory stores facts, not skills",
    contextWindowRole: "Model weights + CLAUDE.md instructions — how to do things, not what happened",
  },
];

/** Key academic references for the entire research */


export const REFERENCES = [
  // Cognitive Science
  { id: "atkinson-1968", category: "cognitive-science", citation: "Atkinson, R.C. & Shiffrin, R.M. (1968). Human Memory: A Proposed System and its Control Processes. Psychology of Learning and Motivation, 2, 89-195.", year: 1968, relevance: "Foundational three-store model: sensory -> short-term -> long-term" },
  { id: "baddeley-1974", category: "cognitive-science", citation: "Baddeley, A.D. & Hitch, G. (1974). Working Memory. Psychology of Learning and Motivation, 8, 47-89.", year: 1974, relevance: "Multi-component working memory: central executive + subsystems" },
  { id: "tulving-1972", category: "cognitive-science", citation: "Tulving, E. (1972). Episodic and Semantic Memory. In E. Tulving & W. Donaldson (Eds.), Organization of Memory (pp. 381-403). Academic Press.", year: 1972, relevance: "Episodic vs semantic memory distinction — dominant framing for AI memory design" },
  { id: "ebbinghaus-1885", category: "cognitive-science", citation: "Ebbinghaus, H. (1885). Uber das Gedachtnis. Leipzig: Duncker & Humblot. [Translated: Memory: A Contribution to Experimental Psychology, 1913]", year: 1885, relevance: "Forgetting curve: R = e^(-t/S), spacing effect, rehearsal strengthens retention" },
  { id: "baddeley-2000", category: "cognitive-science", citation: "Baddeley, A.D. (2000). The Episodic Buffer: A New Component of Working Memory? Trends in Cognitive Sciences, 4(11), 417-423.", year: 2000, relevance: "Episodic buffer integrates information across domains — maps to compaction summaries" },
  { id: "murdock-1962", category: "cognitive-science", citation: "Murdock, B.B. (1962). The Serial Position Effect of Free Recall. Journal of Experimental Psychology, 64(5), 482-488.", year: 1962, relevance: "Serial position effect (primacy + recency) — the human basis for 'Lost in the Middle'" },

  // LLM Memory Systems
  { id: "packer-2023", category: "llm-memory", citation: "Packer, C., Wooders, S., Lin, K., Fang, V., Patil, S.G., Stoica, I., & Gonzalez, J.E. (2023). MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.", year: 2023, relevance: "Virtual context management, OS-inspired two-tier memory, self-directed memory ops" },
  { id: "chhikara-2025", category: "llm-memory", citation: "Chhikara, P., Khant, P., et al. (2025). Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory. arXiv:2504.19413, ECAI 2025.", year: 2025, relevance: "Two-phase extraction/update pipeline, hybrid vector + graph memory, production benchmarks" },
  { id: "rasmussen-2025", category: "llm-memory", citation: "Rasmussen, P. (2025). Zep: A Temporal Knowledge Graph Architecture for Agent Memory. arXiv:2501.13956.", year: 2025, relevance: "Temporal fact management, bi-temporal model, episodic/semantic/community subgraphs" },
  { id: "xu-2025", category: "llm-memory", citation: "Xu, W. & Liang, Y. (2025). A-MEM: Agentic Memory for LLM Agents. NeurIPS 2025, arXiv:2502.12110.", year: 2025, relevance: "Zettelkasten-inspired self-organizing memory, dynamic linking, memory evolution" },
  { id: "zhong-2024", category: "memory-systems", citation: "Zhong, W. et al. (2024). MemoryBank: Enhancing Large Language Models with Long-Term Memory. arXiv:2305.10250.", year: 2024, relevance: "Ebbinghaus-inspired dynamic forgetting mechanism for LLM memory" },

  // Context Window Research
  { id: "liu-2024", category: "context-window", citation: "Liu, N.F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). Lost in the Middle: How Language Models Use Long Contexts. TACL 2024, arXiv:2307.03172.", year: 2024, relevance: "U-shaped attention: 30%+ accuracy drop for middle-positioned information" },
  { id: "munkhdalai-2024", category: "context-window", citation: "Munkhdalai, T. et al. (2024). Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention. arXiv:2404.07143.", year: 2024, relevance: "Compressive memory + local/linear attention for infinite context" },

  // Surveys
  { id: "survey-2026a", category: "surveys", citation: "\"Memory in the Age of AI Agents: A Survey.\" arXiv:2512.13564, Jan 2026.", year: 2026, relevance: "Comprehensive taxonomy: factual, experiential, working memory; formation, evolution, retrieval dynamics" },
  { id: "survey-2026b", category: "surveys", citation: "\"Anatomy of Agentic Memory: Taxonomy and Empirical Analysis.\" arXiv:2602.19320, Feb 2026.", year: 2026, relevance: "Four structural paradigms for Memory-Augmented Generation (MAG)" },
  { id: "survey-2026c", category: "surveys", citation: "\"Memory for Autonomous LLM Agents: Mechanisms, Evaluation, and Emerging Frontiers.\" arXiv:2603.07670, Mar 2026.", year: 2026, relevance: "Memory decomposition, mechanism trade-offs, evaluation when the test is downstream performance" },
  { id: "survey-2025", category: "surveys", citation: "\"From Human Memory to AI Memory: A Survey on Memory Mechanisms in the Era of LLMs.\" arXiv:2504.15965, Apr 2025.", year: 2025, relevance: "Maps Atkinson-Shiffrin and Tulving models to LLM memory architectures" },
  { id: "li-2024", category: "context-window", citation: "Li, J. & Li, J. (2024). Memory, Consciousness and Large Language Model. arXiv:2401.02509.", year: 2024, relevance: "SSMs may achieve emergent abilities through context length extension rather than model scaling" },
];
