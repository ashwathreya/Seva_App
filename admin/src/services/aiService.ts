import type { Booking } from '../types';

export type AiAnalysis = {
  category: string;
  description: string;
  effort: 'Light' | 'Medium' | 'Heavy';
  priceMin: number;
  priceMax: number;
};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeUploads(files: File[]): Promise<AiAnalysis> {
  await wait(1200 + Math.min(files.length * 450, 1800));
  if (files.length >= 2) {
    return {
      category: 'Handyman & Repair',
      description:
        'Likely minor repair and patch work. Recommend one visit with small materials.',
      effort: 'Medium',
      priceMin: 45,
      priceMax: 85,
    };
  }
  return {
    category: 'Home Cleaning',
    description:
      'Area appears to need focused deep cleaning (surfaces + sink/counter detail).',
    effort: 'Medium',
    priceMin: 40,
    priceMax: 70,
  };
}

export function toBookingPayload(input: {
  customerId: string;
  category: string;
  description: string;
  imageUris: string[];
  estimateCents: number;
  providerId?: string;
}): Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'> {
  return {
    customerId: input.customerId,
    proId: input.providerId,
    serviceCategoryId: input.category.toLowerCase().replace(/\s+/g, '_'),
    title: `${input.category} request`,
    description: input.description,
    imageUris: input.imageUris,
    estimateCents: input.estimateCents,
  };
}

