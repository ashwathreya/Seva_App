const STORAGE_KEY = 'seva_customer_bookings_v1';

export type BookingStatus = 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type CustomerBooking = {
  id: string;
  serviceTitle: string;
  proName: string;
  priceLabel: string;
  /** Human-readable slot, e.g. "Tomorrow 10 AM" */
  scheduledLabel: string;
  status: BookingStatus;
  createdAt: string;
};

function isBooking(x: unknown): x is CustomerBooking {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.serviceTitle === 'string' &&
    typeof o.proName === 'string' &&
    typeof o.priceLabel === 'string' &&
    typeof o.scheduledLabel === 'string' &&
    typeof o.status === 'string' &&
    typeof o.createdAt === 'string'
  );
}

export function loadBookings(): CustomerBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBooking);
  } catch {
    return [];
  }
}

export function saveBookings(rows: CustomerBooking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function appendBooking(
  partial: Omit<CustomerBooking, 'id' | 'createdAt'>,
): CustomerBooking {
  const row: CustomerBooking = {
    ...partial,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `bk_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const all = loadBookings();
  saveBookings([row, ...all]);
  return row;
}

export function bookingStats(bookings: CustomerBooking[]) {
  const upcoming = bookings.filter((b) =>
    ['requested', 'confirmed', 'in_progress'].includes(b.status),
  ).length;
  const completed = bookings.filter((b) => b.status === 'completed').length;
  return {
    total: bookings.length,
    upcoming,
    completed,
  };
}

export function partitionBookings(bookings: CustomerBooking[]) {
  const upcoming = bookings.filter((b) => ['requested', 'confirmed', 'in_progress'].includes(b.status));
  const past = bookings.filter((b) => ['completed', 'cancelled'].includes(b.status));
  return { upcoming, past };
}
