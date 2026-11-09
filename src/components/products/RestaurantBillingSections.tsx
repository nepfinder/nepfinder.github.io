import { useState } from 'react'
import { Link } from 'react-router'
import { BarChart3, CheckCircle2, ClipboardList, Download, Printer, Settings2, X } from 'lucide-react'
import { useLocalizedRestaurantBilling } from '@/i18n/useLocalized'
import { useI18n } from '@/i18n'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const groupIcons = { records: ClipboardList, print: Printer, settings: Settings2, reports: BarChart3 } as const

/** Rich sections for the Restaurant Billing product page, built from the product brochure. */
export function RestaurantBillingSections() {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const rb = useLocalizedRestaurantBilling()
  const { t } = useI18n()

  return (
    <>
      {/* Who it's for + intro */}
      <section className="section pt-0">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="h-display text-2xl sm:text-3xl">{t('rb.made.title')}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{rb.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {rb.audience.map((a) => (
                <li key={a} className="rounded-full bg-brand/10 px-3.5 py-1.5 text-sm font-medium text-brand">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex items-center justify-center rounded-[var(--radius-tile)] bg-bg-2 p-8">
              <img
                src="/images/restaurant-billing/table-order.webp"
                alt="Order panel for a single table with service charge, discount, and total bill"
                width={243}
                height={369}
                loading="lazy"
                className="w-[60%] max-w-[260px] rounded-2xl shadow-[0_24px_48px_-20px_rgba(29,29,31,0.35)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three parts of the system */}
      <section className="section bg-bg-2">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('rb.sys.title')}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{t('rb.sys.text')}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {rb.apps.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.06} className="h-full">
                <article className="card flex h-full flex-col overflow-hidden !p-0">
                  <button
                    type="button"
                    onClick={() => setZoom(a.image)}
                    className="block aspect-[4/3] overflow-hidden bg-[#e8e8ed]"
                    aria-label={`${t('rb.enlarge')} ${a.image.alt}`}
                  >
                    <img
                      src={a.image.src}
                      alt={a.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </button>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-[12px] font-semibold text-accent">{a.platform}</p>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-text">{a.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.text}</p>
                    {a.key === 'owner' && (
                      <Link to="/products/ncafe" className="mt-auto pt-4 text-sm font-semibold text-accent hover:underline">
                        About nCafe
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature groups */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('rb.need.title')}</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {rb.groups.map((g, i) => {
              const Icon = groupIcons[g.icon as keyof typeof groupIcons]
              return (
                <Reveal key={g.title} delay={i * 0.05} className="h-full">
                  <div className="card h-full">
                    <span className="icon-tile">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-text">{g.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {g.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5 text-[15px] text-text">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Online application */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-16 sm:px-12 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <h2 className="h-display text-3xl sm:text-[2.5rem]">{rb.online.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{rb.online.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {rb.online.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[15px] text-text">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="grid grid-cols-[1.4fr_1fr] gap-3">
                  {rb.online.images.map((im) => (
                    <button
                      key={im.src}
                      type="button"
                      onClick={() => setZoom(im)}
                      className="overflow-hidden rounded-2xl bg-white"
                      aria-label={`${t('rb.enlarge')} ${im.alt}`}
                    >
                      <img src={im.src} alt={im.alt} loading="lazy" className="h-full max-h-[340px] w-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot gallery */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal>
            <h2 className="h-display text-2xl sm:text-3xl">{t('rb.shots.title')}</h2>
            <p className="mt-2 text-muted">{t('rb.shots.text')}</p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rb.gallery.map((g, i) => (
              <Reveal as="li" key={g.src} delay={Math.min(i, 5) * 0.04}>
                <figure>
                  <button
                    type="button"
                    onClick={() => setZoom(g)}
                    className="block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e8e8ed]"
                    aria-label={`${t('rb.enlarge')} ${g.alt}`}
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className={cn(
                        'h-full w-full transition-transform duration-500 hover:scale-105',
                        g.src.includes('table-order') ? 'object-contain py-3' : 'object-cover object-top',
                      )}
                    />
                  </button>
                  <figcaption className="mt-2.5 text-sm text-muted">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients */}
      <section className="section bg-bg-2">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('rb.trusted.title')}</h2>
            <p className="mt-4 text-base text-muted sm:text-lg">{t('rb.trusted.text')}</p>
          </Reveal>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {rb.clients.map((c) => (
              <li key={c} className="rounded-full bg-surface px-4 py-2 text-[15px] font-medium text-text">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Download */}
      <section className="section">
        <div className="container-x">
          <div className="card flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-text">{t('rb.dl.title')}</h2>
              <p className="mt-2 text-muted">{t('rb.dl.text')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/download/restaurant/update/NepFinderResturentBIlling.exe" external>
                <Download className="size-4" aria-hidden /> {t('rb.dl.btn')}
              </Button>
              <Button to="/contact" data-track="consultation_cta" variant="secondary">
                {t('rb.demo.btn')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoom(null)}
          onKeyDown={(e) => e.key === 'Escape' && setZoom(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label={t('rb.close')}
            onClick={() => setZoom(null)}
            autoFocus
          >
            <X className="size-5" />
          </button>
          <img
            src={zoom.src}
            alt={zoom.alt}
            className="max-h-[88vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
