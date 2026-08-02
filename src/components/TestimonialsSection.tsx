import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Star, Quote, Film, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  videoTestimonials,
  textTestimonials,
  type Lang,
  type VideoTestimonial,
  type TextTestimonial
} from '../data/testimonials'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SlideType = 'video' | 'text'

interface BaseSlide {
  type: SlideType
  name: string
}

interface VideoSlide extends BaseSlide {
  type: 'video'
  data: VideoTestimonial
}

interface TextSlide extends BaseSlide {
  type: 'text'
  data: TextTestimonial
}

type Slide = VideoSlide | TextSlide

/* ------------------------------------------------------------------ */
/*  Hook: scroll reveal                                                */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const posterLabels: Record<Lang, string> = {
  hu: 'Videós ügyfélvélemény',
  en: 'Video testimonial',
  de: 'Video-Kundenstimme'
}

const videoPillLabels: Record<Lang, string> = {
  hu: 'VIDEÓS VISSZAJELZÉS',
  en: 'VIDEO TESTIMONIAL',
  de: 'VIDEO-KUNDENSTIMME'
}

const writtenPillLabels: Record<Lang, string> = {
  hu: 'ÍRÁSOS VISSZAJELZÉS',
  en: 'WRITTEN TESTIMONIAL',
  de: 'SCHRIFTLICHE REFERENZ'
}

const gradientText =
  'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'

const gradientBorder =
  'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'

/* ------------------------------------------------------------------ */
/*  Build slides                                                       */
/* ------------------------------------------------------------------ */

function buildSlides(): Slide[] {
  const vSlides: VideoSlide[] = videoTestimonials.map((v) => ({
    type: 'video',
    name: v.name,
    data: v
  }))
  const tSlides: TextSlide[] = textTestimonials.map((t) => ({
    type: 'text',
    name: t.name,
    data: t
  }))
  return [...vSlides, ...tSlides]
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0].substring(0, 2).toUpperCase()
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 ring-1 ring-purple-200/60">
      <span className="text-sm font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {getInitials(name)}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Gradient pill                                                      */
/* ------------------------------------------------------------------ */

