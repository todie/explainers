/**
 * The Harness — Running Claude Code Like Infrastructure.
 *
 * Manifesto-mode explainer for the engineering practice that wraps Claude Code
 * at the high-intensity end of the curve: hooks, memory, specifications, and a
 * programmer who refuses to leave the loop.
 *
 * Reuses authoritative data from the reverie explainer (LAYERS, MECHANISMS,
 * DREAM_PHASES, LOCOMO_LEADERBOARD, REFERENCES, etc.) instead of duplicating —
 * placement framework rule: derivable from another file → do not duplicate.
 */

// Section IDs must match rehype-slug output of <h2>'s in content.mdx.
// If you change a heading, update the corresponding id here for TOC
// scroll-spy. Icons intentionally omitted per the /impeccable post-audit
// cleanup — TableOfContents only renders the icon span when truthy, so
// empty strings leave the TOC as a clean typographic list of titles.
export const SECTIONS = [
  { id: 'three-framings',         title: 'Framings',   icon: '' },
  { id: 'the-misconception',      title: 'Heresy',     icon: '' },
  { id: 'the-hierarchy',          title: 'Hierarchy',  icon: '' },
  { id: 'rtk-the-shell-that-lies', title: 'RTK',       icon: '' },
  { id: 'engram-the-database',    title: 'Engram',     icon: '' },
  { id: 'auto-memory-the-cache',  title: 'Auto-mem',   icon: '' },
  { id: 'obsidian-the-prose-layer', title: 'Obsidian', icon: '' },
  { id: 'linear-the-spec-layer',  title: 'Linear',     icon: '' },
  { id: 'hooks-not-hopes',        title: 'Hooks',      icon: '' },
  { id: 'programmer-as-brain',    title: 'Brain',      icon: '' },
  { id: 'where-engram-falls-short', title: 'Audit',    icon: '' },
  { id: 'reverie-the-cortex',     title: 'Reverie',    icon: '' },
  { id: 'dreaming',               title: 'Dreaming',   icon: '' },
  { id: 'selective-forgetting',   title: 'Forgetting', icon: '' },
  { id: 'the-leaderboard',        title: 'LoCoMo',     icon: '' },
  { id: 'why-it-compounds',       title: 'Compounds',  icon: '' },
  { id: 'the-shape-of-it',        title: 'Shape',      icon: '' },
  { id: 'references',             title: 'Sources',    icon: '' },
]

// HERO_STATS and FRAMINGS deleted in the post-audit cleanup — the
// hero-metric template and framings-triad card grid both violated
// .impeccable.md §"Clean and sharp, not gamified" and the components
// that rendered them (HeroStats, FramingsTriad) were removed. The three
// framings now live inline in content.mdx as italic-labeled prose
// paragraphs, and the stats are woven into the opening lede.

// ─── RTK SAVINGS BREAKDOWN ───────────────────────────────────────────

export const RTK_SAVINGS = [
  { command: 'curl api.cf/zones',       raw: 17400, compressed: 1420, color: '#22d3ee' },
  { command: 'gh pr view --json',       raw: 12800, compressed: 980,  color: '#4ade80' },
  { command: 'docker ps --format json', raw: 8600,  compressed: 720,  color: '#facc15' },
  { command: 'kubectl get pods -o json', raw: 24500, compressed: 2100, color: '#fb923c' },
  { command: 'git log --stat -50',      raw: 18900, compressed: 2640, color: '#f87171' },
  { command: 'git status --porcelain',  raw: 1240,  compressed: 1180, color: '#a855f7' },
]

// ─── HOOK ENFORCEMENT MATRIX ─────────────────────────────────────────

export const HOOKS = [
  {
    intent: 'Never leak secrets',
    hook: 'guard-dangerous-commands.sh',
    trigger: 'PreToolUse → Bash',
    action: 'block + explain',
    severity: 'absolute',
    color: '#f87171',
    note: 'Catches echo $KEY, ${VAR:-fallback} expansions, printenv on credential names. R1–R4 detection, 35/35 adversarial test cases.',
  },
  {
    intent: 'Never force-push main',
    hook: 'dangerous-cmd-blocker',
    trigger: 'PreToolUse → Bash',
    action: 'block + suggest alt',
    severity: 'absolute',
    color: '#f87171',
    note: 'Also: rm -rf in dangerous paths, unscoped git add -A near sensitive files, sudo docker, curl|sh patterns.',
  },
  {
    intent: 'Always lint before commit',
    hook: 'pre-commit',
    trigger: 'git commit',
    action: 'block + show diff',
    severity: 'hard',
    color: '#fb923c',
    note: 'cargo clippy -D warnings, ruff check, ruff format, cargo fmt, mypy on typed projects.',
  },
  {
    intent: 'Always GPG-sign',
    hook: 'commit-sign-enforce',
    trigger: 'git commit',
    action: 'block unsigned',
    severity: 'hard',
    color: '#fb923c',
    note: 'No --no-gpg-sign, ever. Key 29234C4D7EE749F2. Provenance is non-negotiable.',
  },
  {
    intent: 'Run e2e before "done"',
    hook: 'stop-hook',
    trigger: 'session Stop',
    action: 'block "done" claim',
    severity: 'hard',
    color: '#fb923c',
    note: 'Tests run before any "done"/"listo" phrase. No more "I think it works" handoffs.',
  },
  {
    intent: 'Compress shell output',
    hook: 'rtk-rewrite',
    trigger: 'PreToolUse → Bash',
    action: 'silent rewrite',
    severity: 'transparent',
    color: '#22d3ee',
    note: 'curl/git/gh/docker/kubectl/cf rewritten to rtk <cmd>. Model never knows. 60–90% byte savings.',
  },
  {
    intent: 'Load context on start',
    hook: 'session-start',
    trigger: 'SessionStart',
    action: 'pull mem context',
    severity: 'transparent',
    color: '#22d3ee',
    note: 'Engram session register, mem raw /context, maintenance check (>30 days → run maintenance).',
  },
  {
    intent: 'Sync to vault on exit',
    hook: 'stop-hook → obsidian',
    trigger: 'session Stop',
    action: 'write to vault',
    severity: 'transparent',
    color: '#22d3ee',
    note: 'Engram-to-Obsidian sync via topic-key dedup. Long-form trail stays current without manual curation.',
  },
]

// ─── DIVISION OF LABOR ───────────────────────────────────────────────

