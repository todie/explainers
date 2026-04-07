# CLAUDE.md — todie/explainers

Project-level instructions for Claude Code sessions working in this repo.

## What this project is

Source for [explain.todie.io](https://explain.todie.io) (canonical) and
[rant.todie.io](https://rant.todie.io) (alias, planned voice split). Visual
deep-dives into how things work — memory models, token optimization, LSP,
neuroscience-grounded memory consolidation, embodied cognition, and more.

- **Stack:** React 19 + Vite 8 + React Router 7, MDX via `@mdx-js/rollup` +
  `@mdx-js/react` + `rehype-slug`.
- **Hosting:** Cloudflare Pages (direct-upload via `wrangler-action@v3` in
  [`.github/workflows/ci.yml`](.github/workflows/ci.yml)). Every push to `main`
  builds, verifies 5 artifact assertions, and auto-deploys.
- **Private docs:** CF Access-gated Pages Functions at
  [`functions/api/private/`](functions/api/private/) backed by an R2 bucket
  (`explainers-private-docs`). See [ROADMAP.md](ROADMAP.md) and the
  `/private` route.
- **Registry:** [`src/shared/explainers.js`](src/shared/explainers.js) — add a
  row here and a matching `src/<id>/App.jsx` to ship a new explainer.

## Design Context

See [`.impeccable.md`](.impeccable.md) for the full design stance. The
principles below are a working summary — when in doubt, open `.impeccable.md`
and read it end-to-end before making visual or tonal decisions.

### Users

Technical peers — HN-crowd engineers, infra people, AI researchers, Claude Code
power users. Assume high context: they know what an LLM, cache, or LSP is. They
arrived via a share link and will scan diagrams and section headers before
deciding to invest. The job to be done is: "give me the mental model I don't
have yet, one that makes the rest of my career cheaper."

### Brand Personality

**Rigorous, calm, generous.** Teacher-mode confidence without performance.
Claims are load-bearing, guesses are labeled, citations are real. Emotional
goal: the reader closes the tab feeling *smarter*, not entertained — closer to
"I just read a good paper" than "I just watched a good video."

Voice split: `explain.todie.io` is the rigorous voice. `rant.todie.io` (planned)
is the loud sibling — same content, irreverent prose. Design tokens are shared;
voice and copy diverge.

### Aesthetic Direction

- **References:** [ciechanowski.dev](https://ciechanowski.dev/) (pristine typography,
  diagram-forward, nothing decorative),
  [distill.pub](https://distill.pub/) (academic-adjacent clarity, measured voice).
- **Anti-references:** corporate SaaS marketing, Medium/dev.to blog chrome,
  AI-generated slop aesthetic, *and* arxiv-vanity austerity — distill.pub's
  clarity is the positive, not its dryness. Personality and color are welcome.
- **Theme:** dark-only. Near-black `#030712`, surfaces `#111827`, borders
  `#1f2937`. Light mode is "Maybe" in ROADMAP.md, not a priority.
- **Typography:** Inter (body) + JetBrains Mono (metadata/code). Defined in
  [`src/memory-model/global.css`](src/memory-model/global.css).
- **Color strategy:** each explainer picks *one* accent from the shared palette
  (`--blue` `--purple` `--green` `--yellow` `--red` `--cyan`) and commits to
  it. Accent owns the hero gradient, TOC progress bar, and current-section
  border. Never two accents per explainer.
- **Iconography:** emoji via Twemoji SVG CDN —
  [`src/shared/Emoji.jsx`](src/shared/Emoji.jsx). SVG line icons only for
  functional affordances (the private-docs lock). No custom icon art.
- **Motion:** subtle, slow, ignorable. `fadeUp`, `pulse`, `flowDown`. Respect
  `prefers-reduced-motion` whenever shipping a new animation.
- **Layout density:** `maxWidth: 900` for content (wider than Medium's 680),
  `gap: 80` between sections, `scrollMarginTop: 60` so TOC jumps don't clip.

### Design Principles

Higher in the list wins when principles conflict.

1. **The idea does the work, not the chrome.** If a flourish isn't load-bearing,
   cut it. Diagrams earn pixels; background glows usually don't.
2. **Respect the reader's time and context.** No preambles, no "let's dive in",
   no re-explaining basics. Insight in the first third of the page. Any TOC
   section must be enterable cold.
3. **Restraint over richness.** One accent per explainer, one mono font, one
   body font, one motion vocabulary, one emoji style. Variety from composition,
   not new primitives.
4. **Dark, technical, confident — never corporate.** If a pattern feels at home
   on a SaaS marketing page, it doesn't belong here.
5. **Show the work.** Real citations, real code, real diagrams. Label guesses.
   Generosity with source material is how we earn trust and separate the site
   from AI-summarized versions of the same topics.

## Workflow notes

- **PRs by default** — all changes go through a PR, no direct pushes to `main`.
- **Rebase-merge, not squash** — preserve commit history. See prior PRs for
  the expected commit-message style (conventional commits: `feat(scope):`,
  `fix(scope):`, `docs:`, etc.).
- **Update [`CHANGELOG.md`](CHANGELOG.md) on every user-visible change** —
  append entries to `[Unreleased]` (`### Added` / `### Changed` / `### Fixed`)
  in the same commit as the change itself. Do not split code and changelog
  into separate commits. Internal refactors, test-only tweaks, and CI
  changes can be skipped unless the user would notice.
- **Self-review the diff before committing**, not after the PR is open. Run
  `git diff --stat`, read each hunk, look for category-specific bugs
  (CI workflows, secrets, private-content leaks into the public bundle).
- **CI is load-bearing** — the build job runs 5 sanity assertions (per-route
  OG HTML, preview JPEGs, Pages Functions present, no private content in the
  public bundle, artifact summary). Never weaken these checks to unblock a
  deploy; fix the underlying issue.
- **Signed commits only** — all commits GPG-signed. Do not pass `--no-gpg-sign`.

## When adding a new explainer

1. Add an entry to [`src/shared/explainers.js`](src/shared/explainers.js) with
   `id`, `title`, `short`, `icon` (emoji), `path`, `tags`.
2. Create `src/<id>/App.jsx` plus any component files it needs.
3. Import the app and add a `<Route>` in [`src/main.jsx`](src/main.jsx).
4. Pick *one* accent color and thread it through the header gradient, the
   `TableOfContents` `accent` prop, and any decorative glows.
5. Add the route to the CI expectation list in
   [`.github/workflows/ci.yml`](.github/workflows/ci.yml) (both OG HTML and
   preview JPEG checks).
6. Generate a preview JPEG via `scripts/generate-fallback-previews.mjs`
   (or wait for the weekly workflow) and commit it to `public/previews/`.
7. Before opening the PR, re-read `.impeccable.md` and check the draft against
   each of the 5 design principles.
