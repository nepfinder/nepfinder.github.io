import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html, Line, OrbitControls, RoundedBox } from '@react-three/drei'
import { useIsMobile } from '@/hooks/useMediaFlags'
import { departments, type Department } from '@/data/office'

/* ------------------------------------------------------------------ */
/* Palette and layout                                                  */
/* ------------------------------------------------------------------ */

const C = {
  floor: '#FAFAFC',
  room: '#EEEEF3',
  desk: '#FFFFFF',
  dark: '#1D1D1F',
  grey: '#8E8E93',
  blue: '#0071E3',
  light: '#2997FF',
  screen: '#DCEBFF',
  wood: '#D9CDBF',
  plant: '#34C759',
  pot: '#A8A29E',
  line: '#C7C7CC',
  skin: '#F1E3D3',
  cup: '#FFFFFF',
}

const SP = 3.2 // grid spacing
const ROOM = 2.6 // room floor size
/** Corridor centre lines (x for vertical corridors, z for horizontal ones). */
const XS = [-4.9, -1.6, 1.6, 4.9]
const ZS = XS

type Axis = 'v' | 'h'

/** A place an agent can walk to: the exact spot, plus the corridor access point it is reached from. */
interface Spot {
  pos: THREE.Vector3
  access: THREE.Vector3
  axis: Axis
  /** Yaw to face while standing or sitting there. */
  face: number
}

const v3 = (x: number, z: number, y = 0) => new THREE.Vector3(x, y, z)
const nearest = (arr: number[], value: number) => arr.reduce((a, b) => (Math.abs(b - value) < Math.abs(a - value) ? b : a))

function roomCenter(d: Department) {
  return { cx: d.col * SP, cz: d.row * SP }
}

/** Where each department's desk, seat, visitor spot and corridor access are. */
function roomSpots(d: Department) {
  const { cx, cz } = roomCenter(d)
  const access = d.col === 0 ? v3(cx, d.row < 0 ? -1.6 : 1.6) : v3(d.col < 0 ? -1.6 : 1.6, cz)
  const axis: Axis = d.col === 0 ? 'h' : 'v'
  const seat: Spot = { pos: v3(cx, cz + 0.55), access, axis, face: Math.PI } // facing the desk (−z)
  const visitor: Spot = { pos: v3(cx + 0.95, cz + 0.65), access, axis, face: -Math.PI / 2 - 0.4 }
  return { seat, visitor, desk: v3(cx, cz - 0.2) }
}

const amenities = {
  coffee: {
    machine: v3(6.05, -2.4),
    /** Where agents go to line up; the queue then advances toward the machine. */
    join: { pos: v3(4.9, -2.4), access: v3(4.9, -2.4), axis: 'v' as Axis, face: Math.PI / 2 },
    serve: v3(5.45, -2.4),
    queue: [v3(4.9, -2.4), v3(4.9, -1.75), v3(4.9, -1.1), v3(4.9, -0.45), v3(4.9, 0.2)],
  },
  meeting: { table: v3(-6.1, 0), spots: [{ pos: v3(-5.45, 0.75), access: v3(-4.9, 0), axis: 'v' as Axis, face: -Math.PI / 2 }, { pos: v3(-5.45, -0.75), access: v3(-4.9, 0), axis: 'v' as Axis, face: -Math.PI / 2 }] },
  lounge: { sofa: v3(6.2, 2.7), spot: { pos: v3(5.5, 2.7), access: v3(4.9, 2.7), axis: 'v' as Axis, face: Math.PI / 2 } },
  printer: { unit: v3(0, -6.0), spot: { pos: v3(0, -5.4), access: v3(0, -4.9), axis: 'h' as Axis, face: Math.PI } },
  reception: { desk: v3(0, 6.0), spot: { pos: v3(0, 5.35), access: v3(0, 4.9), axis: 'h' as Axis, face: 0 } },
}

