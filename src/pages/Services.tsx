import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ErpnextFrappe } from '@/components/home/ErpnextFrappe'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { CtaSection } from '@/components/home/CtaSection'
import { services } from '@/data/services'
import { site } from '@/data/site'

const seo = {
  title: 'Software Development & ERP Services in Nepal',
  description:
    'Custom software development, ERP implementation, ERPNext implementation, Frappe Framework development, web and mobile apps, API integration, and business process automation by Nepfinder.',
  path: '/services',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${site.url}/services/${s.slug}` })),
  },
}

export default function Services() {
  useSeo(seo)
  return (
    <>
      <PageHero eyebrow="Services" title="Software engineering and enterprise solutions" text="Every engagement starts with your business requirements. These are the services we deliver to turn them into working software." crumbs={[{ label: 'Services' }]} />
      <section className="section pt-0">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 5) * 0.06} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>
      <ErpnextFrappe />
      <ProcessTimeline />
      <CtaSection />
    </>
  )
}
