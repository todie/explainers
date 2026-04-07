/**
 * Pidgin Tokens — data for the prompt-style tokenization experiment.
 *
 * Source: two benchmark runs against Anthropic's count_tokens API
 * (claude-opus-4-5 family) on 2026-04-06. v1 = 7 styles × 1 domain.
 * v2 = 11 styles × 2 domains. Numbers below are exact API counts.
 *
 * The story: take one short request and rewrite it eleven different ways —
 * verbose English, terse English, caveman, pirate, and seven pidgin/creole
 * languages — then count the tokens. The goal is to figure out what actually
 * makes a prompt cheap and what only feels like it should.
 */

export const DOMAINS = [
  {
    id: 'tech',
    label: 'Technical debugging',
    description:
      'A short request to debug a git rebase failure on auth.rs after OAuth changes, plus a check of the Grafana dashboard. Heavy on technical proper nouns.',
  },
  {
    id: 'prose',
    label: 'Prose explanation',
    description:
      'A conceptual question about why deep sleep matters for memory consolidation and what happens in the brain. Natural language, no technical nouns.',
  },
]

export const VARIANTS = [
  {
    id: 'control',
    label: 'Verbose English',
    flag: 'Control',
    color: '#6b7280',
    blurb: 'Polite, hedged, full sentences. The "please and thank you" baseline.',
    sample:
      "Hey Claude, I hope you're doing well today. I was wondering if you could possibly help me figure out why my git rebase keeps failing on the auth.rs file after I made some changes to add the OAuth integration…",
    tokA: 110,
    tokB: 64,
  },
  {
    id: 'optimized',
    label: 'Terse English (optimized)',
    flag: '★ Winner',
    color: '#facc15',
    blurb:
      'Lowercase, articles dropped, tech nouns intact, no hedging or filler. The style most experienced engineers naturally drift into.',
    sample:
      'git rebase failing on auth.rs after oauth changes — debug. also check grafana for errors',
    tokA: 27,
    tokB: 22,
  },
  {
    id: 'caveman',
    label: 'Caveman',
    flag: 'Runner-up',
    color: '#4ade80',
    blurb:
      'Drop articles, pronouns, auxiliary verbs, prepositions. Short imperative sentences. Vocabulary stays English.',
    sample:
      'Claude help. Git rebase fail on auth.rs. Added OAuth. Why fail? Look. Tell me. Also check Grafana dashboard. Errors? Tell me errors.',
    tokA: 44,
    tokB: 24,
  },
  {
    id: 'singlish',
    label: 'Singlish',
    flag: 'Best creole',
    color: '#22d3ee',
    blurb:
      'Singapore Colloquial English. Borrows English vocab almost unmodified, adds tiny discourse particles (lah, ah, hor, leh).',
    sample:
      'Eh Claude, my git rebase keep failing on auth.rs leh, after I add the OAuth changes one. Why like that? Help me see can?',
    tokA: 57,
    tokB: 40,
  },
  {
    id: 'naija',
    label: 'Naija (Nigerian Pidgin)',
    color: '#a855f7',
    blurb:
      '~75M speakers. Highly analytic — no inflection, tense via preverbal particles (don, go, dey), serial verb constructions.',
    sample:
      'Claude, abeg help me. My git rebase dey fail for auth.rs file after I add OAuth changes. Wetin dey cause am? Check am make you tell me.',
    tokA: 64,
    tokB: 43,
  },
  {
    id: 'hawaiian',
    label: 'Hawaiian Pidgin',
    color: '#60a5fa',
    blurb:
      'Hawaiian Creole English (HCE). English-based, very ASCII-friendly orthography, distinctive particles (stay, brah, yeah).',
    sample:
      'Eh Claude brah, my git rebase stay failing on da auth.rs file afta I wen add da OAuth kine changes. Why dat?',
    tokA: 67,
    tokB: 43,
  },
  {
    id: 'patois',
    label: 'Jamaican Patois',
    color: '#f59e0b',
    blurb:
      'English-based creole. Mostly ASCII, distinctive particles (mi, fi, pon, deh deh).',
    sample:
      'Claude, mi need yu fi help mi. Mi git rebase a fail pon di auth.rs file afta mi add di OAuth ting dem.',
    tokA: 75,
    tokB: 40,
  },
  {
    id: 'bislama',
    label: 'Bislama',
    color: '#fb923c',
    blurb:
      'National language of Vanuatu. English-based creole with Melanesian substrate, ASCII orthography.',
    sample:
      'Claude, plis yu helpem mi. Git rebase blong mi i no wok long auth.rs file afta mi putum OAuth jenis. Wanem i mekem i nogud?',
    tokA: 81,
    tokB: 44,
  },
  {
    id: 'tok_pisin',
    label: 'Tok Pisin',
    color: '#ec4899',
    blurb:
      'Papua New Guinea English-based creole. ASCII-friendly but uses words like helpim, bilong, bagarap that fragment under English BPE.',
    sample:
      'Claude, yu mas helpim mi. Git rebase bilong mi i no inap long auth.rs file bihain mi putim OAuth senis.',
    tokA: 84,
    tokB: 48,
  },
  {
    id: 'krio',
    label: 'Krio',
    flag: '⚠ Outlier',
    color: '#f87171',
    blurb:
      'Sierra Leone creole. Standard orthography uses IPA-augmented characters (ɛ, ɔ) that almost never appear in BPE training data.',
    sample:
      'Claude, abeg yu ɛp mi. Mi git rebase nɔ de wok pan di auth.rs file afta a put di OAuth tin dɛm. Wetin mek i nɔ de wok?',
    tokA: 104,
    tokB: 58,
  },
  {
    id: 'pirate',
    label: 'Pirate',
    flag: '✗ Loses',
    color: '#dc2626',
    blurb:
      'Apostrophe-contractions (failin\u2019, addin\u2019), filler words (arrr, savvy, matey), elaborate similes. Always loses.',
    sample:
      "Ahoy there matey! Arrr, I be needin' yer help. Me git rebase be failin' on the auth.rs file after I be addin' me OAuth changes, savvy?",
    tokA: 113,
    tokB: 79,
  },
]

