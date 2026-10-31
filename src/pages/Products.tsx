import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ProductsShowcase } from '@/components/home/ProductsShowcase'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Products | nInsurance, nCafe & Restaurant Billing',
  description: 'Software products developed by Nepfinder: the nInsurance insurance technology platform, the nCafe mobile app, and the Restaurant Billing desktop application.',
  path: '/products',
}

export default function Products() {
  useSeo(seo)
  return (
    <>
      <PageHero title="Products developed by Nepfinder" text="Our own software products, built from real operational needs and maintained by our team." crumbs={[{ label: 'Products' }]} />
      <ProductsShowcase embedded />
      <CtaSection />
    </>
  )
}
