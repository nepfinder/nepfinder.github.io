import { useSeo, organizationJsonLd } from '@/lib/seo'
import { site } from '@/data/site'
import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { ErpnextFrappe } from '@/components/home/ErpnextFrappe'
import { ProductsShowcase } from '@/components/home/ProductsShowcase'
import { SupportPlan } from '@/components/home/SupportPlan'
import { Technologies } from '@/components/home/Technologies'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { Projects } from '@/components/home/Projects'
import { Industries } from '@/components/home/Industries'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Nepfinder | Software Development & ERP Solutions in Nepal',
  description:
    'Software development company in Nepal: custom software, ERP and independent ERPNext implementation, Frappe Framework development, and system integration.',
  path: '/',
  jsonLd: [
    organizationJsonLd,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      description: site.description,
    },
  ],
}

export default function Home() {
  useSeo(seo)
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <ErpnextFrappe />
      <ProductsShowcase />
      <SupportPlan />
      <Technologies />
      <ProcessTimeline />
      <Projects />
      <Industries />
      <CtaSection />
    </>
  )
}
