import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { LanguageProvider } from './i18n'
import { initAnalytics, installClickTracking } from './lib/analytics'
import { lazyPages } from './pages/lazy'
import './styles/globals.css'

initAnalytics()
installClickTracking()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App pages={lazyPages} />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
