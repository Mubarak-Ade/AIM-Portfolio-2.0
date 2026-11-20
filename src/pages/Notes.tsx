import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { notes } from '../data/notes'
import { usePageMeta } from '../lib/usePageMeta'
import { textLink } from '../lib/ui'

const introGrid = 'grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8'

export function Notes() {
  usePageMeta(
    'Field notes — AIM',
    'Short engineering notes from Mubaraq Ibrahim (AIM) on domain modelling, server-owned state, session expiry and designing quiet states.',
  )

  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1))
      if (!target) return
      target.scrollIntoView({ block: 'start' })
      target.querySelector<HTMLHeadingElement>('h2')?.focus({ preventScroll: true })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      <header className="border-b border-rule pb-12 pt-10 md:pt-20">
        <div className="shell">
          <SectionLabel number="01">Field notes</SectionLabel>
          <div className={introGrid}>
            <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-tight text-ink lg:col-span-8">
              Notes from the seams.
            </h1>
            <div className="lg:col-span-4 lg:pt-8">
              <p className="max-w-[46ch] text-sm leading-[1.7] text-ink-2">
                Short write-ups about the parts that do not fit in a screenshot: state that three
                roles disagree about, totals the server has to own, and the screens people meet
                before the demo data arrives.
              </p>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                04 notes / last revised October 2026
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule py-6">
        <div className="shell">
          <ol className="border-t border-rule">
            {notes.map((note, index) => (
              <Reveal
                as="li"
                className="grid scroll-mt-24 grid-cols-1 gap-5 border-b border-rule py-[clamp(2.2rem,4vw,3.5rem)] md:grid-cols-[9rem_minmax(0,1fr)] md:gap-[clamp(1.5rem,4vw,3rem)]"
                delay={index * 60}
                id={note.slug}
                key={note.slug}
              >
                <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 md:sticky md:top-24 md:flex-col md:items-start md:gap-2 md:self-start">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">
                    Note {note.number}
                  </span>
                  <Link
                    className="inline-flex items-center gap-1 border-b border-rule-strong pb-0.5 font-mono text-[0.62rem] tracking-[0.03em] text-ink-2 no-underline transition-colors hover:border-accent hover:text-accent"
                    to={note.projectHref}
                  >
                    {note.project}
                    <ArrowUpRight weight="bold" aria-hidden="true" />
                  </Link>
                </div>

                <article className="max-w-[72ch]" aria-labelledby={`note-${note.slug}-title`}>
                  <h2
                    className="font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.05] text-ink focus:outline-none"
                    id={`note-${note.slug}-title`}
                    tabIndex={-1}
                  >
                    {note.title}
                  </h2>
                  <p className="mt-3 text-[1.02rem] italic leading-[1.7] text-ink-2">
                    {note.summary}
                  </p>

                  <div className="mt-6 border-t border-rule">
                    {note.sections.map((section) => (
                      <section
                        className="grid grid-cols-1 gap-1 border-b border-rule py-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-5"
                        key={section.heading}
                      >
                        <h3 className="font-mono text-[0.6rem] font-medium uppercase leading-[1.7] tracking-[0.1em] text-muted">
                          {section.heading}
                        </h3>
                        <p className="text-[0.92rem] leading-[1.75] text-ink-2">{section.body}</p>
                      </section>
                    ))}
                  </div>

                  <p className="my-5 rounded-r border-l-2 border-accent bg-accent/5 px-4 py-3.5 text-[0.94rem] leading-[1.7] text-ink-2">
                    <span className="mb-1 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
                      Takeaway
                    </span>
                    {note.takeaway}
                  </p>

                  <Link className={textLink} to={note.projectHref}>
                    Read the {note.project} case study
                    <ArrowRight weight="bold" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-[1.7]">
              These notes describe decisions inside the projects shown on this site. Where a build
              is a demo, a source-only project or has a limitation, the case study says so.
            </p>
            <Link className={`${textLink} whitespace-nowrap`} to="/work">
              See the full work index
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
