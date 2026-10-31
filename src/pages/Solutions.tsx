import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Industries } from '@/components/home/Industries'
import { ErpnextFrappe } from '@/components/home/ErpnextFrappe'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Business Solutions & Industries',
  description: 'Nepfinder software and ERP solutions for insurance, retail, logistics, manufacturing, professional services, e-commerce, and enterprise operations.',
  path: '/solutions',
}

export default function Solutions() {
  useSeo(seo)
  return (
    <>
      <PageHero
        title="Solutions for your industry"
        text="How our software, ERPNext, and Frappe services apply across different kinds of organisations. Insurance reflects our documented product experience; the other industries show how our services apply."
        crumbs={[{ label: 'Solutions' }]}
      />
      <Industries detailed embedded />
      <ErpnextFrappe />
      <CtaSection />
    </>
  )
}
