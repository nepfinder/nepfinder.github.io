import { useT } from '@/i18n'
import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ProjectsGrid } from '@/components/home/ProjectsGrid'
import { CtaSection } from '@/components/home/CtaSection'

const seo = {
  title: 'Projects & Case Studies',
  description: 'Applications designed, built, and shipped by Nepfinder, including the nInsurance insurance app, the nCafe mobile app, and Restaurant Billing desktop software.',
  path: '/projects',
}

export default function Projects() {
  const t = useT()
  useSeo(seo)
  return (
    <>
      <PageHero title={t('projects.hero.title')} text={t('projects.hero.text')} crumbs={[{ label: t('nav.projects') }]} />
      <section className="section pt-0">
        <div className="container-x">
          <ProjectsGrid />
        </div>
      </section>
      <CtaSection />
    </>
  )
}
