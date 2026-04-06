/**
 * Private document registry.
 * Content is embedded in the bundle — only rendered after auth.
 * To add a doc: import it here and add an entry.
 *
 * For large collections, consider lazy-loading via dynamic import().
 */

export const CATEGORIES = [
  { id: 'unsigned-gg', label: 'unsigned.gg', icon: '🟢' },
  { id: 'research', label: 'Research', icon: '🧠' },
  { id: 'reverie', label: 'Reverie', icon: '💤' },
]

export const DOCS = [
  // unsigned.gg Business Development
  {
    id: 'market-research-full',
    title: 'Market Research: Revenue Floor — Full Brief',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/01-market-research-full.md?raw'),
  },
  {
    id: 'market-research-short',
    title: 'Market Research: Revenue Floor — Executive Summary',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/02-market-research-short.md?raw'),
  },
  {
    id: 'term-sheet',
    title: 'Term Sheet: GTM-for-Equity Studio Deal',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/03-term-sheet.md?raw'),
  },
  {
    id: 'financial-model',
    title: 'Studio Financial Model v1',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/04-financial-model.md?raw'),
  },
  {
    id: 'mission-statement',
    title: 'Mission Statement',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/05-mission-statement.md?raw'),
  },
  {
    id: 'founder-intake-alex',
    title: 'Founder Intake: Alex — Cludcode.com',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/06-founder-intake-alex.md?raw'),
  },
  {
    id: 'brand-guide',
    title: 'Brand Guide v1.0',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/07-brand-guide.md?raw'),
  },
  {
    id: 'portfolio-scorecard',
    title: 'Portfolio Intake Scorecard v1',
    category: 'unsigned-gg',
    date: '2026-04-04',
    file: () => import('./content/08-portfolio-scorecard.md?raw'),
  },
  // Research
  {
    id: 'memory-system-rework',
    title: 'Research Inventory: Memory System Rework',
    category: 'research',
    date: '2026-04-04',
    file: () => import('./content/09-memory-system-rework.md?raw'),
  },
  // Reverie
  {
    id: 'hypothesis-v2-bipolar-ii',
    title: 'Hypothesis v2: Bipolar II as Emergent Phenomenon',
    category: 'reverie',
    date: '2026-04-06',
    file: () => import('./content/10-hypothesis-v2-bipolar-ii.md?raw'),
  },
  {
    id: 'neurochemistry-session',
    title: 'Neurochemistry, Medication Stack, Sleep Architecture',
    category: 'reverie',
    date: '2026-04-06',
    file: () => import('./content/11-neurochemistry-session.md?raw'),
  },
]
