import { Reveal } from './Reveal';

const steps = [
  {
    step: '01',
    title: 'Choose service',
    body: 'Select what you need and your area. See honest starting prices before you commit.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Book instantly',
    body: 'Match with a verified professional. Confirm details in-app — your payment stays protected.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Relax',
    body: 'We handle vetting and escrow. Approve the work when it’s done — then pay with confidence.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-white/[0.06] bg-lux-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">How it works</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl">
              Effortless from start to finish
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <Reveal key={s.step}>
              <div className="relative text-center md:text-left">
                {i < steps.length - 1 ? (
                  <div
                    className="absolute left-1/2 top-8 hidden h-px w-[calc(100%+2rem)] -translate-y-1/2 bg-gradient-to-r from-lux-gold/30 via-lux-gold/10 to-transparent md:left-[calc(50%+1.5rem)] md:block md:w-[calc(100%-3rem)]"
                    aria-hidden
                  />
                ) : null}
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-lux-gold/25 bg-lux-charcoal text-lux-gold md:mx-0">
                  {s.icon}
                </div>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-lux-gold/80">{s.step}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-lux-parchment sm:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-lux-muted sm:text-base">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
