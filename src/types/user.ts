export type UserRole = 'customer' | 'pro';
export type AccountStatus = 'active' | 'pending_review' | 'suspended';
export type VettingStatus = 'n/a' | 'pending' | 'approved' | 'rejected';

/** Shown on customer-facing pro profile (portfolio = past jobs). */
export type ProPublicProfile = {
  tagline: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  /** Typical ask, e.g. “from $52/hr” — illustrative vs category rate cards. */
  rateHint: string;
  responseTimeLabel: string;
  specialties: string[];
  /** Completed-job photos (remote URLs for demo). */
  portfolioImageUris: string[];
  languages?: string[];
};

export type SevaUser = {
  id: string;
  phone: string;
  role: UserRole;
  displayName: string;
  locationLabel?: string;
  photoUrl?: string;
  accountStatus?: AccountStatus;
  vettingStatus?: VettingStatus;
  mockDocuments?: string[];
  createdAt: string;
  proProfile?: ProPublicProfile;
};
