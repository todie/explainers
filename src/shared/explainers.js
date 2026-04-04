/** Registry of all explainers — add new ones here. */
export const EXPLAINERS = [
  {
    id: 'memory-model',
    title: 'Memory Model',
    short: 'How Claude Code remembers',
    icon: '🧠',
    path: '/memory-model',
    tags: ['engram', 'context', 'memory', 'retrieval', 'injection', 'claude'],
  },
  {
    id: 'gestalt',
    title: 'Gestalt Thinking',
    short: 'Seeing wholes, not parts',
    icon: '👁',
    path: '/gestalt',
    tags: ['gestalt', 'perception', 'thinking', 'cognition', 'patterns', 'holistic'],
  },
  {
    id: 'prompt-cache',
    title: 'Caching Prompt Proxies',
    short: '90% cheaper API calls',
    icon: '🔄',
    path: '/prompt-cache',
    tags: ['cache', 'proxy', 'tokens', 'api', 'cost', 'anthropic', 'prefix'],
  },
  {
    id: 'lsp',
    title: 'Language Server Protocol',
    short: 'How code intelligence works',
    icon: '🔌',
    path: '/lsp',
    tags: ['lsp', 'language', 'server', 'protocol', 'ide', 'completion', 'diagnostics'],
  },
  {
    id: 'token-optimization',
    title: 'Token Optimization',
    short: 'Every technique to spend less',
    icon: '💰',
    path: '/token-optimization',
    tags: ['tokens', 'optimization', 'cost', 'efficiency', 'compression', 'rtk', 'caching'],
  },
]
