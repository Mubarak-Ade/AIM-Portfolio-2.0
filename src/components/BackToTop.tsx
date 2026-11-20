import type { MouseEvent } from 'react'

/** Footer link that smooth-scrolls to the top, or jumps for reduced motion. */
export function BackToTop() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <a
      className="group inline-flex cursor-pointer items-center gap-1 py-1 text-ink-2 no-underline transition-colors duration-200 hover:text-ink"
      href="#top"
      onClick={handleClick}
    >
      <span>Back to top</span>
      <span className="transition-transform duration-200 group-hover:-translate-y-1">↑</span>
    </a>
  )
}
