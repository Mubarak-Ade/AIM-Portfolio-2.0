import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import type { ArchitectureRow } from '../data/projects'

export function SystemMap({ rows }: { rows: ArchitectureRow[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = rows[activeIndex]

  if (!active) return null

  return (
    <figure className="mt-8 border-t border-rule-strong pt-5">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[0.58rem] uppercase leading-[1.5] tracking-[0.09em] text-muted">
        <span>Interactive system map</span>
        <span>Select a layer to inspect the decision.</span>
      </figcaption>

      <div className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-2">
        {rows.map((row, index) => (
          <div
            className="flex min-w-0 flex-col items-stretch gap-1.5 md:flex-1 md:flex-row md:items-center md:gap-2"
            key={row.layer}
          >
            <button
              type="button"
              className="group flex min-h-[4.5rem] flex-1 cursor-pointer flex-col gap-1 rounded border border-rule bg-surface p-3 text-left text-ink transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-rule-strong hover:bg-ink/[0.03] aria-pressed:border-accent aria-pressed:bg-accent/10 aria-pressed:shadow-[0_0_20px_var(--glow)] md:min-h-[5.4rem]"
              aria-pressed={index === activeIndex}
              aria-controls="system-map-detail"
              onClick={() => setActiveIndex(index)}
            >
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.08em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-[1.1rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                {row.layer}
              </span>
              <span className="line-clamp-2 font-mono text-[0.56rem] leading-[1.5] text-muted">
                {row.choice}
              </span>
            </button>
            {index < rows.length - 1 ? (
              <ArrowRight
                className="flex-none rotate-90 self-center text-[0.8rem] text-rule-strong md:rotate-0"
                weight="bold"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>

      <div
        className="mt-4 rounded border border-rule bg-surface-2 px-5 py-4"
        id="system-map-detail"
        aria-live="polite"
      >
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
          Layer {String(activeIndex + 1).padStart(2, '0')} / {active.layer}
        </p>
        <h3 className="mb-1.5 mt-1 text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.1] text-ink">
          {active.choice}
        </h3>
        <p className="max-w-[70ch] text-sm leading-[1.65] text-ink-2">{active.why}</p>
      </div>
    </figure>
  )
}
