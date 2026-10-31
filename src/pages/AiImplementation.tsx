import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { site } from '@/data/site'
import { aiDepartments, aiFaqs, aiOfferings, mcpGuardrails } from '@/data/ai'
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
  const { lang, t } = useI18n()
  return (
    <>
      <PageHero
        title={
          <>
            AI Implementation for Enterprise. <span className="text-brand">Built on your ERP.</span>
          </>
        }
        text="Practical AI for the systems you already run. We connect AI assistants and agents to ERPNext, ERP, and enterprise software through secure MCP servers, and automate work across your company with people in control."
        crumbs={[{ label: t('nav.services'), to: '/services' }, { label: 'AI Implementation' }]}
        visual={<AiHeroVisual />}
      >
        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row" delay={0.1}>
          <Button to="/contact">Book an AI assessment</Button>
          <Button to="/ai-implementation#mcp" variant="secondary">
            How MCP works
          </Button>
        </Reveal>
        {lang === 'np' && <p className="mt-4 text-sm text-muted">{t('detail.notice')}</p>}
      </PageHero>

      {/* What we implement */}
      <section className="section pt-8">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-4xl">What we implement</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">Six ways AI can start saving time in your enterprise software, from answering questions to running whole workflows.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiOfferings.map((o, i) => (
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
      <section id="mcp" className="section scroll-mt-14 pt-0">
        <div className="container-x">
          <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-16 sm:px-12 sm:py-20">
            <Reveal className="max-w-3xl">
              <h2 className="h-display text-3xl sm:text-4xl">MCP implementation: connect AI to your systems, safely</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                The Model Context Protocol (MCP) is an open standard for connecting AI assistants to business systems. Instead of giving AI open access
                to your database, an MCP server offers a set of specific tools, such as finding an invoice or drafting a purchase order, and checks
                permissions on every call.
              </p>
            </Reveal>
            <Reveal className="mt-10 rounded-[var(--radius-tile)] bg-white/[0.06] p-4 sm:p-8" delay={0.05}>
              <div className="overflow-x-auto">
                <McpDiagram className="h-auto w-full min-w-[560px]" />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mcpGuardrails.map((g, i) => (
                <Reveal key={g.title} delay={i * 0.05} className="h-full">
                  <div className="card h-full">
                    <span className="icon-tile">
                      <g.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-text">{g.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{g.text}</p>
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
            <h2 className="h-display text-3xl sm:text-4xl">Overall company automation</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">Examples of what AI can take off each department’s plate once it is connected to your ERP and documents.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiDepartments.map((d, i) => (
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
            <h2 className="h-display text-3xl sm:text-4xl">From first pilot to company-wide AI</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">We roll AI out in stages, so each step proves its value before the next one starts.</p>
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
            <h2 className="h-display text-3xl sm:text-4xl">AI for ERPNext and Frappe</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              ERPNext and the Frappe Framework expose REST APIs and role-based permissions, which makes them a strong base for AI. We build MCP servers
              and Frappe apps that let assistants work with your DocTypes, reports, and workflows, while respecting the permissions your users already have.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services/erpnext-implementation" className="text-[15px] font-semibold text-accent hover:underline">
                ERPNext implementation
              </Link>
              <Link to="/services/frappe-framework-development" className="text-[15px] font-semibold text-accent hover:underline">
                Frappe development
              </Link>
              <Link to="/products/enterprise-support" className="text-[15px] font-semibold text-accent hover:underline">
                Enterprise ERP Support
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">{site.trademarkNotice}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="grid grid-cols-2 gap-3">
              {['Ask ERPNext in plain language', 'Draft documents for approval', 'Summaries of reports', 'Alerts on exceptions'].map((x) => (
                <li key={x} className="rounded-2xl bg-bg-2 p-5 text-[15px] font-semibold text-text">
                  {x}
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
            <h2 className="h-display text-center text-3xl sm:text-4xl">Questions about enterprise AI</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line rounded-[var(--radius-tile)] bg-bg-2 px-6">
            {aiFaqs.map((f) => (
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