/** Manhattan route between two corridor access points, following corridor lines only. */
function corridorPath(a: Spot, b: Spot): THREE.Vector3[] {
  const A = a.access
  const B = b.access
  if (a.axis === 'v' && b.axis === 'v') {
    if (Math.abs(A.x - B.x) < 1e-3) return [B]
    const zc = nearest(ZS, (A.z + B.z) / 2)
    return [v3(A.x, zc), v3(B.x, zc), B]
  }
  if (a.axis === 'h' && b.axis === 'h') {
    if (Math.abs(A.z - B.z) < 1e-3) return [B]
    const xc = nearest(XS, (A.x + B.x) / 2)
    return [v3(xc, A.z), v3(xc, B.z), B]
  }
  if (a.axis === 'v') return [v3(A.x, B.z), B]
  return [v3(B.x, A.z), B]
}

/* ------------------------------------------------------------------ */
/* Agents                                                              */
/* ------------------------------------------------------------------ */

type AgentState = 'sit' | 'walk' | 'stand' | 'queue' | 'serve'
type Errand = 'visit' | 'coffee' | 'meeting' | 'lounge' | 'printer' | 'reception'

interface Agent {
  id: number
  dept: Department
  home: Spot
  pos: THREE.Vector3
  yaw: number
  targetYaw: number
  state: AgentState
  path: THREE.Vector3[]
  timer: number
  errand: Errand | null
  dest: Spot | null
  returning: boolean
  hasCup: boolean
  cupTimer: number
  walkPhase: number
  group: THREE.Group | null
  cup: THREE.Mesh | null
}

