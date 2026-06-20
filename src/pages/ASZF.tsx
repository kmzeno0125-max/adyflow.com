import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ASZF = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('meta.aszf.title');
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    if (meta) {
      meta.setAttribute('content', t('meta.aszf.description'));
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
          {t('aszf.back')}
        </Link>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {t('aszf.title')}
          </h1>
          <p className="text-slate-500 mb-8">{t('aszf.valid_from')}</p>
          <p className="text-slate-700 mb-8">{t('aszf.operator')}</p>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section1_title')}</h2>
              <ul className="space-y-2 pl-6">
                <li><strong>{t('aszf.provider_name_label')}</strong> {t('aszf.provider_name_value')}</li>
                <li><strong>{t('aszf.headquarters_label')}</strong> {t('aszf.headquarters_value')}</li>
                <li><strong>{t('aszf.email_label')}</strong> {t('aszf.email_value')}</li>
                <li><strong>{t('aszf.website_label')}</strong> {t('aszf.website_value')}</li>
                <li><strong>{t('aszf.phone_label')}</strong> {t('aszf.phone_value')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section2_title')}</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>{t('aszf.section2_item1')}</li>
                <li>{t('aszf.section2_item2')}</li>
                <li>{t('aszf.section2_item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section3_title')}</h2>
              <ul className="space-y-3 list-disc pl-6">
                <li>{t('aszf.section3_item1')}</li>
                <li>{t('aszf.section3_item2')}</li>
                <li>{t('aszf.section3_item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section4_title')}</h2>
              <p className="leading-relaxed">
                {t('aszf.section4_text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section5_title')}</h2>
              <p className="leading-relaxed">
                {t('aszf.section5_text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section6_title')}</h2>
              <p className="mb-3">{t('aszf.section6_intro')}</p>
              <ul className="space-y-2 pl-6">
                <li>{t('aszf.section6_email')}</li>
                <li>{t('aszf.section6_web')}</li>
                <li>{t('aszf.section6_phone')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('aszf.section7_title')}</h2>
              <p className="leading-relaxed">
                {t('aszf.section7_text')}
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500">{t('aszf.footer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASZF;
