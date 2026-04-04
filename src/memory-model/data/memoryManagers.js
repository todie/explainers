/**
 * Alternative Memory Managers for LLM Agents
 * Research compiled April 2026
 */



export const MEMORY_MANAGERS = [
  {
    id: "memgpt-letta",
    name: "MemGPT / Letta",
    tagline: "LLMs as Operating Systems — virtual context management",
    authors: "Packer, Wooders, Lin, Fang, Patil, Stoica, Gonzalez (UC Berkeley)",
    year: 2023,
    citation: "Packer et al., \"MemGPT: Towards LLMs as Operating Systems,\" arXiv:2310.08560, Oct 2023",
    architecture:
      "OS-inspired two-tier memory hierarchy. Core memory (always in-context, like RAM) holds essential facts and persona. " +
      "Archival memory (external vector store, like disk) holds long-term knowledge. Recall memory stores conversation history. " +
      "The LLM acts as an \"LLM OS\" that explicitly manages data movement between virtual context (all available data) " +
      "and physical context (the actual token window) via self-directed function calls.",
    storageBackend:
      "PostgreSQL (production) with pgvector for similarity search, SQLite (dev/pip install). " +
      "42 tables manage agents, memory, messages, and metadata. Supports Aurora PostgreSQL in cloud deployments.",
    retrievalMethod:
      "Agent-initiated tool calls: archival_memory_search (vector similarity over embeddings), " +
      "archival_memory_insert, core_memory_append, core_memory_replace. The agent decides when to page data " +
      "in and out of its own context — no external orchestrator.",
    keyDifferentiator:
      "The OS metaphor: the agent controls its own memory like a process manages virtual memory. " +
      "Self-editing core memory means the agent can update its own persistent beliefs. " +
      "Interrupt-driven control flow handles both user messages and system events. " +
      "Now part of Letta framework (Sept 2024) with Conversations API for shared memory across parallel experiences.",
    limitations: [
      "OS-paging metaphor adds complexity and latency that doesn't always pay off on standard benchmarks",
      "Agentic loop overhead makes simple tasks surprisingly expensive (each memory op is a full LLM call)",
      "Core memory edits can drift or degrade over many turns without guardrails",
      "PostgreSQL requirement for production adds infrastructure complexity",
      "93.4% on Deep Memory Retrieval benchmark — outperformed by Zep (94.8%)",
    ],
    stars: "~38k",
    url: "https://github.com/letta-ai/letta",
    color: "#8b5cf6",
  },
  {
    id: "mem0",
    name: "Mem0",
    tagline: "The memory layer for AI apps — extract, consolidate, retrieve",
    authors: "Chhikara, Khant, et al. (Mem0 AI)",
    year: 2024,
    citation: "Chhikara et al., \"Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory,\" arXiv:2504.19413, ECAI 2025",
    architecture:
      "Two-phase memory pipeline: Extraction (identify salient facts from conversation) and Update (consolidate into memory store). " +
      "Mem0g variant adds graph-based memory representations that capture complex relational structures among conversational elements. " +
      "Hybrid architecture combines vector search with graph traversal for deeper context.",
    storageBackend:
      "Vector store (multiple backends: Qdrant, Pinecone, Weaviate, ChromaDB, pgvector). " +
      "Graph store (Neo4j) for Mem0g relational memory. " +
      "Supports AWS ElastiCache + Neptune Analytics for enterprise deployments.",
    retrievalMethod:
      "Hybrid: vector similarity search for semantically similar facts + graph traversal for relationally connected facts. " +
      "Achieves p95 search latency of 0.200 seconds using ~1,764 tokens per conversation vs 26,031 for full-context.",
    keyDifferentiator:
      "Production-scale efficiency: 91% lower p95 latency, 90%+ token cost savings vs full-context approaches. " +
      "Graph memory captures relational structures that flat vector stores miss. " +
      "Largest community: 41k+ GitHub stars, 14M+ pip downloads, 186M API calls/quarter (Q3 2025). " +
      "Published peer-reviewed paper with comprehensive benchmarks.",
    limitations: [
      "Graph memory adds ~2% over base config — marginal gains for added complexity",
      "Benchmark methodology disputed by competitors (Zep, Letta published rebuttals)",
      "Extraction phase depends entirely on LLM quality — garbage in, garbage out",
      "No procedural memory support (can't learn skills, only facts)",
      "Cloud-first design — self-hosted requires significant infrastructure",
    ],
    stars: "~41k",
    url: "https://github.com/mem0ai/mem0",
    color: "#06b6d4",
  },
  {
    id: "zep-graphiti",
    name: "Zep / Graphiti",
    tagline: "Temporal knowledge graph architecture for agent memory",
    authors: "Rasmussen et al. (Zep AI)",
    year: 2025,
    citation: "Rasmussen, \"Zep: A Temporal Knowledge Graph Architecture for Agent Memory,\" arXiv:2501.13956, Jan 2025",
    architecture:
      "Hierarchical knowledge graph mirroring human memory: episodic subgraph (raw interaction data), " +
      "semantic subgraph (extracted entities and relationships), and community subgraph (high-level domain summaries). " +
      "Graphiti is the open-source temporal context graph engine at the core. " +
      "Bi-temporal model tracks both when an event occurred and when it was ingested.",
    storageBackend:
      "Neo4j graph database for knowledge graph storage. " +
      "Supports incremental graph updates without batch recomputation. " +
      "Facts have explicit validity intervals — old facts are invalidated, not deleted.",
    retrievalMethod:
      "Multi-modal: semantic search over entity embeddings + graph traversal over relationship edges + " +
      "temporal filtering (query what's true now, or what was true at any point). " +
      "Community summaries provide high-level context without traversing the full graph.",
    keyDifferentiator:
      "Temporal fact management: facts have validity windows, enabling time-travel queries. " +
      "Non-lossy updates — information changes are tracked, not overwritten. " +
      "94.8% on Deep Memory Retrieval benchmark (outperforms MemGPT's 93.4%). " +
      "18.5% accuracy improvement with 90% latency reduction over baselines. " +
      "Simultaneously handles chat histories, structured JSON, and unstructured text in a single graph.",
    limitations: [
      "Memory footprint exceeds 600k tokens per conversation (vs Mem0's 1,764) per Mem0's benchmark",
      "Neo4j dependency adds significant infrastructure complexity and cost",
      "Immediate post-ingestion retrieval can fail — correct answers may appear hours later (per Mem0 testing, disputed by Zep)",
      "Graph construction requires multiple LLM calls per ingestion — expensive at scale",
      "Zep team disputes competitor benchmarks — claimed corrected score of 75.14% on LOCOMO",
    ],
    stars: "~3k (Graphiti)",
    url: "https://github.com/getzep/graphiti",
    color: "#f59e0b",
  },
  {
    id: "claude-mem",
    name: "claude-mem",
    tagline: "Automatic capture via hooks, AI compression, ChromaDB",
    authors: "thedotmack",
    year: 2025,
    citation: "Open source plugin for Claude Code",
    architecture:
      "Five lifecycle hooks: SessionStart, UserPromptSubmit, PostToolUse, Summary, SessionEnd. " +
      "Worker service HTTP API on port 37777. Automatically captures after every tool call. " +
      "Compresses observations into typed schema (type, title, facts, narrative). " +
      "Three-tier retrieval loads only what's relevant instead of dumping everything into context.",
    storageBackend:
      "Dual storage: SQLite at ~/.claude-mem/claude-mem.db for structured data, " +
      "ChromaDB at ~/.claude-mem/vector-db for vector embeddings. " +
      "Local-first — everything runs on your machine.",
    retrievalMethod:
      "Three-mode search strategy selection: filter-only queries via SQLite, " +
      "semantic queries via ChromaDB with hydration from SQLite, " +
      "or hybrid searches combining both. Automatic relevance scoring.",
    keyDifferentiator:
      "Purpose-built for Claude Code — installs as a plugin via marketplace. " +
      "Fully automatic capture (no manual save calls needed). " +
      "AI-powered compression means raw observations are summarized before storage. " +
      "Local-first design — zero cloud dependency. " +
      "Hybrid SQLite + ChromaDB gives both keyword and semantic search.",
    limitations: [
      "Tightly coupled to Claude Code — not usable with other LLM agents",
      "ChromaDB adds Python dependency and memory overhead",
      "Compression quality depends on the model doing the summarization",
      "No graph memory or relational reasoning between observations",
      "No temporal fact management — can't query 'what was true at time X'",
      "Relatively new — smaller community and less battle-tested than Mem0/Zep",
    ],
    stars: "~2k",
    url: "https://github.com/thedotmack/claude-mem",
    color: "#ec4899",
  },
  {
    id: "langchain-memory",
    name: "LangChain Memory Modules",
    tagline: "Modular memory types for conversational AI chains",
    authors: "LangChain team (Harrison Chase et al.)",
    year: 2023,
    citation: "LangChain framework — open source",
    architecture:
      "Modular memory types plugged into LLM chains: " +
      "ConversationBufferMemory (full history), ConversationSummaryMemory (LLM-summarized), " +
      "ConversationSummaryBufferMemory (hybrid: recent raw + older summarized), " +
      "ConversationTokenBufferMemory (token-limited window), " +
      "ConversationEntityMemory (entity extraction), VectorStoreRetrieverMemory (semantic search). " +
      "Now largely superseded by LangMem SDK (2025).",
    storageBackend:
      "Pluggable — in-memory by default, but supports any vector DB, " +
      "MongoDB, Postgres via pgvector, Redis, and custom backends.",
    retrievalMethod:
      "Varies by type: raw history passthrough, LLM summarization, token window truncation, " +
      "entity extraction + lookup, or vector similarity search. " +
      "All inject retrieved context into the {history} template variable.",
    keyDifferentiator:
      "Widest adoption and ecosystem integration. Simple API for common patterns. " +
      "Composable — different memory types can be combined. " +
      "LangMem SDK (2025) adds three memory types from cognitive science: " +
      "episodic (past interactions), semantic (facts/preferences), procedural (self-updating instructions). " +
      "Procedural memory is architecturally unique: agents update their own system prompts based on feedback.",
    limitations: [
      "Original memory modules are now deprecated/legacy — migration to LangMem required",
      "ConversationBufferMemory scales linearly with tokens — unusable for long conversations",
      "ConversationSummaryMemory depends entirely on LLM summarization quality",
      "No temporal awareness — can't distinguish when facts were true",
      "No graph memory in core modules (requires separate integration)",
      "Framework lock-in — tightly coupled to LangChain's chain/agent abstractions",
    ],
    stars: "~105k (LangChain)",
    url: "https://github.com/langchain-ai/langmem",
    color: "#10b981",
  },
  {
    id: "a-mem",
    name: "A-MEM",
    tagline: "Zettelkasten-inspired self-organizing agentic memory",
    authors: "Xu, Liang et al.",
    year: 2025,
    citation: "Xu & Liang, \"A-MEM: Agentic Memory for LLM Agents,\" NeurIPS 2025, arXiv:2502.12110",
    architecture:
      "Zettelkasten-method-inspired note-based structure. Each memory unit (note) is enriched with " +
      "LLM-generated keywords, tags, contextual descriptions, and dynamically constructed links to semantically related memories. " +
      "When new memories are added, the system analyzes historical memories to establish connections " +
      "and can trigger updates to existing memories — the network continuously self-refines.",
    storageBackend:
      "Note-based storage with embedding-indexed retrieval. " +
      "Links generated via embedding similarity + LLM reasoning. " +
      "Designed for pluggable backends.",
    retrievalMethod:
      "Graph traversal over the self-organizing link network + semantic similarity. " +
      "Sub-10 microsecond retrieval latency for 1M notes. " +
      "Memory evolution: new memories update contextual representations of related historical memories.",
    keyDifferentiator:
      "Self-organizing: memories dynamically index and link themselves without predefined schema. " +
      "Memory evolution — the network refines as new knowledge accretes, not just appends. " +
      "85-93% token reduction in memory operations vs baselines. " +
      "Published at NeurIPS 2025 with strong empirical results on DialSim benchmark.",
    limitations: [
      "LLM calls required for link generation and memory evolution — expensive per ingestion",
      "Self-organization can create spurious links without careful threshold tuning",
      "Relatively new (Feb 2025) — less production validation than Mem0/Zep",
      "No temporal fact management",
      "Zettelkasten metaphor may not scale to enterprise multi-tenant workloads",
    ],
    stars: "~5k",
    url: "https://github.com/agiresearch/A-mem",
    color: "#f97316",
  },
];

