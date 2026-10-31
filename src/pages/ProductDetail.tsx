import { useParams } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { getProduct } from '@/data/products'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Card, Pill } from '@/components/ui/Card'
import { CtaSection } from '@/components/home/CtaSection'
import NotFound from './NotFound'
import { SupportHeroVisual } from '@/components/ui/SupportHeroVisual'
import { RestaurantBillingSections } from '@/components/products/RestaurantBillingSections'
import { useLocalizedProducts } from '@/i18n/useLocalized'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  return <ProductView slug={slug} />
}

function ProductView({ slug }: { slug: string }) {
  const base = getProduct(slug)!
  const product = useLocalizedProducts([base])[0]
  const isSupport = slug === 'enterprise-support'
  const isRestaurant = slug === 'restaurant-billing'
  const isPhone = slug === 'ninsurance'
  // Split the headline into sentences so the two key promises can be emphasised.
  const headline = isSupport ? (
    <>
      {product.headline.split(/(?<=[.।])\s+/).map((part, i) => (
        <span key={i} className={i === 1 ? 'text-brand' : undefined}>
          {part}{' '}
        </span>
      ))}
    </>
  ) : (
    product.headline
  )
  useSeo({
    title: `${product.name} | ${product.category}`,
    description: product.summary,
    path: `/products/${product.slug}`,
    image: product.images[0]?.src.replace('.webp', '.png'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: product.name,
      description: product.summary,
      applicationCategory: product.category,
      author: { '@type': 'Organization', name: site.name, url: site.url },
      ...(product.images[0] ? { image: `${site.url}${product.images[0].src}` } : {}),
    },
  })

  return (
    <>
      <PageHero title={headline} text={product.summary} crumbs={[{ label: 'Products', to: '/products' }, { label: product.name }]} visual={
          isSupport ? (
            <SupportHeroVisual />
          ) : isRestaurant ? (
            <img src="/images/restaurant-billing/hero.webp" alt={base.images[0].alt} width={1600} height={1200} className="w-full rounded-[var(--radius-tile)]" />
          ) : undefined
        }>
        <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.1}>
          {product.links.map((l) => (
            <Button key={l.href} to={l.href} external={l.external} variant={l === product.links[0] ? 'primary' : 'secondary'}>
              {l.label} {l.href.startsWith('http') && <ExternalLink className="size-4" aria-hidden />}
            </Button>
          ))}
          <Button to="/contact" variant="secondary">
            Ask about {product.name}
          </Button>
        </Reveal>
      </PageHero>

      {isRestaurant ? (
        <RestaurantBillingSections />
      ) : (
        <>
      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal className="prose-dark">
            <h2 className="h-display text-2xl sm:text-3xl">About {product.name}</h2>
            <p className="mt-4 text-base sm:text-lg">{product.description}</p>
            {product.technologies && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.technologies.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            )}
          </Reveal>
          {product.images.length > 0 && !isPhone && (
            <Reveal delay={0.1}>
              <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" className="w-full rounded-[var(--radius-tile)] bg-bg-2" />
            </Reveal>
          )}
          {product.images.length > 0 && isPhone && (
            <Reveal delay={0.1}>
              <div className="glass relative overflow-hidden rounded-3xl bg-bg-2 p-6">
                                <div className="relative flex items-end justify-center gap-4">
                  {product.images.map((img, i) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={1344}
                      height={1920}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className={i === 0 ? 'w-[46%] drop-shadow-[0_24px_40px_rgba(24,38,33,0.25)]' : 'hidden w-[36%] drop-shadow-2xl opacity-90 sm:block'}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <h2 className="h-display text-2xl sm:text-3xl">What {product.name} does</h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={Math.min(i, 6) * 0.05} className="h-full">
                <Card className="h-full">
                  <h3 className="font-display text-lg font-semibold text-text">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
        </>
      )}
      <CtaSection />
    </>
  )
}
