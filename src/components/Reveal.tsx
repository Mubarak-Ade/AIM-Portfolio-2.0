import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealTag = 'div' | 'section' | 'article' | 'header' | 'figure' | 'li'

type RevealProps = {
  as?: RevealTag
  children: ReactNode
  className?: string
  /** Extra delay in milliseconds for a deliberate stagger. */
  delay?: number
  id?: string
}

/**
 * Reveals a block once it enters the viewport using the same threshold and
 * easing as the reference design. The observer disconnects after the first
 * intersection, so scrolling back up does not replay the animation.
 */
export function Reveal({ as = 'div', children, className = '', delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal-on-scroll ${revealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
