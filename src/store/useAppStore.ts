import { create } from 'zustand';
import type { Booking, BookingStatus, Dispute, Job, SevaUser } from '../types';

type AppState = {
  user: SevaUser | null;
  users: SevaUser[];
  bookings: Booking[];
  jobs: Job[];
  disputes: Dispute[];
  setUser: (user: SevaUser | null) => void;
  setUsers: (users: SevaUser[]) => void;
  approveProvider: (userId: string) => void;
  rejectProvider: (userId: string) => void;
  suspendUser: (userId: string) => void;
  activateUser: (userId: string) => void;
  setBookings: (bookings: Booking[]) => void;
  upsertBooking: (booking: Booking) => void;
  assignBookingProvider: (bookingId: string, proId: string) => void;
  rejectAvailableBooking: (bookingId: string) => void;
  approveBookingCompletion: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  setJobs: (jobs: Job[]) => void;
  upsertJob: (job: Job) => void;
  setJobInProgress: (jobId: string) => void;
  setJobCompleted: (jobId: string) => void;
  setDisputes: (disputes: Dispute[]) => void;
  setDisputeNotes: (disputeId: string, notes: string) => void;
  resolveDisputeRefund: (disputeId: string) => void;
  resolveDisputePartial: (disputeId: string) => void;
  resetSession: () => void;
};

const now = () => new Date().toISOString();

const seedUsers: SevaUser[] = [
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
    proProfile: {
      tagline: 'Handyman · mounts · assembly — North NJ',
      bio: '130+ marketplace tasks: careful TV and shelf installs, drywall prep, IKEA/office builds, and small fixes. Quotes scope before tools come out; photos below are from jobs customers agreed to share.',
      rating: 4.9,
      reviewsCount: 128,
      jobsCompleted: 128,
      rateHint: '~$52–72/hr · quick fixes often $65–95',
      responseTimeLabel: 'Usually within 1 hour',
      specialties: [
        'TV & bracket mounting',
        'Furniture assembly',
        'Drywall patch / paint prep',
        'Hardware & trim',
        'Minor plumbing (swap/fixtures)',
      ],
      portfolioImageUris: [
        'https://images.unsplash.com/photo-1504148455328-cb29f4f0c666?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      ],
      languages: ['English', 'Korean'],
    },
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
    proProfile: {
      tagline: 'Moving crew · load/unload · tight stairs',
      bio: 'Former moving lead for North Jersey jobs; comfortable protecting hallways, wrapping furniture, and crew coordination. Profile live while SEVA finishes document review — past job photos from prior work.',
      rating: 4.85,
      reviewsCount: 90,
      jobsCompleted: 90,
      rateHint: '~$45–68/hr · two-person blocks from ~$140',
      responseTimeLabel: 'Often same day',
      specialties: [
        'Local moves',
        'Load & unload',
        'Appliance delivery',
        'Staging & rearrange',
      ],
      portfolioImageUris: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      ],
      languages: ['English'],
    },
  },
];

const seedBookings: Booking[] = [
  {
    id: 'bk_101',
    customerId: 'u_c1',
    serviceCategoryId: 'cleaning',
    title: 'Home cleaning',
    description: '[Medium] Kitchen + living · ~2.5 hr (typical home)',
    imageUris: [],
    estimateCents: 12300,
    status: 'requested',
    createdAt: '2026-04-05T11:00:00Z',
    updatedAt: '2026-04-05T11:00:00Z',
  },
  {
    id: 'bk_102',
    customerId: 'u_c1',
    serviceCategoryId: 'repair',
    title: 'Handyman visit',
    description: '[Medium] Drywall patch + sand + spot prime',
    imageUris: [],
    estimateCents: 11300,
    status: 'assigned',
    proId: 'u_p1',
    createdAt: '2026-04-04T16:00:00Z',
    updatedAt: '2026-04-05T09:00:00Z',
  },
];

const seedJobs: Job[] = [
  {
    id: 'job_1',
    bookingId: 'bk_102',
    proId: 'u_p1',
    title: 'Handyman visit',
    payoutCents: Math.floor(11300 * 0.85),
    status: 'assigned',
    createdAt: '2026-04-05T09:00:00Z',
  },
];

const seedDisputes: Dispute[] = [
  {
    id: 'dsp_1',
    bookingId: 'bk_101',
    customerId: 'u_c1',
    reason: 'Scope mismatch — customer expected full kitchen + dining',
    notes: '',
    status: 'open',
    createdAt: '2026-04-05T18:00:00Z',
  },
];

