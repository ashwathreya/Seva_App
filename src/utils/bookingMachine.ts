import type { BookingStatus } from '../types';

const transitions: Record<BookingStatus, BookingStatus[]> = {
  draft: ['requested', 'cancelled'],
  requested: ['assigned', 'cancelled'],
  assigned: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: ['approved', 'cancelled'],
  approved: [],
  cancelled: [],
};

export function canTransitionBooking(
  from: BookingStatus,
  to: BookingStatus,
): boolean {
  return transitions[from]?.includes(to) ?? false;
}

export function nextBookingStatuses(from: BookingStatus): BookingStatus[] {
  return transitions[from] ?? [];
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  draft: 'Draft',
  requested: 'Searching',
  assigned: 'Assigned',
  in_progress: 'In progress',
  completed: 'Awaiting approval',
  approved: 'Approved',
  cancelled: 'Cancelled',
};
