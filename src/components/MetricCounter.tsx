import { useEffect, useRef, useState } from 'react'

type MetricCounterProps = {
  value: number
  /** Zero-pad the animated number, e.g. 2 -> "03". */
  pad?: number
  suffix?: string
  className?: string
}

/**
 * Counts from zero to `value` once the number scrolls into view (1200ms,
 * matching the reference design). Reduced-motion visitors see the final value
 * immediately.
 */
export function MetricCounter({ value, pad = 0, suffix = '', className = '' }: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    let started = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()

        const duration = 1200
        const tick = (now: number) => {
          if (!started) started = now
          const progress = Math.min(1, (now - started) / duration)
          setDisplay(Math.round(progress * value))
          if (progress < 1) frame = window.requestAnimationFrame(tick)
        }

        frame = window.requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      {String(display).padStart(pad, '0')}
      {suffix}
    </span>
  )
}
