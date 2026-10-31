import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/Button'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'
import { heroModules } from '@/data/office'
import { usePrefersReducedMotion } from '@/hooks/useMediaFlags'
import { useT } from '@/i18n'
import { useHeroModules } from '@/i18n/useLocalized'

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const t = useT()
  const modules = useHeroModules(heroModules)

  useEffect(() => {
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-item]',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 },
      )
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section ref={root} className="relative isolate overflow-hidden pt-11">
      <div className="container-x flex flex-col items-center pt-16 text-center sm:pt-24">
        <h1 data-hero-item className="h-display max-w-4xl text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]" style={{ opacity: reduce ? 1 : 0 }}>
          {t('hero.title.a')} <span className="text-highlight">{t('hero.title.b')}</span>
        </h1>
        <p data-hero-item className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ opacity: reduce ? 1 : 0 }}>
          {t('hero.text')}
        </p>
        <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ opacity: reduce ? 1 : 0 }}>
          <Button to="/contact">{t('hero.cta.primary')}</Button>
          <Button to="/services" variant="secondary">
            {t('hero.cta.secondary')}
          </Button>
        </div>
      </div>

      <div data-hero-item className="container-x mt-10 sm:mt-14" style={{ opacity: reduce ? 1 : 0 }}>
        <div className="relative mx-auto h-[320px] max-w-5xl overflow-hidden rounded-[var(--radius-tile)] bg-bg-2 sm:h-[440px] lg:h-[560px]">
          <Scene
            scene="hero"
            className="absolute inset-0"
            camera={{ position: [0, 8.2, 11], fov: 32 }}
            fallback={<NetworkFallback labels={modules} />}
          />
          <p className="pointer-events-none absolute bottom-3 left-4 hidden rounded-full bg-white/80 px-3 py-1 text-[11px] text-muted backdrop-blur sm:block">{t('hero.hint')}</p>
        </div>
      </div>
      <div className="h-16 sm:h-24" />

    </section>
  )
}
