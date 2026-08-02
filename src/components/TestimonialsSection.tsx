import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Star, Quote, Film } from 'lucide-react'
import {
  videoTestimonials,
  textTestimonials,
  type Lang,
  type VideoTestimonial,
  type TextTestimonial
} from '../data/testimonials'

function useScrollReveal() {
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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

const accentStyles: Record<TextTestimonial['accent'], { border: string; glow: string; star: string }> = {
  purple: { border: 'hover:border-purple-400/40', glow: 'group-hover:shadow-purple-500/20', star: 'text-purple-400' },
  blue: { border: 'hover:border-blue-400/40', glow: 'group-hover:shadow-blue-500/20', star: 'text-blue-400' },
  orange: { border: 'hover:border-orange-400/40', glow: 'group-hover:shadow-orange-500/20', star: 'text-orange-400' }
}

const posterLabels: Record<Lang, string> = {
  hu: 'Videós ügyfélvélemény',
  en: 'Video testimonial',
  de: 'Video-Kundenstimme'
}

function VideoPoster({ testimonial, lang, playLabel }: {
  testimonial: VideoTestimonial
  lang: Lang
  playLabel: string
}) {
  const [thumbError, setThumbError] = useState(false)
  const thumbUrl = `https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`

  return (
    <div className="absolute inset-0">
      {!thumbError ? (
        <img
          src={thumbUrl}
          alt={`${testimonial.name} video thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setThumbError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
          <Film className="text-white/20 mb-3" size={48} />
          <p className="text-white/80 font-medium text-sm px-4 text-center">{posterLabels[lang]}</p>
          <p className="text-white/50 text-xs mt-1 px-4 text-center">{testimonial.name}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/40 transition-transform duration-300 group-hover:scale-110">
          <Play className="text-white ml-0.5" size={24} fill="white" />
        </span>
      </div>
    </div>
  )
}

function VideoTestimonialCard({ testimonial, lang, playLabel }: {
  testimonial: VideoTestimonial
  lang: Lang
  playLabel: string
}) {
  const [loaded, setLoaded] = useState(false)

  const aspectClass = testimonial.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'
  const embedUrl = `https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&rel=0`

  return (
    <div className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
      {testimonial.orientation === 'portrait' ? (
        <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
          <div className={`relative ${aspectClass} w-full sm:w-[200px] sm:flex-shrink-0 rounded-xl overflow-hidden bg-slate-800`}>
            {loaded ? (
              <iframe
                src={embedUrl}
                title={`${testimonial.name} — ${testimonial.role[lang]}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                onClick={() => setLoaded(true)}
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label={playLabel}
              >
                <VideoPoster testimonial={testimonial} lang={lang} playLabel={playLabel} />
              </button>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <Quote className="text-purple-400/40 mb-3" size={32} />
            <p className="text-white font-medium text-lg leading-relaxed mb-4">
              "{testimonial.quote[lang]}"
            </p>
            <div>
              <p className="text-white font-semibold">{testimonial.name}</p>
              <p className="text-slate-400 text-sm">{testimonial.role[lang]}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-5 sm:p-6">
          <div className={`relative ${aspectClass} w-full rounded-xl overflow-hidden bg-slate-800 mb-5`}>
            {loaded ? (
              <iframe
                src={embedUrl}
                title={`${testimonial.name} — ${testimonial.role[lang]}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                onClick={() => setLoaded(true)}
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label={playLabel}
              >
                <VideoPoster testimonial={testimonial} lang={lang} playLabel={playLabel} />
              </button>
            )}
          </div>
          <Quote className="text-purple-400/40 mb-3" size={32} />
          <p className="text-white font-medium text-lg leading-relaxed mb-4">
            "{testimonial.quote[lang]}"
          </p>
          <div>
            <p className="text-white font-semibold">{testimonial.name}</p>
            <p className="text-slate-400 text-sm">{testimonial.role[lang]}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function TextTestimonialCard({ testimonial, lang, starsAria }: {
  testimonial: TextTestimonial
  lang: Lang
  starsAria: string
}) {
  const accent = accentStyles[testimonial.accent]
  const scale = testimonial.logoScale ?? 1

  return (
    <div className={`group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] ${accent.border} hover:shadow-2xl ${accent.glow} hover:-translate-y-1`}>
      <div className="flex items-center justify-center bg-white rounded-xl p-4 mb-5 h-24 flex-shrink-0 overflow-hidden">
        <img
          src={testimonial.logo}
          alt={`${testimonial.name} logo`}
          className="max-w-full max-h-full object-contain"
          style={{ transform: `scale(${scale})` }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <Quote className="text-white/20 mb-3" size={28} />
      <p className="text-slate-200 leading-relaxed text-sm mb-5 flex-1">
        {testimonial.text[lang]}
      </p>
      <div className="flex items-center gap-1 mb-4" role="img" aria-label={starsAria}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
        ))}
      </div>
      <div className="border-t border-white/10 pt-4">
        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
        <p className="text-slate-400 text-xs mt-1">{testimonial.role[lang]}</p>
        <p className="text-slate-500 text-xs mt-0.5">{testimonial.industry[lang]}</p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation()
  const { ref, visible } = useScrollReveal()
  const lang = (i18n.language?.substring(0, 2) || 'hu') as Lang

  return (
    <section id="ugyfelvelemenyek" className="relative py-20 lg:py-28 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full filter blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-600/5 rounded-full filter blur-[120px]" />
      </div>

      <div ref={ref} className={`relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4">
            {t('testimonials.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-8 text-center">
            {t('testimonials.video_subtitle')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {videoTestimonials.map((vt) => (
              <VideoTestimonialCard
                key={vt.videoId}
                testimonial={vt}
                lang={lang}
                playLabel={t('testimonials.play_aria')}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-8 text-center">
            {t('testimonials.written_subtitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:items-start">
            {textTestimonials.map((tt, idx) => (
              <div
                key={tt.name}
                className={idx === 2 ? 'md:col-span-2 lg:col-span-1 md:flex md:justify-center' : ''}
              >
                <div className={`group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] ${accentStyles[tt.accent].border} hover:shadow-2xl ${accentStyles[tt.accent].glow} hover:-translate-y-1 w-full md:max-w-sm lg:max-w-none`}>
                  <div className="flex items-center justify-center bg-white rounded-xl p-4 mb-5 h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={tt.logo}
                      alt={`${tt.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: `scale(${tt.logoScale ?? 1})` }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <Quote className="text-white/20 mb-3" size={28} />
                  <p className="text-slate-200 leading-relaxed text-sm mb-5 flex-1">
                    {tt.text[lang]}
                  </p>
                  <div className="flex items-center gap-1 mb-4" role="img" aria-label={t('testimonials.stars_aria')}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white font-semibold text-sm">{tt.name}</p>
                    <p className="text-slate-400 text-xs mt-1">{tt.role[lang]}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{tt.industry[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
