import { useEffect } from 'react'
import { site } from '@/data/site'

export interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** During SSR, each render collects its <head> tags here; the prerender script reads them. */
export const headCollector: { html: string } = { html: '' }

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function buildHead(p: SeoProps) {
  const fullTitle = p.title.includes('Nepfinder') ? p.title : `${p.title} | Nepfinder`
  const url = `${site.url}${p.path === '/' ? '/' : p.path.replace(/\/$/, '')}`
  const image = `${site.url}${p.image ?? '/images/og-default.png'}`
  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
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
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logo.wordmark}`,
  email: site.email,
  foundingDate: site.foundedDate,
  slogan: site.tagline,
  description: site.description,
  address: { '@type': 'PostalAddress', addressCountry: 'NP' },
  sameAs: [site.social.twitter, site.social.instagram],
}

/**
 * Sets document metadata. On the server it records tags for the prerender step;
 * on the client it updates <head> after navigation.
 */
export function useSeo(p: SeoProps) {
  if (import.meta.env.SSR) {
    headCollector.html = buildHead(p).html
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
