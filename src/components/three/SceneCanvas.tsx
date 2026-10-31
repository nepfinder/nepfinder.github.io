import { Suspense, useRef, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useInViewport, useIsMobile, usePrefersReducedMotion, useWebGLSupport } from '@/hooks/useMediaFlags'
import { cn } from '@/utils/cn'

interface SceneCanvasProps {
  children: ReactNode
  /** Static graphic shown when WebGL is unavailable or the scene is still loading. */
  fallback: ReactNode
  className?: string
  camera?: { position: [number, number, number]; fov?: number }
  /** Render even when the user prefers reduced motion (the scene must then stay still). */
  allowReducedMotion?: boolean
}

/**
 * Shared wrapper for every Three.js scene:
 * - capped device pixel ratio (lower on mobile)
 * - rendering pauses when the canvas scrolls out of view
 * - WebGL detection with static fallback
 * - respects prefers-reduced-motion by showing the fallback
 */
export function SceneCanvas({ children, fallback, className, camera, allowReducedMotion = false }: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInViewport(ref)
  const webgl = useWebGLSupport()
  const reduce = usePrefersReducedMotion()
  const mobile = useIsMobile()

  const showScene = webgl === true && (allowReducedMotion || !reduce)

  return (
    <div ref={ref} className={cn('overflow-hidden', className ?? 'relative h-full w-full')} aria-hidden="true">
      {!showScene && <div className="absolute inset-0">{fallback}</div>}
      {showScene && (
        <Suspense fallback={<div className="absolute inset-0">{fallback}</div>}>
          <Canvas
            dpr={mobile ? [1, 1.25] : [1, 1.75]}
            frameloop={inView ? 'always' : 'never'}
            camera={{ position: camera?.position ?? [0, 0, 8], fov: camera?.fov ?? 45 }}
            shadows={!mobile}
            flat
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {children}
          </Canvas>
        </Suspense>
      )}
    </div>
  )
}
