const STEPS = [
  {
    phase: 'Session Start',
    color: '#60a5fa',
    actions: [
      { tool: 'MCP', cmd: 'mem_session_start', desc: 'Register session in engram (id: project-YYYY-MM-DD)' },
      { tool: 'HTTP', cmd: 'mem raw "/context?project=X&limit=10"', desc: 'Load recent observations into context (~3ms)' },
      { tool: 'AUTO', cmd: 'CLAUDE.md + MEMORY.md injection', desc: 'Deterministic context loaded before first response' },
    ],
  },
  {
    phase: 'Mid-Session',
    color: '#a855f7',
    actions: [
      { tool: 'HTTP', cmd: 'mem raw "/search?q=KEYWORDS&limit=5"', desc: 'FTS5 keyword search when prior work might be relevant' },
      { tool: 'HTTP', cmd: 'mem raw "/observations/ID"', desc: 'Full observation retrieval by ID (3-layer disclosure)' },
      { tool: 'MCP', cmd: 'mem_save', desc: 'Proactive save: decisions, bugs, conventions, discoveries' },
      { tool: 'MCP', cmd: 'mem_update', desc: 'Update existing observation by ID (same topic_key = upsert)' },
    ],
  },
  {
    phase: 'Session End',
    color: '#4ade80',
    actions: [
      { tool: 'MCP', cmd: 'mem_session_summary', desc: 'Save: goal, discoveries, accomplished, next steps, files' },
      { tool: 'MCP', cmd: 'mem_session_end', desc: 'Mark session completed in engram' },
    ],
  },
]

const toolColors = { MCP: '#4ade80', HTTP: '#facc15', AUTO: '#a855f7' }

export default function FlowTimeline() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: 'var(--text-bright)', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Retrieval Flow
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 500, margin: '0 auto 40px', textAlign: 'center' }}>
        What happens at each phase of a session.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 640, margin: '0 auto', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 19, top: 40, bottom: 40, width: 2, background: 'linear-gradient(180deg, #60a5fa30, #a855f730, #4ade8030)' }} />

        {STEPS.map((step, si) => (
          <div key={step.phase} style={{ position: 'relative', paddingLeft: 52, animation: `fadeUp 0.5s ease ${si * 150}ms both` }}>
            {/* Phase dot */}
            <div style={{
              position: 'absolute', left: 8, top: 2,
              width: 24, height: 24, borderRadius: '50%',
              background: step.color + '15', border: `2px solid ${step.color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: step.color }} />
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              {step.phase}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {step.actions.map((action, ai) => (
                <div key={ai} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                  padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, fontFamily: 'var(--mono)',
                      color: toolColors[action.tool],
                      background: toolColors[action.tool] + '12',
                      border: `1px solid ${toolColors[action.tool]}25`,
                      padding: '2px 8px', borderRadius: 4,
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{action.tool}</span>
                    <code style={{
                      fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text)',
                      background: 'var(--surface2)', padding: '2px 8px', borderRadius: 4,
                      border: '1px solid var(--border)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{action.cmd}</code>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {action.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
