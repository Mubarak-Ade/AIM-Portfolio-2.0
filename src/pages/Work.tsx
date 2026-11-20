import { ArrowUpRight } from '@phosphor-icons/react'
import { CaseStudySpread } from '../components/CaseStudySpread'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { additionalProjects, caseStudies } from '../data/projects'
import { usePageMeta } from '../lib/usePageMeta'

const introGrid = 'grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8'

export function Work() {
  usePageMeta(
    'Work — AIM',
    'Case studies and additional builds from Mubaraq Ibrahim (AIM), a full-stack developer working across React, Node, PostgreSQL and MongoDB.',
  )

  return (
    <>
      <header className="border-b border-rule pb-12 pt-10 md:pt-20">
        <div className="shell">
          <SectionLabel number="01">Work index</SectionLabel>
          <div className={introGrid}>
            <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-tight text-ink lg:col-span-8">
              Work, with the decisions left in.
            </h1>
            <div className="lg:col-span-4 lg:pt-8">
              <p className="max-w-[46ch] text-sm leading-[1.7] text-ink-2">
                Four case studies and a register of other builds. Each case study starts with the
                problem, then explains the choices that shaped the product — including the parts
                that were hard to get right.
              </p>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                04 case studies / 03 additional builds / 2026
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule py-6">
        <div className="shell">
          <div className="border-t border-rule">
            {caseStudies.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70}>
                <CaseStudySpread project={project} reverse={index % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="border-b border-rule py-20">
        <div className="shell">
          <div className="mb-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <SectionLabel number="02">Also in the drawer</SectionLabel>
              <h2 className="font-serif text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[1.1] text-ink">
                Other builds, shorter notes.
              </h2>
            </div>
            <p className="max-w-[52ch] text-sm leading-[1.7] text-ink-2 lg:col-span-4 lg:pt-8">
              These are earlier or narrower builds. Some are live, some are source-only. They are
              here because range is easier to show than to claim.
            </p>
          </div>

          <div className="border-y border-rule">
            <div
              className="hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted md:grid md:grid-cols-[minmax(0,1.3fr)_12rem_14rem] md:gap-6 md:px-2 md:py-3"
              aria-hidden="true"
            >
              <span>Project</span>
              <span>Type</span>
              <span>Links</span>
            </div>
            {additionalProjects.map((project) => (
              <article
                className="hover-light-sweep group grid grid-cols-1 gap-2 border-t border-rule px-2 py-5 transition-colors duration-200 hover:bg-ink/[0.03] md:grid-cols-[minmax(0,1.3fr)_12rem_14rem] md:items-start md:gap-6"
                key={project.name}
              >
                <div>
                  <h3 className="mb-1 font-serif text-[1.35rem] font-medium leading-[1.2] text-ink transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="max-w-[55ch] text-sm leading-[1.65] text-ink-2">
                    {project.description}
                  </p>
                </div>
                <p className="font-mono text-[0.64rem] uppercase leading-[1.6] tracking-[0.08em] text-muted">
                  {project.category}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                  {project.links.map((link) => (
                    <a
                      className="inline-flex items-center gap-1 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink no-underline transition-colors hover:text-accent [&_svg]:transition-transform [&:hover_svg]:-translate-y-0.5 [&:hover_svg]:translate-x-0.5"
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
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  )
}