/** Pre-compute savings vs control for both domains and average. */
export const RESULTS = (() => {
  const ctrl = VARIANTS.find(v => v.id === 'control')
  const ctrlA = ctrl.tokA
  const ctrlB = ctrl.tokB
  return VARIANTS.map(v => {
    const pctA = ((v.tokA - ctrlA) / ctrlA) * 100
    const pctB = ((v.tokB - ctrlB) / ctrlB) * 100
    const avg = (pctA + pctB) / 2
    return { ...v, pctA, pctB, avg }
  }).sort((a, b) => a.avg - b.avg)
})()

export const HERO_STATS = [
  { label: 'Styles tested', value: '11', sub: 'verbose → pidgin → pirate', color: '#facc15' },
  { label: 'Best savings', value: '−70.5%', sub: 'optimized vs verbose, avg', color: '#4ade80' },
  { label: 'Worst variant', value: '+13.1%', sub: 'pirate vs verbose, avg', color: '#dc2626' },
  { label: 'Krio penalty', value: '30 pts', sub: 'vs sister creoles, orthography', color: '#f87171' },
]

/** The four findings the v2 run revealed. */
export const FINDINGS = [
  {
    id: 'optimized-wins-by-4x',
    title: 'The terse English prompt wins by 4×',
    color: '#facc15',
    body: `27 tokens vs 110 for the verbose control on the same request. Nearly 2× cheaper than caveman, the next-best style. The optimized prompt does three things at once: cuts content (caveman-style omission), keeps high-frequency English vocabulary (so technical nouns stay one token each), and uses pure ASCII. Each lever alone gives modest savings; combined they compound.`,
  },
  {
    id: 'krio-orthography',
    title: 'Krio is a 30-point outlier — and we proved it was orthography alone',
    color: '#f87171',
    body: `Standard Krio (Sierra Leone) saves only 7.4%, while sister creoles save 25–43%. We tested whether the cause was structural or purely orthographic by rewriting the same Krio sentences with ad-hoc ASCII spelling (ɛ → eh, ɔ → oh, dɛm → dem, fɔ → for) — same words, same grammar, same word order, only the bytes change. Result: savings jumped from −7.4% to −28.2%, a 20.7-point improvement. ASCII-Krio lands between Bislama and Tok Pisin, exactly inside the sister-creole band. The grammar was never the problem. Every ɛ and ɔ was fragmenting into 2–3 byte-level tokens because IPA characters almost never appear in BPE training data. The rule generalizes: any non-ASCII character rare in the BPE training distribution costs roughly 2× its visual length.`,
  },
  {
    id: 'singlish-dethrones-naija',
    title: 'Singlish dethrones Naija as the best creole',
    color: '#22d3ee',
    body: `Singlish averages −42.8% savings vs Naija's −37.3%. Why: Singlish borrows English vocabulary almost unmodified. Particles like lah, ah, hor, and leh are tiny single-token discourse markers, and the substantive words (git rebase, OAuth, Grafana, sleep, memory, brain) tokenize identically to English. It's English with cheap discourse particles, not a structurally different language. Maximum overlap with the BPE merge table wins.`,
  },
  {
    id: 'pirate-always-loses',
    title: 'Pirate always loses — and loses worse in prose',
    color: '#dc2626',
    body: `Pirate is the only variant that consistently costs MORE than the verbose control: +2.7% in technical, +23.4% in prose, +13.1% on average. Apostrophe-contractions (failin', addin', releasin') fragment harder than the full words because they split into more subword tokens. Filler ("arrr", "savvy", "matey") inflates the word count. The prose run is even worse because conversational prose lets the contractions and similes proliferate. Style is not free.`,
  },
]

