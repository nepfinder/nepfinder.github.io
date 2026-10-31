import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { eagerPages } from './pages/eager'
import { headCollector } from './lib/seo'
import { staticRoutes } from './data/routes'

export { staticRoutes }

/** Renders a route to a complete HTML string. */
export function render(url: string) {
  headCollector.html = ''
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={eagerPages} />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headCollector.html }
}
