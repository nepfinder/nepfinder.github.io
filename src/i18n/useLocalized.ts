import { useI18n } from './index'
import type { Service } from '@/data/services'
import type { Product } from '@/data/products'
import type { Industry } from '@/data/industries'
import { processSteps } from '@/data/process'
import { industrySolutionsNp, techNotesNp, aiNp, erpCapabilitiesNp, heroModulesNp, industriesNp, productDetailNp, processNp, productsNp, projectsNp, restaurantBillingNp, serviceDetailNp, serviceFaqsNp, servicesNp } from './content.np'
import type { Project } from '@/data/projects'
import { technologies, type TechGroup } from '@/data/technologies'
import type { TKey } from './en'

const techCategoryKeys: Record<string, TKey> = {
  'Enterprise Platforms': 'tech.cat.enterprise',
  Backend: 'tech.cat.backend',
  Frontend: 'tech.cat.frontend',
  Databases: 'tech.cat.db',
  Infrastructure: 'tech.cat.infra',
  Integrations: 'tech.cat.integrations',
}

/** Technology groups with Nepali category names and notes; technology names stay in English. */
export function useLocalizedTechnologies(): TechGroup[] {
  const { lang, t } = useI18n()
  if (lang !== 'np') return technologies
  return technologies.map((g) => ({
    category: techCategoryKeys[g.category] ? t(techCategoryKeys[g.category]) : g.category,
    items: g.items.map((i) => ({ ...i, note: techNotesNp[i.name] ?? i.note })),
  }))
}
import { serviceFaqs, type Faq } from '@/data/faqs'
import { restaurantBilling } from '@/data/restaurantBilling'
import { aiDepartments, aiFaqs, aiOfferings, aiRoadmap, mcpGuardrails } from '@/data/ai'

/** Returns a service with its visible text (title, short, description, capabilities) in Nepali when that language is active. */
export function useLocalizedService(service: Service): Service {
  const { lang } = useI18n()
  return lang === 'np' ? localizeService(service) : service
}

export function useLocalizedServices(list: Service[]): Service[] {
  const { lang } = useI18n()
  return lang === 'np' ? list.map(localizeService) : list
}

function localizeService(s: Service): Service {
  const tr = servicesNp[s.slug]
  const detail = serviceDetailNp[s.slug]
  if (!tr) return s
  return {
    ...s,
    title: tr.title,
    navLabel: tr.title,
    short: tr.short,
    description: tr.description,
    capabilities: detail?.capabilities ?? s.capabilities,
  }
}

export function useLocalizedProducts(list: Product[]): Product[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((p) => {
    const tr = productsNp[p.slug]
    const dt = productDetailNp[p.slug]
    return {
      ...p,
      name: tr?.name ?? p.name,
      headline: tr?.headline ?? p.headline,
      summary: tr?.summary ?? p.summary,
      description: dt?.description ?? p.description,
      features: dt?.features ? p.features.map((f, i) => ({ ...f, ...dt.features![i] })) : p.features,
      technologies: dt?.technologies ?? p.technologies,
      links: dt?.links ? p.links.map((l, i) => ({ ...l, label: dt.links![i] ?? l.label })) : p.links,
      images: dt?.imageAlts ? p.images.map((im, i) => ({ ...im, alt: dt.imageAlts![i] ?? im.alt })) : p.images,
    }
  })
}

/** Project case studies in the active language. */
export function useLocalizedProjects(list: Project[]): Project[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((p) => localizeProject(p))
}

export function useLocalizedProject(p: Project): Project {
  const { lang } = useI18n()
  return lang === 'np' ? localizeProject(p) : p
}

function localizeProject(p: Project): Project {
  const tr = projectsNp[p.slug]
  if (!tr) return p
  return {
    ...p,
    title: tr.title,
    category: tr.category,
    summary: tr.summary,
    challenge: tr.challenge,
    solution: tr.solution,
    outcomes: tr.outcomes,
    technologies: tr.technologies,
    links: p.links.map((l, i) => ({ ...l, label: tr.links[i] ?? l.label })),
    image: p.image && tr.imageAlt ? { ...p.image, alt: tr.imageAlt } : p.image,
  }
}

