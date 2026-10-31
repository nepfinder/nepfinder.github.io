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
    headline: 'A dedicated ERP team. One fixed monthly price.',
    summary:
      'Monthly ERP maintenance and support from technical and functional ERP experts, available 10:00 to 18:00 on working days, for one fixed monthly fee.',
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
    slug: 'restaurant-billing',
    name: 'Restaurant Billing',
    headline: 'Restaurant Billing Software 2.0',
    summary:
      'Counter billing, reports, and stock for restaurants, hotels, fast food corners, and coffee houses, with an owner app and QR scan-and-pay bills.',
    description:
      'The Nepfinder Food Billing System is restaurant management software for restaurants, hotels, fast food corners, and coffee houses. Staff take orders and print bills from the Windows counter application; owners follow sales, expenses, and stock from the nCafe Android app; and guests can pay any bill by scanning its QR code. An online version adds recipe, kitchen, and stock management with an analytical dashboard.',
    category: 'Restaurant Management',
    features: [
      { title: 'Table-wise billing', text: 'Take orders per table and print the bill on your printer in one click.' },
      { title: 'Records & reports', text: 'Financial, food-wise, and table-wise reports for any period, exported as PDF, Excel, or HTML.' },
      { title: 'Stock & expenses', text: 'Bar and kitchen stock balances, expense records, and customer debit and credit.' },
      { title: 'Owner app', text: 'Sales, bills, and expenses on the owner’s phone with the nCafe Android app.' },
      { title: 'Scan & pay', text: 'A QR code on every bill so guests can pay with digital wallets.' },
      { title: 'Online version', text: 'Recipe, kitchen, and stock management with a graphical dashboard.' },
    ],
    images: [{ src: '/images/restaurant-billing/hero.webp', alt: 'Restaurant billing software on a desktop monitor with the owner app on two phones' }],
    links: [
      { label: 'Download for Windows', href: '/download/restaurant/update/NepFinderResturentBIlling.exe', external: true },
      { label: 'Owner app: nCafe', href: '/products/ncafe' },
    ],
    technologies: ['Windows desktop', 'Android', 'QR payments', 'Cloud reports'],
  },
  {
    slug: 'ncafe',
    name: 'nCafe',
    headline: 'nCafe — Restaurant Owner App',
    summary: 'The Android app for owners using Nepfinder Restaurant Billing: today’s sales, bills, expenses, and cash balance in real time.',
    description:
      'nCafe is the restaurant owner app that works with Nepfinder Restaurant Billing. It brings quick information, real-time cloud data, and graphical views of the business to the owner’s phone, so sales, bills, quantities, expenses, and cash balance can be checked from anywhere. nCafe is available on Google Play and supports signing in with a Google account.',
    category: 'Mobile Application',
    features: [
      { title: 'Quick information', text: 'Today’s total sales, number of bills, quantities sold, and first and last bill times at a glance.' },
      { title: 'Real-time cloud data', text: 'Figures sync from the counter billing software to the cloud as the day goes on.' },
      { title: 'Graphical view', text: 'Charts that make trends in sales and expenses easy to read.' },
      { title: 'Easy planning', text: 'Use daily and monthly figures to plan stock, staff, and spending.' },
      { title: 'Google sign-in', text: 'Sign in securely with a Google account.' },
      { title: 'Privacy first', text: 'A published privacy policy and a self-service data deletion request.' },
    ],
    images: [{ src: '/images/restaurant-billing/ncafe-play.webp', alt: 'nCafe on Google Play with screenshots of quick information, real-time cloud data, and graphical view' }],
    links: [
      { label: 'Restaurant Billing', href: '/products/restaurant-billing' },
      { label: 'nCafe Privacy Policy', href: '/ncafe/privacy' },
      { label: 'User Data Deletion Request', href: '/user-data-delete-request' },
    ],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
