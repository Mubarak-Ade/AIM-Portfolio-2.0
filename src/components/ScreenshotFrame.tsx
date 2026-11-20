import type { ReactNode } from 'react'

type ScreenshotFrameProps = {
  src: string
  alt: string
  caption: ReactNode
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ScreenshotFrame({
  src,
  alt,
  caption,
  width,
  height,
  className = '',
  priority = false,
}: ScreenshotFrameProps) {
  return (
    <figure className={`min-w-0 ${className}`.trim()}>
      <div className="shot-frame group relative rounded-lg border border-rule bg-surface p-2 shadow-[0_24px_70px_-38px_var(--shadow-color)] transition-all duration-300 hover:border-accent/50 hover:shadow-[0_10px_40px_var(--glow)] sm:p-3">
        <span
          className="pointer-events-none absolute -left-1 -top-1 h-2.5 w-2.5 border-l-2 border-t-2 border-accent transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-1 -top-1 h-2.5 w-2.5 border-r-2 border-t-2 border-accent transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-accent transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-accent transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5"
          aria-hidden="true"
        />
        <div className="h-full overflow-hidden rounded-md border border-rule bg-page">
          <img
            className="h-auto w-full"
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            decoding="async"
          />
        </div>
      </div>
      <figcaption className="pt-3 font-mono text-[0.64rem] leading-[1.55] text-muted">
        {caption}
      </figcaption>
    </figure>
  )
}
