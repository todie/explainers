import { MDXProvider } from '@mdx-js/react'

/**
 * Shared typography wrapper for MDX explainer pages.
 *
 * Gives every .mdx file the same base styles for headings, paragraphs,
 * lists, code, blockquotes, tables, links, and emphasis — so you don't
 * have to restate the styles in every file. Individual components dropped
 * into the MDX (e.g. `<FindingCard>`, `<StatCard>`, custom data viz) still
 * work exactly as they do in a plain .jsx file; MDX passes them through
 * unchanged.
 *
 * Usage from a .mdx file:
 *
 *   import MdxExplainer from '../shared/MdxExplainer'
 *   import { SECTIONS } from './data'
 *
 *   <MdxExplainer accent="#f87171" sections={SECTIONS}>
 *
 *   # Page title
 *
 *   Regular Markdown paragraphs go here, with **bold**, *italic*, and
 *   [links](https://example.com). They automatically get the site's
 *   prose typography.
 *
 *   <CustomComponent prop="value" />
 *
 *   </MdxExplainer>
 *
 * Accent is optional (defaults to blue) and is used for link color and
 * heading underline glow. Sections is optional and if provided, a
 * TableOfContents is rendered in the corner (match the rest of the site).
 */

import TableOfContents from './TableOfContents'

const PROSE_MAX_WIDTH = 760

/**
 * Overrides for Markdown elements. MDX passes these via `components` prop
 * so any h1/h2/.../p/ul/.../code in the .mdx file uses our styled versions
 * instead of unstyled default HTML.
 */
function makeComponents(accent) {
  return {
    h1: ({ children }) => (
      <h1
        style={{
          fontSize: 'clamp(30px, 6vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          margin: '12px 0 18px',
          background: `linear-gradient(135deg, ${accent} 0%, #fb923c 40%, #ec4899 80%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        style={{
          scrollMarginTop: 60,
          fontSize: 26,
          fontWeight: 800,
          color: '#e5e7eb',
          letterSpacing: '-0.02em',
          margin: '56px 0 14px',
          paddingBottom: 10,
          borderBottom: '1px solid #1f2937',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        style={{
          scrollMarginTop: 60,
          fontSize: 18,
          fontWeight: 700,
          color: '#e5e7eb',
          margin: '28px 0 10px',
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontSize: 15,
          color: '#d1d5db',
          lineHeight: 1.75,
          margin: '0 0 14px',
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          paddingLeft: 24,
          margin: '0 0 14px',
          color: '#d1d5db',
          fontSize: 15,
          lineHeight: 1.75,
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        style={{
          fontSize: 15,
          color: '#d1d5db',
          lineHeight: 1.7,
          paddingLeft: 18,
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 0,
            color: accent,
            fontWeight: 700,
          }}
        >
          ›
        </span>
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong style={{ color: '#f3f4f6', fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: '#e5e7eb', fontStyle: 'italic' }}>{children}</em>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}50` }}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code
        style={{
          background: '#1f2937',
          padding: '2px 6px',
          borderRadius: 4,
          fontSize: '0.9em',
          fontFamily: 'var(--mono, monospace)',
          color: '#f3f4f6',
        }}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          background: '#0b1220',
          border: '1px solid #1f2937',
          borderRadius: 10,
          padding: 16,
          overflow: 'auto',
          fontSize: 13,
          lineHeight: 1.6,
          margin: '0 0 14px',
        }}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: `3px solid ${accent}`,
          margin: '20px 0',
          padding: '4px 0 4px 20px',
          color: '#9ca3af',
          fontStyle: 'italic',
          fontSize: 15,
          lineHeight: 1.7,
        }}
      >
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #1f2937',
          margin: '40px 0',
        }}
      />
    ),
    table: ({ children }) => (
      <div style={{ overflow: 'auto', margin: '0 0 14px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
          }}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th
        style={{
          background: '#1f2937',
          color: '#9ca3af',
          fontWeight: 600,
          textAlign: 'left',
          padding: '8px 12px',
          border: '1px solid #374151',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          padding: '8px 12px',
          border: '1px solid #1f2937',
          color: '#d1d5db',
        }}
      >
        {children}
      </td>
    ),
  }
}

export default function MdxExplainer({ accent = '#60a5fa', sections, children }) {
  const components = makeComponents(accent)

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #0a0308 0%, #030712 15%, #030712 100%)',
      }}
    >
      {sections && <TableOfContents sections={sections} accent={accent} />}

      <article
        style={{
          maxWidth: PROSE_MAX_WIDTH,
          margin: '0 auto',
          padding: '80px 24px 96px',
        }}
      >
        <MDXProvider components={components}>{children}</MDXProvider>
      </article>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
