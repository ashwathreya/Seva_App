import type { AiTaskAnalysis } from '../types';

export type AiBookingStackParamList = {
  AiCamera: undefined;
  AiProcessing: { imageUris: string[] };
  AiReview: { imageUris: string[]; analysis: AiTaskAnalysis };
};