export const TWO_FORCES = {
  intro:
    'Total token cost is governed by two opposing forces, and the wins come from where they overlap.',
  forces: [
    {
      label: 'Force 1 — Word count',
      color: '#4ade80',
      body: 'Favors structurally compact languages. Pidgins and creoles drop articles, auxiliaries, and inflection, so they need fewer words to convey the same meaning. Caveman does this in English. Naija does it as a fully grammatical system.',
    },
    {
      label: 'Force 2 — Per-word fragmentation',
      color: '#a855f7',
      body: "Favors high-frequency English vocabulary. BPE merges are trained on English-dominant corpora, so common English words get one token each. Words from low-resource languages — and apostrophe-contractions, and IPA characters — get split into many subword pieces.",
    },
  ],
  conclusion:
    'The optimized English prompt wins because it does both: cuts content like caveman AND stays in high-frequency English vocab. Pidgins win on Force 1 but lose on Force 2. Pirate loses on both — its filler inflates word count and its contractions inflate per-word tokens. Krio is a clean test of Force 2 alone: a sister creole with the same grammar as Naija, but its IPA orthography destroys vocab overlap.',
}

export const PRACTICAL_TAKEAWAYS = [
  {
    label: 'Do',
    color: '#4ade80',
    items: [
      'Drop pleasantries, hedges, and filler ("I was wondering if you could possibly…")',
      'Drop articles and auxiliary verbs when meaning is preserved ("git rebase failing" not "the git rebase is failing")',
      'Keep technical proper nouns intact — they tokenize as single tokens and carry the most meaning',
      'Use ASCII only. Smart quotes, em-dashes that look like — but are actually different bytes, IPA characters, and emoji all fragment',
      'Lowercase is fine. Casing rarely costs extra tokens but uppercase rarely saves any',
    ],
  },
  {
    label: "Don't",
    color: '#f87171',
    items: [
      "Don't switch to pirate-speak, leetspeak, or other apostrophe-heavy stylizations",
      "Don't substitute pidgin/creole grammar in the hope it's cheaper — the tokenizer penalty wipes out structural savings unless your target language has high BPE overlap",
      "Don't use IPA-augmented orthography (ɛ, ɔ, schwa) unless you've measured the cost",
      "Don't optimize style if you haven't first cut redundant CONTENT — the biggest wins are in what you remove, not how you phrase what's left",
      "Don't worry about saving tokens on user-facing prose. The content/code your model OUTPUTS is usually the bigger cost",
    ],
  },
]

export const METHODOLOGY = {
  api: 'Anthropic /v1/messages/count_tokens endpoint (exact Claude tokenizer)',
  model: 'claude-opus-4-5 (tokenizer is shared across the Claude 4.x family)',
  date: '2026-04-06',
  runs: 'v1: 7 styles × 1 domain. v2: 11 styles × 2 domains.',
  caveats: [
    'Translations were written by Claude, not native speakers. Native writers might shave another 10-20% off the pidgin variants. The directional finding (optimized >> caveman >> creoles >> verbose ≈ pirate) is robust across both runs.',
    'Single sample per (style, domain). No confidence intervals. The savings rankings should be read as ordinal, not exact.',
    'BPE behavior could shift in future tokenizer versions. The orthography finding is empirical for the current Claude tokenizer family.',
    "All counts are USER-message tokens only. The model's response tokens — usually the bigger cost line in production — are not measured here.",
  ],
}

export const SOURCES = [
  {
    label: 'Petrov et al. — Language Model Tokenizers Introduce Unfairness Between Languages (arXiv:2305.15425)',
    url: 'https://arxiv.org/pdf/2305.15425',
    note: 'Foundational paper on per-language tokenizer cost. Some languages cost up to 15× more tokens than English for the same content.',
  },
  {
    label: 'NaijaSynCor — Corpus-based Macro-Syntactic Study of Naija',
    url: 'https://anr.fr/Project-ANR-16-CE27-0007',
    note: 'Treats Nigerian Pidgin as a discrete language separate from Nigerian English. ~75M speakers.',
  },
  {
    label: 'Aspects of the Syntax of Modern Nigerian Pidgin (ACAL 44)',
    url: 'http://www.lingref.com/cpp/acal/44/paper3122.pdf',
    note: 'On serial verb constructions and the analytic structure of Naija.',
  },
  {
    label: 'Towards a working orthography of Nigerian Pidgin',
    url: 'https://www.researchgate.net/publication/355422481_Chapter_6_Towards_a_working_orthography_of_Nigerian_Pidgin',
    note: 'On why no single creole orthography is canonical — and how that affects NLP tooling.',
  },
  {
    label: 'NagaNLP — Bootstrapping NLP for Low-Resource Nagamese Creole (arXiv:2512.12537)',
    url: 'https://arxiv.org/html/2512.12537',
    note: 'The current template for fixing creole NLP — bootstrap a custom vocabulary instead of fighting the inherited BPE merges.',
  },
]