interface CoffeeMachine {
  queue: Agent[]
  busy: Agent | null
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const WALK_SPEED = 1.25

function pathTo(from: THREE.Vector3, fromSpot: Spot, to: Spot): THREE.Vector3[] {
  const route = [fromSpot.access.clone(), ...corridorPath(fromSpot, to).map((p) => p.clone()), to.pos.clone()]
  // Drop a leading waypoint if we are already standing on it.
  return route.filter((p, i) => !(i === 0 && p.distanceTo(from) < 0.05))
}

function Agents({ machine }: { machine: React.MutableRefObject<CoffeeMachine> }) {
  const spots = useMemo(() => departments.map(roomSpots), [])

  const agents = useMemo<Agent[]>(
    () =>
      departments.map((d, i) => ({
        id: i,
        dept: d,
        home: spots[i].seat,
        pos: spots[i].seat.pos.clone(),
        yaw: Math.PI,
        targetYaw: Math.PI,
        state: 'sit',
        path: [],
        timer: rand(2, 14),
        errand: null,
        dest: null,
        returning: false,
        hasCup: false,
        cupTimer: 0,
        walkPhase: Math.random() * 10,
        group: null,
        cup: null,
      })),
    [spots],
  )

  const chooseErrand = (a: Agent) => {
    const r = Math.random()
    if (r < 0.42) {
      let other = Math.floor(Math.random() * departments.length)
      if (other === a.id) other = (other + 1) % departments.length
      a.errand = 'visit'
      a.dest = spots[other].visitor
    } else if (r < 0.72) {
      a.errand = 'coffee'
      a.dest = amenities.coffee.join
    } else if (r < 0.84) {
      a.errand = 'meeting'
      a.dest = amenities.meeting.spots[Math.floor(Math.random() * amenities.meeting.spots.length)]
    } else if (r < 0.9) {
      a.errand = 'lounge'
      a.dest = amenities.lounge.spot
    } else if (r < 0.96) {
      a.errand = 'printer'
      a.dest = amenities.printer.spot
    } else {
      a.errand = 'reception'
      a.dest = amenities.reception.spot
    }
    a.returning = false
    a.path = pathTo(a.pos, a.home, a.dest)
    a.state = 'walk'
  }

  const goHome = (a: Agent) => {
    const from = a.dest ?? a.home
    a.returning = true
    a.path = pathTo(a.pos, from, a.home)
    a.state = 'walk'
  }

  /** Move toward `target`; returns true when reached. */
  const stepToward = (a: Agent, target: THREE.Vector3, dt: number) => {
    const dx = target.x - a.pos.x
    const dz = target.z - a.pos.z
    const dist = Math.hypot(dx, dz)
    if (dist < 0.03) {
      a.pos.x = target.x
      a.pos.z = target.z
      return true
    }
    const step = Math.min(dist, WALK_SPEED * dt)
    a.pos.x += (dx / dist) * step
    a.pos.z += (dz / dist) * step
    a.targetYaw = Math.atan2(dx, dz)
    a.walkPhase += dt * 11
    return false
  }

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const m = machine.current

    for (const a of agents) {
      switch (a.state) {
        case 'sit': {
          a.timer -= dt
          a.targetYaw = a.home.face
          if (a.timer <= 0) chooseErrand(a)
          break
        }
        case 'walk': {
          const target = a.path[0]
          if (!target) {
            if (a.returning) {
              a.state = 'sit'
              a.timer = rand(6, 18)
              a.errand = null
              a.dest = null
            } else if (a.errand === 'coffee') {
              a.state = 'queue'
              m.queue.push(a)
            } else {
              a.state = 'stand'
              a.timer = rand(3, 7)
              a.targetYaw = a.dest?.face ?? a.yaw
            }
            break
          }
          if (stepToward(a, target, dt)) a.path.shift()
          break
        }
        case 'stand': {
          a.timer -= dt
          if (a.timer <= 0) goHome(a)
          break
        }
        case 'queue': {
          const index = m.queue.indexOf(a)
          const spot = amenities.coffee.queue[Math.min(index, amenities.coffee.queue.length - 1)]
          const arrived = stepToward(a, spot, dt)
          if (arrived) a.targetYaw = Math.PI / 2 // face the machine
          if (index === 0 && !m.busy && arrived) {
            m.busy = a
            a.state = 'serve'
            a.timer = 2.6
          }
          break
        }
        case 'serve': {
          const arrived = stepToward(a, amenities.coffee.serve, dt)
          if (arrived) {
            a.targetYaw = Math.PI / 2
            a.timer -= dt
            if (a.timer <= 0) {
              a.hasCup = true
              a.cupTimer = rand(18, 30)
              m.busy = null
              m.queue.splice(m.queue.indexOf(a), 1)
              goHome(a)
            }
          }
          break
        }
      }

      if (a.hasCup) {
        a.cupTimer -= dt
        if (a.cupTimer <= 0) a.hasCup = false
      }

      // Smooth turning
      let diff = a.targetYaw - a.yaw
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      a.yaw += diff * Math.min(1, dt * 8)

      const g = a.group
      if (g) {
        const walking = a.state === 'walk' || ((a.state === 'queue' || a.state === 'serve') && a.path.length > 0)
        const bob = walking ? Math.abs(Math.sin(a.walkPhase)) * 0.05 : 0
        const seated = a.state === 'sit' ? 0.1 : 0
        g.position.set(a.pos.x, bob + seated, a.pos.z)
        g.rotation.y = a.yaw
      }
      if (a.cup) a.cup.visible = a.hasCup
    }
  })

  return (
    <>
      {agents.map((a) => (
        <group key={a.id} ref={(g) => void (a.group = g)} position={a.pos.toArray()}>
          {/* body */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <capsuleGeometry args={[0.18, 0.3, 4, 10]} />
            <meshStandardMaterial color={a.dept.color} roughness={0.85} />
          </mesh>
          {/* head */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <sphereGeometry args={[0.17, 18, 14]} />
            <meshStandardMaterial color={C.skin} roughness={0.9} />
          </mesh>
          {/* AI badge */}
          <mesh position={[0, 1.04, 0]}>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial color={C.light} emissive={C.light} emissiveIntensity={0.8} roughness={0.3} />
          </mesh>
          {/* coffee cup, shown after a visit to the machine */}
          <mesh ref={(mm) => void (a.cup = mm)} position={[0.2, 0.42, 0.17]} visible={false}>
            <cylinderGeometry args={[0.05, 0.045, 0.11, 12]} />
            <meshStandardMaterial color={C.cup} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Furniture                                                           */
/* ------------------------------------------------------------------ */

function Desk({ position, rotation = 0 }: { position: THREE.Vector3; rotation?: number }) {
  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 0.08, 0.7]} radius={0.03} position={[0, 0.56, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={C.desk} roughness={0.9} />
      </RoundedBox>
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 0.27, 0]} castShadow>
          <boxGeometry args={[0.06, 0.54, 0.6]} />
          <meshStandardMaterial color="#D1D1D6" roughness={0.9} />
        </mesh>
      ))}
      {/* monitor */}
      <mesh position={[0, 0.86, -0.18]} castShadow>
        <boxGeometry args={[0.62, 0.38, 0.03]} />
        <meshStandardMaterial color={C.dark} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.86, -0.163]}>
        <planeGeometry args={[0.56, 0.32]} />
        <meshBasicMaterial color={C.screen} />
      </mesh>
      <mesh position={[0, 0.64, -0.18]}>
        <boxGeometry args={[0.16, 0.08, 0.1]} />
        <meshStandardMaterial color={C.grey} />
      </mesh>
      {/* keyboard */}
      <mesh position={[0, 0.61, 0.12]}>
        <boxGeometry args={[0.42, 0.02, 0.14]} />
        <meshStandardMaterial color="#E5E5EA" />
      </mesh>
    </group>
  )
}

