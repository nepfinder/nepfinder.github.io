import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechGrid } from './TechGrid'
import { useT } from '@/i18n'

export function Technologies() {
  const t = useT()
  return (
    <section id="technologies" className="section relative bg-bg-2">
      <div className="container-x">
        <SectionHeading
          title={t('tech.title')}
          text={t('tech.text')}
          align="center"
        />
        <div className="mt-12">
          <TechGrid />
        </div>
      </div>
    </section>
  )
}
