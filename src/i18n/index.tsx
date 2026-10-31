import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type TKey } from './en'
import { np } from './np'

export type Lang = 'en' | 'np'
const STORAGE_KEY = 'nepfinder-lang'

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  /** Translate a UI string; `{name}` placeholders are replaced from `vars`. */
  t: (key: TKey, vars?: Record<string, string>) => string
}

const Ctx = createContext<I18n>({ lang: 'en', setLang: () => {}, t: (k) => en[k] })

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in English so server HTML and first client render match; restore the saved choice after mount.
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'np' || saved === 'en') setLangState(saved)
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'np' ? 'ne' : 'en'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
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

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)
export const useT = () => useContext(Ctx).t
