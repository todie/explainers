/**
 * Reverie Roadmap Data
 * Source: Linear (cerebral-work/reverie, project reverie-b492cbbc2fee) + docs/releases/v1.0-criteria.md
 * Last refreshed: 2026-05-27
 */

export const ROADMAP_META = {
  generatedAt: '2026-06-17',
  currentVersion: 'v0.9.7',
  nextRelease: 'v0.9.14',
  v1Target: '2026-09-15',
  sources: [
    'Linear milestones (cerebral-work/reverie)',
    'docs/releases/v1.0-criteria.md',
  ],
}

// status: 'shipped' | 'in-progress' | 'upcoming' | 'gate'
export const MILESTONES = [
  {
    version: 'v0.9.7',
    name: 'Multi-user foundation + hybrid search',
    status: 'shipped',
    date: '2026-04-18',
    progress: 100,
    highlights: [
      'coord FS → Redis-primary protocol (v1.2)',
      'pgvector hybrid search: FTS5 + sqlite-vec + RRF (MRR 0.628)',
      'Learned-intelligence foundation — access forecasting, decay models, attention weights',
      'Multi-user Postgres backend (reverie-pg), teams + sharing, RLS policies',
      'Placement linter (8 rules) + write-gate hook',
    ],
  },
  {
    version: 'v0.9.13',
    name: 'MCP surface + dream output wiring',
    status: 'in-progress',
    date: '2026-05-29',
    progress: 75,
    highlights: [
      'Native MCP surface expanded to 6 tools: search_memory, smart_context, add_observation, add_observation_passive, dream_status, dream_last_report',
      'ObsidianAdapter wired into dream sync phase',
      'Mesh worker HTTP endpoints: POST/GET/DELETE /v1/workers/*',
      'Hybrid literal token-coverage signal: single_hop MRR delta −0.378 → −0.167',
      'EventManager: 13 new event variants with AutoCapture matrix',
    ],
  },
  {
    version: 'v0.9.14',
    name: 'Substrate tenancy + urgent ops',
    status: 'shipped',
    progress: 100,
    highlights: [
      'Substrate tenancy completion — gates v1.0.0',
      'Critical ops blockers',
    ],
  },
  {
    version: 'v0.10.0',
    name: 'Audit-driven cleanup',
    status: 'shipped',
    progress: 100,
    highlights: [
      'Tier 0–3 code-grounded audit remediation',
      'Sequenced ahead of all other milestones (2026-05-22 grooming decision)',
    ],
  },
  {
    version: 'v0.10.5',
    name: 'Hexagonal port migration',
    status: 'in-progress',
    progress: 9,
    highlights: [
      'Migrate 377 callsites from EngramCompatStore → dyn Store trait',
      '55 files across 9 crates',
      'Unblocks polyrepo lift in v1.1+',
    ],
  },
  {
    version: 'v0.13.0',
    name: 'Auth, API surface & deploy-readiness',
    status: 'in-progress',
    progress: 63,
    date: '2026-06-15',
    highlights: [
      'JWT auth on reveried HTTP + MCP endpoints',
      'Per-caller rate limiting + cost caps',
      'SQLite-WAL concurrency audit',
      'Public endpoint hardening (pre-Railway deploy gate)',
    ],
  },
  {
    version: 'v0.13.5',
    name: 'HTTP/MCP surface completeness',
    status: 'in-progress',
    progress: 18,
    highlights: [
      'GET /observations endpoint',
      'reverie-gate HTTP endpoints',
      'Full API surface documentation',
    ],
  },
  {
    version: 'v0.14.0',
    name: 'Mesh task queue + search cutover',
    status: 'upcoming',
    progress: 0,
    highlights: [
      'Mesh task-queue infrastructure',
      'engram-compat → native reveried search cutover',
      'Per-field vector granularity for observation embeddings',
    ],
  },
  {
    version: 'v0.16.0',
    name: 'Shape of Memory v1.0 catalogue',
    status: 'upcoming',
    progress: 0,
    date: '2026-07-15',
    highlights: [
      '15 spec docs under docs/spec/ covering memory taxonomy, value types, placement decisions',
      'Tier 0 shape-of-memory.md',
      'Foundation for public framework documentation',
    ],
  },
  {
    version: 'v0.18.0',
    name: 'Cluster + federation deploy',
    status: 'in-progress',
    progress: 8,
    date: '2026-08-30',
    highlights: [
      'Production deploy target (Railway/K8s)',
      'Cross-instance federation scaffolding',
      'Hosted offering infrastructure',
    ],
  },
  {
    version: 'v0.20.0',
    name: 'LoCoMo benchmark harness',
    status: 'in-progress',
    progress: 2,
    highlights: [
      'Reproducible harness: 4 agents, 6 configs, phase gates',
      'Current baseline: R@5=77.0%, MRR=0.628',
      'Time-decay RRF boost in hybrid scoring',
    ],
  },
  {
    version: 'v0.25.0',
    name: 'Multi-factor scoring engine',
    status: 'upcoming',
    progress: 0,
    highlights: [
      '4 neuroscience factors wired into hybrid search ranking',
      'strength, depth_score, session_spread, stability (Ebbinghaus S)',
      'Learned attention weights over scoring factors',
    ],
  },
  {
    version: 'v1.0.0',
    name: 'Full release',
    status: 'gate',
    progress: 0,
    date: '2026-09-15',
    highlights: [],
  },
]

export const V1_GATE = {
  must: [
    {
      label: 'Multi-user v1',
      detail: 'Tenant-scoped observations, per-user auth on all HTTP + MCP routes, isolation tests',
    },
    {
      label: 'Postgres backend tested',
      detail: 'Green integration suite against Postgres + documented migration path from SQLite default',
    },
    {
      label: 'Docs polished',
      detail: 'README, daemon-spec.md, paper.md, ops/http-surface.md, deepagent.md reviewed end-to-end',
    },
    {
      label: 'M1 findings published',
      detail: 'paper.md promoted to public write-up (arXiv or equivalent) with LoCoMo numbers + competitive analysis',
    },
  ],
  qualityBars: [
    'Core crate test coverage ≥ 70% (reverie-store, reverie-dream, reverie-gate, reverie-domain)',
    'LoCoMo MRR ≥ 0.657 (v0.9.4 reference baseline, ±2% budget)',
    '/health green for 14+ consecutive days on reference deployment pre-tag',
    'All CI gates green: fmt, clippy -D warnings, typos, cargo-deny, cargo-vet, nextest',
  ],
}