export const DIVISION_OF_LABOR = [
  {
    role: 'Programmer',
    analog: 'Brain',
    color: '#a855f7',
    duties: [
      'Writes the spec (Linear ticket, .impeccable.md, CLAUDE.md, test cases)',
      'Picks the fights (which deps, which refactors, which debts)',
      'Reviews the diff before commit, NOT after PR',
      'Decides when "good enough" is good enough',
      'Runs the post-mortem and writes the lesson',
    ],
    notDuties: [
      'Typing every line',
      'Remembering trivia',
      'Watching the model turn by turn',
    ],
  },
  {
    role: 'Harness',
    analog: 'Nervous System',
    color: '#22d3ee',
    duties: [
      'Remembers (Engram, Obsidian, auto-memory)',
      'Enforces (hooks, CI, lints, signing)',
      'Optimizes (RTK compression, prompt caching)',
      'Routes (MCP, placement tree, topic keys)',
      'Persists (across sessions, across compactions)',
    ],
    notDuties: [
      'Making judgment calls',
      'Inventing requirements',
      'Replacing the human',
    ],
  },
  {
    role: 'Model',
    analog: 'Hands and Eyes',
    color: '#4ade80',
    duties: [
      'Orchestrates and executes against the spec',
      'Types fast, reads broadly, drafts quickly',
      'Surfaces edge cases the spec did not anticipate',
      'Tries eight things in the time a human tries one',
      'Pattern-matches across the corpus it has read',
    ],
    notDuties: [
      'Deciding what good looks like',
      'Deciding when to stop',
      'Owning the outcome',
      'Carrying taste',
    ],
  },
]

// PLACEMENT_TREE data deleted in the post-audit cleanup — the new
// PlacementTree component in components.jsx renders the decision tree
// directly from inline JSX (reflows on mobile via auto-fit grid), so
// the per-node color fields are no longer consumed by any renderer.

// ─── ENGRAM AUDIT — KEY FINDINGS (subset shown inline) ───────────────

export const ENGRAM_AUDIT_HIGHLIGHTS = [
  { id: 'F1',  severity: 'critical', title: 'Single-store anti-pattern', body: 'Engram served 4 incompatible roles (behavioral directives, user preferences, reference knowledge, project decisions). Only project decisions matched its FTS5 affordance.' },
  { id: 'F9',  severity: 'critical', title: '62% tombstone rate',         body: '105 observations across ID range 2–269 — 163 deletions. Speculative writes outpaced useful ones. Goodhart\'s Law: "proactive save" became the target.' },
  { id: 'F2',  severity: 'high',     title: 'Duplication cascade',        body: '"Rust by default" existed in 5 places across 4 systems. 9 cross-layer duplicates total. Dual-write without dedup guarantees staleness.' },
  { id: 'F4',  severity: 'high',     title: 'Session-inherited metadata', body: '14 observations tagged with the wrong project — captured WHERE they were written, not WHAT they were about. Provenance impersonating semantics.' },
  { id: 'F6',  severity: 'high',     title: 'Heuristics as flat rows',    body: '23 graph-shaped engineering heuristics stored as flat FTS5 rows. Access pattern (load-all-at-once) contradicted storage affordance (search-by-keyword).' },
  { id: 'F3',  severity: 'medium',   title: '200-line ceiling',           body: 'CLAUDE.md adherence collapses past ~200 lines. We were at 380. Adding rule N+1 demoted some other rule below the attention threshold.' },
]

// ─── SELECTIVE FORGET CURVE (synthetic illustrative data) ────────────

export const FORGET_CURVE_POINTS = [
  // (cycle, strong_survival_pct, weak_survival_pct)
  { cycle: 0,  strong: 100, weak: 100 },
  { cycle: 1,  strong: 96,  weak: 70  },
  { cycle: 2,  strong: 93,  weak: 49  },
  { cycle: 3,  strong: 90,  weak: 34  },
  { cycle: 4,  strong: 88,  weak: 24  },
  { cycle: 5,  strong: 86,  weak: 17  },
  { cycle: 6,  strong: 85,  weak: 12  },
  { cycle: 7,  strong: 83,  weak: 8   },
  { cycle: 8,  strong: 82,  weak: 6   },
  { cycle: 9,  strong: 81,  weak: 4   },
  { cycle: 10, strong: 80,  weak: 3   },
]

// ─── INSTALL GUIDE ───────────────────────────────────────────────────

