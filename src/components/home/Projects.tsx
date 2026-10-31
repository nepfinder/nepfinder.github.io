import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectsGrid } from './ProjectsGrid'

export function Projects() {
  return (
    <section id="projects" className="section relative bg-bg-2">
      <div className="container-x">
        <SectionHeading title="Selected work" text="Applications Nepfinder has designed, built, and shipped." />
        <div className="mt-12">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  )
}
