import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Html, Line, RoundedBox } from '@react-three/drei'
import { useIsMobile } from '@/hooks/useMediaFlags'

export const heroModules = ['Finance', 'Accounting', 'Inventory', 'Sales', 'Procurement', 'CRM', 'Human Resources', 'Operations']

const C = {
  forest: '#174A3C',
  emerald: '#2D8065',
  stone: '#EEF1ED',
  charcoal: '#182621',
  white: '#FFFFFF',
  line: '#AFC0B6',
  bar: '#D6DFD9',
}

/** Module tiles laid out on a staggered isometric grid around a central platform tile. */
function useLayout(mobile: boolean) {
  return useMemo(() => {
    const s = mobile ? 1.1 : 1.28
    const grid: [number, number][] = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ]
    return grid.map(([x, z]) => new THREE.Vector3(x * s, 0, z * s))
  }, [mobile])
}

function Tile({ position, label, index, mobile }: { position: THREE.Vector3; label: string; index: number; mobile: boolean }) {
  return (
    <Float speed={1.1} rotationIntensity={0} floatIntensity={0.35} floatingRange={[-0.04, 0.04]}>
      <group position={position}>
        <RoundedBox args={[0.98, 0.1, 0.98]} radius={0.035} smoothness={3} castShadow receiveShadow>
          <meshStandardMaterial color={C.white} roughness={0.95} metalness={0} />
        </RoundedBox>
        {/* header strip + content bars drawn as flat geometry on the tile */}
        <mesh position={[0, 0.072, -0.33]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.78, 0.12]} />
          <meshBasicMaterial color={index % 3 === 0 ? C.emerald : C.forest} />
        </mesh>
        {[0, 1, 2].map((r) => (
          <mesh key={r} position={[-0.1 + (r === 2 ? -0.12 : 0), 0.072, -0.08 + r * 0.17]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[r === 2 ? 0.34 : 0.58, 0.06]} />
            <meshBasicMaterial color={C.bar} />
          </mesh>
        ))}
        <mesh position={[0.3, 0.072, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.09, 24]} />
          <meshBasicMaterial color={C.emerald} transparent opacity={0.25} />
        </mesh>
        {!mobile && (
          <Html center position={[0, 0.02, 0.62]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
            <span className="whitespace-nowrap rounded-md border border-[#DDE5DE] bg-white/95 px-2 py-0.5 text-[10.5px] font-medium tracking-wide text-[#182621] shadow-sm">
              {label}
            </span>
          </Html>
        )}
      </group>
    </Float>
  )
}

function Core() {
  const ring = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ring.current) ring.current.rotation.z = clock.getElapsedTime() * 0.25
  })
  return (
    <group>
      <RoundedBox args={[1.05, 0.16, 1.05]} radius={0.05} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={C.forest} roughness={0.85} metalness={0.05} />
      </RoundedBox>
      <mesh ref={ring} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.26, 0.3, 48, 1, 0, Math.PI * 1.5]} />
        <meshBasicMaterial color={C.white} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color={C.white} />
      </mesh>
    </group>
  )
}

/** Small emerald dots travelling along the connectors between the core and each module. */
function Flow({ targets, count = 2 }: { targets: THREE.Vector3[]; count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const total = targets.length * count
  const { array, offsets } = useMemo(() => {
    const arr = new Float32Array(total * 3)
    const off = new Float32Array(total)
    for (let i = 0; i < total; i++) off[i] = Math.random()
    return { array: arr, offsets: off }
  }, [total])
  useFrame(({ clock }) => {
    const pts = ref.current
    if (!pts) return
    const t = clock.getElapsedTime() * 0.12
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let m = 0; m < targets.length; m++) {
      const p = targets[m]
      for (let k = 0; k < count; k++) {
        const i = m * count + k
        const f = (t + offsets[i]) % 1
        const s = f < 0.5 ? f * 2 : (1 - f) * 2
        attr.setXYZ(i, p.x * s, 0.08, p.z * s)
      }
    }
    attr.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[array, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color={C.emerald} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Platform() {
  const group = useRef<THREE.Group>(null)
  const mobile = useIsMobile()
  const positions = useLayout(mobile)
  const { pointer } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.y * 0.06, delta * 2)
    target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.x * 0.12, delta * 2)
    g.rotation.y = Math.PI / 4 + target.current.y
    g.rotation.x = target.current.x
  })

  return (
    <group ref={group}>
      {/* base plate */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[mobile ? 4 : 4.5, mobile ? 4 : 4.5]} />
        <meshStandardMaterial color="#F6F8F5" roughness={1} />
      </mesh>
      {positions.map((p, i) => (
        <Line key={i} points={[[0, 0.02, 0], [p.x, 0.02, p.z]]} color={C.line} lineWidth={1} />
      ))}
      <Flow targets={positions} count={mobile ? 1 : 2} />
      <Core />
      {positions.map((p, i) => (
        <Tile key={i} position={p} label={heroModules[i]} index={i} mobile={mobile} />
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 3]} intensity={1.6} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0005} />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#dfe9e3" />
      <Platform />
    </>
  )
}
