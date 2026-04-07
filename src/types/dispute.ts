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
