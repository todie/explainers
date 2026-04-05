/**
 * Reverie Research Data — Structured for React Components
 *
 * Deep knowledge explainer for the Reverie project:
 * Neuroscience-grounded memory consolidation for LLM coding harnesses.
 *
 * Categories:
 * 1. layers        — The 5-layer memory hierarchy
 * 2. neuroscience  — 10 biological mechanisms mapped to implementation
 * 3. findings      — 13 empirical findings from the real-world audit
 * 4. landscape     — Competitive systems and LoCoMo benchmark
 * 5. daemon        — Reverie daemon architecture (dream cycles)
 * 6. antiPatterns  — 6 documented anti-patterns
 */

// ─── 1. MEMORY HIERARCHY ─────────────────────────────────────────────

export const LAYERS = [
  {
    id: 'registers',
    name: 'CLAUDE.md',
    cpuAnalog: 'Registers',
    brainAnalog: 'Working Memory (~7 items)',
    autoLoaded: true,
    capacity: '~200 lines',
    latency: '0ms',
    bestFor: 'Behavioral directives',
    color: '#ef4444',
    description: 'Always loaded into every session. The highest-priority layer — every line competes for attention. Over ~200 lines, adherence drops as rules get buried. Reserve for directives with the highest blast radius.',
    examples: ['Ground rules (honesty, security)', 'Environment config', 'Tool priority', 'Code quality defaults'],
    constraint: 'Zero-sum: adding a line pushes another below the attention threshold.',
  },
  {
    id: 'l1-cache',
    name: 'Auto-memory',
    cpuAnalog: 'L1 Cache',
    brainAnalog: 'Short-term Memory',
    autoLoaded: true,
    capacity: '~200 line index',
    latency: '0ms',
    bestFor: 'User preferences & feedback',
    color: '#f97316',
    description: 'Loaded every session via MEMORY.md index. Behavioral feedback, user identity, work style corrections. The LLM reads these before responding — they shape every interaction without requiring search.',
    examples: ['User profile', 'Sand mandalas work style', 'API rate limit pattern', 'Docker build feedback'],
    constraint: 'Index capped at 200 lines. Each entry is a pointer to a file.',
  },
  {
    id: 'ram',
    name: 'Engram (SQLite+FTS5)',
    cpuAnalog: 'RAM',
    brainAnalog: 'Episodic Memory (Hippocampus)',
    autoLoaded: false,
    capacity: 'Unbounded',
    latency: '~3ms',
    bestFor: 'Project decisions, bugs, architecture',
    color: '#eab308',
    description: 'Searched on-demand via keyword queries. Project-scoped with topic_key upsert for dedup. The workhorse for project-specific knowledge that\'s only relevant in context.',
    examples: ['Architecture decisions', 'Bug root causes', 'Deployment status', 'Session summaries'],
    constraint: 'FTS5 keyword search — misses synonyms. Hybrid search (Phase 1) adds vector similarity.',
  },
  {
    id: 'disk',
    name: 'Obsidian Vault',
    cpuAnalog: 'Disk/SSD',
    brainAnalog: 'Semantic Memory (Neocortex)',
    autoLoaded: false,
    capacity: 'Unbounded',
    latency: 'N/A (human browse)',
    bestFor: 'Reference knowledge, heuristics',
    color: '#22c55e',
    description: 'Browseable knowledge base with wikilinks, MOCs, and backlinks. Supports graph relationships that flat databases can\'t express. The user reads this; the LLM reads it via MCP.',
    examples: ['Engineering heuristics MOC', 'Book extraction notes', 'Project documentation', 'Dream journals'],
    constraint: 'Not directly searchable by LLM without MCP. Best for knowledge with rich interconnections.',
  },
  {
    id: 'cold',
    name: 'Code + Git',
    cpuAnalog: 'Cold Storage',
    brainAnalog: 'Procedural Memory',
    autoLoaded: false,
    capacity: 'N/A',
    latency: 'N/A',
    bestFor: 'Current state (authoritative)',
    color: '#6366f1',
    description: 'The codebase itself. Git history, types, comments. Always authoritative for current state. If knowledge is derivable from code, don\'t store it elsewhere — it\'ll just go stale.',
    examples: ['Function signatures', 'Git blame', 'Dependency versions', 'Test results'],
    constraint: 'Rule: derivable from code → don\'t store it. This is the only layer that can\'t be wrong.',
  },
]

