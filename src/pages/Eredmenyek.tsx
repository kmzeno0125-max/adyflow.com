import { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp, Target, DollarSign, ShieldCheck, CheckCircle2, Sparkles, BarChart3, RefreshCw, Crosshair } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function formatNumber(value: number, decimals: number, thousands: boolean, locale: string) {
  if (locale === 'en') {
    if (decimals > 0) {
      const fixed = value.toFixed(decimals)
      const [intPart, decPart] = fixed.split('.')
      const intFormatted = thousands ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : intPart
      return `${intFormatted}.${decPart}`
    }
    const rounded = Math.round(value).toString()
    return thousands ? rounded.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : rounded
  }
  if (decimals > 0) {
    const fixed = value.toFixed(decimals)
    const [intPart, decPart] = fixed.split('.')
    const intFormatted = thousands ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') : intPart
    return `${intFormatted},${decPart}`
  }
  const rounded = Math.round(value).toString()
  return thousands ? rounded.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') : rounded
}

function useCountUp(target: number, duration: number, triggered: boolean, decimals = 0, thousands = false) {
  const { i18n } = useTranslation()
  const locale = i18n.language === 'en' ? 'en' : 'hu'
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!triggered || hasRun.current) return
    hasRun.current = true

    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [triggered, target, duration])

  return formatNumber(value, decimals, thousands, locale)
}

type KpiCardProps = {
  icon: React.ElementType
  target: number
  prefix?: string
  suffix: string
  label: string
  description: string
  triggered: boolean
  decimals?: number
  thousands?: boolean
  pulseDelay?: string
  revealDelay?: string
  inView: boolean
}

