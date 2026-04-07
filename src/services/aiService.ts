/**
 * Vision / LLM analysis — mock today.
 * Replace internals with OpenAI Vision, custom endpoint, or on-device model.
 */
import type { AiTaskAnalysis, EffortLevel } from '../types';
import { SERVICE_CATEGORIES } from '../constants/serviceCategories';
import { estimateForCategoryAndEffort } from '../data/serviceMarketRates';

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const ROTATE_CATS = SERVICE_CATEGORIES.filter((c) => c.id !== 'other');

function pickEffort(imageCount: number): EffortLevel {
  const r = imageCount % 3;
  if (r === 0) return 'Light';
  if (r === 1) return 'Medium';
  return 'Heavy';
}

/**
 * @param imageUris local file URIs from camera or library (not uploaded yet).
 */
export async function analyzeImage(imageUris: string[]): Promise<AiTaskAnalysis> {
  const ms = 1600 + Math.min(imageUris.length * 400, 2000);
  await delay(ms);
  const n = imageUris.length || 1;
  const cat = ROTATE_CATS[n % ROTATE_CATS.length];
  const effort = pickEffort(n);
  const est = estimateForCategoryAndEffort(cat.id, effort);

  const descriptions: Record<string, string> = {
    cleaning:
      'Kitchen and living areas — wipe-down, floors, and visible surfaces need attention.',
    repair:
      'Small repair scope: patch, hardware, or touch-up work visible in the photos.',
    moving:
      'Load, unload, or reposition — estimate assumes standard residential access.',
    mounting:
      'Wall-mounted unit (TV, shelf, or bracket) — anchors and stud finding likely.',
    assembly:
      'Flat-pack or modular furniture — hardware and layout from your photos.',
    yard:
      'Outdoor tidy-up: debris, trimming edges, or patio sweep (weather dependent).',
    plumbing:
      'Visible fixture or supply line — likely short diagnostic + minor fix visit.',
    electrical:
      'Outlet, switch, or fixture — short licensed-style task (scope in photos).',
    childcare:
      'In-home supervision / activity block — rates reflect shorter booked windows.',
    errands:
      'Pickup, drop-off, or queue task — time + mileage style estimate.',
    other: 'General task — confirm details with a pro before work starts.',
  };

  return {
    categoryId: cat.id,
    categoryLabel: cat.label,
    description: descriptions[cat.id] ?? descriptions.other,
    effort,
    priceRangeLabel: est.priceRangeLabel,
    estimateCentsMin: est.minCents,
    estimateCentsMax: est.maxCents,
  };
}
