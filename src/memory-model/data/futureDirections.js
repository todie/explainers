/**
 * Future Directions & Open Problems in LLM Memory
 * Research compiled April 2026
 */



export const FUTURE_DIRECTIONS = [
  {
    id: "infinite-context",
    title: "Infinite Context Windows",
    category: "scaling",
    status: "active-research",
    description:
      "Will models eventually have unlimited context? The attention mechanism's O(n^2) complexity in both memory and compute " +
      "is the fundamental barrier. A 500B model with batch size 512 and context length 2048 already requires 3TB for KV states alone.",
    currentState:
      "Google's Infini-attention (2024) demonstrated 1M token passkey retrieval by incorporating compressive memory " +
      "into vanilla attention, combining masked local attention and long-term linear attention in a single block. " +
      "Gemini processes 1M+ tokens. Meta's Megalodon uses exponential moving averages for linear-complexity context. " +
      "InfLLM and Infinite Retrieval (2025) process hundreds of thousands of tokens with external memory augmentation.",
    barriers: [
      "Quadratic attention complexity: O(n^2) in memory and compute makes brute-force scaling impossible",
      "KV cache memory: grows linearly with sequence length, already 3TB at modest scales",
      "Lost in the Middle: even with long context, models attend to start/end and neglect the middle (30%+ accuracy drop)",
      "Attention sink: initial tokens absorb disproportionate attention regardless of content",
      "Evaluation: no reliable benchmarks for truly long-range dependency beyond ~128k tokens",
      "Training data: finding naturally-occurring million-token coherent documents is itself a bottleneck",
    ],
    keyWork: [
      "Munkhdalai et al., \"Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention,\" arXiv:2404.07143, 2024",
      "Liu et al., \"Lost in the Middle: How Language Models Use Long Contexts,\" TACL 2024",
      "Meta, \"Megalodon: Efficient LLM Pretraining and Inference with Unlimited Context Length,\" 2024",
      "BigBird (Zaheer et al., 2020), Longformer (Beltagy et al., 2020) — sparse attention pioneers",
      "StreamingLLM, H2O, SnapKV, DynamicKV — KV cache compression methods (2024-2025)",
    ],
    implications:
      "Even if infinite context becomes technically feasible, Lost in the Middle shows that more context != better use of context. " +
      "Memory systems like engram will remain necessary because the problem isn't just fitting information into context " +
      "— it's getting the model to attend to the right information at the right time. " +
      "Retrieval-augmented approaches that inject only relevant context will outperform raw long-context approaches.",
    color: "#60a5fa",
  },
  {
    id: "learned-retrieval",
    title: "Learned Retrieval: What to Remember vs Forget",
    category: "learning",
    status: "active-research",
    description:
      "Can models learn to manage their own memory rather than relying on hand-crafted heuristics? " +
      "Current systems use fixed strategies (recency, vector similarity, keyword match) but don't adapt " +
      "their retrieval strategy based on experience.",
    currentState:
      "A-MEM (NeurIPS 2025) shows self-organizing memory that dynamically links and evolves observations. " +
      "MemGPT gives agents explicit control over memory operations but doesn't learn from retrieval outcomes. " +
      "MemGuide (2025) uses intent-driven memory selection for goal-oriented agents. " +
      "Empirical findings show utility-based and retrieval-history-based deletion yield up to 10% performance gains " +
      "over naive strategies. The MemEngine framework separates encoding, retrieval, summarization, forgetting, and meta-learning as pluggable modules.",
    barriers: [
      "Credit assignment: how does an agent know which past memory retrieval led to a good outcome?",
      "Catastrophic forgetting: aggressively pruning memory risks losing information needed later",
      "Evaluation: no standard benchmark for memory management quality (only downstream task performance)",
      "Computational cost: training a learned retriever requires many episodes of interaction",
      "Cold start: learned strategies need experience, but early sessions have no history to learn from",
    ],
    keyWork: [
      "Xu & Liang, \"A-MEM: Agentic Memory for LLM Agents,\" NeurIPS 2025",
      "MemEngine — pluggable memory modules with meta-learning",
      "MemGuide — intent-driven memory selection",
      "ACT-R-inspired memory architecture for human-like remembering and forgetting (HAI 2024)",
      "FOREVER — forgetting-curve-inspired memory replay for continual learning (2025)",
    ],
    implications:
      "Engram currently uses FTS5 keyword search with recency sorting — a completely static strategy. " +
      "A learned retriever would observe which memories were useful in past sessions and promote them. " +
      "Practical first step: track which retrieved memories the agent actually uses (via citation or tool call patterns) " +
      "and use that signal to adjust future retrieval ranking.",
    color: "#a855f7",
  },
  {
    id: "cross-session-state",
    title: "Cross-Session State Persistence",
    category: "architecture",
    status: "production-emerging",
    description:
      "The fundamental problem engram solves: LLM agent sessions are ephemeral. Everything in the context window " +
      "— decisions, debugging history, architectural understanding, user preferences — dies when the session ends. " +
      "The next session starts from zero. This is the #1 friction point in agent-assisted development.",
    currentState:
      "Multiple production systems now address this: Mem0 (41k stars, 186M API calls/quarter), " +
      "Zep (temporal knowledge graph), claude-mem (Claude Code plugin), engram (lightweight local-first). " +
      "LangMem SDK from LangChain provides episodic/semantic/procedural memory types. " +
      "Claude Code's built-in auto-memory (MEMORY.md) provides basic cross-session persistence but with no search capability. " +
      "ICLR 2026 has a dedicated workshop: MemAgents (Memory for LLM-Based Agentic Systems).",
    barriers: [
      "What to save: too much (noise) vs too little (gaps) — the capture granularity problem",
      "Retrieval relevance: keyword search misses conceptual queries, vector search misses exact matches",
      "Context budget: injecting memories consumes tokens that could be used for current task reasoning",
      "Staleness: saved facts become wrong over time (renamed files, changed decisions, deprecated APIs)",
      "Multi-agent coordination: when multiple agents share memory, conflicts and race conditions emerge",
      "No standard protocol: each system invents its own format, making migration and interop impossible",
    ],
    keyWork: [
      "Mem0, Zep, Letta, claude-mem, engram — production memory systems",
      "Claude Code MEMORY.md — built-in auto-memory",
      "ICLR 2026 MemAgents Workshop — academic focus on the problem",
      "\"Cross-Session Agent Memory: Foundations, Implementations, Challenges\" — 2025 survey",
      "TiMem — temporal-hierarchical memory consolidation for long-horizon agents (2025)",
    ],
    implications:
      "This is the problem space engram operates in. The gap compared to Mem0/Zep: " +
      "engram is local-first and lightweight (Go binary + SQLite, ~3ms reads) but lacks vector search, " +
      "graph memory, and automatic capture. The tradeoff is intentional — simplicity and speed over features — " +
      "but hybrid search (FTS5 + vectors) would close the biggest gap without adding infrastructure complexity.",
    color: "#4ade80",
  },
  {
    id: "memory-consolidation",
    title: "Memory Consolidation During 'Sleep'",
    category: "consolidation",
    status: "early-exploration",
    description:
      "In humans, sleep consolidation reorganizes memories: strengthening important ones, pruning trivial ones, " +
      "and converting episodic memories into semantic knowledge. Can AI agents do offline processing of stored observations " +
      "to improve their memory quality over time?",
    currentState:
      "TiMem (2025) implements hierarchical consolidation with a Temporal Memory Tree (TMT) " +
      "that organizes memories with explicit temporal containment and order. " +
      "A-MEM's self-organizing Zettelkasten demonstrates memory evolution — new observations trigger updates to related historical memories. " +
      "A 2025 implementation demonstrated 'sleep consolidation' that builds self-organizing knowledge graphs " +
      "from accumulated observations offline. " +
      "Episodic-to-semantic conversion pathways are discussed in multiple 2025 surveys but rarely implemented.",
    barriers: [
      "Computational cost: consolidation requires LLM calls to re-evaluate and reorganize stored memories",
      "Defining 'sleep': when should consolidation run? After every session? Nightly? On-demand?",
      "Quality validation: how to verify that consolidation improved rather than degraded memory quality",
      "Contradiction resolution: when two memories conflict, which is the ground truth?",
      "Schema evolution: memory structure itself may need to change as the project evolves",
    ],
    keyWork: [
      "TiMem — temporal-hierarchical memory consolidation (arXiv:2601.02845, 2025)",
      "A-MEM — self-organizing memory evolution (NeurIPS 2025)",
      "MarkTechPost, \"Building Self-Organizing Zettelkasten Knowledge Graphs and Sleep-Consolidation Mechanisms\" (2025)",
      "\"Memory for Autonomous LLM Agents\" survey — discusses consolidation from episodic to semantic memory (2026)",
    ],
    implications:
      "Engram could run nightly consolidation: scan recent observations, merge related ones, " +
      "promote recurring patterns from episodic (bug/ session/) to semantic (decision/ pattern/), " +
      "and flag stale observations for review. This is the L1/L2 memory tier vision: " +
      "L1 (hot, recent, specific) consolidates into L2 (warm, abstract, reusable).",
    color: "#f59e0b",
  },
  {
    id: "attention-as-memory",
    title: "Attention as Memory Selection",
    category: "architecture",
    status: "theoretical",
    description:
      "The transformer attention mechanism is functionally a memory retrieval system: " +
      "queries select relevant information from keys, weighted by learned relevance scores. " +
      "This creates a deep connection between attention mechanisms and memory access patterns.",
    currentState:
      "Research shows that RNN attention mechanisms directly correspond to the Context Maintenance and Retrieval (CMR) " +
      "model of human memory (Nature Communications Psychology, 2025). " +
      "Titans (2025) introduce meta in-context neural long-term memory that stores 'surprising' data at test time, " +
      "combining core attention-based short-term, neural long-term, and persistent task memory. " +
      "B'MOJO generalizes transformers and SSMs by blending permanent, short-term, fading, and long-term memories. " +
      "The Cognitive Workspace framework (2025) applies global workspace theory to LLM active memory management.",
    barriers: [
      "Attention is implicit: the model can't explain why it attended to a particular token",
      "Fixed at inference: attention patterns emerge from weights, not from learned retrieval strategies",
      "No persistence: attention patterns don't carry over between sessions or even between forward passes",
      "Scale mismatch: attention operates at token level, but memory should operate at concept level",
    ],
    keyWork: [
      "\"Sequence-to-sequence models with attention mechanistically map to human memory search,\" Nature Comm Psych, 2025",
      "Titans — meta in-context neural long-term memory (2025)",
      "B'MOJO — blending permanent, short-term, fading, and long-term memories",
      "\"Memory-Augmented Transformers: From Neuroscience Principles to Technical Solutions\" — survey, arXiv:2508.10824",
      "\"Beyond Markov: Transformers, Memory, and Attention\" — Cognitive Neuroscience, 2025",
    ],
    implications:
      "External memory systems (engram, Mem0, Zep) operate at a fundamentally different level than internal attention. " +
      "Attention selects among tokens already in context; external memory selects what enters context in the first place. " +
      "The two are complementary: external retrieval curates the context, internal attention processes it. " +
      "Future architectures may blur this boundary with learned external retrieval heads.",
    color: "#ec4899",
  },
  {
    id: "sparse-efficient-transformers",
    title: "Sparse Attention & Efficient Transformers",
    category: "scaling",
    status: "production-emerging",
    description:
      "Reducing the quadratic cost of attention through sparsity patterns, linear approximations, " +
      "and hybrid architectures that combine local attention with compressed global memory.",
    currentState:
      "Infini-attention combines masked local attention and long-term linear attention in a single block. " +
      "Sparse patterns (BigBird, Longformer) achieve O(n log n) for structured documents. " +
      "KV cache compression (H2O, StreamingLLM, SnapKV, DynamicKV, PyramidKV) retains a subset of tokens to reduce inference costs. " +
      "State space models (Mamba, Megalodon) achieve linear complexity but trade off random-access retrieval. " +
      "Non-attention architectures are emerging that handle 1M+ tokens at linear cost.",
    barriers: [
      "Sparse attention can miss long-range dependencies that happen to cross sparse boundaries",
      "Linear approximations sacrifice the expressiveness of full quadratic attention",
      "SSMs have weaker random-access retrieval than transformers (good for language modeling, worse for QA)",
      "Evaluation: most benchmarks test up to 128k tokens — behavior at 1M+ is poorly understood",
      "Training: sparse models need different training recipes, making adoption harder",
    ],
    keyWork: [
      "Munkhdalai et al., Infini-attention, 2024",
      "Zaheer et al., BigBird, 2020; Beltagy et al., Longformer, 2020",
      "Gu & Dao, Mamba, 2023; Meta, Megalodon, 2024",
      "StreamingLLM (Xiao et al., 2023), H2O, SnapKV, DynamicKV — KV cache compression",
      "\"Breaking Quadratic Barriers: A Non-Attention LLM for Ultra-Long Context\" (2025)",
    ],
    implications:
      "Even with efficient transformers, external memory remains necessary. " +
      "Linear attention and SSMs trade retrieval precision for throughput — " +
      "they're better at modeling long sequences but worse at needle-in-a-haystack retrieval. " +
      "This means that as context windows grow, the quality of what's IN the context matters more, not less. " +
      "Memory systems that curate context (like engram) become more valuable, not less, as windows expand.",
    color: "#22c55e",
  },
];

export const CATEGORY_META = {
  scaling: {
    label: "Scaling",
    icon: "^",
    description: "Making context windows and memory capacity larger",
  },
  learning: {
    label: "Learning",
    icon: "~",
    description: "Models learning to manage their own memory",
  },
  architecture: {
    label: "Architecture",
    icon: "#",
    description: "Structural approaches to persistent memory",
  },
  consolidation: {
    label: "Consolidation",
    icon: "*",
    description: "Offline processing to improve stored memory quality",
  },
};

export const STATUS_META = {
  "active-research": { label: "Active Research", color: "#60a5fa" },
  "early-exploration": { label: "Early Exploration", color: "#f59e0b" },
  "production-emerging": { label: "Production Emerging", color: "#4ade80" },
  "theoretical": { label: "Theoretical", color: "#a855f7" },
};
