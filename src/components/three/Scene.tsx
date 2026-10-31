import { lazy, Suspense, type ComponentProps, type ReactNode } from 'react'
import { ClientOnly } from '@/components/ui/ClientOnly'

const LazyCanvas = lazy(() => import('./SceneCanvas').then((m) => ({ default: m.SceneCanvas })))
const scenes = {
  hero: lazy(() => import('./HeroScene')),
  about: lazy(() => import('./AboutScene')),
  network: lazy(() => import('./NetworkScene')),
}

type SceneName = keyof typeof scenes

interface SceneProps extends Omit<ComponentProps<typeof LazyCanvas>, 'children'> {
  scene: SceneName
  fallback: ReactNode
}

/**
 * Client-only, code-split entry point for every Three.js scene. The static fallback is
 * rendered during SSR, while chunks load, when WebGL is unavailable, and for reduced motion.
 */
export function Scene({ scene, fallback, className, ...rest }: SceneProps) {
  const Inner = scenes[scene]
  const staticGraphic = (
    <div className={className} aria-hidden="true">
      {fallback}
    </div>
  )
  return (
    <ClientOnly fallback={staticGraphic}>
      <Suspense fallback={staticGraphic}>
        <LazyCanvas fallback={fallback} className={className} {...rest}>
          <Inner />
        </LazyCanvas>
      </Suspense>
    </ClientOnly>
  )
}
