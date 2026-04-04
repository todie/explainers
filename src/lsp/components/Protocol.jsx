import { useState } from 'react'

const LAYERS = [
  {
    id: 'editor',
    label: 'Editor / Client',
    color: '#60a5fa',
    icon: '📝',
    tag: 'VS Code, Neovim, Claude Code',
    desc: 'The editor is the client. It doesn\'t understand code — it understands text and cursor positions. When you open a file, type, or hover over a symbol, the editor sends a JSON-RPC message to the language server asking "what should I know about this position?"',
    items: ['textDocument/didOpen', 'textDocument/didChange', 'textDocument/completion', 'textDocument/hover'],
  },
  {
    id: 'transport',
    label: 'JSON-RPC Transport',
    color: '#facc15',
    icon: '🔌',
    tag: 'stdio | TCP | WebSocket',
    desc: 'LSP uses JSON-RPC 2.0 over a transport (usually stdio for local servers, TCP for remote). Every message has an id, method, and params. Requests get responses. Notifications are fire-and-forget. The protocol is bidirectional — the server can send notifications to the client (e.g., diagnostics).',
    items: ['request → response', 'notifications (no response)', 'bidirectional', 'Content-Length header framing'],
  },
  {
    id: 'server',
    label: 'Language Server',
    color: '#4ade80',
    icon: '🧠',
    tag: 'rust-analyzer, pyright, typescript-language-server',
    desc: 'The server understands the language. It parses code, builds ASTs, resolves types, tracks symbols across files. It responds to client requests with structured data — completions, diagnostics, definitions, references. One server per language, shared across all open files.',
    items: ['parse + typecheck', 'symbol resolution', 'cross-file references', 'incremental analysis'],
  },
]

const CAPABILITIES = [
  { name: 'Go to Definition', method: 'textDocument/definition', desc: 'Jump to where a symbol is defined', icon: '➡️', color: '#60a5fa' },
  { name: 'Find References', method: 'textDocument/references', desc: 'Find every usage of a symbol', icon: '🔍', color: '#a855f7' },
  { name: 'Hover', method: 'textDocument/hover', desc: 'Type info and docs at cursor position', icon: '💬', color: '#4ade80' },
  { name: 'Completions', method: 'textDocument/completion', desc: 'Suggest valid symbols at cursor', icon: '⌨️', color: '#facc15' },
  { name: 'Diagnostics', method: 'textDocument/publishDiagnostics', desc: 'Errors and warnings (server → client)', icon: '⚠️', color: '#f87171' },
  { name: 'Rename', method: 'textDocument/rename', desc: 'Rename a symbol across all files', icon: '✏️', color: '#22d3ee' },
  { name: 'Document Symbols', method: 'textDocument/documentSymbol', desc: 'All functions, classes, vars in a file', icon: '📋', color: '#60a5fa' },
  { name: 'Call Hierarchy', method: 'callHierarchy/incomingCalls', desc: 'Who calls this function? What does it call?', icon: '📞', color: '#a855f7' },
  { name: 'Code Actions', method: 'textDocument/codeAction', desc: 'Quick fixes, refactors at cursor', icon: '🔧', color: '#4ade80' },
  { name: 'Formatting', method: 'textDocument/formatting', desc: 'Auto-format entire document', icon: '📐', color: '#facc15' },
]

export default function Protocol() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        How It Works
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 560, margin: '0 auto 36px', textAlign: 'center', lineHeight: 1.7 }}>
        Three layers: editor (client), transport (JSON-RPC), and language server. The protocol decouples editor features from language understanding.
      </p>

      {/* Layer stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640, margin: '0 auto' }}>
        {LAYERS.map((layer, li) => (
          <div key={layer.id}>
            <div
              onClick={() => setActive(active === layer.id ? null : layer.id)}
              style={{
                background: active === layer.id ? `linear-gradient(135deg, #111827 0%, ${layer.color}06 100%)` : '#111827',
                border: `1px solid ${active === layer.id ? layer.color + '30' : '#1f2937'}`,
                borderRadius: 14, padding: '20px 24px', cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: layer.color + '12', border: `1px solid ${layer.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{layer.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: layer.color }}>{layer.label}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono, monospace)' }}>{layer.tag}</div>
                </div>
                <span style={{ fontSize: 14, color: '#4b5563', transition: 'transform 0.2s', transform: active === layer.id ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {layer.items.map(item => (
                  <span key={item} style={{
                    fontSize: 10, fontFamily: 'var(--mono, monospace)', color: layer.color,
                    background: layer.color + '08', border: `1px solid ${layer.color}15`,
                    padding: '4px 10px', borderRadius: 6,
                  }}>{item}</span>
                ))}
              </div>
              {active === layer.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1f2937', fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>
                  {layer.desc}
                </div>
              )}
            </div>
            {li < LAYERS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                <span style={{ fontSize: 11, color: '#374151', fontFamily: 'var(--mono, monospace)' }}>
                  {li === 0 ? '↕ JSON-RPC messages' : '↕ parse + respond'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Capabilities grid */}
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e5e7eb', marginBottom: 8 }}>Capabilities</h3>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>What a language server can do. Each is a JSON-RPC method.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, maxWidth: 700, margin: '0 auto' }}>
        {CAPABILITIES.map(cap => (
          <div key={cap.method} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
            padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>{cap.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: cap.color }}>{cap.name}</div>
              <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--mono, monospace)', marginTop: 2 }}>{cap.method}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{cap.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
