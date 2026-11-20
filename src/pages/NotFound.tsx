import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { SectionLabel } from '../components/SectionLabel'
import { usePageMeta } from '../lib/usePageMeta'
import { btnGhost, btnPrimary } from '../lib/ui'

export function NotFound() {
  usePageMeta('Page not found — AIM', 'This page does not exist. Return to the work index or the home page.')

  return (
    <section className="grid min-h-[68vh] place-items-center border-b border-rule px-[var(--gutter)] py-20">
      <div className="w-full max-w-[50rem]">
        <SectionLabel number="404">Missing sheet</SectionLabel>
        <h1 className="mb-4 max-w-[12ch] font-serif text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[1] tracking-tight text-ink">
          This one isn&rsquo;t in the drawer.
        </h1>
        <p className="max-w-[48ch] text-base leading-[1.7] text-ink-2">
          The link may be old, or the page may have moved. The work index is the best place to pick
          up the trail.
        </p>
        <div className="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <Link className={`${btnPrimary} w-full xs:w-auto`} to="/work">
            Open the work index
            <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
          <Link className={`${btnGhost} w-full xs:w-auto`} to="/">
            <ArrowLeft weight="bold" aria-hidden="true" />
            Back home
          </Link>
        </div>
      </div>
    </section>
  )
}
