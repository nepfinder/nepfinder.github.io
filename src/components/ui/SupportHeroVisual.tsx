import { useI18n } from '@/i18n'

/**
 * Illustration for the Enterprise ERP Support hero: a dedicated team card, a fixed monthly price tag,
 * and the office-hours badge. Rendered as a transparent image per language, so the text is in the active language.
 */
export function SupportHeroVisual({ className }: { className?: string }) {
  const { t, lang } = useI18n()
  return (
    <img
      src={lang === 'np' ? '/images/support/enterprise-support-np-v2.webp' : '/images/support/enterprise-support-en-v2.webp'}
      alt={`${t('support.p2.title')}, ${t('support.p3.title')}, ${t('support.p1.title')}, ${t('support.p4.title')}`}
      width={1118}
      height={904}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-contain ${className ?? ''}`}
    />
  )
}
