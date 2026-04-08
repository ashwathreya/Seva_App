import { Button } from './ui/Button';
import { Reveal } from './Reveal';

type Props = { onBook: () => void };

export function FinalCta({ onBook }: Props) {
  return (
    <section className="bg-lux-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden border border-white/[0.08] bg-lux-surface px-8 py-16 text-center sm:px-16 sm:py-20 lg:py-24">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lux-gold/[0.06] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-lux-gold/[0.04] blur-3xl" aria-hidden />
            <h2 className="relative font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl lg:text-[2.75rem]">
              Let us handle the work
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-base leading-relaxed text-lux-muted sm:text-lg">
              Book vetted professionals with transparent pricing — and the peace of mind your home deserves.
            </p>
            <Button className="relative mt-10" onClick={onBook}>
              Book Now
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
