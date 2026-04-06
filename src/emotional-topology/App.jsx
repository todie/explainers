import { useState } from 'react'
import TableOfContents from '../shared/TableOfContents'
import RadarChart from './components/RadarChart'
import ProjectCard from './components/ProjectCard'
import PortfolioRadar from './components/PortfolioRadar'
import MetaAnalysis from './components/MetaAnalysis'
import { PROJECTS, DIMENSIONS } from './data'

const SECTIONS = [
  { id: 'portfolio', title: 'Portfolio Overview', icon: '\u25ce' },
  { id: 'projects',  title: 'All Projects',       icon: '\u25a4' },
  { id: 'meta',      title: 'Meta-Patterns',      icon: '\u29b0' },
]

const ACCENT = '#f87171'

export default function EmotionalTopologyApp() {
  const [sortDim, setSortDim] = useState(null)

  const sortedProjects = sortDim
    ? [...PROJECTS].sort((a, b) => b.scores[sortDim] - a.scores[sortDim])
    : PROJECTS

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #110a0a 0%, #030712 15%, #030712 100%)',
    }}>
      <TableOfContents sections={SECTIONS} accent={ACCENT} />

      {/* Header */}
      <header style={{
        position: 'relative', padding: '80px 24px 56px', textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(248,113,113,0.07) 0%, rgba(251,146,60,0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Scattered mini radars */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {PROJECTS.slice(0, 8).map((p, i) => (
            <div key={p.id} style={{
              position: 'absolute',
              left: `${8 + (i * 11.5) % 84}%`,
              top: `${12 + (i * 17) % 76}%`,
              opacity: 0.08,
              transform: 'translate(-50%, -50%)',
            }}>
              <RadarChart scores={p.scores} color={p.accentColor} size={48} />
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.18)',
            fontSize: 12, color: '#f87171', fontFamily: 'var(--mono, monospace)',
            letterSpacing: '0.04em', marginBottom: 20,
          }}>
            todie.io / explainers
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #f87171 0%, #fb923c 40%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Emotional Topology
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: '#6b7280', maxWidth: 620,
            margin: '0 auto', lineHeight: 1.7,
          }}>
            A dimensional analysis of the affective signatures embedded in todie.io system prompts,
            engrams, and CLAUDE.md files — across five emotional axes.
          </p>

          <div style={{
            display: 'flex', gap: 28, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap',
            fontSize: 13, color: '#4b5563', fontFamily: 'var(--mono, monospace)',
          }}>
            <span><strong style={{ color: '#f87171' }}>10</strong> projects analyzed</span>
            <span><strong style={{ color: '#fb923c' }}>5</strong> emotional dimensions</span>
            <span><strong style={{ color: '#fbbf24' }}>4</strong> portfolio patterns</span>
          </div>

          {/* Dimension legend */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap',
          }}>
            {DIMENSIONS.map(d => (
              <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                <span style={{ fontSize: 12, color: '#6b7280', fontFamily: 'var(--mono, monospace)' }}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'flex', flexDirection: 'column', gap: 72 }}>

        {/* Portfolio Overview */}
        <div id="portfolio" style={{ scrollMarginTop: 60 }}>
          <PortfolioRadar />
        </div>

        {/* All Projects */}
        <div id="projects" style={{ scrollMarginTop: 60 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e5e7eb', margin: '0 0 6px' }}>
              All Projects
            </h2>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px' }}>
              Click any card to expand the full analysis. Sort by dimension to reorder.
            </p>

            {/* Sort controls */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--mono, monospace)' }}>
                sort by:
              </span>
              <button
                onClick={() => setSortDim(null)}
                style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 6,
                  background: sortDim === null ? '#1f2937' : 'transparent',
                  border: `1px solid ${sortDim === null ? '#374151' : '#1f2937'}`,
                  color: sortDim === null ? '#e5e7eb' : '#6b7280',
                  cursor: 'pointer', fontFamily: 'var(--mono, monospace)',
                }}
              >
                default
              </button>
              {DIMENSIONS.map(d => (
                <button
                  key={d.key}
                  onClick={() => setSortDim(sortDim === d.key ? null : d.key)}
                  style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 6,
                    background: sortDim === d.key ? d.color + '20' : 'transparent',
                    border: `1px solid ${sortDim === d.key ? d.color + '50' : '#1f2937'}`,
                    color: sortDim === d.key ? d.color : '#6b7280',
                    cursor: 'pointer', fontFamily: 'var(--mono, monospace)',
                  }}
                >
                  {d.short}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sortedProjects.map(p => (
              <ProjectCard key={p.id} project={p} sortDim={sortDim} />
            ))}
          </div>
        </div>

        {/* Meta-Analysis */}
        <div id="meta" style={{ scrollMarginTop: 60 }}>
          <MetaAnalysis />
        </div>

        <footer style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid #1f2937' }}>
          <p style={{ fontSize: 12, color: '#4b5563' }}>
            Built by{' '}
            <a href="https://todie.io" style={{ color: '#f87171', textDecoration: 'none' }}>todie.io</a>
            {' '}with Claude Code.
          </p>
          <p style={{ fontSize: 11, color: '#374151', marginTop: 4 }}>
            "Affect is not noise — it is signal."
          </p>
        </footer>
      </div>
    </div>
  )
}
