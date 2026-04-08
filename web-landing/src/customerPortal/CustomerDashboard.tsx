import { useCallback, useMemo, useState } from 'react';
import { firstName, type SessionUser } from '../session';
import { DEMO_PRO, US_CUSTOMER } from './copy';
import { useCustomerBookings } from './useCustomerBookings';
import { DashboardSkeleton } from './components/Skeleton';
import { MpCard } from './components/MpCard';
import { MpButton } from './components/MpButton';
import { StatTile } from './components/StatTile';
import { BookingRow } from './components/BookingRow';
import { EmptyState } from './components/EmptyState';
import { StrokeIcon } from './StrokeIcon';

const PV = {
  gold: '#F0A500',
  teal: '#0CB8B3',
} as const;

const SERVICE_TILES = [
  ['🚚', 'Move', '#EFF6FF', '#1D4ED8'],
  ['📦', 'Load-out', '#F0F9FF', '#0369A1'],
  ['👨‍🍳', 'Cook', '#FFF1F2', '#9F1239'],
  ['🧹', 'Clean', '#F0FFF4', '#166534'],
  ['👶', 'Sitter', '#FDF4FF', '#7E22CE'],
  ['🧺', 'Laundry', '#F5F3FF', '#5B21B6'],
  ['🛒', 'Errands', '#FFFBEB', '#B45309'],
  ['🔧', 'Handy', '#FFF7ED', '#9A3412'],
] as const;

type Props = {
  sessionUser: Pick<SessionUser, 'displayName' | 'email' | 'onboardingComplete'> | null;
  /** When session has no display name yet */
  fallbackGreetingName?: string;
  cityLabel: string;
  onBook: () => void;
  onViewProviders: () => void;
  onContactSupport: () => void;
  onOpenBookingStatus?: () => void;
};

function VerifiedBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(12,184,179,0.28)] bg-[rgba(12,184,179,0.1)] px-2.5 py-1 text-[8px] font-bold tracking-wide text-[#0B6B68]">
      <StrokeIcon name="shield" size={10} color={PV.teal} />
      Verified by Seva
    </span>
  );
}