function Chair({ position, rotation = 0 }: { position: THREE.Vector3; rotation?: number }) {
  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.06, 16]} />
        <meshStandardMaterial color={C.dark} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color={C.grey} />
      </mesh>
      <mesh position={[0, 0.5, -0.17]} castShadow>
        <boxGeometry args={[0.34, 0.36, 0.05]} />
        <meshStandardMaterial color={C.dark} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Plant({ position, scale = 1 }: { position: THREE.Vector3; scale?: number }) {
  return (
    <group position={[position.x, 0, position.z]} scale={scale}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.32, 14]} />
        <meshStandardMaterial color={C.pot} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.3, 14, 12]} />
        <meshStandardMaterial color={C.plant} roughness={0.9} />
      </mesh>
      <mesh position={[0.12, 0.78, 0.05]} castShadow>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial color="#30B457" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Room({ dept, showLabel }: { dept: Department; showLabel: boolean }) {
  const { cx, cz } = roomCenter(dept)
  const { seat, desk } = roomSpots(dept)
  return (
    <group>
      <RoundedBox args={[ROOM, 0.05, ROOM]} radius={0.08} position={[cx, 0.02, cz]} receiveShadow>
        <meshStandardMaterial color={C.room} roughness={1} />
      </RoundedBox>
      {/* colour stripe along the back wall edge */}
      <mesh position={[cx, 0.06, cz - ROOM / 2 + 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM - 0.4, 0.1]} />
        <meshBasicMaterial color={dept.color} />
      </mesh>
      <Desk position={desk} />
      <Chair position={seat.pos} rotation={Math.PI} />
      <Plant position={v3(cx - 1.0, cz + 0.85)} scale={0.7} />
      {showLabel && (
        <Html center position={[cx, 1.35, cz - 0.2]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[10.5px] font-medium text-[#1D1D1F] shadow-sm">{dept.name}</span>
        </Html>
      )}
    </group>
  )
}

function Server({ showLabel }: { showLabel: boolean }) {
  const leds = useRef<THREE.MeshStandardMaterial[]>([])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    leds.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * (2.2 + i * 0.7) + i))
    })
  })
  return (
    <group>
      <RoundedBox args={[1.9, 0.06, 1.9]} radius={0.08} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color="#E3E3E8" roughness={1} />
      </RoundedBox>
      {[-0.42, 0.42].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <RoundedBox args={[0.7, 1.2, 0.7]} radius={0.05} position={[0, 0.62, 0]} castShadow>
            <meshStandardMaterial color={C.dark} roughness={0.6} metalness={0.2} />
          </RoundedBox>
          {[0, 1, 2, 3].map((r) => (
            <mesh key={r} position={[-0.18 + (r % 2) * 0.36, 0.95 - Math.floor(r / 2) * 0.28, 0.352]}>
              <boxGeometry args={[0.1, 0.04, 0.01]} />
              <meshStandardMaterial ref={(m) => void (m && (leds.current[(x > 0 ? 4 : 0) + r] = m))} color={C.light} emissive={C.light} emissiveIntensity={0.6} />
            </mesh>
          ))}
          <mesh position={[0, 0.55, 0.352]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial color="#2C2C2E" />
          </mesh>
        </group>
      ))}
      {showLabel && (
        <Html center position={[0, 1.6, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-[#1D1D1F] px-2 py-0.5 text-[10.5px] font-semibold text-white shadow-sm">ERP Server</span>
        </Html>
      )}
    </group>
  )
}

function CoffeeCorner({ showLabel }: { showLabel: boolean }) {
  const m = amenities.coffee.machine
  const steam = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (steam.current) steam.current.position.y = 1.15 + Math.sin(clock.getElapsedTime() * 2) * 0.03
  })
  return (
    <group>
      <RoundedBox args={[1.2, 0.05, 2.4]} radius={0.06} position={[m.x, 0.02, m.z - 0.3]} receiveShadow>
        <meshStandardMaterial color={C.room} roughness={1} />
      </RoundedBox>
      {/* counter */}
      <RoundedBox args={[0.6, 0.9, 1.6]} radius={0.04} position={[m.x + 0.1, 0.45, m.z - 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color={C.desk} roughness={0.9} />
      </RoundedBox>
      {/* machine */}
      <RoundedBox args={[0.42, 0.5, 0.4]} radius={0.04} position={[m.x + 0.1, 1.15, m.z]} castShadow>
        <meshStandardMaterial color={C.dark} roughness={0.5} metalness={0.3} />
      </RoundedBox>
      <mesh position={[m.x - 0.12, 1.2, m.z]}>
        <boxGeometry args={[0.02, 0.12, 0.2]} />
        <meshStandardMaterial color={C.light} emissive={C.light} emissiveIntensity={0.8} />
      </mesh>
      <group ref={steam} position={[m.x - 0.1, 1.15, m.z]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.35 + i * 0.12, (i - 1) * 0.05]}>
            <sphereGeometry args={[0.035 - i * 0.008, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.35 - i * 0.08} />
          </mesh>
        ))}
      </group>
      {/* water cooler */}
      <mesh position={[m.x + 0.1, 0.9 + 0.3, m.z - 0.95]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.36, 14]} />
        <meshStandardMaterial color="#BFE3FF" transparent opacity={0.9} roughness={0.2} />
      </mesh>
      {showLabel && (
        <Html center position={[m.x, 1.75, m.z]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[10.5px] font-medium text-[#1D1D1F] shadow-sm">Coffee</span>
        </Html>
      )}
    </group>
  )
}

