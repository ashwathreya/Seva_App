import { Button } from './ui/Button';

type Props = { onBook: () => void };

export function MobileStickyCta({ onBook }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-seva-deep/95 p-3 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:hidden">
      <Button className="w-full" onClick={onBook}>
        Book a Service
      </Button>
    </div>
  );
}
