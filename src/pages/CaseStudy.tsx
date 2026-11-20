import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from '@phosphor-icons/react'
import { Reveal } from '../components/Reveal'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import { SectionLabel } from '../components/SectionLabel'
import { SystemMap } from '../components/SystemMap'
import { getCaseStudy, getNextCaseStudy } from '../data/projects'
import { usePageMeta } from '../lib/usePageMeta'
import { textLink } from '../lib/ui'
import { NotFound } from './NotFound'

const caseSection = 'border-b border-rule py-20'
const caseGrid =
  'shell grid grid-cols-1 gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16'

export function CaseStudy() {
  const { slug } = useParams()
  const project = getCaseStudy(slug)

  usePageMeta(
    project ? `${project.name} — AIM` : 'Case study not found — AIM',
    project ? project.deck : 'This case study does not exist.',
  )

  if (!project) {
    return <NotFound />
  }

  const nextProject = getNextCaseStudy(project.slug)
  const imageWidths: Record<string, { width: number; height: number }> = {
    thesistrack: { width: 1500, height: 1875 },
    memodev: { width: 1400, height: 1102 },
    'shina-store': { width: 1400, height: 1243 },
    treevia: { width: 1440, height: 1000 },
  }
  const mainSize = imageWidths[project.slug] ?? { width: 1500, height: 1200 }

  return (
    <article>
      <header className="border-b border-rule pb-12 pt-8 md:pt-12">
        <div className="shell">
          <Link
            className="mb-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted no-underline transition-colors hover:text-accent"
            to="/work"
          >
            <ArrowLeft weight="bold" aria-hidden="true" />
            Work index
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-rule py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
            <span>Sheet {project.sheet}</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 py-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-[clamp(3rem,8vw,6.4rem)] font-medium leading-[0.95] tracking-tight text-ink">
                {project.name}
              </h1>
              <p className="mt-4 max-w-[31ch] font-serif text-[clamp(1.1rem,1.8vw,1.4rem)] italic leading-[1.4] text-accent-ink">
                {project.tagline}
              </p>
            </div>
            <div className="lg:col-span-4 lg:pt-3">
              <p className="max-w-[48ch] text-sm leading-[1.7] text-ink-2">{project.deck}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {project.links.map((link) => (
                  <a
                    className={textLink}
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                  >
                    {link.label}
                    <ArrowUpRight weight="bold" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-rule py-4 md:grid-cols-4">
            <div>
              <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
                Role
              </dt>
              <dd className="text-[0.8rem] leading-[1.5] text-ink-2">{project.role}</dd>
            </div>
            <div>
              <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
                Scope
              </dt>
              <dd className="text-[0.8rem] leading-[1.5] text-ink-2">{project.scope}</dd>
            </div>
            <div>
              <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
                Stack
              </dt>
              <dd className="text-[0.8rem] leading-[1.5] text-ink-2">{project.stack}</dd>
            </div>
            <div>
              <dt className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
                Status
              </dt>
              <dd className="text-[0.8rem] leading-[1.5] text-ink-2">{project.status}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="shell py-8">
        <ScreenshotFrame
          src={project.image}
          alt={project.imageAlt}
          caption={project.imageCaption}
          width={mainSize.width}
          height={mainSize.height}
          priority
          className="[&>div]:mx-auto [&>div]:aspect-video [&>div]:max-w-[62rem] [&>div]:overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-top"
        />
      </div>

      <Reveal as="section" className={caseSection}>
        <div className={caseGrid}>
          <div>
            <SectionLabel number="01" margin="tight">
              Context
            </SectionLabel>
          </div>
          <div className="max-w-[72ch]">
            <h2 className="mb-4 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.1] text-ink">
              The problem worth solving
            </h2>
            <p className="text-[1.02rem] leading-[1.8] text-ink-2">{project.problem}</p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className={caseSection}>
        <div className={caseGrid}>
          <div>
            <SectionLabel number="02" margin="tight">
              Decisions
            </SectionLabel>
          </div>
          <div className="max-w-[72ch]">
            <h2 className="mb-4 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.1] text-ink">
              What I decided, and why
            </h2>
            <ol className="mt-6 border-t border-rule-strong">
              {project.decisions.map((decision, index) => (
                <li
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-rule py-5 xs:grid-cols-[3.2rem_minmax(0,1fr)] xs:gap-5"
                  key={decision.title}
                >
                  <span className="pt-1 font-mono text-[0.68rem] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-serif text-[1.3rem] font-medium leading-[1.2] text-ink">
                      {decision.title}
                    </h3>
                    <p className="text-[0.92rem] leading-[1.7] text-ink-2">{decision.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className={caseSection}>
        <div className={caseGrid}>
          <div>
            <SectionLabel number="03" margin="tight">
              Architecture
            </SectionLabel>
          </div>
          <div className="max-w-[72ch]">
            <h2 className="mb-4 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.1] text-ink">
              How the pieces fit
            </h2>
            <div className="mt-6 border-t border-rule-strong">
              <div
                className="hidden font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted md:grid md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-5 md:border-b md:border-rule md:py-2.5"
                aria-hidden="true"
              >
                <span>Layer</span>
                <span>Choice</span>
                <span>Why</span>
              </div>
              {project.architecture.map((row) => (
                <div
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-5"
                  key={row.layer}
                >
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-accent">
                    {row.layer}
                  </p>
                  <p className="font-mono text-[0.7rem] leading-[1.6] text-ink">{row.choice}</p>
                  <p className="text-[0.87rem] leading-[1.65] text-ink-2">{row.why}</p>
                </div>
              ))}
            </div>

            <SystemMap rows={project.architecture} />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className={caseSection}>
        <div className={caseGrid}>
          <div>
            <SectionLabel number="04" margin="tight">
              The hard part
            </SectionLabel>
          </div>
          <div className="max-w-[72ch]">
            <h2 className="mb-4 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.1] text-ink">
              {project.hardPart.title}
            </h2>
            <p className="text-[1.02rem] leading-[1.8] text-ink-2">{project.hardPart.body}</p>
          </div>
        </div>
      </Reveal>

      {project.secondImage ? (
        <div className="shell border-b border-rule py-10">
          <ScreenshotFrame
            src={project.secondImage}
            alt={project.secondImageAlt ?? ''}
            caption={project.secondImageCaption ?? ''}
            width={1400}
            height={project.slug === 'thesistrack' ? 1750 : 1400}
          />
        </div>
      ) : null}

      <Reveal as="section" className="border-b border-rule py-12">
        <div className="shell">
          <div className="case-note grid grid-cols-1 gap-5 rounded border border-rule bg-surface p-5 xs:grid-cols-[2.2rem_minmax(0,1fr)] md:grid-cols-[2.4rem_minmax(0,1fr)_auto]">
            <div
              className="hidden h-9 w-9 place-items-center rounded-full border border-rule-strong text-accent xs:grid"
              aria-hidden="true"
            >
              <Info weight="bold" />
            </div>
            <div>
              <h2 className="mb-2 font-serif text-[1.5rem] font-medium text-ink">Status and context</h2>
              <p className="max-w-[68ch] text-[0.88rem] leading-[1.65] text-ink-2">{project.note}</p>
              <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                {project.status}
              </p>
            </div>
            <div className="col-start-1 mt-2 flex flex-col items-start gap-3 xs:col-start-2 xs:mt-0 md:col-start-3">
              {project.links.map((link) => (
                <a
                  className={textLink}
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                >
                  {link.label}
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <nav className="border-b border-rule bg-surface-2 py-16" aria-label="Next case study">
        <div className="shell">
          <Link
            className="group grid grid-cols-[minmax(0,1fr)_3rem] gap-x-8 gap-y-2 text-inherit no-underline md:grid-cols-[minmax(0,1fr)_4rem]"
            to={`/work/${nextProject.slug}`}
          >
            <span className="col-start-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              Next sheet / {nextProject.sheet}
            </span>
            <span className="col-start-1 font-serif text-[clamp(2.3rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
              {nextProject.name}
            </span>
            <span className="col-start-1 max-w-[38ch] text-[0.95rem] leading-[1.6] text-ink-2">
              {nextProject.tagline}
            </span>
            <span
              className="col-start-2 row-span-3 row-start-1 grid h-11 w-11 place-items-center self-center rounded-full border border-rule-strong text-ink transition-[background-color,color,transform] duration-200 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:h-14 md:w-14"
              aria-hidden="true"
            >
              <ArrowRight weight="bold" />
            </span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
