import { useLocalizedTechnologies } from '@/i18n/useLocalized'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'
import { cn } from '@/utils/cn'

/** Category cards flow into two columns on wide screens, so short cards fill the space left by tall ones. */
export function TechGrid({ detailed = false }: { detailed?: boolean }) {
  const technologies = useLocalizedTechnologies()
  return (
    <div className="columns-1 gap-5 lg:columns-2">
      {technologies.map((group, gi) => (
        <Reveal key={group.category} delay={gi * 0.05} className="mb-5 break-inside-avoid">
          <div className="card">
            <h3 className="text-xs font-semibold tracking-wider text-accent">{group.category}</h3>
            <ul className={cn('mt-4 grid gap-2', detailed ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3')}>
              {group.items.map((t) => (
                <li
                  key={t.name}
                  className="group flex items-start gap-3 rounded-2xl bg-surface p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-2 focus-within:border-accent"
                  title={t.note}
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-2 text-text/80 transition-colors group-hover:text-text">
                    <TechIcon name={t.name} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium leading-snug text-text">{t.name}</span>
                    {detailed && <span className="mt-0.5 block text-[12px] leading-snug text-muted">{t.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
