import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { AmbientGlow } from './AmbientGlow'
import { ContactCta } from './ContactCta'
import { ScrollProgress } from './ScrollProgress'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

const staticRoutes: Record<string, string> = {
  '/': 'Home',
  '/work': 'Work',
  '/notes': 'Field notes',
  '/about': 'About',
  '/contact': 'Contact',
}

// Kept local to the layout so the always-loaded shell does not pull in the
// full case-study records just to announce a route change.
const caseStudyNames: Record<string, string> = {
  thesistrack: 'ThesisTrack',
  memodev: 'MemoDev',
  'shina-store': 'Shina Store',
  treevia: 'Treevia',
}

function getRouteLabel(pathname: string) {
  if (staticRoutes[pathname]) return staticRoutes[pathname]
  if (pathname.startsWith('/work/')) {
    const name = caseStudyNames[pathname.replace('/work/', '')]
    return name ? `${name} case study` : 'Page not found'
  }
  return 'Page not found'
}

export function Layout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = window.setTimeout(() => {
      setAnnouncement(`Page: ${getRouteLabel(location.pathname)}`)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <a
        className="fixed left-3 top-3 z-[1000] -translate-y-[180%] bg-ink px-4 py-3 font-mono text-[0.78rem] uppercase tracking-[0.06em] text-page no-underline transition-transform duration-150 focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <div id="top" />
      <ScrollProgress />
      <AmbientGlow />
      <SiteHeader />
      <motion.main
        id="main"
        className="relative z-10 min-h-[60vh]"
        key={location.pathname}
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Outlet />
        {location.pathname !== '/contact' ? <ContactCta /> : null}
      </motion.main>
      <SiteFooter />
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </>
  )
}
