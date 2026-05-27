/**
 * Deep component architecture data — ORM, data flows, sequence diagrams.
 */

// ─── OBJECT-RELATIONAL MODEL ─────────────────────────────────────────

export const ENTITIES = [
  {
    name: 'Chunk',
    description: 'The atomic unit of knowledge. Layer-agnostic — same chunk can exist across layers.',
    color: '#a855f7',
    fields: [
      { group: 'Identity', fields: [
        { name: 'id', type: 'UUID', desc: 'Stable — survives cross-layer migration' },
        { name: 'topic_key', type: 'String', desc: 'family/slug conceptual identity (e.g. decision/use-tokio)' },
      ]},
      { group: 'Content', fields: [
        { name: 'title', type: 'String', desc: 'Short, searchable title' },
        { name: 'content', type: 'String', desc: 'Markdown body' },
        { name: 'kind', type: 'ChunkKind', desc: 'Directive | Preference | Decision | Reference | Heuristic | Session | Config | Bug' },
      ]},
      { group: 'Placement', fields: [
        { name: 'canonical_layer', type: 'Layer', desc: 'Where it SHOULD live per placement framework' },
        { name: 'current_layers', type: 'Vec<LayerRef>', desc: 'Where it currently exists, with layer-specific IDs' },
      ]},
      { group: 'Lifecycle', fields: [
        { name: 'created', type: 'DateTime', desc: 'When first saved' },
        { name: 'last_accessed', type: 'DateTime', desc: 'Triggers reconsolidation window' },
        { name: 'access_count', type: 'u32', desc: 'Total accesses (less important than session_spread)' },
        { name: 'revision_count', type: 'u32', desc: 'Times content was modified' },
        { name: 'staleness_score', type: 'f32', desc: 'Computed: time_since_access * decay_rate_per_kind' },
        { name: 'signal_score', type: 'f32', desc: 'Computed: access_freq * revisions * kind_weight' },
      ]},
      { group: 'Neuroscience', fields: [
        { name: 'strength', type: 'f32', desc: 'SHY model — decays globally during dream downscale' },
        { name: 'depth_score', type: 'u8 (1-3)', desc: 'Levels of processing: 1=fact, 2=fact+context, 3=fact+context+rationale+links' },
        { name: 'session_spread', type: 'u32', desc: 'Spacing effect — distinct sessions accessed. PRIMARY importance signal' },
        { name: 'stability', type: 'f32', desc: 'Ebbinghaus S parameter — higher = slower forgetting. Grows with spaced retrieval' },
        { name: 'importance_tag', type: 'Option<String>', desc: 'Behavioral tagging: None | Proximity | Explicit | CrossSession | SchemaViolation' },
        { name: 'consolidation_status', type: 'ConsolidationStatus', desc: 'Staged → Consolidated → Archived' },
        { name: 'version', type: 'u32', desc: 'Reconsolidation version counter' },
      ]},
      { group: 'Relationships', fields: [
        { name: 'related_to', type: 'Vec<ChunkId>', desc: 'Conceptual links (heuristic triads, related knowledge)' },
        { name: 'supersedes', type: 'Option<ChunkId>', desc: 'This chunk replaces an older one' },
        { name: 'superseded_by', type: 'Option<ChunkId>', desc: 'A newer chunk has replaced this one' },
      ]},
      { group: 'Provenance', fields: [
        { name: 'source_session', type: 'String', desc: 'Session that created this chunk' },
        { name: 'source_project', type: 'String', desc: 'Project context (set from content, NOT session)' },
        { name: 'schema_id', type: 'String', desc: 'Schema version for forward-compatible storage' },
      ]},
    ],
  },
]

