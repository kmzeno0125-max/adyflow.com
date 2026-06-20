import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Disclaimer = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('meta.disclaimer.title');
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    if (meta) {
      meta.setAttribute('content', t('meta.disclaimer.description'));
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc);
    };
  }, [i18n.language, t]);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('disclaimer.back')}
        </Link>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t('disclaimer.title')}
          </h1>
          <p className="text-slate-500 mb-8">{t('disclaimer.last_updated')}</p>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.interpretation_title')}</h2>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">{t('disclaimer.interpretation_subtitle')}</h3>
              <p className="leading-relaxed">
                {t('disclaimer.interpretation_text')}
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">{t('disclaimer.definitions_title')}</h3>
              <p className="leading-relaxed mb-3">{t('disclaimer.definitions_intro')}</p>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>{t('disclaimer.company_label')}</strong> {t('disclaimer.company_text')}</li>
                <li><strong>{t('disclaimer.service_label')}</strong> {t('disclaimer.service_text')}</li>
                <li><strong>{t('disclaimer.you_label')}</strong> {t('disclaimer.you_text')}</li>
                <li><strong>{t('disclaimer.website_label')}</strong> {t('disclaimer.website_text')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.disclaimer_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.disclaimer_p1')}
              </p>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.disclaimer_p2')}
              </p>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.disclaimer_p3')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.disclaimer_p4')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.external_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.external_p1')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.external_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.errors_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.errors_p1')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.errors_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.fairuse_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.fairuse_p1')}
              </p>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.fairuse_p2')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.fairuse_p3')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.views_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.views_p1')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.views_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.liability_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.liability_p1')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.liability_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.asis_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('disclaimer.asis_p1')}
              </p>
              <p className="leading-relaxed">
                {t('disclaimer.asis_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('disclaimer.contact_title')}</h2>
              <p className="mb-3">{t('disclaimer.contact_intro')}</p>
              <ul className="space-y-2 pl-6">
                <li>{t('disclaimer.contact_email')}</li>
                <li>{t('disclaimer.contact_web')}</li>
                <li>{t('disclaimer.contact_phone')}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
