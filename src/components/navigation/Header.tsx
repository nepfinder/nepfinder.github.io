import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Mail, Menu, X } from 'lucide-react'
import { services } from '@/data/services'
import { products } from '@/data/products'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

/* ------------------------------------------------------------------ */
/* Menu content                                                        */
/* ------------------------------------------------------------------ */

interface FlyoutColumn {
  heading: string
  size: 'large' | 'small'
  links: { label: string; to: string }[]
}

interface MenuItem {
  key: string
  label: string
  to: string
  columns?: FlyoutColumn[]
}

const menu: MenuItem[] = [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'about', label: 'About', to: '/about' },
  {
    key: 'services',
    label: 'Services',
    to: '/services',
    columns: [
      {
        heading: 'Explore Services',
        size: 'large',
        links: [{ label: 'All Services', to: '/services' }, ...services.map((s) => ({ label: s.title, to: `/services/${s.slug}` }))],
      },
      {
        heading: 'ERP & Frappe',
        size: 'small',
        links: [
          { label: 'ERPNext Implementation', to: '/services/erpnext-implementation' },
          { label: 'Frappe Framework Development', to: '/services/frappe-framework-development' },
          { label: 'ERP Solutions & Implementation', to: '/services/erp-implementation' },
          { label: 'Enterprise ERP Support', to: '/products/enterprise-support' },
        ],
      },
      {
        heading: 'More from Nepfinder',
        size: 'small',
        links: [
          { label: 'Industry Solutions', to: '/solutions' },
          { label: 'Technologies', to: '/technologies' },
          { label: 'Our Process', to: '/services#process' },
          { label: 'Get a Consultation', to: '/contact' },
        ],
      },
    ],
  },
  { key: 'solutions', label: 'Solutions', to: '/solutions' },
  { key: 'technologies', label: 'Technologies', to: '/technologies' },
  {
    key: 'products',
    label: 'Products',
    to: '/products',
    columns: [
      {
        heading: 'Explore Products',
        size: 'large',
        links: [{ label: 'All Products', to: '/products' }, ...products.map((p) => ({ label: p.name, to: `/products/${p.slug}` }))],
      },
      {
        heading: 'Support',
        size: 'small',
        links: [
          { label: 'Enterprise ERP Support', to: '/products/enterprise-support' },
          { label: 'Request a Quote', to: '/contact' },
          { label: 'nInsurance on Google Play', to: 'https://play.google.com/store/apps/details?id=com.nlg.NLGInsurance' },
        ],
      },
      {
        heading: 'Legal',
        size: 'small',
        links: [
          { label: 'nCafe Privacy Policy', to: '/ncafe/privacy' },
          { label: 'Data Deletion Request', to: '/user-data-delete-request' },
        ],
      },
    ],
  },
  { key: 'projects', label: 'Projects', to: '/projects' },
  { key: 'contact', label: 'Contact', to: '/contact' },
]

