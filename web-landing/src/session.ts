const STORAGE_KEY = 'seva_session_v1';

export type SessionUser = {
  displayName: string;
  email: string;
  /** `false` until the user finishes the trust onboarding (set on new signups). Omitted/`true` = done or legacy session. */
  onboardingComplete?: boolean;
};

export function loadSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as SessionUser;
    if (typeof p?.displayName === 'string' && typeof p?.email === 'string') {
      return {
        displayName: p.displayName,
        email: p.email,
        onboardingComplete: p.onboardingComplete === false ? false : true,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function saveSession(user: SessionUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

/** First word of full name for compact UI */
export function firstName(displayName: string) {
  return displayName.trim().split(/\s+/)[0] || displayName;
}

export function displayNameFromLoginId(id: string) {
  const t = id.trim();
  if (!t) return 'Member';
  if (t.includes('@')) {
    const local = t.split('@')[0]?.replace(/[._-]+/g, ' ') ?? 'Member';
    return local.charAt(0).toUpperCase() + local.slice(1).toLowerCase();
  }
  return 'Member';
}

export function emailFromLoginId(id: string) {
  const t = id.trim();
  if (t.includes('@')) return t.toLowerCase();
  return `${t.replace(/\D/g, '') || 'member'}@seva.local`;
}
