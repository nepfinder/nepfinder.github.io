import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Industries } from '@/components/home/Industries'
import { ErpnextFrappe } from '@/components/home/ErpnextFrappe'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Business Solutions & Industries',
  description: 'Software and ERP solutions from Nepfinder for insurance, retail and distribution, logistics, manufacturing, professional services, e-commerce, and enterprise operations.',
  path: '/solutions',
}

export default function Solutions() {
  useSeo(seo)
  return (
    <>
      <PageHero title="Industries and business solutions" text="How our software, ERPNext, and Frappe services apply across different kinds of organisations." crumbs={[{ label: 'Solutions' }]} />
      <div className="-mt-20">
        <Industries detailed />
      </div>
      <ErpnextFrappe />
      <CtaSection />
    </>
  )
}