function MenuLink({ to, className, children, onClick }: { to: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function Header() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }
  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 180)
  }, [])
  const openFlyout = (key: string) => {
    cancelClose()
    setOpenKey(key)
  }

  // Close everything on navigation.
  useEffect(() => {
    setOpenKey(null)
    setMobileOpen(false)
    setMobileGroup(null)
  }, [location.pathname, location.hash])

  // Lock body scroll while a panel is open.
  useEffect(() => {
    const lock = mobileOpen || openKey !== null
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, openKey])

  // Escape closes; clicking outside the header closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenKey(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const active = menu.find((m) => m.key === openKey)

  return (
    <>
      {/* Blurred page behind an open flyout */}
      <AnimatePresence>
        {(openKey || mobileOpen) && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            onClick={() => {
              setOpenKey(null)
              setMobileOpen(false)
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <header
        ref={headerRef}
        className={cn('fixed inset-x-0 top-0 z-50 text-[#f5f5f7]', openKey || mobileOpen ? 'bg-[#1d1d1f]' : 'bg-black')}
        onMouseLeave={scheduleClose}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <nav aria-label="Primary" className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-5 sm:px-6">
          <Link to="/" aria-label="Nepfinder home" className="inline-flex items-center rounded-md" onMouseEnter={scheduleClose}>
            <img src={site.logo.icon} alt="" width={512} height={512} className="size-6" decoding="async" />
            <span className="sr-only">Nepfinder</span>
          </Link>

          <ul className="hidden items-center lg:flex">
            {menu.map((item) => (
              <li key={item.key} onMouseEnter={() => (item.columns ? openFlyout(item.key) : scheduleClose())}>
                {item.columns ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openKey === item.key}
                    aria-controls={`flyout-${item.key}`}
                    onClick={() => (openKey === item.key ? setOpenKey(null) : openFlyout(item.key))}
                    className={cn(
                      'px-3 py-2 text-[12px] font-normal tracking-[-0.01em] text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]',
                      (openKey === item.key || location.pathname.startsWith(item.to)) && 'text-[#f5f5f7]',
                    )}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn('block px-3 py-2 text-[12px] font-normal tracking-[-0.01em] text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]', isActive && 'text-[#f5f5f7]')
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <Link
              to="/contact"
              aria-label="Get a consultation"
              title="Get a consultation"
              className="inline-flex size-9 items-center justify-center rounded-full text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]"
              onMouseEnter={scheduleClose}
            >
              <Mail className="size-[17px]" strokeWidth={1.6} aria-hidden />
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-[#f5f5f7]/80 hover:text-[#f5f5f7] lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
            </button>
          </div>
        </nav>

        {/* Desktop flyout */}
        <AnimatePresence>
          {active?.columns && (
            <motion.div
              key={active.key}
              id={`flyout-${active.key}`}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="hidden overflow-hidden bg-[#1d1d1f] lg:block"
              onMouseEnter={cancelClose}
            >
              <div className="mx-auto grid max-w-[1024px] grid-cols-[1.4fr_1fr_1fr] gap-10 px-5 pb-16 pt-10 sm:px-6">
                {active.columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-[12px] text-[#86868b]">{col.heading}</p>
                    <ul className={cn('mt-4', col.size === 'large' ? 'space-y-2' : 'space-y-2.5')}>
                      {col.links.map((l) => (
                        <li key={l.to + l.label}>
                          <MenuLink
                            to={l.to}
                            className={cn(
                              'block text-[#f5f5f7] transition-colors hover:text-[#2997ff]',
                              col.size === 'large' ? 'font-display text-2xl font-semibold tracking-[-0.01em]' : 'text-[12px] font-medium',
                            )}
                          >
                            {l.label}
                          </MenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-[calc(100dvh-44px)] overflow-y-auto bg-[#1d1d1f] lg:hidden"
            >
              <ul className="mx-auto max-w-[1024px] px-6 pb-12 pt-4">
                {menu.map((item) => (
                  <li key={item.key} className="border-b border-white/10">
                    {item.columns ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-4 text-left font-display text-[1.75rem] font-semibold tracking-[-0.01em] text-[#f5f5f7]"
                          aria-expanded={mobileGroup === item.key}
                          onClick={() => setMobileGroup((g) => (g === item.key ? null : item.key))}
                        >
                          {item.label}
                          <ChevronDown className={cn('size-5 text-[#86868b] transition-transform', mobileGroup === item.key && 'rotate-180')} aria-hidden />
                        </button>
                        {mobileGroup === item.key && (
                          <div className="space-y-6 pb-6">
                            {item.columns.map((col) => (
                              <div key={col.heading}>
                                <p className="text-[12px] text-[#86868b]">{col.heading}</p>
                                <ul className="mt-2 space-y-2">
                                  {col.links.map((l) => (
                                    <li key={l.to + l.label}>
                                      <MenuLink to={l.to} className="block text-[15px] font-medium text-[#f5f5f7]">
                                        {l.label}
                                      </MenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink to={item.to} end={item.to === '/'} className="block py-4 font-display text-[1.75rem] font-semibold tracking-[-0.01em] text-[#f5f5f7]">
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