export const INSTALL_STEPS = [
  {
    id: 'engram',
    title: 'Engram — persistent memory',
    audience: ['newbie', 'engineer'],
    why: 'Without persistent memory, every session starts at zero. This is the first thing to install.',
    steps: [
      { lang: 'bash', code: '# Engram is a 12MB Go binary backing onto SQLite + FTS5.\ncurl -fsSL https://engram.sh/install | sh\n# Or build from source:\ngit clone https://github.com/engram-mem/engram ~/projects/engram\ncd ~/projects/engram && go build -o ~/.local/bin/engram ./cmd/engram' },
      { lang: 'bash', code: '# Start the daemon (it listens on 127.0.0.1:7437):\nengram serve &\n# Verify:\ncurl http://127.0.0.1:7437/health' },
      { lang: 'bash', code: '# Install the bash client (3ms reads vs 200ms via MCP):\ncurl -fsSL https://engram.sh/mem -o ~/.local/bin/mem\nchmod +x ~/.local/bin/mem\nmem raw "/stats"' },
    ],
  },
  {
    id: 'mcp-engram',
    title: 'Engram MCP server (writes)',
    audience: ['newbie', 'engineer'],
    why: 'Reads go through the bash client. Writes go through MCP because they need dedup, upsert-by-topic-key, and scope logic.',
    steps: [
      { lang: 'json', code: '// ~/.claude/mcp/engram.json\n{\n  "mcpServers": {\n    "engram": {\n      "command": "engram",\n      "args": ["mcp"],\n      "env": {}\n    }\n  }\n}' },
      { lang: 'bash', code: '# Restart Claude Code to pick up the MCP server.\n# Verify by asking the model: "use mem_save to save a test observation"' },
    ],
  },
  {
    id: 'rtk',
    title: 'RTK — token-killing shell proxy',
    audience: ['newbie', 'engineer'],
    why: '60–90% byte savings on every shell call the model makes. Single largest cost lever in the stack.',
    steps: [
      { lang: 'bash', code: '# Install via cargo:\ncargo install rtk-cli\n# Or grab a release binary:\ncurl -fsSL https://rtk-ai.dev/install | sh\nrtk --version' },
      { lang: 'json', code: '// ~/.claude/settings.json — add the PreToolUse hook\n{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "~/.claude/hooks/rtk-rewrite.sh"\n          }\n        ]\n      }\n    ]\n  }\n}' },
      { lang: 'bash', code: '# ~/.claude/hooks/rtk-rewrite.sh — rewrites curl/git/gh/docker/kubectl/cf to rtk <cmd>\n#!/usr/bin/env bash\nset -euo pipefail\ninput=$(cat)\ncmd=$(echo "$input" | jq -r .tool_input.command)\nfor t in curl git gh docker kubectl cf; do\n  if [[ "$cmd" =~ ^[[:space:]]*$t[[:space:]] ]]; then\n    new=$(echo "$cmd" | sed -E "s/^([[:space:]]*)$t /\\1rtk $t /")\n    echo "$input" | jq --arg c "$new" \'.tool_input.command = $c\'\n    exit 0\n  fi\ndone\necho "$input"' },
      { lang: 'bash', code: '# Verify savings tracking:\nrtk gain --history' },
    ],
  },
  {
    id: 'guards',
    title: 'Secret-leak + dangerous-command guards',
    audience: ['newbie', 'engineer'],
    why: 'Hooks are physical properties of the environment. The model cannot be persuaded out of them. This is where guarantees live.',
    steps: [
      { lang: 'bash', code: '# ~/.claude/hooks/guard-dangerous-commands.sh\n#!/usr/bin/env bash\nset -euo pipefail\ninput=$(cat)\ncmd=$(echo "$input" | jq -r .tool_input.command)\n\n# R1: block echo/printf/printenv on secret-named vars\nif [[ "$cmd" =~ (echo|printf|printenv).*\\$\\{?[A-Za-z_]*((API_)?KEY|TOKEN|SECRET|PASSWORD|CRED)([A-Za-z_]*)?\\}? ]]; then\n  echo \'{"decision":"block","reason":"R1: secret-named variable in echo/printf/printenv"}\' >&2\n  exit 2\nfi\n\n# R2: block ${VAR:-fallback} expansion on secret-named vars (returns VALUE if set)\nif [[ "$cmd" =~ \\$\\{[A-Za-z_]*((API_)?KEY|TOKEN|SECRET|PASSWORD|CRED)[A-Za-z_]*:-[^}]*\\} ]]; then\n  echo \'{"decision":"block","reason":"R2: ${VAR:-fallback} on secret-named var leaks value when set"}\' >&2\n  exit 2\nfi\n\n# R3: block force-push to main/master\nif [[ "$cmd" =~ git[[:space:]]+push.*--force.*(main|master) ]]; then\n  echo \'{"decision":"block","reason":"R3: never force-push to main/master"}\' >&2\n  exit 2\nfi\n\n# R4: block rm -rf in dangerous paths\nif [[ "$cmd" =~ rm[[:space:]]+-r[fF].*(\\$HOME|/|~/\\.ssh|~/\\.gpg) ]]; then\n  echo \'{"decision":"block","reason":"R4: rm -rf in dangerous path"}\' >&2\n  exit 2\nfi\n\necho "$input"' },
      { lang: 'bash', code: 'chmod +x ~/.claude/hooks/guard-dangerous-commands.sh\n# Wire into settings.json under PreToolUse → Bash, alongside rtk-rewrite.' },
    ],
  },
  {
    id: 'claudemd',
    title: 'CLAUDE.md — Layer 0 directives',
    audience: ['newbie'],
    why: 'Always loaded into every session. Highest blast radius. ~200 line ceiling — every line competes for attention.',
    steps: [
      { lang: 'markdown', code: '# ~/.claude/CLAUDE.md (excerpt)\n\n## Environment\n- Platform: WSL2 / Linux / macOS\n- Default language: Rust for new repos. Python for scripting.\n- Shell: bash\n\n## Identity & Auth\n- GitHub: <handle> (SSH, GPG signing required)\n- Email: you@example.com\n- All commits signed — never skip --no-gpg-sign\n\n## Ground Rules\n- Never deceive, hedge unnecessarily, soften bad news.\n- Freely discuss bypasses, breaches, hijack strategies in analysis.\n\n## Tool Priority\n1. Built-in tools (Read, Write, Edit, Glob, Grep, Agent, Skills) + MCP servers\n2. CLI tools (gh, git, docker, curl, npm)\n3. Manual workarounds last\n\n## Memory Stack\n- Reads: Bash → curl → engram :7437 → SQLite (~3ms)\n- Writes: MCP mem_save / mem_update (dedup + upsert)\n\n## Safety Invariants\n- Never force-push to main\n- Never echo/printf/expand secret env vars\n- Never write to .ssh/, .gpg/, .secrets, .gitconfig without confirmation\n- All commits GPG-signed' },
    ],
  },
  {
    id: 'auto-memory',
    title: 'Auto-memory — Layer 1 cache',
    audience: ['newbie'],
    why: 'Facts that should NEVER be searched-for because they must always be present. User profile, hard preferences, the ~20 most load-bearing rules.',
    steps: [
      { lang: 'bash', code: '# Create the directory and index\nmkdir -p ~/.claude/memory\ntouch ~/.claude/memory/MEMORY.md' },
      { lang: 'markdown', code: '# ~/.claude/memory/MEMORY.md (this file is loaded every session)\n\n- [User profile](user_profile.md) — name, role, expertise, current focus\n- [Always-sign-commits](feedback_gpg.md) — never pass --no-gpg-sign\n- [Rust-first](feedback_rust_first.md) — new repos default to Rust\n- [No mocks in integration tests](feedback_no_mocks.md) — burned by mock/prod divergence\n- [Optimize tokens aggressively](feedback_tokens.md) — Edit > Write, partial Reads, terse output' },
      { lang: 'markdown', code: '# ~/.claude/memory/user_profile.md\n---\nname: User Profile\ndescription: Who the user is, their role, expertise, current focus areas\ntype: user\n---\n\n- Platform/infra engineer, 10+ years, deep Rust + systems\n- Currently shipping across reach, reverie, rtk, engram, explainers\n- Strong opinions: greenfield-friendly, engineer-not-consumer, sand mandalas (zero attachment to work that benchmarks say to delete)' },
    ],
  },
  {
    id: 'obsidian',
    title: 'Obsidian — Layer 3 prose',
    audience: ['advanced'],
    why: 'Long-form thinking that does not belong in atomic Engram rows. Synced from Engram on Stop hook.',
    steps: [
      { lang: 'bash', code: '# Install Obsidian (https://obsidian.md) and create vault at ~/vault\n# Then install the Obsidian MCP server:\nnpm install -g obsidian-mcp\n# Or via cargo if you prefer the Rust client.' },
      { lang: 'json', code: '// ~/.claude/mcp/obsidian.json\n{\n  "mcpServers": {\n    "obsidian": {\n      "command": "obsidian-mcp",\n      "args": ["--vault", "~/vault"]\n    }\n  }\n}' },
      { lang: 'bash', code: '# Optional: Stop hook that syncs new Engram observations to vault\n# ~/.claude/hooks/sync-to-vault.sh\n#!/usr/bin/env bash\nrecent=$(mem raw "/observations/recent?limit=20" | jq -r .observations)\necho "$recent" | engram-to-obsidian --vault ~/vault --dedup topic_key' },
    ],
  },
  {
    id: 'linear',
    title: 'Linear — Layer 5 specs',
    audience: ['advanced'],
    why: 'Where rigorous specifications live. Tickets are contracts, not todos.',
    steps: [
      { lang: 'bash', code: '# Linear is wired in via the Anthropic-managed cloud MCP server.\n# Sign in at claude.ai → Settings → Connected apps → Linear.\n# Then any session can call create_issue / list_issues / save_issue.' },
    ],
  },
]

