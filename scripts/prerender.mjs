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

for (const route of staticRoutes) {
  const { html, head } = await render(route.path)
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  const outDir = route.path === '/' ? dist : path.join(dist, route.path)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), page)
  sitemapEntries.push(
    `  <url>\n    <loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${route.priority.toFixed(1)}</priority>\n  </url>`,
  )
  console.log(`prerendered ${route.path}`)
}

// Client-rendered 404 page for unknown URLs (GitHub Pages serves 404.html with a 404 status).
{
  const { html, head } = await render('/__not_found__')
  await writeFile(path.join(dist, '404.html'), template.replace('<!--app-head-->', head).replace('<!--app-html-->', html))
}

// Legacy static pages (nCafe policy, data deletion, Google verification) are copied from public/ as-is.
const legacy = ['/ncafe/privacy/', '/ncafe/policy/', '/user-data-delete-request/']
for (const l of legacy) {
  sitemapEntries.push(`  <url>\n    <loc>${SITE_URL}${l}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.3</priority>\n  </url>`)
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`done: ${staticRoutes.length} routes + 404.html + sitemap.xml`)
