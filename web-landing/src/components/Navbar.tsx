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
  onProWorkspace: () => void;
};

const baseLinks = [
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#services', label: 'Services' },
  { href: '#how', label: 'How it works' },
  { href: '#providers', label: 'Providers' },
] as const;

export function Navbar({ scrolled, user, onLogin, onSignup, onLogout, onBook, onProWorkspace }: Props) {
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  const linkClass = solid ? 'text-ds-text2 hover:text-ds-text' : 'text-ds-text/90 hover:text-ds-text';

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-200 ease-out ${
        solid ? 'border-b border-ds-line bg-ds-base/92 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl' : 'bg-transparent'
      }`}>
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/seva_logo_new.png"
            alt="SEVA"
            className={`h-8 w-auto object-contain transition-opacity duration-200 sm:h-9 ${solid ? 'opacity-95' : 'opacity-100 drop-shadow-md'}`}
            width={140}
            height={36}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {baseLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium tracking-wide transition-colors duration-200 ease-out ${linkClass}`}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onProWorkspace}
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ease-out ${linkClass}`}>
            Pro workspace
          </button>
        </nav>

        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          {user ? (
            <>
              <a
                href="#dashboard"
                className={`max-w-[140px] truncate text-sm font-medium transition-colors duration-200 ease-out ${linkClass}`}
                title={user.displayName}>
                Hi, {firstName(user.displayName)}
              </a>
              <Button variant="ghost" className="!px-3 !py-2 text-sm" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="!px-4 !py-2 text-sm" onClick={onLogin}>
                Log in
              </Button>
              <Button className="!px-5 !py-2 text-sm" onClick={onSignup}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={`rounded-xl p-2 md:hidden ${linkClass}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ds-line bg-ds-surface px-4 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {baseLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-3 text-sm font-medium text-ds-text transition duration-200 ease-out hover:bg-ds-elevated"
                onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <button
              type="button"
              className="rounded-xl px-3 py-3 text-left text-sm font-medium text-ds-text transition duration-200 ease-out hover:bg-ds-elevated"
              onClick={() => {
                setOpen(false);
                onProWorkspace();
              }}>
              Pro workspace
            </button>
            <hr className="my-3 border-ds-line" />
            {user ? (
              <>
                <p className="px-3 py-2 text-xs uppercase tracking-wider text-ds-quiet">Signed in as {user.displayName}</p>
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
