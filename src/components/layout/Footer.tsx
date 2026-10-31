import { Link } from 'react-router'
import { Instagram, Mail, Twitter } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { useT } from '@/i18n'
import type { TKey } from '@/i18n/en'
import { useLocalizedProducts, useLocalizedServices } from '@/i18n/useLocalized'

const company: { label: TKey; to: string }[] = [
  { label: 'nav.about', to: '/about' },
  { label: 'nav.services', to: '/services' },
  { label: 'nav.solutions', to: '/solutions' },
  { label: 'nav.technologies', to: '/technologies' },
  { label: 'nav.projects', to: '/projects' },
  { label: 'nav.contact', to: '/contact' },
]

export function Footer() {
  const t = useT()
  const svc = useLocalizedServices(services)
  const prod = useLocalizedProducts(products)
  return (
    <footer className="theme-dark relative mt-10 bg-evergreen">
      
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold text-text">Nepfinder</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {t('footer.tagline')}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={`mailto:${site.email}`} className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-bg-2 text-text/75 hover:text-text" aria-label="Email Nepfinder">
              <Mail className="size-4" />
            </a>
            <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-bg-2 text-text/75 hover:text-text" aria-label="Nepfinder on Twitter">
              <Twitter className="size-4" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-bg-2 text-text/75 hover:text-text" aria-label="Nepfinder on Instagram">
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">{t('footer.services')}</h3>
          <ul className="mt-4 space-y-2.5">
            {svc.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-sm text-muted hover:text-text">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">{t('footer.company')}</h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="text-sm text-muted hover:text-text">
                  {t(c.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">{t('footer.products')}</h3>
          <ul className="mt-4 space-y-2.5">
            {prod.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="text-sm text-muted hover:text-text">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm font-semibold text-text">{t('footer.legal')}</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/ncafe/privacy" className="text-sm text-muted hover:text-text">
                {t('nav.privacy')}
              </Link>
            </li>
            <li>
              <Link to="/user-data-delete-request" className="text-sm text-muted hover:text-text">
                {t('nav.deletion')}
              </Link>
            </li>
          </ul>
          <h3 className="mt-8 text-sm font-semibold text-text">{t('footer.contact')}</h3>
          <a href={`mailto:${site.email}`} className="mt-3 block text-sm text-muted hover:text-text">
            {site.email}
          </a>
          <p className="mt-1 text-sm text-muted">{t('footer.location')}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted">
          <p>
            {site.legalName} · {t('footer.location')} · {t('footer.reg')} {site.registrationNo} · {t('footer.vat')} {site.vatNo}
          </p>
          <p className="text-[11px] xl:whitespace-nowrap">{site.trademarkNotice}</p>
          <p>© {new Date().getFullYear()} {site.legalName}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
