/**
 * Customer bookings — mock persistence; swap for Firestore later.
 */
import type { Booking, BookingStatus } from '../types';
import { canTransitionBooking } from '../utils/bookingMachine';

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

let mockBookings: Booking[] = [];

export async function listBookingsForCustomer(
  customerId: string,
): Promise<Booking[]> {
  await delay(200);
  return mockBookings.filter((b) => b.customerId === customerId);
}

export async function createBookingDraft(
  partial: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
): Promise<Booking> {
  await delay(250);
  const now = new Date().toISOString();
  const b: Booking = {
    ...partial,
    id: `bk_${Date.now()}`,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  };
  mockBookings = [b, ...mockBookings];
  return b;
}

export async function patchBookingStatus(
  id: string,
  next: BookingStatus,
): Promise<Booking | null> {
  await delay(200);
  const idx = mockBookings.findIndex((b) => b.id === id);
  if (idx < 0) return null;
  const cur = mockBookings[idx];
  if (!canTransitionBooking(cur.status, next)) {
    return cur;
  }
  const updated = { ...cur, status: next, updatedAt: new Date().toISOString() };
  mockBookings[idx] = updated;
  return updated;
}

export function resetMockBookings(): void {
  mockBookings = [];
}
