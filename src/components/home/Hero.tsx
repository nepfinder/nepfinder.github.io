import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/hooks/useMediaFlags'
import { useT } from '@/i18n'

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const t = useT()

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
    <section ref={root} className="theme-dark relative isolate overflow-hidden bg-evergreen pt-11">
      <div className="container-x flex flex-col items-center pt-16 text-center sm:pt-24">
        <h1 data-hero-item className="h-display max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-[2.75rem]" style={{ opacity: reduce ? 1 : 0 }}>
          {t('hero.title.a')} <span className="text-highlight">{t('hero.title.b')}</span>
        </h1>
        <p data-hero-item className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ opacity: reduce ? 1 : 0 }}>
          {t('hero.text')}
        </p>
        <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ opacity: reduce ? 1 : 0 }}>
          <Button to="/contact" data-track="consultation_cta">{t('hero.cta.primary')}</Button>
          <Button to="/services" variant="secondary">
            {t('hero.cta.secondary')}
          </Button>
        </div>
      </div>

      <div data-hero-item className="container-x mt-10 sm:mt-14" style={{ opacity: reduce ? 1 : 0 }}>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-tile)] bg-bg-2">
          <img
            src="/images/hero/ai-office.webp"
            alt="Isometric view of an AI-enabled office: Accounting, Finance, Sales, Inventory, Procurement, Operations, CRM and HR workstations connected to a central ERP server"
            width={1600}
            height={877}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      </div>
      <div className="h-16 sm:h-24" />

    </section>
  )
}