// ─── MEMORY POPULATION EXAMPLES ──────────────────────────────────────

export const MEMORY_EXAMPLES = [
  {
    layer: 'CLAUDE.md',
    when: 'A directive that must be true on EVERY turn, in EVERY session, in EVERY project.',
    color: '#ef4444',
    examples: [
      { kind: 'good', text: '"All commits GPG-signed — never skip --no-gpg-sign."', why: 'Universal, security-critical, zero exceptions.' },
      { kind: 'good', text: '"Default language: Rust for new repos unless ecosystem forces otherwise."', why: 'Decision-shaping, applies always, low cost to load.' },
      { kind: 'bad',  text: '"We shipped the auth refactor on 2026-03-12."', why: 'Historical fact, not a directive. Belongs in Engram or git history.' },
      { kind: 'bad',  text: '"The current state of the migration is 60% complete."', why: 'Live state. Belongs in Linear ticket. CLAUDE.md is not a status board.' },
    ],
  },
  {
    layer: 'Auto-memory',
    when: 'A user-specific fact that should be present every session without being searched-for.',
    color: '#f97316',
    examples: [
      { kind: 'good', text: 'feedback: "User prefers terse responses. No trailing summaries — they read the diff."', why: 'Behavioral correction. Saves dozens of tokens per response forever.' },
      { kind: 'good', text: 'user: "Senior platform engineer, 10y Rust, deep systems and security background."', why: 'Shapes the register and depth of every explanation.' },
      { kind: 'bad',  text: 'project: "The auth-rewrite project uses bcrypt with cost factor 12."', why: 'Project-specific atomic fact. Belongs in Engram, not auto-memory.' },
    ],
  },
  {
    layer: 'Engram',
    when: 'An atomic, project-scoped, searchable fact: a decision, a bug root cause, a non-obvious gotcha.',
    color: '#eab308',
    examples: [
      { kind: 'good', text: 'mem_save(topic_key="bug/anthropic-key-leak", content="${VAR:-fallback} returns the VALUE when set, not the fallback. Leaked $ANTHROPIC_API_KEY in echo. Hook hardened with end-anchored regex, 35/35 adversarial cases pass.")', why: 'Atomic root cause + fix. Searchable. Topic-keyed. Won\'t be forgotten.' },
      { kind: 'good', text: 'mem_save(topic_key="decision/reverie-replaces-engram", content="Reverie fully replaces Engram rather than wrapping it. All references in design artifacts removed. reverie-store drops into the same socket Engram exposes today.")', why: 'Architecture decision with rationale. Schema-violating → preserved with detail.' },
      { kind: 'bad',  text: 'mem_save(content="todo: fix the auth bug")', why: 'No topic_key. Empty semantics. Will become an unfindable orphan. Use Linear instead.' },
      { kind: 'bad',  text: 'mem_save(content="The function add() in math.rs returns a + b.")', why: 'Derivable from the code. Storing it is denial-of-service against your future self.' },
    ],
  },
  {
    layer: 'Obsidian',
    when: 'Long-form prose: a design doc, a post-mortem, research notes, a reading list, exploration too big for a row.',
    color: '#22c55e',
    examples: [
      { kind: 'good', text: '~/vault/30-Designs/reverie-dream-cycle-pipeline.md — full architecture doc with diagrams, tradeoffs, alternatives considered, references.', why: 'Graph-shaped knowledge with backlinks and MOCs. Engram would flatten it.' },
      { kind: 'good', text: '~/vault/40-Postmortems/2026-04-06-anthropic-key-leak.md — full incident timeline, root cause, fix, hook hardening, prevention going forward.', why: 'Long-form with sections, code blocks, and links to the Engram observations and Linear issue.' },
      { kind: 'bad',  text: '"Decided to use Rust." (one line note)', why: 'Atomic. Belongs in Engram with a topic_key, not as an Obsidian note.' },
    ],
  },
  {
    layer: 'Linear',
    when: 'A unit of work with acceptance criteria, constraints, and an explicit out-of-scope.',
    color: '#a855f7',
    examples: [
      { kind: 'good', text: 'TICKET: "Reduce session-token TTL from 3600s → 900s by 2026-04-15. MUST NOT invalidate existing sessions. OUT OF SCOPE: refresh path, cookie domain, OAuth provider migration."', why: 'Contract. The model can finish it. The reviewer can verify it. Drift is impossible.' },
      { kind: 'bad',  text: 'TICKET: "Fix the auth bug."', why: 'No spec. Invites scope creep. The model will wander. The reviewer will reopen settled questions.' },
    ],
  },
]

// ─── IMPLEMENTATION DETAILS (engineering deep-dives) ─────────────────

