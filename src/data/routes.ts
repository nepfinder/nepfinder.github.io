import { services } from './services'
import { products } from './products'
import { projects } from './projects'

/** Every route that is prerendered to a static HTML entry page and listed in sitemap.xml. */
export const staticRoutes: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: s.slug.includes('erp') || s.slug.includes('frappe') ? 0.9 : 0.8 })),
  { path: '/solutions', priority: 0.7 },
  { path: '/technologies', priority: 0.6 },
  { path: '/products', priority: 0.8 },
  ...products.map((p) => ({ path: `/products/${p.slug}`, priority: p.slug === 'enterprise-support' ? 0.9 : 0.7 })),
  { path: '/projects', priority: 0.7 },
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.6 })),
  { path: '/contact', priority: 0.8 },
]