/** Comparison dimensions for the matrix view */


export const COMPARISON_DIMENSIONS = [
  { id: "search-type", label: "Search Type", description: "How memories are found: keyword, vector, graph, or hybrid" },
  { id: "storage", label: "Storage", description: "Where memories live: SQLite, Postgres, Neo4j, vector DB" },
  { id: "auto-capture", label: "Auto Capture", description: "Does it capture memories without explicit save calls?" },
  { id: "temporal", label: "Temporal Awareness", description: "Can it track when facts were valid and handle contradictions?" },
  { id: "self-editing", label: "Self-Editing Memory", description: "Can the agent modify its own persistent beliefs?" },
  { id: "graph", label: "Graph/Relational", description: "Does it capture relationships between entities, not just flat facts?" },
  { id: "local-first", label: "Local-First", description: "Can it run entirely on-device without cloud services?" },
  { id: "latency", label: "Retrieval Latency", description: "How fast can it return relevant memories?" },
];

/** Feature matrix: managerId -> dimensionId -> value */
export const FEATURE_MATRIX> = {
  "memgpt-letta": {
    "search-type": "Vector (pgvector) + agent-initiated",
    "storage": "PostgreSQL / SQLite",
    "auto-capture": "No — agent must explicitly call memory tools",
    "temporal": "No",
    "self-editing": "Yes — core memory is self-editable",
    "graph": "No",
    "local-first": "SQLite for dev, Postgres for production",
    "latency": "High (each memory op = LLM call)",
  },
  "mem0": {
    "search-type": "Hybrid: vector + graph traversal",
    "storage": "Vector DB (Qdrant/Pinecone/etc) + Neo4j",
    "auto-capture": "Yes — extraction pipeline runs automatically",
    "temporal": "Partial — tracks recency, no validity windows",
    "self-editing": "No",
    "graph": "Yes (Mem0g variant)",
    "local-first": "No — cloud-first design",
    "latency": "Low (p95: 200ms)",
  },
  "zep-graphiti": {
    "search-type": "Hybrid: semantic + graph + temporal",
    "storage": "Neo4j knowledge graph",
    "auto-capture": "Yes — ingests conversation automatically",
    "temporal": "Yes — bi-temporal with validity intervals",
    "self-editing": "No",
    "graph": "Yes — core architecture",
    "local-first": "No — requires Neo4j",
    "latency": "Medium (90% reduction over baselines)",
  },
  "claude-mem": {
    "search-type": "Hybrid: SQLite FTS + ChromaDB vectors",
    "storage": "SQLite + ChromaDB (local)",
    "auto-capture": "Yes — hook-based on every tool call",
    "temporal": "No",
    "self-editing": "No",
    "graph": "No",
    "local-first": "Yes — fully local",
    "latency": "Low (local SQLite + ChromaDB)",
  },
  "langchain-memory": {
    "search-type": "Varies: raw / summary / vector",
    "storage": "Pluggable (in-memory, vector DB, Postgres)",
    "auto-capture": "Partial — automatic within chain execution",
    "temporal": "No",
    "self-editing": "Yes — procedural memory in LangMem",
    "graph": "No (requires separate integration)",
    "local-first": "Depends on backend choice",
    "latency": "Varies by memory type",
  },
  "a-mem": {
    "search-type": "Graph traversal + semantic similarity",
    "storage": "Note-based with embeddings",
    "auto-capture": "Yes — automated note creation and linking",
    "temporal": "No",
    "self-editing": "Yes — memory evolution updates existing notes",
    "graph": "Yes — self-organizing link network",
    "local-first": "Yes",
    "latency": "Very low (<10us for 1M notes)",
  },
};
