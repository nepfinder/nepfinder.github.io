import { useEffect, useMemo } from 'react'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import { seoDetailNp, seoNp } from '@/i18n/content.np'

export interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** Adds robots noindex (for utility pages such as the contact thank-you page). */
  noindex?: boolean
}

/** During SSR, each render collects its <head> tags here; the prerender script reads them. */
export const headCollector: { html: string } = { html: '' }

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** ProfessionalService: the business type Google and AI engines use for service firms. Shares the Organization @id. */
export const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'SoftwareCompany'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  logo: `${site.url}/logos/nepfinder-logo-stacked.png`,
  image: `${site.url}/images/og-default.png`,
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.countryCode },
  areaServed: [{ '@type': 'Country', name: 'Nepal' }],
  availableLanguage: ['English', 'Nepali'],
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:00' },
  makesOffer: [
    'Custom software development',
    'ERP implementation',
    'ERPNext implementation',
    'Frappe Framework development',
    'Web and mobile application development',
    'API and system integration',
    'Business process automation',
    'AI implementation for enterprise',
    'Enterprise ERP support',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, areaServed: 'Nepal' } })),
  sameAs: [site.social.twitter, site.social.instagram],
}

/** Breadcrumb trail for inner pages. `items` are [name, path] pairs in order; the last item is the current page. */
export function breadcrumbJsonLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${site.url}${path}` })),
  }
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: ['en', 'ne'],
}

export function buildHead(p: SeoProps) {
  const fullTitle = p.title.includes('Nepfinder') ? p.title : `${p.title} | Nepfinder`
  const url = `${site.url}${p.path === '/' ? '/' : p.path.replace(/\/$/, '')}`
  const image = `${site.url}${p.image ?? '/images/og-default.png'}`
  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(p.noindex ? ['<meta name="robots" content="noindex, follow" />'] : []),
    `<meta property="og:type" content="${p.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="Nepfinder" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@nepfinder" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(p.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]
  const ld = p.jsonLd ? (Array.isArray(p.jsonLd) ? p.jsonLd : [p.jsonLd]) : []
  for (const obj of ld) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
  }
  return { fullTitle, url, image, html: tags.join('\n    ') }
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  alternateName: ['NepFinder', 'Nepfinder Innovative IT Solution'],
  legalName: site.legalName,
  vatID: site.vatNo,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    url: `${site.url}/logos/nepfinder-logo-stacked.png`,
    contentUrl: `${site.url}/logos/nepfinder-logo-stacked.png`,
  },
  image: `${site.url}/images/og-default.png`,
  email: site.email,
  foundingDate: site.foundedDate,
  slogan: site.tagline,
  description: site.description,
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.countryCode },
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', email: site.email, areaServed: 'NP', availableLanguage: ['English', 'Nepali'] }],
  areaServed: 'Nepal',
  knowsAbout: ['ERPNext', 'Frappe Framework', 'ERP implementation', 'Custom software development', 'AI implementation', 'Model Context Protocol'],
  // Only profiles the company actually controls. Add more (LinkedIn, Facebook, YouTube, Wikidata) once they exist.
  sameAs: [site.social.twitter, site.social.instagram],
}

/**
 * Sets document metadata. On the server it records tags for the prerender step;
 * on the client it updates <head> after navigation.
 */
export function useSeo(input: SeoProps) {
  const { lang } = useI18n()
  // Nepali titles and descriptions apply on the client only; the prerendered HTML stays English.
  const p = useMemo<SeoProps>(() => {
    const tr = lang === 'np' ? (seoNp[input.path] ?? seoDetailNp[input.path]) : undefined
    return tr ? { ...input, title: tr.title, description: tr.description } : input
  }, [input, lang])
  if (import.meta.env.SSR) {
    headCollector.html = buildHead(input).html
  }
  useEffect(() => {
    const { fullTitle, url, image } = buildHead(p)
    document.title = fullTitle
    const set = (sel: string, attr: string, value: string, create: () => HTMLElement) => {
      let el = document.head.querySelector<HTMLElement>(sel)
      if (!el) {
        el = create()
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }
    const meta = (key: 'name' | 'property', k: string, v: string) =>
      set(`meta[${key}="${k}"]`, 'content', v, () => {
        const m = document.createElement('meta')
        m.setAttribute(key, k)
        return m
      })
    meta('name', 'description', p.description)
    if (p.noindex) meta('name', 'robots', 'noindex, follow')
    else document.head.querySelector('meta[name="robots"]')?.remove()
    meta('property', 'og:title', fullTitle)
    meta('property', 'og:description', p.description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', image)
    meta('name', 'twitter:title', fullTitle)
    meta('name', 'twitter:description', p.description)
    meta('name', 'twitter:image', image)
    set('link[rel="canonical"]', 'href', url, () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    })
  }, [p])
}
