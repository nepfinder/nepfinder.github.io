import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { site } from '@/data/site'
import { useT } from '@/i18n'

export const erpnextCapabilities = [
  'ERPNext Implementation',
  'ERPNext Customization',
  'ERPNext Data Migration',
  'Frappe App Development',
  'Custom Workflows',
  'Custom Business Modules',
  'Reports and Dashboards',
  'API Integrations',
  'User Permissions',
  'Deployment',
  'Maintenance',
  'Technical Support',
]

export function ErpnextFrappe({ className }: { className?: string }) {
  const t = useT()
  return (
    <section id="erpnext-frappe" className={cn('section', className)}>
      <div className="container-x">
        <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <h2 className="h-display text-3xl leading-[1.1] sm:text-[2.5rem]">{t('erp.title')}</h2>
              <p className="mt-5 text-muted leading-relaxed sm:text-lg">
                {t('erp.text')}
              </p>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {erpnextCapabilities.map((c, i) => (
                <Reveal as="li" key={c} delay={Math.min(i, 8) * 0.04} className="flex items-center gap-2.5 text-sm text-text/80">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/10 text-accent">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {c}
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row" delay={0.15}>
              <Button to="/services/erpnext-implementation">
                {t('erp.cta1')}
              </Button>
              <Button to="/services/frappe-framework-development" variant="secondary">
                {t('erp.cta2')}
              </Button>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-xs leading-relaxed text-muted">{site.trademarkNotice}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ArchitectureDiagram />
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  )
}