export function useLocalizedIndustries(list: Industry[]): Industry[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((i) => {
    const tr = industriesNp[i.slug]
    return tr ? { ...i, name: tr.name, text: tr.text, solutions: industrySolutionsNp[i.slug] ?? i.solutions } : i
  })
}

export function useLocalizedProcess() {
  const { lang } = useI18n()
  if (lang !== 'np') return processSteps
  return processSteps.map((s, i) => ({ ...s, title: processNp[i]?.title ?? s.title, text: processNp[i]?.text ?? s.text }))
}

export function useHeroModules(en: string[]) {
  const { lang } = useI18n()
  return lang === 'np' ? heroModulesNp : en
}

/** AI page data (offerings, departments, guardrails, roadmap, FAQs) in the active language. Icons always come from the English data. */
export function useLocalizedAi() {
  const { lang } = useI18n()
  if (lang !== 'np') return { offerings: aiOfferings, departments: aiDepartments, guardrails: mcpGuardrails, roadmap: aiRoadmap, faqs: aiFaqs }
  return {
    offerings: aiOfferings.map((o, i) => ({ ...o, ...aiNp.offerings[i] })),
    departments: aiDepartments.map((d, i) => ({ ...d, ...aiNp.departments[i] })),
    guardrails: mcpGuardrails.map((g, i) => ({ ...g, ...aiNp.guardrails[i] })),
    roadmap: aiRoadmap.map((r, i) => ({ ...r, ...aiNp.roadmap[i] })),
    faqs: aiFaqs.map((f, i) => ({ ...f, ...aiNp.faqs[i] })),
  }
}

/** Intro, glance, capabilities, use cases and steps of a service detail page in the active language. */
export function useLocalizedServiceDetail(base: Service) {
  const { lang } = useI18n()
  if (lang !== 'np') return { intro: base.intro, glance: base.glance, capabilities: base.capabilities, useCases: base.useCases, steps: base.steps, growth: base.growth }
  const tr = serviceDetailNp[base.slug]
  if (!tr) return { intro: base.intro, glance: base.glance, capabilities: base.capabilities, useCases: base.useCases, steps: base.steps, growth: base.growth }
  return { intro: tr.intro, glance: tr.glance, capabilities: tr.capabilities, useCases: tr.useCases, steps: tr.steps.map((st, i) => ({ ...base.steps[i], ...st })), growth: tr.growth ?? base.growth }
}

/** Service FAQs in the active language. The English list is still used for structured data. */
export function useLocalizedFaqs(slug: string): Faq[] {
  const { lang } = useI18n()
  const en = serviceFaqs[slug] ?? []
  if (lang !== 'np') return en
  const tr = serviceFaqsNp[slug]
  return tr ? en.map((f, i) => ({ ...f, ...tr[i] })) : en
}

export function useLocalizedErpCapabilities(list: string[]): string[] {
  const { lang } = useI18n()
  return lang === 'np' ? list.map((c, i) => erpCapabilitiesNp[i] ?? c) : list
}

/** Restaurant Billing product page copy in the active language; images and icons stay as in the English data. */
export function useLocalizedRestaurantBilling() {
  const { lang } = useI18n()
  const rb = restaurantBilling
  if (lang !== 'np') return rb
  const n = restaurantBillingNp
  return {
    ...rb,
    audience: n.audience,
    intro: n.intro,
    groups: rb.groups.map((g, i) => ({ ...g, title: n.groups[i].title, items: n.groups[i].items })),
    apps: rb.apps.map((a, i) => ({ ...a, title: n.apps[i].title, platform: n.apps[i].platform, text: n.apps[i].text, image: { ...a.image, alt: n.apps[i].alt } })),
    online: {
      ...rb.online,
      title: n.online.title,
      text: n.online.text,
      items: n.online.items,
      images: rb.online.images.map((im, i) => ({ ...im, alt: n.online.alts[i] })),
    },
    gallery: rb.gallery.map((g, i) => ({ ...g, alt: n.gallery[i].alt, caption: n.gallery[i].caption })),
  }
}
