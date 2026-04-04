/**
 * Context Windows & LLM Performance — Research Foundation
 *
 * Structured data for an explainer website on how context windows work,
 * why they matter, and the CS/ML research behind them.
 *
 * Sources gathered April 2026 from Semantic Scholar, arXiv, Google Scholar,
 * and primary publications. Citation counts are approximate and reflect
 * values at time of collection.
 */

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────















// ─────────────────────────────────────────────
// Papers (sorted roughly by influence/citation)
// ─────────────────────────────────────────────

export const PAPERS = [
  // ── Foundational ──────────────────────────
  {
    id: "vaswani-2017",
    title: "Attention Is All You Need",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    year: 2017,
    venue: "NeurIPS 2017",
    arxivId: "1706.03762",
    citationCount: 173000,
    citationNote: "Top-10 most cited paper of the 21st century",
    category: "foundational",
    tags: ["transformer", "self-attention", "architecture"],
    summary:
      "Introduced the Transformer architecture, replacing recurrence and convolutions entirely with self-attention mechanisms. The encoder-decoder model with multi-head attention became the foundation for all modern LLMs.",
    keyFinding:
      "Self-attention over the full input sequence allows each token to attend to every other token, enabling parallel processing and capturing long-range dependencies — but at O(n^2) cost in sequence length.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    id: "bahdanau-2014",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Bahdanau, Cho, Bengio",
    year: 2014,
    venue: "ICLR 2015",
    arxivId: "1409.0473",
    citationCount: 45000,
    citationNote: "Introduced the attention mechanism that transformers later generalized",
    category: "foundational",
    tags: ["attention", "sequence-to-sequence", "alignment"],
    summary:
      "Proposed the attention mechanism for neural machine translation, allowing the decoder to selectively focus on different parts of the input sequence rather than compressing everything into a fixed-length vector.",
    keyFinding:
      "Encoding a variable-length input into a fixed-length vector causes severe information loss as input length grows. Attention solves this by letting the model dynamically attend to relevant input positions.",
    url: "https://arxiv.org/abs/1409.0473",
  },

  // ── Reasoning & Context Use ───────────────
  {
    id: "wei-2022",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei, Wang, Schuurmans, Bosma, Ichter, Xia, Chi, Le, Zhou",
    year: 2022,
    venue: "NeurIPS 2022",
    arxivId: "2201.11903",
    citationCount: 12000,
    citationNote: "Foundational paper for reasoning-in-context approaches",
    category: "reasoning",
    tags: ["chain-of-thought", "reasoning", "prompting", "in-context-learning"],
    summary:
      "Demonstrated that providing a few examples of step-by-step reasoning (chain-of-thought) in the prompt dramatically improves LLM performance on arithmetic, commonsense, and symbolic reasoning tasks.",
    keyFinding:
      "Context window space used for intermediate reasoning steps is not wasted — it is the mechanism by which LLMs perform multi-step reasoning. Larger models benefit more, suggesting reasoning is an emergent capability enabled by sufficient context.",
    url: "https://arxiv.org/abs/2201.11903",
  },

  // ── Position Bias & Context Usage ─────────
  {
    id: "liu-2023",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    authors: "Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni, Liang",
    year: 2023,
    venue: "TACL 2024 (vol. 12, pp. 157-173)",
    arxivId: "2307.03172",
    citationCount: 2576,
    category: "position-bias",
    tags: ["position-bias", "long-context", "U-shaped", "primacy", "recency"],
    summary:
      "Showed that LLM performance on multi-document QA follows a U-shaped curve: models perform best when relevant information is at the very beginning or end of the context, but degrade significantly when it is in the middle.",
    keyFinding:
      "Even models with 16k+ context windows do not use that context uniformly. Primacy bias (favoring early tokens) and recency bias (favoring late tokens) create a 'dead zone' in the middle of the context, with 30%+ accuracy drops for middle-positioned information.",
    url: "https://arxiv.org/abs/2307.03172",
  },

  // ── Retrieval-Augmented Generation ────────
  {
    id: "lewis-2020",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Lewis, Perez, Piktus, Petroni, Karpukhin, Goyal, Kuttler, Lewis, Yih, Rocktaschel, Riedel, Kiela",
    year: 2020,
    venue: "NeurIPS 2020",
    arxivId: "2005.11401",
    citationCount: 5000,
    citationNote: "Coined 'RAG' — now an industry-standard architecture pattern",
    category: "retrieval",
    tags: ["RAG", "retrieval", "knowledge-grounding", "factuality"],
    summary:
      "Proposed combining a pre-trained parametric model (generator) with a non-parametric memory (dense retrieval index over Wikipedia) to improve factual accuracy on knowledge-intensive tasks like open-domain QA.",
    keyFinding:
      "Rather than fitting all knowledge into model parameters or the context window, RAG retrieves relevant documents at inference time and conditions generation on them. This decouples world knowledge from the model's parameters, enabling updates without retraining.",
    url: "https://arxiv.org/abs/2005.11401",
  },
  {
    id: "jin-2025",
    title: "Long-Context LLMs Meet RAG: Overcoming Challenges for Long Inputs in RAG",
    authors: "Jin, Yoon, Han, Arik",
    year: 2025,
    venue: "ICLR 2025",
    arxivId: "2410.05983",
    category: "retrieval",
    tags: ["RAG", "long-context", "hard-negatives", "retrieval-ordering"],
    summary:
      "Systematically compared long-context LLMs with RAG pipelines and found that RAG quality initially improves as more documents are retrieved, but then declines due to 'hard negatives' — retrieved passages that are topically similar but factually irrelevant.",
    keyFinding:
      "The strength of the retriever correlates with difficulty of hard negatives: stronger retrievers surface more plausible-but-wrong passages that mislead the generator. Document reordering (placing high-score docs at start/end) is a simple, effective training-free mitigation.",
    url: "https://arxiv.org/abs/2410.05983",
  },

  // ── Efficiency & Hardware ─────────────────
  {
    id: "dao-2022",
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    authors: "Dao, Fu, Ermon, Rudra, Re",
    year: 2022,
    venue: "NeurIPS 2022",
    arxivId: "2205.14135",
    citationCount: 3828,
    category: "efficiency",
    tags: ["flash-attention", "IO-aware", "GPU-optimization", "tiling"],
    summary:
      "Rather than reducing attention's computational complexity, FlashAttention exploits GPU memory hierarchy — tiling the attention computation to minimize reads/writes between HBM and SRAM — achieving 2-4x speedups and linear memory scaling.",
    keyFinding:
      "The attention bottleneck in practice is memory bandwidth, not FLOPs. By making attention IO-aware, exact (not approximate) attention runs faster than previous optimized implementations while using O(n) instead of O(n^2) memory. Now a standard component in virtually all LLM training and inference stacks.",
    url: "https://arxiv.org/abs/2205.14135",
  },

  // ── Context Extension ─────────────────────
  {
    id: "su-2021",
    title: "RoFormer: Enhanced Transformer with Rotary Position Embedding",
    authors: "Su, Lu, Pan, Murtadha, Wen, Liu",
    year: 2021,
    venue: "Neurocomputing 2024 (vol. 568)",
    arxivId: "2104.09864",
    citationCount: 2100,
    category: "context-scaling",
    tags: ["RoPE", "position-encoding", "rotary-embeddings"],
    summary:
      "Introduced Rotary Position Embedding (RoPE), encoding absolute position via rotation matrices while naturally incorporating relative position information into self-attention. RoPE became the position encoding used by LLaMA, Mistral, and most open-source LLMs.",
    keyFinding:
      "By encoding positions as rotations in embedding space, RoPE enables graceful degradation when extrapolating beyond training-length sequences — a critical property that later work (YaRN, LongRoPE) exploits to extend context windows 4-32x beyond training length.",
    url: "https://arxiv.org/abs/2104.09864",
  },
  {
    id: "peng-2023",
    title: "YaRN: Efficient Context Window Extension of Large Language Models",
    authors: "Peng, Quesnelle, Fan, Shippole",
    year: 2023,
    venue: "ICLR 2024",
    arxivId: "2309.00071",
    category: "context-scaling",
    tags: ["YaRN", "RoPE-extension", "context-scaling", "NTK"],
    summary:
      "Extended RoPE-based context windows efficiently by dividing frequency dimensions into three groups and applying different interpolation strategies to each. Requires 10x fewer tokens and 2.5x fewer training steps than prior methods to achieve reliable context extension.",
    keyFinding:
      "Not all position embedding dimensions carry the same information. High-frequency dimensions encode local position (do not interpolate), while low-frequency dimensions encode global position (interpolate aggressively). This insight makes context extension practical with minimal fine-tuning compute.",
    url: "https://arxiv.org/abs/2309.00071",
  },

  // ── Benchmarks ────────────────────────────
  {
    id: "hsieh-2024",
    title: "RULER: What's the Real Context Size of Your Long-Context Language Models?",
    authors: "Hsieh, Sun, Kriman, Acharya, Rekesh, Jia, Zhang, Ginsburg",
    year: 2024,
    venue: "COLM 2024",
    arxivId: "2404.06654",
    category: "benchmarks",
    tags: ["benchmark", "RULER", "NIAH", "long-context-evaluation"],
    summary:
      "Proposed RULER, a synthetic benchmark with diverse tasks (multi-key NIAH, variable tracking, aggregation, QA) across 4K-128K context lengths. Tested 17 long-context models and found that nearly all degrade substantially beyond their claimed effective context sizes.",
    keyFinding:
      "Models that score perfectly on simple Needle-in-a-Haystack fail dramatically on more complex retrieval and reasoning tasks at the same context lengths. NIAH alone is insufficient to evaluate real-world long-context capability — the 'advertised' context window is almost always larger than the 'effective' one.",
    url: "https://arxiv.org/abs/2404.06654",
  },
  {
    id: "kamradt-2023",
    title: "Needle in a Haystack — Pressure Testing LLMs",
    authors: "Greg Kamradt",
    year: 2023,
    venue: "Independent evaluation (GitHub / X)",
    category: "benchmarks",
    tags: ["NIAH", "evaluation", "retrieval", "context-length"],
    summary:
      "Created the original Needle-in-a-Haystack evaluation: embed a random fact at various depths within long contexts and test whether the model can retrieve it. The first systematic visualization of how LLM recall degrades with context length and needle position.",
    keyFinding:
      "Produced the now-iconic heatmap visualizations showing recall accuracy vs. context depth and length. Revealed that GPT-4-128k and Claude-2.1-200k both had significant blind spots, sparking the 'lost in the middle' research thread and becoming a standard evaluation for every new long-context model release.",
    url: "https://github.com/gkamradt/LLMTest_NeedleInAHaystack",
  },
  {
    id: "bai-2023",
    title: "LongBench: A Bilingual, Multitask Benchmark for Long Context Understanding",
    authors: "Bai, Lv, Zhang, Lyu, Tang, Huang, Du, Liu, Zheng, Zhang, Lei, ..., Wen",
    year: 2023,
    venue: "ACL 2024",
    arxivId: "2308.14508",
    category: "benchmarks",
    tags: ["benchmark", "long-context", "multitask", "bilingual"],
    summary:
      "The first bilingual, multi-task benchmark for long context understanding, comprising 21 datasets across 6 task categories (single/multi-doc QA, summarization, few-shot learning, synthetic tasks, code) in English and Chinese, with average context lengths of 6,711 words.",
    keyFinding:
      "Performance degrades consistently across all model families as context grows, but the rate of degradation varies dramatically by task type. Summarization tasks are more robust to long context than retrieval-style QA, suggesting models handle 'gist extraction' better than 'needle finding.'",
    url: "https://arxiv.org/abs/2308.14508",
  },

  // ── Context Degradation ───────────────────
  {
    id: "chroma-2025",
    title: "Context Rot: How Increasing Input Tokens Impacts LLM Performance",
    authors: "Chroma Research (Nussbaum et al.)",
    year: 2025,
    venue: "Technical Report",
    category: "position-bias",
    tags: ["context-rot", "degradation", "distractors", "attention-dilution"],
    summary:
      "Evaluated 18 state-of-the-art models (GPT-4.1, Claude, Gemini 2.5, Qwen3) and identified three compounding mechanisms of context degradation: lost-in-the-middle effect (30%+ accuracy drops), attention dilution (quadratic spreading), and distractor interference (semantically similar irrelevant content actively misleads).",
    keyFinding:
      "Context rot is not just about length — it is about the interaction between length, needle-question similarity, distractor presence, and haystack structure. Models that score well on NIAH can still fail catastrophically when distractors are semantically close to the target, with 719% latency increase at 15k words of irrelevant context for the 70B model.",
    url: "https://research.trychroma.com/context-rot",
  },
  {
    id: "shi-2023",
    title: "Large Language Models Can Be Easily Distracted by Irrelevant Context",
    authors: "Shi, Chen, Misra, Scales, Dohan, Chi, Schaarschmidt, Zhou",
    year: 2023,
    venue: "ICML 2023",
    arxivId: "2302.00093",
    category: "position-bias",
    tags: ["distraction", "irrelevant-context", "reasoning-degradation"],
    summary:
      "Demonstrated that adding irrelevant information to math word problems causes significant performance drops across all prompting techniques, with fewer than 30% of base problems consistently solved when distractors are present.",
    keyFinding:
      "Context pollution is a fundamental challenge, not an edge case. Irrelevant information does not just waste tokens — it actively interferes with reasoning by expanding the search space and reducing the signal-to-noise ratio in the attention distribution.",
    url: "https://arxiv.org/abs/2302.00093",
  },

  // ── Compression ───────────────────────────
  {
    id: "mu-2023",
    title: "Learning to Compress Prompts with Gist Tokens",
    authors: "Mu, Li, Goodman",
    year: 2023,
    venue: "NeurIPS 2023",
    arxivId: "2304.08467",
    category: "compression",
    tags: ["gist-tokens", "prompt-compression", "caching"],
    summary:
      "Trained language models to compress prompts into a small set of 'gist' tokens by modifying Transformer attention masks during instruction fine-tuning, achieving up to 26x prompt compression with minimal quality loss.",
    keyFinding:
      "System prompts and repeated instructions can be distilled into a handful of learned tokens that are cached and reused, delivering 40% FLOP reductions and 4.2% wall time speedups. This enables treating common context as 'compiled' rather than re-encoded every call.",
    url: "https://arxiv.org/abs/2304.08467",
  },
  {
    id: "jiang-2023",
    title: "LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models",
    authors: "Jiang, Wu, Lin, Yang, Qiu",
    year: 2023,
    venue: "EMNLP 2023",
    arxivId: "2310.05736",
    category: "compression",
    tags: ["prompt-compression", "token-pruning", "inference-acceleration"],
    summary:
      "Uses a small, well-trained language model (GPT-2 or LLaMA-7B) to identify and remove non-essential tokens from prompts via a coarse-to-fine compression pipeline, achieving up to 20x compression with minimal performance loss on reasoning and QA tasks.",
    keyFinding:
      "Not all tokens in a prompt carry equal information. A budget controller allocates compression ratios across prompt sections while preserving semantic integrity, and iterative token-level compression models interdependencies between remaining tokens.",
    url: "https://arxiv.org/abs/2310.05736",
  },
  {
    id: "rae-2020",
    title: "Compressive Transformers for Long-Range Sequence Modelling",
    authors: "Rae, Potapenko, Jayakumar, Lillicrap",
    year: 2020,
    venue: "ICLR 2020",
    arxivId: "1911.05507",
    category: "compression",
    tags: ["compressive-memory", "long-range", "memory-hierarchy"],
    summary:
      "Extended Transformer-XL with a compressive memory that stores older activations in a compressed form, creating a two-tier memory hierarchy: fine-grained recent memory and coarser compressed older memory.",
    keyFinding:
      "The model achieves state-of-the-art language modeling while attending over much longer effective histories. This architecture presaged the 'memory hierarchy' concept now common in LLM agent frameworks where recent context is detailed and older context is summarized.",
    url: "https://arxiv.org/abs/1911.05507",
  },

  // ── Memory Augmentation ───────────────────
  {
    id: "packer-2023",
    title: "MemGPT: Towards LLMs as Operating Systems",
    authors: "Packer, Fang, Wooders, Lin, Patil, Stoica, Gonzalez",
    year: 2023,
    venue: "Preprint (arXiv)",
    arxivId: "2310.08560",
    citationCount: 287,
    category: "memory-augmentation",
    tags: ["virtual-context", "memory-hierarchy", "OS-analogy", "paging"],
    summary:
      "Draws an analogy between LLM context management and OS virtual memory. MemGPT uses a tiered memory system (main context, recall storage, archival storage) with LLM-controlled 'page faults' that move information in and out of the finite context window on demand.",
    keyFinding:
      "When the LLM itself decides what to page in/out of context, it can maintain coherent multi-session conversations and analyze documents far exceeding its native context window. The OS memory hierarchy — with its concepts of working memory, paging, and caching — is a productive mental model for LLM context management.",
    url: "https://arxiv.org/abs/2310.08560",
  },
  {
    id: "park-2023",
    title: "Generative Agents: Interactive Simulacra of Human Behavior",
    authors: "Park, O'Brien, Cai, Morris, Liang, Bernstein",
    year: 2023,
    venue: "UIST 2023 (ACM)",
    arxivId: "2304.03442",
    citationCount: 3003,
    category: "memory-augmentation",
    tags: ["generative-agents", "episodic-memory", "reflection", "planning"],
    summary:
      "Created believable AI agents with a memory architecture comprising a memory stream (episodic log), retrieval mechanism (recency + importance + relevance), and reflection module that synthesizes higher-level observations from raw memories.",
    keyFinding:
      "Three-layer memory (observe, retrieve, reflect) enables emergent social behavior — agents autonomously organize parties, form relationships, and coordinate — from a single seed prompt. This demonstrated that structured memory external to the context window can substitute for impossibly long context.",
    url: "https://arxiv.org/abs/2304.03442",
  },

  // ── RAG Performance Studies ───────────────
  {
    id: "databricks-2024",
    title: "Long Context RAG Performance of LLMs",
    authors: "Databricks Mosaic Research",
    year: 2024,
    venue: "Technical Report / Blog",
    category: "retrieval",
    tags: ["RAG", "long-context", "benchmark", "performance-plateau"],
    summary:
      "Tested 20 open-source and commercial LLMs on RAG workflows varying context from 2K to 128K tokens across three domain-specific datasets. Found that most models hit peak RAG performance between 16K-32K tokens, after which accuracy declines.",
    keyFinding:
      "Llama-3.1-405B peaks at 32K tokens then degrades; GPT-4-0125 peaks at 64K. Only frontier models (o1, Gemini 1.5 Pro) showed monotonic improvement across the full range. This means 'supports 128K context' does not mean '128K of useful context.'",
    url: "https://www.databricks.com/blog/long-context-rag-performance-llms",
  },
];

