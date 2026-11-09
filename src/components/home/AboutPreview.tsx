import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'
import { useT } from '@/i18n'
import type { TKey } from '@/i18n/en'

const expertise: TKey[] = ['about.e1', 'about.e2', 'about.e3', 'about.e4']

export function AboutPreview() {
  const t = useT()
  return (
    <section id="overview" className="section relative scroll-mt-14 bg-bg-2">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="h-display text-3xl leading-[1.1] sm:text-[2.5rem]">{t('about.title')}</h2>
            <p className="mt-5 text-muted leading-relaxed sm:text-lg">
              {t('about.text1')}
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              {t('about.text2')}
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {expertise.map((e, i) => (
              <Reveal key={e} as="li" delay={0.05 * i} className="flex items-start gap-3 text-sm text-text/80">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {t(e)}
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-9" delay={0.2}>
            <Button to="/about" variant="secondary" arrow>
              {t('about.more')}
            </Button>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-tile)] bg-surface sm:aspect-[5/4]">
            <Scene scene="about" className="absolute inset-0" camera={{ position: [0, 1.5, 7], fov: 40 }} fallback={<NetworkFallback />} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-xs text-muted">
              <span>{t('about.badge1')}</span>
              <span>{t('about.badge2')}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
