/**
 * US metro–style task pricing (NJ / NYC-adjacent), inspired by typical TaskRabbit
 * cost-guide ranges: hourly bands vary by category; we convert to typical task totals.
 * @see https://www.taskrabbit.com/blog/how-much-does-it-cost-to-hire-a-tasker
 * @see https://www.taskrabbit.com/cost-guides/general-handyman
 */
import type { EffortLevel } from '../types';

type Band = { minCents: number; maxCents: number };

const BANDS: Record<string, Record<EffortLevel, Band>> = {
  cleaning: {
    Light: { minCents: 7200, maxCents: 9800 },
    Medium: { minCents: 9800, maxCents: 14800 },
    Heavy: { minCents: 16800, maxCents: 24500 },
  },
  repair: {
    Light: { minCents: 6500, maxCents: 9200 },
    Medium: { minCents: 8800, maxCents: 13800 },
    Heavy: { minCents: 14800, maxCents: 22500 },
  },
  moving: {
    Light: { minCents: 11800, maxCents: 17500 },
    Medium: { minCents: 18500, maxCents: 28500 },
    Heavy: { minCents: 32000, maxCents: 52000 },
  },
  mounting: {
    Light: { minCents: 6900, maxCents: 9800 },
    Medium: { minCents: 8900, maxCents: 14500 },
    Heavy: { minCents: 12500, maxCents: 19500 },
  },
  assembly: {
    Light: { minCents: 5500, maxCents: 8500 },
    Medium: { minCents: 8200, maxCents: 13500 },
    Heavy: { minCents: 13800, maxCents: 21500 },
  },
  yard: {
    Light: { minCents: 6800, maxCents: 10200 },
    Medium: { minCents: 9500, maxCents: 15800 },
    Heavy: { minCents: 15500, maxCents: 24800 },
  },
  plumbing: {
    Light: { minCents: 9500, maxCents: 13800 },
    Medium: { minCents: 12800, maxCents: 19800 },
    Heavy: { minCents: 19800, maxCents: 32500 },
  },
  electrical: {
    Light: { minCents: 10500, maxCents: 15500 },
    Medium: { minCents: 14500, maxCents: 22800 },
    Heavy: { minCents: 22500, maxCents: 36500 },
  },
  childcare: {
    Light: { minCents: 5600, maxCents: 8200 },
    Medium: { minCents: 8200, maxCents: 13200 },
    Heavy: { minCents: 13200, maxCents: 20500 },
  },
  errands: {
    Light: { minCents: 3200, maxCents: 5200 },
    Medium: { minCents: 4800, maxCents: 7800 },
    Heavy: { minCents: 7200, maxCents: 11500 },
  },
  other: {
    Light: { minCents: 5500, maxCents: 8500 },
    Medium: { minCents: 7200, maxCents: 12500 },
    Heavy: { minCents: 11500, maxCents: 18500 },
  },
};

function fmt(cents: number) {
  return `$${Math.round(cents / 100)}`;
}

export function formatPriceRangeLabel(minCents: number, maxCents: number) {
  return `${fmt(minCents)} – ${fmt(maxCents)}`;
}

export function estimateForCategoryAndEffort(
  categoryId: string,
  effort: EffortLevel,
): { minCents: number; maxCents: number; priceRangeLabel: string } {
  const band = BANDS[categoryId]?.[effort] ?? BANDS.other[effort];
  return {
    minCents: band.minCents,
    maxCents: band.maxCents,
    priceRangeLabel: formatPriceRangeLabel(band.minCents, band.maxCents),
  };
}

/** “From $X” tiles on Home — aligned with category labor, not flat $42–$55 everywhere. */
export const POPULAR_SERVICE_TILES: {
  title: string;
  fromLabel: string;
  categoryId: string;
}[] = [
  { title: 'Deep cleaning', fromLabel: 'From $98', categoryId: 'cleaning' },
  { title: 'Handyman & fixes', fromLabel: 'From $65', categoryId: 'repair' },
  { title: 'TV & mounting', fromLabel: 'From $69', categoryId: 'mounting' },
  { title: 'Furniture build', fromLabel: 'From $55', categoryId: 'assembly' },
  { title: 'Moving help', fromLabel: 'From $118', categoryId: 'moving' },
  { title: 'Yard & outdoor', fromLabel: 'From $68', categoryId: 'yard' },
  { title: 'Plumbing', fromLabel: 'From $95', categoryId: 'plumbing' },
  { title: 'Electrical', fromLabel: 'From $105', categoryId: 'electrical' },
];
