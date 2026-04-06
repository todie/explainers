# Research Inventory: Memory System Rework

Compiled 2026-04-04. Four research agents + competitive analysis.

---

## 1. Context/LLM Foundations

20 papers, 13 concepts, 6 tradeoffs, 5 domain impacts.

### Key Papers

| Paper | Year | Citations | Key Finding |
| --- | --- | --- | --- |
| Vaswani et al. "Attention Is All You Need" | 2017 | ~173K | Transformer architecture |
| Bahdanau et al. "Neural Machine Translation" | 2014 | ~45K | Attention mechanism |
| Wei et al. "Chain-of-Thought Prompting" | 2022 | ~12K | Reasoning via intermediate steps |
| Lewis et al. "Retrieval-Augmented Generation" | 2020 | ~5K | Hybrid retrieval + generation |
| Dao et al. "FlashAttention" | 2022 | ~3.8K | IO-aware attention |
| Liu et al. "Lost in the Middle" | 2023 | ~2.6K | U-shaped attention dead zone |
| Park et al. "Generative Agents" | 2023 | ~3K | Memory + reflection + planning |

**Core Insight:** Effective context is much smaller than nominal context. RULER benchmark shows models claiming 128K context degrade by 32-64K on complex tasks.

## 2. Alternative Memory Managers

| System | Architecture | Differentiator |
| --- | --- | --- |
| **MemGPT/Letta** | OS-inspired 2-tier | Agent self-edits core memory |
| **Mem0** | Two-phase extraction/update | 91% lower latency, 90% token savings |
| **Zep/Graphiti** | Temporal knowledge graph | Bi-temporal facts with validity windows |
| **claude-mem** | 5 lifecycle hooks | Purpose-built for Claude Code |
| **LangChain/LangMem** | Modular types | Widest ecosystem |
| **A-MEM** | Zettelkasten self-organizing | <10us retrieval for 1M notes |

**Convergence:** hybrid search (FTS + vector), tiered memory (hot/warm/cold), automatic capture.

## 3. Cognitive Science Models

| Model | Year | Key Insight |
| --- | --- | --- |
| **Atkinson-Shiffrin** | 1968 | Transfer bottleneck (rehearsal) |
| **Baddeley Working Memory** | 1974 | Specialized channels, not flat buffer |
| **Tulving's Memory Systems** | 1972 | LLMs weak at episodic, can't update procedural |
| **Ebbinghaus Forgetting Curve** | 1885 | Recency-sorted boot context violates the curve |
| **Lost in the Middle** | 2024 | Context injection ORDER matters |

### Cognitive Mapping to Engram

| Brain Structure | Engram Component | Role |
| --- | --- | --- |
| Hippocampus | Context window | Temporary buffer, fast access |
| Neocortex | Engram SQLite | Vast capacity, slow to write |
| Sleep consolidation | Session-end summary | Replay + compress + transfer |
| Attention gating | Save rules | Encode what you attend to |
| Reconsolidation | Upsert/topic_key | Modified on every retrieval |
| Forgetting | Compaction | Noise reduction |

## 4. Future Directions

1. **Infinite Context** — More context != better; retrieval always needed
2. **Learned Retrieval** — Credit assignment is the barrier
3. **Cross-Session State** — The fundamental problem engram solves
4. **Memory Consolidation ("Sleep")** — Offline reorganization = L1/L2 tiers
5. **Attention as Memory Selection** — External and internal are complementary
6. **Sparse/Efficient Transformers** — Curated context becomes MORE valuable

## 5. Engram Gaps & Vision

**Gaps:** Sessions ephemeral (critical), FTS5 misses conceptual queries (high), boot context is dumb (high), two competing memory systems (medium), no automatic capture (medium).

**Vision:** Hybrid search → Smart injection → Auto-capture → L1/L2 tiers → Offline consolidation

## 6. Neuroscience

Brain replays experiences during sleep at **20x speed**. Brain uses **~20 watts** for a lifetime of memories. London taxi drivers have **physically larger hippocampi**. Memories are **reconstructive, not reproductive**.

## 7. SurrealDB Evaluation

Native hybrid FTS + vector search. Embeddable in Rust. Replaces entire stack. Risks: write engine maturity, FTS bugs, BSL license. **Recommendation:** Prototype behind trait abstraction, keep SQLite fallback.