export const IMPLEMENTATION_DETAILS = [
  {
    title: 'Why bash + curl for Engram reads, MCP for writes',
    body: `MCP roundtrips average ~200ms because the protocol is JSON-RPC over stdio with framing overhead. A bash + curl call against the local HTTP endpoint averages ~3ms because it skips the framing entirely. For the dozens of reads a session does, the 60× factor is the difference between "I will check memory before answering" and "I will guess." The split is not aesthetic — it is the precondition for memory being used at all.`,
  },
  {
    title: 'Topic key format and upsert semantics',
    body: `Topic keys follow family/slug (lowercase, hyphen-separated). Families: architecture/, bug/, decision/, pattern/, config/, discovery/, learning/, session/. The composite key (topic_key, project, scope) is unique — same key + same project + same scope = UPSERT. Revising a fact updates the existing observation. New facts with new keys insert. This is the entire reason Engram does not turn into an append-only log of contradictions.`,
  },
  {
    title: 'FTS5 ranking and the limits of keyword search',
    body: `Engram uses SQLite's FTS5 with the default BM25 ranking. This is excellent for "find the bug we hit last quarter" and terrible for "find the engineering principle related to this idea." The fix is not to add a vector index — vector search has its own pathologies (queries and their negations are usually nearer in embedding space than they should be). The fix is to put graph-shaped knowledge in a graph-shaped store (Obsidian's MOC system) and leave Engram for the access pattern it is good at.`,
  },
  {
    title: 'How the PreToolUse hook actually rewrites commands',
    body: `Claude Code emits a JSON object on stdin to each hook script: { tool_name, tool_input, ... }. The script reads stdin, optionally rewrites tool_input.command (or any other field), and writes the modified JSON to stdout. Exit 0 = continue, exit 2 = block with the message on stderr as the reason. RTK's rewrite hook is ~20 lines of bash + jq. There is no SDK, no plugin API, no abstraction — it is a Unix pipe with a contract.`,
  },
  {
    title: 'CLAUDE.md attention decay past 200 lines',
    body: `Empirically, adherence to CLAUDE.md rules drops measurably past ~200 lines. We have not isolated whether this is positional (later rules get less attention) or aggregate (more rules dilute each rule's salience), but the practical consequence is the same: every line in CLAUDE.md is competing with every other line for the model's attention. Adding a rule demotes some other rule below the attention threshold. Treat the file as zero-sum. If you are at 380 lines, you do not have 380 rules — you have ~200 effective rules and 180 decorative ones.`,
  },
  {
    title: 'Maintenance: monthly vacuum and FTS5 optimize',
    body: `Engram's SQLite database benefits from periodic maintenance: pkill the daemon, run PRAGMA wal_checkpoint(TRUNCATE), VACUUM, INSERT INTO observations_fts(observations_fts) VALUES('optimize'), then restart. The "optimize" call rebuilds the FTS5 index, which improves both search precision and query latency. We run this monthly or after any bulk delete. The session-start hook checks the time-since-last-maintenance observation and triggers maintenance if it has been more than 30 days.`,
  },
]

// ─── NEUROINFORMATICS NOTES (for engineers + scientists) ─────────────

export const NEUROINFORMATICS_NOTES = [
  {
    title: 'Sharp-Wave Ripples (SWR) — the biological priority queue',
    body: `Hippocampal sharp-wave ripples are 100–250 Hz oscillatory bursts that occur during quiet wakefulness and NREM sleep. During SWRs, place cells replay sequences encoding recent experiences at ~20× the speed they originally occurred. Critically, replay is NOT random and NOT FIFO — it is reward-modulated, novelty-biased, and recency-weighted. Buzsáki (2015) reviews the evidence that SWR disruption impairs memory consolidation. Reverie's dream-cycle priority queue (score = recency × access × importance × novelty) is a direct translation. The biological mechanism is also why "replay everything in chronological order" is the wrong design — that is an EEG seizure, not consolidation.`,
  },
  {
    title: 'Systems Consolidation — gist transfers, detail fades',
    body: `McClelland, McNaughton, and O'Reilly (1995) introduced Complementary Learning Systems theory: a fast hippocampal learner (one-shot, pattern-separated) feeds a slow neocortical learner (statistical, distributed) via interleaved replay during sleep. Over days to weeks, gist transfers; episodic detail fades. The critical design constraint — and the one most "AI memory" systems violate — is that you cannot write directly to the slow store during a live session. Doing so causes catastrophic interference, where new learning overwrites old. Reverie enforces a staging buffer. The dream cycle is the only path from staging → consolidated.`,
  },
  {
    title: 'Synaptic Homeostasis (SHY) — sleep prunes, wake potentiates',
    body: `Tononi and Cirelli's Synaptic Homeostasis Hypothesis (Neuron 2014) argues that the primary function of slow-wave sleep is global proportional downscaling of synapses. Awake learning leaves synapses saturated; without periodic downscaling, signal-to-noise collapses. The downscaling is proportional, not absolute, so the relative ranking is preserved while the absolute weight shrinks. Reverie's weekly decay step is exactly this: every observation loses N% strength, strong ones survive, weak ones fall below threshold and archive. The audit finding (deleting 59% of observations improved every search result) is SHY in production.`,
  },
  {
    title: 'Reconsolidation (Nader) — every read is a write opportunity',
    body: `Nader, Schafe, and LeDoux (Nature 2000) showed that recalled memories briefly become labile and require protein synthesis to re-stabilize. Prediction error during recall triggers update. Confirmation strengthens. This is the biological basis for "every retrieval is a chance to revise the memory." Reverie's reconsolidation pass logs access events, checks for contradiction against the current session, and either updates content (with version history) or boosts strength. Engram's append-only model has no analogue — observations are never revised, only added or deleted, which is the wrong primitive.`,
  },
  {
    title: 'Behavioral Tagging — importance is decided in hindsight',
    body: `Frey and Morris (Nature 1997) demonstrated that weak memories near a significant event get retroactively stabilized by capturing plasticity-related proteins, but only if "captured" within ~1–2 hours. The implication for memory systems is profound: importance is NOT decided at save time. It is decided in retrospect, when session outcomes (bug fix, PR merge, decision made) reveal which observations were load-bearing. Reverie's session-end importance pass boosts observations in the temporal window of significant events. Tags expire after two dream cycles without reinforcement, mirroring the biological capture window.`,
  },
  {
    title: 'Pattern Separation vs. Pattern Completion — the dentate gyrus trick',
    body: `The hippocampus solves a fundamental memory tradeoff via two complementary subsystems: dentate gyrus (pattern separation, forces overlapping experiences into distinct representations) and CA3 (pattern completion, retrieves full memories from partial cues). Without separation, similar experiences interfere. Without completion, memories are inaccessible from incomplete queries. Reverie maps this to namespace discipline (project + scope = digital pattern separation) and topic-key fuzzy matching (digital pattern completion). The Engram audit found 14 observations with wrong project tags — that is pattern separation failure, and search precision drops accordingly.`,
  },
]
// ─── REVERIE AMBITIONS — what it's designed to replace + new capabilities ──

