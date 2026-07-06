import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';

const Audience = lazy(() => import('../components/Audience'));
const Problem = lazy(() => import('../components/Problem'));
const FlowSection = lazy(() => import('../components/FlowSection'));
const AIDifference = lazy(() => import('../components/AIDifference'));
const Team = lazy(() => import('../components/Team'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const PartnersSlider = lazy(() => import('../components/PartnersSlider'));
const FAQ = lazy(() => import('../components/FAQ'));
const CTA = lazy(() => import('../components/CTA'));
const Footer = lazy(() => import('../components/Footer'));

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
      <Suspense fallback={null}>
        <Audience />
        <Problem />
        <FlowSection />
        <AIDifference />
        <Team />
        <SocialProof />
        <PartnersSlider />
        <FAQ />
        <CTA />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
