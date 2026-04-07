# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **The Harness explainer — full `/impeccable` stack rewrite.** The initial
  implementation scored 9/20 on `/impeccable:audit` because it violated
  `.impeccable.md`'s most explicit "clean and sharp, not gamified" rules:
  click-to-expand accordions in body prose, hero-metric template at the top,
  colored chips on every item, identical card grids repeated six times, AI
  cyan-on-dark palette, rainbow per-item accents competing with the page
  accent. Re-ran the full stack discipline — `/distill` → `/quieter` →
  `/arrange` → `/typeset` → `/adapt` → `/harden` → `/polish` — on
  `components.jsx` (990 lines) and `content.mdx` (~10k words):
  - **Deleted**: `HeroStats` (hero-metric template), `FramingsTriad` (card
    grid), `ReverieReplacesGrid` (card grid → `ReverieReplacesBlocks` prose),
    `AudienceBadge` (colored pill), click-to-expand state from
    `HierarchyPyramid` and `ReverieAmbitionGrid` (flattened to inline).
  - **`Foldable` rewritten** with hairline-only chrome — no gradient, no
    rounded border, no colored accent, no chevron rotation, no gamification.
    Added `aria-expanded`. Five Foldables retained for genuinely optional
    reference content (newbie primer, engineer asides, scientist asides,
    install guide, memory examples) with an italic `note` prop replacing
    the audience pill.
  - **Severity/category pills stripped** from `HookGrid`, `EngramAuditTable`,
    `NeuroGrid` — replaced with small-caps inline prefixes. No more filter-UI
    dressed as essay prose.
  - **Gradient backgrounds stripped** from every component. Cards are gone;
    sections are separated by `border-top: 1px solid #1f2937` hairlines and
    whitespace.
  - **Color-as-hierarchy eliminated.** Component titles are plain `#e5e7eb`
    at the appropriate weight. Color is now reserved for the single cyan
    accent (chrome, inline links, one `Pull` blockquote style) plus one
    semantic good/bad palette in `MemoryExamples` and `DivisionOfLaborGrid`.
  - **`Adversarial` de-escalated.** Removed the red "SHOT FIRED" pill.
    Claim/rebuttal/evidence structure kept, small-caps "Contra" prefix,
    quiet left rule.
  - **`PlacementTree` rebuilt** from fixed-viewBox SVG (800×540) to flex/grid
    with `repeat(auto-fit, minmax(200px, 1fr))` — reflows cleanly on mobile.
  - **`ForgetCurve` responsive wrapper** + horizontal Y-axis label, `role`
    and `aria-label` for screen readers.
  - **`RTKFlow` and `LoCoMoChart` bars** switched from gradient to solid fills
    (accent for highlighted series, muted for baselines). No decorative
    gradient.
  - **Monospace restricted to code and data.** Removed decorative monospace
    from eyebrow labels, severity badges, and UI chrome.
  - **Minimum label size bumped to 12 px** across all components (up from
    9–10 px) for readability.
  - Result: ~25 KB bundle reduction, cleaner prose flow, honest
    typographic hierarchy, Foldables as genuinely optional reference
    content rather than gamified dashboard UX.
- **Sticky preview comment in `ci.yml` fixed.** The `deployment-url` output
  from `cloudflare/wrangler-action@v3` returns empty for branch-alias
  deploys, producing a broken "This deploy: " line in the sticky comment.
  Dropped the dead field and switched to a two-row markdown table
  (Home + Harness explainer) using only the stable branch-alias URL.

### Added

- **The Harness: Beyond Vibes** explainer (`/harness`) — full manifesto on
  running Claude Code like infrastructure. Covers the 5-layer memory
  hierarchy, RTK shell compression, Engram + audit findings, hooks-as-
  guarantees, programmer-as-brain division of labor, the Reverie
  consolidation daemon (which replaces both Engram and the Obsidian sync
  layer), the LoCoMo leaderboard, an end-to-end install guide, memory-
  population examples, neuroinformatics asides, and adversarial-but-cited
  callouts against LangChain, AutoGPT, CrewAI, Mem0/Zep/LangMem, Cursor,
  Devin, Replit Agent, browser agents, the bigger-context-window school,
  prompt-engineering-as-a-discipline, and the MCP-fixes-everything camp.
  Foldable sections for newbie / engineer / scientist tracks. Cyan accent
  (`#22d3ee`).
- 12 rendered React visual components for the harness explainer:
  hierarchy pyramid, RTK savings flow, Engram read/write split, audit
  findings table, SVG placement decision tree, hook enforcement grid,
  division-of-labor grid, neuroscience mechanisms grid, dream pipeline,
  selective forget curve (SVG), LoCoMo leaderboard, Reverie ambitions
  grid (12 features with bio basis + implementation), install guide,
  memory examples, implementation details, neuroinformatics asides.
- `Foldable`, `AudienceBadge`, `Pull`, and `Adversarial` MDX primitives
  for audience-tagged collapsible sections and adversarial callouts.
- Harness preview JPEG (`public/previews/harness.jpeg`) generated via
  `scripts/generate-fallback-previews.mjs`.
- CI assertion list updated to include the new `harness` route in both
  the OG HTML and preview-image checks.
