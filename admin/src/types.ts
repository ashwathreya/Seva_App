/**
 * Aligned with mobile app `src/types` — extended for admin ops.
 */
export type UserRole = 'customer' | 'pro';

export type AccountStatus = 'active' | 'pending_review' | 'suspended';

export type VettingStatus = 'n/a' | 'pending' | 'approved' | 'rejected';

export type SevaUser = {
  id: string;
  phone: string;
  role: UserRole;
  displayName: string;
  locationLabel?: string;
  photoUrl?: string;
  createdAt: string;
  accountStatus: AccountStatus;
  vettingStatus: VettingStatus;
  /** Mock doc labels for vetting UI */
  mockDocuments?: string[];
};

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
  flagged?: boolean;
};

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

export type DisputeStatus = 'open' | 'resolved_refund' | 'resolved_partial';

export type Dispute = {
  id: string;
  bookingId: string;
  customerId: string;
  proId?: string;
  reason: string;
  notes: string;
  status: DisputeStatus;
  createdAt: string;
};