export const REVERIE_REPLACES = [
  {
    target: 'Engram',
    layer: 'Layer 2 — episodic / hippocampal',
    color: '#facc15',
    why_replaced: 'Engram is a hippocampus with no cortex. Flat keyword search, no consolidation, no decay, no replay, no reweighting on retrospect. 62% tombstone rate in our audit. Cap at ~80 LoCoMo F1 with no path forward.',
    how_replaced: 'reverie-store drops into the same socket Engram exposes today (localhost:7437). The bash client (mem raw), the MCP write tools, the session hooks, the Obsidian sync — none of them have to change. Substrate gets smarter; interfaces stay stable.',
    new_capabilities: [
      'Two-phase write: staging → consolidated. No catastrophic interference.',
      'Topic-key upsert with version history (Engram has flat upsert, no history).',
      'Replay-driven importance: observations boosted retroactively by session outcomes.',
      'Native graph relationships, not flat rows — heuristics stop interfering with project decisions.',
      'Per-observation decay curves, not global "delete on whim".',
    ],
  },
  {
    target: 'Obsidian (as the prose layer for synced knowledge)',
    layer: 'Layer 3 — semantic / cortical',
    color: '#22c55e',
    why_replaced: 'Obsidian is excellent for human reading and terrible as a programmatically-managed cortex. Sync without dedup creates duplicate notes (audit found 5+ pairs). Different naming conventions across sync passes create parallel knowledge silos. The MCP server is read-mostly; writes are awkward and lossy. Most fundamentally: Obsidian is a viewer, not a memory system, and we kept asking it to be the latter.',
    how_replaced: 'Reverie\'s consolidated tier IS the cortex. Long-form gist lives in the same store as atomic facts, just at a different consolidation status (Consolidated > Archived > Gisted). The Obsidian vault remains for human-authored prose — design docs, post-mortems, reading notes — but stops being the destination of automated sync. One source of truth, one set of identifiers, one consolidation policy.',
    new_capabilities: [
      'Gist extraction during dream cycle: long observations compress to ~1/20th token count while preserving semantic content.',
      'Schema integration via topic-key families (architecture/, bug/, decision/) — schemas evolve over time, not frozen at write.',
      'Cross-project pattern extraction (monthly cycle): notice that the same shape appears in three repos and surface it.',
      'Browsable export to Markdown / Obsidian format on demand, not as a sync target.',
      'Bidirectional links computed from semantic similarity + co-access, not hand-typed wikilinks.',
    ],
  },
]

export const REVERIE_AMBITIONS = [
  {
    id: 'dreaming',
    name: 'Dreaming',
    motivation: 'The system should improve while the user sleeps. Memory consolidation is the active ingredient of remembering, and biology spends a third of every life on it for a reason. An LLM memory system that does not have an off-line phase is leaving the largest performance lever in neuroscience on the floor.',
    bio_basis: 'NREM sharp-wave ripples replay the day at ~20× speed; REM integrates gist with existing schemas; both are required for next-day performance.',
    implementation: '4-tier cycle: per-session capture, nightly interleave + reconsolidate, weekly SHY decay + interference audit, monthly schema evolution review. Daemon runs without the model present. The model wakes up to a sharper version of yesterday\'s memory.',
    color: '#a855f7',
  },
  {
    id: 'selective-forget',
    name: 'Selective forgetting',
    motivation: 'Forgetting is not damage. Forgetting is the precondition for remembering — without proportional decay, signal-to-noise collapses and every search returns junk. The audit finding (deleting 59% of observations improved every search result) is the empirical proof. "Infinite memory" is the disease, not the cure.',
    bio_basis: 'Tononi & Cirelli\'s Synaptic Homeostasis Hypothesis: slow-wave sleep proportionally downscales all synapses globally; strong survive, weak prune. Patient H.M. shows the dual: a brain that cannot forget also cannot remember.',
    implementation: 'Weekly global decay: every observation × (1 − N%). Strong (high access × importance × depth) survive. Weak fall below threshold → archive → eventually delete. Decay is proportional, so ranking is preserved while absolute weight shrinks.',
    color: '#f87171',
  },
  {
    id: 'replay',
    name: 'Reward-modulated replay',
    motivation: 'FIFO is the wrong scheduler for consolidation. The brain does not replay yesterday in chronological order — it preferentially replays the experiences that turned out to matter. An importance signal that ignores outcome is just a recency signal in disguise.',
    bio_basis: 'Buzsáki (2015): hippocampal SWR replay is reward-modulated, novelty-biased, recency-weighted. Disrupting SWRs impairs memory consolidation.',
    implementation: 'Priority queue scored on (recency × access_count × importance × novelty). Reverse credit assignment: observations accessed during a successful debugging session get boosted retroactively. The system learns which of its memories were load-bearing.',
    color: '#fb923c',
  },
  {
    id: 'reconsolidation',
    name: 'Read-as-write reconsolidation',
    motivation: 'Engram\'s observations are read-only after creation. Real memories are not. Every retrieval is a chance to revise the memory based on new evidence — that is how beliefs update without overwriting history. Append-only memory accumulates contradictions; reconsolidating memory updates beliefs.',
    bio_basis: 'Nader, Schafe & LeDoux (Nature 2000): recalled memories briefly become labile and require protein synthesis to re-stabilize. Prediction error during recall triggers update; confirmation strengthens.',
    implementation: 'Every read logs an access event with session context. Dream cycle checks accessed observations for prediction error against the session. Contradicted → update content (with version history). Confirmed → boost strength. Accessed but irrelevant → flag for accelerated decay.',
    color: '#22d3ee',
  },
  {
    id: 'staging-buffer',
    name: 'Two-phase writes (no catastrophic interference)',
    motivation: 'Direct writes to the long-term store cause catastrophic interference: new learning overwrites old in distributed representations. This is THE critical design constraint that every "agent that learns from its conversations" violates on day one.',
    bio_basis: 'McClelland, McNaughton & O\'Reilly (1995) Complementary Learning Systems theory: fast hippocampal learner (one-shot, sparse, pattern-separated) feeds slow neocortical learner (statistical, distributed) via interleaved replay during sleep.',
    implementation: 'mem_save → staging buffer (NOT consolidated store). Dream cycle interleaves new observations alongside related existing ones during the slow-path consolidation pass. The consolidated store is never touched during a live session.',
    color: '#60a5fa',
  },
  {
    id: 'behavioral-tagging',
    name: 'Retroactive importance via behavioral tagging',
    motivation: 'Importance is decided in hindsight, not at save time. An observation that looked trivial when written can become load-bearing if it turns out to be the key fact in a successful debugging session. A memory system that locks importance at write time is committing to its first guess.',
    bio_basis: 'Frey & Morris (Nature 1997): weak memories near a significant event get retroactively stabilized by capturing plasticity-related proteins. The capture window is ~1–2 hours.',
    implementation: 'Session events (bug fix, PR merge, decision made, test pass after long failure) are importance signals. Observations within the temporal window of the event get a retroactive boost. Tags expire after 2 dream cycles without reinforcement, mirroring the biological capture window.',
    color: '#facc15',
  },
  {
    id: 'pattern-separation',
    name: 'Digital pattern separation + completion',
    motivation: 'Similar memories interfere. Without separation, every search returns adjacent-but-wrong results. Without completion, memories are inaccessible from incomplete cues. Engram had 14 observations with wrong project tags — that is pattern separation failure, and search precision drops with it.',
    bio_basis: 'Dentate gyrus forces overlapping experiences into distinct representations (separation). CA3 retrieves full memories from partial cues (completion). Both subsystems are required.',
    implementation: 'Strict project + scope namespacing = digital pattern separation. Topic-key fuzzy matching + content embedding = digital pattern completion. Interference audit finds overlapping observations and either merges (assimilation) or disambiguates (accommodation).',
    color: '#ec4899',
  },
  {
    id: 'schema-evolution',
    name: 'Schema evolution (the slow rewrite)',
    motivation: 'Topic-key families (architecture/, bug/, decision/) are schemas. Schemas should evolve as understanding deepens, but no one re-files old observations under new categories — the cost is too high to do by hand. The result is that old categorizations rot while new categories proliferate, until the namespace itself becomes noise.',
    bio_basis: 'Schema-consistent information consolidates via fast mPFC pathway (days, not weeks). Schema-violating information requires more hippocampal processing and is preserved in detail. Schemas can also distort memories — confabulation lives here.',
    implementation: 'Monthly schema-evolution cycle: classify all observations against current schemas, propose merges and splits, surface paradigm-shift candidates. Schema-violating observations are the highest-value dream operation — that is where reorganization hides.',
    color: '#84cc16',
  },
  {
    id: 'cross-project',
    name: 'Cross-project pattern extraction',
    motivation: 'The same bug shape, the same architectural fix, the same gotcha shows up in three repos six months apart. A project-scoped memory system never notices. A cortex notices and surfaces it as a generalization. This is where memory becomes wisdom.',
    bio_basis: 'Slow systems consolidation (McClelland et al. 1995) is exactly this: extracting statistical regularities from many episodic traces and storing the gist in distributed neocortical form.',
    implementation: 'Monthly cross-project pass: cluster observations across all projects by topic-key family + content similarity, extract repeated patterns, write generalized observations to a personal scope, link back to all source observations as evidence.',
    color: '#14b8a6',
  },
  {
    id: 'spacing-effect',
    name: 'Spacing effect (5 sessions > 50 hits)',
    motivation: 'Engram\'s importance proxy is access count. That is the wrong signal — accessed-50-times-in-one-session is a spike, accessed-in-5-distinct-sessions-over-2-weeks is a load-bearing fact. The brain figured this out a hundred years ago.',
    bio_basis: 'Distributed practice >> massed practice. Each spaced retrieval triggers reconsolidation and strengthens the trace. Optimal interval is 10–30% of retention period (Cepeda et al. 2008).',
    implementation: 'session_spread (distinct sessions accessed) is the primary importance signal, NOT total_access_count. Stability parameter S grows with spaced retrievals: retention = e^(−t/S). Long-gap retrieval gives a larger S boost (desirable difficulty).',
    color: '#a78bfa',
  },
  {
    id: 'depth-encoding',
    name: 'Levels-of-processing depth scoring',
    motivation: 'Bare facts decay faster than richly contextualized ones. A note that says "use bcrypt" is weaker than a note that says "use bcrypt because argon2id wasn\'t supported in our libsodium version, see PR #423, fallback plan was scrypt." The richer note survives pruning. The bare note shouldn\'t.',
    bio_basis: 'Craik & Lockhart (1972): deep semantic processing produces durable memory traces; shallow processing produces weak traces. Self-reference and generation effects enhance encoding.',
    implementation: 'depth_score field (1–3) computed at write: bare fact (1), fact + context (2), fact + context + rationale + links (3). Deeper observations decay slower. Enrichment pass during dream cycle adds depth retroactively when related observations are merged.',
    color: '#f59e0b',
  },
  {
    id: 'introspection',
    name: 'Introspectable consolidation',
    motivation: 'A memory system that you cannot observe is a memory system you cannot trust. Most "agent memory" products are black boxes — you write something, you ask later, sometimes it shows up. Reverie should expose every consolidation decision so the human can audit, override, and learn from the system\'s judgment.',
    bio_basis: 'Not biological — this is an engineering value imposed on top of the biological design. Brains are not introspectable; production systems should be.',
    implementation: 'Every dream cycle emits a structured journal: which observations were replayed, which were merged, which decayed, which were promoted, why. Journal is browsable in Obsidian, queryable via mem raw, and the raw decision tree is available for any single observation via mem raw /observations/<id>/dream-history.',
    color: '#06b6d4',
  },
]

