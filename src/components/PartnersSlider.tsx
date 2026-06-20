import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// A főoldali logókat Bolt.new chatben töltöm fel – ide add hozzá az újakat (src + alt)
const homePartnerLogos = [
  { src: '/files_8595244-2026-02-18T08-07-05-592Z-image.png', alt: 'Alpaka Bakonya Vendégházak' },
  { src: '/files_8595244-2026-02-18T08-07-40-587Z-image.webp', alt: 'Piccolo Italiano' },
  { src: '/files_8595244-2026-02-18T09-19-07-295Z-image.png', alt: 'Fifteen Apartman Balatonföldvár' },
  { src: '/files_8595244-2026-02-18T08-08-05-452Z-image.png', alt: 'Jaka Projekt GmbH' },
  { src: '/files_8595244-2026-02-18T09-19-48-604Z-image.png', alt: 'Movemed Mozgásrehabilitáció' },
  { src: '/files_8595244-2026-02-19T10-42-58-465Z-image.png', alt: 'Beauty BOX' },
  { src: '/files_8595244-2026-02-19T10-43-41-800Z-image.png', alt: 'LDSZ Biztonságtechnika' },
  { src: '/files_8595244-2026-02-19T16-05-40-810Z-files_8595244-2026-02-19T15-58-19-307Z-image.png', alt: 'SmoothSkin' },
  { src: '/files_8595244-2026-04-20T09-34-29-822Z-image.png', alt: 'WBC Land Balaton' },
  { src: '/files_8595244-2026-04-20T09-35-45-999Z-image.png', alt: 'Upgrade Zeitarbeit GmbH' },
  { src: '/files_8595244-2026-05-14T14-42-14-170Z-image.webp', alt: 'Expresszablak.hu' },
  { src: '/files_8595244-2026-05-14T14-42-45-409Z-image.png', alt: 'Mecsek Gyorsszerviz' },
  { src: '/files_10287071-2026-06-03T14-57-17-584Z-image.png', alt: 'Kanapékirály', whiteBg: true },
  { src: '/files_10287071-2026-06-03T14-57-41-343Z-image.png', alt: 'Euroexam International', whiteBg: true },
  { src: '/image copy copy copy copy copy copy copy.png', alt: 'Gulyás Klíma', whiteBg: true },
  { src: '/image copy copy copy copy copy copy copy copy.png', alt: 'SEC-CAM', whiteBg: true },
]

export default function PartnersSlider() {
  const { t } = useTranslation()
  const doubled = [...homePartnerLogos, ...homePartnerLogos]
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
                    />
                  </div>
                ) : (
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="max-h-20 sm:max-h-24 w-full object-contain filter brightness-90 transition-all duration-300"
                    draggable={false}
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
