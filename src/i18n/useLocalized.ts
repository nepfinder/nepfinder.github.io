import { useI18n } from './index'
import type { Service } from '@/data/services'
import type { Product } from '@/data/products'
import type { Industry } from '@/data/industries'
import { processSteps } from '@/data/process'
import { aiNp, erpCapabilitiesNp, heroModulesNp, industriesNp, processNp, productsNp, restaurantBillingNp, serviceDetailNp, serviceFaqsNp, servicesNp } from './content.np'
import { serviceFaqs, type Faq } from '@/data/faqs'
import { restaurantBilling } from '@/data/restaurantBilling'
import { aiDepartments, aiFaqs, aiOfferings, aiRoadmap, mcpGuardrails } from '@/data/ai'

/** Returns a service with title/short/description swapped to Nepali when that language is active. */
export function useLocalizedService(service: Service): Service {
  const { lang } = useI18n()
  if (lang !== 'np') return service
  const tr = servicesNp[service.slug]
  return tr ? { ...service, title: tr.title, navLabel: tr.title, short: tr.short, description: tr.description } : service
}

export function useLocalizedServices(list: Service[]): Service[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((s) => {
    const tr = servicesNp[s.slug]
    return tr ? { ...s, title: tr.title, navLabel: tr.title, short: tr.short, description: tr.description } : s
  })
}

export function useLocalizedProducts(list: Product[]): Product[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((p) => {
    const tr = productsNp[p.slug]
    return tr ? { ...p, name: tr.name ?? p.name, headline: tr.headline, summary: tr.summary } : p
  })
}

export function useLocalizedIndustries(list: Industry[]): Industry[] {
  const { lang } = useI18n()
  if (lang !== 'np') return list
  return list.map((i) => {
    const tr = industriesNp[i.slug]
    return tr ? { ...i, name: tr.name, text: tr.text } : i
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
  if (lang !== 'np') return { intro: base.intro, glance: base.glance, capabilities: base.capabilities, useCases: base.useCases, steps: base.steps }
  const tr = serviceDetailNp[base.slug]
  if (!tr) return { intro: base.intro, glance: base.glance, capabilities: base.capabilities, useCases: base.useCases, steps: base.steps }
  return { intro: tr.intro, glance: tr.glance, capabilities: tr.capabilities, useCases: tr.useCases, steps: tr.steps.map((st, i) => ({ ...base.steps[i], ...st })) }
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
