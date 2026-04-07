/**
 * Auth — structured for Firebase/OTP later; mock implementation now.
 */
import type { SevaUser, UserRole } from '../types';

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export type SendOtpResult = { ok: true } | { ok: false; error: string };

export async function sendOtpMock(phone: string): Promise<SendOtpResult> {
  await delay(400);
  const normalized = phone.replace(/\D/g, '');
  if (normalized.length < 10) {
    return { ok: false, error: 'Enter a valid mobile number.' };
  }
  return { ok: true };
}

export async function verifyOtpMock(
  _phone: string,
  code: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay(500);
  if (code.length < 4) {
    return { ok: false, error: 'Invalid code.' };
  }
  return { ok: true };
}

export function buildNewUser(partial: {
  id: string;
  phone: string;
  role: UserRole;
  displayName: string;
  locationLabel?: string;
  photoUrl?: string;
}): SevaUser {
  return {
    ...partial,
    createdAt: new Date().toISOString(),
  };
}
