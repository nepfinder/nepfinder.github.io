import { services } from '@/data/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Button } from '@/components/ui/Button'

export function ServicesGrid() {
  return (
    <section id="services" className="section relative">
      <div className="container-x">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            title="Software engineering and ERP services for every stage of growth"
            text="From the first requirement workshop to long-term support, we deliver software that fits the way your organisation works."
          />
          <Reveal>
            <Button to="/services" variant="secondary">
              All services
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 5) * 0.06} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
