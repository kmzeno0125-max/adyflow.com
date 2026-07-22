import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { partners } from '../data/partners'

export default function PartnersSlider() {
  const { t } = useTranslation()
  const doubled = [...partners, ...partners]
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative pt-20 lg:pt-24 pb-0 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{t('partners_slider.label')}</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
          {t('partners_slider.title')}
        </h2>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <div
            className="flex gap-6 animate-partners-scroll whitespace-nowrap"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {doubled.map((partner, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center justify-center w-64 h-36 sm:w-72 sm:h-40 bg-white backdrop-blur-sm rounded-2xl shadow-sm px-6"
                style={{
                  transition: 'transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease',
                  border: '1px solid rgb(226, 232, 240)',
                  boxShadow: '0 0 0 1px rgba(226, 232, 240, 0.5), 0 0 8px 1px rgba(226, 232, 240, 0.3)',
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'scale(1.10)'
                  el.style.borderColor = 'rgb(203, 213, 225)'
                  el.style.boxShadow = '0 0 0 1px rgb(203, 213, 225), 0 0 12px 2px rgba(203, 213, 225, 0.5)'
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'scale(1)'
                  el.style.borderColor = 'rgb(226, 232, 240)'
                  el.style.boxShadow = '0 0 0 1px rgba(226, 232, 240, 0.5), 0 0 8px 1px rgba(226, 232, 240, 0.3)'
                }}
              >
                {partner.whiteBg ? (
                  <div className="flex items-center justify-center w-full h-full rounded-lg bg-white px-3 py-2">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="max-h-16 sm:max-h-20 w-full object-contain"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      width={200}
                      height={80}
                    />
                  </div>
                ) : (
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="max-h-20 sm:max-h-24 w-full object-contain filter brightness-90 transition-all duration-300"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    width={200}
                    height={96}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, rgb(248, 250, 252) 0%, transparent 100%)' }}
        />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, rgb(248, 250, 252) 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}
