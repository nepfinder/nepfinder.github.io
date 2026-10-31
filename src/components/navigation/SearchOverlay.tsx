import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Search, X } from 'lucide-react'
import { search, type SearchGroup } from '@/lib/searchIndex'
import { useT } from '@/i18n'
import { cn } from '@/utils/cn'

const groupOrder: SearchGroup[] = ['services', 'products', 'projects', 'industries', 'pages']

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const results = useMemo(() => search(q), [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setCursor(0)
      window.setTimeout(() => input.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setCursor(0), [q])

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault()
      go(results[cursor].to)
    }
  }

  const grouped = groupOrder.map((g) => ({ g, items: results.filter((r) => r.group === g) })).filter((x) => x.items.length)
  const labels: Record<SearchGroup, string> = {
    services: t('search.services'),
    products: t('search.products'),
    projects: t('search.projects'),
    industries: t('search.industries'),
    pages: t('search.pages'),
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.search')}
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-[#1d1d1f] text-[#f5f5f7]"
        >
          <div className="mx-auto max-w-[1024px] px-5 pb-12 pt-6 sm:px-6">
            <div className="flex items-center gap-3 border-b border-white/15 pb-3">
              <Search className="size-5 text-[#86868b]" aria-hidden />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                type="search"
                placeholder={t('search.placeholder')}
                aria-label={t('nav.search')}
                aria-controls="search-results"
                aria-activedescendant={results[cursor] ? `sr-${cursor}` : undefined}
                className="w-full bg-transparent font-display text-xl font-semibold text-[#f5f5f7] outline-none placeholder:text-[#6e6e73] sm:text-2xl [&::-webkit-search-cancel-button]:hidden"
              />
              <button type="button" onClick={onClose} aria-label={t('search.close')} className="rounded-full p-1 text-[#86868b] hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <div id="search-results" role="listbox" className="mt-6">
              {q.trim().length < 2 && (
                <p className="text-sm text-[#86868b]">
                  {t('search.empty')} {t('search.hint')}
                </p>
              )}
              {q.trim().length >= 2 && results.length === 0 && (
                <p className="text-sm text-[#86868b]">
                  {t('search.none')} “{q}”. {t('search.hint')}
                </p>
              )}
              {grouped.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {grouped.map(({ g, items }) => (
                    <div key={g}>
                      <p className="text-[12px] text-[#86868b]">{labels[g]}</p>
                      <ul className="mt-3 space-y-1">
                        {items.map((r) => {
                          const idx = results.indexOf(r)
                          const active = idx === cursor
                          return (
                            <li key={r.to + r.title} id={`sr-${idx}`} role="option" aria-selected={active}>
                              <button
                                type="button"
                                onClick={() => go(r.to)}
                                onMouseEnter={() => setCursor(idx)}
                                className={cn('group flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors', active ? 'bg-white/10' : 'hover:bg-white/5')}
                              >
                                <span>
                                  <span className="block text-[15px] font-semibold text-[#f5f5f7]">{r.title}</span>
                                  <span className="mt-0.5 block text-[12px] leading-snug text-[#a1a1a6]">{r.text}</span>
                                </span>
                                <ArrowRight className={cn('mt-1 size-4 shrink-0 text-[#2997ff] transition-opacity', active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')} aria-hidden />
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
