import { Link } from 'react-router-dom'
import { additionalProjects, caseStudies } from '../data/projects'

type RegisterRow = {
  index: string
  name: string
  description: string
  category: string
  status: string
  thumb?: string
  href: string
  external?: boolean
  year: string
}

const rows: RegisterRow[] = [
  ...caseStudies.map((project) => ({
    index: project.sheet,
    name: project.name,
    description: project.tagline,
    category: project.category,
    status: 'Case study',
    thumb: project.thumb,
    href: `/work/${project.slug}`,
    year: project.year,
  })),
  {
    index: String(caseStudies.length + 1).padStart(2, '0'),
    name: additionalProjects[0].name,
    description: additionalProjects[0].description,
    category: additionalProjects[0].category,
    status: 'Code only',
    href: additionalProjects[0].links[0].href,
    external: true,
    year: '2026',
  },
]

const linkClass =
  'hover-light-sweep group -mx-3 grid cursor-pointer grid-cols-1 items-center gap-4 rounded-lg p-3 text-ink no-underline transition-all duration-300 hover:bg-ink/[0.035] md:grid-cols-12 md:gap-4'

function RegisterContent({ row }: { row: RegisterRow }) {
  return (
    <>
      <div className="flex items-start gap-4 md:col-span-4">
        <span className="pt-0.5 font-mono text-xs text-muted transition-colors duration-200 group-hover:font-semibold group-hover:text-accent">
          {row.index}
        </span>
        <div>
          <h3 className="font-serif text-lg font-semibold leading-snug text-ink">{row.name}</h3>
          <p className="mt-1 font-sans text-xs leading-[1.6] text-ink-2">{row.description}</p>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="flex h-14 w-full max-w-[200px] items-center justify-center overflow-hidden rounded border border-rule bg-surface-2 p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_var(--glow)]">
          {row.thumb ? (
            <img
              className="h-full w-full rounded object-cover object-top"
              src={row.thumb}
              alt=""
              width="480"
              height="245"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          ) : (
            <span className="grid h-full w-full place-items-center rounded border border-dashed border-rule-strong font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-accent">
              Source only
            </span>
          )}
        </div>
      </div>

      <div className="font-mono text-xs leading-[1.7] text-ink-2 md:col-span-3">
        <span className="text-ink-2">
          {row.category.toLowerCase().includes('full-stack')
            ? row.category
            : `${row.category} · Full-stack`}
        </span>
        <br />
        <span className="text-muted">{row.year}</span>
      </div>

      <div className="text-left md:col-span-2 md:text-right">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-2 transition-colors duration-200 group-hover:text-ink">
          <span>{row.status}</span>
          <span className="text-xs transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:translate-x-1.5">
            ↗
          </span>
        </span>
      </div>
    </>
  )
}

export function ProjectRegister() {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {rows.map((row) => (
        <div key={row.name}>
          {row.external ? (
            <a className={linkClass} href={row.href} target="_blank" rel="noreferrer">
              <RegisterContent row={row} />
            </a>
          ) : (
            <Link className={linkClass} to={row.href}>
              <RegisterContent row={row} />
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
