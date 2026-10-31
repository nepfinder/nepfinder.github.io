# Nepfinder — company website

NepFinder is a software development company with offices in Nepal. Since March 30, 2014, nepfinder has acquired the reputation of a reliable provider of highly professional software programming skills to a lot of clients from all over Nepal.

This repository contains the source for **https://nepfinder.com.np**, a static site built with React, Vite, TypeScript, Tailwind CSS, and Three.js (React Three Fiber), and deployed to GitHub Pages with GitHub Actions.

## Development

```bash
npm ci
npm run dev        # local dev server
npm run lint       # eslint
npm run typecheck  # tsc
npm run build      # production build + prerender -> dist/
npm run preview    # preview the production build
```

`npm run build` runs the Vite client build, a small SSR build, and `scripts/prerender.mjs`, which writes a static `index.html` for every route (so direct links and crawlers get full HTML), plus `404.html` and `sitemap.xml`.

## Project layout

- `src/data/` — all site content (services, products, projects, technologies, process, industries, routes).
- `src/components/` — layout, navigation, home sections, Three.js scenes (`three/`), UI primitives.
- `src/pages/` — route components. `pages/lazy.ts` (browser, code-split) and `pages/eager.ts` (prerender) expose the same page map.
- `public/` — static files copied as-is: `CNAME`, `robots.txt`, logos, images, and the legacy pages that must keep their URLs (`/ncafe/privacy/`, `/ncafe/policy/`, `/user-data-delete-request/`, `/download/...`, Google site verification).
- `legacy/` — the previous single-page site, kept for reference only (not deployed).

## Contact form

The contact form validates client-side and includes a honeypot field. Set the repository variable `CONTACT_ENDPOINT` (used as `VITE_CONTACT_ENDPOINT` at build time) to a form service URL such as Formspree or Web3Forms to send inquiries directly. When it is unset, the form opens the visitor's email client with the message addressed to info@nepfinder.com.np.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`, which installs dependencies, lints, type-checks, builds, verifies the output, and deploys `dist/` to GitHub Pages. The custom domain is preserved through `public/CNAME`.
