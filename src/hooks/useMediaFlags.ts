import { useEffect, useState } from 'react'

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : initial,
  )
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])
  return matches
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** True once mounted on the client (never during SSR / first hydration pass). */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

let webglCache: boolean | null = null
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(webglCache)
  useEffect(() => {
    if (webglCache !== null) {
      setSupported(webglCache)
      return
    }
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      webglCache = !!gl
    } catch {
      webglCache = false
    }
    setSupported(webglCache)
  }, [])
  return supported
}

/** Whether `ref` is currently (roughly) in the viewport. Used to pause 3D scenes offscreen. */
export function useInViewport<T extends Element>(ref: React.RefObject<T | null>, rootMargin = '200px') {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