// ─── ADVERSARIAL CALLOUTS — targets, citations, the shots ───────────

export const ADVERSARIAL_TARGETS = [
  {
    id: 'langchain',
    name: 'LangChain / LangGraph',
    section: 'misconception',
    claim: 'A framework that abstracts the model so you do not have to think about it.',
    rebuttal: 'Six layers of indirection over an HTTP call. The abstractions break with every model upgrade because they encode assumptions about specific provider behavior. "Memory" is a thin wrapper around a vector DB they did not write. The framework is the foot-gun.',
    evidence: 'The LangChain considered harmful discourse (Hamel Husain, mid-2024). Their own deprecation cadence — three "stable" memory APIs in 18 months. The fact that production teams strip LangChain out before going to production.',
  },
  {
    id: 'autogpt',
    name: 'AutoGPT / BabyAGI / AgentGPT',
    section: 'brain',
    claim: 'Give the agent a goal and it will figure out the rest.',
    rebuttal: 'Loop-until-broke as a design philosophy. The original autonomous-agent cargo cult. Famously burned through credit cards in 2023 producing nothing shippable, because "figure out the rest" is a euphemism for "the spec was never written."',
    evidence: 'GitHub issue trails. Reproducible "infinite loop on trivial task" demos. Two years on, zero production case studies.',
  },
  {
    id: 'crewai',
    name: 'CrewAI / AutoGen',
    section: 'brain',
    claim: 'Multi-agent role-play improves quality via specialization.',
    rebuttal: 'Performative organizational charts. The "manager agent delegates to coder agent who reports to QA agent" pattern is the same model talking to itself with different system prompts. The bureaucracy is theater — the agents share a weight file, a context window shape, and a failure mode. Adding more of them does not add capability; it adds turns, and every turn is a new chance for drift. The actual wins from multi-agent setups come from orchestration over specialized tools (search, code execution, memory lookup), not from role-playing job titles.',
    evidence: 'Multi-agent frameworks do not report wins over a single well-prompted agent on any public eval with a clean comparison. The latency and token tax are measurable; the quality lift is not. When you see a multi-agent case study, check whether the baseline was the same model with the same tools and the same context — it almost never is.',
  },
  {
    id: 'mem0',
    name: 'Mem0 / Zep / LangMem (vector-DB-as-memory)',
    section: 'leaderboard',
    claim: 'Embeddings + retrieval = memory.',
    rebuttal: 'Mid-table on the only honest benchmark in the field. Mem0 at 66.9, Zep at 75.1, LangMem at 58.1 on LoCoMo. Engram\'s dumb-keyword baseline is 80. EverMemOS is 92.3 with consolidation, not better embeddings. The substrate is not the bottleneck. The processing pipeline is.',
    evidence: 'LoCoMo leaderboard, public. Maharana et al. ACL 2024.',
  },
  {
    id: 'cursor',
    name: 'Cursor / Windsurf / Copilot',
    section: 'hierarchy',
    claim: 'The IDE is the right place to put AI assistance.',
    rebuttal: 'The IDE is the wrong abstraction boundary because real engineering work spans shells, browsers, dashboards, ticket systems, observability tools, and production state. They optimize typing assistance and underdeliver on engineering practice. No persistent memory across projects, no hooks, no spec layer, no consolidation, no audit trail.',
    evidence: 'Their own product surfaces. Try moving project context from one Cursor window to another and tell me what survives.',
  },
  {
    id: 'devin',
    name: 'Devin / Cognition / "autonomous SWE"',
    section: 'brain',
    claim: 'An autonomous engineer that resolves real issues end-to-end.',
    rebuttal: 'Glossy demo videos, opaque benchmarks, walked-back claims. The "unsupervised engineer" framing is the exact frame this piece exists to refute. The benchmark scores were revised downward after independent reproduction. The product remains gated and unverifiable.',
    evidence: 'Carl Brown\'s teardown of the original demo. The SWE-bench number revisions. Absence of replicable third-party runs.',
  },
  {
    id: 'replit',
    name: 'Replit Agent / v0 / Bolt',
    section: 'brain',
    claim: 'Vibe-code your way to a working app.',
    rebuttal: 'Optimized for "first working version" and structurally hostile to maintenance. The first 80% is fast because no spec was ever written; the last 20% is impossible for the same reason. Every export becomes a tar pit at month two.',
    evidence: 'Ask anyone who tried to maintain a v0 export at month two. The rewrite cost dwarfs the original build.',
  },
  {
    id: 'context-window',
    name: 'The "bigger context window fixes memory" camp',
    section: 'leaderboard',
    claim: 'Just wait for the next million-token model and your memory problem disappears.',
    rebuttal: 'Already settled by *Lost in the Middle* (Liu et al. TACL 2024) — recall is U-shaped over context position. Settled again by LoCoMo\'s own finding: top-5 RAG (F1 41.4) BEAT long-context-16K (F1 37.8) and dialog RAG top-50 (F1 34.8). More context made the model worse. Selectivity is the active ingredient. Volume is the placebo.',
    evidence: 'arXiv:2307.03172; arXiv:2402.17753 §5.2.',
  },
  {
    id: 'prompt-engineering',
    name: '"Prompt engineering" as the load-bearing discipline',
    section: 'hooks',
    claim: 'Careful prose in the system prompt is how you make the model behave.',
    rebuttal: 'Real but mis-scoped. The claim that you can shape model behavior reliably with prose alone is empirically false at production volume. Prompts are probabilistic requests. Hooks are guarantees. Anywhere a guarantee is possible, "trust me, I\'m good at prompting" is malpractice.',
    evidence: 'The secret-leak incident in this very piece — system prompt said "don\'t echo secrets," model echoed a secret via ${VAR:-fallback} expansion, hook now blocks the entire class absolutely. 35/35 adversarial cases pass. Probability vs. guarantee.',
  },
  {
    id: 'mcp-fixes-all',
    name: 'The "MCP fixes everything" camp',
    section: 'hierarchy',
    claim: 'Just plug more MCP servers in and the agent gets smarter.',
    rebuttal: 'MCP is great as a wire format and irrelevant as a memory architecture. It is transport, not semantics. Plugging more tools into an agent does not produce engineering practice; it produces a bigger hammer with the same swing.',
    evidence: 'The MCP spec itself. There is no consolidation primitive, no decay, no spec layer, no enforcement model. By design — that is the right scope for a wire protocol and the wrong scope for a memory system.',
  },
  {
    id: 'browser-agents',
    name: 'OpenAI Operator / browser agents that learn in production',
    section: 'reverie',
    claim: 'The agent learns by doing in the wild.',
    rebuttal: 'Catastrophic interference as a feature. No staging buffer, no consolidation, no rollback. They violate Complementary Learning Systems theory on day one — McClelland 1995 told us exactly why writing directly to the long-term store overwrites prior learning, and they did it anyway.',
    evidence: 'McClelland, McNaughton, O\'Reilly 1995. The failure mode is documented in neuroscience, predicted by theory, and reproducible in product.',
  },
]

