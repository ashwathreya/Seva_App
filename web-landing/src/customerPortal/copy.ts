/** Demo copy aligned with `seva_app_design_preview.html` (US region). */

export const DEMO_PRO = {
  name: 'Maya Chen',
  initials: 'M',
  bio: 'I’m a former preschool teacher. I keep routines calm, communicate often, and treat your home with the same care I’d want for mine.',
  why: 'Growing up, I watched my mother look after neighbors’ children with patience and respect. That’s where I learned that trust isn’t promised — it’s earned, every visit.',
  trustLines: [
    'Top 10% of applicants we interview',
    'Recently onboarded — fully verified',
    'Serves families in your area',
    'Search is fit-based — pros don’t pay to rank above others',
  ],
} as const;

export const US_CUSTOMER = {
  city: 'Jersey City, NJ',
  promoBadge: '⚡ NJ LAUNCH',
  promoTitle: 'Move + daily help',
  promoSub: '2 hr movers + 1 meal-prep session · North NJ',
  promoWas: '$349',
  promoNow: '$218',
  bookAC: '$189',
  againAC: '$89',
  bookingTitle: 'Local moving',
  bookingSub: '2 movers · 2 hr · truck / materials quoted add-on',
  bookingHeroEmoji: '🚚',
  bookingHeroTitle: 'Local moving crew',
  bookingPriceFoot: 'blankets & dollies when in scope',
  bookingIncludes: [
    '2 movers · 2 hours',
    'Load & unload at both addresses',
    'Basic furniture protection',
    'Damage terms in your booking summary',
    'Truck / tolls as quoted add-on',
  ],
  againEmoji: '🚚',
  againLineTitle: 'Local moving',
  againLineSub: 'Hoboken → Jersey City · same vetting every time',
  proCustomerTagline: 'Moving & logistics · meal prep · childcare · North NJ',
  proCustomerServices: [
    'Local moves & loading (2+ crew)',
    'In-home delivery / staging / light assembly',
    'Babysitting (0–12 yrs)',
    'Meal prep & kid-friendly cooking',
    'School pickup (short drive)',
    'Light tidying during visits',
  ],
  priceIntro:
    'Every dollar is itemized before you authorize payment. The total matches Home, chat, and checkout — nothing is added at capture time.',
  labor: ['Crew labor', '2 movers · 2 hours · load / unload', '$140'] as [string, string, string],
  mat: ['Supplies & protection', 'Shrink wrap, blankets, dollies (if selected)', '$22'] as [string, string, string],
  fee: ['Seva platform fee', 'Escrow, verification, support, insurance pool', '$17'] as [string, string, string],
  tax: ['Estimated sales tax', 'NJ · ZIP-specific before charge', '$10'] as [string, string, string],
  total: '$189',
  confirmBreak: 'Review price breakdown · $189',
  chatFeeQ: 'What’s included in the price — any platform fees?',
  trackEtaLine: 'Maya is ~12 min out · en route to pickup',
  trackVisitBlurb: 'Background clear · 84 jobs in North NJ',
} as const;

/** Stroke icon ids — match `seva_app_design_preview.html` ICONS + onboarding cards */
export type OnboardIconId = 'shield' | 'check' | 'msg' | 'lock';

export const ONBOARD_STEPS: readonly {
  key: string;
  title: string;
  body: string;
  icon: OnboardIconId;
}[] = [
  {
    key: 'safety',
    title: 'How we protect your home',
    body: 'Speed-to-listing is how open marketplaces scale. We slow down on purpose: fewer pros, same bar for everyone, so you’re not decoding star averages from strangers.',
    icon: 'shield',
  },
  {
    key: 'verify',
    title: 'Verified, not just “signed up”',
    body: 'Background check, ID match, and an in-person interview. No alternate “basic” profile that still shows up in search — if they don’t pass, they don’t appear.',
    icon: 'check',
  },
  {
    key: 'chat',
    title: 'Talk before you commit',
    body: 'Chat or call about allergies, access, kids, or timing before money moves. We don’t use countdown timers or fake scarcity to force instant booking.',
    icon: 'msg',
  },
  {
    key: 'guarantee',
    title: 'Your first service is on us, in writing',
    body: 'First visit not up to standard? Eligible refund path — plus damage coverage and a human escalation line while someone’s in your home.',
    icon: 'lock',
  },
];
