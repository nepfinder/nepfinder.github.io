import { services, serviceHref } from '@/data/services'
import { products } from '@/data/products'
import { projects } from '@/data/projects'
import { industries } from '@/data/industries'
import { technologies } from '@/data/technologies'
import type { Lang } from '@/i18n'
import { industriesNp, productsNp, projectsNp, searchPagesNp, servicesNp } from '@/i18n/content.np'

export type SearchGroup = 'services' | 'products' | 'projects' | 'industries' | 'pages'

export interface SearchEntry {
  group: SearchGroup
  title: string
  text: string
  to: string
  keywords: string
}

const pages: SearchEntry[] = [
  { group: 'pages', title: 'Home', text: 'Nepfinder software development and ERP solutions', to: '/', keywords: 'home start' },
  { group: 'pages', title: 'About Nepfinder', text: 'Company background, approach, and expertise', to: '/about', keywords: 'company history 2014 team who we are' },
  { group: 'pages', title: 'Services', text: 'All software engineering and ERP services', to: '/services', keywords: 'what we do offerings' },
  { group: 'pages', title: 'Solutions by industry', text: 'How our solutions apply across industries', to: '/solutions', keywords: 'industry sectors' },
  { group: 'pages', title: 'Technologies', text: technologies.flatMap((g) => g.items.map((i) => i.name)).join(', '), to: '/technologies', keywords: 'stack tools' },
  { group: 'pages', title: 'Products', text: 'nInsurance, nCafe, Restaurant Billing, Enterprise ERP Support', to: '/products', keywords: 'apps software' },
  { group: 'pages', title: 'Projects', text: 'Case studies of delivered applications', to: '/projects', keywords: 'portfolio work case study' },
  { group: 'pages', title: 'Contact Nepfinder', text: 'Email info@nepfinder.com.np or send an inquiry', to: '/contact', keywords: 'email phone quote consultation inquiry hire price' },
  { group: 'pages', title: 'Our development process', text: 'Discovery, architecture, development, QA, deployment, maintenance', to: '/services#process', keywords: 'how we work steps timeline' },
  { group: 'pages', title: 'nCafe Privacy Policy', text: 'How the nCafe app collects and uses data', to: '/ncafe/privacy', keywords: 'privacy legal policy gdpr data' },
  { group: 'pages', title: 'User data deletion request', text: 'Ask us to delete your account data', to: '/user-data-delete-request', keywords: 'delete account remove data gdpr' },
]

const englishIndex: SearchEntry[] = [
  ...services.map((s) => ({ group: 'services' as const, title: s.title, text: s.short, to: serviceHref(s), keywords: [...s.capabilities, ...s.useCases, s.description, s.slug === 'ai-implementation' ? 'ai artificial intelligence mcp model context protocol llm agent copilot chatgpt claude' : ''].join(' ') })),
  ...products.map((p) => ({ group: 'products' as const, title: p.name, text: p.summary, to: `/products/${p.slug}`, keywords: [p.category, p.description, ...p.features.map((f) => f.title)].join(' ') })),
  ...projects.map((p) => ({ group: 'projects' as const, title: p.title, text: p.summary, to: `/projects/${p.slug}`, keywords: [p.category, ...p.technologies].join(' ') })),
  ...industries.map((i) => ({ group: 'industries' as const, title: i.name, text: i.text, to: `/solutions#${i.slug}`, keywords: i.solutions.join(' ') })),
  ...pages,
]

/** Nepali titles and text, keeping the English keywords so English queries still match. */
function localizeIndex(list: SearchEntry[]): SearchEntry[] {
  return list.map((e) => {
    if (e.group === 'services') {
      const slug = services.find((sv) => sv.title === e.title)?.slug
      const t2 = slug ? servicesNp[slug] : undefined
      return t2 ? { ...e, title: t2.title, text: t2.short, keywords: e.keywords + ' ' + t2.title } : e
    }
    if (e.group === 'products') {
      const slug = products.find((p) => p.name === e.title)?.slug
      const t2 = slug ? productsNp[slug] : undefined
      return t2 ? { ...e, title: t2.name ?? e.title, text: t2.summary, keywords: e.keywords + ' ' + t2.headline } : e
    }
    if (e.group === 'projects') {
      const slug = projects.find((p) => p.title === e.title)?.slug
      const t2 = slug ? projectsNp[slug] : undefined
      return t2 ? { ...e, title: t2.title, text: t2.summary, keywords: e.keywords + ' ' + t2.category } : e
    }
    if (e.group === 'industries') {
      const slug = industries.find((i) => i.name === e.title)?.slug
      const t2 = slug ? industriesNp[slug] : undefined
      return t2 ? { ...e, title: t2.name, text: t2.text } : e
    }
    if (e.group === 'pages') {
      const i = englishIndex.filter((x) => x.group === 'pages').indexOf(e)
      const t2 = searchPagesNp[i]
      return t2 ? { ...e, title: t2.title, text: t2.text || e.text } : e
    }
    return e
  })
}

const npIndex = localizeIndex(englishIndex)
const indexFor = (lang: Lang) => (lang === 'np' ? npIndex : englishIndex)

const norm = (s: string) => s.toLowerCase().normalize('NFKD')

/** Simple weighted substring search; good enough for a few dozen entries, no dependencies. */
export function search(query: string, limit = 12, lang: Lang = 'en'): SearchEntry[] {
  const q = norm(query).trim()
  if (q.length < 2) return []
  const terms = q.split(/\s+/)
  return indexFor(lang)
    .map((e) => {
      const title = norm(e.title)
      const text = norm(e.text)
      const kw = norm(e.keywords)
      let score = 0
      for (const t of terms) {
        if (title === t) score += 20
        else if (title.startsWith(t)) score += 12
        else if (title.includes(t)) score += 8
        if (text.includes(t)) score += 4
        if (kw.includes(t)) score += 2
      }
      return { e, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e)
}
