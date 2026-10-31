/**
 * Tracking layer. Everything is inert until the owner configures IDs at build time:
 *   VITE_GTM_ID   Google Tag Manager container, e.g. GTM-XXXXXXX
 *   VITE_GA_ID    GA4 Measurement ID, e.g. G-XXXXXXXXXX (only needed if not added inside GTM)
 * Events are pushed to window.dataLayer, so GTM triggers can map them to GA4 key events.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined)?.trim() ?? ''
const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim() ?? ''

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params })
}

/** Loads GTM (and GA4 directly if no container is used). No-op when IDs are not set. Runs once. */
let started = false
export function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true
  window.dataLayer = window.dataLayer ?? []
  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
    document.head.appendChild(s)
  } else if (GA_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
    document.head.appendChild(s)
    // gtag.js only reads the `arguments` object, not a rest-parameter array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }
}

/**
 * Delegated click tracking for CTAs, email, phone and social links.
 * Uses data-track attributes so markup stays the single source of truth.
 */
export function installClickTracking() {
  if (typeof document === 'undefined') return
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('a, button')
      if (!el) return
      const href = el.getAttribute('href') ?? ''
      if (href.startsWith('mailto:')) {
        track('email_click', { link_url: href, link_text: el.textContent?.trim().slice(0, 80) })
      } else if (href.startsWith('tel:')) {
        track('phone_click', { link_url: href })
      } else if (el.dataset.track) {
        track(el.dataset.track, { link_text: el.textContent?.trim().slice(0, 80), link_url: href || undefined })
        // A consultation request from a service page is a service inquiry for that service.
        const service = serviceFromPath(window.location.pathname)
        if (el.dataset.track === 'consultation_cta' && service) {
          track('service_inquiry', { service, form_name: 'service_page_cta', lead_type: 'consultation_request' })
        }
      }
    },
    // Capture phase: runs before React Router's link handler changes the URL,
    // so page_path and the service slug still describe the page the click happened on.
    { capture: true, passive: true },
  )
}

/** Service slug for service-related pages, or '' elsewhere. */
function serviceFromPath(path: string) {
  const m = path.match(/^\/services\/([^/]+)/)
  if (m) return m[1]
  if (path.startsWith('/ai-implementation')) return 'ai-implementation'
  if (path.startsWith('/products/enterprise-support')) return 'enterprise-support'
  return ''
}