// ─────────────────────────────────────────────
// Concepts
// ─────────────────────────────────────────────

export const CONCEPTS = [
  {
    id: "context-window",
    title: "Context Window",
    category: "architecture",
    explanation:
      "The fixed-size buffer of tokens that an LLM can process in a single forward pass. Every token in the window — system prompt, conversation history, retrieved documents, user query, and the model's own output — competes for the same limited space. The window size is determined at training time by the model's position encoding scheme and the compute invested in training on long sequences.",
    relevance:
      "The context window is the fundamental constraint of all LLM-based systems. Everything an LLM 'knows' during inference must either be encoded in its parameters (training) or present in its context window (inference). This makes context engineering — deciding what goes in and what stays out — a critical design discipline.",
    relatedPaperIds: ["vaswani-2017", "liu-2023", "hsieh-2024"],
  },
  {
    id: "self-attention",
    title: "Self-Attention (Scaled Dot-Product)",
    category: "architecture",
    explanation:
      "The core operation of the Transformer: each token computes attention scores against all other tokens in the sequence, producing a weighted sum of their value vectors. The 'self' means the query, key, and value all come from the same sequence. Multi-head attention runs this in parallel across multiple representation subspaces.",
    relevance:
      "Self-attention is why context windows are powerful (every token can attend to every other token) and why they are expensive (the attention matrix is n*n, making compute and memory scale quadratically with sequence length). Every advance in long-context models is fundamentally about taming this quadratic cost.",
    relatedPaperIds: ["vaswani-2017", "bahdanau-2014", "dao-2022"],
  },
  {
    id: "quadratic-complexity",
    title: "Quadratic Attention Complexity",
    category: "tradeoffs",
    explanation:
      "In standard Transformers, self-attention requires computing and storing an n*n attention matrix where n is the sequence length. Doubling the context window quadruples the compute and memory needed for attention. At 128K tokens, the attention matrix alone has ~16 billion entries per layer per head.",
    relevance:
      "This is the fundamental reason context windows have limits. FlashAttention addresses the memory problem (via IO-aware tiling) without changing the O(n^2) compute. True subquadratic approaches (linear attention, state-space models like Mamba) trade expressiveness for efficiency, but standard dense attention remains dominant for quality.",
    relatedPaperIds: ["vaswani-2017", "dao-2022"],
  },
  {
    id: "position-encoding",
    title: "Position Encoding (RoPE, ALiBi)",
    category: "architecture",
    explanation:
      "Transformers have no inherent notion of sequence order — position encodings inject this information. Rotary Position Embeddings (RoPE) encode positions as rotations in the embedding space, naturally capturing relative distances. ALiBi adds a linear bias to attention scores based on token distance. Both enable context extension beyond training length.",
    relevance:
      "The choice of position encoding determines how well a model generalizes to longer sequences than it was trained on. RoPE's rotational structure makes it amenable to interpolation tricks (YaRN, LongRoPE) that extend context 4-32x with minimal fine-tuning, which is how most open-source models achieve 128K+ context.",
    relatedPaperIds: ["su-2021", "peng-2023"],
  },
  {
    id: "lost-in-the-middle",
    title: "Lost in the Middle (U-Shaped Attention)",
    category: "performance",
    explanation:
      "LLMs attend unevenly to their context: information at the beginning (primacy) and end (recency) of the window is recalled far more reliably than information in the middle. Performance follows a U-shaped curve when relevant information is placed at varying depths. The effect is strongest when inputs occupy up to 50% of the context window; beyond that, recency bias dominates.",
    relevance:
      "This means that naively stuffing the context window full of documents does not guarantee the model will use them all. Practitioners must consider document ordering — placing the most important information at the start and end — and understand that the 'effective context' is smaller than the 'nominal context.'",
    relatedPaperIds: ["liu-2023", "chroma-2025", "jin-2025"],
  },
  {
    id: "context-rot",
    title: "Context Rot / Context Pollution",
    category: "performance",
    explanation:
      "The measurable degradation in LLM output quality as context length increases, even when the added content is not adversarial. Three mechanisms compound: attention dilution (each token gets a thinner slice of the attention budget), distractor interference (semantically similar but irrelevant content misleads reasoning), and the lost-in-the-middle effect.",
    relevance:
      "More context is not always better. There is a performance plateau and often a decline beyond a model-specific optimal context length (16K-64K for most current models). Context engineering must maximize signal-to-noise ratio, not just total tokens.",
    relatedPaperIds: ["chroma-2025", "shi-2023", "liu-2023", "databricks-2024"],
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    category: "memory",
    explanation:
      "An architecture pattern that decouples knowledge from model parameters by retrieving relevant documents from an external index at inference time and injecting them into the context window. The generator (LLM) conditions its output on both the query and the retrieved passages. This avoids fine-tuning for factual updates and keeps the model grounded in source material.",
    relevance:
      "RAG is the dominant pattern for production LLM applications that need current, verifiable information. It trades context window space for access to effectively unlimited external knowledge, but introduces new failure modes: retriever quality, hard negatives, and the need to rank and order retrieved passages carefully.",
    relatedPaperIds: ["lewis-2020", "jin-2025", "databricks-2024"],
  },
  {
    id: "chain-of-thought",
    title: "Chain-of-Thought Reasoning",
    category: "performance",
    explanation:
      "A prompting technique where the model generates intermediate reasoning steps before arriving at a final answer. The key insight is that the context window serves double duty: it holds both the problem description AND the model's own working memory for multi-step reasoning. Each reasoning step becomes context for the next.",
    relevance:
      "Context window space is not just for input — it is the substrate for computation. Chain-of-thought converts context tokens into 'scratch space' for reasoning, which is why larger context windows enable more complex reasoning chains. This is also why reasoning-heavy tasks require careful token budgeting.",
    relatedPaperIds: ["wei-2022"],
  },
  {
    id: "effective-vs-nominal-context",
    title: "Effective vs. Nominal Context Length",
    category: "evaluation",
    explanation:
      "A model's 'nominal' context window (e.g., 128K tokens) is the maximum it can technically accept. The 'effective' context is the length at which it maintains acceptable performance on real tasks. RULER benchmarks show these can differ by 2-4x — a model with 128K nominal context may only be effective to 32K-64K on complex tasks.",
    relevance:
      "Marketing claims about context window size are misleading without specifying the task. Simple retrieval (NIAH) works at longer contexts than multi-hop reasoning or aggregation. Engineers should test their specific use case at their target context length, not trust the headline number.",
    relatedPaperIds: ["hsieh-2024", "kamradt-2023", "bai-2023"],
  },
  {
    id: "flash-attention",
    title: "FlashAttention (IO-Aware Attention)",
    category: "architecture",
    explanation:
      "An exact attention algorithm that restructures the computation to minimize data movement between GPU HBM (slow, large) and SRAM (fast, small). By tiling the attention matrix and fusing operations, it avoids materializing the full n*n matrix in memory, reducing memory usage from O(n^2) to O(n) while producing bit-identical results to standard attention.",
    relevance:
      "FlashAttention is why modern models can practically operate at 128K+ context lengths. Before it, the memory wall made long-context training and inference prohibitively expensive. It is now a standard component in virtually every LLM training and serving stack (PyTorch, vLLM, TensorRT-LLM).",
    relatedPaperIds: ["dao-2022"],
  },
  {
    id: "memory-hierarchy",
    title: "Memory Hierarchy for LLMs",
    category: "memory",
    explanation:
      "Borrowing from operating systems and cognitive science, modern LLM agent architectures use tiered memory: the context window as 'working memory' (fast, limited), vector databases or retrieval indices as 'long-term memory' (slower, unlimited), and summarization as the 'compression' that moves information between tiers.",
    relevance:
      "No single context window can hold everything an agent needs across a long session or multi-session workflow. The design question is not 'how big should the context be' but 'what should be in the context right now, and where does everything else live?' This is the core problem that MemGPT, RAG, and engram-style systems solve.",
    relatedPaperIds: ["packer-2023", "park-2023", "rae-2020", "lewis-2020"],
  },
  {
    id: "episodic-vs-semantic-memory",
    title: "Episodic vs. Semantic Memory in AI",
    category: "memory",
    explanation:
      "Borrowed from cognitive neuroscience: episodic memory records specific experiences with temporal context ('what happened in this conversation'), while semantic memory stores general knowledge and facts ('Python uses indentation for blocks'). In LLM agents, episodic memory is typically a log of interactions, and semantic memory is distilled knowledge indexed by topic.",
    relevance:
      "Effective memory-augmented agents need both types. Pure episodic memory (full conversation logs) is accurate but wastes tokens on irrelevant details. Pure semantic memory (distilled facts) loses temporal context. The best systems consolidate episodic memory into semantic assets over time — analogous to how human memory works during sleep.",
    relatedPaperIds: ["park-2023", "packer-2023"],
  },
];

