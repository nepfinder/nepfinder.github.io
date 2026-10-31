import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  Boxes,
  ClipboardCheck,
  FileSearch,
  Headset,
  LineChart,
  Lock,
  MessageSquareText,
  Network,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
} from 'lucide-react'

/** Content for the AI Implementation for Enterprise page. Describes the service; no client results are claimed. */

export const aiOfferings: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageSquareText,
    title: 'AI assistants for your ERP',
    text: 'Ask about sales, stock, receivables, or orders in plain language. Answers come from live ERPNext or ERP data, with links back to the records.',
  },
  {
    icon: Network,
    title: 'MCP server development',
    text: 'We build Model Context Protocol (MCP) servers that let AI assistants such as Claude or ChatGPT read and act on your systems through controlled, permission-aware tools.',
  },
  {
    icon: Workflow,
    title: 'AI agents & workflow automation',
    text: 'Agents that prepare follow-ups, reconcile data, draft purchase orders, or route approvals, with a person approving anything that matters.',
  },
  {
    icon: FileSearch,
    title: 'Document & invoice processing',
    text: 'Read supplier invoices, receipts, and forms, then create draft entries in your ERP for review instead of typing them by hand.',
  },
  {
    icon: LineChart,
    title: 'AI reports & insights',
    text: 'Plain-language summaries of trends, exceptions, and risks from your data, delivered on a schedule or on request.',
  },
  {
    icon: ScrollText,
    title: 'Knowledge assistants',
    text: 'Assistants that answer staff questions from policies, manuals, product data, and past tickets, inside the tools they already use.',
  },
]

/** Example use cases by department. Presented as what the service can do, not as past projects. */
export const aiDepartments: { icon: LucideIcon; name: string; examples: string[] }[] = [
  { icon: Banknote, name: 'Finance', examples: ['Draft entries from supplier invoices', 'Overdue receivables summary each morning', 'Explain variances in plain language'] },
  { icon: ShoppingCart, name: 'Sales & CRM', examples: ['Lead follow-up drafts', 'Quotation from a customer email', 'Pipeline summary for managers'] },
  { icon: Boxes, name: 'Stock & procurement', examples: ['Reorder suggestions from stock levels', 'Purchase order drafts for approval', 'Supplier comparison'] },
  { icon: Users, name: 'HR', examples: ['Policy and leave questions answered', 'Onboarding checklists', 'Attendance exception reports'] },
  { icon: ClipboardCheck, name: 'Operations', examples: ['Approval routing', 'Daily operations digest', 'Data quality checks'] },
  { icon: Headset, name: 'Customer support', examples: ['Answers from manuals and past tickets', 'Ticket triage and tagging', 'Reply drafts for agents'] },
]

/** Systems an MCP server can connect AI assistants to. */
export const mcpSystems = ['ERPNext / ERP', 'CRM', 'Documents & files', 'Email & chat', 'Databases', 'Custom apps']

export const mcpGuardrails: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Lock, title: 'Role-based access', text: 'The assistant only sees and does what the signed-in user is allowed to in the ERP.' },
  { icon: UserCheck, title: 'Human approval', text: 'Actions such as posting entries or sending messages wait for a person to approve.' },
  { icon: ShieldCheck, title: 'Audit trail', text: 'Every tool call is logged with who asked, what ran, and what changed.' },
  { icon: Sparkles, title: 'Your choice of model', text: 'Works with leading AI models; sensitive data can stay on infrastructure you control.' },
]

/** Rollout steps for company-wide automation. */
export const aiRoadmap = [
  { title: 'Assess', text: 'Map processes and data, and pick the use cases with the best time saving and lowest risk.' },
  { title: 'Pilot', text: 'Build one focused use case on real data with a small team and measure the result.' },
  { title: 'Integrate', text: 'Connect AI to ERP, CRM, and documents through secure MCP servers and APIs.' },
  { title: 'Automate', text: 'Extend to agents and workflows across departments, with approvals where needed.' },
  { title: 'Govern & improve', text: 'Monitor usage, cost, and quality; train teams; refine prompts and permissions.' },
]

export const aiFaqs: { q: string; a: string }[] = [
  {
    q: 'What does AI implementation for enterprise include?',
    a: 'It covers choosing the right use cases, connecting AI to your ERP and business systems, building assistants, agents, and automations, and putting security, permissions, and monitoring in place so the solution can be used safely across the company.',
  },
  {
    q: 'What is MCP (Model Context Protocol)?',
    a: 'MCP is an open standard that lets AI assistants use tools and data from other systems in a consistent way. An MCP server for your ERP exposes specific, permission-checked actions, such as looking up an invoice or drafting a purchase order, instead of giving the AI open access to your database.',
  },
  {
    q: 'Do we need to replace our ERP to use AI?',
    a: 'No. We add AI on top of the systems you already use, such as ERPNext, other ERP or CRM platforms, and internal applications, through APIs and MCP servers.',
  },
  {
    q: 'Is our business data safe?',
    a: 'Access follows your existing user roles, actions that change data can require human approval, and every request is logged. Where needed, models and data can run on infrastructure you control.',
  },
  {
    q: 'Can AI work with ERPNext and the Frappe Framework?',
    a: 'Yes. ERPNext and Frappe expose REST APIs that an MCP server or AI agent can use. Nepfinder provides independent ERPNext and Frappe services and is not affiliated with Frappe Technologies.',
  },
  {
    q: 'How do we get started?',
    a: 'Start with a short assessment. We look at your processes and data, recommend one pilot use case, and agree on how to measure success before building anything larger.',
  },
]
