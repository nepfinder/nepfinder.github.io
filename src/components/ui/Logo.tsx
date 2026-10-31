import { Link } from 'react-router'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

/**
 * The authentic Nepfinder wordmark (unmodified PNG from the original site).
 * The original asset's white backdrop was made transparent; on dark surfaces it sits on a light plate.
 */
export function Logo({ className, imgClassName, linked = true }: { className?: string; imgClassName?: string; linked?: boolean }) {
  const img = (
    <span className={cn('logo-plate', className)}>
      <img src={site.logo.wordmark} alt="Nepfinder" width={254} height={67} className={cn('h-7 w-auto sm:h-8', imgClassName)} decoding="async" />
    </span>
  )
  if (!linked) return img
  return (
    <Link to="/" aria-label="Nepfinder home" className="inline-flex rounded-lg">
      {img}
    </Link>
  )
}