// ─── 2. NEUROSCIENCE MECHANISMS ──────────────────────────────────────

export const MECHANISMS = [
  {
    id: 'swr',
    name: 'Sharp-Wave Ripples',
    category: 'replay',
    bioFunction: 'High-frequency hippocampal bursts during NREM sleep replay experiences at 20x speed. Reward-modulated, novelty-biased, recency-weighted selection.',
    reverieMapping: 'Dream cycle priority queue: score = recency × access_count × importance × novelty. Not FIFO — reward-weighted replay. Reverse credit assignment from session outcomes.',
    implementation: 'scan() → priority_queue → consolidate()',
    keyInsight: 'Replay selection is NOT random. Important experiences are preferentially replayed.',
  },
  {
    id: 'systems-consolidation',
    name: 'Systems Consolidation',
    category: 'transfer',
    bioFunction: 'Gradual transfer from hippocampus to neocortex over days/weeks via sleep replay. Gist transfers; episodic detail fades.',
    reverieMapping: 'Two-phase write: session capture → staging buffer (fast), dream cycle → consolidated store (slow). Gist extraction strips conversational artifacts, preserves semantic content.',
    implementation: 'ConsolidationStatus: Staged → Consolidated → Archived',
    keyInsight: 'Consolidation requires REPLAY, not just time. An unaccessed observation should decay.',
  },
  {
    id: 'cls',
    name: 'Complementary Learning Systems',
    category: 'architecture',
    bioFunction: 'Fast hippocampus (one-shot, sparse) + slow neocortex (statistical, distributed). Interleaved replay prevents catastrophic forgetting. Skipping hippocampus → new learning overwrites old.',
    reverieMapping: 'mem_save = fast path (staging). Dream cycle = slow path (consolidated). NEVER write directly to consolidated store during live session. Interleaved processing: new observations alongside related existing ones.',
    implementation: 'Staging buffer + dream consolidation pass',
    keyInsight: 'THE critical design constraint. Direct writes to long-term store = catastrophic interference.',
  },
  {
    id: 'reconsolidation',
    name: 'Memory Reconsolidation',
    category: 'update',
    bioFunction: 'Recalled memories become labile and must be re-stabilized (Nader 2000). Prediction error during recall triggers update. Confirmation strengthens.',
    reverieMapping: 'Every read is a write opportunity. Track access events. Session contradicts observation → update. Session confirms → boost strength. Accessed but irrelevant → flag for decay.',
    implementation: 'access_log + reconsolidate() in dream cycle',
    keyInsight: 'Observations are never truly "read-only" — every access is a potential modification event.',
  },
  {
    id: 'schema',
    name: 'Schema Theory',
    category: 'integration',
    bioFunction: 'Schema-consistent info consolidates via fast mPFC pathway (days not weeks). Schema-violating info requires more hippocampal processing. Schemas can distort memories.',
    reverieMapping: 'topic_key families = schemas. Schema-consistent observations → fast-track upsert. Schema-violating → preserve with full detail, flag as potential paradigm shift. Distortion guard: diff before auto-merge.',
    implementation: 'classify() → schema_match_score → fast_track or preserve',
    keyInsight: 'Schema-violations are the highest-value dream operation — that\'s where paradigm shifts hide.',
  },
  {
    id: 'shy',
    name: 'Synaptic Homeostasis (SHY)',
    category: 'forgetting',
    bioFunction: 'During slow-wave sleep, global proportional downscaling of all synapses. Strong survive, weak pruned. Improves signal-to-noise ratio. Metabolically necessary.',
    reverieMapping: 'Periodic global decay: ALL observations lose N% strength. Strong (high access × importance × depth) survive. Weak fall below retention threshold → archive → delete.',
    implementation: 'downscale() → global_decay(percentage) → prune(threshold)',
    keyInsight: 'Forgetting is a FEATURE. Deleting 59% of observations improved every search result.',
  },
  {
    id: 'tagging',
    name: 'Behavioral Tagging',
    category: 'importance',
    bioFunction: 'Weak memories near significant events get retroactively stabilized by capturing plasticity-related proteins. Tags expire if not captured within ~1-2 hours.',
    reverieMapping: 'Session events (bug fix, PR merge, decision) = importance signals. Observations in temporal window get boosted retroactively. Tags expire after 2 dream cycles without reinforcement.',
    implementation: 'importance_events[] + retroactive_boost() at session end',
    keyInsight: 'Importance is determined RETROACTIVELY — not at save time. Session outcomes boost nearby observations.',
  },
  {
    id: 'interference',
    name: 'Interference Theory',
    category: 'separation',
    bioFunction: 'Similar memories compete. Pattern separation (dentate gyrus) forces overlapping experiences into distinct representations. Retrieval-induced forgetting suppresses competitors.',
    reverieMapping: 'Strict project/scope namespacing = digital pattern separation. Interference audit: find overlapping observations → merge or disambiguate. Consistently-unchosen duplicates decay faster.',
    implementation: 'interference_audit() + retrieval_suppression()',
    keyInsight: 'Heuristics + project decisions in the same FTS5 index were interfering. Separation fixed it.',
  },
  {
    id: 'depth',
    name: 'Levels of Processing',
    category: 'encoding',
    bioFunction: 'Deep semantic processing produces durable memories. Shallow processing (surface features) produces weak traces. Self-reference and generation effects enhance encoding.',
    reverieMapping: 'Depth score 1-3 based on structured fields. What-only=1, What+Why=2, What+Why+Where+Learned+Related=3. Deeper observations decay slower. Enrichment pass adds depth retroactively.',
    implementation: 'depth_score field + enrichment_pass() in dream cycle',
    keyInsight: 'Observations with rich context (what/why/where/learned) survive pruning better than bare facts.',
  },
  {
    id: 'spacing',
    name: 'Spacing Effect',
    category: 'retrieval',
    bioFunction: 'Distributed practice >> massed practice. Each spaced retrieval triggers reconsolidation and strengthens the trace. Optimal interval = 10-30% of retention period.',
    reverieMapping: 'session_spread (distinct sessions accessed) is primary importance signal, NOT total_access_count. Stability S increases with spaced retrievals: retention = e^(-t/S). Long-gap retrieval gives larger S boost.',
    implementation: 'session_spread counter + stability parameter + desirable_difficulty_bonus()',
    keyInsight: 'Accessed in 5 sessions > accessed 50 times in 1 session. Cross-session spread is the real signal.',
  },
]

