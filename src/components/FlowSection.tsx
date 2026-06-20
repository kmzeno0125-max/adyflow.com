import { Target, FileText, Users, Zap, TrendingUp, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

const steps = [
  {
    icon: Target,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    accentColor: 'border-emerald-200',
    glowColor: 'group-hover:shadow-emerald-100',
    bulletColor: 'text-emerald-500',
    numberColor: 'text-emerald-500',
    neonClass: 'flow-card-glow--emerald',
  },
  {
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    accentColor: 'border-blue-200',
    glowColor: 'group-hover:shadow-blue-100',
    bulletColor: 'text-blue-500',
    numberColor: 'text-blue-500',
    neonClass: 'flow-card-glow--blue',
  },
  {
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    accentColor: 'border-purple-200',
    glowColor: 'group-hover:shadow-purple-100',
    bulletColor: 'text-purple-500',
    numberColor: 'text-purple-500',
    neonClass: 'flow-card-glow--purple',
  },
  {
    icon: Zap,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    accentColor: 'border-pink-200',
    glowColor: 'group-hover:shadow-pink-100',
    bulletColor: 'text-pink-500',
    numberColor: 'text-pink-500',
    neonClass: 'flow-card-glow--pink',
  },
  {
    icon: TrendingUp,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    accentColor: 'border-amber-200',
    glowColor: 'group-hover:shadow-amber-100',
    bulletColor: 'text-amber-500',
    numberColor: 'text-amber-500',
    neonClass: 'flow-card-glow--amber',
  },
]

export default function FlowSection() {
  const { t } = useTranslation()
  const { ref: sectionRef, visible: sectionVisible } = useScrollReveal(0.1)
  const { ref: cardsRef, visible: cardsVisible } = useScrollReveal(0.1)
  const { ref: bottomRef, visible: bottomVisible } = useScrollReveal(0.2)

  const cardKeys = ['ads', 'conversion', 'crm', 'automation', 'result'] as const

  return (
    <section id="megoldas" className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50/80 to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-50/60 rounded-full filter blur-[160px]" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-purple-50/50 rounded-full filter blur-[140px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div
            className={`inline-block px-5 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm transition-all duration-700 delay-100 ${sectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            {t('flow_section.badge')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-slate-900 leading-tight mb-5">
            {t('flow_section.title_part1')}{' '}
            <span className="gradient-text animate-gradient-flow" style={{ backgroundSize: '200% 200%' }}>
              {t('flow_section.title_highlight')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {t('flow_section.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-6">
          {cardKeys.slice(0, 3).map((key, idx) => (
            <FlowCard
              key={key}
              step={steps[idx]}
              number={`0${idx + 1}.`}
              title={t(`flow_section.cards.${key}.title`)}
              subtitle={t(`flow_section.cards.${key}.subtitle`)}
              description={t(`flow_section.cards.${key}.description`)}
              bullets={t(`flow_section.cards.${key}.bullets`, { returnObjects: true }) as string[]}
              visible={cardsVisible}
              delay={idx * 120}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto mb-12">
          {cardKeys.slice(3, 5).map((key, idx) => (
            <FlowCard
              key={key}
              step={steps[idx + 3]}
              number={`0${idx + 4}.`}
              title={t(`flow_section.cards.${key}.title`)}
              subtitle={t(`flow_section.cards.${key}.subtitle`)}
              description={t(`flow_section.cards.${key}.description`)}
              bullets={t(`flow_section.cards.${key}.bullets`, { returnObjects: true }) as string[]}
              visible={cardsVisible}
              delay={(idx + 3) * 120}
            />
          ))}
        </div>

        {/* Bottom Summary Bar */}
        <div
          ref={bottomRef}
          className={`transition-all duration-700 delay-200 ${bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="group max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 px-8 py-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Settings className="w-6 h-6 text-emerald-500 group-hover:animate-[spin_3s_linear_infinite]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-bold text-base sm:text-lg leading-snug">
                {t('flow_section.summary_title')}
              </p>
              <p className="text-slate-500 text-sm sm:text-base mt-0.5">
                {t('flow_section.summary_subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowCard({
  step,
  number,
  title,
  subtitle,
  description,
  bullets,
  visible,
  delay,
}: {
  step: (typeof steps)[number]
  number: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  visible: boolean
  delay: number
}) {
  const Icon = step.icon

  return (
    <div
      className={`flow-card-glow ${step.neonClass} group relative bg-white rounded-[22px] border border-slate-200/80 p-7 sm:p-8 shadow-sm transition-all duration-300 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms', transitionDuration: '600ms' }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${step.color}`} strokeWidth={1.8} />
        </div>
        <div>
          <span className={`block text-sm font-bold ${step.numberColor} mb-0.5`}>{number}</span>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
          {description}
        </p>
        <ul className="space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${step.bgColor} ring-2 ${step.color.replace('text-', 'ring-')}`} />
              <span className="text-slate-600 text-sm leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
