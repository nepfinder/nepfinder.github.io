import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'

const expertise = [
  'Custom software platforms and enterprise applications',
  'ERP implementation, ERPNext customization, and Frappe development',
  'Web, mobile, and desktop applications',
  'Business process automation and system integration',
]

export function AboutPreview() {
  return (
    <section id="overview" className="section relative scroll-mt-20 bg-bg-2">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="eyebrow mb-4">About Nepfinder</span>
            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">Technology Solutions Built Around Your Business</h2>
            <p className="mt-5 text-muted leading-relaxed sm:text-lg">
              At Nepfinder, we focus on understanding business challenges and delivering practical technology solutions. From custom
              software platforms and enterprise applications to ERP implementation and business process automation, our goal is to make
              technology work more effectively for organizations.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              NepFinder is a software development company based in Nepal. Since March 30, 2014, we have earned a reputation as a
              reliable provider of professional software development to clients across the country, including insurance technology
              built in close coordination with major insurance companies of Nepal.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {expertise.map((e, i) => (
              <Reveal key={e} as="li" delay={0.05 * i} className="flex items-start gap-3 text-sm text-text/80">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {e}
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-9" delay={0.2}>
            <Button to="/about" variant="secondary" arrow>
              More about Nepfinder
            </Button>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface sm:aspect-[5/4]">
            <Scene scene="about" className="absolute inset-0" camera={{ position: [0, 1.5, 7], fov: 40 }} fallback={<NetworkFallback />} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-xs text-muted">
              <span>Established 2014 · Nepal</span>
              <span>Software · ERP · Integration</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
