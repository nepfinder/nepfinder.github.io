import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, ChevronRight, Headset, Mail, Menu, Search, ShieldCheck, Smartphone, Sparkles, Store, X, type LucideIcon } from 'lucide-react'
import { useT } from '@/i18n'
import type { TKey } from '@/i18n/en'
import { useLocalizedProducts, useLocalizedServices } from '@/i18n/useLocalized'
import { LanguageSwitch } from './LanguageSwitch'
import { SearchOverlay } from './SearchOverlay'
import { services, serviceHref } from '@/data/services'
import { products } from '@/data/products'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

/* ------------------------------------------------------------------ */
/* Menu content                                                        */
/* ------------------------------------------------------------------ */

interface FlyoutLink {
  label: string
  to: string
  key?: TKey
  icon?: LucideIcon
  desc?: string
}

interface FlyoutColumn {
  heading: TKey
  size: 'large' | 'small'
  /** Right-hand column with simple links and chevrons, separated by a divider. */
  aside?: boolean
  /** Bordered button at the bottom of an aside column. */
  cta?: { key: TKey; to: string }
  links: FlyoutLink[]
}

/** Icons for product entries in the menu, keyed by product slug. */
const productIcons: Record<string, LucideIcon> = {
  'enterprise-support': Headset,
  ninsurance: ShieldCheck,
  'restaurant-billing': Store,
  ncafe: Smartphone,
}

interface MenuItem {
  key: string
  label: TKey
  to: string
  columns?: FlyoutColumn[]
}

