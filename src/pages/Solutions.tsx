import { useT } from '@/i18n'
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
  const t = useT()
  useSeo(seo)
  return (
    <>
      <PageHero
        title={t('solutions.hero.title')}
        text={t('solutions.hero.text')}
        crumbs={[{ label: t('nav.solutions') }]}
      />
      <Industries detailed embedded className="pb-16 sm:pb-20" />
      <ErpnextFrappe className="pt-0 pb-0" />
      <CtaSection className="pt-16 sm:pt-20" />
    </>
  )
}
