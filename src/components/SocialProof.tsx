import { TrendingUp, Users, Target, Award, FileText, BarChart3, DollarSign, MessageSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!triggered || hasRun.current) return
    hasRun.current = true

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [triggered, target, duration])

  return count
}

function AnimatedStatCard({
  icon: Icon,
  target,
  suffix,
  label,
  description,
  triggered,
}: {
  icon: React.ElementType
  target: number
  suffix: string
  label: string
  description: string
  triggered: boolean
}) {
  const count = useCountUp(target, 1800, triggered)

  return (
    <div className="group relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
            <Icon className="text-purple-600" size={28} />
          </div>
        </div>
        <div className="text-5xl font-bold gradient-text mb-2">{count}{suffix}</div>
        <div className="text-xl font-semibold text-slate-900 mb-1">{label}</div>
        <div className="text-sm text-slate-600">{description}</div>
      </div>
    </div>
  )
}

export default function SocialProof() {
  const { t } = useTranslation()
  const [triggered, setTriggered] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: TrendingUp, target: 3, suffix: 'x', label: t('social_proof.stats.growth.label'), description: t('social_proof.stats.growth.description') },
    { icon: Users, target: 80, suffix: '%', label: t('social_proof.stats.time.label'), description: t('social_proof.stats.time.description') },
    { icon: Target, target: 250, suffix: '%', label: t('social_proof.stats.roi.label'), description: t('social_proof.stats.roi.description') },
    { icon: Award, target: 100, suffix: '%', label: t('social_proof.stats.transparency.label'), description: t('social_proof.stats.transparency.description') },
  ]

  return (
    <section id="eredmenyek" className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <span className="gradient-text">{t('social_proof.title_highlight')}</span>,<br />
            {t('social_proof.title_line2')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('social_proof.subtitle')}
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <AnimatedStatCard key={idx} {...stat} triggered={triggered} />
          ))}
        </div>

        <TransparencySection />
      </div>
    </section>
  )
}

function TransparencySection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const metrics = [
    { label: t('social_proof.transparency.metrics.cac'), value: 42, color: 'from-purple-600 to-pink-600' },
    { label: t('social_proof.transparency.metrics.conversion'), value: 156, color: 'from-purple-500 to-pink-500', isPositive: true },
    { label: t('social_proof.transparency.metrics.cycle'), value: 38, color: 'from-purple-600 to-pink-600' }
  ]

  const benefitsList = t('social_proof.transparency.benefits', { returnObjects: true }) as string[]
  const benefitIcons = [FileText, BarChart3, DollarSign, MessageSquare]
  const benefits = benefitsList.map((text, idx) => ({ icon: benefitIcons[idx] || FileText, text }))

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('social_proof.transparency.title_line1')}<br />
            <span className="gradient-text">{t('social_proof.transparency.title_highlight')}</span>
          </h3>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t('social_proof.transparency.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  <benefit.icon className="text-purple-600 group-hover:text-pink-600 transition-colors" size={20} />
                </div>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 blur-3xl rounded-3xl"></div>
        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow">
          <h4 className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-6">
            {t('social_proof.transparency.card_label')}
          </h4>

          <div className="space-y-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">{metric.label}</span>
                  <span className={`text-2xl font-bold ${metric.isPositive ? 'text-green-600' : 'text-pink-600'}`}>
                    {metric.isPositive ? '+' : '-'}{metric.value}%
                  </span>
                </div>
                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? `${Math.min(metric.value, 100)}%` : '0%'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              {t('social_proof.transparency.footnote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
