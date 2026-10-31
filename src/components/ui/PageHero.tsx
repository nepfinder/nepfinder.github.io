import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

interface Crumb {
  label: string
  to?: string
}

export function PageHero({ title, text, crumbs, children }: { title: ReactNode; text?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-11">
      <div className="pointer-events-none absolute inset-0 -z-10">
        
      </div>
      <div className="container-x pb-14 pt-14 sm:pb-20 sm:pt-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <li>
                <Link to="/" className="hover:text-text">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" aria-hidden />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-text">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-text/75" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <SectionHeading as="h1" title={title} text={text} align="left" />
        {children}
      </div>
    </section>
  )
}
