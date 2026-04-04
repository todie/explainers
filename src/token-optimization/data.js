/**
 * Comprehensive Token Optimization Catalog for LLM API Usage
 * The most complete reference on reducing LLM costs, organized by category.
 *
 * Sources:
 *   - Anthropic pricing & docs (platform.claude.com)
 *   - OpenAI docs (platform.openai.com)
 *   - Google Gemini docs (ai.google.dev)
 *   - Microsoft LLMLingua (github.com/microsoft/LLMLingua)
 *   - RouteLLM (github.com/lm-sys/RouteLLM)
 *   - TOON format (github.com/toon-format/toon)
 *   - GPTCache (github.com/zilliztech/GPTCache)
 *   - Redis semantic caching docs
 *   - Various 2025-2026 engineering blogs (see individual source fields)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------





// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  {
    id: "prompt",
    title: "Prompt-Level",
    description:
      "Techniques applied to the prompt itself before it leaves your app — caching prefixes, compressing instructions, and eliminating redundancy.",
    icon: "P",
    color: "#4ade80",
  },
  {
    id: "request",
    title: "Request-Level",
    description:
      "Per-request API parameters and patterns that control cost and latency — streaming, batching, output limits, and stop sequences.",
    icon: "R",
    color: "#60a5fa",
  },
  {
    id: "architecture",
    title: "Architecture-Level",
    description:
      "System design patterns that structurally reduce token flow — caching proxies, RAG pipelines, model routers, and tiered inference.",
    icon: "A",
    color: "#a855f7",
  },
  {
    id: "content",
    title: "Content-Level",
    description:
      "Transforming the data you send — token compression, alternative serialization formats, schema-driven output, and context window management.",
    icon: "C",
    color: "#f59e0b",
  },
  {
    id: "conversation",
    title: "Conversation-Level",
    description:
      "Managing multi-turn dialogue efficiently — pruning old turns, sliding windows, summary chains, and persistent memory systems.",
    icon: "V",
    color: "#f87171",
  },
  {
    id: "provider",
    title: "Provider-Level",
    description:
      "Discounts and pricing tiers offered by LLM providers — prompt caching, batch APIs, model selection, and volume pricing.",
    icon: "$",
    color: "#22d3ee",
  },
];

// ---------------------------------------------------------------------------
// Techniques
// ---------------------------------------------------------------------------

export const TECHNIQUES = [
  // =======================================================================
  // PROMPT-LEVEL
  // =======================================================================
  {
    id: "prefix-caching",
    title: "Prefix Caching (Provider-Side)",
    category: "prompt",
    what:
      "The LLM provider caches the KV-cache state for repeated prompt prefixes. Subsequent requests sharing the same prefix skip re-computation and get a discounted input price.",
    howItSaves:
      "Cached input tokens cost 10% of the standard input price on Anthropic (90% discount). OpenAI gives a 50% discount automatically. Google Gemini gives 75-90% depending on model generation.",
    savings: "50-90% on input tokens for cached prefix",
    tradeoffs:
      "The prefix must be identical byte-for-byte. Any change to the beginning of the prompt invalidates the cache. Anthropic caches expire after 5 minutes (default) or 1 hour (premium). OpenAI caches clear after 5-10 min of inactivity.",
    appliesToClaude: true,
    claudeNotes:
      "Anthropic offers explicit cache_control breakpoints for fine-grained control plus automatic caching mode. Cache reads cost $0.50/MTok on Opus 4.6, $0.30/MTok on Sonnet 4.6, $0.10/MTok on Haiku 4.5 — versus $5/$3/$1 base input.",
    difficulty: "low",
    color: "#4ade80",
    source: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
  },
  {
    id: "cache-breakpoints",
    title: "Explicit Cache Breakpoints",
    category: "prompt",
    what:
      "Place cache_control markers on specific content blocks (system prompt, tool definitions, document chunks) to guarantee they are cached independently. Gives precise control over what gets cached and at what TTL.",
    howItSaves:
      "Unlike automatic caching, explicit breakpoints let you cache stable segments (system prompt, tool schemas) while leaving dynamic content (user message) uncached. This maximizes cache hit rate.",
    savings: "85-95% cache hit rate after warmup with stable prefixes",
    tradeoffs:
      "Requires understanding your prompt structure. 5-minute cache write costs 1.25x base input; 1-hour cache write costs 2x. Cache writes must amortize over subsequent reads (break-even after 1 read for 5-min, 2 reads for 1-hour).",
    appliesToClaude: true,
    claudeNotes:
      "Anthropic-specific feature. Two modes: (1) automatic — single cache_control at top level, system manages breakpoints; (2) explicit — place cache_control on individual content blocks. Recommended starting point is automatic mode.",
    difficulty: "medium",
    color: "#4ade80",
    source: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
  },
  {
    id: "prompt-compression",
    title: "Prompt Compression (LLMLingua)",
    category: "prompt",
    what:
      "Use a small, fast language model (e.g., BERT-level encoder) to remove redundant tokens from prompts while preserving semantic meaning. LLMLingua-2 achieves up to 20x compression with minimal performance loss.",
    howItSaves:
      "Directly reduces the number of input tokens sent to the expensive model. Particularly effective for RAG contexts where retrieved documents contain significant redundancy.",
    savings: "2-20x input token reduction (50-95%)",
    tradeoffs:
      "Adds latency from the compression step (~50-200ms). Compression model may occasionally remove tokens that matter. Quality degrades at extreme compression ratios (>15x). Requires running a separate model.",
    appliesToClaude: true,
    claudeNotes:
      "LLMLingua works with any LLM API including Claude. Integrated into LangChain and LlamaIndex. Best paired with Claude's prompt caching for maximum savings.",
    difficulty: "medium",
    color: "#4ade80",
    source: "https://github.com/microsoft/LLMLingua",
  },
  {
    id: "system-prompt-optimization",
    title: "System Prompt Optimization",
    category: "prompt",
    what:
      "Rewrite verbose system prompts to be concise. Remove filler words, collapse repeated instructions, use shorthand conventions. System prompts are sent with every request, so bloat compounds fast.",
    howItSaves:
      "A 2,000-token system prompt sent across 100 requests = 200K tokens. Cutting it to 800 tokens saves 120K tokens. At $3/MTok (Sonnet) that is $0.36 saved per 100 requests.",
    savings: "20-60% reduction in system prompt tokens",
    tradeoffs:
      "Overly terse prompts can reduce output quality. Need to validate that compressed instructions produce equivalent results. Best done with eval suites.",
    appliesToClaude: true,
    claudeNotes:
      "Combine with Anthropic's prompt caching to make the remaining tokens nearly free. A well-cached 800-token system prompt costs ~$0.0004 per read on Sonnet 4.6.",
    difficulty: "low",
    color: "#4ade80",
  },
  {
    id: "tool-definition-optimization",
    title: "Tool Definition Deduplication",
    category: "prompt",
    what:
      "Tool schemas (names, descriptions, JSON schemas) are serialized into the prompt on every request. Remove unused tools, collapse similar descriptions, and conditionally include only the tools relevant to the current turn.",
    howItSaves:
      "Each tool definition adds 100-500+ tokens. An app with 20 tools can spend 5,000-10,000 tokens per request just on tool schemas. Filtering to the 3-5 relevant tools saves 70-85%.",
    savings: "50-85% reduction in tool-related input tokens",
    tradeoffs:
      "Requires a pre-routing step to decide which tools to include. If you filter too aggressively, the model may not have access to tools it needs. Tool choice of 'auto' adds ~346 system prompt tokens on Claude.",
    appliesToClaude: true,
    claudeNotes:
      "Claude's tool use adds 313-346 tokens of system prompt overhead per request (regardless of tool count). Each tool definition (name + description + schema) adds additional tokens. Cache tool definitions with cache_control to minimize repeat cost.",
    difficulty: "medium",
    color: "#4ade80",
    source: "https://platform.claude.com/docs/en/about-claude/pricing",
  },
  {
    id: "few-shot-optimization",
    title: "Few-Shot Example Pruning",
    category: "prompt",
    what:
      "Reduce the number and size of few-shot examples in prompts. Use the minimum examples needed for the task, and keep them short. Cache the few-shot block so it is reused across requests.",
    howItSaves:
      "Few-shot examples are often the largest part of a prompt (500-5,000 tokens). Cutting from 5 examples to 2, or shortening each, directly reduces input tokens.",
    savings: "30-70% reduction in few-shot token cost",
    tradeoffs:
      "Fewer examples may reduce output quality for complex tasks. Test with your specific use case. Dynamic few-shot selection (picking examples relevant to the query) can maintain quality with fewer tokens.",
    appliesToClaude: true,
    difficulty: "low",
    color: "#4ade80",
  },

  // =======================================================================
  // REQUEST-LEVEL
  // =======================================================================
  {
    id: "streaming",
    title: "Streaming Responses (SSE)",
    category: "request",
    what:
      "Use server-sent events to receive tokens as they are generated instead of waiting for the complete response. Does not reduce tokens but dramatically improves perceived latency (10-20x faster time-to-first-token).",
    howItSaves:
      "Does not save tokens directly but reduces wall-clock time, enabling you to cancel early if the response is going off-track (saving output tokens). Also enables progressive rendering in UIs.",
    savings: "0% token savings; 10-20x improvement in perceived latency",
    tradeoffs:
      "Slightly more complex client implementation (SSE parsing). Cannot post-process the full response before showing it to users. Cancellation logic needed to actually save tokens.",
    appliesToClaude: true,
    claudeNotes:
      "Claude API supports streaming natively via stream=true. Returns server-sent events with content_block_delta events containing text chunks.",
    difficulty: "low",
    color: "#60a5fa",
    source: "https://platform.claude.com/docs/en/api/streaming",
  },
  {
    id: "batch-api",
    title: "Batch API Processing",
    category: "request",
    what:
      "Submit large volumes of requests asynchronously for processing within a 24-hour window. Both Anthropic and OpenAI offer 50% discounts on all tokens (input and output) for batch requests.",
    howItSaves:
      "Flat 50% discount on both input and output tokens. Stacks with prompt caching discounts — Anthropic batch + cache reads = up to 95% savings.",
    savings: "50% on all tokens; up to 95% combined with caching",
    tradeoffs:
      "Results are not immediate — processed within 24 hours. Not suitable for interactive/real-time use cases. Anthropic batches support up to 100,000 requests per batch. OpenAI supports up to 50,000 requests (200MB file limit).",
    appliesToClaude: true,
    claudeNotes:
      "Anthropic Batch API: Sonnet 4.6 drops to $1.50/$7.50 input/output (from $3/$15). Opus 4.6 drops to $2.50/$12.50 (from $5/$25). Haiku 4.5 drops to $0.50/$2.50 (from $1/$5). Combined with cache reads, Sonnet batch + cache = $0.15/MTok input.",
    difficulty: "low",
    color: "#60a5fa",
    source: "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
  },
  {
    id: "max-tokens-control",
    title: "max_tokens Output Limiting",
    category: "request",
    what:
      "Set explicit max_tokens limits on API responses to prevent runaway generation. Output tokens cost 3-8x more than input tokens across all providers, so controlling output length has outsized cost impact.",
    howItSaves:
      "Prevents the model from generating unnecessarily long responses. A request that might generate 2,000 output tokens can be capped at 500, saving 75% of output cost. Pair with prompt instructions like 'Answer in 50 words'.",
    savings: "30-75% output token reduction depending on task",
    tradeoffs:
      "Hard cutoff may truncate useful information. Best combined with prompt-level length guidance ('be concise', 'respond in N words') so the model naturally stops before the limit. Buffer the limit above your target.",
    appliesToClaude: true,
    claudeNotes:
      "Claude output pricing: Opus 4.6 = $25/MTok, Sonnet 4.6 = $15/MTok, Haiku 4.5 = $5/MTok. Output is 5x the cost of input, so every output token saved is worth 5 input tokens.",
    difficulty: "low",
    color: "#60a5fa",
  },
  {
    id: "stop-sequences",
    title: "Stop Sequences",
    category: "request",
    what:
      "Define strings that cause the model to halt generation when produced. Unlike max_tokens (a blunt numeric cutoff), stop sequences give pattern-based control — e.g., stop at closing XML tags, double newlines, or marker phrases.",
    howItSaves:
      "Prevents the model from generating padding, pleasantries, or repeated patterns after the useful content is done. Especially effective for structured output (stop after closing bracket/tag).",
    savings: "10-40% output token reduction for structured tasks",
    tradeoffs:
      "Stop sequences must be carefully chosen — too generic and they trigger early; too specific and they never match. OpenAI allows up to 4 stop sequences. Claude supports stop_sequences array in the API.",
    appliesToClaude: true,
    difficulty: "low",
    color: "#60a5fa",
  },
  {
    id: "request-parallelism",
    title: "Request Parallelism & Chunking",
    category: "request",
    what:
      "Split a large task into smaller parallel requests instead of one monolithic prompt. Each sub-request uses fewer input tokens and can target a cheaper model. Results are merged client-side.",
    howItSaves:
      "Avoids sending the full context to every sub-task. A 50K-token document analysis can be split into 10 x 5K-token chunks, each processed independently. Total input stays ~50K but each request is cheaper per-token if context pricing is tiered.",
    savings: "20-50% via reduced per-request context + model tiering",
    tradeoffs:
      "Adds orchestration complexity. Sub-tasks lose cross-chunk context — may miss information that spans chunk boundaries. Requires a merge/reduce step. Latency depends on slowest chunk.",
    appliesToClaude: true,
    difficulty: "medium",
    color: "#60a5fa",
  },

  // =======================================================================
  // ARCHITECTURE-LEVEL
  // =======================================================================
  {
    id: "semantic-caching",
    title: "Semantic Caching (Application-Side)",
    category: "architecture",
    what:
      "Cache LLM responses keyed by semantic similarity of the input query (not exact match). Uses vector embeddings and cosine similarity. When a new query is similar enough to a cached one (threshold ~0.85-0.95), return the cached response without calling the LLM.",
    howItSaves:
      "Eliminates the LLM call entirely for semantically similar queries. 30-40% of production LLM requests are semantically similar to previous ones. Each cache hit saves 100% of that request's cost.",
    savings: "30-60% total cost reduction at scale; 100% per cache hit",
    tradeoffs:
      "Requires a vector database or embedding index. Stale responses for dynamic data. Similarity threshold tuning: too low = wrong answers, too high = few cache hits. Adds ~5-20ms embedding lookup per request.",
    appliesToClaude: true,
    claudeNotes:
      "Works with any LLM API. Tools: GPTCache (open source), Redis Semantic Cache, Momento. Pair with Claude's native prefix caching for layered savings — semantic cache for the full response, prefix cache for partial prompt reuse on misses.",
    difficulty: "medium",
    color: "#a855f7",
    source: "https://redis.io/blog/what-is-semantic-caching/",
  },
  {
    id: "rag-pipeline",
    title: "RAG vs. Full Context Stuffing",
    category: "architecture",
    what:
      "Retrieve only the relevant chunks from your knowledge base (5-20 chunks, 2K-10K tokens) instead of stuffing the entire document into context. RAG preserves 95% accuracy while using 25% of the tokens.",
    howItSaves:
      "A 100K-token document stuffed into context costs 50-200x more per query than a RAG pipeline retrieving 2-5K tokens of relevant chunks. At $3/MTok (Sonnet), that is $0.30 vs. $0.006 per query.",
    savings: "75-95% input token reduction vs. full context; 50-200x per query",
    tradeoffs:
      "Requires a retrieval pipeline (embeddings, vector DB, chunking strategy). Quality depends on retrieval accuracy — poor retrieval = worse answers than full context. Adds 50-200ms retrieval latency. Not needed for small documents (<10K tokens).",
    appliesToClaude: true,
    claudeNotes:
      "Claude's 200K-1M context window enables full-document analysis when needed, but RAG is still more cost-effective at scale. Optimize RAG chunks: limit to 2-3 short chunks to avoid 3-4x input inflation from over-retrieval.",
    difficulty: "high",
    color: "#a855f7",
    source: "https://www.pinecone.io/blog/why-use-retrieval-instead-of-larger-context/",
  },
  {
    id: "model-routing",
    title: "Model Routing (Cheap-First Cascade)",
    category: "architecture",
    what:
      "Route simple queries to cheap/fast models (Haiku, GPT-4o-mini) and only escalate to expensive models (Opus, GPT-4) when the task requires it. A router classifier or confidence check determines complexity.",
    howItSaves:
      "If 70% of queries can be handled by Haiku ($1/MTok input) instead of Sonnet ($3/MTok input), you save 67% on those requests. RouteLLM achieves up to 85% cost reduction while maintaining 95% quality.",
    savings: "40-85% total cost reduction depending on query distribution",
    tradeoffs:
      "Router adds latency (~10-50ms) and may misclassify queries. Over-routing to cheap models degrades quality. Cascade approach (try cheap model, check confidence, escalate) costs more if the cheap model always fails. Requires quality monitoring.",
    appliesToClaude: true,
    claudeNotes:
      "Natural tiering: Haiku 4.5 ($1/$5) -> Sonnet 4.6 ($3/$15) -> Opus 4.6 ($5/$25). Haiku is 5x cheaper than Opus on input, 5x cheaper on output. Route classification, extraction, and simple Q&A to Haiku; complex reasoning to Sonnet/Opus.",
    difficulty: "medium",
    color: "#a855f7",
    source: "https://github.com/lm-sys/RouteLLM",
  },
  {
    id: "caching-proxy",
    title: "Caching Proxy / LLM Gateway",
    category: "architecture",
    what:
      "Deploy a proxy layer between your app and the LLM API that handles caching, routing, retries, and monitoring. Tools like LiteLLM, Portkey, Helicone, and custom proxies manage multi-provider optimization.",
    howItSaves:
      "Centralizes cost optimization: response caching (up to 95% savings on cache hits), automatic prompt prefix stabilization for provider caching, model routing, and usage analytics to identify waste.",
    savings: "30-60% overall cost reduction; up to 95% on cached responses",
    tradeoffs:
      "Adds infrastructure complexity and a network hop (~5-20ms latency). Self-hosted proxies require maintenance. LiteLLM has reported performance issues at scale. Helicone and Portkey are cloud-hosted (data leaves your infra).",
    appliesToClaude: true,
    claudeNotes:
      "A proxy can stabilize prompt prefixes to maximize Anthropic's prefix caching hit rate. Reorder content so system prompt + tools + cached documents come first (stable), user message last (dynamic).",
    difficulty: "medium",
    color: "#a855f7",
    source: "https://www.helicone.ai/blog/top-llm-gateways-comparison-2025",
  },
  {
    id: "cascade-routing",
    title: "Cascade Routing (Unified Framework)",
    category: "architecture",
    what:
      "A combined routing + cascading strategy: first try a cheap model, then check if its output meets a quality threshold. If not, escalate to a stronger model. Unlike pure routing, cascade reuses the cheap model's attempt as context.",
    howItSaves:
      "Research shows cascade routing consistently outperforms both pure routing and pure cascading. The cheap model handles easy queries (~60-70% of traffic); the expensive model only processes hard queries where quality confidence was low.",
    savings: "50-85% cost reduction vs. always using the strongest model",
    tradeoffs:
      "Adds latency for escalated queries (two model calls). Requires a quality/confidence scoring mechanism. The confidence threshold needs tuning per use case. May not work well for tasks where partial answers are harmful.",
    appliesToClaude: true,
    claudeNotes:
      "Cascade: Haiku 4.5 -> Sonnet 4.6 -> Opus 4.6. Use Haiku's response confidence (or a lightweight evaluator) to decide escalation. For agentic workflows, run initial planning on Sonnet, escalate complex reasoning steps to Opus.",
    difficulty: "high",
    color: "#a855f7",
    source: "https://arxiv.org/abs/2410.10347",
  },

  // =======================================================================
  // CONTENT-LEVEL
  // =======================================================================
  {
    id: "toon-format",
    title: "TOON (Token-Oriented Object Notation)",
    category: "content",
    what:
      "A compact, schema-aware data format that replaces JSON in LLM prompts. Uses YAML-style indentation with CSV-style tabular layout. Defines schemas once, uses short aliases for repeated values, eliminating key-name repetition.",
    howItSaves:
      "Reduces token count by 30-61% vs. JSON for structured data. A 500-row e-commerce dataset: 11,842 tokens in JSON vs. 4,617 in TOON (61% reduction). Also improves model accuracy (92.5% -> 99.4% reconstruction on GPT-5 Nano).",
    savings: "30-61% fewer tokens for structured/tabular data",
    tradeoffs:
      "New format — LLMs may not parse it as reliably as JSON (though benchmarks show improved accuracy). Best for uniform tabular data; deeply nested/non-uniform data may not benefit. Requires serialization/deserialization tooling.",
    appliesToClaude: true,
    claudeNotes:
      "Works with Claude — model handles the format well for tabular data. TypeScript SDK available. Best combined with prompt caching: encode stable reference data in TOON, cache the block.",
    difficulty: "medium",
    color: "#f59e0b",
    source: "https://github.com/toon-format/toon",
  },
  {
    id: "context-compression",
    title: "Context Compression (Extraction-Based)",
    category: "content",
    what:
      "Use a cheap/fast model to extract only the relevant sentences from retrieved documents before injecting them into the main prompt. Unlike LLMLingua (token-level), this operates at the sentence/paragraph level.",
    howItSaves:
      "Retrieved documents often contain 70-90% irrelevant content. Extracting the 2-3 relevant sentences from a 2,000-token chunk reduces it to 200-400 tokens — a 5-10x reduction per chunk.",
    savings: "60-90% reduction in RAG context tokens",
    tradeoffs:
      "Adds a model call for compression (use a cheap model like Haiku). Risk of losing relevant information if the extractor misses it. Adds latency. Quality of extraction depends on the compression model's capability.",
    appliesToClaude: true,
    claudeNotes:
      "Use Haiku 4.5 ($1/MTok) as the compression model to extract relevant sentences, then send compressed context to Sonnet/Opus. The Haiku call is cheap relative to the savings on the main model call.",
    difficulty: "medium",
    color: "#f59e0b",
  },
  {
    id: "structured-output-schemas",
    title: "Structured Output Schemas",
    category: "content",
    what:
      "Constrain the model's output to a JSON schema or grammar. The model generates only the fields you need, eliminating free-text padding, explanation, and formatting overhead. Native support in OpenAI, Anthropic (via tool_use), and Google.",
    howItSaves:
      "A free-text response explaining a classification might be 200 tokens. A structured JSON response with just the label and confidence is 15 tokens. Also eliminates parsing errors and retry costs.",
    savings: "50-90% output token reduction for extraction/classification tasks",
    tradeoffs:
      "Constrains the model's expressiveness — it cannot explain its reasoning unless you add a 'reasoning' field. Some schemas add overhead from the schema definition itself (tool definitions cost tokens). Complex nested schemas may confuse the model.",
    appliesToClaude: true,
    claudeNotes:
      "Claude supports structured output via tool_use (function calling). Define a tool with the desired output schema, force tool_choice to that tool. The model returns structured JSON matching the schema. Tool definitions add ~313-346 system prompt tokens.",
    difficulty: "low",
    color: "#f59e0b",
    source: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
  },
  {
    id: "schema-deduplication",
    title: "Schema Deduplication in Prompts",
    category: "content",
    what:
      "When passing structured data to an LLM, define the schema once at the top and reference it, rather than repeating field names in every object. Analogous to database normalization for prompts.",
    howItSaves:
      "In a list of 50 objects with 8 fields each, field names are repeated 400 times in standard JSON. Defining the schema once and passing values as arrays/tuples eliminates ~60-78% of redundant key tokens.",
    savings: "40-78% token reduction for repetitive structured data",
    tradeoffs:
      "The model must understand the implied mapping between schema positions and values. Works well for uniform data; breaks down for heterogeneous objects. Pair with few-shot examples showing the format.",
    appliesToClaude: true,
    difficulty: "low",
    color: "#f59e0b",
  },
  {
    id: "context-window-management",
    title: "Context Window Budget Management",
    category: "content",
    what:
      "Treat the context window as a budget. Score each piece of content by relevance, recency, and importance (RIR scoring), then allocate tokens proportionally. High-value content gets more space; low-value content is summarized or dropped.",
    howItSaves:
      "Prevents the common pattern of context windows filled with 70% low-value content. Actively managing what goes in keeps total input tokens lower while maintaining or improving output quality.",
    savings: "30-60% input token reduction",
    tradeoffs:
      "Requires a scoring/prioritization system. Content that seems low-value might be important for edge cases. Dynamic prioritization adds compute overhead. Over-aggressive pruning degrades output quality.",
    appliesToClaude: true,
    claudeNotes:
      "Claude's 200K-1M context window is generous, but cost scales linearly. At $3/MTok, a 200K-token request costs $0.60 in input alone. Managing context to 50K tokens = $0.15 per request, 75% savings.",
    difficulty: "medium",
    color: "#f59e0b",
  },
  {
    id: "extended-thinking-budget",
    title: "Extended Thinking Budget Control",
    category: "content",
    what:
      "When using reasoning/thinking models, set a thinking token budget to limit internal chain-of-thought generation. You are billed for all thinking tokens at output token rates, even though they are not visible in the response.",
    howItSaves:
      "A query showing 500 visible output tokens may actually consume 3,000-10,000 tokens including reasoning. Setting a thinking budget limits this hidden cost. Start at the minimum (1,024 tokens on Claude) and increase only as needed.",
    savings: "30-80% reduction in effective output token cost for reasoning tasks",
    tradeoffs:
      "Lower thinking budgets may reduce reasoning quality for complex tasks. Need to benchmark quality vs. budget for your specific use case. Not all tasks benefit from extended thinking — disable it entirely for simple tasks.",
    appliesToClaude: true,
    claudeNotes:
      "Claude's extended thinking: minimum budget is 1,024 tokens. Charged at output token rates ($25/MTok on Opus 4.6). For routine tasks, disable extended thinking entirely. For complex reasoning, start low and increment until quality plateaus.",
    difficulty: "low",
    color: "#f59e0b",
    source: "https://platform.claude.com/docs/en/build-with-claude/extended-thinking",
  },

  // =======================================================================
  // CONVERSATION-LEVEL
  // =======================================================================
  {
    id: "sliding-window",
    title: "Sliding Window (Fixed-Size History)",
    category: "conversation",
    what:
      "Maintain only the N most recent conversation turns in context, dropping older messages as new ones arrive. Research suggests 12-message windows provide optimal balance between context continuity and efficiency.",
    howItSaves:
      "Without windowing, a 50-turn conversation resends all 50 turns every request. With a 12-turn window, you send at most 12 turns regardless of conversation length. Savings grow linearly with conversation length.",
    savings: "60-90% input tokens for long conversations (20+ turns)",
    tradeoffs:
      "The model loses access to older context and may repeat itself or miss earlier instructions. Critical information from early turns is lost. Best combined with summary chains to preserve key context from dropped turns.",
    appliesToClaude: true,
    claudeNotes:
      "Claude's large context window (200K-1M) means you can afford a bigger window than with most models. But cost still scales linearly — a 50-turn conversation at ~5K tokens/turn = 250K input tokens = $0.75 per request on Sonnet.",
    difficulty: "low",
    color: "#f87171",
  },
  {
    id: "summary-chains",
    title: "Summary Chains (Progressive Summarization)",
    category: "conversation",
    what:
      "When conversation history exceeds a threshold, summarize older turns into a compact block and prepend it to the context. The summary grows incrementally — new turns are summarized and merged into the existing summary.",
    howItSaves:
      "A 20-turn conversation with ~5K tokens/turn = 100K tokens raw history. Summarized to a 2K-token summary = 98% reduction in historical context tokens. Only the summary + recent turns are sent.",
    savings: "80-95% reduction in historical conversation tokens",
    tradeoffs:
      "Summarization itself costs tokens (a separate LLM call). Information loss is inevitable — nuanced details may be dropped. Summary quality depends on the summarization model. Cascading summaries (summary of summaries) can drift from the original.",
    appliesToClaude: true,
    claudeNotes:
      "Use Haiku 4.5 ($1/$5) for summarization to minimize overhead cost. Claude Code uses a variant of this: 'compaction summaries' that preserve file paths, error history, decisions, and pending tasks in a structured format.",
    difficulty: "medium",
    color: "#f87171",
  },
  {
    id: "conversation-pruning",
    title: "Dynamic Context Pruning (RIR Scoring)",
    category: "conversation",
    what:
      "Instead of simple sliding window, score each message on three axes: Recency, Importance, and Relevance (RIR). Keep high-scoring messages regardless of age. Drop or summarize low-scoring messages. Last 3-5 messages always kept for coherence.",
    howItSaves:
      "More intelligent than sliding window — preserves critical earlier context (e.g., initial requirements) while dropping low-value turns (e.g., 'thanks', 'ok'). Maintains quality while reducing tokens.",
    savings: "40-70% input token reduction with minimal quality loss",
    tradeoffs:
      "Requires computing importance/relevance scores per message (could use embeddings or heuristics). More complex to implement than sliding window. Scoring overhead adds latency. Importance heuristics may be wrong for edge cases.",
    appliesToClaude: true,
    claudeNotes:
      "Can be implemented as middleware between your app and the Claude API. Score each turn, filter low-value turns, send the pruned history. The opencode-dynamic-context-pruning plugin shows one approach.",
    difficulty: "high",
    color: "#f87171",
    source: "https://github.com/Opencode-DCP/opencode-dynamic-context-pruning",
  },
  {
    id: "memory-systems",
    title: "Persistent Memory Systems",
    category: "conversation",
    what:
      "Store key facts, decisions, and context in an external memory store (vector DB, SQLite, key-value store) that persists across sessions. Retrieve relevant memories per-query instead of replaying full conversation history.",
    howItSaves:
      "Eliminates the need to maintain long conversation histories. Instead of sending 100K tokens of prior context, retrieve 1-2K tokens of relevant memories. Works across sessions — no re-establishment of context.",
    savings: "80-95% reduction vs. replaying full conversation history",
    tradeoffs:
      "Requires infrastructure (memory store, embedding pipeline, retrieval logic). Memory can become stale or contradictory. Retrieval quality determines effectiveness. Memory management (dedup, update, expiry) adds complexity.",
    appliesToClaude: true,
    claudeNotes:
      "Claude Code uses CLAUDE.md files as persistent memory. The engram system (mentioned in context) provides SQLite + FTS5 based memory with topic-key upsert for cross-session persistence. mem_save/mem_search operations provide efficient context retrieval.",
    difficulty: "high",
    color: "#f87171",
  },
  {
    id: "compaction",
    title: "Automatic Compaction",
    category: "conversation",
    what:
      "When the conversation approaches the context window limit, the system automatically compresses the full conversation into a structured summary preserving key artifacts (file paths, error history, decisions, pending tasks).",
    howItSaves:
      "Prevents context overflow errors and allows arbitrarily long sessions. The compacted summary is typically 5-10% the size of the full conversation, dramatically reducing tokens for subsequent turns.",
    savings: "90-95% reduction at compaction point",
    tradeoffs:
      "Information loss during compaction. The model may lose subtle nuances or context that was important. Compaction itself costs tokens. Frequent compaction can create a 'lossy telephone' effect where each compression loses more detail.",
    appliesToClaude: true,
    claudeNotes:
      "Claude Code implements automatic compaction natively. When context fills, it generates a structured summary preserving critical state. Custom implementations can trigger compaction at any threshold (e.g., 80% of context window).",
    difficulty: "medium",
    color: "#f87171",
  },

  // =======================================================================
  // PROVIDER-LEVEL
  // =======================================================================
  {
    id: "anthropic-prompt-caching",
    title: "Anthropic Prompt Caching (90% Discount)",
    category: "provider",
    what:
      "Anthropic's native prompt caching charges 0.1x base input price for cache reads — a 90% discount. Cache writes cost 1.25x (5-min TTL) or 2x (1-hour TTL). Break-even after just 1-2 cache reads.",
    howItSaves:
      "A 10K-token system prompt cached on Sonnet 4.6: write costs $0.0375 (once), each read costs $0.003 (vs. $0.03 standard). After 2 reads, you are saving money. Over 100 requests: $0.3375 total vs. $3.00 uncached = 89% savings.",
    savings: "90% on cached input tokens; 89% net after write amortization",
    tradeoffs:
      "5-minute TTL means caches expire quickly during low traffic. 1-hour TTL costs 2x base on write. Cache is byte-prefix-sensitive: any change to the cached prefix invalidates it. Workspace-level isolation (not org-level) since Feb 2026.",
    appliesToClaude: true,
    claudeNotes:
      "Concrete pricing: Opus 4.6 cache read = $0.50/MTok (vs. $5 input). Sonnet 4.6 cache read = $0.30/MTok (vs. $3 input). Haiku 4.5 cache read = $0.10/MTok (vs. $1 input). Available on all current Claude models.",
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
  },
  {
    id: "openai-auto-caching",
    title: "OpenAI Automatic Prompt Caching (50% Discount)",
    category: "provider",
    what:
      "OpenAI automatically caches prompts longer than 1,024 tokens and gives a 50% discount on cached input tokens. No configuration needed — it is applied transparently when prompts share common prefixes.",
    howItSaves:
      "50% discount on all input tokens that match a previously seen prefix. Zero effort to implement — completely automatic. Also reduces latency by up to 80% for cached prefixes.",
    savings: "50% on cached input tokens; up to 80% latency reduction",
    tradeoffs:
      "Caches clear after 5-10 min of inactivity, always within 1 hour. No explicit cache control — you cannot force caching or set TTLs. Less controllable than Anthropic's explicit breakpoints. 1,024 token minimum prefix length.",
    appliesToClaude: false,
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.openai.com/docs/guides/prompt-caching",
  },
  {
    id: "gemini-context-caching",
    title: "Google Gemini Context Caching (75-90% Discount)",
    category: "provider",
    what:
      "Google offers both implicit (automatic, enabled by default on Gemini 2.5+) and explicit (manual cache creation with custom TTL) context caching. Discounts range from 75% (Gemini 2.0) to 90% (Gemini 2.5+).",
    howItSaves:
      "Cache reads cost 10% of base input price on Gemini 2.5. Implicit caching is free and automatic. Explicit caching incurs storage costs ($1-4.50/MTok/hour) but guarantees availability.",
    savings: "75-90% on cached input tokens",
    tradeoffs:
      "Storage costs for explicit caches (hourly billing). Implicit caching has no availability guarantee — hits depend on Google's internal cache state. Dynamic content at the beginning of prompts reduces cache effectiveness.",
    appliesToClaude: false,
    difficulty: "low",
    color: "#22d3ee",
    source: "https://ai.google.dev/gemini-api/docs/caching",
  },
  {
    id: "anthropic-batch",
    title: "Anthropic Batch API (50% Discount)",
    category: "provider",
    what:
      "Anthropic's Message Batches endpoint processes requests asynchronously within 24 hours at a flat 50% discount on all tokens. Supports up to 100,000 requests per batch.",
    howItSaves:
      "Every token (input and output) costs half as much. Stacks with prompt caching: batch + cache read = 0.5 * 0.1 = 0.05x base input price (95% savings on cached batch inputs).",
    savings: "50% flat; up to 95% stacked with prompt caching",
    tradeoffs:
      "24-hour processing window — not for real-time use. Separate rate limit pool. Batch cannot use fast mode. Ideal for evals, bulk processing, content generation, and data analysis.",
    appliesToClaude: true,
    claudeNotes:
      "Stacked pricing examples: Sonnet 4.6 batch + cache read = $0.15/MTok input (vs. $3 standard = 95% savings). Haiku 4.5 batch + cache read = $0.05/MTok input (vs. $1 standard). Most cost-effective Claude option for non-real-time workloads.",
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.claude.com/docs/en/build-with-claude/batch-processing",
  },
  {
    id: "openai-batch",
    title: "OpenAI Batch API (50% Discount)",
    category: "provider",
    what:
      "OpenAI's Batch API offers 50% discount on both input and output tokens for asynchronous requests processed within 24 hours. Up to 50,000 requests per batch, 200MB file size limit.",
    howItSaves:
      "Same 50% discount as Anthropic's batch. Separate rate limit pool means batch requests do not compete with your real-time traffic. Can be combined with prompt caching for additional savings.",
    savings: "50% on all tokens",
    tradeoffs:
      "24-hour processing window. JSONL file format for batch submission. Need to poll for completion. Not suitable for interactive use cases.",
    appliesToClaude: false,
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.openai.com/docs/guides/batch",
  },
  {
    id: "model-selection",
    title: "Model Selection (Haiku vs. Sonnet vs. Opus)",
    category: "provider",
    what:
      "Choose the cheapest model that meets your quality requirements. Anthropic's 2026 lineup: Haiku 4.5 ($1/$5), Sonnet 4.6 ($3/$15), Opus 4.6 ($5/$25). A 5x cost difference between Haiku and Opus.",
    howItSaves:
      "Running on Haiku instead of Opus saves 80% on input and 80% on output. For tasks like classification, extraction, summarization, and simple Q&A, Haiku performs within 5-10% of Opus quality.",
    savings: "60-80% cost reduction by downtier (e.g., Opus -> Haiku)",
    tradeoffs:
      "Cheaper models have lower capability ceilings. Complex reasoning, nuanced writing, and multi-step planning degrade on cheaper models. Need to benchmark quality per task. May need different prompts optimized per model.",
    appliesToClaude: true,
    claudeNotes:
      "Legacy models are even cheaper: Haiku 3 at $0.25/$1.25 is 20x cheaper than Opus 4.6 on input. But newer models are generally better. Sweet spot for most production workloads: Sonnet 4.6 ($3/$15) — balances quality and cost.",
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.claude.com/docs/en/about-claude/pricing",
  },
  {
    id: "long-context-pricing",
    title: "Long Context Pricing Awareness",
    category: "provider",
    what:
      "Some providers charge premium rates for long-context requests. Claude Opus 4.6 and Sonnet 4.6 include the full 1M context at standard pricing. Other providers may apply surcharges above certain thresholds.",
    howItSaves:
      "Awareness of pricing tiers prevents accidental cost spikes. On Claude, there is no long-context surcharge — a 900K-token request is billed at the same per-token rate as a 9K-token request. But total cost still scales linearly.",
    savings: "Avoidance of 2-10x surcharges on other providers",
    tradeoffs:
      "Even without surcharges, long context is expensive by volume. A 500K-token input on Sonnet 4.6 = $1.50 per request. Prompt caching and RAG are often better than dumping everything into a long context.",
    appliesToClaude: true,
    claudeNotes:
      "Claude 4.6 models: full 1M context at standard pricing, no surcharge. Prompt caching and batch discounts apply at standard rates across the full context window. Fast mode (6x premium) also applies across the full context window.",
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.claude.com/docs/en/about-claude/pricing",
  },
  {
    id: "fast-mode-awareness",
    title: "Fast Mode Cost Awareness",
    category: "provider",
    what:
      "Anthropic's fast mode for Opus 4.6 provides significantly faster output at a 6x price premium ($30/$150 per MTok vs. $5/$25 standard). Only use when latency is critical and the task justifies the cost.",
    howItSaves:
      "Awareness prevents accidental 6x cost spikes. Reserve fast mode for latency-critical paths (real-time chat, time-sensitive agents) and use standard mode for everything else.",
    savings: "83% savings by avoiding fast mode when not needed",
    tradeoffs:
      "Fast mode is valuable when latency matters — the 6x premium buys significantly faster generation. Cannot be used with batch API. Prompt caching and data residency multipliers stack on top of fast mode pricing.",
    appliesToClaude: true,
    claudeNotes:
      "Opus 4.6 fast mode: $30/MTok input, $150/MTok output. Standard Opus 4.6: $5/MTok input, $25/MTok output. Same quality, different speed. Only available on Opus 4.6 as of April 2026.",
    difficulty: "low",
    color: "#22d3ee",
    source: "https://platform.claude.com/docs/en/build-with-claude/fast-mode",
  },
];

// ---------------------------------------------------------------------------
// Derived helpers for React components
// ---------------------------------------------------------------------------

export function techniquesByCategory(categoryId) {
  return TECHNIQUES.filter((t) => t.category === categoryId);
}

export function claudeOnlyTechniques() {
  return TECHNIQUES.filter(
    (t) => t.appliesToClaude && t.claudeNotes !== undefined
  );
}

export function techniqueById(id) {
  return TECHNIQUES.find((t) => t.id === id);
}

/** Quick-reference pricing table for Claude models (April 2026) */
export const CLAUDE_PRICING = {
  models: [
    {
      name: "Claude Opus 4.6",
      input: 5,
      output: 25,
      cacheWrite5m: 6.25,
      cacheWrite1h: 10,
      cacheRead: 0.5,
      batchInput: 2.5,
      batchOutput: 12.5,
    },
    {
      name: "Claude Sonnet 4.6",
      input: 3,
      output: 15,
      cacheWrite5m: 3.75,
      cacheWrite1h: 6,
      cacheRead: 0.3,
      batchInput: 1.5,
      batchOutput: 7.5,
    },
    {
      name: "Claude Haiku 4.5",
      input: 1,
      output: 5,
      cacheWrite5m: 1.25,
      cacheWrite1h: 2,
      cacheRead: 0.1,
      batchInput: 0.5,
      batchOutput: 2.5,
    },
  ],
  unit: "USD per million tokens",
  bestCombo: "Batch + Cache Read on Haiku 4.5 = $0.05/MTok input (95% off base)",
};

