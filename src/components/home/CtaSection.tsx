import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'

export function CtaSection() {
  return (
    <section className="section relative">
      <div className="container-x">
        <div className="theme-dark relative overflow-hidden rounded-[var(--radius-tile)] bg-evergreen px-6 py-20 text-center sm:px-12 sm:py-28">
          <Scene scene="network" className="absolute inset-0 opacity-60" camera={{ position: [0, 0, 7], fov: 50 }} fallback={<NetworkFallback className="opacity-60" />} />
          
          <Reveal className="relative mx-auto max-w-2xl">
            <h2 className="h-display text-3xl sm:text-4xl lg:text-[2.75rem]">Ready to Build a Smarter Business?</h2>
            <p className="mt-5 text-muted leading-relaxed sm:text-lg">
              Whether you need custom software, ERPNext implementation, a Frappe-powered application, or a connected business platform,
              let&apos;s discuss a solution that fits your requirements.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/contact">
                Start your project
              </Button>
              <Button to="mailto:info@nepfinder.com.np" variant="secondary" external>
                Contact Nepfinder
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
