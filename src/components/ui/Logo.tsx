import { Link } from 'react-router'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

/**
 * The authentic Nepfinder wordmark (unmodified PNG from the original site).
 * The asset has an opaque white background, so it sits on a white plate for contrast on dark surfaces.
 */
export function Logo({ className, imgClassName, linked = true }: { className?: string; imgClassName?: string; linked?: boolean }) {
  const img = (
    <span className={cn('logo-plate -ml-2', className)}>
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