export const ENUMS = [
  { name: 'ChunkKind', color: '#6366f1', variants: [
    { name: 'Directive', layer: 'InstructionFile', desc: 'Behavioral rules → CLAUDE.md' },
    { name: 'Preference', layer: 'SessionMemory', desc: 'User feedback, work style → auto-memory' },
    { name: 'Decision', layer: 'StructuredDb', desc: 'Project architecture choices → engram' },
    { name: 'Reference', layer: 'KnowledgeBase', desc: 'Deep knowledge, books → Obsidian' },
    { name: 'Heuristic', layer: 'KnowledgeBase', desc: 'Engineering principles → Obsidian MOC' },
    { name: 'Session', layer: 'StructuredDb', desc: 'Session summaries → engram' },
    { name: 'Config', layer: 'StructuredDb', desc: 'Tool configs, API details → engram' },
    { name: 'Bug', layer: 'StructuredDb', desc: 'Bugfixes with root cause → engram' },
  ]},
  { name: 'Layer', color: '#22c55e', variants: [
    { name: 'InstructionFile', capacity: '~200 lines', latency: '0ms', desc: 'CLAUDE.md / rules/' },
    { name: 'SessionMemory', capacity: '~200 line index', latency: '0ms', desc: 'Auto-memory MEMORY.md' },
    { name: 'StructuredDb', capacity: 'Unbounded', latency: '~3ms', desc: 'SQLite + FTS5 + vec' },
    { name: 'KnowledgeBase', capacity: 'Unbounded', latency: 'N/A', desc: 'Obsidian vault' },
  ]},
  { name: 'ConsolidationStatus', color: '#eab308', variants: [
    { name: 'Staged', desc: 'Newly ingested, awaiting dream cycle' },
    { name: 'Consolidated', desc: 'Processed and placed by dream engine' },
    { name: 'Archived', desc: 'Demoted to long-term / Obsidian only' },
  ]},
]

export const RELATIONSHIPS = [
  { from: 'Chunk', to: 'Chunk', label: 'related_to', cardinality: 'many-to-many', desc: 'Conceptual links — heuristic triads, related decisions' },
  { from: 'Chunk', to: 'Chunk', label: 'supersedes', cardinality: 'one-to-one', desc: 'Version chain — newer replaces older' },
  { from: 'Chunk', to: 'LayerRef', label: 'current_layers', cardinality: 'one-to-many', desc: 'Where the chunk currently lives' },
  { from: 'ChunkKind', to: 'Layer', label: 'maps to', cardinality: 'many-to-one', desc: 'Placement tree — each kind has a canonical layer' },
]

// ─── DATA FLOWS PER CRATE ────────────────────────────────────────────

