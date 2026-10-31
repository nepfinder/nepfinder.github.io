import { cn } from '@/utils/cn'

/** Lightweight CSS/SVG network graphic used when WebGL or motion is unavailable. */
export function NetworkFallback({ className, labels = [] }: { className?: string; labels?: string[] }) {
  const pts = [
    [50, 50],
    [20, 30],
    [80, 28],
    [85, 70],
    [22, 74],
    [50, 15],
    [50, 86],
    [15, 52],
    [86, 50],
  ]
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <div className="absolute inset-0 grid-fade" />
      <div className="absolute left-1/2 top-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {pts.slice(1).map(([x, y], i) => (
          <line key={i} x1={50} y1={50} x2={x} y2={y} stroke="var(--color-line)" strokeWidth={0.4} />
        ))}
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 0 ? 4 : 2.2} fill={i === 0 ? '#0071E3' : 'var(--color-surface)'} stroke="#0071E3" strokeWidth={0.5} />
            {labels[i - 1] && i > 0 && (
              <text x={x} y={y + 6} fontSize={3} textAnchor="middle" fill="var(--color-muted)" fontFamily="Inter, sans-serif">
                {labels[i - 1]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