function useMenu(): MenuItem[] {
  const svc = useLocalizedServices(services)
  const prod = useLocalizedProducts(products)
  return [
    { key: 'home', label: 'nav.home', to: '/' },
    { key: 'about', label: 'nav.about', to: '/about' },
    {
      key: 'services',
      label: 'nav.services',
      to: '/services',
      columns: [
        { heading: 'nav.explore.services', size: 'large', links: [{ label: '', key: 'nav.all.services', to: '/services' }, ...svc.map((s) => ({ label: s.title, to: serviceHref(s), icon: s.icon, desc: s.short }))] },
        {
          heading: 'nav.more',
          size: 'small',
          links: [
            { label: '', key: 'nav.industry', to: '/solutions' },
            { label: '', key: 'nav.technologies', to: '/technologies' },
            { label: '', key: 'nav.process', to: '/services#process' },
          ],
        },
        { heading: 'nav.getstarted', size: 'small', aside: true, cta: { key: 'nav.all.services', to: '/services' }, links: [{ label: '', key: 'nav.consultation', to: '/contact' }, { label: '', key: 'nav.projects', to: '/projects' }, { label: '', key: 'nav.process', to: '/services#process' }] },
      ],
    },
    { key: 'ai', label: 'nav.ai', to: '/ai-implementation' },
    { key: 'solutions', label: 'nav.solutions', to: '/solutions' },
    { key: 'technologies', label: 'nav.technologies', to: '/technologies' },
    {
      key: 'products',
      label: 'nav.products',
      to: '/products',
      columns: [
        { heading: 'nav.explore.products', size: 'large', links: [{ label: '', key: 'nav.all.products', to: '/products' }, ...prod.map((p) => ({ label: p.name, to: `/products/${p.slug}`, icon: productIcons[p.slug], desc: p.summary }))] },
        {
          heading: 'nav.support',
          size: 'small',
          links: [
            { label: prod.find((x) => x.slug === 'enterprise-support')?.name ?? '', to: '/products/enterprise-support' },
            { label: '', key: 'nav.quote', to: '/contact' },
            { label: '', key: 'nav.play', to: 'https://play.google.com/store/apps/details?id=com.nlg.NLGInsurance' },
          ],
        },
        {
          heading: 'nav.legal',
          size: 'small',
          links: [
            { label: '', key: 'nav.privacy', to: '/ncafe/privacy' },
            { label: '', key: 'nav.deletion', to: '/user-data-delete-request' },
          ],
        },
        { heading: 'nav.getstarted', size: 'small', aside: true, cta: { key: 'nav.all.products', to: '/products' }, links: [{ label: '', key: 'nav.quote', to: '/contact' }, { label: '', key: 'nav.consultation', to: '/contact' }, { label: '', key: 'nav.all.products', to: '/products' }] },
      ],
    },
    { key: 'projects', label: 'nav.projects', to: '/projects' },
    { key: 'contact', label: 'nav.contact', to: '/contact' },
  ]
}

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
  const t = useT()
  const menu = useMenu()
  const [searchOpen, setSearchOpen] = useState(false)
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
    setSearchOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll while a panel is open.
  useEffect(() => {
    const lock = mobileOpen || searchOpen || openKey !== null
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, openKey, searchOpen])

  // Escape closes; clicking outside the header closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenKey(null)
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const active = menu.find((m) => m.key === openKey)
  const label = (l: { label: string; key?: TKey }) => (l.key ? t(l.key) : l.label)

  return (
    <>
      {/* Blurred page behind an open flyout */}
      <AnimatePresence>
        {(openKey || mobileOpen || searchOpen) && (
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
              setSearchOpen(false)
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <header
        ref={headerRef}
        className={cn('fixed inset-x-0 top-0 z-50 text-[#f5f5f7]', openKey || mobileOpen || searchOpen ? 'bg-[#1d1d1f]' : 'bg-black')}
        onMouseLeave={scheduleClose}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          {t('nav.skip')}
        </a>

        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">

          <Link to="/" aria-label="Nepfinder home" className="inline-flex items-center rounded-md" onMouseEnter={scheduleClose}>
            <img src={site.logo.icon} alt="" width={192} height={192} className="size-9" decoding="async" />
            <span className="ml-2 hidden font-display text-[15px] font-semibold tracking-[-0.01em] text-[#f5f5f7] 2xl:inline">Nepfinder</span>
          </Link>
          <ul className="ml-8 hidden items-center lg:flex">
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
                      'whitespace-nowrap rounded-md px-3 py-2 text-[14px] font-medium tracking-[-0.01em] text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]',
                      (openKey === item.key || location.pathname.startsWith(item.to)) && 'text-[#f5f5f7]',
                      openKey === item.key && 'bg-white/10',
                    )}
                  >
                    {t(item.label)}
                    <ChevronDown className={cn('ml-1 inline size-3.5 transition-transform', openKey === item.key && 'rotate-180')} aria-hidden />
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[14px] font-medium tracking-[-0.01em] text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]',
                        isActive && 'text-[#f5f5f7]',
                      )
                    }
                  >
                    {item.key === 'ai' && <Sparkles className="size-3 animate-twinkle text-[#2997ff]" aria-hidden />}
                    {t(item.label)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1">
            <LanguageSwitch className="hidden sm:inline-flex" />
            <Link
              to="/contact"
              aria-label={t('nav.consultation')}
              title={t('nav.consultation')}
              className="inline-flex size-9 items-center justify-center rounded-full text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]"
              onMouseEnter={scheduleClose}
            >
              <Mail className="size-[17px]" strokeWidth={1.6} aria-hidden />
            </Link>
            <button
              type="button"
              aria-label={t('nav.search')}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              onClick={() => {
                setOpenKey(null)
                setSearchOpen((v) => !v)
              }}
              onMouseEnter={scheduleClose}
              className="inline-flex size-9 items-center justify-center rounded-full text-[#f5f5f7]/80 transition-colors hover:text-[#f5f5f7]"
            >
              <Search className="size-[17px]" strokeWidth={1.6} aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-[#f5f5f7]/80 hover:text-[#f5f5f7] lg:hidden"
              aria-label={mobileOpen ? t('nav.menu.close') : t('nav.menu.open')}
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
              className="hidden max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#1d1d1f] lg:block"
              onMouseEnter={cancelClose}
            >
              <div className="mx-auto grid max-w-[1024px] grid-cols-1 gap-10 px-5 pb-16 pt-10 sm:px-6 lg:[grid-template-columns:var(--flyout-cols)]" style={{ "--flyout-cols": active.columns.map((c) => (c.aside ? "0.9fr" : c.size === "large" ? "1.5fr" : "1fr")).join(" ") } as React.CSSProperties}>
                {active.columns.map((col) => (
                  <div key={col.heading} className={cn(col.aside && 'lg:border-l lg:border-white/10 lg:pl-8')}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">{t(col.heading)}</p>
                    <ul className="mt-5 space-y-4">
                      {col.links.map((l) => {
                        const Icon = l.icon
                        return (
                          <li key={l.to + (l.key ?? l.label)}>
                            <MenuLink to={l.to} className="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none">
                              {Icon && <Icon className="mt-0.5 size-[18px] shrink-0 text-[#86868b] transition-colors group-hover:text-[#2997ff]" strokeWidth={1.6} aria-hidden />}
                              <span className="min-w-0 flex-1">
                                <span className="block text-[15px] font-medium text-[#f5f5f7] transition-colors group-hover:text-[#2997ff]">{label(l)}</span>
                                {l.desc && <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-[#86868b]">{l.desc}</span>}
                              </span>
                              {col.aside && <ChevronRight className="mt-1 size-4 shrink-0 text-[#86868b] transition-colors group-hover:text-[#2997ff]" aria-hidden />}
                            </MenuLink>
                          </li>
                        )
                      })}
                    </ul>
                    {col.cta && (
                      <MenuLink
                        to={col.cta.to}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-[14px] font-medium text-[#f5f5f7] transition-colors hover:bg-white/10"
                      >
                        {t(col.cta.key)}
                      </MenuLink>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Site search */}
        <div id="site-search">
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>

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
              className="h-[calc(100dvh-64px)] overflow-y-auto bg-[#1d1d1f] lg:hidden"
            >
              <div className="mx-auto max-w-[1024px] px-6 pt-4 sm:hidden">
                <LanguageSwitch />
              </div>
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
                          {t(item.label)}
                          <ChevronDown className={cn('size-5 text-[#86868b] transition-transform', mobileGroup === item.key && 'rotate-180')} aria-hidden />
                        </button>
                        {mobileGroup === item.key && (
                          <div className="space-y-6 pb-6">
                            {item.columns.map((col) => (
                              <div key={col.heading}>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">{t(col.heading)}</p>
                                <ul className="mt-2 space-y-2">
                                  {col.links.map((l) => (
                                    <li key={l.to + (l.key ?? l.label)}>
                                      <MenuLink to={l.to} className="block border-l border-white/10 py-1 pl-4 text-[15px] font-medium text-[#f5f5f7] hover:text-[#2997ff]">
                                        {label(l)}
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
                      <NavLink to={item.to} end={item.to === '/'} className="flex items-center gap-2 py-4 font-display text-[1.75rem] font-semibold tracking-[-0.01em] text-[#f5f5f7]">
                        {item.key === 'ai' && <Sparkles className="size-5 animate-twinkle text-[#2997ff]" aria-hidden />}
                        {t(item.label)}
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
