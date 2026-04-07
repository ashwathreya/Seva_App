/**
 * Stripe / escrow — structure only. Simulate "pay & hold" without real charges.
 */
export type EscrowSimulation = {
  intentId: string;
  amountCents: number;
  held: boolean;
  released: boolean;
};

export async function createPayAndHoldIntentMock(
  amountCents: number,
): Promise<EscrowSimulation> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    intentId: `pi_mock_${Date.now()}`,
    amountCents,
    held: true,
    released: false,
  };
}

export async function releaseEscrowMock(intentId: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 300));
  return intentId.length > 0;
}