export function CustomerDashboard({
  sessionUser,
  fallbackGreetingName = 'there',
  cityLabel,
  onBook,
  onViewProviders,
  onContactSupport,
  onOpenBookingStatus,
}: Props) {
  const { upcoming, past, stats, phase, errorMessage, refresh } = useCustomerBookings();
  const [actionKey, setActionKey] = useState<string | null>(null);

  const displayName = sessionUser?.displayName?.trim()
    ? sessionUser.displayName
    : fallbackGreetingName;
  const first = firstName(displayName);
  const initial = first.charAt(0).toUpperCase() || 'S';

  const account = useMemo(() => {
    if (sessionUser?.onboardingComplete === false) {
      return {
        label: 'Setup incomplete',
        detail: 'Finish the short trust intro to unlock priority matching.',
        pillClass: 'border-amber-200/80 bg-amber-50 text-amber-950',
      };
    }
    return {
      label: 'Verified member',
      detail: 'Background-checked marketplace · Escrow-protected payments',
      pillClass: 'border-[#0CB8B3]/30 bg-[#E6FAF9] text-[#0B6B68]',
    };
  }, [sessionUser]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const runQuick = useCallback(
    async (key: string, fn: () => void) => {
      setActionKey(key);
      await new Promise((r) => setTimeout(r, 320));
      try {
        fn();
      } finally {
        setActionKey(null);
      }
    },
    [],
  );

  if (phase === 'loading') {
    return (
      <div className="relative min-h-[480px] bg-[#F1F3F8] px-3.5 pb-[88px] pt-2.5 sm:px-[14px]">
        <DashboardSkeleton />
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="relative min-h-[480px] space-y-4 bg-[#F1F3F8] px-3.5 pb-[88px] pt-2.5 sm:px-[14px]">
        <MpCard>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg">!</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#991B1B]">We couldn’t refresh your dashboard</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{errorMessage}</p>
              <MpButton variant="secondary" className="mt-4" onClick={() => refresh()}>
                Retry
              </MpButton>
            </div>
          </div>
        </MpCard>
        <MpButton variant="primary" fullWidth onClick={onBook}>
          Book a service anyway
        </MpButton>
      </div>
    );
  }

  return (
    <div className="relative min-h-[480px] bg-[#F1F3F8] px-3.5 pb-[88px] pt-2.5 sm:px-[14px]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E6E9F0] bg-white font-serif text-xl font-bold text-[#0B0D12] shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            aria-hidden>
            {initial}
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-medium text-[#8892A6]">
              {greeting} <span aria-hidden>☀️</span>
            </p>
            <p className="truncate text-lg font-bold leading-tight text-[#0B0D12]">{first}</p>
            <p className="mt-1 truncate text-[11px] text-[#6B7280]">{sessionUser?.email ?? 'Signed in'}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-bold ${account.pillClass}`}>
                {account.label}
              </span>
              <p className="mt-1.5 text-[10px] leading-snug text-[#8892A6]">{account.detail}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-full border border-[#E8E8F0] bg-white py-2 pl-2.5 pr-3 text-[10px] font-semibold text-[#4B5563] shadow-sm transition hover:border-[#0CB8B3]/35 hover:bg-[#FAFBFD]">
          <StrokeIcon name="pin" size={12} color={PV.gold} />
          {cityLabel}
        </button>
      </header>

      <MpCard padding="sm" className="mb-4">
        <div className="flex gap-2.5">
          <StrokeIcon name="shield" size={18} color={PV.teal} />
          <p className="text-[11px] leading-relaxed text-[#4B5563]">
            Same vetting bar for every professional — no “basic” tier that still ranks in your results.
          </p>
        </div>
      </MpCard>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Overview</h2>
      </div>
      <div className="mb-5 grid grid-cols-3 gap-2">
        <StatTile label="Bookings" value={stats.total} sub="All time" accent="default" />
        <StatTile label="Upcoming" value={stats.upcoming} sub="Active" accent="teal" />
        <StatTile label="Done" value={stats.completed} sub="Completed" accent="gold" />
      </div>

      <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Quick actions</h2>
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <MpButton
          variant="primary"
          fullWidth
          loading={actionKey === 'book'}
          onClick={() => runQuick('book', onBook)}>
          Book a service
        </MpButton>
        <MpButton
          variant="secondary"
          fullWidth
          loading={actionKey === 'pros'}
          onClick={() => runQuick('pros', onViewProviders)}>
          View providers
        </MpButton>
        <MpButton
          variant="secondary"
          fullWidth
          loading={actionKey === 'help'}
          onClick={() =>
            runQuick('help', () => {
              window.location.href = 'mailto:support@seva.app?subject=SEVA%20—%20Customer%20support';
            })
          }>
          Contact support
        </MpButton>
      </div>

      <div id="customer-bookings-anchor" className="scroll-mt-4" />
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Upcoming</h2>
      <div className="mb-6 space-y-2">
        {upcoming.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No upcoming visits"
            description="When you request a service, confirmed appointments appear here with pro details and timing."
            actionLabel="Book a service"
            onAction={onBook}
            secondaryLabel="Browse featured professionals"
            onSecondary={onViewProviders}
          />
        ) : (
          upcoming.map((b) => (
            <BookingRow key={b.id} booking={b} onPress={onOpenBookingStatus} />
          ))
        )}
      </div>

      <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">History</h2>
      <div className="mb-6 space-y-2">
        {past.length === 0 ? (
          <EmptyState
            icon="✓"
            title="No completed jobs yet"
            description="After your first visit, receipts, photos, and re-book shortcuts show up here."
            actionLabel="Start with a fixed-price booking"
            onAction={onBook}
          />
        ) : (
          past.map((b) => <BookingRow key={b.id} booking={b} />)
        )}
      </div>

      <button
        type="button"
        onClick={onBook}
        className="mb-4 flex w-full items-center gap-2 rounded-xl border border-[#E8E8F0] bg-white px-3 py-3 text-left shadow-sm transition duration-200 hover:border-[#0CB8B3]/35 active:scale-[0.995]">
        <StrokeIcon name="search" size={18} color="#9CA3AF" />
        <span className="text-[13px] font-medium text-[#9CA3AF]">What do you need today?</span>
      </button>

      <button
        type="button"
        onClick={onBook}
        className="mb-4 w-full cursor-pointer rounded-xl border border-[rgba(240,165,0,0.18)] bg-gradient-to-br from-[#0B0D12] to-[#1B1F32] px-3 py-3 text-left transition duration-200 hover:opacity-95 active:scale-[0.995]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="mb-0.5 text-[9px] font-bold" style={{ color: PV.gold }}>
              {US_CUSTOMER.promoBadge}
            </p>
            <p className="text-xs font-bold text-white">{US_CUSTOMER.promoTitle}</p>
            <p className="mt-0.5 text-[9px] text-[#8896AA]">{US_CUSTOMER.promoSub}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-[#6B7280] line-through">{US_CUSTOMER.promoWas}</p>
            <p className="text-[18px] font-extrabold leading-tight" style={{ color: PV.gold }}>
              {US_CUSTOMER.promoNow}
            </p>
            <div
              className="mt-1 inline-block rounded-md px-2 py-1 text-[9px] font-bold"
              style={{ background: PV.gold, color: '#09090E' }}>
              Book now →
            </div>
          </div>
        </div>
      </button>

      <p className="mb-2 text-[11px] font-bold text-[#0B0D12]">All services</p>
      <div className="mb-5 grid grid-cols-4 gap-2">
        {SERVICE_TILES.map(([e, l, bg, tc]) => (
          <button
            key={l}
            type="button"
            onClick={onBook}
            className="rounded-xl py-2 text-center transition duration-200 hover:ring-2 hover:ring-[#F0A500]/35 active:scale-[0.98]"
            style={{ background: bg }}>
            <div className="text-base leading-none">{e}</div>
            <div className="mt-0.5 text-[7.5px] font-semibold leading-tight" style={{ color: tc }}>
              {l}
            </div>
          </button>
        ))}
      </div>

      <p className="mb-2 text-[11px] font-bold text-[#0B0D12]">Matched for you</p>
      <button
        type="button"
        onClick={onViewProviders}
        className="mb-5 flex w-full items-center gap-2.5 rounded-xl border border-[#E8E8F0] bg-white px-3 py-3 text-left shadow-sm transition duration-200 hover:border-[rgba(12,184,179,0.35)] active:scale-[0.995]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6B8CAE] to-[#3D5A73] text-sm font-extrabold text-white/90">
          {DEMO_PRO.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-[#0B0D12]">{DEMO_PRO.name}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#6B7280]">{US_CUSTOMER.proCustomerTagline}</p>
          <div className="mt-1.5">
            <VerifiedBadge />
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-bold text-[#0CB8B3]">View →</span>
      </button>

      <p className="mb-2 text-[11px] font-bold text-[#0B0D12]">Book again</p>
      <button
        type="button"
        onClick={onBook}
        className="flex w-full items-center gap-2 rounded-xl border border-[#EBEBF0] bg-white px-3 py-3 text-left shadow-sm transition hover:border-[#F0A500]/25 active:scale-[0.995]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FF] text-lg leading-none">
          {US_CUSTOMER.againEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-[#0B0D12]">{US_CUSTOMER.againLineTitle}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#6B7280]">{US_CUSTOMER.againLineSub}</p>
        </div>
        <span className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold" style={{ background: PV.gold, color: '#09090E' }}>
          {US_CUSTOMER.againAC}
        </span>
      </button>
    </div>
  );
}
