# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