// ─────────────────────────────────────────────
// Key Tradeoffs
// ─────────────────────────────────────────────

export const TRADEOFFS = [
  {
    id: "more-context-diminishing-returns",
    title: "More Context = Better Performance (to a Point)",
    description:
      "Adding relevant context generally improves LLM performance, but returns diminish and eventually reverse. Most models peak between 16K-64K tokens, after which accuracy on retrieval and reasoning tasks declines due to attention dilution and distractor effects.",
    upside: "More retrieved documents, longer conversation history, and richer system prompts all help — up to the model's effective context ceiling.",
    downside: "Beyond the sweet spot, each additional token slightly degrades attention to all other tokens. Performance on 'needle' tasks drops 10-30% between optimal and maximum context lengths.",
    evidence: "Databricks (2024): Llama-3.1-405B peaks at 32K, GPT-4 at 64K. Chroma (2025): all 18 tested models show measurable degradation patterns.",
    relatedPaperIds: ["databricks-2024", "chroma-2025", "hsieh-2024"],
  },
  {
    id: "quadratic-cost",
    title: "Attention Complexity: O(n^2) Scaling",
    description:
      "Self-attention compute and memory scale quadratically with sequence length. A 128K context requires 16x the attention compute of a 32K context. FlashAttention mitigates the memory problem but not the compute cost.",
    upside: "Dense attention lets every token attend to every other token, preserving full expressiveness and enabling arbitrary long-range dependencies.",
    downside: "Doubling context roughly quadruples cost. At current prices, a 128K context API call costs ~16x a 32K one in attention compute, though linear layers amortize this somewhat.",
    evidence: "FlashAttention (Dao, 2022) reduces memory to O(n) but compute remains O(n^2). Linear attention variants trade accuracy for speed.",
    relatedPaperIds: ["vaswani-2017", "dao-2022"],
  },
  {
    id: "context-pollution",
    title: "Context Pollution / Distraction",
    description:
      "Irrelevant information in the context does not just waste tokens — it actively degrades performance. Semantically similar distractors are worse than random noise because they attract attention away from the actual target.",
    upside: "When context is curated (high signal-to-noise), models achieve near-perfect performance even at moderate context lengths.",
    downside: "Adding 10 irrelevant-but-topically-similar documents to a RAG context can drop accuracy by 30%+ and increase latency by 7x on large models.",
    evidence: "Shi et al. (2023): <30% consistent accuracy with distractors in math. Chroma (2025): 719% latency increase with 15K words of irrelevant context.",
    relatedPaperIds: ["shi-2023", "chroma-2025", "jin-2025"],
  },
  {
    id: "cost-scaling",
    title: "Token Cost Scaling (Tokens = Money)",
    description:
      "API pricing is per-token. Longer contexts cost linearly in token count but often more-than-linearly in wall-clock time and compute due to quadratic attention. Prompt caching and compression can reduce costs significantly.",
    upside: "Paying for more context is often cheaper than fine-tuning, maintaining separate models, or building complex retrieval pipelines.",
    downside: "A 128K-token prompt at $3/M input tokens costs $0.38 per call. At 1000 calls/day, that is $380/day just for input tokens. Prompt compression (LLMLingua, gisting) can reduce this 5-20x.",
    evidence: "Mu et al. (2023): Gist tokens achieve 26x compression. LLMLingua (Jiang, 2023): 20x compression with minimal loss.",
    relatedPaperIds: ["mu-2023", "jiang-2023"],
  },
  {
    id: "position-bias",
    title: "Primacy, Recency, and Position Effects",
    description:
      "LLMs do not process their context uniformly. Information at the start and end of the window receives disproportionate attention (U-shaped recall curve). As context fills up (>50% of window), primacy weakens and recency dominates.",
    upside: "Knowing the bias enables mitigation: place critical information at the start and end, reorder retrieved documents by relevance at boundaries.",
    downside: "Information in the middle 40-60% of context is significantly less likely to influence the output, creating a reliability gap that is hard to detect in testing.",
    evidence: "Liu et al. (2023): U-shaped performance curve with 30%+ middle-position accuracy drop. Confirmed across GPT-4, Claude, and open-source models.",
    relatedPaperIds: ["liu-2023", "chroma-2025"],
  },
  {
    id: "rag-vs-long-context",
    title: "RAG vs. Long Context vs. Fine-Tuning",
    description:
      "Three competing approaches to give LLMs access to external knowledge: stuff it in the context window (long context), retrieve it dynamically (RAG), or bake it into weights (fine-tuning). Each has a distinct cost/quality/flexibility profile.",
    upside: "Long context is simplest; RAG is most flexible and updatable; fine-tuning gives the deepest domain adaptation.",
    downside: "Long context is expensive and degrades with noise; RAG requires retrieval infrastructure and suffers from hard negatives; fine-tuning is expensive, inflexible, and can cause catastrophic forgetting.",
    evidence: "Jin et al. (ICLR 2025): RAG + long context is complementary, not competitive. Databricks (2024): hybrid approaches outperform either alone.",
    relatedPaperIds: ["lewis-2020", "jin-2025", "databricks-2024"],
  },
];

