import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { GooglePlayIcon } from '@/components/ui/GooglePlayIcon'
import { products } from '@/data/products'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Card, Pill } from '@/components/ui/Card'
import { useT } from '@/i18n'
import { useLocalizedProducts } from '@/i18n/useLocalized'

/** `embedded` drops the section heading and top padding when the section sits directly under a page title. */
export function ProductsShowcase({ embedded = false }: { embedded?: boolean }) {
  const t = useT()
  const list = useLocalizedProducts(products)
  const ninsurance = list.find((p) => p.slug === 'ninsurance')!
  const others = list.filter((p) => p.slug !== 'ninsurance')
  return (
    <section id="products" className={embedded ? 'section relative pt-0' : 'section relative'}>
      <div className="container-x">
        {!embedded && <SectionHeading title={t('products.title')} text={t('products.text')} />}

        <Reveal className={embedded ? undefined : 'mt-12'}>
          <div className="card relative grid overflow-hidden !p-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10">
              <Pill className="border-accent/30 text-accent">{ninsurance.category}</Pill>
              <h3 className="h-display mt-5 text-2xl sm:text-3xl">{ninsurance.headline}</h3>
              <p className="mt-4 text-muted leading-relaxed">{ninsurance.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {ninsurance.features.slice(0, 6).map((f) => (
                  <li key={f.title} className="rounded-2xl bg-surface p-3.5">
                    <p className="text-sm font-semibold text-text">{f.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{f.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button to={`/products/${ninsurance.slug}`}>
                  {t('products.explore')}
                </Button>
                <Button to={ninsurance.links[0].href} variant="secondary" external>
                  <GooglePlayIcon className="size-[18px]" /> {ninsurance.links[0].label}
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-bg-2 px-8 py-10 lg:py-12">
              <img
                src={ninsurance.images[0].src}
                alt={ninsurance.images[0].alt}
                width={1344}
                height={1920}
                loading="lazy"
                decoding="async"
                className="relative h-auto max-h-[560px] w-auto max-w-[260px] drop-shadow-[0_24px_40px_rgba(24,38,33,0.25)] transition-transform duration-500 hover:scale-[1.02] sm:max-w-[280px]"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i} className="h-full">
              <Card className="h-full">
                <Link to={`/products/${p.slug}`} className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <Pill>{p.category}</Pill>
                    <ArrowUpRight className="size-5 text-muted" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-text">{p.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
                  <span className="mt-auto pt-5 text-sm font-semibold text-accent">{t('products.view')}</span>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
