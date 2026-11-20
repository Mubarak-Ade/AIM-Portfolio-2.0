import { useEffect, useRef } from 'react'

/**
 * A 700px radial wash that follows the mouse behind the page content.
 * Touch devices and reduced-motion visitors never see it (CSS handles both).
 */
export function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      element.style.left = `${event.clientX}px`
      element.style.top = `${event.clientY}px`
      element.classList.add('is-active')
    }

    const onLeave = () => element.classList.remove('is-active')

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="ambient-glow" />
}
