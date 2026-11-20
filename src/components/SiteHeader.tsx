import { useEffect, useRef, useState, type ComponentType } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  DownloadSimple,
  EnvelopeSimple,
  List,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react'
import { site } from '../data/site'
import { ThemeToggle } from './ThemeToggle'

const loadPalette = () => import('./CommandPalette')

type PaletteProps = { open: boolean; onClose: () => void }

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/notes', label: 'Notes' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  // The palette searches every case study and note, so it is loaded on demand
  // instead of in the shell every route pays for. Holding the resolved
  // component (rather than a lazy component in Suspense) avoids a ~350 ms
  // first-open delay while still keeping the data out of the entry chunk.
  const [Palette, setPalette] = useState<ComponentType<PaletteProps> | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  function ensurePalette() {
    void loadPalette()
      .then((module) => {
        setPalette((current) => current ?? module.CommandPalette)
      })
      .catch(() => {
        // The chunk is same-origin and sits behind the trigger; if it cannot
        // load, close rather than leaving an expanded trigger with no dialog.
        setPaletteOpen(false)
      })
  }

  useEffect(() => {
    setIsOpen(false)
    setPaletteOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        ensurePalette()
        setIsOpen(false)
        setPaletteOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [])

  function closePalette() {
    setPaletteOpen(false)
    window.setTimeout(() => searchRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 80)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [isOpen])

  const navLinkClass =
    'nav-underline py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted no-underline transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-page/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link className="group flex min-w-0 items-center gap-3 text-ink no-underline" to="/" aria-label="AIM — home">
          <span className="font-serif text-lg font-bold leading-none tracking-[0.16em] transition-colors duration-200 group-hover:text-accent">
            AIM
          </span>
          <span className="hidden border-l border-rule pl-2.5 font-mono text-[0.6rem] font-normal uppercase leading-[1.5] tracking-[0.18em] text-muted sm:block">
            Full-stack developer
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            ref={searchRef}
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded border border-rule bg-transparent px-2 font-mono text-[0.64rem] uppercase leading-none tracking-[0.06em] text-muted transition-all duration-200 hover:border-accent/50 hover:bg-accent/5 hover:text-ink sm:px-2.5 [&_svg]:text-[0.9rem] [&_svg]:text-accent"
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            aria-keyshortcuts="Control+K Meta+K"
            title="Search the site (Ctrl or ⌘ K)"
            onPointerEnter={ensurePalette}
            onFocus={ensurePalette}
            onClick={() => {
              ensurePalette()
              setIsOpen(false)
              setPaletteOpen(true)
            }}
          >
            <MagnifyingGlass weight="bold" aria-hidden="true" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded border border-rule bg-surface px-1 py-0.5 font-mono text-[0.52rem] font-normal normal-case tracking-normal text-muted md:inline">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <a
            className="group hidden items-center gap-1.5 rounded border border-rule px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-ink-2 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-rule-strong hover:bg-ink/[0.04] hover:text-ink sm:inline-flex"
            href={`mailto:${site.email}`}
          >
            <span>Email</span>
            <span className="text-[0.6rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-rule text-muted transition-all duration-200 hover:border-rule-strong hover:bg-ink/[0.04] hover:text-ink md:hidden [&_svg]:text-[1.15rem]"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X weight="bold" aria-hidden="true" /> : <List weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            id="mobile-menu"
            className="border-t border-rule bg-page/95 backdrop-blur-md md:hidden"
            aria-label="Mobile primary"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell py-4 pb-6">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="flex min-h-[3.1rem] items-center gap-3 border-b border-rule font-serif text-[1.3rem] font-medium text-ink no-underline [&>svg]:ml-auto [&>svg]:text-[1rem] [&>svg]:text-accent"
                >
                  <span className="font-mono text-[0.62rem] font-medium tracking-[0.08em] text-muted">
                    0{index + 1}
                  </span>
                  {item.label}
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <a
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink-2 no-underline hover:text-accent"
                  href={`mailto:${site.email}`}
                >
                  <EnvelopeSimple aria-hidden="true" />
                  {site.email}
                </a>
                <a
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-ink-2 no-underline hover:text-accent"
                  href={site.cv}
                  download
                >
                  <DownloadSimple aria-hidden="true" />
                  Download CV (PDF)
                </a>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      {Palette ? <Palette open={paletteOpen} onClose={closePalette} /> : null}
    </header>
  )
}
