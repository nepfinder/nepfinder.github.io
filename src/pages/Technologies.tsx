import { useT } from '@/i18n'
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
  const t = useT()
  useSeo(seo)
  return (
    <>
      <PageHero title={t('tech.title')} text={t('tech.hero.text')} crumbs={[{ label: t('nav.technologies') }]} />
      <section className="section pt-0">
        <div className="container-x">
          <TechGrid detailed />
        </div>
      </section>
      <CtaSection />
    </>
  )
}
