import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'

const layers = [
  { y: -0.9, color: '#182621', w: 3.2, label: 'infrastructure' },
  { y: -0.3, color: '#174A3C', w: 2.9, label: 'data' },
  { y: 0.3, color: '#2D8065', w: 2.6, label: 'business logic' },
  { y: 0.9, color: '#EEF1ED', w: 2.3, label: 'experience' },
]

/** Stacked software layers: infrastructure → data → business logic → experience. */
export default function AboutScene() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.PI / 4 + Math.sin(clock.getElapsedTime() * 0.2) * 0.15
  })
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 4]} intensity={1.4} />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#dfe9e3" />
      <group ref={group} rotation={[0.35, Math.PI / 4, 0]}>
        {layers.map((l, i) => (
          <Float key={l.label} speed={1} rotationIntensity={0} floatIntensity={0.3} floatingRange={[-0.03 * (i + 1), 0.03 * (i + 1)]}>
            <RoundedBox args={[l.w, 0.16, l.w]} radius={0.06} smoothness={3} position={[0, l.y, 0]}>
              <meshStandardMaterial color={l.color} roughness={0.9} metalness={0} />
            </RoundedBox>
          </Float>
        ))}
        {/* connector */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 2.4, 12]} />
          <meshBasicMaterial color="#C9D6CE" />
        </mesh>
      </group>
    </>
  )
}
