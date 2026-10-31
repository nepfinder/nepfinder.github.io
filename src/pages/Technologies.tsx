import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { TechGrid } from '@/components/home/TechGrid'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Technologies We Work With',
  description: 'ERPNext, Frappe Framework, Python, Node.js, React, TypeScript, MariaDB, PostgreSQL, Linux, Docker, REST APIs, webhooks, and payment gateway integrations.',
  path: '/technologies',
}

export default function Technologies() {
  useSeo(seo)
  return (
    <>
      <PageHero eyebrow="Technologies" title="Technologies we work with" text="We select proven platforms and tooling for each project, with ERPNext and the Frappe Framework at the core of our enterprise work." crumbs={[{ label: 'Technologies' }]} />
      <section className="section pt-0">
        <div className="container-x">
          <TechGrid detailed />
        </div>
      </section>
      <CtaSection />
    </>
  )
}
