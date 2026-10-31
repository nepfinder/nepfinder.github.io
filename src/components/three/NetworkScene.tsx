import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

/** Drifting point network with glowing connections; used behind the final CTA. */
export default function NetworkScene({ count = 70, maxDist = 2.1 }: { count?: number; maxDist?: number }) {
  const points = useRef<THREE.Points>(null)
  const lines = useRef<THREE.LineSegments>(null)

  const { pos, vel, linePos } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      vel[i * 3] = (Math.random() - 0.5) * 0.12
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.08
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05
    }
    const linePos = new Float32Array(count * count * 3) // generous upper bound
    return { pos, vel, linePos }
  }, [count])

  useFrame((_, delta) => {
    const p = points.current
    const l = lines.current
    if (!p || !l) return
    const d = Math.min(delta, 0.05)
    for (let i = 0; i < count; i++) {
      for (let a = 0; a < 3; a++) {
        const idx = i * 3 + a
        pos[idx] += vel[idx] * d
        const limit = a === 0 ? 7 : a === 1 ? 3 : 2
        if (pos[idx] > limit || pos[idx] < -limit) vel[idx] *= -1
      }
    }
    let n = 0
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
          linePos.set([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]], n * 6)
          n++
        }
      }
    }
    ;(p.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    const la = l.geometry.getAttribute('position') as THREE.BufferAttribute
    la.needsUpdate = true
    l.geometry.setDrawRange(0, n * 2)
  })

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#2997ff" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#0071e3" transparent opacity={0.35} />
      </lineSegments>
    </>
  )
}
