import { industries } from '@/data/industries'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Card, IconBadge } from '@/components/ui/Card'
import { useT } from '@/i18n'
import { useLocalizedIndustries } from '@/i18n/useLocalized'

/** `embedded` drops the section heading and top padding when the section sits directly under a page title. */
export function Industries({ detailed = false, embedded = false }: { detailed?: boolean; embedded?: boolean }) {
  const t = useT()
  const list = useLocalizedIndustries(industries)
  return (
    <section id="industries" className={embedded ? 'section relative bg-bg pt-0' : 'section relative bg-bg'}>
      <div className="container-x">
        {!embedded && (
        <SectionHeading
            title={t('industries.title')}
            text={t('industries.text')}
            align="center"
          />
        )}
        <div className={embedded ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
          {list.map((ind, i) => (
            <Reveal key={ind.slug} delay={Math.min(i, 6) * 0.05} className="h-full">
              <Card className="h-full" id={ind.slug}>
                <div className="flex items-center justify-between">
                  <IconBadge>
                    <ind.icon className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </IconBadge>
                  {ind.verified && <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent">{t('industries.badge')}</span>}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-text">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ind.text}</p>
                {detailed && (
                  <ul className="mt-4 space-y-1.5">
                    {ind.solutions.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-text/75">
                        <span className="size-1 rounded-full bg-accent" aria-hidden /> {s}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
