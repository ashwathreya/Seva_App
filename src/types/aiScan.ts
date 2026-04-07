export type EffortLevel = 'Light' | 'Medium' | 'Heavy';

/** Structured result from vision / AI (mocked today). */
export type AiTaskAnalysis = {
  categoryId: string;
  categoryLabel: string;
  description: string;
  effort: EffortLevel;
  priceRangeLabel: string;
  estimateCentsMin: number;
  estimateCentsMax: number;
};
