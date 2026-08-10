import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import ScrollLanding from './ScrollLanding';
import FlowSection from '../components/FlowSection';
import CTA from '../components/CTA';
import FloatingCallButton from '../components/FloatingCallButton';
import ErrorBoundary from '../components/ErrorBoundary';

const Team = lazy(() => import('../components/Team'));
const PartnersSlider = lazy(() => import('../components/PartnersSlider'));
const FAQ = lazy(() => import('../components/FAQ'));
const Footer = lazy(() => import('../components/Footer'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-purple-500 animate-spin" />
    </div>
  );
}

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('meta.home.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', t('meta.home.description'));
    }
  }, [i18n.language, t]);

  return (
    <>
      <Navigation />
      <Hero />
      <ScrollLanding />
      <FlowSection />
      <ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <Team />
        </Suspense>
      </ErrorBoundary>
      <CTA />
      <ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <PartnersSlider />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <FloatingCallButton />
    </>
  );
};

export default Home;
