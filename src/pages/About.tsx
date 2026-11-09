import { Compass, Handshake, ShieldCheck, Sparkles } from 'lucide-react'
import { useT } from '@/i18n'
import { useSeo, organizationJsonLd } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Card, IconBadge } from '@/components/ui/Card'
import { Scene } from '@/components/three/Scene'
import { NetworkFallback } from '@/components/three/StaticFallback'
import { CtaSection } from '@/components/home/CtaSection'
import { services, serviceHref } from '@/data/services'
import { Link } from 'react-router'
import type { TKey } from '@/i18n/en'

const approach = [
  { key: 'ap1', icon: Compass, titleKey: 'about.ap1.title', textKey: 'about.ap1.text' },
  { key: 'ap2', icon: Sparkles, titleKey: 'about.ap2.title', textKey: 'about.ap2.text' },
  { key: 'ap3', icon: Handshake, titleKey: 'about.ap3.title', textKey: 'about.ap3.text' },
  { key: 'ap4', icon: ShieldCheck, titleKey: 'about.ap4.title', textKey: 'about.ap4.text' },
] as const satisfies readonly { key: string; icon: typeof Compass; titleKey: TKey; textKey: TKey }[]

const seo = {
  title: 'About Nepfinder | Software Development Company in Nepal',
  description:
    'NepFinder is a software development company in Nepal established on March 30, 2014, delivering custom software, ERP implementation, and integration services.',
  path: '/about',
  jsonLd: { ...organizationJsonLd, '@type': 'Organization' },
}

export default function About() {
  const t = useT()
  useSeo(seo)
  return (
    <>
      <PageHero
        title={t('about.title')}
        text={t('about.text1')}
        crumbs={[{ label: t('about.crumb') }]}
      />

      <section className="section pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-surface">
              <Scene scene="about" className="absolute inset-0" camera={{ position: [0, 1.5, 7], fov: 40 }} fallback={<NetworkFallback />} />
            </div>
          </Reveal>
          <Reveal className="prose-dark">
            <h2 className="h-display text-2xl sm:text-3xl">{t('about.who')}</h2>
            <p className="mt-4">{t('about.who1')}</p>
            <p className="mt-4">{t('about.who2')}</p>
            <p className="mt-4">{t('about.who3')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('about.how')}</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.06} className="h-full">
                <Card className="h-full">
                  <IconBadge>
                    <a.icon className="size-5" aria-hidden />
                  </IconBadge>
                  <h3 className="mt-4 font-display text-xl font-semibold text-text">{t(a.titleKey)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(a.textKey)}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('about.what')}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={serviceHref(s)} className="card card-border flex items-center gap-3 !rounded-2xl !p-4">
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
