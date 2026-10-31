import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  useSeo({ title: 'Page Not Found', description: 'The page you requested could not be found on nepfinder.com.np.', path: '/404' })
  return (
    <section className="relative flex min-h-[70dvh] items-center pt-[72px]">
      <div className="container-x text-center">
        <span className="eyebrow mb-4">404</span>
        <h1 className="h-display text-4xl sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you are looking for does not exist or has moved. Use the navigation or return to the home page.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
