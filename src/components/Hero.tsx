import { ArrowRight, Sparkles, TrendingUp, Zap, Target, Cog, BarChart3, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number, hasStarted: boolean, delay: number = 0) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!hasStarted) return

    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setCount(Math.round(target * eased))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [hasStarted, target, duration, delay])

  return count
}

function useInViewOnce<T extends Element>(threshold: number = 0.4) {
  const [inView, setInView] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (inView) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}

export default function Hero() {
  const { t } = useTranslation()

  const statsTrigger = useInViewOnce<HTMLDivElement>(0.4)
  const stat1Count = useCountUp(3, 1500, statsTrigger.inView, 200)
  const stat2Count = useCountUp(80, 1700, statsTrigger.inView, 350)
  const stat3Count = useCountUp(100, 1800, statsTrigger.inView, 500)

  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-100/60 rounded-full filter blur-[140px]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-100/50 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-20 left-1/2 w-[350px] h-[350px] bg-pink-100/40 rounded-full filter blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="flex-1 w-full lg:w-1/2 space-y-7 sm:space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-white shadow-sm animate-slide-in-left"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
              </span>
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-xs sm:text-sm text-slate-700 font-semibold tracking-wide">{t('hero.badge')}</span>
            </div>

            <h1
              className="animate-slide-in-left tracking-tight"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              <span className="block text-slate-900 font-extrabold text-[40px] sm:text-5xl lg:text-[62px] leading-[1.08]">
                {t('hero.title_line1')}
              </span>
              <span className="block font-extrabold text-[40px] sm:text-5xl lg:text-[62px] leading-[1.08] gradient-text">
                {t('hero.title_line2')}
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-[1.65] max-w-xl text-slate-600 animate-slide-in-left"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              {t('hero.subtitle')}
            </p>

            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-slide-in-left"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <a
                href="#kapcsolat"
                className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 rounded-full font-bold text-[15px] sm:text-base text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none shadow-lg hover:shadow-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:shadow-purple-500/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
                <span className="relative">{t('hero.cta_primary')}</span>
                <ArrowRight className="relative group-hover:translate-x-1 transition-transform motion-reduce:transform-none" size={18} strokeWidth={2.5} />
              </a>
              <a
                href="#megoldas"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-full font-semibold text-[15px] sm:text-base text-slate-700 border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
              >
                {t('hero.cta_secondary')}
              </a>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 animate-slide-in-left pt-2"
              style={{ animationDelay: '0.6s', opacity: 0 }}
            >
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-300 transition-colors">
                <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: 'auto' }}>
                  <path
                    fill="none"
                    stroke="#0866FF"
                    strokeWidth="11"
                    strokeLinecap="round"
                    d="M 15 30 C 15 12, 35 12, 50 30 C 65 48, 85 48, 85 30 C 85 12, 65 12, 50 30 C 35 48, 15 48, 15 30 Z"
                  />
                </svg>
                <span className="text-slate-700 text-xs sm:text-sm font-semibold">Meta Partner</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-300 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-slate-700 text-xs sm:text-sm font-semibold">Google Partner</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-300 transition-colors">
                <ShieldCheck className="h-4 w-4 text-emerald-500" strokeWidth={2.25} />
                <span className="text-slate-700 text-xs sm:text-sm font-semibold">{t('hero.badge_transparent')}</span>
              </div>
            </div>
          </div>

          <div
            className="flex-1 w-full lg:w-1/2 animate-slide-in-left"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-blue-200/40 blur-2xl pointer-events-none" />

              <div
                className="relative rounded-[24px] overflow-hidden aspect-[4/3] border border-slate-200/80 shadow-2xl"
              >
                <div className="absolute inset-0">
                  <img
                    src="/telegram-cloud-photo-size-4-5787284925047311773-y.jpg"
                    alt="AdyFlow Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-slate-900/20" />
                </div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 tracking-wide">LIVE {'\u2022'} AdyFlow</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
                    <Sparkles size={11} className="text-purple-600" />
                    <span className="text-[11px] font-semibold text-slate-700 tracking-wide">AI-driven</span>
                  </div>
                </div>

                <div ref={statsTrigger.ref} className="absolute bottom-4 left-4 right-4 flex gap-2 sm:gap-3 z-20">
                  <StatCard
                    icon={<TrendingUp size={16} className="text-blue-600" strokeWidth={2.5} />}
                    value={`${stat1Count}x`}
                    label={t('hero.stat1_label')}
                    color="blue"
                  />
                  <StatCard
                    icon={<Zap size={16} className="text-amber-600" strokeWidth={2.5} />}
                    value={`${stat2Count}%`}
                    label={t('hero.stat2_label')}
                    color="amber"
                  />
                  <StatCard
                    icon={<Sparkles size={16} className="text-purple-600" strokeWidth={2.5} />}
                    value={`${stat3Count}%`}
                    label={t('hero.stat3_label')}
                    color="purple"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-2 sm:mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <BenefitCard
              icon={<Target size={22} className="text-white" strokeWidth={2.25} />}
              gradient="from-blue-500 to-cyan-500"
              title={t('hero.benefit1_title')}
              description={t('hero.benefit1_desc')}
            />
            <BenefitCard
              icon={<Cog size={22} className="text-white" strokeWidth={2.25} />}
              gradient="from-purple-500 to-pink-500"
              title={t('hero.benefit2_title')}
              description={t('hero.benefit2_desc')}
            />
            <BenefitCard
              icon={<BarChart3 size={22} className="text-white" strokeWidth={2.25} />}
              gradient="from-pink-500 to-rose-500"
              title={t('hero.benefit3_title')}
              description={t('hero.benefit3_desc')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
  }
  return (
    <div className="flex-1 rounded-2xl bg-white/95 backdrop-blur-md px-2 py-3 flex flex-col items-center shadow-lg border border-slate-100">
      <div className="mb-1.5">{icon}</div>
      <span className={`font-extrabold text-lg sm:text-xl leading-none tabular-nums ${colorMap[color] || 'text-slate-900'}`}>
        {value}
      </span>
      <span className="text-slate-500 text-[10px] sm:text-[11px] mt-1 text-center font-medium leading-tight">
        {label}
      </span>
    </div>
  )
}

function BenefitCard({
  icon,
  gradient,
  title,
  description,
}: {
  icon: React.ReactNode
  gradient: string
  title: string
  description: string
}) {
  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-900 font-bold text-base sm:text-[17px] mb-1.5 leading-snug">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
