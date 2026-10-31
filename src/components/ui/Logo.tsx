import { Link } from 'react-router'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

/**
 * The official Nepfinder logo (emblem + wordmark lockup supplied by the company).
 * On dark surfaces it sits on a light plate for contrast.
 */
export function Logo({ className, imgClassName, linked = true }: { className?: string; imgClassName?: string; linked?: boolean }) {
  const img = (
    <span className={cn('logo-plate', className)}>
      <img src={site.logo.wordmark} alt="Nepfinder" width={1162} height={292} className={cn('h-9 w-auto sm:h-10', imgClassName)} decoding="async" />
    </span>
  )
  if (!linked) return img
  return (
    <Link to="/" aria-label="Nepfinder home" className="inline-flex rounded-lg">
      {img}
    </Link>
  )
}
