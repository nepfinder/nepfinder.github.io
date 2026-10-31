import type { LucideIcon } from 'lucide-react'
import type { InfographicKind } from '@/components/ui/Infographic'
import {
  Code2,
  Boxes,
  Database,
  Layers3,
  MonitorSmartphone,
  Plug,
  Workflow,
  BrainCircuit,
} from 'lucide-react'

export interface ServiceStep {
  title: string
  text: string
}

export interface Service {
  slug: string
  /** Set when the service has its own dedicated page instead of /services/:slug. */
  href?: string
  navLabel: string
  title: string
  short: string
  description: string
  intro: string
  icon: LucideIcon
  accent: string
  capabilities: string[]
  useCases: string[]
  steps: ServiceStep[]
  infographic: InfographicKind
  /** Plain-language summary shown at the top of the service page. */
  glance: { what: string[]; who: string }
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    slug: 'ai-implementation',
    href: '/ai-implementation',
    navLabel: 'AI Implementation',
    title: 'AI Implementation for Enterprise',
    short: 'AI assistants, agents, and MCP integrations that work with your ERP and enterprise software.',
    description:
      'Practical AI for your ERP and enterprise software: AI assistants that answer from live business data, Model Context Protocol (MCP) servers that connect AI safely to your systems, and automation across the whole company.',
    intro:
      'Nepfinder implements AI on top of the systems your business already runs, such as ERPNext and other ERP, CRM, and internal software. We connect AI assistants to your data through secure MCP servers, automate document-heavy and repetitive work, and roll it out with permissions, audit trails, and human approval where it matters.',
    icon: BrainCircuit,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'AI Assistants for ERP',
      'MCP Server Development',
      'AI Agents & Workflow Automation',
      'Document & Invoice Processing',
      'AI Reports & Insights',
      'Knowledge Base Assistants',
      'Company-wide Automation Roadmap',
      'Security, Permissions & Audit',
    ],
    useCases: [
      'Ask questions about sales, stock, or receivables in plain language and get answers from live ERP data',
      'Turn supplier invoices and purchase documents into draft ERP entries for review',
      'Let AI agents prepare follow-ups, reminders, and reports that people approve before they go out',
      'Give staff an assistant that answers from company policies, manuals, and product data',
    ],
    steps: [
      { title: 'Assess', text: 'Find the processes where AI saves the most time, with the lowest risk.' },
      { title: 'Pilot', text: 'Build one focused use case on real data and measure it with your team.' },
      { title: 'Integrate', text: 'Connect AI to ERP, CRM, and documents through secure MCP servers.' },
      { title: 'Scale & govern', text: 'Roll out across departments with permissions, audit logs, and monitoring.' },
    ],
    infographic: 'hub',
    glance: {
      what: ['AI that works with your ERP data, not beside it', 'Secure MCP connections with role-based access', 'Automation rolled out step by step, with people in control'],
      who: 'Companies running ERPNext or other enterprise software that want practical AI',
    },
    seo: {
      title: 'AI Implementation for Enterprise | ERP & MCP',
      description:
        'AI implementation for enterprise: AI assistants for ERPNext and ERP, MCP server development, AI agents, and company-wide automation by Nepfinder in Nepal.',
    },
  },
  {
    slug: 'custom-software-development',
    navLabel: 'Custom Software Development',
    title: 'Custom Software Development',
    short: 'Design and develop scalable software applications based on business requirements.',
    description:
      'We design and develop scalable software applications around real business requirements, from internal tools to enterprise-grade platforms.',
    intro:
      'Off-the-shelf software rarely fits the way a business actually operates. Nepfinder designs and builds custom software in Nepal and for remote clients, starting from your workflows and data rather than a generic template. The result is software your team adopts quickly and that can grow with the organisation.',
    icon: Code2,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'Enterprise Applications',
      'Internal Business Software',
      'Custom Dashboards',
      'Business Portals',
      'Database-Driven Applications',
      'Workflow Systems',
    ],
    useCases: [
      'Replacing spreadsheets and manual registers with a central business application',
      'Operational dashboards that consolidate data from several systems',
      'Customer, vendor, or employee portals with role-based access',
      'Workflow and approval systems for internal operations',
    ],
    steps: [
      { title: 'Requirements & scoping', text: 'Workshops to capture processes, users, data, and constraints.' },
      { title: 'Architecture & design', text: 'Data model, integrations, UI direction, and delivery roadmap.' },
      { title: 'Iterative development', text: 'Short delivery cycles with working software reviewed by your team.' },
      { title: 'Launch & support', text: 'Deployment, training, documentation, and ongoing improvements.' },
    ],
    infographic: 'blueprint',
    glance: {
      what: [
        'Software built around your processes, not a template',
        'A clear roadmap, working releases every few weeks',
        'Training, documentation, and ongoing support',
      ],
      who: 'Businesses outgrowing spreadsheets or off-the-shelf tools',
    },
    seo: {
      title: 'Custom Software Development Company in Nepal',
      description:
        'Nepfinder builds custom software, enterprise applications, dashboards, portals, and workflow systems tailored to your business requirements.',
    },
  },
  {
    slug: 'erp-implementation',
    navLabel: 'ERP Solutions & Implementation',
    title: 'ERP Solutions & Implementation',
    short: 'Implementation services that help businesses centralize and streamline their operations.',
    description:
      'End-to-end ERP consulting and implementation that centralises finance, inventory, sales, procurement, and people operations in one connected system.',
    intro:
      'An ERP project succeeds or fails on how well the system matches the business. Our ERP implementation services in Nepal cover consultation, requirements analysis, business process mapping, configuration, data migration, and user training so that the platform supports your operations from day one.',
    icon: Boxes,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'ERP Consultation',
      'Requirements Analysis',
      'ERP Configuration',
      'Business Process Mapping',
      'Data Migration',
      'User Training',
      'Technical Support',
    ],
    useCases: [
      'Moving from disconnected accounting, inventory, and sales tools to one ERP',
      'Standardising processes across multiple branches or business units',
      'Migrating historical data from legacy systems and spreadsheets',
      'Establishing reporting that management can rely on',
    ],
    steps: [
      { title: 'Business process alignment', text: 'Map current processes and define target processes in the ERP.' },
      { title: 'Configuration', text: 'Set up company structure, chart of accounts, items, warehouses, roles, and workflows.' },
      { title: 'Data migration', text: 'Clean, transform, validate, and import master and transactional data.' },
      { title: 'Training & go-live support', text: 'Role-based training, user acceptance testing, and hyper-care after launch.' },
    ],
    infographic: 'modules',
    glance: {
      what: [
        'One system for finance, stock, sales, purchasing, and people',
        'Your data migrated and your processes mapped',
        'Trained users and support after go-live',
      ],
      who: 'Growing companies with disconnected systems or branches',
    },
    seo: {
      title: 'ERP Implementation Services in Nepal',
      description:
        'ERP consulting, configuration, business process mapping, data migration, training, and support from Nepfinder, an independent ERP implementation provider in Nepal.',
    },
  },
  {
    slug: 'erpnext-implementation',
    navLabel: 'ERPNext Implementation',
    title: 'ERPNext Implementation',
    short: 'Independent ERPNext implementation and customization services.',
    description:
      'Independent ERPNext implementation, customization, data migration, and support across accounting, inventory, sales, purchasing, CRM, HR, and manufacturing.',
    intro:
      'ERPNext is a mature open-source ERP built on the Frappe Framework. Nepfinder provides independent ERPNext implementation in Nepal: we configure the modules your business needs, customise forms, print formats, and reports, migrate your data, integrate external systems, and support your team after go-live. Nepfinder is not affiliated with or endorsed by Frappe Technologies.',
    icon: Database,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'Accounting and Finance',
      'Inventory Management',
      'Sales and Purchasing',
      'CRM',
      'Human Resources',
      'Manufacturing Workflows',
      'Custom Reports',
      'ERP Integrations',
    ],
    useCases: [
      'Full ERPNext rollout for a trading, distribution, or service business',
      'ERPNext customization: custom fields, scripts, print formats, and dashboards',
      'Integrating ERPNext with payment gateways, e-commerce, or existing applications',
      'Deployment on your own servers or cloud infrastructure with ongoing maintenance',
    ],
    steps: [
      { title: 'Module selection', text: 'Identify the ERPNext modules that match your operations.' },
      { title: 'Customization', text: 'Custom fields, client and server scripts, workflows, and print formats.' },
      { title: 'Integration', text: 'Connect ERPNext to payment, e-commerce, and third-party systems via REST APIs.' },
      { title: 'Deployment & support', text: 'Production deployment, backups, upgrades, and technical support.' },
    ],
    infographic: 'modules',
    glance: {
      what: [
        'ERPNext set up for the modules you actually use',
        'Custom fields, reports, print formats, and workflows',
        'Integrations, deployment, upgrades, and support',
      ],
      who: 'Trading, distribution, service, and manufacturing businesses',
    },
    seo: {
      title: 'ERPNext Implementation in Nepal | Independent ERPNext Services',
      description:
        'Independent ERPNext implementation, customization, data migration, integration, and support in Nepal. Nepfinder is not an official Frappe partner.',
    },
  },
  {
    slug: 'frappe-framework-development',
    navLabel: 'Frappe Framework Development',
    title: 'Frappe Framework Development',
    short: 'Custom applications and business systems built on the Frappe Framework.',
    description:
      'Custom Frappe applications, DocTypes, workflows, dashboards, portals, and REST APIs that extend ERPNext or stand alone as business systems.',
    intro:
      'The Frappe Framework is a full-stack, metadata-driven web framework written in Python and JavaScript. Nepfinder develops custom Frappe applications in Nepal: new DocTypes and business modules, automated workflows, role-based permissions, reports and dashboards, customer portals, and APIs that connect your Frappe site with the rest of your technology stack.',
    icon: Layers3,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'Custom Frappe Applications',
      'Custom DocTypes',
      'Workflow Automation',
      'Custom Dashboards',
      'Role-Based Permissions',
      'Report Development',
      'API Development',
      'Portal Development',
      'Integration Services',
    ],
    useCases: [
      'Industry-specific modules that ERPNext does not cover out of the box',
      'Standalone Frappe apps for operations, compliance, or field data collection',
      'Customer or partner portals built on Frappe web views',
      'REST APIs and webhooks that expose Frappe data to mobile and web clients',
    ],
    steps: [
      { title: 'Domain modelling', text: 'Design DocTypes, relationships, naming series, and permissions.' },
      { title: 'Application development', text: 'Server-side Python logic, client scripts, and UI forms.' },
      { title: 'Reporting & portals', text: 'Script and query reports, dashboards, and portal pages.' },
      { title: 'Integration & release', text: 'APIs, webhooks, testing, deployment, and version upgrades.' },
    ],
    infographic: 'stack',
    glance: {
      what: [
        'Custom apps and modules that extend or stand beside ERPNext',
        'Portals, dashboards, and REST APIs for your teams and partners',
        'Clean upgrades thanks to app-based customisation',
      ],
      who: 'Organisations with needs that standard ERP modules do not cover',
    },
    seo: {
      title: 'Frappe Framework Development in Nepal | Custom Frappe Apps',
      description:
        'Custom Frappe Framework apps: DocTypes, workflows, dashboards, portals, and API integrations by Nepfinder, an independent Frappe developer in Nepal.',
    },
  },
  {
    slug: 'web-mobile-development',
    navLabel: 'Web & Mobile Development',
    title: 'Web & Mobile Development',
    short: 'Modern web applications and mobile experiences for customers and teams.',
    description:
      'Business websites, customer portals, web applications, mobile apps, and progressive web apps with responsive, accessible interfaces.',
    intro:
      'From customer-facing mobile applications such as our nInsurance product to internal web applications, Nepfinder builds digital experiences that are fast, responsive, and straightforward to maintain.',
    icon: MonitorSmartphone,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'Business Websites',
      'Customer Portals',
      'Web Applications',
      'Mobile Applications',
      'Progressive Web Applications',
      'Responsive User Interfaces',
    ],
    useCases: [
      'Customer self-service apps connected to back-office systems',
      'Company websites and landing pages with measurable goals',
      'Progressive web apps that work offline and install on devices',
      'Admin consoles and dashboards for web applications',
    ],
    steps: [
      { title: 'UX & content', text: 'Information architecture, flows, and interface design.' },
      { title: 'Frontend engineering', text: 'Responsive, accessible interfaces with modern frameworks.' },
      { title: 'Backend & APIs', text: 'Secure services and integrations behind the interface.' },
      { title: 'Release', text: 'App store or web deployment, analytics, and support.' },
    ],
    infographic: 'devices',
    glance: {
      what: [
        'Websites, portals, web apps, and mobile apps',
        'Fast, responsive, accessible interfaces',
        'One secure backend and API behind every screen',
      ],
      who: 'Companies that want customers and staff to self-serve',
    },
    seo: {
      title: 'Web & Mobile Application Development in Nepal',
      description:
        'Nepfinder develops business websites, web applications, customer portals, mobile apps, and progressive web apps with responsive, accessible interfaces.',
    },
  },
  {
    slug: 'api-system-integration',
    navLabel: 'API & System Integration',
    title: 'API & System Integration',
    short: 'Connect software platforms and automate information exchange.',
    description:
      'REST APIs, ERP integrations, payment gateway connections, e-commerce links, and webhook automation that keep your systems in sync.',
    intro:
      'Most organisations run several systems that do not talk to each other. Nepfinder designs and builds integrations, including the digital payment gateway integrations used in our nInsurance product, so that data flows automatically between ERP, web, mobile, and third-party platforms.',
    icon: Plug,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'REST API Development',
      'ERP Integrations',
      'Third-Party Integrations',
      'Payment Integration',
      'E-Commerce Integration',
      'Webhook Automation',
    ],
    useCases: [
      'Payment gateway integration for web and mobile applications',
      'Syncing orders, stock, and customers between e-commerce and ERP',
      'Exposing ERP data securely to partner or customer applications',
      'Event-driven automation using webhooks',
    ],
    steps: [
      { title: 'Integration mapping', text: 'Identify systems, data owners, directions, and frequencies.' },
      { title: 'API design', text: 'Contracts, authentication, error handling, and rate limits.' },
      { title: 'Implementation', text: 'Connectors, transformation logic, retries, and monitoring.' },
      { title: 'Validation', text: 'End-to-end testing with real scenarios before production.' },
    ],
    infographic: 'hub',
    glance: {
      what: [
        'Systems that exchange data automatically',
        'Payment, e-commerce, ERP, and partner connections',
        'Monitoring and retries so nothing is lost',
      ],
      who: 'Businesses re-typing data between two or more systems',
    },
    seo: {
      title: 'API Development & System Integration Services in Nepal',
      description:
        'REST API development, ERP integration, payment gateway integration, e-commerce integration, and webhook automation by Nepfinder.',
    },
  },
  {
    slug: 'business-process-automation',
    navLabel: 'Business Process Automation',
    title: 'Business Process Automation',
    short: 'Automate operational workflows and reduce repetitive business tasks.',
    description:
      'Approval workflows, automated notifications, internal operations systems, automated reporting, and document workflows that remove manual effort.',
    intro:
      'Repetitive approvals, reminders, reports, and document handling consume time that teams could spend on customers. Nepfinder analyses your processes and automates them with workflow engines, notifications, and integrated systems.',
    icon: Workflow,
    accent: 'bg-brand/10 text-brand',
    capabilities: [
      'Approval Workflows',
      'Automated Notifications',
      'Internal Operations Systems',
      'Automated Reporting',
      'Document Workflows',
      'Process Optimization',
    ],
    useCases: [
      'Multi-level purchase, leave, or expense approval flows',
      'Automatic email, SMS, or push notifications on business events',
      'Scheduled management reports delivered without manual work',
      'Document generation and routing with audit trails',
    ],
    steps: [
      { title: 'Process discovery', text: 'Document the current process, owners, and exceptions.' },
      { title: 'Optimisation', text: 'Remove unnecessary steps before automating.' },
      { title: 'Automation build', text: 'Configure workflows, rules, notifications, and reports.' },
      { title: 'Measurement', text: 'Track turnaround time and refine the process.' },
    ],
    infographic: 'flow',
    glance: {
      what: [
        'Approvals, notifications, and reports that run themselves',
        'Fewer manual steps and faster turnaround',
        'An audit trail for every action',
      ],
      who: 'Teams spending hours on repetitive internal tasks',
    },
    seo: {
      title: 'Business Process Automation Services in Nepal',
      description:
        'Automate approvals, notifications, reporting, and document workflows with Nepfinder business process automation services.',
    },
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

/** Link target for a service card, menu item, or footer link. */
export const serviceHref = (s: Pick<Service, 'slug' | 'href'>) => s.href ?? `/services/${s.slug}`
