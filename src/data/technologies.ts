export interface TechGroup {
  category: string
  items: { name: string; note: string }[]
}

/**
 * Technologies offered by Nepfinder. Grouped to match the services we provide;
 * the nInsurance product demonstrates mobile, payment, and ERP integration work.
 */
export const technologies: TechGroup[] = [
  {
    category: 'Enterprise Platforms',
    items: [
      { name: 'ERPNext', note: 'Open-source ERP implementation and customization' },
      { name: 'Frappe Framework', note: 'Full-stack Python/JS framework for business apps' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', note: 'Frappe apps, APIs, automation' },
      { name: 'Node.js', note: 'Services, integrations, tooling' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', note: 'Interactive web applications' },
      { name: 'Next.js', note: 'Server-rendered React sites' },
      { name: 'TypeScript', note: 'Typed, maintainable frontend code' },
      { name: 'JavaScript', note: 'Web and Frappe client scripting' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MariaDB', note: 'Default database for ERPNext and Frappe' },
      { name: 'PostgreSQL', note: 'Relational data for custom applications' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { name: 'Linux', note: 'Server administration and deployment' },
      { name: 'Docker', note: 'Containerised environments' },
      { name: 'Cloud Infrastructure', note: 'Hosting on cloud or on-premise servers' },
      { name: 'CI/CD', note: 'Automated builds and deployments' },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { name: 'REST APIs', note: 'System-to-system communication' },
      { name: 'Webhooks', note: 'Event-driven automation' },
      { name: 'Payment Gateways', note: 'eSewa, Khalti, and IME Pay integrations' },
      { name: 'Third-Party Systems', note: 'ERP, e-commerce, and SaaS connectors' },
    ],
  },
]
