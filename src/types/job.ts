import type { BookingStatus } from './booking';

export type Job = {
  id: string;
  bookingId: string;
  proId: string;
  title: string;
  payoutCents: number;
  status: BookingStatus;
  scheduledAt?: string;
  createdAt: string;
};
