import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MagnifyingGlass } from '@phosphor-icons/react'
import { caseStudies } from '../data/projects'
import { site } from '../data/site'
import { notes } from '../data/notes'

type CommandItem = {
  id: string
  label: string
  group: string
  hint: string
  keywords: string
  to?: string
  href?: string
  external?: boolean
}

const items: CommandItem[] = [
  { id: 'home', label: 'Home', group: 'Pages', hint: 'Page', keywords: 'home index start', to: '/' },
  { id: 'work', label: 'Work index', group: 'Pages', hint: 'Page', keywords: 'work projects case studies', to: '/work' },
  { id: 'notes', label: 'Field notes', group: 'Pages', hint: 'Page', keywords: 'notes writing engineering', to: '/notes' },
  { id: 'about', label: 'About', group: 'Pages', hint: 'Page', keywords: 'about profile background', to: '/about' },
  { id: 'contact', label: 'Contact', group: 'Pages', hint: 'Page', keywords: 'contact email hire role', to: '/contact' },
  ...caseStudies.map((project) => ({
    id: `case-${project.slug}`,
    label: project.name,
    group: 'Case studies',
    hint: 'Case study',
    keywords: `${project.name} ${project.category} ${project.stack} ${project.tagline}`,
    to: `/work/${project.slug}`,
  })),
  ...notes.map((note) => ({
    id: `note-${note.slug}`,
    label: note.title,
    group: 'Field notes',
    hint: note.project,
    keywords: `${note.title} ${note.summary} ${note.project} ${note.takeaway}`,
    to: `/notes#${note.slug}`,
  })),
  {
    id: 'github',
    label: 'GitHub — Mubarak-Ade',
    group: 'Elsewhere',
    hint: 'External',
    keywords: 'github code source repositories',
    href: site.github,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn — Mubaraq Ibrahim',
    group: 'Elsewhere',
    hint: 'External',
    keywords: 'linkedin professional profile',
    href: site.linkedin,
    external: true,
  },
  {
    id: 'email',
    label: 'Email AIM',
    group: 'Elsewhere',
    hint: site.email,
    keywords: 'email mail contact gmail',
    href: `mailto:${site.email}`,
  },
  {
    id: 'cv',
    label: 'Download CV (PDF)',
    group: 'Elsewhere',
    hint: 'PDF',
    keywords: 'cv resume pdf download',
    href: site.cv,
  },
]

