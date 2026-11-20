import type { ReactNode } from 'react'

type SectionLabelProps = {
  number?: string
  children: ReactNode
  className?: string
  tone?: 'default' | 'onDark'
  margin?: 'default' | 'none' | 'tight'
}

export function SectionLabel({
  number,
  children,
  className = '',
  tone = 'default',
  margin = 'default',
}: SectionLabelProps) {
  const marginClass =
    margin === 'none' ? 'mb-0' : margin === 'tight' ? 'mb-0 md:mb-0' : 'mb-4'
  const toneClass = tone === 'onDark' ? 'text-snow/65' : 'text-muted'

  return (
    <p
      className={`flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase leading-[1.4] tracking-[0.14em] ${marginClass} ${toneClass} ${className}`.trim()}
    >
      {number ? <span className="text-accent">{number}</span> : null}
      <span>{children}</span>
    </p>
  )
}
