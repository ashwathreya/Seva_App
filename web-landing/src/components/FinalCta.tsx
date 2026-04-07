import { Button } from './ui/Button';

type Props = { onBook: () => void };

export function FinalCta({ onBook }: Props) {
  return (
    <section className="bg-seva-deep py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-seva-gold/25 bg-gradient-to-br from-seva-teal via-seva-teal to-seva-deep px-8 py-14 text-center shadow-goldGlow sm:px-16 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-seva-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/25 blur-2xl" />
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get your tasks done today
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-lg text-seva-ink/90">
            Join thousands of households who book trusted help without the runaround.
          </p>
          <Button className="relative mt-8 bg-seva-gold !text-seva-night hover:!brightness-105" onClick={onBook}>
            Book now
          </Button>
        </div>
      </div>
    </section>
  );
}
