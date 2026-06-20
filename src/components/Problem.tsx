import { AlertCircle, TrendingDown, Clock, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Problem() {
  const { t } = useTranslation()

  const problems = [
    {
      icon: TrendingDown,
      title: t('problem.cards.unpredictable.title'),
      description: t('problem.cards.unpredictable.description')
    },
    {
      icon: AlertCircle,
      title: t('problem.cards.low_roi.title'),
      description: t('problem.cards.low_roi.description')
    },
    {
      icon: Clock,
      title: t('problem.cards.manual.title'),
      description: t('problem.cards.manual.description')
    },
    {
      icon: Users,
      title: t('problem.cards.disconnected.title'),
      description: t('problem.cards.disconnected.description')
    }
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('problem.title_line1')}<br />
            <span className="gradient-text">{t('problem.title_highlight')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                    <problem.icon className="text-red-500" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{problem.title}</h3>
                  <p className="text-slate-500">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {t('problem.callout_part1')} <span className="text-red-500">{t('problem.callout_no_marketing')}</span> {t('problem.callout_part2')}<br />
              <span className="gradient-text">{t('problem.callout_no_system')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