function MeetingRoom({ showLabel }: { showLabel: boolean }) {
  const t = amenities.meeting.table
  return (
    <group>
      <RoundedBox args={[2.2, 0.05, 2.8]} radius={0.08} position={[t.x - 0.2, 0.02, t.z]} receiveShadow>
        <meshStandardMaterial color={C.room} roughness={1} />
      </RoundedBox>
      <mesh position={[t.x - 0.3, 0.6, t.z]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.06, 28]} />
        <meshStandardMaterial color={C.wood} roughness={0.8} />
      </mesh>
      <mesh position={[t.x - 0.3, 0.3, t.z]}>
        <cylinderGeometry args={[0.06, 0.1, 0.56, 10]} />
        <meshStandardMaterial color={C.grey} />
      </mesh>
      {[[-0.3, 0.95, 0], [-0.3, -0.95, Math.PI], [-1.1, 0, Math.PI / 2], [0.5, 0, -Math.PI / 2]].map(([dx, dz, rot], i) => (
        <Chair key={i} position={v3(t.x + dx, t.z + dz)} rotation={rot} />
      ))}
      {/* whiteboard */}
      <mesh position={[t.x - 1.2, 1.0, t.z]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.4, 0.8, 0.04]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[t.x - 1.17, 1.18 - i * 0.16, t.z - 0.3 + i * 0.1]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.6 - i * 0.15, 0.04]} />
          <meshBasicMaterial color={i === 1 ? C.blue : '#C7C7CC'} />
        </mesh>
      ))}
      {showLabel && (
        <Html center position={[t.x - 0.3, 1.6, t.z]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[10.5px] font-medium text-[#1D1D1F] shadow-sm">Meeting room</span>
        </Html>
      )}
    </group>
  )
}

