import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { partners } from '../data/partners'


function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function LogoGrid() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal()

  return (
    <section ref={ref} className="relative py-20 lg:py-28" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 70%, #f8fafc 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{t('partners_page.grid_label')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            {t('partners_page.grid_title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((logo, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center bg-white backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm min-h-[140px] sm:min-h-[160px]"
              style={{
                transition: 'transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease, opacity 600ms ease',
                transitionDelay: visible ? `${idx * 60}ms` : '0ms',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                boxShadow: '0 0 0 1px rgba(226, 232, 240, 0.5)',
              }}
              onMouseOver={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = 'rgb(203, 213, 225)'
                el.style.boxShadow = '0 0 0 1px rgb(203, 213, 225), 0 8px 32px rgba(203, 213, 225, 0.3)'
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'rgb(226, 232, 240)'
                el.style.boxShadow = '0 0 0 1px rgba(226, 232, 240, 0.5)'
              }}
            >
              {logo.whiteBg ? (
                <div className="flex items-center justify-center w-full h-full rounded-xl bg-white p-3">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-[88px] sm:max-h-[104px] w-full object-contain"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-[100px] sm:max-h-[120px] w-full object-contain filter brightness-90 transition-all duration-300 group-hover:brightness-100"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function PartnersCTA() {
  const { t } = useTranslation()
  const { ref, visible } = useScrollReveal()
  const navigate = useNavigate()

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById('kapcsolat')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 35%, #ffffff 100%)' }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t('partners_page.cta_label')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {t('partners_page.cta_title_part1')} <span className="gradient-text">{t('partners_page.cta_title_highlight')}</span>{t('partners_page.cta_title_part2')}
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('partners_page.cta_subtitle')}
          </p>
          <a
            href="/#kapcsolat"
            onClick={handleCTAClick}
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span>{t('partners_page.cta_button')}</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Partners() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const handleHeroCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById('kapcsolat')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const prevTitle = document.title
    document.title = t('meta.partners.title')
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? null
    if (meta) {
      meta.setAttribute('content', t('meta.partners.description'))
    }
    return () => {
      document.title = prevTitle
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc)
    }
  }, [i18n.language, t])

  return (
    <>
      <Navigation />

      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600 rounded-full filter blur-[160px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600 rounded-full filter blur-[140px]" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 animate-slide-in-left"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {t('partners_page.hero_label')}
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-in-left"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            <span className="gradient-text">{t('partners_page.hero_title')}</span>
          </h1>
          <p
            className="text-2xl sm:text-3xl text-slate-900 font-semibold mb-5 animate-slide-in-left"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            {t('partners_page.hero_subtitle')}
          </p>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-in-left"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {t('partners_page.hero_description')}
          </p>
          <div
            className="animate-slide-in-left"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            <a
              href="/#kapcsolat"
              onClick={handleHeroCTAClick}
              className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <span>{t('partners_page.hero_cta')}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>
        </div>
      </section>

      <LogoGrid />
      <PartnersCTA />

      <Footer />
    </>
  )
}
