import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/data/services'
import { Card, IconBadge } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  const Icon = service.icon
  return (
    <Card className="h-full">
      <Link to={`/services/${service.slug}`} className="flex h-full flex-col focus-visible:outline-none">
        <div className="flex items-start justify-between">
          <IconBadge>
            <Icon className="size-5" aria-hidden />
          </IconBadge>
          <ArrowUpRight className="size-5 text-muted transition-colors group-hover:text-brand" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-text">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.short}</p>
        {!compact && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {service.capabilities.slice(0, 4).map((c) => (
              <li key={c} className={cn('rounded-md border border-line bg-bg-2 px-2 py-1 text-[11px] text-text/75')}>
                {c}
              </li>
            ))}
            {service.capabilities.length > 4 && <li className="px-1 py-1 text-[11px] text-muted">+{service.capabilities.length - 4} more</li>}
          </ul>
        )}
        <span className="mt-auto pt-5 text-sm font-semibold text-accent">Learn more</span>
      </Link>
    </Card>
  )
}