/** Summary stats for the hero section */
export const HERO_STATS = [
  {
    label: "Techniques Cataloged",
    value: String(TECHNIQUES.length),
    sub: "across 6 categories",
    color: "#4ade80",
  },
  {
    label: "Max Combined Savings",
    value: "95%",
    sub: "batch + cache stacked",
    color: "#60a5fa",
  },
  {
    label: "Easiest Win",
    value: "Prompt Caching",
    sub: "90% off cached input",
    color: "#a855f7",
  },
  {
    label: "Claude Models",
    value: "3 Tiers",
    sub: "$1 / $3 / $5 per MTok",
    color: "#f59e0b",
  },
];

/** Open-source tools referenced throughout */
export const TOOLS = [
  {
    name: "LLMLingua / LLMLingua-2",
    description: "Microsoft's prompt compression library. Uses a small model to remove redundant tokens. Up to 20x compression.",
    url: "https://github.com/microsoft/LLMLingua",
    language: "Python",
  },
  {
    name: "RouteLLM",
    description: "LMSYS framework for training model routers. Drop-in OpenAI client replacement. Up to 85% cost reduction.",
    url: "https://github.com/lm-sys/RouteLLM",
    language: "Python",
  },
  {
    name: "GPTCache",
    description: "Zilliz's semantic caching library. Supports FAISS, Milvus, Redis as vector backends.",
    url: "https://github.com/zilliztech/GPTCache",
    language: "Python",
  },
  {
    name: "TOON",
    description: "Token-Oriented Object Notation. Compact, schema-aware JSON alternative. 30-61% fewer tokens.",
    url: "https://github.com/toon-format/toon",
    language: "TypeScript",
  },
  {
    name: "LiteLLM",
    description: "Unified LLM proxy. 100+ providers, single interface. Open source, self-hostable.",
    url: "https://github.com/BerriAI/litellm",
    language: "Python",
  },
  {
    name: "Helicone",
    description: "Open-source LLM gateway with caching, observability, and cost tracking. MIT license.",
    url: "https://github.com/Helicone/helicone",
    language: "TypeScript",
  },
  {
    name: "prompt-optimizer",
    description: "Python library to minimize LLM token complexity. Configurable optimization passes.",
    url: "https://github.com/vaibkumr/prompt-optimizer",
    language: "Python",
  },
  {
    name: "OpenCode Dynamic Context Pruning",
    description: "Plugin for dynamic conversation context management. RIR scoring for intelligent pruning.",
    url: "https://github.com/Opencode-DCP/opencode-dynamic-context-pruning",
    language: "Go / TypeScript",
  },
];

