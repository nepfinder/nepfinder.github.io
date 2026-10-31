import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '@/data/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from '@/hooks/useMediaFlags'

export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce || !root.current) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        },
      )
      gsap.utils.toArray<HTMLElement>('[data-timeline-dot]').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.4, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', scrollTrigger: { trigger: dot, start: 'top 75%' } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="process" className="section relative">
      <div className="container-x">
        <SectionHeading eyebrow="How We Work" title="Our development process" text="A clear, collaborative path from the first conversation to long-term optimisation." />
        <div ref={root} className="relative mt-14">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line md:left-1/2" aria-hidden />
          <div data-timeline-line className="absolute left-[19px] top-2 bottom-2 w-px bg-accent md:left-1/2" aria-hidden style={{ transform: reduce ? undefined : 'scaleY(0)' }} />
          <ol className="space-y-10">
            {processSteps.map((s, i) => {
              const left = i % 2 === 0
              return (
                <li key={s.step} className="relative grid gap-4 pl-14 md:grid-cols-2 md:gap-12 md:pl-0">
                  <span
                    data-timeline-dot
                    className="absolute left-[11px] top-5 flex size-[17px] items-center justify-center rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                    aria-hidden
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <Reveal className={left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'} y={16}>
                    <div className="glass card-border inline-block w-full rounded-2xl p-6 text-left md:max-w-md">
                      <span className="font-display text-xs font-bold tracking-widest text-accent">STEP {s.step}</span>
                      <h3 className="mt-2 font-display text-lg font-bold text-text">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
