import type { ReactNode } from 'react'
import { useMounted } from '@/hooks/useMediaFlags'

/** Renders children only on the client, after hydration. */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const mounted = useMounted()
  return <>{mounted ? children : fallback}</>
}
