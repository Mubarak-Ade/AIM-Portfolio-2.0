import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import type { CaseStudy } from '../data/projects'
import { ScreenshotFrame } from './ScreenshotFrame'
import { textLink } from '../lib/ui'

type CaseStudySpreadProps = {
  project: CaseStudy
  reverse?: boolean
}

export function CaseStudySpread({ project, reverse = false }: CaseStudySpreadProps) {
  return (
    <article className="grid grid-cols-1 items-center gap-6 border-b border-rule py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
      <div className={reverse ? 'lg:order-2' : undefined}>
        <ScreenshotFrame
          src={project.image}
          alt={project.imageAlt}
          caption={project.imageCaption}
          width={1500}
          height={1200}
          className="[&>div]:aspect-[4/3] [&>div]:overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-top"
        />
      </div>
      <div className={reverse ? 'lg:order-1' : undefined}>
        <p className="font-mono text-[0.68rem] uppercase leading-[1.5] tracking-[0.12em] text-accent">
          Sheet {project.sheet} / {project.category} / {project.year}
        </p>
        <h2 className="mt-2 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
          <Link className="text-ink no-underline transition-colors hover:text-accent" to={`/work/${project.slug}`}>
            {project.name}
          </Link>
        </h2>
        <p className="mt-2 max-w-[30ch] font-serif text-[1.1rem] italic leading-[1.4] text-accent-ink">
          {project.tagline}
        </p>
        <p className="mt-4 max-w-[50ch] text-sm leading-[1.7] text-ink-2">{project.deck}</p>
        <dl className="my-6 grid grid-cols-1 gap-4 border-y border-rule py-4 xs:grid-cols-3">
          <div>
            <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.09em] text-muted">
              Role
            </dt>
            <dd className="font-mono text-[0.72rem] leading-[1.55] text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.09em] text-muted">
              Stack
            </dt>
            <dd className="font-mono text-[0.72rem] leading-[1.55] text-ink">{project.stack}</dd>
          </div>
          <div>
            <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.09em] text-muted">
              Status
            </dt>
            <dd className="font-mono text-[0.72rem] leading-[1.55] text-ink">{project.status}</dd>
          </div>
        </dl>
        <Link className={textLink} to={`/work/${project.slug}`}>
          Read the case study
          <ArrowRight weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
