import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Container,
  CreditCard,
  Database,
  FileCode2,
  GitBranch,
  Hexagon,
  Layers3,
  Network,
  Puzzle,
  Terminal,
  Webhook,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  ERPNext: Boxes,
  'Frappe Framework': Layers3,
  Python: Terminal,
  'Node.js': Hexagon,
  React: Atom,
  'Next.js': FileCode2,
  TypeScript: Braces,
  JavaScript: Braces,
  MariaDB: Database,
  PostgreSQL: Database,
  Linux: Terminal,
  Docker: Container,
  'Cloud Infrastructure': Cloud,
  'CI/CD': GitBranch,
  'REST APIs': Network,
  Webhooks: Webhook,
  'Payment Gateways': CreditCard,
  'Third-Party Systems': Puzzle,
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Puzzle
  return <Icon className={className} aria-hidden />
}
