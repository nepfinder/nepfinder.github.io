import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'
import { heroModules } from '@/components/three/HeroScene'
import { usePrefersReducedMotion } from '@/hooks/useMediaFlags'

export function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()

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
    <section ref={root} className="relative isolate overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-60" />
        
      </div>

      <div className="container-x grid min-h-[calc(100dvh-72px)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-10">
        <div className="relative z-10 max-w-2xl">
          <h1 data-hero-item className="h-display text-4xl leading-[1.06] sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]" style={{ opacity: reduce ? 1 : 0 }}>
            Engineering Smarter Businesses Through <span className="text-highlight">Software &amp; ERP Solutions</span>
          </h1>
          <p data-hero-item className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ opacity: reduce ? 1 : 0 }}>
            We design, develop, and implement scalable business software, ERPNext solutions, and Frappe-powered applications that
            streamline operations, connect business processes, and accelerate digital transformation.
          </p>
          <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ opacity: reduce ? 1 : 0 }}>
            <Button to="/contact" arrow>
              Discuss Your Project
            </Button>
            <Button to="/services" variant="secondary">
              Explore Our Services
            </Button>
          </div>
          <ul data-hero-item className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted" style={{ opacity: reduce ? 1 : 0 }}>
            <li>Custom Software</li>
            <li>ERPNext Implementation</li>
            <li>Frappe Framework</li>
            <li>System Integration</li>
          </ul>
        </div>

        <div className="relative h-[300px] sm:h-[380px] lg:h-[560px]">
          <Scene
            scene="hero"
            className="absolute inset-0"
            camera={{ position: [0, 5.2, 7.4], fov: 32 }}
            fallback={<NetworkFallback labels={heroModules} />}
          />
        </div>
      </div>

      <a
        href="#overview"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-text md:flex"
        aria-label="Scroll to company overview"
      >
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line">
          <span className="mt-1.5 block size-1.5 rounded-full bg-accent animate-scroll-dot" />
        </span>
        <ChevronDown className="size-3.5" aria-hidden />
      </a>
    </section>
  )
}
