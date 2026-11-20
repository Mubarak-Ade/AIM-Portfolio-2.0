import { Link } from 'react-router-dom'
import { DownloadSimple, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { site } from '../data/site'
import { BackToTop } from './BackToTop'

const linkClass =
  'inline-flex min-h-8 items-center gap-1.5 text-ink-2 no-underline transition-all duration-200 hover:translate-x-1 hover:text-ink'

export function SiteFooter() {
  return (
    <footer className="relative z-10" data-purpose="site-footer">
      <div className="shell py-16 font-mono text-xs text-muted">
        <div className="grid grid-cols-1 gap-10 border-b border-rule pb-16 md:grid-cols-12">
          <nav className="md:col-span-3" aria-label="Footer index">
            <span className="mb-4 block uppercase tracking-[0.14em] text-muted">Index</span>
            <ul className="space-y-2.5">
              <li>
                <Link className={linkClass} to="/work">
                  Work
                </Link>
              </li>
              <li>
                <Link className={linkClass} to="/notes">
                  Notes
                </Link>
              </li>
              <li>
                <Link className={linkClass} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className={linkClass} to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <a className={linkClass} href={site.cv} download>
                  CV (PDF)
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="mb-4 block uppercase tracking-[0.14em] text-muted">Elsewhere</span>
            <ul className="space-y-2.5">
              <li>
                <a className={linkClass} href={site.github} target="_blank" rel="noreferrer">
                  <GithubLogo aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a className={linkClass} href={site.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinLogo aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a className={linkClass} href={`mailto:${site.email}`}>
                  <EnvelopeSimple aria-hidden="true" />
                  Email
                </a>
              </li>
              <li>
                <a className={linkClass} href={site.cv} download>
                  <DownloadSimple aria-hidden="true" />
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          <div className="font-sans text-xs leading-relaxed text-ink-2 md:col-span-6">
            <span className="mb-4 block font-mono uppercase tracking-[0.14em] text-muted">
              Colophon
            </span>
            <p className="mb-3">
              Designed and built by {site.fullName} ({site.name}). React, TypeScript and Vite. Type
              set in Fraunces, Inter and IBM Plex Mono.
            </p>
            <p className="text-muted">No tracking scripts. No newsletter pop-up.</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] text-muted sm:flex-row">
          <p>
            © 2026 {site.fullName}.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
