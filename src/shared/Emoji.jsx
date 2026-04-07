/**
 * <Emoji> — render an emoji as an inline color SVG from the Twemoji CDN.
 *
 * Why this exists:
 *   System emoji rendering is wildly inconsistent. On WSL2 / Linux without
 *   Noto Color Emoji installed, on Windows without a recent Segoe UI Emoji,
 *   and on older Android/iOS, many emoji render as monochrome text glyphs
 *   instead of the full-color pictographs everyone expects. VS16 (U+FE0F)
 *   helps only when a color emoji font is actually in the CSS fallback
 *   chain — it doesn't create one where none exists.
 *
 *   This component sidesteps the font-stack lottery entirely by rendering
 *   each emoji as an <img> tag pointing at the Twemoji SVG CDN
 *   (cdn.jsdelivr.net/gh/twitter/twemoji). Same rendering on every
 *   browser/OS, no font downloads, no JS bundle bloat.
 *
 * Usage:
 *   import Emoji from '../shared/Emoji'
 *   <Emoji size={28}>{ex.icon}</Emoji>
 *   <Emoji>🫀</Emoji>
 *
 * The component takes its emoji text as children and emits an <img>. Size
 * defaults to 1em so it scales with the surrounding font size. Alt text is
 * the emoji literal so copy-paste and screen readers still work.
 *
 * How the codepoint conversion works:
 *   Twemoji's SVG filenames are the emoji's codepoints joined with '-',
 *   lowercase hex, NO zero-padding. The filename skips U+FE0F (variation
 *   selector 16) in most cases UNLESS the emoji is a single codepoint +
 *   FE0F (then it's included). ZWJ sequences keep the 200d. Examples:
 *     🧠       → 1f9e0.svg
 *     👁️       → 1f441-fe0f.svg
 *     🏴‍☠️     → 1f3f4-200d-2620-fe0f.svg
 *     🫀       → 1fac0.svg
 *
 * The `toCodepoints` function below implements Twemoji's own filename
 * convention (it's not arbitrary — it matches the CDN layout).
 */

// jsdelivr proxies the upstream Twitter/twemoji repo's svg/ directory.
// Pinned to v14.0.2 so the URLs don't move under us; bump when twemoji
// releases a new version with emoji sets we want.
const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg'

/**
 * Convert an emoji string into its Twemoji filename stem.
 *
 * The rule matches the official twemoji `grabTheRightIcon()` function:
 *   1. Skip U+FE0F unless the input is exactly two codepoints where
 *      the second one is U+FE0F (in which case keep it — e.g. ⚠️, ✉️,
 *      👁️ all include the FE0F because they're text-default base + VS16).
 *   2. Emit each remaining codepoint as lowercase hex, joined by '-'.
 */
function toCodepoints(str) {
  const cp = [...str].map(c => c.codePointAt(0))
  // Single base + FE0F → keep the FE0F (Twemoji includes it in the filename)
  if (cp.length === 2 && cp[1] === 0xfe0f) {
    return cp.map(c => c.toString(16)).join('-')
  }
  // Multi-codepoint ZWJ sequences: keep FE0F where it appears (Twemoji includes
  // them in ZWJ filenames like 1f3f4-200d-2620-fe0f.svg for the pirate flag)
  if (cp.length > 2) {
    return cp.map(c => c.toString(16)).join('-')
  }
  // Drop trailing FE0F if it's the only modifier (shouldn't happen after
  // the length-2 case above, but defensive)
  const cleaned = cp.filter(c => c !== 0xfe0f)
  return cleaned.map(c => c.toString(16)).join('-')
}

/**
 * Heuristic: is this string an emoji, or just a plain unicode symbol /
 * ASCII character?
 *
 * Callers often pass strings that aren't real emoji — TOC icons like '?',
 * '§', '◉', '▲', '→' are plain text glyphs that Twemoji doesn't have SVGs
 * for. Rendering them via <img src="…/3f.svg"> would 404. So we only
 * promote a string to an <img> if it contains at least one codepoint in
 * the pictographic emoji ranges.
 *
 * Ranges covered (conservative, by observed Twemoji support):
 *   U+1F000–U+1FFFF   — main pictographic supplementary planes
 *   U+2600–U+27BF     — misc symbols + dingbats (✨, ⚡, ✂ etc.)
 *   U+2300–U+23FF     — misc technical (⌛, ⌚, ⏰ etc.)
 *   U+25A0–U+25FF     — geometric shapes (◆, ◇ — Twemoji has a few)
 *   U+2B00–U+2BFF     — misc symbols and arrows (⭐, ⬆ etc.)
 *   U+1F1E6–U+1F1FF   — regional indicators (covered by U+1Fxxxx above)
 *
 * We also check U+FE0F and U+200D as continuation markers but they alone
 * don't count as emoji content.
 */
function isEmojiString(str) {
  for (const ch of str) {
    const cp = ch.codePointAt(0)
    if (cp >= 0x1f000 && cp <= 0x1ffff) return true
    if (cp >= 0x2600 && cp <= 0x27bf) return true
    if (cp >= 0x2300 && cp <= 0x23ff) return true
    if (cp >= 0x2b00 && cp <= 0x2bff) return true
  }
  return false
}

export default function Emoji({ children, size = '1em', className = '', style = {} }) {
  const str = typeof children === 'string' ? children : String(children ?? '')
  if (!str) return null

  // Pass-through: plain ASCII / text glyphs render as text in the parent's
  // font. Only promote real emoji strings to Twemoji SVG <img>s.
  if (!isEmojiString(str)) {
    return <span className={className} style={style}>{str}</span>
  }

  const stem = toCodepoints(str)
  const src = `${TWEMOJI_BASE}/${stem}.svg`

  return (
    <img
      src={src}
      alt={str}
      draggable="false"
      className={`emoji ${className}`.trim()}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        verticalAlign: '-0.15em',
        // Let the img inherit the surrounding font sizing so it scales with text
        ...style,
      }}
    />
  )
}