// ─────────────────────────────────────────────
// Domain Impacts
// ─────────────────────────────────────────────

export const DOMAIN_IMPACTS = [
  {
    id: "code-generation",
    domain: "Code Generation",
    icon: "code",
    summary:
      "Code generation benefits enormously from context: type definitions, adjacent files, test cases, error messages, and the full dependency graph all inform better completions. Repository-level benchmarks (SWE-bench, RepoBench, LongCodeBench) test whether models can navigate real codebases spanning thousands of lines.",
    keyInsight:
      "LongCodeBench (2025) evaluates coding at 1M-token contexts. SWE-bench requires models to read entire repos to generate correct patches. The key finding: code quality correlates strongly with how much relevant context the model has, but irrelevant files from the same repo can degrade patch quality — making retrieval/context selection critical.",
    relatedPaperIds: ["bai-2023", "hsieh-2024"],
  },
  {
    id: "reasoning",
    domain: "Multi-Step Reasoning",
    icon: "brain",
    summary:
      "Chain-of-thought and related techniques use context window space as working memory for intermediate reasoning steps. The context window is not just input storage — it is the compute substrate for multi-step inference. Longer chains enable more complex reasoning but consume tokens that could hold problem context.",
    keyInsight:
      "There is a fundamental tension: using context for reasoning steps vs. using it for problem information. Models with larger context windows can hold both longer problem descriptions AND longer reasoning chains, which is why reasoning benchmarks (GSM8K, MATH) correlate with effective context length.",
    relatedPaperIds: ["wei-2022", "shi-2023"],
  },
  {
    id: "retrieval-qa",
    domain: "Retrieval & Question Answering",
    icon: "search",
    summary:
      "For knowledge-intensive QA, the choice between stuffing documents into context vs. using RAG vs. fine-tuning depends on data freshness, volume, and accuracy requirements. Long context works well for static document analysis; RAG works better for dynamic or very large corpora; fine-tuning works best for domain-specific language patterns.",
    keyInsight:
      "The optimal approach is often hybrid: RAG retrieves candidate passages, then long context processes them together. But retriever quality is critical — strong retrievers paradoxically surface more 'hard negatives' (plausible but wrong passages) that mislead the generator more effectively than weak retrievers do.",
    relatedPaperIds: ["lewis-2020", "jin-2025", "databricks-2024"],
  },
  {
    id: "long-document",
    domain: "Long Document Understanding",
    icon: "file-text",
    summary:
      "Summarizing, analyzing, or answering questions about long documents (legal contracts, research papers, codebases) is a natural fit for long-context models. LongBench v2 tests tasks with contexts from 8K to 2M words across six categories. Models handle 'gist extraction' (summarization) better than 'needle finding' (specific fact retrieval) in long documents.",
    keyInsight:
      "Document structure matters more than raw length. Models process well-structured documents (clear sections, headings, logical flow) more reliably than unstructured text at the same length. Pre-processing documents to highlight structure can be more effective than simply extending the context window.",
    relatedPaperIds: ["bai-2023", "liu-2023", "hsieh-2024"],
  },
  {
    id: "conversation",
    domain: "Conversation & Dialogue",
    icon: "message-circle",
    summary:
      "In multi-turn conversations, the context window serves as shared state between user and model. Each turn adds to an accumulating context that encodes prior decisions, established facts, user preferences, and conversational norms. This is why later turns can be terse — the context already holds the shared mental model.",
    keyInsight:
      "Conversations naturally push against context limits: a 50-turn conversation at ~500 tokens/turn consumes 25K tokens. When the context fills, systems must either truncate (losing old turns), summarize (lossy compression), or use external memory (MemGPT-style paging). The choice fundamentally shapes the user's experience of continuity.",
    relatedPaperIds: ["packer-2023", "park-2023", "rae-2020"],
  },
];

