import type { LucideIcon } from 'lucide-react'
import {
  Store,
  Truck,
  ShieldCheck,
  Factory,
  Briefcase,
  ShoppingCart,
  Building2,
} from 'lucide-react'

export interface Industry {
  slug: string
  name: string
  icon: LucideIcon
  text: string
  solutions: string[]
  verified?: boolean
}

/**
 * Industries our solutions can support. Only `verified` entries reflect documented
 * Nepfinder product experience (nInsurance with Nepali insurance companies).
 */
export const industries: Industry[] = [
  {
    slug: 'insurance',
    name: 'Insurance',
    icon: ShieldCheck,
    verified: true,
    text: 'Customer apps for policy purchase, renewal, payment, and claims connected to insurance ERP systems.',
    solutions: ['Policy & claims apps', 'Premium calculators', 'Payment gateway integration', 'ERP integration'],
  },
  {
    slug: 'retail-distribution',
    name: 'Retail & Distribution',
    icon: Store,
    text: 'Inventory, sales, purchasing, and accounting on one platform with branch-level visibility.',
    solutions: ['ERPNext for trading', 'Stock & warehouse control', 'Point-of-sale billing', 'Sales dashboards'],
  },
  {
    slug: 'logistics-delivery',
    name: 'Logistics & Delivery',
    icon: Truck,
    text: 'Dispatch, tracking, and billing workflows that keep operations and customers informed.',
    solutions: ['Order & dispatch systems', 'Delivery tracking apps', 'Automated notifications', 'Route & fleet data'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    text: 'Bills of materials, work orders, production planning, and quality records in ERPNext.',
    solutions: ['Manufacturing module setup', 'BOM & work orders', 'Material planning', 'Shop-floor reports'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    icon: Briefcase,
    text: 'Projects, timesheets, billing, and client portals for service organisations.',
    solutions: ['Project & timesheet tracking', 'Client portals', 'Invoicing automation', 'Resource reports'],
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    icon: ShoppingCart,
    text: 'Storefronts integrated with ERP so stock, orders, and payments stay in sync.',
    solutions: ['E-commerce to ERP sync', 'Payment integration', 'Order workflows', 'Customer accounts'],
  },
  {
    slug: 'enterprise-operations',
    name: 'Enterprise Operations',
    icon: Building2,
    text: 'Approval workflows, document management, HR, and reporting for growing organisations.',
    solutions: ['Approval & document workflows', 'HR & payroll setup', 'Management dashboards', 'System integration'],
  },
]
