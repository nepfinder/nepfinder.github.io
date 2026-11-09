import { lazy, Suspense, useEffect, useState, type ComponentProps, type ReactNode } from 'react'

const LazyCanvas = lazy(() => import('./SceneCanvas').then((m) => ({ default: m.SceneCanvas })))
const scenes = {
  about: lazy(() => import('./AboutScene')),
  network: lazy(() => import('./NetworkScene')),
}

type SceneName = keyof typeof scenes

interface SceneProps extends Omit<ComponentProps<typeof LazyCanvas>, 'children'> {
  scene: SceneName
  fallback: ReactNode
}

/** True once the page has loaded and the browser is idle, so 3D chunks never compete with first paint. */
function useIdleReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let idleId: number | undefined
    let timeoutId: number | undefined
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 400)
      }
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])
  return ready
}

/**
 * Client-only, code-split entry point for every Three.js scene. The static fallback is
 * rendered during SSR, until the browser is idle, while chunks load, when WebGL is
 * unavailable, and for reduced motion.
 */
export function Scene({ scene, fallback, className, ...rest }: SceneProps) {
  const Inner = scenes[scene]
  const staticGraphic = (
    <div className={className} aria-hidden="true">
      {fallback}
    </div>
  )
  const ready = useIdleReady()
  if (!ready) return staticGraphic
  return (
    <Suspense fallback={staticGraphic}>
      <LazyCanvas fallback={fallback} className={className} {...rest}>
        <Inner />
      </LazyCanvas>
    </Suspense>
  )
}
