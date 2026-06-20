import { Building2, TrendingUp, Users, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Audience() {
  const { t } = useTranslation()

  const targetGroups = [
    {
      icon: Building2,
      title: t('audience.cards.smb.title'),
      description: t('audience.cards.smb.description')
    },
    {
      icon: TrendingUp,
      title: t('audience.cards.advertising.title'),
      description: t('audience.cards.advertising.description')
    },
    {
      icon: Users,
      title: t('audience.cards.open.title'),
      description: t('audience.cards.open.description')
    },
    {
      icon: Target,
      title: t('audience.cards.longterm.title'),
      description: t('audience.cards.longterm.description')
    }
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('audience.title_line1')}<br />
            <span className="gradient-text">{t('audience.title_highlight')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('audience.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {targetGroups.map((group, idx) => (
            <div
              key={idx}
              className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="inline-flex p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <group.icon className="text-purple-600" size={24} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{group.title}</h3>
              <p className="text-slate-500 text-sm">{group.description}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-2xl border border-purple-100 p-8 lg:p-12 text-center">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 leading-relaxed">
              {t('audience.callout_part1')} <span className="gradient-text">{t('audience.callout_for_you')}</span>{t('audience.callout_part2')} <span className="text-purple-600">{t('audience.callout_data')}</span>{t('audience.callout_part3')}<br className="hidden lg:block" />
              <span className="text-pink-600">{t('audience.callout_automated')}</span>{t('audience.callout_part4')} <span className="gradient-text">{t('audience.callout_real')}</span> {t('audience.callout_part5')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
