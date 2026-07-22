import { useState } from 'react';
import {
  PenTool,
  Target,
  Clock,
  Smartphone,
  Globe,
  Mail,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type PortfolioItem = {
  domain: string;
  fallbackLogo?: string;
  localImage?: string;
};

const PORTFOLIO: PortfolioItem[] = [
  { domain: 'jakaprojekt.ch', fallbackLogo: '/files_8595244-2026-02-18T08-08-05-452Z-image.png' },
  { domain: 'angelasalon.eu' },
  { domain: 'fifteenapartman.hu', fallbackLogo: '/files_8595244-2026-02-18T09-19-07-295Z-image.png' },
  { domain: 'upgradegmbh.com', fallbackLogo: '/files_8595244-2026-04-20T09-35-45-999Z-image.png' },
  { domain: 'expresszablak.hu' },
  { domain: 'smoothskinpecs.hu', fallbackLogo: '/files_8595244-2026-02-19T16-05-40-810Z-files_8595244-2026-02-19T15-58-19-307Z-image.png' },
  { domain: 'alpakabakonya.hu', fallbackLogo: '/files_8595244-2026-02-18T08-07-05-592Z-image.png' },
  { domain: 'mecsekszerviz.hu' },
  { domain: 'pliszepro.hu', localImage: '/assets/partners/pliszepro-preview.jpg' }
];

const screenshotSources = (domain: string) => [
  `https://s.wordpress.com/mshots/v1/https%3A%2F%2F${domain}?w=1280&h=900`,
  `https://api.microlink.io/?url=https%3A%2F%2F${domain}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=900`,
  `https://image.thum.io/get/width/1200/crop/800/noanimate/https://${domain}/`
];

export default function WebsiteService() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleWebsiteCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('kapcsolat');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#kapcsolat');
    }
  };

  return (
    <section
      id="weboldal"
      className="relative py-20 lg:py-32 overflow-hidden bg-white"
      style={{ background: 'radial-gradient(ellipse at top left, #f8f7ff 0%, #faf7ff 35%, #fcfbff 70%, #fcfbff 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-32 w-[700px] h-[700px] bg-purple-700/12 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-700/[0.04] rounded-full blur-[160px]"></div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(236,72,153,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,72,153,0.6) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 backdrop-blur-md border border-slate-200 rounded-full text-slate-700 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_24px_rgba(168,85,247,0.1)]">
            <Sparkles size={14} className="text-pink-600" />
            {t('website.section_label')}
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight">
            <span className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.15)]">
              {t('website.title')}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600/90 max-w-2xl mx-auto leading-relaxed">
            {t('website.subtitle')}
          </p>
        </div>

        <PremiumFeatures t={t} onCta={handleWebsiteCta} />

        <div className="mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 border border-pink-300 rounded-full text-pink-700 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
              {t('website.portfolio.label')}
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('website.portfolio.title')}
              </span>
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('website.portfolio.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PORTFOLIO.map((item) => (
              <PortfolioCard key={item.domain} item={item} viewLabel={t('website.portfolio.view')} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/30">
              <a
                href="/#kapcsolat"
                onClick={handleWebsiteCta}
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white hover:bg-slate-50 rounded-xl font-bold text-lg sm:text-xl text-slate-900 transition-all duration-300"
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('website.cta_button')}
                </span>
                <ArrowRight className="w-5 h-5 text-pink-600 group-hover:translate-x-1 transition-transform motion-reduce:transform-none" />
              </a>
            </div>
            <p className="text-slate-600 mt-4 text-sm">
              {t('website.cta_subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item, viewLabel }: { item: PortfolioItem; viewLabel: string }) {
  const sources = screenshotSources(item.domain);
  const [srcIdx, setSrcIdx] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [loaded, setLoaded] = useState(item.localImage ? true : false);

  const handleError = () => {
    if (srcIdx < sources.length - 1) {
      setSrcIdx(srcIdx + 1);
    } else if (item.fallbackLogo) {
      setShowLogo(true);
    }
  };

  return (
    <a
      href={`https://${item.domain}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-pink-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 relative">
        {!loaded && !showLogo && !item.localImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 border-t-pink-400 animate-spin motion-reduce:animate-none"></div>
          </div>
        )}
        {showLogo && item.fallbackLogo ? (
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <img
              src={item.fallbackLogo}
              alt={item.domain}
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_20px_rgba(236,72,153,0.15)]"
              loading="lazy"
            />
          </div>
        ) : item.localImage ? (
          <img
            src={item.localImage}
            alt={`A ${item.domain} weboldal kezdőoldalának előnézete`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500 motion-reduce:transform-none"
          />
        ) : (
          <img
            key={srcIdx}
            src={sources[srcIdx]}
            alt={item.domain}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500 motion-reduce:transform-none ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80"></span>
          <div className="ml-2 flex-1 px-2.5 py-1 bg-slate-900/40 backdrop-blur-md rounded-md border border-white/20 text-[10px] font-mono text-slate-600 truncate">
            {item.domain}
          </div>
        </div>
      </div>

      <div className="relative p-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-slate-900 font-semibold text-sm md:text-base truncate">{item.domain}</p>
          <p className="text-slate-400 text-xs">Live preview</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 group-hover:text-slate-900 transition-colors">
          {viewLabel}
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform motion-reduce:transform-none" />
        </span>
      </div>
    </a>
  );
}

type LargeKey = 'design' | 'conversion' | 'fast';
type SmallKey = 'mobile' | 'domain' | 'auto';

function PremiumFeatures({
  t,
  onCta
}: {
  t: (key: string) => string;
  onCta: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const largeItems: Array<{
    key: LargeKey;
    num: string;
    icon: typeof PenTool;
  }> = [
    { key: 'design', num: '01', icon: PenTool },
    { key: 'conversion', num: '02', icon: Target },
    { key: 'fast', num: '03', icon: Clock },
  ];

  const smallItems: Array<{
    key: SmallKey;
    num: string;
    icon: typeof Smartphone;
  }> = [
    { key: 'mobile', num: '04', icon: Smartphone },
    { key: 'domain', num: '05', icon: Globe },
    { key: 'auto', num: '06', icon: Mail },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-4 sm:-inset-6 rounded-[36px] bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-purple-600/10 blur-2xl pointer-events-none" />

      <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-pink-500/40 via-purple-500/20 to-pink-500/40 shadow-[0_40px_120px_-30px_rgba(168,85,247,0.45)]"
      >
        <div className="relative rounded-[27px] bg-white/95 backdrop-blur-2xl p-5 sm:p-8 md:p-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(236,72,153,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.7) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
              maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)'
            }}
          />
          <div className="absolute -top-40 -left-32 w-[480px] h-[480px] bg-purple-700/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-32 w-[480px] h-[480px] bg-pink-600/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-pink-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">
            {largeItems.map(({ key, num, icon: Icon }) => (
              <LargeCard key={key} num={num} Icon={Icon} t={t} k={key} />
            ))}
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {smallItems.map(({ key, num, icon: Icon }) => (
              <SmallCard key={key} num={num} Icon={Icon} t={t} k={key} />
            ))}
          </div>

          <div className="relative mt-8 md:mt-10">
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/40 via-fuchsia-500/30 to-purple-500/40 shadow-[0_20px_60px_-20px_rgba(236,72,153,0.4)]">
                <div className="relative rounded-[15px] bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-64 bg-pink-500/8 rounded-full blur-[110px] pointer-events-none" />
                  <div className="absolute -bottom-24 -left-12 w-72 h-72 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute -bottom-24 -right-12 w-72 h-72 bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(236,72,153,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.7) 1px, transparent 1px)',
                      backgroundSize: '44px 44px',
                      maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)'
                    }}
                  />

                  <div className="relative px-6 sm:px-10 md:px-14 py-10 md:py-14 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 shadow-[0_0_20px_rgba(236,72,153,0.12)]">
                      <Sparkles size={12} className="text-pink-600" />
                      24h
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-slate-900 leading-[1.15] tracking-tight mb-4 max-w-2xl">
                      {t('website.feature_cta.headline')}
                    </h3>
                    <p className="text-[15px] sm:text-base md:text-lg text-slate-600/85 leading-relaxed mb-8 max-w-xl">
                      {t('website.feature_cta.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <a
                        href="/#kapcsolat"
                        onClick={onCta}
                        className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-[15px] sm:text-base text-white overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none shadow-[0_12px_40px_-8px_rgba(236,72,153,0.6)] hover:shadow-[0_16px_50px_-6px_rgba(236,72,153,0.8)]"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, #d946ef 0%, #ec4899 50%, #a855f7 100%)'
                        }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                        <span className="absolute inset-[1px] rounded-full border border-white/20 pointer-events-none" />
                        <span className="relative">{t('website.feature_cta.primary')}</span>
                        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transform-none" strokeWidth={2.5} />
                      </a>

                      <a
                        href="/#kapcsolat"
                        onClick={onCta}
                        className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-[15px] sm:text-base text-pink-700 border border-pink-300 bg-pink-50 hover:bg-pink-100 hover:border-pink-400 transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4 text-pink-600" strokeWidth={2.25} />
                        <span>{t('website.feature_cta.secondary')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LargeCard({
  num,
  Icon,
  t,
  k
}: {
  num: string;
  Icon: typeof PenTool;
  t: (key: string) => string;
  k: LargeKey;
}) {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-pink-500/40 via-purple-500/15 to-pink-500/30 transition-transform duration-500 hover:-translate-y-1 motion-reduce:transform-none">
      <div className="absolute -inset-x-6 -bottom-8 h-24 bg-pink-500/20 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative rounded-[15px] bg-gradient-to-b from-white via-slate-50 to-white p-7 md:p-9 flex flex-col items-center text-center overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-72 h-48 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mb-6 mt-2">
          <div className="absolute inset-0 -m-4 bg-pink-500/20 blur-2xl rounded-full pointer-events-none group-hover:bg-pink-500/30 transition-colors duration-500" />
          <div className="relative w-[72px] h-[72px] md:w-20 md:h-20 rounded-[18px] bg-gradient-to-br from-fuchsia-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-[0_10px_40px_-4px_rgba(236,72,153,0.65),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none">
            <div className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/25 via-transparent to-black/20" />
            <div className="absolute inset-[1px] rounded-[17px] border border-white/20" />
            <Icon className="relative w-9 h-9 md:w-10 md:h-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" strokeWidth={2} />
          </div>
        </div>

        <span className="relative text-xs font-medium tracking-[0.3em] text-pink-600/80 mb-3">
          {num}
        </span>

        <h4 className="relative text-2xl md:text-[26px] font-bold text-slate-900 mb-3 leading-tight tracking-tight">
          {t(`website.features.${k}.title`)}
        </h4>
        <p className="relative text-[15px] text-slate-600 leading-relaxed mb-7 max-w-[28ch]">
          {t(`website.features.${k}.description`)}
        </p>

        <div className="relative w-full mt-auto pt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent mb-5" />
          <p className="text-base md:text-[17px] font-semibold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(236,72,153,0.2)]">
            {t(`website.features.${k}.promise`)}
          </p>
        </div>
      </div>
    </div>
  );
}

function SmallCard({
  num,
  Icon,
  t,
  k
}: {
  num: string;
  Icon: typeof Smartphone;
  t: (key: string) => string;
  k: SmallKey;
}) {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-pink-500/25 via-purple-500/10 to-pink-500/20 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none">
      <div className="relative rounded-[15px] bg-gradient-to-b from-white to-slate-50 p-5 md:p-6 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="absolute -top-16 -left-12 w-44 h-44 bg-purple-600/8 rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 -m-2 bg-pink-500/20 blur-xl rounded-full pointer-events-none" />
            <div className="relative w-12 h-12 md:w-[52px] md:h-[52px] rounded-[14px] bg-gradient-to-br from-fuchsia-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-[0_6px_22px_-4px_rgba(236,72,153,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]">
              <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-white/20 via-transparent to-black/15" />
              <div className="absolute inset-[1px] rounded-[13px] border border-white/15" />
              <Icon className="relative w-5 h-5 md:w-[22px] md:h-[22px] text-white" strokeWidth={2} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h5 className="text-[17px] md:text-lg font-bold text-slate-900 leading-snug">
                {t(`website.features.${k}.title`)}
              </h5>
              <span className="shrink-0 text-[10px] font-medium tracking-[0.25em] text-pink-600/70 mt-1.5">
                {num}
              </span>
            </div>
            <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed">
              {t(`website.features.${k}.description`)}
            </p>
          </div>
        </div>

        <div className="relative pt-3.5 border-t border-pink-500/10 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]" strokeWidth={2.5} />
          <span className="text-[13px] font-medium text-pink-700">
            {t(`website.features.${k}.bullet`)}
          </span>
        </div>
      </div>
    </div>
  );
}

