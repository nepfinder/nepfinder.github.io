import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { site } from '@/data/site'

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

export function ErpnextFrappe() {
  return (
    <section id="erpnext-frappe" className="theme-dark section relative overflow-hidden bg-evergreen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-white/10" />
        <div className="absolute inset-0 grid-fade opacity-40" />
      </div>
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <span className="eyebrow mb-4">ERPNext &amp; Frappe Expertise</span>
              <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">Transform Your Business with ERPNext &amp; Frappe</h2>
              <p className="mt-5 text-muted leading-relaxed sm:text-lg">
                Build connected and efficient business systems with ERPNext and the Frappe Framework. We provide independent implementation,
                customization, application development, integration, and technical support services.
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
              <Button to="/services/erpnext-implementation" arrow>
                ERPNext Implementation
              </Button>
              <Button to="/services/frappe-framework-development" variant="secondary">
                Frappe Development
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
    </section>
  )
}
