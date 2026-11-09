import { Clock, Mail, MapPin } from 'lucide-react'
import { useSeo, organizationJsonLd } from '@/lib/seo'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/ContactForm'
import { useT } from '@/i18n'

const seo = {
  title: 'Contact Nepfinder | Discuss Your Software or ERP Project',
  description: 'Contact Nepfinder to discuss custom software development, ERPNext implementation, Frappe Framework development, or system integration for your business.',
  path: '/contact',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${site.url}/contact`,
    mainEntity: organizationJsonLd,
  },
}

export default function Contact() {
  useSeo(seo)
  const t = useT()
  return (
    <>
      <PageHero
        title={t('contact.title')}
        text={t('contact.text')}
        crumbs={[{ label: t('nav.contact') }]}
      />
      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="space-y-5">
              <div className="rounded-[var(--radius-tile)] bg-bg-2 p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-text">{t('contact.email')}</h2>
                <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-accent hover:underline">
                  {site.email}
                </a>
                <p className="mt-2 text-xs text-muted">{t('contact.email.note')}</p>
              </div>
              <div className="rounded-[var(--radius-tile)] bg-bg-2 p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-text">{t('contact.location')}</h2>
                <p className="mt-1 text-sm text-text/80">{t('footer.location')}</p>
                <p className="mt-2 text-xs text-muted">{t('contact.location.note')}</p>
              </div>
              <div className="rounded-[var(--radius-tile)] bg-bg-2 p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Clock className="size-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-text">{t('contact.next')}</h2>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted">
                  <li>{t('contact.next1')}</li>
                  <li>{t('contact.next2')}</li>
                  <li>{t('contact.next3')}</li>
                </ol>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