export const CRATE_FLOWS = [
  {
    crate: 'reverie-store',
    description: 'Storage engine — SQLite with FTS5 keyword + sqlite-vec vector + hybrid RRF search',
    color: '#3b82f6',
    modules: [
      { name: 'chunk', role: 'Data model — Chunk struct, enums, serialization' },
      { name: 'sqlite', role: 'SQLite connection, schema migrations, CRUD operations' },
      { name: 'search', role: 'Hybrid search: FTS5 keyword → vector similarity → RRF fusion' },
      { name: 'mcp', role: 'Shared MCP business logic — add_observation_inner, passive_capture_inner (engram-compat plugin tools delegate here)' },
      { name: 'http', role: 'HTTP API — backward-compatible with mem raw (GET/POST/PUT/DELETE)' },
    ],
    dataFlow: [
      { from: 'mcp', to: 'sqlite', label: 'write observation', protocol: 'rusqlite' },
      { from: 'http', to: 'search', label: 'query', protocol: 'function call' },
      { from: 'search', to: 'sqlite', label: 'FTS5 MATCH', protocol: 'SQL' },
      { from: 'search', to: 'sqlite', label: 'vec distance', protocol: 'sqlite-vec' },
      { from: 'search', label: 'RRF fusion', protocol: 'in-memory', desc: 'Reciprocal Rank Fusion combines keyword + vector results' },
    ],
  },
  {
    crate: 'reverie-dream',
    description: 'Consolidation engine — 6-phase pipeline modeled on biological sleep',
    color: '#a855f7',
    modules: [
      { name: 'scan', role: 'Read new/changed chunks from all layers, build chunk index' },
      { name: 'classify', role: 'Apply placement tree + activation score to each chunk' },
      { name: 'replay', role: 'SWR priority queue — select chunks for consolidation by importance' },
      { name: 'interleave', role: 'CLS: process new chunks alongside related existing ones' },
      { name: 'reconsolidate', role: 'Update accessed chunks — prediction error → update, confirm → strengthen' },
      { name: 'downscale', role: 'SHY global decay — all chunks lose N% strength, weak fall below threshold' },
      { name: 'promote', role: 'Cross-layer migration — promote/demote based on access patterns' },
    ],
    dataFlow: [
      { from: 'scan', to: 'classify', label: 'new chunks', protocol: 'Vec<Chunk>' },
      { from: 'classify', to: 'replay', label: 'classified chunks', protocol: 'Vec<(Chunk, Layer)>' },
      { from: 'replay', to: 'interleave', label: 'priority-sorted', protocol: 'PriorityQueue<Chunk>' },
      { from: 'interleave', to: 'reconsolidate', label: 'merged chunks', protocol: 'Vec<Chunk>' },
      { from: 'reconsolidate', to: 'downscale', label: 'updated chunks', protocol: 'Vec<Chunk>' },
      { from: 'downscale', to: 'promote', label: 'surviving chunks', protocol: 'Vec<(Chunk, Action)>' },
    ],
  },
  {
    crate: 'reverie-gate',
    description: 'Write gate — pre-save hook preventing misplacement at write time',
    color: '#f97316',
    modules: [
      { name: 'classify', role: 'Apply placement decision tree to proposed chunk' },
      { name: 'dedup', role: 'Check if topic_key already exists in any layer' },
      { name: 'derive', role: 'Check if content is derivable from code/git (→ don\'t store)' },
      { name: 'budget', role: 'Enforce CLAUDE.md 200-line ceiling, auto-memory index cap' },
    ],
    dataFlow: [
      { from: 'classify', label: 'target layer', protocol: 'Layer' },
      { from: 'dedup', label: 'existing match?', protocol: 'Option<ChunkId>' },
      { from: 'derive', label: 'derivable?', protocol: 'bool' },
      { from: 'budget', label: 'over budget?', protocol: 'bool' },
    ],
  },
  {
    crate: 'reverie-sync',
    description: 'Layer adapters — write to external layers with dedup',
    color: '#22c55e',
    modules: [
      { name: 'obsidian', role: 'Write Obsidian notes with frontmatter, topic_key dedup' },
      { name: 'automemory', role: 'Generate MEMORY.md + files from consolidated store' },
      { name: 'claudemd', role: 'Propose CLAUDE.md edits (procedural memory)' },
      { name: 'dedup', role: 'Cross-layer topic_key matching to prevent duplicates' },
    ],
    dataFlow: [
      { from: 'dedup', to: 'obsidian', label: 'unique chunks', protocol: 'Vec<Chunk>' },
      { from: 'dedup', to: 'automemory', label: 'behavioral chunks', protocol: 'Vec<Chunk>' },
      { from: 'dedup', to: 'claudemd', label: 'directive proposals', protocol: 'Vec<Chunk>' },
    ],
  },
  {
    crate: 'reveried',
    description: 'Daemon binary — HTTP + MCP server, dream scheduler, worker lifecycle, Prometheus metrics',
    color: '#a855f7',
    modules: [
      { name: 'http', role: 'HTTP server (:7437) — /search, /observations, /health, /v1/workers/*, /metrics' },
      { name: 'mcp', role: 'Native MCP surface (6 tools): search_memory, smart_context, add_observation, add_observation_passive, dream_status, dream_last_report' },
      { name: 'scheduler', role: 'Dream cycle scheduler — session-end / nightly / weekly / monthly triggers' },
      { name: 'workers', role: 'Mesh worker lifecycle — register, heartbeat, drain, evict via /v1/workers/*' },
      { name: 'metrics', role: 'Prometheus metrics endpoint — operation counters, latency histograms, worker gauges' },
      { name: 'config', role: 'SIGHUP hot-reload — apply config changes without restart' },
    ],
    dataFlow: [
      { from: 'http', to: 'mcp', label: 'shared store handle', protocol: 'Arc<dyn Store>' },
      { from: 'mcp', to: 'http', label: 'tool dispatch', protocol: 'function call' },
      { from: 'scheduler', to: 'http', label: 'trigger dream cycle', protocol: 'channel' },
      { from: 'workers', to: 'metrics', label: 'worker events', protocol: 'counter' },
    ],
  },
]

