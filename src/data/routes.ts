import { services } from './services'
import { products } from './products'
import { projects } from './projects'

/** Every route that is prerendered to a static HTML entry page; listed in sitemap.xml unless `sitemap: false`. */
export const staticRoutes: { path: string; priority: number; sitemap?: false }[] = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/ai-implementation', priority: 0.9 },
  ...services.filter((s) => !s.href).map((s) => ({ path: `/services/${s.slug}`, priority: s.slug.includes('erp') || s.slug.includes('frappe') ? 0.9 : 0.8 })),
  { path: '/solutions', priority: 0.7 },
  { path: '/technologies', priority: 0.6 },
  { path: '/products', priority: 0.8 },
  ...products.map((p) => ({ path: `/products/${p.slug}`, priority: p.slug === 'enterprise-support' ? 0.9 : 0.7 })),
  { path: '/projects', priority: 0.7 },
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.6 })),
  { path: '/contact', priority: 0.8 },
  // Post-submission page: prerendered for direct loads, but noindex and not in the sitemap.
  { path: '/contact/thank-you', priority: 0, sitemap: false },
  { path: '/ncafe/privacy', priority: 0.3 },
  { path: '/user-data-delete-request', priority: 0.3 },
]
