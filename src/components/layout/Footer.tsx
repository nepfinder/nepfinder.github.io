import { Link } from 'react-router'
import { Instagram, Mail, Twitter } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { products } from '@/data/products'

const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="theme-dark relative mt-10 bg-evergreen">
      
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold text-text">Nepfinder</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {site.positioning}. {site.tagline} Nepfinder has been delivering software to businesses across Nepal since 2014.
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
          <h3 className="text-sm font-semibold text-text">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-sm text-muted hover:text-text">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="text-sm text-muted hover:text-text">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">Products</h3>
          <ul className="mt-4 space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="text-sm text-muted hover:text-text">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm font-semibold text-text">Legal</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/ncafe/privacy" className="text-sm text-muted hover:text-text">
                nCafe Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/user-data-delete-request" className="text-sm text-muted hover:text-text">
                Data Deletion Request
              </Link>
            </li>
          </ul>
          <h3 className="mt-8 text-sm font-semibold text-text">Contact</h3>
          <a href={`mailto:${site.email}`} className="mt-3 block text-sm text-muted hover:text-text">
            {site.email}
          </a>
          <p className="mt-1 text-sm text-muted">{site.location}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted">
          <p className="text-[11px] xl:whitespace-nowrap">{site.trademarkNotice}</p>
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
