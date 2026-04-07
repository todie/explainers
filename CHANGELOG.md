# Changelog

All notable changes to [todie/explainers](https://github.com/todie/explainers)
are recorded here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
entries are grouped by PR, newest first.

## [Unreleased]

### Added
- **Design system** — `.impeccable.md` and project-level `CLAUDE.md`
  capturing users, brand personality (rigorous, calm, generous),
  aesthetic direction (ciechanowski.dev / distill.pub as positive
  references; corporate SaaS, Medium/dev.to blog chrome, AI-slop, and
  arxiv-vanity austerity as anti-references), and 5 prioritized design
  principles. Two rules were added later after visual review:
  "clean and sharp, not gamified" (no accordions, no rounded cards,
  typography over color) and "liberal use of visuals, charts, and
  diagrams" (≥3 original figures per explainer, SVG-first, captioned).
- **Twemoji-based `<Emoji>` component** (`src/shared/Emoji.jsx`) — all
  explainer/TOC/Nav icons now render as Twemoji v14.0.2 SVG images from
  the jsdelivr CDN, guaranteeing consistent color emoji on WSL2/Linux
  and older Windows builds where no color emoji font exists in the
  fallback chain. Non-emoji strings (text glyphs like `?`, `§`, `◉`)
  pass through as plain `<span>`s so ASCII still renders correctly.
- **CI preview deploys** (`.github/workflows/ci.yml`) — every in-repo
  pull request now auto-deploys to a Cloudflare Pages branch alias
  (`https://<slug>.explainers.pages.dev`) via `wrangler-action@v3` and
  posts a sticky comment with the URL, updated in place. Fork PRs are
  skipped so the API token is never exposed.
- **`/gestalt` Figure 1** — trade-off matrix plotting each thinking
  mode against speed-of-insight (y) vs communication-cost (x). Shows
  the section's thesis at a glance before the prose unpacks it.
- **`/gestalt` Figure 2** — SVG timing diagram of one insight plotted
  on two tracks: verbal tokens arriving one by one, the gestalt whole
  arriving all at once. Auto-plays on mount, then rests.
- **`/gestalt` Figures 3–8** — hand-built SVG diagrams for the six
  Gestalt principles (emergence, closure, proximity, similarity,
  figure/ground, continuity). Replaces the previous ASCII-art
  placeholders with real shapes, dot constellations, a Kanizsa
  triangle, and a Rubin vase.
- **`/gestalt` Figure 9** — research timeline plotting 12 papers
  (1923–2008) on a single horizontal axis so the century of
  convergent evidence is visible in one glance.
- **`/gestalt` Figure 10** — Hurlburt/Heavey DES frequencies as a
  bar chart, with "unsymbolized thinking" highlighted as the
  empirical foundation for the essay.

### Changed
- **`/gestalt` — stripped gamified chrome across every body component.**
  Removed click-to-expand accordions from ProcessingModes, Examples,
  Visualization, GestaltPrinciples, Ramifications, and Research.
  Dropped colored per-item pills, gradient-on-hover surfaces, and
  per-category colored card borders. Replaced rounded cards with
  hairline rules (`border-bottom: 1px solid #1f2937`). Replaced
  colored section labels with small-caps mono overlines. Semantic
  color is preserved only in `ProsCons` (green advantages / red
  failure modes) and only in the small-caps column headers.
- **`/gestalt` hero** — dropped the radial ambient glow, the rounded
  tinted-purple thesis box, and the multi-color heading gradient. The
  header is now left-aligned, solid off-white title, mono small-caps
  overline. The thesis renders as a distill-style left-hairline
  blockquote — the single accent-colored blockquote the explainer
  earns, per `.impeccable.md`'s "one source of color per page" rule.
- **`/gestalt` accent alignment** — page was registered with accent
  `#a855f7` (purple) in the TOC but the hero chrome shipped in red.
  Collapsed to a single purple identity across badge, ambient glow,
  heading gradient, blockquote, and links.
- **Site-wide icon rendering** — `Home.jsx`, `TableOfContents.jsx`,
  and `Nav.jsx` now delegate all emoji rendering to the new
  `<Emoji>` component.

### Fixed
- **Broken emoji on WSL2/Linux and older Windows** — system emoji
  rendering was falling back to monochrome text glyphs because no
  color emoji font was installed in the CSS fallback chain. VS16
  (U+FE0F) can't create a color font where none exists. Switched to
  Twemoji SVG CDN (see `Emoji.jsx`) for guaranteed consistent rendering.
- **Gestalt TOC icon mismatch** — the SECTIONS list mixed text
  glyphs (`◉`, `◫`, `↯`, `⚖︎`) with real emoji (`💬`, `👁️`, `⚡︎`,
  `📄`), causing two icon styles to render side-by-side in the TOC
  after the Twemoji switch. Unified to all-emoji.

---

*Prior to this changelog, history is recorded only in git log and in
individual PR descriptions. Start reading from the oldest unreleased
entry above if you want a consolidated account of the design system
rollout.*
