import { industries } from '@/data/industries'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Card, IconBadge } from '@/components/ui/Card'

export function Industries({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="industries" className="section relative bg-bg">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries & Business Solutions"
          title="Solutions that adapt to your industry"
          text="Our software and ERP solutions can support a wide range of industries. Our insurance work reflects documented product experience; the remaining industries show how our services apply."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={Math.min(i, 6) * 0.05} className="h-full">
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <IconBadge>
                    <ind.icon className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </IconBadge>
                  {ind.verified && <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">Product experience</span>}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-text">{ind.name}</h3>
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
