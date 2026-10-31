import { Link } from 'react-router'
import { Clock, Code2, SlidersHorizontal, Wallet } from 'lucide-react'
import { getProduct } from '@/data/products'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useT } from '@/i18n'
import type { TKey } from '@/i18n/en'

const pillars: { icon: typeof Wallet; title: TKey; text: TKey }[] = [
  { icon: Wallet, title: 'support.p1.title', text: 'support.p1.text' },
  { icon: Code2, title: 'support.p2.title', text: 'support.p2.text' },
  { icon: SlidersHorizontal, title: 'support.p3.title', text: 'support.p3.text' },
  { icon: Clock, title: 'support.p4.title', text: 'support.p4.text' },
]

export function SupportPlan() {
  const plan = getProduct('enterprise-support')!
  const t = useT()
  return (
    <section id="support" className="section">
      <div className="container-x">
        <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-16 sm:px-12 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="h-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.5rem]">{t('support.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t('support.text')}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/contact">{t('support.quote')}</Button>
            <Button to={`/products/${plan.slug}`} variant="secondary">
              {t('support.included')}
            </Button>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <div className="card h-full">
                <span className="icon-tile">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-text">{t(p.title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(p.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center text-sm text-muted">
          <p>
            {t('support.covers')}{' '}
            <Link to={`/products/${plan.slug}`} className="text-accent hover:underline">
              {t('support.details')}
            </Link>
          </p>
        </Reveal>
        </div>
      </div>
    </section>
  )
}
