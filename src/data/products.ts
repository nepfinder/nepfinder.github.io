export interface ProductFeature {
  title: string
  text: string
}

export interface Product {
  slug: string
  name: string
  headline: string
  summary: string
  description: string
  category: string
  features: ProductFeature[]
  images: { src: string; alt: string }[]
  links: { label: string; href: string; external?: boolean }[]
  technologies?: string[]
}

/** Products and services offered by Nepfinder (nInsurance, nCafe and Restaurant Billing come from the existing website). */
export const products: Product[] = [
  {
    slug: 'enterprise-support',
    name: 'Enterprise ERP Support',
    headline: 'Enterprise ERP Support — a dedicated team, one fixed monthly price',
    summary:
      'Monthly maintenance and support for your ERP from a team of technical and functional ERP experts, available during office hours (10:00 to 18:00), for a fixed monthly fee.',
    description:
      'Enterprise ERP Support gives your business a standing team of ERP experts without hiring in-house. For one fixed price per month you get both technical and functional specialists who keep your ERPNext or other ERP system running, resolve issues, make configuration changes, and help your users during office hours, 10:00 to 18:00 on working days. The plan is sized to your organisation and billed monthly, so costs stay predictable.',
    category: 'Managed Support Plan',
    features: [
      { title: 'Fixed monthly price', text: 'One predictable fee per month, sized to your users and modules. No hourly surprises.' },
      { title: 'Technical experts', text: 'Developers who handle customisations, scripts, integrations, upgrades, backups, and server health.' },
      { title: 'Functional experts', text: 'Consultants who understand accounting, stock, sales, purchasing, HR, and manufacturing processes and configure the system accordingly.' },
      { title: 'Office hours 10:00 to 18:00', text: 'Your team can reach us during office hours on working days through email, phone, or a shared ticket channel.' },
      { title: 'Issue resolution', text: 'Bug fixes, data corrections, permission changes, and print format or report adjustments.' },
      { title: 'Changes and small enhancements', text: 'New fields, workflows, reports, and dashboards as your processes evolve.' },
      { title: 'User help desk', text: 'Answers and guidance for your staff while they work in the system.' },
      { title: 'Upgrades and monitoring', text: 'Planned version upgrades, patching, backup checks, and performance monitoring.' },
      { title: 'Monthly review', text: 'A short monthly summary of tickets, changes made, and recommendations.' },
    ],
    images: [],
    links: [{ label: 'Request a quote', href: '/contact' }],
    technologies: ['ERPNext', 'Frappe Framework', 'ERP Integrations', 'Reports & Dashboards'],
  },
  {
    slug: 'ninsurance',
    name: 'nInsurance',
    headline: 'nInsurance — Insurance Technology Solutions',
    summary:
      'A customer-facing insurance application that lets policyholders buy, renew, pay for, and claim policies while insurers track payments in real time.',
    description:
      'nInsurance was developed by Nepfinder in close coordination with major insurance companies of Nepal. The platform is robust enough to let users pay policies from their app while insurance companies track those payments in real time, and it connects to existing insurance ERP systems through a small, simplified set of API integrations.',
    category: 'Insurance Technology',
    features: [
      {
        title: 'Policy Payment',
        text: 'Users can buy and renew policies and make payments using eSewa, Khalti, and IME Pay.',
      },
      {
        title: 'Claim Policy',
        text: 'Users can submit a claim for a policy with supporting documents.',
      },
      {
        title: 'Services and Products',
        text: 'A dynamic process to add featured policies, online policies, and other products.',
      },
      {
        title: 'Premium Calculators',
        text: 'Once the required parameters are entered, the app shows calculation results in summarised and detailed form.',
      },
      {
        title: 'Easy Integration',
        text: 'Very few and simplified API integrations are required to communicate with an existing insurance ERP.',
      },
      {
        title: 'Company Information',
        text: 'Display company profile, board of directors, branches, product info, surveyors, news and notifications, and more.',
      },
      {
        title: 'Featured Policies',
        text: 'Highlighted policies that include a premium calculator, policy info page, and buy policy feature.',
      },
      {
        title: 'Branches',
        text: 'Map locations with latitude and longitude, in-charge contact info, office landline numbers, and branch search.',
      },
      {
        title: 'Buy Policies',
        text: 'Buying a policy includes the premium calculator and a user KYC information input segment.',
      },
      {
        title: 'Push Notification',
        text: 'Admins can push cloud notifications to automate services or inform users.',
      },
    ],
    images: [
      { src: '/images/ninsurance/home.webp', alt: 'nInsurance mobile app home screen showing policies, claims, and premium payment' },
      { src: '/images/ninsurance/screen-2.webp', alt: 'nInsurance mobile app screen' },
      { src: '/images/ninsurance/screen-3.webp', alt: 'nInsurance mobile app screen' },
    ],
    links: [
      {
        label: 'Preview App on Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.nlg.NLGInsurance',
        external: true,
      },
    ],
    technologies: ['Mobile Application', 'Payment Gateway Integration', 'Insurance ERP Integration', 'Push Notifications'],
  },
  {
    slug: 'ncafe',
    name: 'nCafe',
    headline: 'nCafe — Mobile Application',
    summary: 'A mobile application developed by Nepfinder and distributed through Google Play, with Google sign-in.',
    description:
      'nCafe is a mobile application developed by NepFinder and available on the Google platform. The application supports signing in with a Google account. Its privacy policy and user data deletion request process are published on this website.',
    category: 'Mobile Application',
    features: [
      { title: 'Google Sign-In', text: 'Users can sign in with their Google account.' },
      { title: 'Privacy Policy', text: 'A published privacy policy describing collected data and how it is used.' },
      { title: 'Data Deletion Requests', text: 'A self-service form for users to request deletion of their data.' },
    ],
    images: [],
    links: [
      { label: 'nCafe Privacy Policy', href: '/ncafe/privacy' },
      { label: 'User Data Deletion Request', href: '/user-data-delete-request' },
    ],
  },
  {
    slug: 'restaurant-billing',
    name: 'NepFinder Restaurant Billing',
    headline: 'Restaurant Billing — Desktop Application',
    summary: 'A Windows desktop billing application for restaurants, distributed from this website.',
    description:
      'A Windows desktop application for restaurant billing developed by Nepfinder. The installer is distributed directly from the Nepfinder website.',
    category: 'Desktop Application',
    features: [
      { title: 'Windows Desktop', text: 'Installable Windows application for restaurant point-of-sale billing.' },
      { title: 'Direct Download', text: 'Updates are published for download from nepfinder.com.np.' },
    ],
    images: [],
    links: [
      {
        label: 'Download installer (Windows, .exe)',
        href: '/download/restaurant/update/NepFinderResturentBIlling.exe',
        external: true,
      },
    ],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
