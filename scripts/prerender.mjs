/**
 * Prerenders every static route into dist/<route>/index.html so that GitHub Pages serves
 * real HTML for direct navigation and crawlers, then writes sitemap.xml and 404.html.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const SITE_URL = 'https://nepfinder.com.np'

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, staticRoutes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const today = new Date().toISOString().slice(0, 10)
const sitemapEntries = []

/** Pages whose screenshots or artwork are worth indexing in Google Images. */
const pageImages = {
  '/': ['/images/og-default.png'],
  '/ai-implementation': ['/images/og-ai.png'],
  '/products/ninsurance': ['/images/ninsurance/home.webp', '/images/ninsurance/screen-2.webp', '/images/ninsurance/screen-3.webp'],
  '/products/restaurant-billing': ['/images/restaurant-billing/hero.webp', '/images/restaurant-billing/pos-tables.webp', '/images/restaurant-billing/owner-app.webp', '/images/restaurant-billing/scan-pay.webp'],
  '/products/ncafe': ['/images/restaurant-billing/ncafe-play.webp'],
  '/projects/ninsurance-insurance-app': ['/images/ninsurance/home.webp'],
  '/projects/restaurant-billing-desktop': ['/images/restaurant-billing/pos-tables.webp'],
}

const esc = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function urlEntry(route) {
  const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  const images = (pageImages[route.path] ?? []).map((src) => `\n    <image:image><image:loc>${esc(SITE_URL + src)}</image:loc></image:image>`).join('')
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${route.priority.toFixed(1)}</priority>${images}\n  </url>`
}

for (const route of staticRoutes.filter((r) => r.path !== '/ncafe/policy')) {
  const { html, head } = await render(route.path)
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  const outDir = route.path === '/' ? dist : path.join(dist, route.path)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), page)
  // GitHub Pages serves `/route` from `route.html` without redirecting; `/route/` uses the directory index.
  if (route.path !== '/') await writeFile(path.join(dist, `${route.path}.html`), page)
  if (route.sitemap !== false) sitemapEntries.push(urlEntry(route))
  console.log(`prerendered ${route.path}`)
}

// Client-rendered 404 page for unknown URLs (GitHub Pages serves 404.html with a 404 status).
{
  const { html, head } = await render('/__not_found__')
  await writeFile(path.join(dist, '404.html'), template.replace('<!--app-head-->', head).replace('<!--app-html-->', html))
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapEntries.join('\n')}\n</urlset>\n`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`done: ${staticRoutes.length} routes + 404.html + sitemap.xml`)