// ─── 3. FINDINGS ─────────────────────────────────────────────────────

export const FINDINGS = [
  { id: 'F1', category: 'architecture', title: 'Single-store anti-pattern', summary: 'Engram served 4 incompatible roles (behavioral directives, user preferences, reference knowledge, project decisions). Only project decisions matched its FTS5 affordance.' },
  { id: 'F2', category: 'duplication', title: 'Duplication cascade', summary: '"Rust by default" existed in 5 places across 4 systems. 9 cross-layer duplicates total. Dual-write without dedup guarantees staleness.' },
  { id: 'F3', category: 'architecture', title: '200-line ceiling', summary: 'CLAUDE.md >200 lines causes adherence to drop. Instruction-layer placement is zero-sum. Ground rules were in search-only engram, not auto-loaded CLAUDE.md.' },
  { id: 'F4', category: 'quality', title: 'Session-inherited metadata', summary: '14 observations tagged project=claude-relay because created during relay session, not about relay. Project field captured WHERE, not WHAT.' },
  { id: 'F5', category: 'quality', title: 'Fragmented identity', summary: 'User profile split across 3 observations in 3 project scopes. No single search found all three.' },
  { id: 'F6', category: 'misplacement', title: 'Heuristics as flat rows', summary: '23 heuristics form graph relationships stored as flat FTS5 rows. Access pattern ("load all at once") contradicts storage affordance (keyword search).' },
  { id: 'F7', category: 'duplication', title: 'Sync without dedup', summary: 'Obsidian sync created 5+ duplicate note pairs. ID-based dedup but title-based filenames. Same concept, different names = two files.' },
  { id: 'F8', category: 'quality', title: 'Unnamed session summaries', summary: '6 session summaries with empty topic_key. Can\'t be upserted or found by topic. The DB equivalent of unnamed variables.' },
  { id: 'F9', category: 'quality', title: '62% tombstone rate', summary: '105 observations in ID range 2-269 = 163 deletions. Write heuristics too aggressive. Goodhart\'s Law: "proactive save" became the target.' },
  { id: 'F10', category: 'duplication', title: 'Triple copy of heuristics', summary: '~/engineering-principles.md = 3rd copy alongside engram observations + Obsidian MOC. Three representations, none authoritative.' },
  { id: 'F11', category: 'architecture', title: 'Research overlap', summary: 'engram-v2 research (cognitive models, competitors, SurrealDB) overlapped with Reverie. Projects consolidated.' },
  { id: 'F12', category: 'duplication', title: 'Dual-write guarantee', summary: 'Session #260: "save to engram AND sync to Obsidian." Without dedup, dual-write intent guarantees duplication.' },
  { id: 'F13', category: 'architecture', title: 'Cognitive model mapping', summary: 'hippocampus=context window, neocortex=engram, sleep=session summary, reconsolidation=upsert, forgetting=compaction. Maps directly to layer architecture.' },
]

