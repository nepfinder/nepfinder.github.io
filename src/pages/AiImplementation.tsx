import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { site } from '@/data/site'
import { aiOfferings, aiFaqs } from '@/data/ai'
import { useLocalizedAi } from '@/i18n/useLocalized'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { AiHeroVisual } from '@/components/ai/AiHeroVisual'
import { McpDiagram } from '@/components/ai/McpDiagram'
import { AiRoadmap } from '@/components/ai/AiRoadmap'
import { AiRecommender } from '@/components/ai/AiRecommender'
import { CtaSection } from '@/components/home/CtaSection'
import { useI18n } from '@/i18n'

const url = `${site.url}/ai-implementation`
const seo = {
  title: 'AI Implementation for Enterprise | ERP & MCP',
  description:
    'AI implementation for enterprise: AI assistants for ERPNext and ERP, MCP server development, AI agents, and company-wide automation by Nepfinder in Nepal.',
  path: '/ai-implementation',
  image: '/images/og-ai.png',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Implementation for Enterprise',
      serviceType: 'Enterprise AI implementation',
      description:
        'AI assistants for ERP and enterprise software, Model Context Protocol (MCP) server development, AI agents, document processing, and company-wide automation.',
      areaServed: 'Nepal',
      provider: { '@type': 'Organization', name: site.name, url: site.url },
      url,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI implementation services',
        itemListElement: aiOfferings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.text } })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: aiFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export default function AiImplementation() {
  useSeo(seo)
  const { t } = useI18n()
  const { offerings, departments, guardrails, faqs } = useLocalizedAi()
  return (
    <>
      <PageHero
        title={
          <>
            {t('aipage.hero.a')} <span className="text-brand">{t('aipage.hero.b')}</span>
          </>
        }
        text={t('aipage.hero.text')}
        crumbs={[{ label: t('nav.services'), to: '/services' }, { label: t('aipage.crumb') }]}
        visual={<AiHeroVisual />}
      >
        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.1}>
          <Button to="/contact" data-track="consultation_cta">{t('ai.cta2')}</Button>
          <Button to="/ai-implementation#mcp" variant="secondary">
            {t('aipage.cta.mcp')}
          </Button>
        </Reveal>
      </PageHero>

      {/* What we implement */}
      <section className="section pt-8">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('aipage.offer.title')}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{t('aipage.offer.text')}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={Math.min(i, 5) * 0.05} className="h-full">
                <div className="card h-full">
                  <span className="icon-tile">
                    <o.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-text">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MCP */}
      <section id="mcp" className="section scroll-mt-16 pt-0">
        <div className="container-x">
          <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-16 sm:px-12 sm:py-20">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('aipage.mcp.title')}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{t('aipage.mcp.text')}</p>
            </Reveal>
            <Reveal className="mt-10 rounded-[var(--radius-tile)] bg-white/[0.06] p-4 sm:p-8" delay={0.05}>
              <div className="overflow-x-auto">
                <McpDiagram className="h-auto w-full min-w-[560px]" />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guardrails.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.05} className="h-full">
                  <div className="card h-full">
                    <span className="icon-tile">
                      <g.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-text">{g.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{g.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section bg-bg-2">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('aipage.dept.title')}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{t('aipage.dept.text')}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => (
              <Reveal key={d.name} delay={Math.min(i, 5) * 0.05} className="h-full">
                <div className="card h-full">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile">
                      <d.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-text">{d.name}</h3>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {d.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-[15px] text-text">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden /> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section bg-bg-2 pt-0">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('aipage.road.title')}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{t('aipage.road.text')}</p>
          </Reveal>
          <div className="mt-12">
            <AiRoadmap />
          </div>
        </div>
      </section>

      {/* ERP link */}
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('aipage.erp.title')}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{t('aipage.erp.text')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services/erpnext-implementation" className="text-[15px] font-semibold text-accent hover:underline">
                {t('aipage.erp.link1')}
              </Link>
              <Link to="/services/frappe-framework-development" className="text-[15px] font-semibold text-accent hover:underline">
                {t('aipage.erp.link2')}
              </Link>
              <Link to="/products/enterprise-support" className="text-[15px] font-semibold text-accent hover:underline">
                {t('aipage.erp.link3')}
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">{site.trademarkNotice}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="grid grid-cols-2 gap-3">
              {(['aipage.erp.item1', 'aipage.erp.item2', 'aipage.erp.item3', 'aipage.erp.item4'] as const).map((k) => (
                <li key={k} className="rounded-2xl bg-bg-2 p-5 text-[15px] font-semibold text-text">
                  {t(k)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Recommendation */}
      <AiRecommender />

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="h-display text-center text-3xl sm:text-4xl">{t('aipage.faq.title')}</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line rounded-[var(--radius-tile)] bg-bg-2 px-6">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-text">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
