import type { Booking, Dispute, Job, SevaUser } from './types';

export type SeedScenario = 'light' | 'heavy';

export const seedUsers: SevaUser[] = [
  {
    id: 'u_c1',
    phone: '+15551230101',
    role: 'customer',
    displayName: 'Alex Rivera',
    locationLabel: 'Jersey City, NJ',
    createdAt: '2026-03-10T12:00:00Z',
    accountStatus: 'active',
    vettingStatus: 'n/a',
  },
  {
    id: 'u_p1',
    phone: '+15559876543',
    role: 'pro',
    displayName: 'Jordan Kim',
    locationLabel: 'Newark, NJ',
    createdAt: '2026-03-08T10:00:00Z',
    accountStatus: 'active',
    vettingStatus: 'approved',
    mockDocuments: ['ID.pdf', 'background_check.pdf'],
  },
  {
    id: 'u_p2',
    phone: '+15551112233',
    role: 'pro',
    displayName: 'Sam Okonkwo',
    locationLabel: 'Hoboken, NJ',
    createdAt: '2026-04-01T09:00:00Z',
    accountStatus: 'pending_review',
    vettingStatus: 'pending',
    mockDocuments: ['drivers_license.jpg', 'w9.pdf'],
  },
  {
    id: 'u_p3',
    phone: '+15554445555',
    role: 'pro',
    displayName: 'Taylor Chen',
    createdAt: '2026-04-02T14:00:00Z',
    accountStatus: 'suspended',
    vettingStatus: 'rejected',
    mockDocuments: ['id_scan.png'],
  },
];

export const seedBookings: Booking[] = [
  {
    id: 'bk_101',
    customerId: 'u_c1',
    serviceCategoryId: 'cleaning',
    title: 'Home Cleaning request',
    description: '[Medium] Kitchen deep clean',
    imageUris: [],
    estimateCents: 5500,
    status: 'requested',
    createdAt: '2026-04-05T11:00:00Z',
    updatedAt: '2026-04-05T11:00:00Z',
    flagged: true,
  },
  {
    id: 'bk_102',
    customerId: 'u_c1',
    serviceCategoryId: 'repair',
    title: 'Handyman & Repair request',
    description: '[Light] Patch drywall',
    imageUris: [],
    estimateCents: 4200,
    status: 'assigned',
    proId: 'u_p1',
    createdAt: '2026-04-04T16:00:00Z',
    updatedAt: '2026-04-05T09:00:00Z',
  },
  {
    id: 'bk_103',
    customerId: 'u_c1',
    serviceCategoryId: 'moving',
    title: 'Moving & Delivery request',
    description: 'Single couch — 2nd floor',
    imageUris: [],
    estimateCents: 8000,
    status: 'in_progress',
    proId: 'u_p1',
    createdAt: '2026-04-03T08:00:00Z',
    updatedAt: '2026-04-05T10:00:00Z',
  },
];

export const seedJobs: Job[] = [
  {
    id: 'job_1',
    bookingId: 'bk_102',
    proId: 'u_p1',
    title: 'Handyman & Repair request',
    payoutCents: 3800,
    status: 'assigned',
    createdAt: '2026-04-05T09:00:00Z',
  },
  {
    id: 'job_2',
    bookingId: 'bk_103',
    proId: 'u_p1',
    title: 'Moving & Delivery request',
    payoutCents: 7200,
    status: 'in_progress',
    createdAt: '2026-04-05T10:00:00Z',
  },
];

export const seedDisputes: Dispute[] = [
  {
    id: 'dsp_1',
    bookingId: 'bk_101',
    customerId: 'u_c1',
    reason: 'Scope mismatch — customer expected whole apt',
    notes: '',
    status: 'open',
    createdAt: '2026-04-05T18:00:00Z',
  },
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function heavyData() {
  const users = clone(seedUsers);
  const bookings = clone(seedBookings);
  const jobs = clone(seedJobs);
  const disputes = clone(seedDisputes);

  // Add a few approved providers
  users.push(
    {
      id: 'u_p4',
      phone: '+15556660001',
      role: 'pro',
      displayName: 'Casey Lopez',
      locationLabel: 'Jersey City, NJ',
      createdAt: '2026-04-02T09:00:00Z',
      accountStatus: 'active',
      vettingStatus: 'approved',
      mockDocuments: ['id_card.pdf', 'background_check.pdf'],
    },
    {
      id: 'u_p5',
      phone: '+15556660002',
      role: 'pro',
      displayName: 'Priya Nair',
      locationLabel: 'Hoboken, NJ',
      createdAt: '2026-04-02T10:00:00Z',
      accountStatus: 'active',
      vettingStatus: 'approved',
      mockDocuments: ['id_scan.png'],
    },
  );

  for (let i = 0; i < 12; i += 1) {
    const id = `bk_h${i + 1}`;
    const assigned = i % 3 === 0;
    const inProgress = i % 5 === 0;
    const completed = i % 7 === 0;
    const proId = assigned || inProgress || completed ? (i % 2 === 0 ? 'u_p4' : 'u_p5') : undefined;
    const status = completed
      ? 'completed'
      : inProgress
      ? 'in_progress'
      : assigned
      ? 'assigned'
      : 'requested';
    bookings.push({
      id,
      customerId: 'u_c1',
      serviceCategoryId: i % 2 === 0 ? 'cleaning' : 'repair',
      title: i % 2 === 0 ? 'Home Cleaning request' : 'Handyman & Repair request',
      description: i % 2 === 0 ? 'Deep clean requested' : 'Fix cabinet hinge',
      imageUris: [],
      estimateCents: 3500 + i * 450,
      status,
      proId,
      createdAt: new Date(Date.now() - i * 3600_000).toISOString(),
      updatedAt: new Date(Date.now() - i * 1800_000).toISOString(),
      flagged: i % 6 === 0,
    });
    if (proId) {
      jobs.push({
        id: `job_h${i + 1}`,
        bookingId: id,
        proId,
        title: i % 2 === 0 ? 'Home Cleaning request' : 'Handyman & Repair request',
        payoutCents: Math.floor((3500 + i * 450) * 0.85),
        status: status as Job['status'],
        createdAt: new Date(Date.now() - i * 3000_000).toISOString(),
      });
    }
  }

  disputes.push({
    id: 'dsp_h2',
    bookingId: 'bk_h6',
    customerId: 'u_c1',
    proId: 'u_p4',
    reason: 'Late arrival and scope disagreement',
    notes: '',
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
  });

  return { users, bookings, jobs, disputes };
}

export function getSeedData(scenario: SeedScenario) {
  if (scenario === 'heavy') return heavyData();
  return {
    users: clone(seedUsers),
    bookings: clone(seedBookings),
    jobs: clone(seedJobs),
    disputes: clone(seedDisputes),
  };
}