// ─────────────────────────────────────────────
// Memory Augmentation Approaches
// ─────────────────────────────────────────────

export const MEMORY_APPROACHES = [
  {
    id: "external-memory",
    name: "External Memory (MemGPT / Letta, engram-style)",
    type: "external",
    description:
      "Treats the context window like working memory and offloads long-term storage to external databases. The LLM decides what to page in/out of its context using function calls, analogous to an OS managing virtual memory. Information persists across sessions in structured storage (SQLite, vector DBs) and is retrieved on demand.",
    tradeoff:
      "Enables unbounded effective memory and multi-session continuity. However, the LLM must spend tokens on memory management operations (search, retrieve, save), and retrieval quality depends on indexing strategy. Adds latency for memory operations and requires careful prompt engineering to teach the model when/what to remember.",
    relatedPaperIds: ["packer-2023", "park-2023"],
  },
  {
    id: "rag-approach",
    name: "Retrieval-Augmented Generation (RAG)",
    type: "retrieval",
    description:
      "At query time, a retriever (dense embedding search, BM25, or hybrid) fetches relevant passages from an external corpus and injects them into the context window. The generator produces output conditioned on both the query and retrieved passages. No training required — the knowledge base can be updated by re-indexing.",
    tradeoff:
      "Highly flexible and updatable — new documents are available immediately after indexing. But retriever quality is a bottleneck: poor retrieval means irrelevant context that actively degrades output. Also subject to the lost-in-the-middle effect when many passages are retrieved. Requires infrastructure (embedding model, vector store, retrieval pipeline).",
    relatedPaperIds: ["lewis-2020", "jin-2025", "databricks-2024"],
  },
  {
    id: "summarization-compaction",
    name: "Summarization / Compaction",
    type: "compression",
    description:
      "When context approaches its limit, a summarization step distills the conversation or document into a shorter representation that preserves key information. Claude Code's 'compaction' creates structured summaries of file paths, error history, decisions, and pending tasks. LLMLingua and gist tokens achieve this at the token level.",
    tradeoff:
      "Enables indefinite conversations within a fixed context budget. However, summarization is inherently lossy — subtle context, emotional tone, and specific phrasings may be lost. The quality of the summary determines the quality of subsequent interactions. Compaction also introduces a 'seam' in the conversation where pre- and post-summary context may be inconsistent.",
    relatedPaperIds: ["mu-2023", "jiang-2023", "rae-2020"],
  },
  {
    id: "episodic-memory",
    name: "Episodic Memory (Experience Logs + Reflection)",
    type: "hybrid",
    description:
      "Records a stream of observations (what happened, when, in what context) and periodically synthesizes them into higher-level reflections. Generative Agents pioneered this: raw observations feed a memory stream; a retrieval function combines recency, importance, and relevance scores; a reflection module generates abstract insights from clusters of memories.",
    tradeoff:
      "Produces rich, temporally grounded memories that enable nuanced behavior over long timescales. But reflection is computationally expensive (it is itself an LLM call), importance scoring is heuristic, and the system must decide when to reflect vs. when to act. The quality of retrieval (which memories to surface) is critical — bad retrieval means the agent acts on stale or irrelevant memories.",
    relatedPaperIds: ["park-2023", "packer-2023"],
  },
  {
    id: "human-memory-parallel",
    name: "Human Memory Models as Design Inspiration",
    type: "hybrid",
    description:
      "Cognitive science distinguishes working memory (limited, active), short-term memory (seconds-minutes), long-term episodic memory (experiences), and long-term semantic memory (facts/skills). Recent surveys map these directly onto LLM architectures: context window = working memory, session logs = episodic, distilled knowledge bases = semantic, fine-tuned weights = procedural.",
    tradeoff:
      "The analogy is productive but imperfect. Human memory is associative and reconstructive (we reconstruct memories, not replay them); LLM 'memory' through retrieval is more literal. Humans consolidate during sleep; LLM agents can consolidate continuously. The key shared insight: a single flat memory store is insufficient — hierarchical organization with different access patterns for different memory types is essential.",
    relatedPaperIds: ["park-2023", "packer-2023", "rae-2020"],
  },
];

