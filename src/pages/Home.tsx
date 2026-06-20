import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import FlowSection from '../components/FlowSection';
import AIDifference from '../components/AIDifference';
import Problem from '../components/Problem';
import Audience from '../components/Audience';
import Team from '../components/Team';
import SocialProof from '../components/SocialProof';
import PartnersSlider from '../components/PartnersSlider';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

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
    </>
  );
};

export default Home;
