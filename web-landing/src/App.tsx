import { useCallback, useEffect, useState } from 'react';
import { SplashOverlay } from './components/SplashOverlay';
import { AuthModal, type AuthMode } from './components/AuthModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ServicesGrid } from './components/ServicesGrid';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedPros } from './components/FeaturedPros';
import { ReviewsSection } from './components/ReviewsSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';

export function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('closed');
  const [toast, setToast] = useState<string | null>(null);
  const [location, setLocation] = useState('07302');
  const [service, setService] = useState('Home cleaning');

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

  const openBook = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openSignup = useCallback(() => setAuthMode('signup'), []);

  const openBrowse = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const showToast = useCallback((msg: string) => setToast(msg), []);

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
        onLogin={() => setAuthMode('login')}
        onSignup={() => setAuthMode('signup')}
        onBook={openBook}
      />

      <main className="pb-24 sm:pb-0">
        <Hero
          location={location}
          service={service}
          onLocationChange={setLocation}
          onServiceChange={setService}
          onBook={openBook}
          onBrowse={openBrowse}
        />
        <TrustBar />
        <ServicesGrid onBook={openSignup} />
        <HowItWorks />
        <FeaturedPros
          onViewProfile={openSignup}
          onBecomePro={() => {
            document.getElementById('providers')?.scrollIntoView({ behavior: 'smooth' });
            showToast('Provider onboarding — download the SEVA Pro app or apply on web (coming soon).');
          }}
        />
        <ReviewsSection />
        <FinalCta onBook={openSignup} />
        <Footer />
      </main>

      <MobileStickyCta onBook={openBook} />

      <AuthModal mode={authMode} onClose={() => setAuthMode('closed')} onSuccess={showToast} />
    </>
  );
}
