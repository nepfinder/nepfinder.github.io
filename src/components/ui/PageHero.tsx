import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { useT } from '@/i18n'

interface Crumb {
  label: string
  to?: string
}

export function PageHero({ title, text, crumbs, children, visual }: { title: ReactNode; text?: ReactNode; crumbs?: Crumb[]; children?: ReactNode; visual?: ReactNode }) {
  const t = useT()
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        
      </div>
      <div className="container-x pb-12 pt-14 sm:pb-16 sm:pt-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <li>
                <Link to="/" className="hover:text-text">
                  {t('common.home')}
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
        {visual ? (
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading as="h1" title={title} text={text} align="left" className="max-w-none" />
              {children}
            </div>
            <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">{visual}</div>
          </div>
        ) : (
          <>
            <SectionHeading as="h1" title={title} text={text} align="left" />
            {children}
          </>
        )}
      </div>
    </section>
  )
}
