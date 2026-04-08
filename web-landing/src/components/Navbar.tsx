import { useState } from 'react';
import { Button } from './ui/Button';
import type { SessionUser } from '../session';
import { firstName } from '../session';

type Props = {
  scrolled: boolean;
  user: SessionUser | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onBook: () => void;
};

const baseLinks = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#services', label: 'Services' },
  { href: '#how', label: 'How it works' },
  { href: '#providers', label: 'Providers' },
] as const;

export function Navbar({ scrolled, user, onLogin, onSignup, onLogout, onBook }: Props) {
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  const linkClass = solid
    ? 'text-lux-muted hover:text-lux-parchment'
    : 'text-lux-parchment/85 hover:text-lux-parchment';

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-white/[0.06] bg-lux-charcoal/92 shadow-nav backdrop-blur-xl' : 'bg-transparent'
      }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/seva_logo_new.png"
            alt="SEVA"
            className={`h-8 w-auto object-contain transition-opacity sm:h-9 ${solid ? 'opacity-95' : 'opacity-100 drop-shadow-md'}`}
            width={140}
            height={36}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {baseLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium tracking-wide transition-colors ${linkClass}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          {user ? (
            <>
              <a
                href="#dashboard"
                className={`max-w-[140px] truncate text-sm font-medium transition-colors ${linkClass}`}
                title={user.displayName}>
                Hi, {firstName(user.displayName)}
              </a>
              <Button variant="ghost" className="!py-2 !px-3 text-sm" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="!py-2 !px-4 text-sm" onClick={onLogin}>
                Log in
              </Button>
              <Button className="!py-2 !px-5 text-sm" onClick={onSignup}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${solid ? 'text-lux-parchment' : 'text-lux-parchment'}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/[0.06] bg-lux-charcoal px-4 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {baseLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-lux-parchment/90 hover:bg-white/[0.05]"
                onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <hr className="my-3 border-white/[0.06]" />
            {user ? (
              <>
                <p className="px-3 py-2 text-xs uppercase tracking-wider text-lux-muted">Signed in as {user.displayName}</p>
                <Button variant="ghost" className="w-full justify-center" onClick={() => { setOpen(false); onLogout(); }}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-center" onClick={() => { setOpen(false); onLogin(); }}>
                  Log in
                </Button>
                <Button className="mt-2 w-full justify-center" onClick={() => { setOpen(false); onSignup(); }}>
                  Sign up
                </Button>
              </>
            )}
            <Button variant="outline" className="mt-3 w-full justify-center" onClick={() => { setOpen(false); onBook(); }}>
              Book a Service
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
