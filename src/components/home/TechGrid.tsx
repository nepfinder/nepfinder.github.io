import { technologies } from '@/data/technologies'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'

export function TechGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {technologies.map((group, gi) => (
        <Reveal key={group.category} delay={gi * 0.05} className="h-full">
          <div className="glass h-full rounded-2xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">{group.category}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {group.items.map((t) => (
                <li
                  key={t.name}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-bg-2 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-bg-2 focus-within:border-accent"
                  title={t.note}
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-2 text-text/80 transition-colors group-hover:text-text">
                    <TechIcon name={t.name} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-text">{t.name}</span>
                    {detailed && <span className="block text-[11px] leading-snug text-muted">{t.note}</span>}
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
