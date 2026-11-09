import { useT } from '@/i18n'
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
  const t = useT()
  useSeo(seo)
  return (
    <>
      <PageHero title={t('products.hero.title')} text={t('products.hero.text')} crumbs={[{ label: t('nav.products') }]} />
      <ProductsShowcase embedded />
      <CtaSection />
    </>
  )
}
