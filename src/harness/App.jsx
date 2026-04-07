// The Harness explainer entry point.
//
// Thin wrapper that mounts the MDX content. All prose, headings, diagrams,
// and tables live in ./content.mdx. Section IDs for the TOC live in ./data.js.
import Content from './content.mdx'

export default function HarnessApp() {
  return <Content />
}
