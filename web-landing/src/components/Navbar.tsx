import { useState } from 'react';
import { Button } from './ui/Button';

type Props = {
  scrolled: boolean;
  onLogin: () => void;
  onSignup: () => void;
  onBook: () => void;
};

const links = [
  { href: '#services', label: 'Services' },
  { href: '#how', label: 'How It Works' },
  { href: '#providers', label: 'Become a Provider' },
];

export function Navbar({ scrolled, onLogin, onSignup, onBook }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-white/95 shadow-nav backdrop-blur-md' : 'bg-white/90 backdrop-blur-sm'
      }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white shadow-md">
            S
          </span>
          <span className="font-bold tracking-tight text-slate-900">SEVA</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Button variant="ghost" className="!py-2 !px-4" onClick={onLogin}>
            Log in
          </Button>
          <Button className="!py-2 !px-4" onClick={onSignup}>
            Sign up
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <hr className="my-2 border-slate-100" />
            <Button variant="ghost" className="w-full justify-center" onClick={() => { setOpen(false); onLogin(); }}>
              Log in
            </Button>
            <Button className="w-full justify-center" onClick={() => { setOpen(false); onSignup(); }}>
              Sign up
            </Button>
            <Button variant="outline" className="w-full justify-center" onClick={() => { setOpen(false); onBook(); }}>
              Book a Service
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