export const INSIGHTS = [
  { id: 'I1', title: 'Gravitational Collapse', summary: 'Lowest-friction write path captures ALL knowledge regardless of fit. Goodhart\'s Law: "proactive save" became the target, producing 62% churn.', icon: '🕳' },
  { id: 'I2', title: '200-Line Ceiling', summary: 'Instruction-layer capacity is zero-sum. Every line competes. Blast radius determines priority — ground rules must be auto-loaded.', icon: '📏' },
  { id: 'I3', title: 'Adaptive Forgetting', summary: 'Deleting 59% of observations improved signal-to-noise for every remaining search. Memory management is curation, not accumulation.', icon: '🧹' },
  { id: 'I4', title: 'Content-Addressed Sync', summary: 'Cross-system sync needs stable identity keys (topic_key), not numeric IDs. Same concept with different titles = duplicate notes.', icon: '🔗' },
  { id: 'I5', title: 'Provenance ≠ Semantics', summary: 'WHERE something was created (session context) ≠ WHAT it\'s about (content semantics). Project field must be set from content, not inherited.', icon: '🏷' },
]

// ─── 4. COMPETITIVE LANDSCAPE ────────────────────────────────────────

export const LOCOMO_LEADERBOARD = [
  { name: 'Human', score: 87.9, singleHop: 95.1, multiHop: 85.8, temporal: 92.6, openDomain: 75.4, adversarial: 89.4, architecture: 'Biological memory', color: '#a855f7' },
  { name: 'EverMemOS', score: 92.3, architecture: '3-phase brain-inspired consolidation (MemCells → MemScenes → Recollection)', color: '#ef4444' },
  { name: 'Backboard', score: 90.1, architecture: 'Proprietary memory system', color: '#f97316' },
  { name: 'Hindsight', score: 89.6, architecture: '4 memory networks: facts, experiences, summaries, beliefs', color: '#eab308' },
  { name: 'CORE', score: 88.2, architecture: 'Temporal PageRank on Neo4j knowledge graph', color: '#22c55e' },
  { name: 'MemMachine', score: 85.0, architecture: 'Episodic + profile memory, 80% token reduction', color: '#14b8a6' },
  { name: 'Engram', score: 80.0, architecture: 'FTS5 keyword search + topic_key upsert (our baseline)', color: '#3b82f6', highlight: true },
  { name: 'Memobase', score: 75.8, architecture: 'Profile-based memory', color: '#6366f1' },
  { name: 'Zep', score: 75.1, architecture: 'Temporal knowledge graph (Graphiti), 4-timestamp edges', color: '#8b5cf6' },
  { name: 'Mem0-Graph', score: 68.4, architecture: 'Graph memory + vector retrieval', color: '#a855f7' },
  { name: 'Mem0', score: 66.9, architecture: 'ADD/UPDATE/DELETE/NOOP, 19 vector backends', color: '#d946ef' },
  { name: 'LangMem', score: 58.1, architecture: 'Procedural memory (agent modifies own instructions)', color: '#ec4899' },
  { name: 'Obs RAG top-5', score: 41.4, architecture: 'LoCoMo paper baseline — observation retrieval', color: '#6b7280' },
  { name: 'MEMORY.md', score: 28.8, architecture: 'Flat markdown, no search, 200-line cap', color: '#4b5563' },
]

