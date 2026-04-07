import { Button } from './ui/Button';

type Props = { onBook: () => void };

export function MobileStickyCta({ onBook }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-md sm:hidden">
      <Button className="w-full" onClick={onBook}>
        Book a Service
      </Button>
    </div>
  );
}
