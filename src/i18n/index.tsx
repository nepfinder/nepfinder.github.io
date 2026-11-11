import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type TKey } from './en'
import { np } from './np'

export type Lang = 'en' | 'np'
const STORAGE_KEY = 'nepfinder-lang'

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  /** True on a first visit, before the visitor has picked a language (never true for returning visitors). */
  needsChoice: boolean
  /** Translate a UI string; `{name}` placeholders are replaced from `vars`. */
  t: (key: TKey, vars?: Record<string, string>) => string
}

const Ctx = createContext<I18n>({ lang: 'en', setLang: () => {}, needsChoice: false, t: (k) => en[k] })

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in English so server HTML and first client render match; restore the saved choice after mount.
  const [lang, setLangState] = useState<Lang>('en')
  const [chosen, setChosen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      /* storage unavailable */
    }
    if (saved === 'np' || saved === 'en') {
      setLangState(saved)
      setChosen(true)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'np' ? 'ne' : 'en'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    setChosen(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: TKey, vars?: Record<string, string>) => {
      let s: string = lang === 'np' ? np[key] ?? en[key] : en[key]
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v)
      return s
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, needsChoice: ready && !chosen, t }), [lang, setLang, ready, chosen, t])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
export const useT = () => useContext(Ctx).t
