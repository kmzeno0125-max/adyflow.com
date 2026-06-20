import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('meta.privacy.title');
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    if (meta) {
      meta.setAttribute('content', t('meta.privacy.description'));
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc);
    };
  }, [i18n.language, t]);

  const categories = t('privacy.categories', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('privacy.back')}
        </Link>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            {t('privacy.title')}
          </h1>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section1_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.section1_p1')}
              </p>
              <p className="leading-relaxed mb-4">
                {t('privacy.section1_p2')}
              </p>
              <p className="leading-relaxed">
                <strong>{t('privacy.section1_label')}</strong> {t('privacy.section1_value')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section2_title')}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.purpose_title')}</h3>
                  <p className="leading-relaxed">
                    {t('privacy.purpose_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.legal_basis_title')}</h3>
                  <p className="leading-relaxed">
                    {t('privacy.legal_basis_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.categories_title')}</h3>
                  <ul className="space-y-2 list-disc pl-6">
                    {categories.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <p className="leading-relaxed">
                  {t('privacy.voluntary_text')}
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.retention_title')}</h3>
                  <p className="leading-relaxed">
                    {t('privacy.retention_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.share_title')}</h3>
                  <p className="leading-relaxed">
                    {t('privacy.share_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.eu_title')}</h3>
                  <p className="leading-relaxed">
                    {t('privacy.eu_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('privacy.user_data_title')}</h3>
                  <p className="leading-relaxed mb-4">
                    {t('privacy.user_data_p1')}
                  </p>
                  <p className="leading-relaxed">
                    {t('privacy.user_data_p2')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section3_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.section3_p1')}
              </p>
              <p className="leading-relaxed">
                {t('privacy.section3_p2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section4_title')}</h2>
              <p className="leading-relaxed">
                {t('privacy.section4_text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section5_title')}</h2>
              <p className="leading-relaxed">
                {t('privacy.section5_text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section6_title')}</h2>
              <p className="leading-relaxed">
                {t('privacy.section6_text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('privacy.section7_title')}</h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.section7_p1')}
              </p>
              <p className="leading-relaxed mb-4">
                {t('privacy.section7_p2')}
              </p>
              <p className="leading-relaxed">
                {t('privacy.section7_p3')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