function GradientPill({ label }: { label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest ${gradientText} border border-purple-200/70 bg-purple-50/50`}
    >
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Quote icon                                                         */
/* ------------------------------------------------------------------ */

function GradientQuote() {
  return (
    <Quote
      size={40}
      className="mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      strokeWidth={1.5}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Video poster                                                       */
/* ------------------------------------------------------------------ */

function VideoPoster({
  testimonial,
  lang
}: {
  testimonial: VideoTestimonial
  lang: Lang
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
          <p className="text-white/80 font-medium text-sm px-4 text-center">
            {posterLabels[lang]}
          </p>
          <p className="text-white/50 text-xs mt-1 px-4 text-center">
            {testimonial.name}
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110">
          <Play className="text-white ml-0.5" size={28} fill="white" />
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Video slide                                                        */
/* ------------------------------------------------------------------ */

function VideoSlideContent({
  slide,
  lang,
  isActive,
  playLabel
}: {
  slide: VideoSlide
  lang: Lang
  isActive: boolean
  playLabel: string
}) {
  const [loaded, setLoaded] = useState(false)
  const v = slide.data

  useEffect(() => {
    if (!isActive && loaded) setLoaded(false)
  }, [isActive, loaded])
  const isPortrait = v.orientation === 'portrait'
  const embedUrl = `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0`

  return (
    <div className="flex flex-col items-center text-center">
      <GradientPill label={videoPillLabels[lang]} />

      {/* Video container */}
      <div className="mt-6 w-full flex justify-center">
        {isPortrait ? (
          <div
            className="group relative aspect-[9/16] w-[260px] sm:w-[280px] md:w-[300px] rounded-2xl overflow-hidden bg-slate-100 shadow-md ring-1 ring-slate-200/80"
            style={{ maxHeight: '70vh' }}
          >
            {loaded ? (
              <iframe
                src={embedUrl}
                title={`${v.name} — ${v.role[lang]}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                onClick={() => setLoaded(true)}
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={playLabel}
              >
                <VideoPoster testimonial={v} lang={lang} />
              </button>
            )}
          </div>
        ) : (
          <div className="group relative aspect-video w-full max-w-[680px] sm:max-w-[720px] rounded-2xl overflow-hidden bg-slate-100 shadow-md ring-1 ring-slate-200/80">
            {loaded ? (
              <iframe
                src={embedUrl}
                title={`${v.name} — ${v.role[lang]}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                onClick={() => setLoaded(true)}
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={playLabel}
              >
                <VideoPoster testimonial={v} lang={lang} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quote + customer info */}
      <div className="mt-8 flex flex-col items-center max-w-[760px]">
        <GradientQuote />
        <p className="text-lg sm:text-xl italic leading-relaxed text-slate-700 font-medium">
          &ldquo;{v.quote[lang]}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={v.name} />
          <div className="text-left">
            <p className="font-semibold text-slate-900">{v.name}</p>
            <p className="text-sm text-slate-500">{v.role[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Text slide                                                         */
/* ------------------------------------------------------------------ */

function TextSlideContent({
  slide,
  lang,
  starsAria
}: {
  slide: TextSlide
  lang: Lang
  starsAria: string
}) {
  const t = slide.data
  const scale = t.logoScale ?? 1

  return (
    <div className="flex flex-col items-center text-center">
      {/* Logo stage */}
      <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-5 h-[88px] w-[88px] sm:h-[96px] sm:w-[96px] flex-shrink-0 overflow-hidden ring-1 ring-gray-200/80 shadow-sm">
        <img
          src={t.logo}
          alt={`${t.name} logo`}
          className="max-w-full max-h-full object-contain"
          style={{ transform: `scale(${scale})` }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-5">
        <GradientPill label={writtenPillLabels[lang]} />
      </div>

      {/* Quote */}
      <div className="mt-6 flex flex-col items-center max-w-[800px]">
        <GradientQuote />
        <p className="text-lg sm:text-xl lg:text-[22px] italic leading-relaxed text-slate-700 font-medium">
          {t.text[lang]}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-6" role="img" aria-label={starsAria}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="text-amber-400" fill="currentColor" />
          ))}
        </div>

        {/* Customer info */}
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={t.name} />
          <div className="text-left">
            <p className="font-semibold text-slate-900">{t.name}</p>
            <p className="text-sm text-slate-500">{t.role[lang]}</p>
            <p className="text-xs text-slate-400 mt-0.5">{t.industry[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Arrow button                                                        */
/* ------------------------------------------------------------------ */

function ArrowButton({
  direction,
  onClick,
  ariaLabel,
  hidden
}: {
  direction: 'left' | 'right'
  onClick: () => void
  ariaLabel: string
  hidden: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center w-11 h-11 rounded-full bg-white ring-1 ring-slate-200 shadow-sm hover:ring-purple-300 hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        hidden ? 'hidden' : ''
      } text-slate-600 hover:text-purple-600`}
    >
      {direction === 'left' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation()
  const { ref, visible } = useScrollReveal()
  const lang = (i18n.language?.substring(0, 2) || 'hu') as Lang

  const slides = useRef<Slide[]>(buildSlides()).current
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      const clamped = ((index % total) + total) % total
      setCurrent(clamped)
    },
    [total]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  const goToDot = (index: number) => {
    setCurrent(index)
  }

  /* Touch / swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    // Only trigger if horizontal swipe is dominant and large enough
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) next()
      else prev()
    }
  }

  return (
    <section
      id="ugyfelvelemenyek"
      className="relative py-20 lg:py-28 overflow-hidden bg-white"
    >
      {/* Very subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/30 rounded-full filter blur-[180px]" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section header */}
        <div className="relative text-center mb-12 lg:mb-16">
          {/* Soft contained radial glow behind heading only */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[420px] h-[200px] rounded-full opacity-[0.06] blur-[80px]"
              style={{
                background:
                  'radial-gradient(ellipse at center, #8b5cf6 0%, #ec4899 50%, transparent 70%)'
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Premium capsule eyebrow */}
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 mb-5 text-[11px] font-semibold uppercase tracking-widest bg-purple-50/60 backdrop-blur-sm"
              style={{
                border: '1px solid transparent',
                backgroundImage:
                  'linear-gradient(#ffffff, #ffffff), linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            >
              <span className={gradientText}>{t('testimonials.eyebrow')}</span>
            </span>

            {/* Split title: first phrase dark, second phrase gradient */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-[1.15] max-w-3xl">
              {t('testimonials.title_part1')}{' '}
              <span className={gradientText}>{t('testimonials.title_highlight')}</span>
            </h2>

            {/* Subtle gradient stroke beneath heading */}
            <div
              className="h-[2px] w-16 rounded-full mb-6 opacity-40"
              style={{
                background:
                  'linear-gradient(to right, transparent, #8b5cf6, #ec4899, transparent)'
              }}
            />

            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              {t('testimonials.description')}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop side arrows */}
          <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <ArrowButton direction="left" onClick={prev} ariaLabel={t('testimonials.prev_aria')} hidden={false} />
          </div>
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <ArrowButton direction="right" onClick={next} ariaLabel={t('testimonials.next_aria')} hidden={false} />
          </div>

          {/* Slide viewport — only active slide in flow */}
          <div
            className="mx-auto md:mx-16"
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              key={current}
              className="max-w-[800px] mx-auto px-2 sm:px-4 py-4 animate-[slide-in-left_0.4s_ease-out] motion-reduce:animate-none"
              aria-label={t('testimonials.slide_label', {
                index: current + 1,
                total,
                name: slides[current].name
              })}
            >
              {slides[current].type === 'video' ? (
                <VideoSlideContent
                  slide={slides[current] as VideoSlide}
                  lang={lang}
                  isActive={true}
                  playLabel={t('testimonials.play_aria')}
                />
              ) : (
                <TextSlideContent
                  slide={slides[current] as TextSlide}
                  lang={lang}
                  starsAria={t('testimonials.stars_aria')}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile arrows + pagination */}
        <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
          <ArrowButton direction="left" onClick={prev} ariaLabel={t('testimonials.prev_aria')} hidden={false} />
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDot(idx)}
                aria-label={t('testimonials.dot_aria', { index: idx + 1 })}
                aria-current={idx === current ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  idx === current
                    ? `w-7 ${gradientBorder}`
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <ArrowButton direction="right" onClick={next} ariaLabel={t('testimonials.next_aria')} hidden={false} />
        </div>

        {/* Desktop pagination dots */}
        <div className="hidden md:flex items-center justify-center gap-2.5 mt-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToDot(idx)}
              aria-label={t('testimonials.dot_aria', { index: idx + 1 })}
              aria-current={idx === current ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                idx === current
                  ? `w-8 ${gradientBorder}`
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
