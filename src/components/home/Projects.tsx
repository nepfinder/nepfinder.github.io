import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectsGrid } from './ProjectsGrid'
import { useT } from '@/i18n'

export function Projects() {
  const t = useT()
  return (
    <section id="projects" className="section relative bg-bg-2">
      <div className="container-x">
        <SectionHeading title={t('projects.title')} text={t('projects.text')} />
        <div className="mt-12">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  )
}
