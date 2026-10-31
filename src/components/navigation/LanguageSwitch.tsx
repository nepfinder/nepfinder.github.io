import { useI18n, type Lang } from '@/i18n'
import { cn } from '@/utils/cn'

function FlagUK({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <clipPath id="uk-c">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" clipPath="url(#uk-c)" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-c)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

function FlagNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <path d="M4 4 L44 30 L22 30 L44 56 L4 56 Z" fill="#003893" />
      <path d="M8 10 L36 28 L18 28 L36 52 L8 52 Z" fill="#DC143C" />
      <circle cx="20" cy="41" r="6.5" fill="#fff" />
      <circle cx="20" cy="39.5" r="6.5" fill="#DC143C" />
      <path d="M20 46.5 a5 5 0 0 0 5-4.2 l-5 1 z" fill="#fff" />
      <circle cx="20" cy="43" r="4.5" fill="#fff" />
      <circle cx="19.5" cy="19" r="4.2" fill="#fff" />
    </svg>
  )
}

const options: { lang: Lang; label: string; short: string; Flag: (p: { className?: string }) => React.JSX.Element }[] = [
  { lang: 'en', label: 'English', short: 'ENG', Flag: FlagUK },
  { lang: 'np', label: 'नेपाली', short: 'नेपाली', Flag: FlagNepal },
]

/** English / Nepali toggle with flags. Dark variant for the menu bar, light variant for menus on light backgrounds. */
export function LanguageSwitch({ className, variant = 'dark' }: { className?: string; variant?: 'dark' | 'light' }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div role="group" aria-label={t('lang.switch')} className={cn('inline-flex items-center rounded-full p-0.5', variant === 'dark' ? 'bg-white/10' : 'bg-bg-2', className)}>
      {options.map((o) => {
        const active = o.lang === lang
        return (
          <button
            key={o.lang}
            type="button"
            onClick={() => setLang(o.lang)}
            aria-pressed={active}
            aria-label={o.label}
            title={o.label}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium transition-colors',
              variant === 'dark'
                ? active
                  ? 'bg-white text-[#1d1d1f]'
                  : 'text-[#f5f5f7]/75 hover:text-[#f5f5f7]'
                : active
                  ? 'bg-white text-text shadow-sm'
                  : 'text-muted hover:text-text',
            )}
          >
            <o.Flag className="h-3 w-auto rounded-[2px]" />
            <span>{o.short}</span>
          </button>
        )
      })}
    </div>
  )
}
