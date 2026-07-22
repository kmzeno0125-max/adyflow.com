import { useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import ScrollLanding from './ScrollLanding';
import FlowSection from '../components/FlowSection';
import CTA from '../components/CTA';
import FloatingCallButton from '../components/FloatingCallButton';
import IntroAnimation from '../components/IntroAnimation';

const Team = lazy(() => import('../components/Team'));
const PartnersSlider = lazy(() => import('../components/PartnersSlider'));
const FAQ = lazy(() => import('../components/FAQ'));
const Footer = lazy(() => import('../components/Footer'));

function shouldShowIntro(hash: string, search: string): boolean {
  const params = new URLSearchParams(search);
  if (params.get('intro') === '1') return true;

  if (hash) return false;
  if (sessionStorage.getItem('adyflow_intro_v1')) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  return true;
}

const Home = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() =>
    shouldShowIntro(location.hash, location.search)
  );

  useEffect(() => {
    document.title = t('meta.home.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', t('meta.home.description'));
    }
  }, [i18n.language, t]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <ScrollLanding />
      <FlowSection />
      <Suspense fallback={null}>
        <Team />
        <CTA />
        <PartnersSlider />
        <FAQ />
        <Footer />
      </Suspense>
      <FloatingCallButton />
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
    </>
  );
};

export default Home;
