import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navLinks } from '@/data/site'
import { services } from '@/data/services'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/utils/cn'

const linkBase = 'px-3 py-2 text-[13.5px] font-medium transition-colors duration-200'
const linkIdle = 'text-text/80 hover:text-brand'
const linkActive = 'text-brand'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const openedByHover = useRef(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close dropdown on outside click / Escape.
  useEffect(() => {
    if (!servicesOpen) return
    const onDoc = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  const hoverOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    if (!servicesOpen) openedByHover.current = true
    setServicesOpen(true)
  }
  /** Mouse users: hover opens the menu, so a click goes to the Services page. Keyboard/touch: click toggles. */
  const onServicesClick = () => {
    if (servicesOpen && openedByHover.current) {
      setServicesOpen(false)
      navigate('/services')
      return
    }
    openedByHover.current = false
    setServicesOpen((v) => !v)
  }
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        'bg-white', (scrolled || open) && 'border-b border-line',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) =>
            'children' in item && item.children ? (
              <div key={item.to} ref={dropdownRef} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={onServicesClick}
                  className={cn(linkBase, 'inline-flex items-center gap-1', location.pathname.startsWith('/services') ? linkActive : linkIdle)}
                >
                  {item.label}
                  <ChevronDown className={cn('size-4 transition-transform', servicesOpen && 'rotate-180')} aria-hidden />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      id="services-menu"
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-3xl bg-surface p-3 shadow-[0_20px_60px_-20px_rgba(24,38,33,0.3)] ring-1 ring-line"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            role="menuitem"
                            to={`/services/${s.slug}`}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-bg-2 focus-visible:bg-bg-2"
                          >
                            <span className={cn('mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-stone text-brand')}>
                              <s.icon className="size-4" aria-hidden />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-text group-hover:text-brand">{s.navLabel}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-line px-3 pt-3">
                        <Link to="/services" role="menuitem" className="text-xs font-semibold text-accent hover:underline">
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden !px-4 !py-2 !text-[13.5px] md:inline-flex">
            Get a consultation
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-text lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x max-h-[calc(100dvh-64px)] overflow-y-auto py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((item) =>
                  'children' in item && item.children ? (
                    <li key={item.to}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-text hover:bg-bg-2"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                      >
                        Services
                        <ChevronDown className={cn('size-5 transition-transform', mobileServicesOpen && 'rotate-180')} aria-hidden />
                      </button>
                      {mobileServicesOpen && (
                        <ul className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                          <li>
                            <Link to="/services" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-accent hover:bg-bg-2">
                              All Services
                            </Link>
                          </li>
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link to={`/services/${s.slug}`} className="block rounded-lg px-3 py-2.5 text-sm text-text/75 hover:bg-bg-2 hover:text-text">
                                {s.navLabel}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          cn('block rounded-xl px-4 py-3 text-base font-medium hover:bg-bg-2', isActive ? 'text-text bg-bg-2' : 'text-text/75')
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-4 border-t border-line pt-4">
                <Link to="/contact" className="btn-primary w-full">
                  Get a consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
