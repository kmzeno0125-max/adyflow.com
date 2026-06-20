import { Brain, Workflow, LineChart, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Solution() {
  const { t } = useTranslation()

  const solutions = [
    {
      icon: Brain,
      title: t('solution.cards.ai.title'),
      description: t('solution.cards.ai.description'),
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/50',
      badge: '01',
      timing: t('solution.cards.ai.timing'),
      position: 'left'
    },
    {
      icon: Workflow,
      title: t('solution.cards.sales.title'),
      description: t('solution.cards.sales.description'),
      color: 'from-purple-500 to-pink-500',
      glowColor: 'shadow-purple-500/50',
      badge: '02',
      timing: t('solution.cards.sales.timing'),
      position: 'right'
    },
    {
      icon: LineChart,
      title: t('solution.cards.creative.title'),
      description: t('solution.cards.creative.description'),
      color: 'from-pink-500 to-rose-500',
      glowColor: 'shadow-pink-500/50',
      badge: '03',
      timing: t('solution.cards.creative.timing'),
      position: 'left'
    },
    {
      icon: Rocket,
      title: t('solution.cards.scalable.title'),
      description: t('solution.cards.scalable.description'),
      color: 'from-indigo-500 to-blue-500',
      glowColor: 'shadow-indigo-500/50',
      badge: '04',
      timing: t('solution.cards.scalable.timing'),
      position: 'right'
    }
  ]

  return (
    <section id="megoldas" className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 opacity-12">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-full text-purple-700 text-sm font-bold mb-6 shadow-sm">
            {t('solution.section_label')}
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            <span className="gradient-text">{t('solution.title_highlight')}</span><br />
            {t('solution.title_line2')}
          </h2>
          <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('solution.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-300">
              <span className="text-emerald-600 font-bold">{'\u2713'}</span>
              <span className="text-slate-700">{t('solution.tags.roi')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-300">
              <span className="text-emerald-600 font-bold">{'\u2713'}</span>
              <span className="text-slate-700">{t('solution.tags.scalable')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-300">
              <span className="text-emerald-600 font-bold">{'\u2713'}</span>
              <span className="text-slate-700">{t('solution.tags.optimization')}</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-300 via-pink-300 to-purple-300"></div>

          <div className="space-y-12">
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-12 lg:pt-0 ${
                  solution.position === 'left' ? '' : 'lg:gap-x-8'
                }`}
              >
                {solution.position === 'left' ? (
                  <>
                    <div className="lg:text-right">
                      <div className="inline-block lg:block">
                        <div className="text-purple-600 text-sm font-semibold mb-3">{solution.timing}</div>
                        <div className="group relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-pink-400/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                          <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                          <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h3>
                            <p className="text-slate-700 text-lg leading-relaxed">{solution.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block"></div>
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block"></div>
                    <div>
                      <div className="text-purple-600 text-sm font-semibold mb-3">{solution.timing}</div>
                      <div className="group relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-pink-400/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                        <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">{solution.title}</h3>
                          <p className="text-slate-700 text-lg leading-relaxed">{solution.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 lg:top-1/2 lg:-translate-y-1/2 z-20">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/50">
                    {solution.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
            <a
              href="https://calendly.com/adyflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 bg-white hover:bg-slate-50 rounded-full font-bold text-xl text-slate-900 transition-all duration-300 group"
            >
              <span className="gradient-text mr-2">{t('solution.cta')}</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">{'\u2192'}</span>
            </a>
          </div>
          <p className="text-slate-600 mt-6 text-sm">
            {t('solution.cta_subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}
