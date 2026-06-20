import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WebsiteService from '../components/WebsiteService';
import WeboldalHeroVisual from '../components/WeboldalHeroVisual';
import FloatingCallButton from '../components/FloatingCallButton';

export default function Weboldal() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    document.title = t('meta.weboldal.title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', t('meta.weboldal.description'));
    }
  }, [i18n.language, t]);

  return (
    <>
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b from-purple-600/15 via-pink-600/8 to-transparent blur-3xl"></div>
          <div className="absolute top-40 -left-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -right-32 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }}></div>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(148 163 184 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)'
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 backdrop-blur-md border border-slate-200 rounded-full text-sm font-semibold text-purple-700 mb-6">
              <Sparkles size={14} className="text-pink-600" />
              <span>{t('weboldal_page.eyebrow')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
              {t('weboldal_page.hero_title_part1')}{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('weboldal_page.hero_title_highlight')}
              </span>
              <br />
              {t('weboldal_page.hero_title_part2')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('weboldal_page.hero_subtitle')}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/?service=weboldal#kapcsolat"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.03] transition-all duration-300 motion-reduce:transform-none"
              >
                <span>{t('weboldal_page.cta_primary')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform motion-reduce:transform-none" />
              </Link>
              <a
                href="#kapcsolat-weboldal"
                onClick={(e) => {
                  e.preventDefault();
                  const features = document.getElementById('weboldal-szolgaltatas');
                  if (features) features.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 bg-white text-slate-700 font-semibold hover:border-pink-400/70 hover:bg-slate-50 transition-all duration-300"
              >
                {t('weboldal_page.cta_secondary')}
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-pink-600" />
                {t('weboldal_page.cta_bullet_1')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-pink-600" />
                {t('weboldal_page.cta_bullet_2')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-pink-600" />
                {t('weboldal_page.cta_bullet_3')}
              </span>
            </div>
          </div>

          <WeboldalHeroVisual />
        </div>
      </section>

      <div id="weboldal-szolgaltatas">
        <WebsiteService />
      </div>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
