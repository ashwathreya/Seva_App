/**
 * Booking lifecycle — single source of truth for status.
 */
export type BookingStatus =
  | 'draft'
  | 'requested'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'approved'
  | 'cancelled';

export type Booking = {
  id: string;
  customerId: string;
  serviceCategoryId: string;
  title: string;
  description: string;
  imageUris: string[];
  estimateCents: number;
  status: BookingStatus;
  proId?: string;
  createdAt: string;
  updatedAt: string;
};
