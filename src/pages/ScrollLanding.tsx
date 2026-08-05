import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './scroll-landing.css'

export default function ScrollLanding() {
  const { t } = useTranslation()
  const sl = 'scroll_landing'
  const chaosWords = t(`${sl}.chaos_words`, { returnObjects: true }) as string[]
  const stationLabels = t(`${sl}.station_labels`, { returnObjects: true }) as string[]
  const audSlides = t(`${sl}.aud_slides`, { returnObjects: true }) as { big: string; sub: string }[]
  const probItems = t(`${sl}.prob_items`, { returnObjects: true }) as { h: string; p: string }[]
  const procSteps = t(`${sl}.proc_steps`, { returnObjects: true }) as { title: string; tag: string; line: string; chip: string }[]
  const cmpTradRows = t(`${sl}.cmp_trad_rows`, { returnObjects: true }) as string[]
  const cmpAdyRows = t(`${sl}.cmp_ady_rows`, { returnObjects: true }) as string[]
  const benItems = t(`${sl}.ben_items`, { returnObjects: true }) as { title: string; desc: string }[]

  const [audCur, setAudCur] = useState(0)
  const [vsRevealed, setVsRevealed] = useState(false)
  const [chartDrawn, setChartDrawn] = useState(false)
  const [procProgress, setProcProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const procRef = useRef<HTMLElement>(null)
  const ptrackRef = useRef<HTMLDivElement>(null)
  const audTrackRef = useRef<HTMLDivElement>(null)
  const vsRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const glineRef = useRef<SVGPathElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })

    document.querySelectorAll('.sl-rv, .sl-prob-item').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // VS section observer
  useEffect(() => {
    if (!vsRef.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVsRevealed(true) })
    }, { threshold: 0.4 })
    io.observe(vsRef.current)
    return () => io.disconnect()
  }, [])

  // Chart observer
  useEffect(() => {
    if (!chartRef.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setChartDrawn(true) })
    }, { threshold: 0.3 })
    io.observe(chartRef.current)
    return () => io.disconnect()
  }, [])

  // Stroke dasharray for chart line
  useEffect(() => {
    if (glineRef.current) {
      const len = glineRef.current.getTotalLength()
      glineRef.current.style.strokeDasharray = String(len)
      glineRef.current.style.strokeDashoffset = chartDrawn ? '0' : String(len)
    }
  }, [chartDrawn])

  // Process section height for pin — must run before scroll handler
  useEffect(() => {
    const sizeProc = () => {
      if (!procRef.current || !ptrackRef.current) return
      if (window.innerWidth > 920 && !reduceMotion.current) {
        const viewport = ptrackRef.current.parentElement
        if (viewport) {
          const overflow = ptrackRef.current.scrollWidth - viewport.clientWidth
          if (overflow > 0) {
            procRef.current.style.height = (overflow + window.innerHeight) + 'px'
          }
        }
      } else {
        procRef.current.style.height = 'auto'
      }
    }
    // Run after a frame to ensure layout is stable
    const raf = requestAnimationFrame(() => {
      sizeProc()
      // Run again after fonts/images settle
      setTimeout(sizeProc, 300)
    })
    window.addEventListener('resize', sizeProc)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', sizeProc) }
  }, [])

  // Scroll handler: progress bar + process section
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0)

        if (procRef.current && window.innerWidth > 920 && !reduceMotion.current) {
          const rect = procRef.current.getBoundingClientRect()
          const sectionHeight = procRef.current.offsetHeight
          const scrollable = sectionHeight - window.innerHeight
          if (scrollable > 0) {
            const prog = Math.min(1, Math.max(0, -rect.top / scrollable))
            setProcProgress(prog)
          }
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Audience auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setAudCur(c => {
        const next = (c + 1) % 4
        scrollToSlide(next)
        return next
      })
    }, 3800)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const scrollToSlide = useCallback((idx: number) => {
    const track = audTrackRef.current
    if (!track) return
    const slides = track.querySelectorAll<HTMLElement>('.sl-aud-slide')
    const slide = slides[idx]
    if (slide) {
      const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2
      track.scrollTo({ left, behavior: reduceMotion.current ? 'auto' : 'smooth' })
    }
  }, [])

  const handleAudScroll = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = null
    const track = audTrackRef.current
    if (!track) return
    const slides = track.querySelectorAll<HTMLElement>('.sl-aud-slide')
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0, bd = 1e9
    slides.forEach((s, i) => {
      const mid = s.offsetLeft + s.offsetWidth / 2
      const d = Math.abs(mid - center)
      if (d < bd) { bd = d; best = i }
    })
    setAudCur(best)
  }, [])

  const handleAudTouch = useCallback(() => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null }
  }, [])

  // Process computed values
  const procActive = Math.min(4, Math.max(0, Math.floor(procProgress * 5 - 0.0001)))
  const getTrackTranslate = () => {
    if (!ptrackRef.current) return 0
    const viewport = ptrackRef.current.parentElement
    if (!viewport) return 0
    const overflow = ptrackRef.current.scrollWidth - viewport.clientWidth
    if (overflow <= 0) return 0
    return -(procProgress * overflow)
  }
  const ptrackTranslate = getTrackTranslate()

  return (
    <div className="sl-page">
      {/* Progress bar */}
      <div className="sl-progress">
        <i style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      {/* 2. AUDIENCE */}
      <section className="sl-aud" id="aud">
        <div className="sl-aud-head">
          <span className="sl-eyebrow sl-rv">{t(`${sl}.aud_eyebrow`)}</span>
          <h2 className="sl-rv">{t(`${sl}.aud_title_part1`)} <span className="sl-grad">{t(`${sl}.aud_title_highlight`)}</span></h2>
        </div>
        <div className="sl-aud-track" ref={audTrackRef} onScroll={handleAudScroll} onTouchStart={handleAudTouch}>
          {audSlides.map((slide, i) => {
            const idx = String(i + 1).padStart(2, '0')
            return (
              <div key={i} className={`sl-aud-slide s${i + 1}`}><div className="idx">{idx}</div><div className="big">{slide.big}</div><div className="sub">{slide.sub}</div><div className="ghost">{idx}</div></div>
            )
          })}
        </div>
        <div className="sl-aud-dots">
          {[0,1,2,3].map(i => (
            <b key={i} className={i === audCur ? 'on' : ''} onClick={() => { scrollToSlide(i); setAudCur(i) }} />
          ))}
        </div>
        <p className="sl-aud-punch sl-rv">{t(`${sl}.aud_punch_part1`)} <span className="sl-grad">{t(`${sl}.aud_punch_highlight`)}</span>{t(`${sl}.aud_punch_part2`)}</p>
      </section>

      {/* 3. PROBLEM */}
      <section className="sl-prob" id="prob">
        <div className="sl-noise-field">
          {chaosWords.map((w, i) => (
            <span key={i} className="sl-chip" style={{
              left: `${(i * 4.7 + 3) % 93}%`,
              top: `${(i * 4.1 + 6) % 82 + 6}%`,
              ['--dur' as string]: `${9 + (i * 1.3) % 10}s`,
              ['--dx' as string]: `${((i % 2 === 0 ? 1 : -1) * (15 + i * 2.3)) % 38}px`,
              ['--dy' as string]: `${((i % 2 === 1 ? 1 : -1) * (12 + i * 1.8)) % 38}px`,
              animationDelay: `${-(i * 0.7)}s`,
              fontSize: `${0.72 + (i * 0.023)}rem`,
            }}>{w}</span>
          ))}
        </div>
        <div className="sl-wrap sl-prob-inner">
          <div className="sl-prob-head">
            <span className="sl-eyebrow sl-rv">{t(`${sl}.prob_eyebrow`)}</span>
            <h2 className="sl-rv">{t(`${sl}.prob_title_part1`)} <span style={{ color: 'var(--red)' }}>{t(`${sl}.prob_title_highlight`)}</span></h2>
          </div>
          <div className="sl-prob-zig">
            {probItems.map((item, i) => (
              <div key={i} className="sl-prob-item"><span className="sl-prob-dot" /><div><h3>{item.h}</h3><p>{item.p}</p></div></div>
            ))}
          </div>
          <p className="sl-prob-punch sl-rv">{t(`${sl}.prob_punch_line1`)}<br /><span className="sl-grad">{t(`${sl}.prob_punch_line2`)}</span></p>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="sl-proc" id="proc" ref={procRef}>
        <div className="sl-proc-glow" />
        <div className="sl-proc-pin">
          <div className="sl-proc-top">
            <span className="pill">{t(`${sl}.proc_pill`)}</span>
            <h2>{t(`${sl}.proc_title_part1`)} <span className="sl-grad">{t(`${sl}.proc_title_highlight`)}</span></h2>
            <div className="sub">{t(`${sl}.proc_sub`)}</div>
          </div>
          <div className="sl-proc-viewport">
            <div className="sl-ptrack" ref={ptrackRef} style={{ transform: `translateX(${ptrackTranslate}px)` }}>
              {procSteps.map((s, i) => (
                <StepWithConnect key={i} step={{ num: String(i + 1).padStart(2, '0'), ...s }} active={procActive === i} isLast={i === 4} />
              ))}
            </div>
          </div>
          <div className="sl-pwire">
            <div className="sl-pwire-rail" />
            <div className="sl-pwire-fill" style={{ width: `${procProgress * 100}%` }} />
            {[10, 30, 50, 70, 90].map((pct, i) => (
              <div key={i} className={`sl-pstation${(i * 20 + 10) <= procProgress * 100 ? ' on' : ''}`} style={{ left: `${pct}%` }} />
            ))}
            <div className="sl-ptoken" style={{ left: `${procProgress * 100}%` }}>
              <div className="core" />
              <div className="label">{stationLabels[procActive]}</div>
            </div>
          </div>
        </div>
        <div className="sl-proc-mobile">
          {procSteps.map((step, i) => (
            <div key={i} className="sl-pstep on"><div className="num">{String(i + 1).padStart(2, '0')}</div><h3>{step.title}</h3><div className="tag">{step.tag}</div><div className="line">{step.line}</div></div>
          ))}
        </div>
      </section>

      {/* 5. COMPARE */}
      <section className="sl-cmp" id="cmp">
        <div className="sl-cmp-head">
          <span className="sl-eyebrow sl-rv">{t(`${sl}.cmp_eyebrow`)}</span>
          <h2 className="sl-rv">{t(`${sl}.cmp_title_part1`)} <span className="sl-grad">{t(`${sl}.cmp_title_highlight`)}</span></h2>
        </div>
        <div className={`sl-vs${vsRevealed ? ' rev' : ''}`} ref={vsRef}>
          <div className="sl-side trad">
            <h3>{t(`${sl}.cmp_trad_title`)}</h3>
            <div className="rows">
              {cmpTradRows.map((row, i) => (
                <div key={i} className="row"><span className="mk"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></span>{row}</div>
              ))}
            </div>
            <div className="foot">{t(`${sl}.cmp_trad_foot`)}</div>
          </div>
          <div className="sl-vsbadge">VS</div>
          <div className="sl-side ady">
            <h3>{t(`${sl}.cmp_ady_title`)}</h3>
            <div className="rows">
              {cmpAdyRows.map((row, i) => (
                <div key={i} className="row"><span className="mk"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>{row}</div>
              ))}
            </div>
            <div className="foot">{t(`${sl}.cmp_ady_foot`)}</div>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS */}
      <section className="sl-ben" id="ben">
        <div className="sl-ben-head">
          <span className="sl-eyebrow sl-rv">{t(`${sl}.ben_eyebrow`)}</span>
          <h2 className="sl-rv">{t(`${sl}.ben_title_part1`)} <span className="sl-grad">{t(`${sl}.ben_title_highlight`)}</span></h2>
          <p className="sl-rv">{t(`${sl}.ben_sub`)}</p>
        </div>

        <div className={`sl-chart${chartDrawn ? ' draw' : ''}`} ref={chartRef}>
          <svg viewBox="0 0 1000 460" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sl-gg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3B82F6" /><stop offset="0.5" stopColor="#8B5CF6" /><stop offset="1" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="sl-ga" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.28" /><stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="grid">
              <line x1="0" y1="115" x2="1000" y2="115" /><line x1="0" y1="230" x2="1000" y2="230" /><line x1="0" y1="345" x2="1000" y2="345" />
            </g>
            <path className="sl-garea" d="M0 430 C 80 415 100 365 130 350 C 240 315 270 320 320 300 C 430 268 470 260 520 225 C 630 190 670 178 720 150 C 830 110 860 96 910 70 C 955 52 980 48 1000 44 L 1000 460 L 0 460 Z" />
            <path className="sl-gline" ref={glineRef} d="M0 430 C 80 415 100 365 130 350 C 240 315 270 320 320 300 C 430 268 470 260 520 225 C 630 190 670 178 720 150 C 830 110 860 96 910 70 C 955 52 980 48 1000 44" />
          </svg>

          <BenefitMark drawn={chartDrawn} pos={{ left: '13%', top: '76%' }} dir="down" delay={0} color="sl-g-green"
            icon={<path d="M3 17l6-6 4 4 8-8M17 7h4v4" />} title={benItems[0].title} desc={benItems[0].desc} />
          <BenefitMark drawn={chartDrawn} pos={{ left: '32%', top: '65%' }} dir="up" delay={1} color="sl-g-blue"
            icon={<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />} title={benItems[1].title} desc={benItems[1].desc} />
          <BenefitMark drawn={chartDrawn} pos={{ left: '52%', top: '49%' }} dir="down" delay={2} color="sl-g-purple"
            icon={<><circle cx="9" cy="7" r="3" /><path d="M2 21v-1a5 5 0 0 1 10 0v1M16 7a3 3 0 0 1 0 6" /></>} title={benItems[2].title} desc={benItems[2].desc} />
          <BenefitMark drawn={chartDrawn} pos={{ left: '72%', top: '33%' }} dir="up" delay={3} color="sl-g-pink"
            icon={<path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 2.5c0 4-4 7.5-9 11.5z" />} title={benItems[3].title} desc={benItems[3].desc} />
          <BenefitMark drawn={chartDrawn} pos={{ left: '91%', top: '15%' }} dir="down" delay={4} color="sl-g-orange"
            icon={<path d="M3 8a5 5 0 0 1 5-5h9l-3-3M21 16a5 5 0 0 1-5 5H7l3 3" />} title={benItems[4].title} desc={benItems[4].desc} />
        </div>

        <div className="sl-ben-mobile">
          {[
            { color: 'var(--green)', title: benItems[0].title, desc: benItems[0].desc },
            { color: 'var(--blue)', title: benItems[1].title, desc: benItems[1].desc },
            { color: 'var(--purple)', title: benItems[2].title, desc: benItems[2].desc },
            { color: '#db2777', title: benItems[3].title, desc: benItems[3].desc },
            { color: '#ea580c', title: benItems[4].title, desc: benItems[4].desc },
          ].map((item, i) => (
            <div key={i} className="sl-prob-item in"><span className="sl-prob-dot" style={{ background: item.color }} /><div><h3>{item.title}</h3><p>{item.desc}</p></div></div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="sl-final" id="final">
        <div className="sl-mesh"><span className="sl-blob b" /></div>
        <div className="inner">
          <h2 className="sl-rv">{t(`${sl}.final_title_part1`)} <span className="sl-grad">{t(`${sl}.final_title_highlight`)}</span></h2>
          <p className="sl-rv">{t(`${sl}.final_sub`)}</p>
          <button
            type="button"
            className="sl-cta sl-rv"
            onClick={() => document.getElementById('kapcsolat')?.scrollIntoView({ behavior: 'smooth' })}
          >{t(`${sl}.final_cta`)}</button>
        </div>
      </section>
    </div>
  )
}

function StepWithConnect({ step, active, isLast }: { step: { num: string; title: string; tag: string; line: string; chip: string }; active: boolean; isLast: boolean }) {
  return (
    <>
      <div className={`sl-pstep${active ? ' on' : ''}`}>
        <div className="num">{step.num}</div>
        <h3>{step.title}</h3>
        <div className="tag">{step.tag}</div>
        <div className="line">{step.line}</div>
        <div className="chip2"><span>{step.chip}</span></div>
      </div>
      {!isLast && <div className="sl-pconnect" />}
    </>
  )
}

function BenefitMark({ drawn, pos, dir, delay, color, icon, title, desc }: {
  drawn: boolean; pos: { left: string; top: string }; dir: 'up' | 'down'; delay: number;
  color: string; icon: React.ReactNode; title: string; desc: string
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!drawn) return
    const t = setTimeout(() => setShow(true), 480 + delay * 300)
    return () => clearTimeout(t)
  }, [drawn, delay])

  return (
    <div className={`sl-bmark ${dir}${show ? ' on' : ''}`} style={pos}>
      <div className="dot" />
      <div className="sl-bcallout">
        <div className={`ti ${color}`}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}
