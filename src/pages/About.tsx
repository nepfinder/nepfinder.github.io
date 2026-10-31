import { Compass, Handshake, ShieldCheck, Sparkles } from 'lucide-react'
import { useSeo, organizationJsonLd } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Card, IconBadge } from '@/components/ui/Card'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'
import { CtaSection } from '@/components/home/CtaSection'
import { services } from '@/data/services'
import { Link } from 'react-router'

const approach = [
  { icon: Compass, title: 'Understand first', text: 'We make it our job to listen, to research, and to understand the requirements unique to your organization.' },
  { icon: Sparkles, title: 'Creative, quality solutions', text: 'Our mission is always to provide creative, quality solutions that target your goals.' },
  { icon: Handshake, title: 'Close coordination', text: 'Our products, including nInsurance, were developed in close coordination with the businesses that use them.' },
  { icon: ShieldCheck, title: 'Independent and transparent', text: 'We recommend and implement platforms such as ERPNext on their merits, as an independent provider.' },
]

const seo = {
  title: 'About Nepfinder | Software Development Company in Nepal',
  description:
    'NepFinder is a software development company in Nepal established on March 30, 2014, delivering custom software, ERP implementation, and integration services.',
  path: '/about',
  jsonLd: { ...organizationJsonLd, '@type': 'Organization' },
}

export default function About() {
  useSeo(seo)
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Technology Solutions Built Around Your Business"
        text="At Nepfinder, we focus on understanding business challenges and delivering practical technology solutions. From custom software platforms and enterprise applications to ERP implementation and business process automation, our goal is to make technology work more effectively for organizations."
        crumbs={[{ label: 'About Us' }]}
      />

      <section className="section pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-surface">
              <Scene scene="about" className="absolute inset-0" camera={{ position: [0, 1.5, 7], fov: 40 }} fallback={<NetworkFallback />} />
            </div>
          </Reveal>
          <Reveal className="prose-dark">
            <h2 className="h-display text-2xl sm:text-3xl">Who we are</h2>
            <p className="mt-4">
              NepFinder is a software development company with offices in Nepal. Since March 30, 2014, NepFinder has acquired the
              reputation of a reliable provider of highly professional software programming skills to clients from all over Nepal.
            </p>
            <p className="mt-4">
              Our work spans customer-facing mobile applications, desktop software, and enterprise systems. Our insurance platform,
              nInsurance, was developed by ICT experts in very close coordination with major insurance companies of Nepal, and we have
              experience working with several major non-life insurance companies in the country.
            </p>
            <p className="mt-4">
              Today we combine that product background with ERP implementation, independent ERPNext customization, Frappe Framework
              development, and system integration services for organisations that want connected, well-engineered software.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow mb-4">Our Approach</span>
            <h2 className="h-display text-3xl sm:text-4xl">How we work with clients</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} className="h-full">
                <Card className="h-full">
                  <IconBadge>
                    <a.icon className="size-5" aria-hidden />
                  </IconBadge>
                  <h3 className="mt-4 font-display text-base font-bold text-text">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow mb-4">Expertise</span>
            <h2 className="h-display text-3xl sm:text-4xl">What we do</h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="glass card-border flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-bg-2">
                  <span className={`inline-flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand`}>
                    <s.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-text">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
