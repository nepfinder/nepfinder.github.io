import { CheckCircle2, Clock, Mail } from 'lucide-react'
import { Link } from 'react-router'
import { useSeo } from '@/lib/seo'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useT } from '@/i18n'

/**
 * Shown after a contact inquiry is accepted by the form service (ContactForm redirects here).
 * Kept out of the sitemap and marked noindex; the conversion itself is the generate_lead
 * event pushed just before the redirect, so reloading or visiting this URL directly
 * does not count as a lead.
 */
const seo = {
  title: 'Thank You | Nepfinder',
  description: 'Your inquiry has been sent to Nepfinder. We will get back to you shortly.',
  path: '/contact/thank-you',
  noindex: true,
}

export default function ContactThankYou() {
  useSeo(seo)
  const t = useT()
  return (
    <>
      <PageHero
        title={t('form.thanks')}
        text={t('form.sent.endpoint')}
        crumbs={[{ label: t('nav.contact'), to: '/contact' }, { label: t('form.thanks') }]}
      />
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="rounded-[var(--radius-tile)] bg-bg-2 p-6 sm:p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2 className="size-6" aria-hidden />
              </span>
              <h2 className="h-display mt-5 text-2xl">What happens next</h2>
              <ul className="mt-5 space-y-4 text-[15px] text-text">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <span>
                    Your inquiry has reached <a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a>. We reply by email, or by phone if you shared a number.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <span>Our office hours are 10:00 to 18:00, Sunday to Friday (Nepal time).</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/services" arrow>
                  Explore our services
                </Button>
                <Button to="/" variant="secondary">
                  Back to home
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted">
                Need to add something? <Link to="/contact" className="text-accent hover:underline">Send another message</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
