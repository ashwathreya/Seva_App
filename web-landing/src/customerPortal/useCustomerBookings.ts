import { useCallback, useEffect, useState } from 'react';
import {
  appendBooking,
  bookingStats,
  loadBookings,
  partitionBookings,
  type CustomerBooking,
} from './bookingsStore';

export type BookingsPhase = 'loading' | 'ready' | 'error';

export function useCustomerBookings() {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [phase, setPhase] = useState<BookingsPhase>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setPhase('loading');
    setErrorMessage(null);
    window.setTimeout(() => {
      try {
        setBookings(loadBookings());
        setPhase('ready');
      } catch {
        setErrorMessage('We couldn’t load your bookings. Pull to refresh or try again.');
        setPhase('error');
      }
    }, 260);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addBooking = useCallback((partial: Omit<CustomerBooking, 'id' | 'createdAt'>) => {
    try {
      appendBooking(partial);
      setBookings(loadBookings());
      setPhase('ready');
      setErrorMessage(null);
    } catch {
      setErrorMessage('Could not save your booking. Please try again.');
      setPhase('error');
    }
  }, []);

  const stats = bookingStats(bookings);
  const { upcoming, past } = partitionBookings(bookings);

  return {
    bookings,
    upcoming,
    past,
    stats,
    phase,
    errorMessage,
    refresh,
    addBooking,
  };
}
