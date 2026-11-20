import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { site } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'
import { btnGhost, btnPrimary } from '../lib/ui'

const principles = [
  {
    title: 'Model the domain before the screens',
    body:
      'A dashboard is a view of a model. If the states, owners and transitions are vague, the UI will be too. I start with the record and the rules, then design the surfaces around them.',
  },
  {
    title: 'Put validation at the edge',
    body:
      'The client should be helpful, not trusted. Shared shapes and server-side validation keep bad state from becoming a database problem. Error messages are part of the interface, not an afterthought.',
  },
  {
    title: 'Design the empty state',
    body:
      'New accounts, failed requests and expired sessions are not edge cases for the person experiencing them. A product feels considered when the quiet states are as clear as the demo state.',
  },
  {
    title: 'Leave a trail',
    body:
      'Versioned records, audit events and readable code are for the next person who has to change the system. I care about making the reasoning findable, not just making the feature work once.',
  },
]

const toolGroups = [
  {
    label: 'Front end',
    tools: 'React, TypeScript, Vite, React Router, TanStack Query, Zustand, Tailwind CSS',
  },
  {
    label: 'Back end',
    tools: 'Node.js, Express, Zod, REST APIs, JWT and cookie sessions',
  },
  {
    label: 'Data',
    tools: 'PostgreSQL, Drizzle ORM, MongoDB, Mongoose',
  },
  {
    label: 'Verification',
    tools: 'Vitest, API and UI tests, system-level workflow suites, keyboard and contrast checks',
  },
]

const sectionHeading = 'mb-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8'
const sectionTitle =
  'font-serif text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[1.1] text-ink'
const sectionIntro = 'max-w-[52ch] text-sm leading-[1.7] text-ink-2 lg:col-span-4 lg:pt-8'

export function About() {
  usePageMeta(
    'About — AIM',
    'Mubaraq Ibrahim (AIM) is a full-stack developer in Kano, Nigeria, focused on React, typed Node APIs and relational data.',
  )

  return (
    <>
      <header className="border-b border-rule pb-12 pt-10 md:pt-20">
        <div className="shell">
          <SectionLabel number="01">About</SectionLabel>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-tight text-ink lg:col-span-8">
              I like the part after the demo.
            </h1>
            <div className="lg:col-span-4 lg:pt-8">
              <p className="max-w-[46ch] text-sm leading-[1.7] text-ink-2">
                The schema. The permission edge case. The empty state. The deploy that has to work
                on a Tuesday. That is the work I want.
              </p>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                Mubaraq Ibrahim / AIM, Nigeria
              </p>
            </div>
          </div>
        </div>
      </header>

      <Reveal as="section" className="border-b border-rule py-20">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16">
          <div>
            <p className="max-w-[59ch] font-serif text-[clamp(1.3rem,2vw,1.55rem)] leading-[1.5] text-ink">
              I&rsquo;m Mubaraq Ibrahim &mdash; AIM &mdash; a full-stack developer based in
              Nigeria. I build web products end to end: the React interface, the Node API, the data
              model, the authentication flow, and the deployment loop that gets it into
              someone&rsquo;s hands.
            </p>
            <p className="mt-5 max-w-[59ch] text-[1.02rem] leading-[1.75] text-ink-2">
              I started with interfaces, then kept following the problem backwards. A form needed a
              validation contract. A dashboard needed a query shape. A review screen needed a
              version history. The projects in this portfolio are the result: full-stack builds
              where the interface is only one part of the work.
            </p>
          </div>

          <dl className="border-t border-rule-strong">
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">Focus</dt>
              <dd className="text-[0.82rem] leading-[1.55] text-ink-2">
                Full-stack product engineering
              </dd>
            </div>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">
                Education
              </dt>
              <dd className="text-[0.82rem] leading-[1.55] text-ink-2">
                BSc Software Engineering, Bayero University Kano — in progress (2023—present)
              </dd>
            </div>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">
                Availability
              </dt>
              <dd className="text-[0.82rem] leading-[1.55] text-ink-2">{site.availability}</dd>
            </div>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">
                Elsewhere
              </dt>
              <dd className="text-[0.82rem] leading-[1.55] text-ink-2">
                <a
                  className="mr-3 inline-flex items-center gap-1 text-ink-2 no-underline transition-colors hover:text-accent"
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
                <a
                  className="mr-3 inline-flex items-center gap-1 text-ink-2 no-underline transition-colors hover:text-accent"
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <Reveal as="section" className="border-b border-rule py-20">
        <div className="shell">
          <div className={sectionHeading}>
            <div className="lg:col-span-8">
              <SectionLabel number="02">Working principles</SectionLabel>
              <h2 className={sectionTitle}>Four things I keep coming back to.</h2>
            </div>
            <p className={sectionIntro}>
              Not a manifesto. Just the questions that tend to decide whether a build feels solid
              six months later.
            </p>
          </div>

          <ol className="border-y border-rule">
            {principles.map((principle, index) => (
              <li
                className="hover-light-sweep group grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-rule px-2 py-6 transition-colors duration-200 hover:bg-ink/[0.03] md:grid-cols-[2.4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-6 lg:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)]"
                key={principle.title}
              >
                <span className="font-mono text-[0.68rem] leading-[1.8] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-[1.4rem] font-medium leading-[1.2] text-ink transition-colors group-hover:text-accent">
                  {principle.title}
                </h3>
                <p className="col-start-2 text-[0.92rem] leading-[1.7] text-ink-2 md:col-start-3">
                  {principle.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="section" className="border-b border-rule py-20">
        <div className="shell">
          <div className={sectionHeading}>
            <div className="lg:col-span-8">
              <SectionLabel number="03">Toolkit</SectionLabel>
              <h2 className={sectionTitle}>The tools I reach for.</h2>
            </div>
            <p className={sectionIntro}>
              Familiar tools, chosen for the constraint. I&rsquo;m happy to work in a different
              stack when the project has a good reason for one.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-0 border-y border-rule md:grid-cols-2 md:gap-x-10">
            {toolGroups.map((group) => (
              <div
                className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-rule py-4"
                key={group.label}
              >
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">
                  {group.label}
                </dt>
                <dd className="text-[0.86rem] leading-[1.6] text-ink-2">{group.tools}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Link className={btnPrimary} to="/work">
              Read the case studies
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
            <a className={btnGhost} href={site.cv} download>
              Download CV (PDF)
              <DownloadSimple weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>
    </>
  )
}
