import {
  ArrowUpRight,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { ContactForm } from '../components/ContactForm'
import { CopyEmailButton } from '../components/CopyEmailButton'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { site } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

export function Contact() {
  usePageMeta(
    'Contact — AIM',
    'Start a conversation with Mubaraq Ibrahim (AIM) about a full-stack role, a contract build, or a collaboration.',
  )

  return (
    <>
      <header className="border-b border-rule pb-12 pt-10 md:pt-20">
        <div className="shell">
          <SectionLabel number="01">Contact</SectionLabel>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <h1 className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-tight text-ink lg:col-span-8">
              Tell me what you&rsquo;re building.
            </h1>
            <div className="lg:col-span-4 lg:pt-8">
              <p className="max-w-[46ch] text-sm leading-[1.7] text-ink-2">
                I&rsquo;m open to full-stack roles and focused contract builds. The fastest way to
                reach me is email; the form below simply writes the draft for you.
              </p>
            </div>
          </div>
        </div>
      </header>

      <Reveal as="section" className="border-b border-rule py-20">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <aside>
            <h2 className="mb-2 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-[1.1] text-ink">
              Direct line
            </h2>
            <a
              className="mb-3 inline-block border-b border-rule-strong pb-1 font-mono text-[0.82rem] leading-[1.5] text-ink-2 no-underline transition-colors hover:border-accent hover:text-accent [overflow-wrap:anywhere] [&_svg]:ml-1 [&_svg]:inline-block [&_svg]:align-[-0.1em]"
              href={`mailto:${site.email}`}
            >
              {site.email}
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
            <div className="block">
              <CopyEmailButton email={site.email} />
            </div>

            <dl className="mt-8 border-t border-rule-strong">
              <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
                <dt className="font-mono text-[0.6rem] uppercase leading-[1.6] tracking-[0.1em] text-muted">
                  Availability
                </dt>
                <dd className="text-[0.82rem] leading-[1.6] text-ink-2">{site.availability}</dd>
              </div>
              <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-rule py-3">
                <dt className="font-mono text-[0.6rem] uppercase leading-[1.6] tracking-[0.1em] text-muted">
                  Useful for
                </dt>
                <dd className="text-[0.82rem] leading-[1.6] text-ink-2">
                  Full-stack product builds, React interfaces with real API contracts, auth and
                  permission-heavy workflows.
                </dd>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-1 border-t border-rule-strong xs:grid-cols-2">
              <a
                className="flex min-h-11 items-center gap-2 border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.06em] text-ink-2 no-underline transition-colors hover:text-accent [&_svg:last-child]:ml-auto"
                href={site.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogo aria-hidden="true" />
                GitHub
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
              <a
                className="flex min-h-11 items-center gap-2 border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.06em] text-ink-2 no-underline transition-colors hover:text-accent [&_svg:last-child]:ml-auto"
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinLogo aria-hidden="true" />
                LinkedIn
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
              <a
                className="flex min-h-11 items-center gap-2 border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.06em] text-ink-2 no-underline transition-colors hover:text-accent [&_svg:last-child]:ml-auto"
                href={site.cv}
                download
              >
                <DownloadSimple aria-hidden="true" />
                CV (PDF)
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
              <a
                className="flex min-h-11 items-center gap-2 border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.06em] text-ink-2 no-underline transition-colors hover:text-accent [&_svg:last-child]:ml-auto"
                href={`mailto:${site.email}`}
              >
                <EnvelopeSimple aria-hidden="true" />
                Email
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <div className="form-surface rounded-lg border border-rule bg-surface p-5 shadow-[0_24px_70px_-40px_var(--shadow-color)] xs:p-7 lg:max-w-[44rem]">
            <div className="mb-6 border-b border-rule pb-5">
              <h2 className="mb-2 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-[1.1] text-ink">
                Start an email draft
              </h2>
              <p className="max-w-[55ch] text-sm leading-[1.65] text-ink-2">
                Fill in a few details and your email app will open with the message ready to send.
                Nothing travels from this site.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </>
  )
}