/** Key sources for the footer / citations */
export const SOURCES = [
  { label: "Anthropic Pricing", url: "https://platform.claude.com/docs/en/about-claude/pricing" },
  { label: "Anthropic Prompt Caching", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching" },
  { label: "Anthropic Batch API", url: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" },
  { label: "OpenAI Prompt Caching", url: "https://platform.openai.com/docs/guides/prompt-caching" },
  { label: "OpenAI Batch API", url: "https://platform.openai.com/docs/guides/batch" },
  { label: "Gemini Context Caching", url: "https://ai.google.dev/gemini-api/docs/caching" },
  { label: "LLMLingua (Microsoft)", url: "https://github.com/microsoft/LLMLingua" },
  { label: "RouteLLM (LMSYS)", url: "https://github.com/lm-sys/RouteLLM" },
  { label: "TOON Format", url: "https://github.com/toon-format/toon" },
  { label: "GPTCache (Zilliz)", url: "https://github.com/zilliztech/GPTCache" },
  { label: "Redis Semantic Caching", url: "https://redis.io/blog/what-is-semantic-caching/" },
  { label: "Cascade Routing (ETH Zurich)", url: "https://arxiv.org/abs/2410.10347" },
  { label: "Pinecone: Why Use Retrieval", url: "https://www.pinecone.io/blog/why-use-retrieval-instead-of-larger-context/" },
  { label: "Redis Token Optimization Guide", url: "https://redis.io/blog/llm-token-optimization-speed-up-apps/" },
  { label: "PremAI Cost Optimization Guide", url: "https://blog.premai.io/llm-cost-optimization-8-strategies-that-cut-api-spend-by-80-2026-guide/" },
];
