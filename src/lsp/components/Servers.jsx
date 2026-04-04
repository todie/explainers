const SERVERS = [
  { name: 'rust-analyzer', lang: 'Rust', color: '#f87171', speed: 'Fast', notes: 'Best-in-class. Incremental analysis, proc-macro expansion, full type inference. The gold standard for LSP.' },
  { name: 'typescript-language-server', lang: 'TS / JS / JSX / TSX', color: '#60a5fa', speed: 'Fast', notes: 'Wraps tsserver. Full type checking, auto-imports, rename across files. Used by VS Code, Claude Code.' },
  { name: 'pyright', lang: 'Python', color: '#facc15', speed: 'Fast', notes: 'Microsoft\'s type checker. Strict mode catches more than mypy. Excellent for typed Python codebases.' },
  { name: 'gopls', lang: 'Go', color: '#22d3ee', speed: 'Fast', notes: 'Official Go language server. Module-aware, full symbol resolution, go generate integration.' },
  { name: 'clangd', lang: 'C / C++', color: '#4ade80', speed: 'Medium', notes: 'LLVM-based. Uses compile_commands.json. Excellent for large C/C++ codebases. Incremental parsing.' },
  { name: 'lua-language-server', lang: 'Lua', color: '#a855f7', speed: 'Fast', notes: 'Supports Lua 5.1-5.4 + LuaJIT. Type annotations via comments. Used by Neovim plugin developers.' },
  { name: 'solargraph / ruby-lsp', lang: 'Ruby', color: '#f87171', speed: 'Medium', notes: 'Two options: Solargraph (community) or ruby-lsp (Shopify). Both support YARD docs and type inference.' },
  { name: 'bash-language-server', lang: 'Bash / Shell', color: '#6b7280', speed: 'Fast', notes: 'Basic completion, shellcheck integration for diagnostics. Limited type inference (it\'s bash).' },
  { name: 'sourcekit-lsp', lang: 'Swift', color: '#facc15', speed: 'Medium', notes: 'Apple\'s official server. Requires Xcode toolchain. Full type resolution for Swift packages.' },
  { name: 'intelephense', lang: 'PHP', color: '#a855f7', speed: 'Fast', notes: 'Premium features behind license. Free tier still excellent. Full WordPress/Laravel support.' },
]

export default function Servers() {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Language Servers
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 500, margin: '0 auto 32px', textAlign: 'center', lineHeight: 1.7 }}>
        One server per language. The editor doesn't care which — they all speak the same protocol.
      </p>

      <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SERVERS.map(s => (
          <div key={s.name} style={{
            background: '#111827', border: '1px solid #1f2937', borderRadius: 10,
            padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <div style={{ minWidth: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: 'var(--mono, monospace)' }}>{s.lang}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', fontFamily: 'var(--mono, monospace)' }}>{s.name}</span>
                <span style={{
                  fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                  background: s.speed === 'Fast' ? '#4ade8012' : '#facc1512',
                  color: s.speed === 'Fast' ? '#4ade80' : '#facc15',
                  border: `1px solid ${s.speed === 'Fast' ? '#4ade8020' : '#facc1520'}`,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>{s.speed}</span>
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6 }}>{s.notes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
