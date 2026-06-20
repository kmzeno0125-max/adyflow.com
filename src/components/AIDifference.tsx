import { Sparkles, TrendingUp, Users, Repeat, BarChart3, Heart, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIDifference = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-50/80 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-blue-50/80 rounded-full filter blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-600 text-sm font-semibold mb-6">
            {t('ai_difference.section_label')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('ai_difference.title_part1')} <span className="gradient-text">{t('ai_difference.title_highlight')}</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed">
            {t('ai_difference.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl border border-red-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{'\u274C'}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t('ai_difference.traditional.title')}</h3>
            </div>
            <div className="space-y-4 text-slate-600">
              <p className="leading-relaxed">
                {t('ai_difference.traditional.intro')}
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">{'\u2022'}</span>
                  <span>{t('ai_difference.traditional.item1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">{'\u2022'}</span>
                  <span>{t('ai_difference.traditional.item2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">{'\u2022'}</span>
                  <span>{t('ai_difference.traditional.item3')}</span>
                </li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mt-6">
                <p className="text-red-700 font-semibold">
                  {t('ai_difference.traditional.summary')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-green-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t('ai_difference.adyflow.title')}</h3>
            </div>
            <div className="space-y-4 text-slate-600">
              <p className="leading-relaxed">
                {t('ai_difference.adyflow.intro')}
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">{'\u2713'}</span>
                  <span>{t('ai_difference.adyflow.item1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">{'\u2713'}</span>
                  <span>{t('ai_difference.adyflow.item2_part1')} <strong className="text-slate-900">{t('ai_difference.adyflow.item2_strong')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">{'\u2713'}</span>
                  <span>{t('ai_difference.adyflow.item3_part1')} <strong className="text-slate-900">{t('ai_difference.adyflow.item3_strong')}</strong></span>
                </li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mt-6">
                <p className="text-green-700 font-semibold">
                  {t('ai_difference.adyflow.summary')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              {t('ai_difference.benefits.title_part1')} <span className="gradient-text">{t('ai_difference.benefits.title_highlight')}</span>
            </h3>
            <p className="text-slate-500 text-lg">
              {t('ai_difference.benefits.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {t('ai_difference.benefits.card1.title')}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('ai_difference.benefits.card1.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {t('ai_difference.benefits.card2.title')}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('ai_difference.benefits.card2.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {t('ai_difference.benefits.card3.title')}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('ai_difference.benefits.card3.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-pink-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {t('ai_difference.benefits.card4.title')}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('ai_difference.benefits.card4.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Repeat className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {t('ai_difference.benefits.card5.title')}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t('ai_difference.benefits.card5.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-8 md:p-12">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-white border border-purple-200 rounded-full text-purple-700 text-sm font-semibold mb-6 shadow-sm">
              {t('ai_difference.positioning.label')}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {t('ai_difference.positioning.quote_part1')} <span className="gradient-text">{t('ai_difference.positioning.quote_highlight')}</span>{t('ai_difference.positioning.quote_part2')}
            </h3>
            <p className="text-slate-600 text-lg mb-8 max-w-3xl mx-auto">
              {t('ai_difference.positioning.subtitle')}
            </p>
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              {t('ai_difference.positioning.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-slate-500 mt-4 text-sm">
              {t('ai_difference.positioning.cta_subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDifference;
