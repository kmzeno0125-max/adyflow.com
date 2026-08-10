import { useEffect, useRef, useState } from 'react'

/**
 * useInView — IntersectionObserver with a failsafe.
 *
 * If the observer never fires (e.g. element already in viewport on mount,
 * mobile Safari quirk, or observer error), the fallback timeout ensures
 * `inView` becomes `true` after `fallbackMs` milliseconds so content is
 * never permanently hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  fallbackMs = 1200
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      // No ref attached — trigger visible after fallback so content shows
      const t = setTimeout(() => setInView(true), fallbackMs)
      return () => clearTimeout(t)
    }

    // If IntersectionObserver is unavailable, show immediately
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    let observer: IntersectionObserver | null = null
    let fallback: ReturnType<typeof setTimeout> | null = null

    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setInView(true)
              observer?.disconnect()
              if (fallback) clearTimeout(fallback)
              break
            }
          }
        },
        { threshold, rootMargin: '0px 0px -5% 0px' }
      )
      observer.observe(el)
    } catch {
      // Observer creation failed — show content
      setInView(true)
      return
    }

    // Fallback: if observer doesn't fire within fallbackMs, show content anyway
    fallback = setTimeout(() => {
      setInView(true)
      observer?.disconnect()
    }, fallbackMs)

    return () => {
      observer?.disconnect()
      if (fallback) clearTimeout(fallback)
    }
  }, [threshold, fallbackMs])

  return { ref, inView }
}
