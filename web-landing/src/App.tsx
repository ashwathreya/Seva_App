import { useCallback, useEffect, useState } from 'react';
import { SplashOverlay } from './components/SplashOverlay';
import { AuthModal, type AuthMode, type AuthSuccessMeta } from './components/AuthModal';
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
import { CustomerAppExperience, type CustomerAppScreen } from './customerPortal/CustomerAppExperience';
import { clearSession, loadSession, saveSession, type SessionUser } from './session';

export function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('closed');
  const [toast, setToast] = useState<string | null>(null);
  const [location, setLocation] = useState('07302');
  const [service, setService] = useState('Home cleaning');
  const [user, setUser] = useState<SessionUser | null>(null);
  const [customerAppOpen, setCustomerAppOpen] = useState(false);
  const [customerEntryScreen, setCustomerEntryScreen] = useState<CustomerAppScreen>('home');

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

  const openCustomerApp = useCallback((screen: CustomerAppScreen) => {
    if (!user) {
      setAuthMode('signup');
      return;
    }
    setCustomerEntryScreen(screen);
    setCustomerAppOpen(true);
  }, [user]);

  const goToBookingFlow = useCallback(() => {
    openCustomerApp('booking');
  }, [openCustomerApp]);

  const goToServices = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openSignup = useCallback(() => setAuthMode('signup'), []);

  const handleAuthenticated = useCallback((next: SessionUser, meta: AuthSuccessMeta) => {
    const prev = loadSession();
    let merged: SessionUser;
    if (meta.isNewSignup) {
      merged = { ...next, onboardingComplete: false };
    } else if (prev && prev.email === next.email) {
      merged = { ...next, onboardingComplete: prev.onboardingComplete !== false };
    } else {
      merged = { ...next, onboardingComplete: true };
    }
    saveSession(merged);
    setUser(merged);
    setAuthMode('closed');
    if (merged.onboardingComplete === false) {
      setCustomerEntryScreen('onboarding');
      setCustomerAppOpen(true);
    } else {
      setCustomerAppOpen(false);
      requestAnimationFrame(() => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setUser((u) => {
      if (!u) return u;
      const next = { ...u, onboardingComplete: true as const };
      saveSession(next);
      return next;
    });
  }, []);

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
    setCustomerAppOpen(false);
    showToast('You’re signed out.');
  }, [showToast]);

  return (
    <>
      {!splashDone ? <SplashOverlay onDone={() => setSplashDone(true)} /> : null}

      {toast ? (
        <div
          className="fixed left-1/2 top-20 z-[110] max-w-md -translate-x-1/2 rounded-xl border border-[#F0A500]/40 bg-[#071F20] px-5 py-3 text-center text-sm font-medium text-[#EAF3F3] shadow-lg animate-[fadeSlide_0.3s_ease-out]"
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
        onLogin={() => setAuthMode('login')}
        onSignup={() => setAuthMode('signup')}
        onLogout={handleLogout}
        onBook={goToBookingFlow}
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
          onSignIn={() => setAuthMode('login')}
          onOpenHome={() => openCustomerApp('home')}
          onRequestBooking={goToBookingFlow}
          onBrowseServices={goToServices}
          onLogout={handleLogout}
        />
        <ServicesGrid onBook={goToBookingFlow} />
        <HowItWorks />
        <FeaturedPros
          onViewProfile={() => openCustomerApp('profile')}
          onBecomePro={() => {
            document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Provider onboarding — download the SEVA Pro app or apply on web (coming soon).');
          }}
        />
        <ReviewsSection />
        <FinalCta onBook={goToBookingFlow} />
        <Footer />
      </main>

      <MobileStickyCta onBook={goToBookingFlow} />

      <CustomerAppExperience
        open={customerAppOpen}
        onClose={() => setCustomerAppOpen(false)}
        entryScreen={customerEntryScreen}
        homeGreetingName={user?.displayName ?? null}
        onOnboardingComplete={handleOnboardingComplete}
      />

      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode('closed')}
        onSuccess={showToast}
        onAuthenticated={handleAuthenticated}
      />
    </>
  );
}
