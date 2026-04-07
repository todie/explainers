import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'

// Site is hosted at explain.todie.io (canonical) with rant.todie.io as an
// alias — both subdomains point at the same Cloudflare Pages project, so
// assets resolve from /, not /explainers/.
//
// MDX support:
//   @mdx-js/rollup transforms .mdx files into JSX. It MUST run before
//   the React plugin (enforce: 'pre'). After the MDX transform, the
//   emitted module is standard JSX and the React plugin picks it up
//   normally via its default file-extension matching.
//
//   rehype-slug auto-generates heading IDs from the text content
//   ("Four findings" → "four-findings"). Sections in an .mdx file's
//   associated data.js should reference these auto-generated slugs
//   for the TableOfContents to scroll-spy correctly.
//
//   See src/shared/MdxExplainer.jsx for the typography wrapper and
//   src/embodied-mind/content.mdx for a full example of prose-focused
//   authoring with React components dropped inline.
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({ rehypePlugins: [rehypeSlug] }),
    },
    react(),
  ],
  base: '/',
})
