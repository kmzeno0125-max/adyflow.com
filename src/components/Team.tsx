import { MapPin, Sparkles, Target, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Team() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Sparkles,
      title: t('team.values.innovation.title'),
      description: t('team.values.innovation.description')
    },
    {
      icon: Target,
      title: t('team.values.results.title'),
      description: t('team.values.results.description')
    },
    {
      icon: Users,
      title: t('team.values.partnership.title'),
      description: t('team.values.partnership.description')
    }
  ]

  const whyUs = t('team.why_us', { returnObjects: true }) as string[]

  return (
    <section id="rolunk" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {t('team.title_line1')} <span className="gradient-text">{t('team.title_highlight')}</span><br />
              {t('team.title_line2')}
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {t('team.intro1_part1')} <strong className="text-slate-900">{t('team.intro1_strong')}</strong>{t('team.intro1_part2')}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('team.intro2')}
            </p>

            <div className="flex items-center space-x-2 text-purple-600 mb-8">
              <MapPin size={24} />
              <p className="text-lg">
                <span className="font-semibold">{t('team.location_label')}</span> {t('team.location_value')} | <span className="font-semibold">{t('team.clients_label')}</span> {t('team.clients_value')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
                >
                  <value.icon className="text-purple-600 mb-2" size={24} />
                  <h4 className="text-slate-900 font-semibold mb-1">{value.title}</h4>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl rounded-3xl"></div>
            <div
              className="relative border-2 border-slate-200 rounded-3xl p-8 lg:p-12 overflow-hidden"
            >
              <img
                src="/Office_4.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">{t('team.why_us_title')}</h3>

                <ul className="space-y-4 mb-8">
                {whyUs.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{'\u2713'}</span>
                      </div>
                    </div>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
                </ul>

                <p className="text-gray-300 italic border-l-4 border-purple-500 pl-4 py-2">
                  {t('team.quote_part1')} <span className="text-white font-semibold">{t('team.quote_strong')}</span> {t('team.quote_part2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
