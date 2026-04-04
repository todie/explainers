/**
 * Memory Research Data — Structured for React Components
 *
 * Four research categories:
 * 1. memoryManagers  — Alternative memory managers for LLM agents
 * 2. cognitiveModels — Memory models from cognitive science applied to AI
 * 3. futureDirections — Open problems and future research directions
 * 4. engramMotivation — The specific motivation for engram
 */

export {
  MEMORY_MANAGERS,
  COMPARISON_DIMENSIONS,
  FEATURE_MATRIX,
  type MemoryManager,
  type ComparisonDimension,
} from "./memoryManagers";

export {
  COGNITIVE_MODELS,
  type CognitiveModel,
  type CognitiveComponent,
} from "./cognitiveModels";

export {
  FUTURE_DIRECTIONS,
  CATEGORY_META,
  STATUS_META,
  type FutureDirection,
} from "./futureDirections";

export {
  GAPS,
  VISION,
  COGNITIVE_MAPPINGS,
  REFERENCES,
  type Gap,
  type VisionElement,
  type CognitiveMapping,
  type Reference,
} from "./engramMotivation";
