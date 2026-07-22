import { useEffect, useRef, useState, useCallback } from 'react'
import './intro.css'

const FLIGHT_PATH = 'M -240 400 C 20 380, 152 330, 152 170 A 300 46 0 1 1 752 170 A 300 46 0 1 1 152 170 C 152 100, 60 96, 40 170 C 28 230, 80 246, 144 202'

function PlaneSVG({ id }: { id: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-wing-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAF2F9" />
          <stop offset="100%" stopColor="#BBD4E8" />
        </linearGradient>
      </defs>
      {/* Main body / lower wing - dark blue */}
      <path
        d="M 10 58 L 40 12 L 70 42 L 38 50 Z"
        fill="#1B4E7E"
        stroke="#1B4E7E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Upper wing surface - gradient */}
      <path
        d="M 14 54 L 40 14 L 62 36 L 36 46 Z"
        fill={`url(#${id}-wing-grad)`}
        stroke="#1B4E7E"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Fold line */}
      <path
        d="M 40 14 L 38 50"
        stroke="#1B4E7E"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Circuit / NYAK lines on wing */}
      <path
        className="af-intro-circuit af-intro-circuit-1"
        d="M 26 38 L 32 30 L 28 26"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        className="af-intro-circuit af-intro-circuit-2"
        d="M 30 44 L 38 34 L 34 30"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        className="af-intro-circuit af-intro-circuit-3"
        d="M 22 42 L 26 36 L 30 38"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function MotionLines() {
  return (
    <svg className="af-intro-motion-lines" width="50" height="40" viewBox="0 0 50 40" fill="none">
      <path
        className="af-intro-mline af-intro-mline-1"
        d="M 45 10 C 35 12, 20 14, 5 12"
        stroke="#1B4E7E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="af-intro-mline af-intro-mline-2"
        d="M 45 20 C 35 21, 18 22, 2 20"
        stroke="#1B4E7E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="af-intro-mline af-intro-mline-3"
        d="M 45 30 C 35 29, 20 28, 8 30"
        stroke="#1B4E7E"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const completedRef = useRef(false)

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    sessionStorage.setItem('adyflow_intro_v1', '1')
    document.body.style.overflow = ''

    const el = overlayRef.current
    if (el) {
      el.classList.add('af-intro-exit')
      setTimeout(() => setVisible(false), 260)
    } else {
      setVisible(false)
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    timerRef.current = setTimeout(finish, 4000)

    const skip = () => finish()
    window.addEventListener('click', skip, { once: true, passive: true })
    window.addEventListener('touchstart', skip, { once: true, passive: true })
    window.addEventListener('scroll', skip, { once: true, passive: true })
    window.addEventListener('keydown', skip, { once: true, passive: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })

    return () => {
      document.body.style.overflow = ''
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('click', skip)
      window.removeEventListener('touchstart', skip)
      window.removeEventListener('scroll', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
  }, [finish])

  if (!visible) return null

  const ghostDelays = [40, 80, 120, 160]
  const ghostOpacities = [0.25, 0.18, 0.12, 0.07]
  const ghostScales = [0.94, 0.88, 0.82, 0.76]

  return (
    <div
      ref={overlayRef}
      className="af-intro-overlay"
      aria-hidden="true"
      tabIndex={-1}
      style={{ pointerEvents: 'none' }}
    >
      <div className="af-intro-canvas">
        {/* Text layer - z-index 2 */}
        <div className="af-intro-text">
          {'AdyFlow'.split('').map((char, i) => (
            <span
              key={i}
              className="af-intro-char"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Ghost trails - behind text */}
        {ghostDelays.map((delay, gi) => (
          <div
            key={`ghost-${gi}`}
            className="af-intro-plane af-intro-plane-back af-intro-ghost"
            style={{
              animationDelay: `${300 + delay}ms, ${300 + delay}ms, ${300 + delay}ms`,
              opacity: ghostOpacities[gi],
              '--ghost-scale': ghostScales[gi],
            } as React.CSSProperties}
          >
            <PlaneSVG id={`ghost-${gi}`} />
          </div>
        ))}

        {/* Plane BACK layer - z-index 1, behind text */}
        <div className="af-intro-plane af-intro-plane-back">
          <PlaneSVG id="back" />
        </div>

        {/* Plane FRONT layer - z-index 3, in front of text */}
        <div className="af-intro-plane af-intro-plane-front">
          <PlaneSVG id="front" />
        </div>

        {/* Motion lines - appear at landing */}
        <div className="af-intro-landing-lines">
          <MotionLines />
        </div>
      </div>

      {/* Hidden SVG for motion path definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <path id="af-flight-path" d={FLIGHT_PATH} />
        </defs>
      </svg>
    </div>
  )
}
