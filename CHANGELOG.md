# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **OG preview images clipped long titles off the right edge of the canvas.**
  `scripts/generate-fallback-previews.mjs` rendered the title at a fixed 88pt
  via `-annotate` with no width fit, so any title longer than ~12 characters
  silently overflowed the 1200×630 OG card. Visible on `harness.jpeg`
  ("The Harness: Beyond V…"), `embodied-mind.jpeg` ("The Body Is Not A Vess…"),
  `lsp.jpeg`, and `prompt-cache.jpeg`. Fixed by introducing `fitTitlePt()`
  which scales the pointsize to fit the 1056px-wide content box (1200 − 72
  left margin − 72 right margin), capped at 88 for short titles and floored
  at 40 so text never goes tiny. Regenerated all four affected previews.

- **Harness explainer — P1/P2 audit follow-ups.** After the full `/impeccable`
  stack rewrite landed the piece at 15/20 on `/impeccable:audit`, addressed
  the remaining P1 and P2 findings to close the gap:
  - **`NeuroGrid` mobile collapse.** Rebuilt the bio↔mapping grid with
    `repeat(auto-fit, minmax(300px, 1fr))` so the two-column teaching layout
    collapses cleanly to a single column below ~680px, where the
    side-by-side paragraphs stopped being legible on phones.
  - **`ForgetCurve` legend moved out of the SVG.** The legend was positioned
    at pixel `(W - 260, PT + 6)` inside the SVG, which caused it to overlap
    the decay curves on viewports below ~420px. Moved to an HTML flex row
    underneath the SVG with `flex-wrap` so it stacks cleanly on mobile.
  - **`Foldable` hardened.** Added `aria-controls` linking the trigger
    button to a stable `panelId` derived from the title, `min-height: 44px`
    to guarantee the WCAG touch-target minimum even on short titles, and
    an explicit `:focus-visible` ring (2 px cyan, 6 px offset) via a scoped
    `<style>` tag — the browser default was there but easy to miss against
    the dark canvas.
  - **`DreamPipeline` gutter** — changed from fixed `40px` to `auto` with a
    `minWidth: 32` on the number badge, so short numbers don't waste space
    on narrow viewports.
  - **Sharpened the CrewAI rebuttal.** The previous "benchmark deltas
    inside noise" claim was thin. Replaced with a concrete argument about
    shared weight files and comparison discipline — multi-agent frameworks
    don't publish clean comparisons against a single well-prompted agent
    with the same model + tools + context, and when you check their case
    studies the baseline almost never controls for those variables.
  - **Softened the `35 of 35 test cases` claim** in the secret-leak anecdote.
    Replaced with "every adversarial case we've been able to construct" —
    the underlying hook is real, but the exact case count was from memory
    and shouldn't be a load-bearing number.

### Changed

- **Harness explainer — data/component separation restored.** The initial
  rewrite inlined `INSTALL_STEPS`, `MEMORY_EXAMPLES`, `IMPLEMENTATION_NOTES`,
  and `NEURO_NOTES` as constants inside `components.jsx`, which
  (a) duplicated the existing exports in `data.js` that were no longer
  imported anywhere, and (b) used shorter/shallower versions of each
  dataset than the originals. Reverted to importing all four from
  `data.js` and iterating them in the consumer components — readers now
  get the richer 8 install steps / 5 memory layers / 6 implementation
  notes / 6 neuroinformatics notes instead of the 7/5/3/4 inline
  approximations. Bundle +11 KB for the richer content.
- **`SECTIONS` icons** simplified to empty strings. The table of contents
  was using esoteric Unicode glyphs (`§ ▤ ◇ ◈ ◊ ▦ ⬢ ▣ ◉ ▼ ☾ ✦ ∅ ∎ ∞ ◐ ⁂`)
  as decoration. `TableOfContents.jsx` only renders the icon span when
  truthy, so empty strings leave the TOC as a clean typographic list of
  section titles.
- **`data.js` dead exports removed:** `HERO_STATS` (hero-metric template
  component deleted in the `/distill` pass), `FRAMINGS` (framings-triad
  card grid deleted), and `PLACEMENT_TREE` (placement-tree component
  rebuilt from inline JSX in `components.jsx`).

### Changed from previous entry

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
