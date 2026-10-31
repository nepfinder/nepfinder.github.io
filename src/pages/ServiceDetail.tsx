import { Link, useParams } from 'react-router'
import { CheckCircle2 } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { getService, services } from '@/data/services'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CtaSection } from '@/components/home/CtaSection'
import { ArchitectureDiagram } from '@/components/home/ArchitectureDiagram'
import { erpnextCapabilities } from '@/components/home/ErpnextFrappe'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />
  return <ServiceDetailView slug={slug} />
}

function ServiceDetailView({ slug }: { slug: string }) {
  const service = getService(slug)!
  const isErp = slug === 'erpnext-implementation' || slug === 'frappe-framework-development'
  useSeo({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      serviceType: service.title,
      areaServed: 'Nepal',
      provider: { '@type': 'Organization', name: site.name, url: site.url },
      url: `${site.url}/services/${service.slug}`,
    },
  })

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={service.navLabel} title={service.title} text={service.description} crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}>
        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.1}>
          <Button to="/contact" arrow>
            Request a Consultation
          </Button>
          <Button to="/services" variant="secondary">
            All services
          </Button>
        </Reveal>
      </PageHero>

      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="prose-dark">
            <h2 className="h-display text-2xl sm:text-3xl">Overview</h2>
            <p className="mt-4 text-base sm:text-lg">{service.intro}</p>
            {isErp && <p className="mt-4 text-sm text-muted/80">{site.trademarkNotice}</p>}
            <h2 className="h-display mt-10 text-2xl sm:text-3xl">Typical use cases</h2>
            <ul className="mt-5 space-y-3">
              {service.useCases.map((u) => (
                <li key={u} className="flex items-start gap-3 text-sm text-text/80 sm:text-base">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold text-text">Capabilities</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {service.capabilities.map((c) => (
                  <li key={c} className="rounded-xl border border-line bg-bg-2 px-3.5 py-2.5 text-sm text-text/80">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {isErp && (
        <section className="section pt-0">
          <div className="container-x grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="eyebrow mb-4">ERPNext &amp; Frappe</span>
              <h2 className="h-display text-2xl sm:text-3xl">Implementation capabilities</h2>
              <ul className="mt-6 grid grid-cols-2 gap-2.5">
                {erpnextCapabilities.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-text/80">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <ArchitectureDiagram />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow mb-4">Process</span>
            <h2 className="h-display text-2xl sm:text-3xl">How we deliver {service.title.toLowerCase()}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((st, i) => (
              <Reveal key={st.title} as="li" delay={i * 0.06} className="h-full">
                <Card className="h-full">
                  <span className="font-display text-xs font-bold tracking-widest text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-base font-bold text-text">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{st.text}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <h2 className="h-display text-2xl sm:text-3xl">Related services</h2>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/services/${r.slug}`} className="glass card-border flex items-center gap-3 rounded-xl p-4 hover:bg-bg-2">
                  <span className={`inline-flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand`}>
                    <r.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-text">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
