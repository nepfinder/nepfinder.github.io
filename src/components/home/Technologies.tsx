import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechGrid } from './TechGrid'

export function Technologies() {
  return (
    <section id="technologies" className="section relative bg-bg-2">
      <div className="container-x">
        <SectionHeading
          title="Technologies we work with"
          text="Proven open-source platforms, modern web stacks, and integration tooling selected to fit each project."
          align="center"
        />
        <div className="mt-12">
          <TechGrid />
        </div>
      </div>
    </section>
  )
}
