import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('cookie.policy_title') + ' — AdyFlow';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    if (meta) {
      meta.setAttribute('content', t('cookie.policy_intro'));
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc);
    };
  }, [i18n.language, t]);

  const sections = [
    { title: t('cookie.policy_s1_title'), paras: [t('cookie.policy_s1_p1'), t('cookie.policy_s1_p2')] },
    { title: t('cookie.policy_s2_title'), paras: [] },
    { title: null, paras: [], sub: true, subTitle: t('cookie.policy_s2_1_title'), subDesc: t('cookie.policy_s2_1_desc') },
    { title: null, paras: [], sub: true, subTitle: t('cookie.policy_s2_2_title'), subDesc: t('cookie.policy_s2_2_desc') },
    { title: null, paras: [], sub: true, subTitle: t('cookie.policy_s2_3_title'), subDesc: t('cookie.policy_s2_3_desc') },
    { title: null, paras: [], sub: true, subTitle: t('cookie.policy_s2_4_title'), subDesc: t('cookie.policy_s2_4_desc') },
    { title: t('cookie.policy_s3_title'), paras: [t('cookie.policy_s3_desc')] },
    { title: t('cookie.policy_s4_title'), paras: [t('cookie.policy_s4_desc')] },
    { title: t('cookie.policy_s5_title'), paras: [t('cookie.policy_s5_p1'), t('cookie.policy_s5_p2')] },
    { title: t('cookie.policy_s6_title'), paras: [t('cookie.policy_s6_desc')] },
    { title: t('cookie.policy_s7_title'), paras: [t('cookie.policy_s7_desc')] },
    { title: t('cookie.policy_s8_title'), paras: [t('cookie.policy_s8_desc')] },
    { title: t('cookie.policy_s9_title'), paras: [t('cookie.policy_s9_desc')] },
    { title: t('cookie.policy_s10_title'), paras: [t('cookie.policy_s10_desc')] },
    { title: t('cookie.policy_s11_title'), paras: [t('cookie.policy_s11_desc')] },
  ];

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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">{t('cookie.policy_effective')}</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            {t('cookie.policy_title')}
          </h1>

          <p className="leading-relaxed text-slate-600 mb-8">
            {t('cookie.policy_intro')}
          </p>

          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{t('cookie.policy_operator')}</h2>
            <div className="space-y-1 text-slate-700">
              <p><strong>{t('cookie.policy_operator_name')}</strong></p>
              <p>{t('cookie.policy_address')}</p>
              <p>{t('cookie.policy_email')} | {t('cookie.policy_phone')}</p>
              <p>{t('cookie.policy_website')}</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-700">
            {sections.map((s, i) => {
              if (s.sub) {
                return (
                  <div key={i} className="ml-4 pl-4 border-l-2 border-purple-100">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.subTitle}</h3>
                    <p className="leading-relaxed">{s.subDesc}</p>
                  </div>
                );
              }
              return (
                <section key={i}>
                  {s.title && <h2 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>}
                  {s.paras.map((p, j) => (
                    <p key={j} className="leading-relaxed mb-4">{p}</p>
                  ))}
                </section>
              );
            })}
          </div>

          <p className="text-sm text-slate-400 mt-10 pt-6 border-t border-slate-100">
            {t('cookie.policy_updated')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
