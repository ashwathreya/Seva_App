/**
 * Pro jobs — mock list; later from Firestore queries.
 */
import type { Job } from '../types';

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const seedJobs: Job[] = [
  {
    id: 'job_1',
    bookingId: 'bk_seed_1',
    proId: '',
    title: 'Deep clean — 2BR apartment',
    payoutCents: 12000,
    status: 'requested',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'job_2',
    bookingId: 'bk_seed_2',
    proId: '',
    title: 'Furniture assembly (IKEA)',
    payoutCents: 8500,
    status: 'requested',
    createdAt: new Date().toISOString(),
  },
];

let mockJobs: Job[] = [...seedJobs];

export async function listOpenJobs(): Promise<Job[]> {
  await delay(200);
  return mockJobs.filter((j) => j.status === 'requested' && !j.proId);
}

export async function listJobsForPro(proId: string): Promise<Job[]> {
  await delay(200);
  return mockJobs.filter((j) => j.proId === proId);
}

export async function acceptJob(
  jobId: string,
  proId: string,
): Promise<Job | null> {
  await delay(300);
  const idx = mockJobs.findIndex((j) => j.id === jobId);
  if (idx < 0) return null;
  const j = mockJobs[idx];
  if (j.proId) return j;
  const updated: Job = { ...j, proId, status: 'assigned' };
  mockJobs[idx] = updated;
  return updated;
}

export function resetMockJobs(): void {
  mockJobs = [...seedJobs];
}