function KpiCard({
  icon: Icon,
  target,
  prefix = '',
  suffix,
  label,
  description,
  triggered,
  decimals = 0,
  thousands = false,
  pulseDelay = '0s',
  revealDelay = '0ms',
  inView,
}: KpiCardProps) {
  const display = useCountUp(target, 2000, triggered, decimals, thousands)

  return (
    <div
      className="group relative p-8 bg-white rounded-2xl border border-slate-200 text-center overflow-hidden will-change-transform shadow-sm hover:shadow-md"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 650ms ease-out, transform 650ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
        transitionDelay: inView ? revealDelay : '0ms',
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.borderColor = 'rgba(192, 132, 252, 0.4)'
        el.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(236, 72, 153, 0.2)'
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'rgba(226, 232, 240, 1)'
        el.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <span
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-md animate-icon-pulse"
              style={{ animationDelay: pulseDelay }}
              aria-hidden
            />
            <div className="relative p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
              <Icon className="text-purple-600 group-hover:text-pink-600 group-hover:scale-110 transition-all duration-300" size={28} />
            </div>
          </div>
        </div>
        <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2 leading-tight tabular-nums">
          {prefix}{display}{suffix}
        </div>
        <div className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">{label}</div>
        <div className="text-sm text-slate-600 leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

function Hero() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('kapcsolat')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-white">
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-700 rounded-full filter blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-700 rounded-full filter blur-[140px]" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 animate-slide-in-left"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          {t('eredmenyek.hero_label')}
        </p>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-in-left"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <span className="gradient-text">{t('eredmenyek.hero_title')}</span>
        </h1>
        <p
          className="text-2xl sm:text-3xl text-slate-700 font-semibold mb-5 animate-slide-in-left"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          {t('eredmenyek.hero_subtitle')}
        </p>
        <p
          className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-in-left"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          {t('eredmenyek.hero_description')}
        </p>
        <div
          className="animate-slide-in-left"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <a
            href="/#kapcsolat"
            onClick={handleCTA}
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span>{t('eredmenyek.hero_cta')}</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

function KpiRow() {
  const { t } = useTranslation()
  const { ref, inView } = useInView(0.2)

  const cards: Array<Omit<KpiCardProps, 'triggered' | 'inView' | 'revealDelay' | 'pulseDelay'>> = [
    { icon: TrendingUp, target: 14.3, suffix: 'x', label: t('eredmenyek.kpi_cards.roas.label'), description: t('eredmenyek.kpi_cards.roas.description'), decimals: 1 },
    { icon: Target, target: 156, prefix: '+', suffix: '%', label: t('eredmenyek.kpi_cards.conversion.label'), description: t('eredmenyek.kpi_cards.conversion.description') },
    { icon: DollarSign, target: 42, prefix: '-', suffix: '%', label: t('eredmenyek.kpi_cards.cac.label'), description: t('eredmenyek.kpi_cards.cac.description') },
    { icon: ShieldCheck, target: 100, suffix: '%', label: t('eredmenyek.kpi_cards.transparency.label'), description: t('eredmenyek.kpi_cards.transparency.description') },
  ]

  const pulseDelays = ['0s', '0.5s', '1s', '1.5s']

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{t('eredmenyek.kpi_label')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            {t('eredmenyek.kpi_title_part1')} <span className="gradient-text">{t('eredmenyek.kpi_title_highlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <KpiCard
              key={idx}
              {...card}
              triggered={inView}
              inView={inView}
              pulseDelay={pulseDelays[idx]}
              revealDelay={`${idx * 110}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ResultStatProps = {
  target: number
  prefix?: string
  suffix: string
  label: string
  highlight?: boolean
  triggered: boolean
  decimals?: number
  thousands?: boolean
  inView: boolean
  revealDelay?: string
  highlightLabel?: string
}

function ResultStat({
  target,
  prefix = '',
  suffix,
  label,
  highlight = false,
  triggered,
  decimals = 0,
  thousands = false,
  inView,
  revealDelay = '0ms',
  highlightLabel,
}: ResultStatProps) {
  const display = useCountUp(target, 2100, triggered, decimals, thousands)

  const baseRevealStyle: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 650ms ease-out, transform 650ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
    transitionDelay: inView ? revealDelay : '0ms',
    willChange: 'transform',
  }

  if (highlight) {
    return (
      <div
        className="relative p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/30 overflow-hidden bg-white"
        style={{
          ...baseRevealStyle,
          backgroundImage: 'linear-gradient(120deg, rgba(16,185,129,0.08) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(34,211,238,0.08) 100%)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)',
        }}
      >
        <div className="absolute inset-0 animate-gradient-flow pointer-events-none" style={{ backgroundImage: 'linear-gradient(120deg, rgba(16,185,129,0.05), transparent 40%, transparent 60%, rgba(34,211,238,0.05))' }} />
        <div className="relative z-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">{highlightLabel}</div>
          <div className="text-5xl sm:text-6xl font-bold mb-2 leading-none tabular-nums bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent animate-gradient-flow">
            {prefix}{display}{suffix}
          </div>
          <div className="text-sm text-slate-600">{label}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
      style={baseRevealStyle}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.borderColor = 'rgba(192, 132, 252, 0.4)'
        el.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.12)'
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'rgba(226, 232, 240, 1)'
        el.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2 leading-tight tabular-nums">
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm text-slate-600 leading-relaxed">{label}</div>
    </div>
  )
}

function CaseStudy() {
  const { t } = useTranslation()
  const { ref, inView } = useInView(0.15)

  const tasks = t('eredmenyek.case_study.tasks', { returnObjects: true }) as string[]
  const currencySuffix = t('eredmenyek.case_study.currency_suffix')

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow-lg">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 p-8 sm:p-10 lg:p-14">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-pink-100 border border-pink-300 mb-6">
                <Sparkles className="text-pink-600" size={14} />
                <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">{t('eredmenyek.case_study.label')}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                <span className="gradient-text">{t('eredmenyek.case_study.title')}</span>
              </h2>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                <div className="text-slate-600">
                  <span className="text-slate-500">{t('eredmenyek.case_study.industry_label')}</span> <span className="text-slate-900 font-medium">{t('eredmenyek.case_study.industry_value')}</span>
                </div>
                <div className="text-slate-600">
                  <span className="text-slate-500">{t('eredmenyek.case_study.period_label')}</span> <span className="text-slate-900 font-medium">{t('eredmenyek.case_study.period_value')}</span>
                </div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {t('eredmenyek.case_study.description')}
              </p>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('eredmenyek.case_study.what_we_did')}</h3>
                <ul className="space-y-3">
                  {tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                        transition: 'opacity 600ms ease-out, transform 600ms ease-out',
                        transitionDelay: inView ? `${idx * 90}ms` : '0ms',
                      }}
                    >
                      <div className="flex-shrink-0 mt-0.5 p-1 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full">
                        {inView ? (
                          <CheckCircle2
                            className="text-pink-600 animate-check-pop"
                            size={18}
                            style={{ animationDelay: `${idx * 90 + 150}ms` }}
                          />
                        ) : (
                          <CheckCircle2 className="text-pink-600 opacity-0" size={18} />
                        )}
                      </div>
                      <span className="text-slate-700 leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              <ResultStat
                target={895000}
                suffix={currencySuffix}
                label={t('eredmenyek.case_study.revenue_caption')}
                highlight
                highlightLabel={t('eredmenyek.case_study.revenue_label')}
                triggered={inView}
                thousands
                inView={inView}
                revealDelay="0ms"
              />

              <div
                className="relative p-5 rounded-xl bg-white border border-emerald-300/40 overflow-hidden"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 650ms ease-out, transform 650ms ease-out',
                  transitionDelay: inView ? '110ms' : '0ms',
                }}
              >
                <p className="relative z-10 text-sm sm:text-base text-emerald-700 font-medium leading-snug">
                  {t('eredmenyek.case_study.ratio_part1')}{' '}
                  <span className="font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent animate-gradient-flow">
                    {t('eredmenyek.case_study.ratio_part2')}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultStat target={62639} suffix={currencySuffix} label={t('eredmenyek.case_study.ad_spend_label')} triggered={inView} thousands inView={inView} revealDelay="220ms" />
                <ResultStat target={14.3} suffix={t('eredmenyek.case_study.roas_value')} label={t('eredmenyek.case_study.roas_label')} triggered={inView} decimals={1} inView={inView} revealDelay="330ms" />
                <ResultStat target={13} suffix={t('eredmenyek.case_study.bookings_suffix')} label={t('eredmenyek.case_study.bookings_label')} triggered={inView} inView={inView} revealDelay="440ms" />
                <ResultStat target={2.48} suffix={t('eredmenyek.case_study.ctr_suffix')} label={t('eredmenyek.case_study.ctr_label')} triggered={inView} decimals={2} inView={inView} revealDelay="550ms" />
                <div className="sm:col-span-2">
                  <ResultStat target={43000} suffix={t('eredmenyek.case_study.reach_suffix')} label={t('eredmenyek.case_study.reach_label')} triggered={inView} thousands inView={inView} revealDelay="660ms" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyItWorks() {
  const { t } = useTranslation()
  const { ref, inView } = useInView(0.2)

  const itemsData = t('eredmenyek.why.items', { returnObjects: true }) as Array<{ title: string; text: string }>
  const icons = [Crosshair, BarChart3, RefreshCw]
  const items = itemsData.map((it, idx) => ({ icon: icons[idx] || Crosshair, ...it }))

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{t('eredmenyek.why.label')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            {t('eredmenyek.why.title_part1')} <span className="gradient-text">{t('eredmenyek.why.title_highlight')}</span> {t('eredmenyek.why.title_part2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-8 bg-white rounded-2xl border border-slate-200 overflow-hidden will-change-transform shadow-sm hover:shadow-md"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 650ms ease-out, transform 650ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
                transitionDelay: inView ? `${idx * 110}ms` : '0ms',
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = 'rgba(192, 132, 252, 0.4)'
                el.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.12)'
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'rgba(226, 232, 240, 1)'
                el.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300 pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-5 inline-flex p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <item.icon className="text-purple-600 group-hover:scale-110 transition-transform duration-300" size={26} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const { t } = useTranslation()
  const { ref, inView } = useInView(0.2)
  const navigate = useNavigate()

  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('kapcsolat')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('eredmenyek.final_cta.label')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {t('eredmenyek.final_cta.title_part1')} <span className="gradient-text">{t('eredmenyek.final_cta.title_highlight')}</span>{t('eredmenyek.final_cta.title_part2')}
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('eredmenyek.final_cta.subtitle')}
          </p>
          <a
            href="/#kapcsolat"
            onClick={handleCTA}
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span>{t('eredmenyek.final_cta.cta')}</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Eredmenyek() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    document.title = t('meta.eredmenyek.title')
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? null
    if (meta) {
      meta.setAttribute('content', t('meta.eredmenyek.description'))
    }
    return () => {
      document.title = prevTitle
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc)
    }
  }, [i18n.language, t])

  return (
    <>
      <Navigation />
      <Hero />
      <KpiRow />
      <CaseStudy />
      <WhyItWorks />
      <FinalCTA />
      <Footer />
    </>
  )
}
