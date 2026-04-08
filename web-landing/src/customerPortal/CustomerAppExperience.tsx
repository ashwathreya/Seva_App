import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { firstName } from '../session';
import { DEMO_PRO, ONBOARD_STEPS, US_CUSTOMER } from './copy';

/** Preview.html tokens: G gold, T teal, BG on-gold text */
const PV = {
  gold: '#F0A500',
  teal: '#0CB8B3',
  onGold: '#09090E',
  muted: '#7E8EA4',
  body: '#5C6578',
  ink: '#0B0D12',
} as const;

const STROKE_PATHS: Record<string, string[]> = {
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10'],
  check: ['M20 6L9 17l-5-5'],
  msg: ['M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z'],
  lock: ['M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2', 'M7 11V7a5 5 0 0110 0v4'],
  pin: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  search: ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0'],
  home: ['M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'M9 22V12h6v10'],
  bell: ['M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 01-3.46 0'],
  user: ['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', 'M12 11a4 4 0 100-8 4 4 0 000 8'],
  life: ['M22 12h-4l-3 9L9 3l-3 9H2'],
};

function StrokeIcon({ name, size, color, className }: { name: string; size: number; color: string; className?: string }) {
  const paths = STROKE_PATHS[name] ?? [];
  return (
    <svg
      className={`shrink-0 ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden>
      {paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export type CustomerAppScreen =
  | 'onboarding'
  | 'home'
  | 'profile'
  | 'chat'
  | 'booking'
  | 'pricing'
  | 'confirm'
  | 'tracking';

/** @deprecated use CustomerAppScreen */
export type CustomerPortalScreen = CustomerAppScreen;

type Screen = CustomerAppScreen;

type PricingReturn = 'booking' | 'confirm' | 'home';

function TrustLayerStrip({ compact = false }: { compact?: boolean }) {
  const rows: [ReactNode, string][] = [
    [<StrokeIcon key="s" name="shield" size={11} color="#2D6A4F" />, 'Background verification on every professional — no “light” onboarding tier'],
    [<StrokeIcon key="l" name="lock" size={11} color="#1B4F72" />, 'Escrow: funds release when you approve — not on an automatic timer'],
    [<StrokeIcon key="e" name="life" size={11} color="#B45309" />, '24/7 emergency line during active visits — not a ticket queue'],
  ];
  return (
    <div
      className={`rounded-[10px] border border-[#E4E7EF] bg-gradient-to-b from-[#FAFBFD] to-[#F4F6FA] text-[#5C6578] ${
        compact ? 'mb-2.5 flex flex-col gap-1.5 px-2.5 py-2' : 'mb-3 flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:flex-wrap sm:gap-2'
      }`}>
      {rows.map(([ic, txt], i) => (
        <div key={i} className="flex items-start gap-1.5">
          <span className="mt-px shrink-0 text-[#3D5A73]">{ic}</span>
          <span className={`leading-[1.35] tracking-[0.01em] ${compact ? 'text-[8px]' : 'text-[10px] sm:text-[11px]'}`}>{txt}</span>
        </div>
      ))}
    </div>
  );
}

function FirstBookingGuaranteeBlock() {
  const items = [
    'Not satisfied after your first booking? Full refund — no lengthy disputes.',
    'Property damage during a covered visit? Protection is included; we coordinate the claim.',
    'Questions while someone’s in your home? Priority in-app and phone support.',
  ];
  return (
    <div className="mb-3 rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#0B0D12] to-[#1A1F2E] px-3 py-3 text-[#E8EAEF]">
      <p className="mb-1.5 text-[7.5px] font-semibold uppercase tracking-[0.12em] text-[rgba(232,234,239,0.55)]">Seva assurance</p>
      <p className="mb-2 text-xs font-bold leading-snug text-white">Your first service, guaranteed.</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-1.5 text-[8.5px] leading-[1.45] text-[rgba(232,234,239,0.88)]">
            <span className="mt-px shrink-0" style={{ color: PV.teal }}>
              ·
            </span>
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[7.5px] leading-snug text-[rgba(232,234,239,0.45)]">Terms apply · Coverage details in your booking summary</p>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[rgba(12,184,179,0.28)] bg-[rgba(12,184,179,0.1)] px-2.5 py-1 text-[8px] font-bold tracking-wide text-[#0B6B68]">
      <StrokeIcon name="shield" size={10} color={PV.teal} />
      Verified by Seva
    </span>
  );
}

type CustomerAppExperienceProps = {
  open: boolean;
  onClose: () => void;
  /** Which screen to show when the overlay opens */
  entryScreen: CustomerAppScreen;
  homeGreetingName?: string | null;
  /** Called when user finishes or skips trust onboarding */
  onOnboardingComplete?: () => void;
};

export function CustomerAppExperience({
  open,
  onClose,
  entryScreen,
  homeGreetingName = null,
  onOnboardingComplete,
}: CustomerAppExperienceProps) {
  const [screen, setScreen] = useState<Screen>('home');
  const [onboardIdx, setOnboardIdx] = useState(0);
  const [pricingReturn, setPricingReturn] = useState<PricingReturn>('home');
  const [slot, setSlot] = useState(1);
  const prevOpen = useRef(false);

  useEffect(() => {
    if (open && !prevOpen.current) {
      setScreen(entryScreen);
      if (entryScreen === 'onboarding') setOnboardIdx(0);
      if (entryScreen === 'pricing') setPricingReturn('home');
    }
    prevOpen.current = open;
  }, [open, entryScreen]);

  const finishOnboarding = useCallback(() => {
    onOnboardingComplete?.();
    setOnboardIdx(0);
    setScreen('home');
  }, [onOnboardingComplete]);

  const openPricing = useCallback((ret: PricingReturn) => {
    setPricingReturn(ret);
    setScreen('pricing');
  }, []);

  const closePricing = useCallback(() => {
    if (pricingReturn === 'booking') setScreen('booking');
    else if (pricingReturn === 'confirm') setScreen('confirm');
    else setScreen('home');
  }, [pricingReturn]);

  const goBook = useCallback(() => setScreen('booking'), []);
  const goProfile = useCallback(() => setScreen('profile'), []);
  const goHome = useCallback(() => setScreen('home'), []);

  const panelBg = 'bg-[#F1F3F8]';

  const renderPanel = () => {
    switch (screen) {
      case 'onboarding': {
        const st = ONBOARD_STEPS[onboardIdx];
        const last = onboardIdx >= ONBOARD_STEPS.length - 1;
        return (
          <div className={`${panelBg} min-h-[480px] px-3.5 pb-3.5 pt-2.5 sm:px-[14px] sm:pb-3.5 sm:pt-2.5`}>
            {/* Progress — preview: 3px bars, gap 4px, gold vs #D8DCE6 */}
            <div className="mb-3.5 flex gap-1">
              {ONBOARD_STEPS.map((_, j) => (
                <div
                  key={j}
                  className="h-[3px] flex-1 rounded-[2px]"
                  style={{ background: j <= onboardIdx ? PV.gold : '#D8DCE6' }}
                />
              ))}
            </div>
            <div className="mb-3 rounded-[14px] border border-[#E8E8F0] bg-white px-3.5 py-4">
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: 'rgba(12,184,179,0.1)', color: PV.teal }}>
                <StrokeIcon name={st.icon} size={20} color={PV.teal} />
              </div>
              <h3 className="mb-2 text-[15px] font-bold leading-tight text-[#0B0D12]">{st.title}</h3>
              <p className="text-[10px] leading-[1.55] text-[#5C6578]">{st.body}</p>
            </div>
            <TrustLayerStrip compact />
            <div className="mt-1 flex flex-col gap-2">
              <button
                type="button"
                className="rounded-xl py-3 text-center text-xs font-bold transition active:scale-[0.99] hover:brightness-105"
                style={{ background: PV.gold, color: PV.onGold }}
                onClick={() => {
                  if (last) finishOnboarding();
                  else setOnboardIdx((i) => i + 1);
                }}>
                {last ? 'Meet professionals' : 'Continue'}
              </button>
              <button
                type="button"
                className="cursor-pointer py-1 text-center text-[9px] transition hover:opacity-80"
                style={{ color: PV.muted }}
                onClick={finishOnboarding}>
                Skip introduction
              </button>
            </div>
          </div>
        );
      }
      case 'home':
        return (
          <div className={`relative ${panelBg} min-h-[480px] px-3.5 pb-[72px] pt-2.5 sm:px-[14px]`}>
            {/* Header — preview: 10px muted, 14px name, 9px loc pill */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#888]">Good morning ☀️</p>
                <p className="text-sm font-bold leading-tight text-[#0B0D12]">
                  {homeGreetingName?.trim() ? firstName(homeGreetingName) : 'Ashwath'}
                </p>
              </div>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-0.5 rounded-full border border-[#E8E8F0] bg-white py-1.5 pl-2 pr-2 text-[9px] text-[#555] transition hover:bg-[#fafafa]">
                <StrokeIcon name="pin" size={9} color={PV.gold} />
                {US_CUSTOMER.city}
              </button>
            </div>
            <div className="mb-2.5 flex items-center gap-1.5 rounded-lg border border-[#E4E7EF] bg-white px-2.5 py-1.5">
              <StrokeIcon name="shield" size={11} color={PV.teal} />
              <span className="text-[8px] leading-[1.35] text-[#4B5563]">
                Same vetting for every pro — not a two-tier marketplace where “unverified” still ranks in search.
              </span>
            </div>
            <div className="mb-3.5 flex items-center gap-1.5 rounded-[10px] border border-[#E8E8F0] bg-white px-3 py-2.5">
              <StrokeIcon name="search" size={12} color="#bbb" />
              <span className="text-[11px] text-[#aaa]">What do you need today?</span>
            </div>
            <button
              type="button"
              onClick={goBook}
              className="mb-3.5 w-full cursor-pointer rounded-xl border border-[rgba(240,165,0,0.18)] bg-gradient-to-br from-[#0B0D12] to-[#1B1F32] px-3 py-3 text-left transition hover:opacity-95 active:scale-[0.995]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="mb-0.5 text-[9px] font-bold" style={{ color: PV.gold }}>
                    {US_CUSTOMER.promoBadge}
                  </p>
                  <p className="text-xs font-bold text-white">{US_CUSTOMER.promoTitle}</p>
                  <p className="mt-0.5 text-[9px] text-[#8896AA]">{US_CUSTOMER.promoSub}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#555] line-through">{US_CUSTOMER.promoWas}</p>
                  <p className="text-[18px] font-extrabold leading-tight" style={{ color: PV.gold }}>
                    {US_CUSTOMER.promoNow}
                  </p>
                  <div
                    className="mt-1 inline-block cursor-pointer rounded-md px-2 py-1 text-[9px] font-bold"
                    style={{ background: PV.gold, color: PV.onGold }}>
                    Book Now →
                  </div>
                </div>
              </div>
            </button>
            <p className="mb-2 text-[11px] font-bold text-[#0B0D12]">All Services</p>
            <div className="mb-3.5 grid grid-cols-4 gap-1.5">
              {(
                [
                  ['🚚', 'Move', '#EFF6FF', '#1D4ED8'],
                  ['📦', 'Load-out', '#F0F9FF', '#0369A1'],
                  ['👨‍🍳', 'Cook', '#FFF1F2', '#9F1239'],
                  ['🧹', 'Clean', '#F0FFF4', '#166534'],
                  ['👶', 'Sitter', '#FDF4FF', '#7E22CE'],
                  ['🧺', 'Laundry', '#F5F3FF', '#5B21B6'],
                  ['🛒', 'Errands', '#FFFBEB', '#B45309'],
                  ['🔧', 'Handy', '#FFF7ED', '#9A3412'],
                ] as const
              ).map(([e, l, bg, tc]) => (
                <button
                  key={l}
                  type="button"
                  onClick={goBook}
                  className="cursor-pointer rounded-lg py-[7px] text-center transition active:scale-[0.98] hover:ring-2 hover:ring-[#F0A500]/35"
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
              onClick={goProfile}
              className="mb-3.5 flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-[#E8E8F0] bg-white px-3 py-2.5 text-left transition hover:border-[rgba(12,184,179,0.35)] active:scale-[0.995]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6B8CAE] to-[#3D5A73] text-sm font-extrabold text-[rgba(255,255,255,0.9)]">
                M
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-[#0B0D12]">{DEMO_PRO.name}</p>
                <p className="mt-0.5 text-[8.5px] leading-[1.35] text-[#6B7280]">{US_CUSTOMER.proCustomerTagline}</p>
                <div className="mt-1.5">
                  <VerifiedBadge />
                </div>
              </div>
              <span className="shrink-0 text-[8px] font-bold" style={{ color: PV.teal }}>
                View →
              </span>
            </button>
            <p className="mb-2 text-[11px] font-bold text-[#0B0D12]">Book Again</p>
            <button
              type="button"
              onClick={goBook}
              className="flex w-full cursor-pointer items-center gap-2 rounded-[10px] border border-[#EBEBF0] bg-white px-3 py-2.5 text-left transition hover:border-[#F0A500]/25 active:scale-[0.995]">
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#E6F4FF] text-lg leading-none">
                {US_CUSTOMER.againEmoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#0B0D12]">{US_CUSTOMER.againLineTitle}</p>
                <p className="text-[9px] leading-[1.35] text-[#6B7280]">{US_CUSTOMER.againLineSub}</p>
              </div>
              <span
                className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold"
                style={{ background: PV.gold, color: PV.onGold }}>
                {US_CUSTOMER.againAC}
              </span>
            </button>

            {/* Bottom nav — preview .bottom-nav */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-[#F0F0F0] bg-white px-2 pb-3 pt-2">
              {(
                [
                  { icon: 'home' as const, label: 'Home', active: true, onClick: () => {} },
                  { icon: 'search' as const, label: 'Search', active: false, onClick: () => {} },
                  { icon: 'bell' as const, label: 'Bookings', active: false, onClick: () => setScreen('confirm') },
                  { icon: 'user' as const, label: 'Profile', active: false, onClick: goProfile },
                ] as const
              ).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="min-w-[56px] text-center transition hover:opacity-90">
                  <div className="flex justify-center">
                    <StrokeIcon name={item.icon} size={16} color={item.active ? PV.gold : '#bbb'} />
                  </div>
                  <div
                    className="mt-0.5 text-[7.5px] font-medium"
                    style={{ color: item.active ? PV.gold : '#bbb' }}>
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className={`${panelBg} flex max-h-[min(720px,70vh)] flex-col`}>
            <button
              type="button"
              onClick={goHome}
              className="flex shrink-0 items-center gap-2 px-4 py-3 text-left text-sm font-bold text-[#0B0D12] hover:bg-black/5">
              ← Professional
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <div className="overflow-hidden rounded-2xl border border-[#E8E8F0] bg-white">
                <div className="relative flex h-[120px] items-center justify-center bg-gradient-to-br from-[#6B8CAE] to-[#3D5A73]">
                  <span className="text-4xl font-extrabold text-white/25">{DEMO_PRO.initials}</span>
                  <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    🎬 Intro video
                  </span>
                </div>
                <div className="p-3">
                  <div className="mb-2 flex justify-between gap-2">
                    <div>
                      <p className="text-base font-bold text-[#0B0D12]">{DEMO_PRO.name}</p>
                      <p className="mt-0.5 text-[10px] text-[#5C6578]">{US_CUSTOMER.proCustomerTagline}</p>
                    </div>
                    <VerifiedBadge />
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {[
                      ['Interviewed & approved', '#F0F7FF', '#1E40AF'],
                      ['Background check · Clear', '#F0FDF4', '#166534'],
                      ['ID verified', '#FFFBEB', '#B45309'],
                    ].map(([t, bg, tc]) => (
                      <span
                        key={t}
                        className="rounded-md border px-2 py-0.5 text-[9px] font-medium"
                        style={{ background: bg, color: tc as string, borderColor: `${tc}22` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mb-1 text-[10px] font-bold text-[#0B0D12]">About</p>
                  <p className="mb-2 text-xs leading-relaxed text-[#4B5568]">{DEMO_PRO.bio}</p>
                  <p className="mb-1 text-[10px] font-bold text-[#0B0D12]">Why I do this work</p>
                  <p className="mb-2 border-l-2 border-seva-teal/40 pl-2 text-xs italic leading-relaxed text-[#4B5568]">{DEMO_PRO.why}</p>
                  <p className="mb-1 text-[10px] font-bold text-[#0B0D12]">Services</p>
                  {US_CUSTOMER.proCustomerServices.map((line) => (
                    <div key={line} className="mb-1 flex gap-1.5 text-xs text-[#333]">
                      <span className="text-seva-teal">✓</span> {line}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-[#E8E8F0] bg-white p-3">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-wide text-[#9CA3AF]">Trust signals</p>
                {DEMO_PRO.trustLines.map((line) => (
                  <div key={line} className="mb-1.5 flex gap-2 text-[11px] text-[#374151]">
                    <span className="shrink-0 text-seva-teal">●</span>
                    {line}
                  </div>
                ))}
                <p className="mt-2 text-[10px] leading-snug text-[#9CA3AF]">
                  New to Seva — no reviews yet. Verification and our first-booking guarantee stand in place of crowdsourced ratings.
                </p>
              </div>
              <div className="mt-3">
                <TrustLayerStrip compact />
              </div>
              <FirstBookingGuaranteeBlock />
            </div>
            <div className="shrink-0 space-y-2 border-t border-[#E4E7EF] bg-[#F1F3F8] p-4">
              <button
                type="button"
                onClick={() => setScreen('chat')}
                className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#0B0D12] py-2.5 text-sm font-bold text-white transition hover:bg-black">
                💬 Chat first
              </button>
              <button
                type="button"
                onClick={goBook}
                className="w-full rounded-[11px] border border-[#D1D5DB] bg-white py-2.5 text-sm font-semibold text-[#0B0D12] transition hover:bg-[#fafafa]">
                Request booking
              </button>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="flex max-h-[min(720px,70vh)] flex-col bg-[#ECEEF4]">
            <div className="flex shrink-0 items-center gap-2 border-b border-[#E8E8F0] bg-white px-3 py-2.5">
              <button type="button" onClick={() => setScreen('profile')} className="p-1 text-[#333] hover:bg-black/5" aria-label="Back">
                ←
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#0B0D12]">{DEMO_PRO.name}</p>
                <p className="text-[10px] font-semibold text-green-600">● Responds within ~15 min</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8F0] bg-[#F5F5F8] text-[#374151]">📞</div>
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
              <p className="text-center text-[10px] text-[#9CA3AF]">Today · Messages are monitored for safety</p>
              <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-xs leading-relaxed text-[#374151] shadow-sm">
                Hi — I’m Maya. Happy to answer anything about timing, experience with infants, or how I handle house keys.
              </div>
              <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-seva-teal px-3 py-2 text-xs leading-relaxed text-white">
                Thanks. Do you have experience with nut allergies?
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-xs leading-relaxed text-[#374151] shadow-sm">
                Yes. I follow written plans from families and always confirm ingredients for anything I prepare. I can send my food-handling notes if helpful.
              </div>
            </div>
            <div className="shrink-0 border-t border-[#E8E8F0] bg-white px-2.5 py-2">
              <p className="mb-1.5 text-[10px] font-semibold text-[#9CA3AF]">Suggested questions</p>
              <div className="mb-2 flex flex-wrap gap-1">
                {['How do you handle first visits?', US_CUSTOMER.chatFeeQ, 'Can you do a quick video intro?'].map((q) => (
                  <span
                    key={q}
                    className="cursor-pointer rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-2 py-1 text-[10px] text-[#374151] hover:bg-[#E5E7EB]">
                    {q}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-[10px] bg-[#F3F4F6] px-3 py-2 text-xs text-[#9CA3AF]">Message Maya…</div>
                <button
                  type="button"
                  onClick={goBook}
                  className="shrink-0 rounded-[10px] bg-seva-gold px-3 py-2 text-[10px] font-bold text-seva-deep">
                  Request
                </button>
              </div>
            </div>
          </div>
        );
      case 'booking': {
        const bk = US_CUSTOMER;
        const slotLabels = ['Today 4 PM', 'Today 6 PM', 'Tomorrow 10 AM', 'Tomorrow 2 PM'];
        return (
          <div className={`${panelBg} min-h-[480px] space-y-3 p-4 sm:p-5`}>
            <button type="button" onClick={goHome} className="flex items-center gap-2 text-sm font-bold text-[#0B0D12] hover:underline">
              ← {bk.bookingTitle}
            </button>
            <div className="rounded-xl bg-gradient-to-br from-[#0B0D12] to-[#1B1F32] p-4 text-white">
              <div className="flex justify-between gap-3">
                <div>
                  <div className="mb-1 text-2xl">{bk.bookingHeroEmoji}</div>
                  <p className="text-base font-bold">{bk.bookingHeroTitle}</p>
                  <p className="mt-1 text-[10px] text-[#8896AA]">{bk.bookingSub}</p>
                </div>
                <div className="text-right">
                  <p className="mb-0.5 text-[10px] font-semibold text-seva-teal">FIXED PRICE</p>
                  <p className="text-2xl font-extrabold text-seva-gold">{bk.bookAC}</p>
                  <p className="text-[10px] text-[#666]">{bk.bookingPriceFoot}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openPricing('booking')}
              className="flex w-full items-center justify-between rounded-[10px] border border-[#E4E7EF] bg-white px-3 py-2 text-left transition hover:border-seva-teal/30">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#374151]">
                <span>📊</span> See full price breakdown
              </span>
              <span className="text-xs font-bold text-seva-teal">View →</span>
            </button>
            <TrustLayerStrip compact />
            <div className="rounded-[10px] border border-[#EBEBF0] bg-white p-3">
              <p className="mb-2 text-xs font-bold text-[#0B0D12]">What&apos;s included</p>
              {bk.bookingIncludes.map((it) => (
                <div key={it} className="mb-1.5 flex gap-2 text-xs text-[#444]">
                  <span className="text-green-600">✓</span> {it}
                </div>
              ))}
              <p className="mt-2 border-t border-[#F0F0F0] pt-2 text-[11px] leading-snug text-[#6B7280]">
                Need extra parts or work? The pro requests an add-on — your card is not charged until you explicitly approve.
              </p>
            </div>
            <div className="rounded-[10px] border border-[#EBEBF0] bg-white p-3">
              <p className="mb-2 text-xs font-bold text-[#0B0D12]">Pick a time</p>
              <div className="flex flex-wrap gap-1.5">
                {slotLabels.map((sl, i) => (
                  <button
                    key={sl}
                    type="button"
                    onClick={() => setSlot(i)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold transition ${
                      slot === i
                        ? 'border-seva-gold bg-seva-gold text-seva-deep'
                        : 'border-[#E8E8F0] bg-[#F5F5F8] text-[#555] hover:border-seva-teal/40'
                    }`}>
                    {sl}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-seva-teal/20 bg-seva-teal/10 px-2.5 py-2 text-xs text-seva-teal">
              <span>🛡️</span>
              Payment held securely — released only after you approve the completed work
            </div>
            <FirstBookingGuaranteeBlock />
            <button
              type="button"
              onClick={() => setScreen('confirm')}
              className="w-full rounded-xl bg-seva-gold py-3 text-center transition hover:brightness-105">
              <p className="text-sm font-bold text-seva-deep">Send booking request — {bk.bookAC}</p>
              <p className="mt-0.5 text-xs text-[#5A3800]">You can still chat · Nothing final until you confirm details</p>
            </button>
          </div>
        );
      }
      case 'pricing': {
        const rows = [US_CUSTOMER.labor, US_CUSTOMER.mat, US_CUSTOMER.fee, US_CUSTOMER.tax] as const;
        return (
          <div className={`${panelBg} min-h-[480px] space-y-3 p-4 sm:p-5`}>
            <button type="button" onClick={closePricing} className="flex items-center gap-2 text-sm font-bold text-[#0B0D12]">
              ← Price breakdown
            </button>
            <p className="text-xs leading-relaxed text-[#6B7280]">{US_CUSTOMER.priceIntro}</p>
            <div className="overflow-hidden rounded-xl border border-[#E8E8F0] bg-white">
              {rows.map(([title, sub, amt], idx) => (
                <div
                  key={title}
                  className={`flex justify-between gap-3 px-3 py-2.5 ${idx < rows.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0B0D12]">{title}</p>
                    <p className="mt-0.5 text-[10px] text-[#9CA3AF]">{sub}</p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-[#0B0D12]">{amt}</p>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[#E8E8F0] bg-gradient-to-b from-[#FAFBFD] to-[#F4F6FA] px-3 py-3">
                <span className="text-sm font-bold text-[#0B0D12]">Total due after service</span>
                <span className="text-xl font-extrabold text-seva-gold">{US_CUSTOMER.total}</span>
              </div>
            </div>
            <div className="rounded-[10px] border border-seva-teal/20 bg-seva-teal/10 p-3">
              <p className="mb-1 text-xs font-bold text-[#0B6B68]">What the platform fee covers</p>
              <p className="text-[11px] leading-relaxed text-[#4B5563]">
                Payment processing, identity & background infrastructure (e.g. Checkr · Stripe Identity), in-job support staffing, and contributions to the first-visit guarantee and damage programs. It is not a “trust” surcharge added at the last step — it’s listed here.
              </p>
            </div>
            <TrustLayerStrip compact />
            <button
              type="button"
              onClick={closePricing}
              className="w-full rounded-[11px] border border-[#D1D5DB] bg-white py-2.5 text-sm font-semibold text-[#0B0D12] transition hover:bg-[#fafafa]">
              {pricingReturn === 'confirm'
                ? 'Back to confirmation'
                : pricingReturn === 'booking'
                  ? 'Back to booking'
                  : 'Back to home'}
            </button>
          </div>
        );
      }
      case 'confirm':
        return (
          <div className={`${panelBg} min-h-[480px] space-y-3 p-4 sm:p-5`}>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 text-xl">✓</div>
              <p className="text-base font-bold text-[#0B0D12]">Request received</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
                We’ll confirm timing with Maya and notify you. Nothing is charged until you approve the booking details.
              </p>
            </div>
            <TrustLayerStrip compact />
            <FirstBookingGuaranteeBlock />
            <div className="rounded-xl border border-[#E8E8F0] bg-white p-3">
              <p className="mb-2 text-xs font-bold text-[#0B0D12]">What happens next</p>
              {[
                'You’ll get a chat thread if Maya has a quick question.',
                'Funds stay in secure hold until work is marked complete.',
                'During the visit, emergency support is one tap away.',
              ].map((t) => (
                <div key={t} className="mb-1.5 flex gap-2 text-[11px] text-[#4B5563]">
                  <span className="text-seva-teal">✓</span> {t}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openPricing('confirm')}
              className="w-full py-1.5 text-center text-xs font-semibold text-seva-teal hover:underline">
              {US_CUSTOMER.confirmBreak}
            </button>
            <button
              type="button"
              onClick={() => setScreen('tracking')}
              className="w-full rounded-xl bg-seva-gold py-3 text-sm font-bold text-seva-deep transition hover:brightness-105">
              View booking status
            </button>
          </div>
        );
      case 'tracking':
        return (
          <div className={panelBg}>
            <div className="relative h-[200px] overflow-hidden bg-gradient-to-b from-[#C8D8E8] to-[#A8BFD0] sm:h-[220px]">
              <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={`h${i}`} x1="0" y1={i * 50} x2="100%" y2={i * 50} stroke="#888" strokeWidth="0.5" />
                ))}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="220" stroke="#888" strokeWidth="0.5" />
                ))}
                <path
                  d="M 75 185 Q 120 140 160 110 Q 190 88 215 72"
                  fill="none"
                  stroke="#F0A500"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="absolute animate-pulse"
                style={{ top: '90px', left: 'clamp(120px, 55%, 200px)' }}>
                <div className="h-3.5 w-3.5 rounded-full border-2 border-white bg-seva-gold shadow-md" />
              </div>
              <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#0B0D12] px-3.5 py-1.5 text-[10px] font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-seva-gold" />
                {US_CUSTOMER.trackEtaLine}
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="rounded-2xl border border-[#E8E8F0] bg-white p-3">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-lg font-bold text-white">
                    {DEMO_PRO.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#0B0D12]">{DEMO_PRO.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      <span className="rounded-md bg-seva-teal/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#0B6B68]">
                        Verified by Seva
                      </span>
                      <span className="text-[10px] text-[#6B7280]">{US_CUSTOMER.trackVisitBlurb}</span>
                    </div>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E8E8F0] bg-[#F5F5F8]">📞</div>
                </div>
                <div className="flex gap-1">
                  {(['Booked', 'En Route', 'Arrived', 'Done'] as const).map((step, i) => (
                    <div key={step} className="flex-1 text-center">
                      <div className={`mb-1 h-1 rounded-sm ${i < 2 ? 'bg-seva-gold' : 'bg-[#EBEBF0]'}`} />
                      <p className={`text-[10px] font-semibold ${i < 2 ? 'text-seva-teal' : 'text-[#bbb]'}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 rounded-[10px] border border-seva-gold/20 bg-seva-gold/10 p-2.5 text-[11px] text-[#B37800]">
                <span>📷</span>
                <span>
                  {DEMO_PRO.name.split(' ')[0]} will take a <strong>before photo</strong> when they arrive. You approve a <strong>completion photo</strong> before payment releases.
                </span>
              </div>
              <TrustLayerStrip compact />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex flex-col bg-seva-deep"
      role="dialog"
      aria-modal="true"
      aria-label="SEVA">
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-seva-deep/95 px-3 py-3 backdrop-blur-md sm:gap-4 sm:px-5">
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-left text-xs font-semibold text-seva-gold transition hover:text-white sm:text-sm">
          ← Marketing site
        </button>
        <img src="/seva_logo_new.png" alt="SEVA" className="h-7 w-auto opacity-95 sm:h-8" width={120} height={32} />
        <span className="max-w-[100px] shrink-0 truncate text-right text-[10px] font-medium text-seva-muted sm:max-w-[140px] sm:text-xs">
          {homeGreetingName?.trim() ? firstName(homeGreetingName) : '\u00a0'}
        </span>
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 justify-center overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
          <div className="h-fit w-full max-w-md min-h-[min(520px,75vh)] overflow-hidden rounded-2xl border border-seva-gold/25 bg-seva-soft/20 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <div className="max-h-[min(720px,calc(100vh-8rem))] min-h-[min(520px,70vh)] overflow-y-auto">{renderPanel()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
