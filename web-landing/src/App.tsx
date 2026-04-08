import { useCallback, useEffect, useState } from 'react';
import { SplashOverlay } from './components/SplashOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { UserDashboardSection } from './components/UserDashboardSection';
import { ServicesGrid } from './components/ServicesGrid';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedPros } from './components/FeaturedPros';
import { ReviewsSection } from './components/ReviewsSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { clearSession, loadSession, type SessionUser } from './session';

export function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [location, setLocation] = useState('07302');
  const [service, setService] = useState('Home cleaning');
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(loadSession());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const goToBookingFlow = useCallback(() => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goToServices = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
    showToast('You’re signed out.');
  }, [showToast]);

  return (
    <>
      {!splashDone ? <SplashOverlay onDone={() => setSplashDone(true)} /> : null}

      {toast ? (
        <div
          className="fixed left-1/2 top-20 z-[110] max-w-md -translate-x-1/2 rounded-xl border border-ds-gold/30 bg-ds-surface px-5 py-3 text-center text-sm font-medium text-ds-text shadow-[0_16px_48px_rgba(0,0,0,0.45)] animate-[fadeSlide_0.25s_ease-out]"
          role="status">
          {toast}
        </div>
      ) : null}

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <Navbar
        scrolled={scrolled}
        user={user}
        onLogin={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
        onSignup={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
        onLogout={handleLogout}
        onBook={goToBookingFlow}
        onProWorkspace={() => document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <main className="pb-24 sm:pb-0">
        <Hero
          location={location}
          service={service}
          userDisplayName={user?.displayName ?? null}
          onLocationChange={setLocation}
          onServiceChange={setService}
          onBook={goToBookingFlow}
          onBrowse={goToServices}
        />
        <TrustBar />
        <UserDashboardSection
          user={user}
          location={location}
          service={service}
          onSignIn={() => showToast('Account and onboarding screens were removed from lightbox flow.')}
          onOpenHome={goToBookingFlow}
          onRequestBooking={goToBookingFlow}
          onBrowseServices={goToServices}
          onLogout={handleLogout}
        />
        <ServicesGrid onBook={goToBookingFlow} />
        <HowItWorks />
        <FeaturedPros
          onViewProfile={() => document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' })}
          onBecomePro={() => document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <ReviewsSection />
        <FinalCta onBook={goToBookingFlow} />
        <Footer />
      </main>

      <MobileStickyCta onBook={goToBookingFlow} />
    </>
  );
}
