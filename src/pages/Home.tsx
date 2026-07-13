import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import ScrollLanding from './ScrollLanding';

const Team = lazy(() => import('../components/Team'));
const PartnersSlider = lazy(() => import('../components/PartnersSlider'));
const FAQ = lazy(() => import('../components/FAQ'));
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
      <ScrollLanding />
      <Suspense fallback={null}>
        <Team />
        <PartnersSlider />
        <FAQ />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