// ─── SEQUENCE DIAGRAMS ───────────────────────────────────────────────

export const SEQUENCES = [
  {
    id: 'mem-save',
    title: 'mem_save Flow (Write Path)',
    description: 'What happens when Claude calls mem_save during a session. The write gate intercepts, classifies, and routes to the correct layer.',
    actors: ['Claude Code', 'reveried', 'gate', 'store', 'sqlite'],
    steps: [
      { from: 0, to: 1, label: 'mem_save(title, content, type)', protocol: 'MCP stdio', color: '#22c55e' },
      { from: 1, to: 2, label: 'gate.check(proposed_chunk)', protocol: 'fn call', color: '#f97316' },
      { from: 2, to: 2, label: 'classify → target layer', protocol: 'internal', color: '#f97316', self: true },
      { from: 2, to: 2, label: 'dedup → existing match?', protocol: 'internal', color: '#f97316', self: true },
      { from: 2, to: 2, label: 'derive → from code?', protocol: 'internal', color: '#f97316', self: true },
      { from: 2, to: 2, label: 'budget → capacity ok?', protocol: 'internal', color: '#f97316', self: true },
      { from: 2, to: 1, label: 'GateDecision: Allow(StructuredDb) | Redirect(SessionMemory) | Upsert(id) | Reject(reason)', protocol: 'return', color: '#f97316' },
      { from: 1, to: 3, label: 'store.insert(chunk, Staged)', protocol: 'fn call', color: '#3b82f6', note: 'ConsolidationStatus::Staged — not yet processed by dream' },
      { from: 3, to: 4, label: 'INSERT INTO chunks ...', protocol: 'SQL', color: '#eab308' },
      { from: 4, to: 3, label: 'rowid', protocol: 'return', color: '#eab308' },
      { from: 3, to: 1, label: 'ChunkId', protocol: 'return', color: '#3b82f6' },
      { from: 1, to: 0, label: 'saved: ChunkId', protocol: 'MCP response', color: '#22c55e' },
    ],
  },
  {
    id: 'dream-cycle',
    title: 'Dream Cycle (Consolidation)',
    description: 'Offline consolidation triggered at session end or by cron. Six phases process staged observations into consolidated knowledge.',
    actors: ['scheduler', 'scan', 'replay', 'interleave', 'reconsolidate', 'downscale', 'promote', 'sync'],
    steps: [
      { from: 0, to: 1, label: 'trigger: session_end | cron | threshold', protocol: 'event', color: '#a855f7' },
      { from: 1, to: 1, label: 'read all layers, build chunk index', protocol: 'internal', color: '#a855f7', self: true },
      { from: 1, to: 2, label: 'staged_chunks + classify()', protocol: 'Vec<Chunk>', color: '#ef4444' },
      { from: 2, to: 2, label: 'priority queue: recency * access * importance * novelty', protocol: 'internal', color: '#ef4444', self: true },
      { from: 2, to: 3, label: 'priority-sorted chunks', protocol: 'PriorityQueue', color: '#f97316' },
      { from: 3, to: 3, label: 'for each: retrieve top-3 related existing chunks', protocol: 'internal', color: '#f97316', self: true },
      { from: 3, to: 3, label: 'overlap check: merge | disambiguate | insert', protocol: 'CLS', color: '#f97316', self: true },
      { from: 3, to: 4, label: 'merged chunks', protocol: 'Vec<Chunk>', color: '#eab308' },
      { from: 4, to: 4, label: 'accessed during session? prediction error → update, confirm → boost', protocol: 'internal', color: '#eab308', self: true },
      { from: 4, to: 5, label: 'updated chunks', protocol: 'Vec<Chunk>', color: '#22c55e' },
      { from: 5, to: 5, label: 'global proportional decay: ALL chunks lose N%', protocol: 'SHY', color: '#22c55e', self: true },
      { from: 5, to: 5, label: 'below threshold? active → archived → deleted', protocol: 'internal', color: '#22c55e', self: true },
      { from: 5, to: 6, label: 'surviving chunks + actions', protocol: 'Vec<(Chunk, Action)>', color: '#3b82f6' },
      { from: 6, to: 6, label: 'retroactive boost near importance events', protocol: 'tagging', color: '#3b82f6', self: true },
      { from: 6, to: 6, label: 'session_spread >= 5 → auto-promote', protocol: 'spacing', color: '#3b82f6', self: true },
      { from: 6, to: 7, label: 'trigger layer sync', protocol: 'fn call', color: '#8b5cf6' },
      { from: 7, to: 7, label: 'push to Obsidian, regenerate auto-memory, propose CLAUDE.md', protocol: 'filesystem', color: '#8b5cf6', self: true },
    ],
  },
  {
    id: 'boot-context',
    title: 'Session Boot (Context Loading)',
    description: 'How the LLM loads memory at session start. Three layers provide context with different guarantees.',
    actors: ['Claude Code', 'filesystem', 'reveried', 'store'],
    steps: [
      { from: 0, to: 1, label: 'read CLAUDE.md (auto-loaded, always)', protocol: 'filesystem', color: '#ef4444' },
      { from: 1, to: 0, label: '~200 lines of directives', protocol: 'return', color: '#ef4444' },
      { from: 0, to: 1, label: 'read MEMORY.md + files (auto-loaded, always)', protocol: 'filesystem', color: '#f97316' },
      { from: 1, to: 0, label: 'user preferences, feedback, patterns', protocol: 'return', color: '#f97316' },
      { from: 0, to: 2, label: 'SessionStart hook: /context/smart?project=X', protocol: 'HTTP', color: '#3b82f6' },
      { from: 2, to: 3, label: 'query project-specific + cross-cutting chunks', protocol: 'hybrid search', color: '#3b82f6' },
      { from: 3, to: 2, label: 'top-10 by signal_score * project_relevance', protocol: 'Vec<Chunk>', color: '#3b82f6' },
      { from: 2, to: 0, label: 'context block injected into system-reminder', protocol: 'JSON', color: '#3b82f6' },
    ],
  },
  {
    id: 'search',
    title: 'Hybrid Search (Query Path)',
    description: 'How a search query flows through the hybrid search engine combining keyword and vector results.',
    actors: ['Claude Code', 'reveried', 'search', 'sqlite', 'fastembed'],
    steps: [
      { from: 0, to: 1, label: 'mem raw "/search?q=error+handling&limit=5"', protocol: 'HTTP GET', color: '#3b82f6' },
      { from: 1, to: 2, label: 'search.hybrid(query, limit)', protocol: 'fn call', color: '#3b82f6' },
      { from: 2, to: 3, label: 'FTS5: SELECT id, rank FROM chunks_fts WHERE MATCH ?', protocol: 'SQL', color: '#eab308' },
      { from: 3, to: 2, label: 'keyword_results: Vec<(id, fts_rank)>', protocol: 'return', color: '#eab308' },
      { from: 2, to: 4, label: 'embed(query_text) → 384-dim vector', protocol: 'ONNX', color: '#a855f7' },
      { from: 4, to: 2, label: 'query_vec: [f32; 384]', protocol: 'return', color: '#a855f7' },
      { from: 2, to: 3, label: 'vec: SELECT id, distance FROM chunks_vec WHERE embedding MATCH ?', protocol: 'sqlite-vec', color: '#eab308' },
      { from: 3, to: 2, label: 'vector_results: Vec<(id, distance)>', protocol: 'return', color: '#eab308' },
      { from: 2, to: 2, label: 'RRF: score = sum(1/(k + rank_i)) for each result set', protocol: 'in-memory', color: '#22c55e', self: true },
      { from: 2, to: 1, label: 'top-k by RRF score', protocol: 'Vec<Chunk>', color: '#3b82f6' },
      { from: 1, to: 0, label: 'JSON response with chunks', protocol: 'HTTP 200', color: '#3b82f6' },
    ],
  },
]
