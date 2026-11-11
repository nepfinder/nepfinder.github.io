import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useT } from '@/i18n'
import { cn } from '@/utils/cn'

export function CtaSection({ className }: { className?: string }) {
  const t = useT()
  return (
    <section className={cn('section', className)}>
      <div className="container-x">
        <div className="theme-dark rounded-[var(--radius-tile)] bg-evergreen px-6 py-20 text-center sm:px-12 sm:py-28">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="h-display text-3xl sm:text-[2.5rem]">{t('cta.title')}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {t('cta.text')}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/contact" data-track="consultation_cta">{t('cta.primary')}</Button>
              <Button to="mailto:info@nepfinder.com.np" variant="secondary" external>
                {t('cta.secondary')}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