function Lounge({ showLabel }: { showLabel: boolean }) {
  const s = amenities.lounge.sofa
  return (
    <group>
      <RoundedBox args={[1.6, 0.05, 2.2]} radius={0.08} position={[s.x - 0.2, 0.02, s.z]} receiveShadow>
        <meshStandardMaterial color={C.room} roughness={1} />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.3, 1.5]} radius={0.08} position={[s.x + 0.1, 0.2, s.z]} castShadow>
        <meshStandardMaterial color="#5E5CE6" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.55, 1.5]} radius={0.06} position={[s.x + 0.35, 0.4, s.z]} castShadow>
        <meshStandardMaterial color="#5E5CE6" roughness={0.9} />
      </RoundedBox>
      <mesh position={[s.x - 0.55, 0.28, s.z]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.05, 20]} />
        <meshStandardMaterial color={C.wood} />
      </mesh>
      <Plant position={v3(s.x - 0.3, s.z + 1.0)} scale={0.8} />
      {showLabel && (
        <Html center position={[s.x, 1.3, s.z]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[10.5px] font-medium text-[#1D1D1F] shadow-sm">Lounge</span>
        </Html>
      )}
    </group>
  )
}

function Printer() {
  const p = amenities.printer.unit
  return (
    <group position={[p.x, 0, p.z]}>
      <RoundedBox args={[0.9, 0.7, 0.6]} radius={0.04} position={[0, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#F2F2F7" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.26, 0.5]} radius={0.04} position={[0, 0.83, 0]} castShadow>
        <meshStandardMaterial color="#D1D1D6" roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0.72, 0.31]}>
        <planeGeometry args={[0.4, 0.02]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  )
}

function Reception({ showLabel }: { showLabel: boolean }) {
  const r = amenities.reception.desk
  return (
    <group>
      <RoundedBox args={[2.2, 0.9, 0.6]} radius={0.06} position={[r.x, 0.45, r.z]} castShadow receiveShadow>
        <meshStandardMaterial color={C.desk} roughness={0.9} />
      </RoundedBox>
      <mesh position={[r.x, 0.5, r.z - 0.305]}>
        <planeGeometry args={[2.0, 0.08]} />
        <meshBasicMaterial color={C.blue} side={THREE.DoubleSide} />
      </mesh>
      <Plant position={v3(r.x + 1.45, r.z)} scale={0.9} />
      <Plant position={v3(r.x - 1.45, r.z)} scale={0.9} />
      {showLabel && (
        <Html center position={[r.x, 1.35, r.z]} style={{ pointerEvents: 'none' }} zIndexRange={[5, 0]}>
          <span className="whitespace-nowrap rounded-md bg-white/95 px-2 py-0.5 text-[10.5px] font-medium text-[#1D1D1F] shadow-sm">Reception</span>
        </Html>
      )}
    </group>
  )
}

/** Data pulses travelling between the server and each department. */
function DataFlow({ targets, count }: { targets: THREE.Vector3[]; count: number }) {
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
      <pointsMaterial size={0.08} color={C.light} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export default function AiOfficeScene() {
  const mobile = useIsMobile()
  const machine = useRef<CoffeeMachine>({ queue: [], busy: null })
  const roomCenters = useMemo(() => departments.map((d) => v3(d.col * SP, d.row * SP)), [])
  const showLabel = !mobile

  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <directionalLight position={[-5, 4, -4]} intensity={0.35} color="#dfe6f3" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!mobile}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={0.45}
        maxPolarAngle={1.2}
        target={[0, 0.2, 0]}
      />

      {/* floor */}
      <RoundedBox args={[14, 0.08, 12.8]} radius={0.3} position={[0, -0.04, 0]} receiveShadow>
        <meshStandardMaterial color={C.floor} roughness={1} />
      </RoundedBox>

      {/* corridor lines from server to each room */}
      {roomCenters.map((p, i) => (
        <Line key={i} points={[[0, 0.06, 0], [p.x, 0.06, p.z]]} color={C.line} lineWidth={1} />
      ))}
      <DataFlow targets={roomCenters} count={mobile ? 1 : 2} />

      <Server showLabel={showLabel} />
      {departments.map((d) => (
        <Room key={d.key} dept={d} showLabel={showLabel} />
      ))}

      <CoffeeCorner showLabel={showLabel} />
      <MeetingRoom showLabel={showLabel} />
      <Lounge showLabel={showLabel} />
      <Printer />
      <Reception showLabel={showLabel} />
      {[v3(-6.4, -5.7), v3(6.4, -5.7), v3(-6.4, 5.7), v3(6.4, 5.7)].map((p, i) => (
        <Plant key={i} position={p} />
      ))}

      <Agents machine={machine} />
    </>
  )
}
