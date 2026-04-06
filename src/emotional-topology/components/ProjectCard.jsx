import { useState } from 'react'
import RadarChart from './RadarChart'
import { DIMENSIONS } from '../data'

export default function ProjectCard({ project, sortDim }) {
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const sortedDims = sortDim
    ? [...DIMENSIONS].sort((a, b) =>
        a.key === sortDim ? -1 : b.key === sortDim ? 1 : 0
      )
    : DIMENSIONS

  const showPreview = expanded && project.preview && !imgError

  return (
    <div
      style={{
        background: '#0d1117',
        border: `1px solid ${expanded ? project.accentColor + '40' : '#1f2937'}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(v => !v)}
    >
      {/* Card header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 20px',
      }}>
        {/* Radar thumbnail */}
        <div style={{ flexShrink: 0 }}>
          <RadarChart scores={project.scores} color={project.accentColor} size={72} />
        </div>

        {/* Name + archetype */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#e5e7eb' }}>
              {project.name}
            </span>
            <span style={{
              fontSize: 11, color: project.accentColor,
              fontFamily: 'var(--mono, monospace)',
              background: project.accentColor + '15',
              border: `1px solid ${project.accentColor}30`,
              borderRadius: 4, padding: '1px 7px',
            }}>
              {project.archetype}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  fontSize: 10, color: '#4b5563', fontFamily: 'var(--mono, monospace)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 3,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
                onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}
              >
                \u2197
              </a>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
            {project.tagline}
          </div>

          {/* Spark bars */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {sortedDims.map(d => (
              <div key={d.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{
                  width: 28, height: 3, borderRadius: 2,
                  background: '#1f2937',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${project.scores[d.key]}%`,
                    background: sortDim === d.key ? d.color : d.color + '88',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
                <span style={{
                  fontSize: 8, color: sortDim === d.key ? d.color : '#4b5563',
                  fontFamily: 'var(--mono, monospace)',
                  fontWeight: sortDim === d.key ? 700 : 400,
                }}>
                  {d.short}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expand chevron */}
        <div style={{
          fontSize: 14, color: '#4b5563',
          transform: expanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
        }}>
          \u25be
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div
          style={{ borderTop: `1px solid ${project.accentColor}20`, padding: '20px' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Preview image */}
          {showPreview && (
            <div style={{ marginBottom: 20 }}>
              <img
                src={project.preview}
                alt={`${project.name} preview`}
                onError={() => setImgError(true)}
                style={{
                  width: '100%', borderRadius: 8, display: 'block',
                  border: `1px solid ${project.accentColor}20`,
                  aspectRatio: '1200/630', objectFit: 'cover',
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Large radar */}
            <div style={{ flexShrink: 0 }}>
              <RadarChart
                scores={project.scores}
                color={project.accentColor}
                size={180}
                showLabels
              />
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              {/* Scores table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {DIMENSIONS.map(d => (
                  <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 10, color: d.color, fontFamily: 'var(--mono, monospace)',
                      width: 60, textAlign: 'right', flexShrink: 0,
                    }}>
                      {d.short}
                    </span>
                    <div style={{
                      flex: 1, height: 4, borderRadius: 2,
                      background: '#1f2937', position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${project.scores[d.key]}%`,
                        background: d.color,
                      }} />
                    </div>
                    <span style={{
                      fontSize: 11, color: '#9ca3af',
                      fontFamily: 'var(--mono, monospace)', width: 28, textAlign: 'right',
                    }}>
                      {project.scores[d.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis text */}
          <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, margin: '16px 0' }}>
            {project.analysis}
          </p>

          {/* Quotes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {project.quotes.map((q, i) => (
              <blockquote key={i} style={{
                margin: 0, padding: '8px 14px',
                borderLeft: `2px solid ${project.accentColor}60`,
                fontSize: 12, color: '#6b7280', fontStyle: 'italic',
                background: project.accentColor + '08',
                borderRadius: '0 6px 6px 0',
              }}>
                {q}
              </blockquote>
            ))}
          </div>

          {/* External link footer */}
          {project.url && (
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid #1f2937` }}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11, color: project.accentColor, fontFamily: 'var(--mono, monospace)',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
              >
                {project.url} \u2197
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
