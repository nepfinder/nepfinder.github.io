import { services } from '@/data/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Button } from '@/components/ui/Button'
import { useT } from '@/i18n'
import { useLocalizedServices } from '@/i18n/useLocalized'

export function ServicesGrid() {
  const t = useT()
  const list = useLocalizedServices(services)
  return (
    <section id="services" className="section relative">
      <div className="container-x">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            title={t('services.title')}
            text={t('services.text')}
          />
          <Reveal>
            <Button to="/services" variant="secondary">
              {t('services.all')}
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 5) * 0.06} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
