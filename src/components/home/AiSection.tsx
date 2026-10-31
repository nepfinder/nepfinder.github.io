import { Network, ShieldCheck, Workflow } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { McpDiagram } from '@/components/ai/McpDiagram'
import { useT } from '@/i18n'

export function AiSection() {
  const t = useT()
  const points = [
    { icon: Network, text: t('ai.p1') },
    { icon: Workflow, text: t('ai.p2') },
    { icon: ShieldCheck, text: t('ai.p3') },
  ]
  return (
    <section id="ai" className="section bg-bg-2">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-accent">{t('ai.kicker')}</p>
          <h2 className="h-display mt-2 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.5rem]">{t('ai.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{t('ai.text')}</p>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-4xl rounded-[var(--radius-tile)] bg-surface p-4 sm:p-8" delay={0.05}>
          <div className="overflow-x-auto">
            <McpDiagram className="h-auto w-full min-w-[560px]" />
          </div>
        </Reveal>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {points.map((p) => (
            <li key={p.text} className="flex items-start gap-3 text-[15px] text-text">
              <span className="icon-tile !size-10 shrink-0">
                <p.icon className="size-[18px]" aria-hidden />
              </span>
              <span className="pt-2">{p.text}</span>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/ai-implementation">{t('ai.cta1')}</Button>
          <Button to="/contact" variant="secondary">
            {t('ai.cta2')}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
