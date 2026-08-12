import { useEffect, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { BarChart3, Crosshair, RefreshCw, Sparkles, Target } from 'lucide-react'
import { useInView } from '../hooks/useInView'

type ResultStatProps = {
  target: number
  suffix: string
  label: string
  prefix?: string
  decimals?: number
  highlight?: boolean
  highlightLabel?: string
  inView: boolean
  revealDelay: string
}

function formatNumber(value: number, decimals: number, language: string) {
  const fixed = value.toFixed(decimals)
  const [integer, fraction] = fixed.split('.')
  const grouped = language === 'en'
    ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : integer.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
  return decimals > 0 ? `${grouped}${language === 'en' ? '.' : ','}${fraction}` : grouped
}

function ResultStat({ target, suffix, label, prefix = '', decimals = 0, highlight = false, highlightLabel, inView, revealDelay }: ResultStatProps) {
  const { i18n } = useTranslation()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1800, 1)
      setDisplay((1 - Math.pow(1 - progress, 3)) * target)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  const revealStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 650ms ease-out, transform 650ms ease-out',
    transitionDelay: inView ? revealDelay : '0ms',
  }

  if (highlight) {
    return (
      <div
        className="relative p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/30 overflow-hidden bg-white"
        style={{ ...revealStyle, backgroundImage: 'linear-gradient(120deg, rgba(16,185,129,0.08) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(34,211,238,0.08) 100%)', boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)' }}
      >
        <div className="relative z-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">{highlightLabel}</div>
          <div className="text-5xl sm:text-6xl font-bold mb-2 leading-none tabular-nums bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent">
            {prefix}{formatNumber(display, decimals, i18n.language)}{suffix}
          </div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm" style={revealStyle}>
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2 leading-tight tabular-nums">
        {prefix}{formatNumber(display, decimals, i18n.language)}{suffix}
      </div>
      <div className="text-sm text-slate-600 leading-relaxed">{label}</div>
    </div>
  )
}

export default function KanapekiralyCaseStudy() {
  const { t } = useTranslation()
  const { ref, inView } = useInView(0.15)
  const tasks = t('eredmenyek.kanapekiraly.tasks', { returnObjects: true }) as string[]
  const whyItems = t('eredmenyek.kanapekiraly.why_items', { returnObjects: true }) as Array<{ title: string; text: string }>
  const whyIcons = [Target, BarChart3, Crosshair, RefreshCw]

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white shadow-lg">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 p-8 sm:p-10 lg:p-14">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-pink-100 border border-pink-300 mb-6">
                <Sparkles className="text-pink-600" size={14} />
                <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">{t('eredmenyek.kanapekiraly.label')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"><span className="gradient-text">Kanapékirály</span></h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                <div className="text-slate-600"><span className="text-slate-500">{t('eredmenyek.kanapekiraly.industry_label')}</span> <span className="text-slate-900 font-medium">{t('eredmenyek.kanapekiraly.industry_value')}</span></div>
                <div className="text-slate-600"><span className="text-slate-500">{t('eredmenyek.kanapekiraly.period_label')}</span> <span className="text-slate-900 font-medium">{t('eredmenyek.kanapekiraly.period_value')}</span></div>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">{t('eredmenyek.kanapekiraly.description')}</p>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('eredmenyek.kanapekiraly.what_we_did')}</h3>
                <ul className="space-y-3">
                  {tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start space-x-3" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out', transitionDelay: inView ? `${idx * 90}ms` : '0ms' }}>
                      <div className="flex-shrink-0 mt-0.5 p-1 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full"><span className="block w-[18px] h-[18px] text-center text-pink-600 font-bold">✓</span></div>
                      <span className="text-slate-700 leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <ResultStat target={11.93} decimals={2} suffix="× ROAS" label={t('eredmenyek.kanapekiraly.highlight_stat_label')} highlight highlightLabel={t('eredmenyek.kanapekiraly.highlight_label')} inView={inView} revealDelay="0ms" />
              <div className="relative p-5 rounded-xl bg-white border border-emerald-300/40 overflow-hidden" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 650ms ease-out, transform 650ms ease-out', transitionDelay: inView ? '110ms' : '0ms' }}>
                <p className="relative z-10 text-sm sm:text-base text-emerald-700 font-medium leading-snug">{t('eredmenyek.kanapekiraly.ratio_part1')}{' '}<span className="font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent">{t('eredmenyek.kanapekiraly.ratio_part2')}</span></p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultStat target={9} suffix={t('eredmenyek.kanapekiraly.duration_suffix')} label={t('eredmenyek.kanapekiraly.duration_label')} inView={inView} revealDelay="220ms" />
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 650ms ease-out, transform 650ms ease-out', transitionDelay: inView ? '330ms' : '0ms' }}><div className="text-3xl sm:text-4xl font-bold gradient-text mb-2 leading-tight">{t('eredmenyek.kanapekiraly.channel_value')}</div><div className="text-sm text-slate-600 leading-relaxed">{t('eredmenyek.kanapekiraly.channel_label')}</div></div>
              </div>
              <div className="mt-1 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-lg p-3">
                <img src="/assets/img/success-stories/Kanapekiraly_GoogleAds_eredmeny_screen.png" alt={t('eredmenyek.kanapekiraly.image_alt')} className="w-full h-auto object-contain rounded-xl" />
                <p className="text-sm text-slate-400 mt-3 text-center">{t('eredmenyek.kanapekiraly.image_caption')}</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-8 sm:px-10 lg:px-14 pb-10 lg:pb-14">
            <div className="border-t border-slate-200 pt-10 lg:pt-14">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">{t('eredmenyek.kanapekiraly.why_title_part1')} <span className="gradient-text">{t('eredmenyek.kanapekiraly.why_title_highlight')}</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyItems.map((item, idx) => {
                  const Icon = whyIcons[idx]
                  return <div key={idx} className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 650ms ease-out, transform 650ms ease-out', transitionDelay: inView ? `${900 + idx * 100}ms` : '0ms' }}><div className="mb-4 inline-flex p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full"><Icon className="text-purple-600" size={22} /></div><h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4><p className="text-sm text-slate-600 leading-relaxed">{item.text}</p></div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
