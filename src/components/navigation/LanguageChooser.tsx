import { useI18n } from '@/i18n'
import { Reveal } from '@/components/ui/Reveal'

/** First-visit prompt: lets the visitor pick English or Nepali once. The choice is saved and the prompt never returns. */
export function LanguageChooser() {
  const { needsChoice, setLang, t } = useI18n()
  if (!needsChoice) return null
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="lang-choose-title" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md">
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-[#1d1d1f] p-5 text-[#f5f5f7] shadow-2xl">
          <h2 id="lang-choose-title" className="text-base font-semibold">{t('lang.choose.title')}</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-[#a1a1a6]">{t('lang.choose.text')}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setLang('en')} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-opacity hover:opacity-90">
              English
            </button>
            <button type="button" lang="ne" onClick={() => setLang('np')} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-[#f5f5f7] transition-colors hover:bg-white/10">
              नेपाली
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
