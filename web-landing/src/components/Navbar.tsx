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
  { href: '#how', label: 'How It Works' },
  { href: '#providers', label: 'Become a Provider' },
] as const;

export function Navbar({ scrolled, user, onLogin, onSignup, onLogout, onBook }: Props) {
  const [open, setOpen] = useState(false);
  const onDark = !scrolled && !open;

  const linkClass = onDark
    ? 'text-seva-ink/90 hover:text-white'
    : 'text-seva-deep hover:text-seva-teal';

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-seva-deep/95 shadow-nav backdrop-blur-md'
          : 'bg-transparent'
      }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/seva_logo_new.png"
            alt="SEVA"
            className="h-9 w-auto object-contain sm:h-10"
            width={160}
            height={40}
          />
        </a>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Main">
          {baseLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${linkClass}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          {user ? (
            <>
              <a
                href="#dashboard"
                className={`max-w-[140px] truncate text-sm font-semibold transition-colors ${linkClass}`}
                title={user.displayName}>
                Hi, {firstName(user.displayName)}
              </a>
              <Button variant="ghost" className={`!py-2 !px-3 ${scrolled ? '' : '!text-seva-ink'}`} onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className={`!py-2 !px-4 ${scrolled ? '' : '!text-seva-ink'}`} onClick={onLogin}>
                Log in
              </Button>
              <Button className="!py-2 !px-4" onClick={onSignup}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 md:hidden ${onDark ? 'text-seva-ink' : 'text-seva-ink'}`}
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
        <div className="border-t border-white/10 bg-seva-deep px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {baseLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-seva-ink hover:bg-white/10"
                onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <hr className="my-2 border-white/10" />
            {user ? (
              <>
                <p className="px-3 py-1 text-sm text-seva-muted">Signed in as {user.displayName}</p>
                <Button variant="ghost" className="w-full justify-center" onClick={() => { setOpen(false); onLogout(); }}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-center" onClick={() => { setOpen(false); onLogin(); }}>
                  Log in
                </Button>
                <Button className="w-full justify-center" onClick={() => { setOpen(false); onSignup(); }}>
                  Sign up
                </Button>
              </>
            )}
            <Button variant="outline" className="w-full justify-center" onClick={() => { setOpen(false); onBook(); }}>
              Book a Service
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