// ─────────────────────────────────────────────
// Category metadata (for rendering)
// ─────────────────────────────────────────────

export const PAPER_CATEGORY_META = {
  foundational: {
    label: "Foundational",
    color: "#60a5fa",
    description: "The architectural papers that defined how context windows work",
  },
  "context-scaling": {
    label: "Context Scaling",
    color: "#a855f7",
    description: "How to extend context windows beyond training length",
  },
  benchmarks: {
    label: "Benchmarks",
    color: "#22c55e",
    description: "How we measure what context windows actually do",
  },
  efficiency: {
    label: "Efficiency",
    color: "#14b8a6",
    description: "Making long context computationally tractable",
  },
  "memory-augmentation": {
    label: "Memory Augmentation",
    color: "#f59e0b",
    description: "External memory systems that extend beyond the context window",
  },
  compression: {
    label: "Compression",
    color: "#ec4899",
    description: "Fitting more information into fewer tokens",
  },
  reasoning: {
    label: "Reasoning",
    color: "#8b5cf6",
    description: "Using context window space for multi-step thinking",
  },
  retrieval: {
    label: "Retrieval",
    color: "#06b6d4",
    description: "Dynamically filling context with external knowledge",
  },
  "position-bias": {
    label: "Position Bias",
    color: "#f87171",
    description: "How models attend unevenly across the context window",
  },
};

export const CONCEPT_CATEGORY_META = {
  architecture: { label: "Architecture", color: "#60a5fa" },
  performance: { label: "Performance", color: "#22c55e" },
  tradeoffs: { label: "Tradeoffs", color: "#f59e0b" },
  memory: { label: "Memory", color: "#a855f7" },
  evaluation: { label: "Evaluation", color: "#14b8a6" },
};