const groupOrder = ['Pages', 'Case studies', 'Field notes', 'Elsewhere']

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return items
    return items.filter((item) =>
      `${item.label} ${item.group} ${item.hint} ${item.keywords}`.toLowerCase().includes(needle),
    )
  }, [query])

  const grouped = useMemo(
    () =>
      groupOrder
        .map((group) => ({ group, items: filtered.filter((item) => item.group === group) }))
        .filter((group) => group.items.length > 0),
    [filtered],
  )

  const activeItem = filtered[activeIndex]

  useEffect(() => {
    if (!open) return

    setQuery('')
    setActiveIndex(0)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function select(item: CommandItem) {
    onClose()
    if (item.to) {
      navigate(item.to)
    } else if (item.href) {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else if (item.href.startsWith('mailto:')) {
        window.location.href = item.href
      } else {
        const link = document.createElement('a')
        link.href = item.href
        link.download = ''
        link.click()
      }
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (filtered.length ? (index - 1 + filtered.length) % filtered.length : 0))
      return
    }

    if (event.key === 'Home' && filtered.length) {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End' && filtered.length) {
      event.preventDefault()
      setActiveIndex(filtered.length - 1)
      return
    }

    if (event.key === 'Enter' && activeItem) {
      event.preventDefault()
      select(activeItem)
      return
    }

    if (event.key === 'Tab') {
      const focusables = [inputRef.current, panelRef.current?.querySelector<HTMLButtonElement>('[data-command-close]')]
        .filter(Boolean) as HTMLElement[]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/75 px-4 pt-20 backdrop-blur-sm sm:pt-24"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            className="flex max-h-[calc(100vh-6rem)] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-rule-strong bg-surface font-mono text-xs shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-title"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <h2 id="command-title" className="sr-only">
              Search the site
            </h2>

            <div className="flex items-center gap-3 border-b border-rule bg-ink/[0.02] px-4 py-3">
              <MagnifyingGlass className="flex-none text-[1rem] text-accent" weight="bold" aria-hidden="true" />
              <label className="sr-only" htmlFor="command-input">
                Search pages, projects, notes and links
              </label>
              <input
                ref={inputRef}
                className="min-w-0 flex-1 border-0 bg-transparent font-mono text-xs text-ink outline-none placeholder:text-muted"
                id="command-input"
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-autocomplete="list"
                aria-activedescendant={activeItem ? `command-option-${activeItem.id}` : undefined}
                autoComplete="off"
                spellCheck={false}
                placeholder="Search case studies, notes, stack…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                type="button"
                data-command-close
                className="rounded border border-rule px-1.5 py-0.5 font-mono text-[0.6rem] text-muted transition-colors hover:border-rule-strong hover:text-ink"
                onClick={onClose}
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2"
              id="command-results"
              role="listbox"
              aria-label="Search results"
            >
              {filtered.length === 0 ? (
                <div className="px-4 pb-6 pt-5">
                  <p className="font-serif text-[1.05rem] font-semibold text-ink">
                    Nothing matches “{query.trim()}”.
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] leading-[1.7] text-muted">
                    Try <span className="text-accent">work</span>,{' '}
                    <span className="text-accent">ThesisTrack</span>,{' '}
                    <span className="text-accent">notes</span> or{' '}
                    <span className="text-accent">contact</span>.
                  </p>
                </div>
              ) : (
                grouped.map((group) => (
                  <div
                    className="[&:not(:first-child)]:mt-1 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-rule [&:not(:first-child)]:pt-1"
                    role="group"
                    aria-labelledby={`command-group-${group.group.replace(/\s+/g, '-').toLowerCase()}`}
                    key={group.group}
                  >
                    <p
                      className="px-3 pb-1 pt-2 font-mono text-[0.56rem] font-medium uppercase tracking-[0.14em] text-muted"
                      id={`command-group-${group.group.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {group.group}
                    </p>
                    {group.items.map((item) => {
                      const index = filtered.indexOf(item)
                      return (
                        <button
                          ref={(element) => {
                            optionRefs.current[index] = element
                          }}
                          key={item.id}
                          id={`command-option-${item.id}`}
                          type="button"
                          role="option"
                          aria-selected={index === activeIndex}
                          tabIndex={-1}
                          className="group grid min-h-11 w-full cursor-pointer grid-cols-[1rem_minmax(0,1fr)] items-center gap-3 rounded border-0 bg-transparent px-3 py-2.5 text-left text-ink transition-colors hover:bg-ink/[0.04] aria-selected:bg-accent/10 xs:grid-cols-[1rem_minmax(0,1fr)_auto]"
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => select(item)}
                        >
                          {item.external ? (
                            <ArrowUpRight className="text-[0.9rem] text-accent" weight="bold" aria-hidden="true" />
                          ) : (
                            <ArrowRight className="text-[0.9rem] text-accent" weight="bold" aria-hidden="true" />
                          )}
                          <span className="font-serif text-[0.95rem] font-semibold leading-[1.35]">{item.label}</span>
                          <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.04em] text-muted xs:block">
                            {item.hint}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-rule bg-ink/[0.02] px-4 py-2.5 font-mono text-[0.55rem] tracking-[0.02em] text-muted">
              <span>
                <kbd className="rounded border border-rule bg-surface px-1 py-0.5 font-mono text-[0.55rem]">↑</kbd>
                <kbd className="rounded border border-rule bg-surface px-1 py-0.5 font-mono text-[0.55rem]">↓</kbd>{' '}
                navigate
              </span>
              <span>
                <kbd className="rounded border border-rule bg-surface px-1 py-0.5 font-mono text-[0.55rem]">↵</kbd>{' '}
                open
              </span>
              <span>
                <kbd className="rounded border border-rule bg-surface px-1 py-0.5 font-mono text-[0.55rem]">esc</kbd>{' '}
                close
              </span>
              <span className="w-full xs:ml-auto xs:w-auto" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
