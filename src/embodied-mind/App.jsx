// The embodied-mind explainer entry point.
//
// As of the MDX support PR (#TODO), this file is a thin wrapper that just
// mounts the MDX content. All the prose, headings, and section structure
// live in ./content.mdx; the reusable card components live in ./components.jsx;
// the structured data (hero stats, findings, evidence rows, sources) still
// lives in ./data.js.
//
// To edit the page content: open content.mdx and treat it like Markdown.
// To change how a card renders: open components.jsx.
// To add/edit/remove a finding or source: open data.js.
import Content from './content.mdx'

export default function EmbodiedMindApp() {
  return <Content />
}