// ─── ADDITIONAL SOURCES (the harness ones, not duplicated from reverie) ──

export const HARNESS_SOURCES = [
  { label: 'Anthropic — Prompt Caching docs', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching' },
  { label: 'LLMLingua-2 (Microsoft)', url: 'https://github.com/microsoft/LLMLingua' },
  { label: 'Lost in the Middle (Liu et al., TACL 2024)', url: 'https://arxiv.org/abs/2307.03172' },
  { label: 'MemGPT / Letta (Packer et al., ICLR 2024)', url: 'https://arxiv.org/abs/2310.08560' },
  { label: 'LoCoMo (Maharana et al., ACL 2024)', url: 'https://arxiv.org/abs/2402.17753' },
  { label: 'EverMemOS (Jan 2026)', url: 'https://arxiv.org/abs/2601.02163' },
  { label: 'CORE (temporal PageRank)', url: 'https://arxiv.org/abs/2503.04553' },
  { label: 'A-MEM (Zettelkasten reconsolidation, NeurIPS 2025)', url: 'https://arxiv.org/abs/2502.12110' },
  { label: 'Zep / Graphiti (bi-temporal KG)', url: 'https://arxiv.org/abs/2501.13956' },
  { label: 'Tononi & Cirelli — Sleep and the price of plasticity (Neuron 2014)', url: 'https://www.cell.com/neuron/fulltext/S0896-6273(13)01186-0' },
  { label: 'Nader, Schafe, LeDoux — Reconsolidation (Nature 2000)', url: 'https://www.nature.com/articles/35021052' },
  { label: 'McClelland, McNaughton, O\'Reilly — Complementary Learning Systems (1995)', url: 'https://psycnet.apa.org/doi/10.1037/0033-295X.102.3.419' },
  { label: 'Buzsáki — Sharp-wave ripples (Hippocampus 2015)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/hipo.22488' },
  { label: 'Scoville & Milner — Patient H.M. (1957)', url: 'https://jnnp.bmj.com/content/20/1/11' },
  { label: 'UC San Diego — Multi-Agent Memory from Computer Architecture', url: 'https://arxiv.org/abs/2603.10062' },
  { label: 'Tsinghua — Memory in the Age of AI Agents', url: 'https://arxiv.org/abs/2512.13564' },
]