export const LOCOMO_STATS = {
  conversations: 50,
  turnsPerConversation: 305,
  sessionsPerConversation: 19.3,
  tokensPerConversation: 9209,
  totalQuestions: 7512,
  tokensPerObservation: 18.2,
  questionTypes: {
    singleHop: { count: 2705, pct: 36.0, humanScore: 95.1 },
    multiHop: { count: 1104, pct: 14.6, humanScore: 85.8 },
    temporal: { count: 1547, pct: 20.6, humanScore: 92.6 },
    openDomain: { count: 285, pct: 3.9, humanScore: 75.4 },
    adversarial: { count: 1871, pct: 24.9, humanScore: 89.4 },
  },
  keyFinding: 'Observation RAG at top-5 (F1=41.4) beats long-context 16K (37.8) and dialog RAG top-50 (34.8). Temporal jumps from 17.5 to 41.9. More context hurts: top-5 > top-50.',
}

// ─── 5. DREAM CYCLE PIPELINE ─────────────────────────────────────────

export const DREAM_PHASES = [
  {
    id: 'capture',
    name: 'Capture',
    mechanism: 'Hippocampal fast encoding',
    action: 'mem_save → staging buffer (NOT consolidated store)',
    details: 'Tag by proximity to importance events. Score depth: bare fact (1) → fact+context (2) → fact+context+rationale+links (3).',
    color: '#ef4444',
  },
  {
    id: 'replay',
    name: 'Replay',
    mechanism: 'Sharp-wave ripple simulation',
    action: 'Priority queue: score = recency × access × importance × novelty',
    details: 'Not random, not FIFO. Compress to ~1/20th token count (gist extraction). Classify as schema-consistent or schema-violating.',
    color: '#f97316',
  },
  {
    id: 'interleave',
    name: 'Interleave',
    mechanism: 'Complementary Learning Systems',
    action: 'Process new observations alongside related existing ones',
    details: 'High overlap + same meaning → merge (assimilation). High overlap + different meaning → disambiguate (accommodation). Low overlap → insert as new.',
    color: '#eab308',
  },
  {
    id: 'reconsolidate',
    name: 'Reconsolidate',
    mechanism: 'Nader reconsolidation',
    action: 'Check accessed observations for prediction error',
    details: 'Session contradicts → update content. Session confirms → boost strength. Accessed but irrelevant → flag for accelerated decay. Version history for important observations.',
    color: '#22c55e',
  },
  {
    id: 'downscale',
    name: 'Downscale',
    mechanism: 'Synaptic Homeostasis Hypothesis',
    action: 'Global proportional decay: ALL observations lose N% strength',
    details: 'Strong survive (high access × importance × depth), weak fall below threshold. Three-tier lifecycle: active → archived → deleted.',
    color: '#3b82f6',
  },
  {
    id: 'promote',
    name: 'Promote / Demote',
    mechanism: 'Behavioral tagging + spacing effect',
    action: 'Move knowledge between layers based on access patterns',
    details: 'Retroactive promotion for importance events. Session-spread ≥5 → auto-promote. Long-gap retrieval = desirable difficulty bonus. Interference demotion for unchosen duplicates.',
    color: '#8b5cf6',
  },
]

export const CONSOLIDATION_SCHEDULE = [
  { cycle: 'Session-end', frequency: 'Per session', mechanisms: 'SWR, Tagging, Depth', actions: 'Stage, tag, score, gist-extract' },
  { cycle: 'Nightly', frequency: '1x/day', mechanisms: 'Systems Consolidation, CLS, Reconsolidation', actions: 'Interleave new+old, update/strengthen/decay' },
  { cycle: 'Weekly', frequency: '1x/week', mechanisms: 'SHY, Interference, Spacing', actions: 'Global decay, interference audit, session-spread promotion' },
  { cycle: 'Monthly', frequency: '1x/month', mechanisms: 'Schema Theory', actions: 'Schema evolution review, cross-project pattern extraction' },
]

