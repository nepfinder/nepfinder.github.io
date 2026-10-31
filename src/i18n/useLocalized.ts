import { useI18n } from './index'
import type { Service } from '@/data/services'
import type { Product } from '@/data/products'
import type { Industry } from '@/data/industries'
import { processSteps } from '@/data/process'
import { heroModulesNp, industriesNp, processNp, productsNp, servicesNp } from './content.np'

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
