import { site } from '../data/site'
import { CopyEmailButton } from './CopyEmailButton'
import { Reveal } from './Reveal'

/** The big editorial call-to-action that closes every route. */
export function ContactCta() {
  return (
    <Reveal as="section" className="relative border-b border-rule py-20 sm:py-24">
      <div className="shell">
        <span className="mb-4 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          Next
        </span>
        <h2 className="mb-8 max-w-4xl font-serif text-[clamp(2.2rem,6vw,4.4rem)] font-medium leading-[1.08] tracking-tight text-ink">
          Have a product, a role, or a hard part that needs an owner?
        </h2>
        <div className="relative inline-flex max-w-full flex-wrap items-center gap-3">
          <a
            className="group inline-flex max-w-full items-center gap-2 border-b border-rule-strong pb-1 font-mono text-[clamp(0.85rem,2vw,1.15rem)] text-ink-2 no-underline transition-colors hover:border-accent hover:text-accent [overflow-wrap:anywhere]"
            href={`mailto:${site.email}`}
          >
            <span>{site.email}</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>
          <CopyEmailButton email={site.email} />
        </div>
      </div>
    </Reveal>
  )
}