// ─── 6. ANTI-PATTERNS ────────────────────────────────────────────────

export const ANTI_PATTERNS = [
  { id: 'AP1', name: 'Duplication Cascade', description: 'Same fact in N layers, N-1 go stale independently.', fix: 'Single canonical home per knowledge type. Unidirectional sync only.' },
  { id: 'AP2', name: 'Directive Burial', description: 'Behavioral rule in search-only layer. High blast radius if not found.', fix: 'Blast radius determines layer. High-blast → auto-loaded (CLAUDE.md/auto-memory).' },
  { id: 'AP3', name: 'Sync Without Dedup', description: 'Different naming conventions across sync passes create parallel notes.', fix: 'Content-addressed dedup via topic_key, not numeric IDs.' },
  { id: 'AP4', name: 'Session-Inherited Metadata', description: 'Project field from session context, not content semantics.', fix: 'Set metadata from content, not creation context.' },
  { id: 'AP5', name: 'Historical as Behavioral', description: 'Point-in-time snapshot masquerading as live directive.', fix: 'Historical records → engram. Behavioral directives → auto-memory.' },
  { id: 'AP6', name: 'Aggressive Writes', description: 'Save speculatively then delete. 61% churn rate.', fix: 'Write gate: check placement tree before save. "Is this worth persisting?"' },
]

// ─── 7. KEY REFERENCES ───────────────────────────────────────────────

export const REFERENCES = [
  { title: 'LoCoMo', authors: 'Maharana et al.', venue: 'ACL 2024', url: 'https://arxiv.org/abs/2402.17753', relevance: 'Benchmark: 50 conversations, 7,512 questions, observation RAG validated' },
  { title: 'Multi-Agent Memory from a Computer Architecture Perspective', authors: 'UC San Diego', venue: 'Arch 2.0 Workshop, Mar 2026', url: 'https://arxiv.org/abs/2603.10062', relevance: 'CPU cache hierarchy → agent memory layers' },
  { title: 'Memory in the Age of AI Agents', authors: 'Tsinghua', venue: 'Dec 2025', url: 'https://arxiv.org/abs/2512.13564', relevance: 'Forms-Functions-Dynamics taxonomy' },
  { title: 'ACT-R Memory Architecture for LLM Agents', authors: 'HAI 2025', venue: 'HAI 2025', url: 'https://dl.acm.org/doi/10.1145/3765766.3765803', relevance: 'activation = f(decay, similarity, frequency, noise)' },
  { title: 'EverMemOS', authors: 'Jan 2026', venue: 'arXiv', url: 'https://arxiv.org/abs/2601.02163', relevance: '92.3% LoCoMo, brain-inspired 3-phase consolidation' },
  { title: 'Hindsight', authors: 'Dec 2025', venue: 'arXiv', url: 'https://arxiv.org/abs/2512.12818', relevance: '89.6% LoCoMo, 4 memory networks' },
  { title: 'A-MEM', authors: 'Feb 2025', venue: 'NeurIPS 2025', url: 'https://arxiv.org/abs/2502.12110', relevance: 'Zettelkasten-inspired reconsolidation' },
  { title: 'Zep / Graphiti', authors: 'Jan 2025', venue: 'arXiv', url: 'https://arxiv.org/abs/2501.13956', relevance: '4-timestamp bi-temporal model' },
  { title: 'TReMu', authors: 'ACL 2025', venue: 'ACL Findings', url: 'https://aclanthology.org/2025.findings-acl.972/', relevance: 'Temporal reasoning: 29.8% → 77.7% via neuro-symbolic' },
  { title: 'MemGPT / Letta', authors: 'Packer et al.', venue: 'ICLR 2024', url: 'https://arxiv.org/abs/2310.08560', relevance: 'OS-style virtual context management' },
]
