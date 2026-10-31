import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'
import { useT } from '@/i18n'

export default function NotFound() {
  useSeo({ title: 'Page Not Found', description: 'The page you requested could not be found on nepfinder.com.np.', path: '/404' })
  const t = useT()
  return (
    <section className="relative flex min-h-[70dvh] items-center pt-11">
      <div className="container-x text-center">
        <h1 className="h-display text-4xl sm:text-5xl">{t('common.notfound')}</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">{t('common.notfound.text')}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">{t('common.back')}</Button>
          <Button to="/contact" data-track="consultation_cta" variant="secondary">
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </section>
  )
}
