import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { notes } from '../../data/notes'
import { textLink } from '../../lib/ui'
import { Reveal } from '../Reveal'
import { SectionLabel } from '../SectionLabel'


interface FieldNoteProps {
  sectionHeading: string;
  sectionTitle: string;
  sectionIntro: string;
}

export default function FieldNote({
  sectionHeading,
  sectionIntro,
  sectionTitle,
}: FieldNoteProps) {
  return (
    <Reveal as="section" className="border-b border-rule py-20" id="notes">
        <div className="shell">
          <div className={sectionHeading}>
            <div className="lg:col-span-8">
              <SectionLabel number="03">Field notes</SectionLabel>
              <h2 className={sectionTitle}>
                What I notice
                <br />
                while building.
              </h2>
            </div>
            <p className={sectionIntro}>
              Short write-ups on the decisions that do not fit in a screenshot:
              state transitions, server-owned totals, session expiry and the
              quiet states.
            </p>
          </div>

          <div className="divide-y divide-rule border-y border-rule font-mono">
            {notes.slice(0, 3).map((note) => (
              <Link
                className="group -mx-3 flex items-center justify-between gap-4 rounded px-3 py-5 transition-all duration-200 hover:bg-ink/[0.035]"
                key={note.slug}
                to={`/notes#${note.slug}`}
              >
                <div className="flex min-w-0 items-center gap-6">
                  <span className="font-mono text-xs font-medium text-muted transition-colors duration-200 group-hover:text-ink">
                    {note.number}
                  </span>
                  <span className="font-serif text-lg leading-snug text-ink transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent sm:text-xl">
                    {note.title}
                  </span>
                </div>
                <div className="flex flex-none items-center gap-4 text-xs">
                  <span className="hidden text-muted transition-colors duration-200 group-hover:text-ink-2 sm:inline">
                    {note.project}
                  </span>
                  <span className="text-ink-2 transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:text-accent">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-[1.7]">
              These notes are tied to the projects above. The case studies carry
              the full context, including what is a demo and what is
              source-only.
            </p>
            <Link className={`${textLink} whitespace-nowrap`} to="/notes">
              Read all four notes
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
  )
}