export const useAppStore = create<AppState>((set) => ({
  user: null,
  users: seedUsers,
  bookings: seedBookings,
  jobs: seedJobs,
  disputes: seedDisputes,
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  approveProvider: (userId) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId && u.role === 'pro'
          ? { ...u, vettingStatus: 'approved', accountStatus: 'active' }
          : u,
      ),
    })),
  rejectProvider: (userId) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId && u.role === 'pro'
          ? { ...u, vettingStatus: 'rejected', accountStatus: 'suspended' }
          : u,
      ),
    })),
  suspendUser: (userId) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId ? { ...u, accountStatus: 'suspended' } : u,
      ),
    })),
  activateUser: (userId) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId ? { ...u, accountStatus: 'active' } : u,
      ),
    })),
  setBookings: (bookings) => set({ bookings }),
  upsertBooking: (booking) =>
    set((s) => ({
      bookings: [
        booking,
        ...s.bookings.filter((b) => b.id !== booking.id),
      ],
    })),
  assignBookingProvider: (bookingId, proId) =>
    set((s) => {
      const target = s.bookings.find((b) => b.id === bookingId);
      if (!target) return s;
      const bookings = s.bookings.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              proId,
              status: 'assigned' as BookingStatus,
              updatedAt: now(),
            }
          : b,
      );
      const exists = s.jobs.some((j) => j.bookingId === bookingId);
      const jobs = exists
        ? s.jobs.map((j) =>
            j.bookingId === bookingId
              ? { ...j, proId, status: 'assigned' as BookingStatus }
              : j,
          )
        : [
            ...s.jobs,
            {
              id: `job_${Date.now()}`,
              bookingId,
              proId,
              title: target.title,
              payoutCents: Math.floor(target.estimateCents * 0.85),
              status: 'assigned' as BookingStatus,
              createdAt: now(),
            },
          ];
      return { bookings, jobs };
    }),
  rejectAvailableBooking: (bookingId) =>
    set((s) => ({
      bookings: s.bookings.map((b) =>
        b.id === bookingId && b.status === 'requested' && !b.proId
          ? { ...b, status: 'cancelled', updatedAt: now() }
          : b,
      ),
    })),
  approveBookingCompletion: (bookingId) =>
    set((s) => ({
      bookings: s.bookings.map((b) =>
        b.id === bookingId && b.status === 'completed'
          ? { ...b, status: 'approved', updatedAt: now() }
          : b,
      ),
      jobs: s.jobs.map((j) =>
        j.bookingId === bookingId && j.status === 'completed'
          ? { ...j, status: 'approved' as BookingStatus }
          : j,
      ),
    })),
  cancelBooking: (bookingId) =>
    set((s) => ({
      bookings: s.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'cancelled', updatedAt: now() }
          : b,
      ),
      jobs: s.jobs.map((j) =>
        j.bookingId === bookingId ? { ...j, status: 'cancelled' } : j,
      ),
    })),
  setJobs: (jobs) => set({ jobs }),
  upsertJob: (job) =>
    set((s) => ({
      jobs: [job, ...s.jobs.filter((j) => j.id !== job.id)],
    })),
  setJobInProgress: (jobId) =>
    set((s) => {
      const target = s.jobs.find((j) => j.id === jobId);
      if (!target) return s;
      return {
        jobs: s.jobs.map((j) =>
          j.id === jobId ? { ...j, status: 'in_progress' } : j,
        ),
        bookings: s.bookings.map((b) =>
          b.id === target.bookingId
            ? { ...b, status: 'in_progress', updatedAt: now() }
            : b,
        ),
      };
    }),
  setJobCompleted: (jobId) =>
    set((s) => {
      const target = s.jobs.find((j) => j.id === jobId);
      if (!target) return s;
      return {
        jobs: s.jobs.map((j) =>
          j.id === jobId ? { ...j, status: 'completed' } : j,
        ),
        bookings: s.bookings.map((b) =>
          b.id === target.bookingId
            ? { ...b, status: 'completed', updatedAt: now() }
            : b,
        ),
      };
    }),
  setDisputes: (disputes) => set({ disputes }),
  setDisputeNotes: (disputeId, notes) =>
    set((s) => ({
      disputes: s.disputes.map((d) =>
        d.id === disputeId ? { ...d, notes } : d,
      ),
    })),
  resolveDisputeRefund: (disputeId) =>
    set((s) => ({
      disputes: s.disputes.map((d) =>
        d.id === disputeId ? { ...d, status: 'resolved_refund' } : d,
      ),
    })),
  resolveDisputePartial: (disputeId) =>
    set((s) => ({
      disputes: s.disputes.map((d) =>
        d.id === disputeId ? { ...d, status: 'resolved_partial' } : d,
      ),
    })),
  resetSession: () =>
    set({
      user: null,
      users: seedUsers,
      bookings: seedBookings,
      jobs: seedJobs,
      disputes: seedDisputes,
    }),
}));
