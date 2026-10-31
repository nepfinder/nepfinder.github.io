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
  useSeo(seo)
  return (
    <>
      <PageHero eyebrow="Projects" title="Projects and case studies" text="Software Nepfinder has delivered. Each project lists the challenge, the solution we built, and the technologies involved." crumbs={[{ label: 'Projects' }]} />
      <section className="section pt-0">
        <div className="container-x">
          <ProjectsGrid />
        </div>
      </section>
      <CtaSection />
    </>
  )
}
