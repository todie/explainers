# unsigned.gg — Brand Guide v1.0

*April 2026 — Active*

> The design language for a venture studio that ships infrastructure and scales founders. Credible to engineers. Legible to investors.

---

## Brand Identity

unsigned.gg is a venture studio that combines GPU cloud infrastructure services with GTM execution. We work with technical founders in AI, dev tools, and cybersecurity — and stake our equity on their revenue milestones.

### Brand Principles

| # | Principle | Description |
| --- | --- | --- |
| 01 | Technical authority | We run production-grade infrastructure. The brand signals engineering competence. |
| 02 | Terse and precise | Never use ten words when three will do. No buzzwords, no hedging. |
| 03 | Elevated, not polished | Dark aesthetic, disciplined grid — investor-legible without losing the terminal edge. |
| 04 | Skin in the game | We don't get paid until founders do. The brand conveys alignment. |
| 05 | No fluff, no fear | No ambiguity in hierarchy. No decorative noise without function. |
| 06 | Dual audience | Engineers trust us for the stack. Investors trust us for the structure. |

---

## Logo & Mark

Logotype set in **DM Mono** — monospace for technical infrastructure, weight 500. `.gg` suffix at weight 300, muted color. Always lowercase. Never drop the `.gg`.

## Color System

| Token | Value | Use |
| --- | --- | --- |
| --black | #080A0C | Page background |
| --ink | #0F1215 | Sidebar, nav |
| --surface | #141820 | Cards, panels |
| --body | #A8B4C4 | Body text |
| --heading | #D4DCE8 | Headings |
| --white | #EEF2F7 | Display type |
| --acid | #B8FF3C | CTAs, active states, key data |
| --acid-dim | #8FCC2A | Hover states |
| --red | #FF4D6A | Error, destructive |
| --amber | #F59E0B | Warning |
| --blue | #3B9EFF | Info, links |

**Acid** is used sparingly — maximum one focal accent per screen region.

## Typography

| Font | Role | Weights |
| --- | --- | --- |
| Syne | Display, headings (H1–H3) | 400–800 |
| DM Sans | Body, UI text, captions | 300–500 |
| DM Mono | Code, labels, nav, badges | 300–500 |

## Tone of Voice

* **Direct** — Lead with the verb. Cut preamble.
* **Precise** — Name the technology. Cite the number.
* **Confident** — No hedging.
* **Peer-level** — Engineers who've read their Strunk & White.

| Do | Don't |
| --- | --- |
| Deploy inference endpoints on GPU clusters with scale-to-zero. | We're excited to offer world-class cloud infrastructure solutions. |
| We stake equity on your revenue milestones. | Our mission is to empower founders to unlock their full potential. |

## CSS Custom Properties

```css
:root {
  --black: #080A0C; --ink: #0F1215; --surface: #141820;
  --body: #A8B4C4; --heading: #D4DCE8; --white: #EEF2F7;
  --acid: #B8FF3C; --acid-dim: #8FCC2A;
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
}
```
