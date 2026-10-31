export interface Project {
  slug: string
  title: string
  category: string
  /** `wide` images are landscape screenshots shown edge to edge; others are phone mockups. */
  image?: { src: string; alt: string; wide?: boolean }
  summary: string
  challenge: string
  solution: string
  outcomes: string[]
  technologies: string[]
  links: { label: string; href: string }[]
}

/** Projects documented on the existing Nepfinder website and repository. */
export const projects: Project[] = [
  {
    slug: 'ninsurance-insurance-app',
    title: 'nInsurance — Insurance Customer App',
    category: 'Mobile Application · Insurance Technology',
    image: { src: '/images/ninsurance/home.webp', alt: 'nInsurance mobile application home screen' },
    summary:
      'A customer-facing insurance application developed in close coordination with major insurance companies of Nepal.',
    challenge:
      'Insurance customers needed a simple way to buy, renew, pay for, and claim policies digitally, while insurers needed to track those payments in real time and reuse their existing ERP systems.',
    solution:
      'Nepfinder built the nInsurance platform with policy purchase and renewal, digital payments via eSewa, Khalti, and IME Pay, claims with supporting documents, premium calculators, featured policies, branch maps, company information, and push notifications, integrated with insurance ERP systems through a simplified set of APIs.',
    outcomes: [
      'Published on Google Play for policyholders',
      'Real-time payment tracking for insurance companies',
      'Experience working with several major non-life insurance companies of Nepal',
    ],
    technologies: ['Mobile App', 'Payment Gateway APIs', 'Insurance ERP Integration', 'Cloud Push Notifications'],
    links: [
      { label: 'Product details', href: '/products/ninsurance' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.nlg.NLGInsurance' },
    ],
  },
  {
    slug: 'restaurant-billing-desktop',
    title: 'Restaurant Billing System',
    category: 'Restaurant Management · Desktop, Mobile & Online',
    image: { src: '/images/restaurant-billing/pos-tables.webp', alt: 'Table-wise counter billing screen', wide: true },
    summary: 'Billing, reports, stock, an owner app, and QR scan-and-pay for restaurants, hotels, and cafés across Nepal.',
    challenge:
      'Restaurants, hotels, and cafés needed fast table-wise billing at the counter, reliable records for owners, and an easier way for guests to pay, without complicated software.',
    solution:
      'Nepfinder built a Windows counter billing application with table-wise orders, one-click printing, expense and stock records, and flexible reports; the nCafe Android app for owners; QR codes on printed bills for scan-and-pay; and an online version with recipe, kitchen, and stock management and an analytical dashboard.',
    outcomes: [
      'Used by restaurants and cafés including Sakwo Resort, Cafe Tara, Himalayan Coffee Stop, and Cafe Pokhara',
      'Owners follow sales and expenses in real time on their phones',
      'Guests can pay any bill by scanning its QR code',
    ],
    technologies: ['Windows desktop', 'Android', 'Cloud sync', 'QR payments', 'eSewa', 'Khalti'],
    links: [
      { label: 'Product details', href: '/products/restaurant-billing' },
      { label: 'Download installer', href: '/download/restaurant/update/NepFinderResturentBIlling.exe' },
    ],
  },
  {
    slug: 'ncafe-mobile-app',
    title: 'nCafe — Restaurant Owner App',
    category: 'Mobile Application',
    image: { src: '/images/restaurant-billing/ncafe-play.webp', alt: 'nCafe on Google Play', wide: true },
    summary: 'An Android app that gives restaurant owners real-time sales, bills, and expenses from the billing system.',
    challenge: 'Owners wanted to see how the restaurant was doing without standing at the billing counter.',
    solution:
      'Nepfinder built nCafe, an Android app with quick information, real-time cloud data, graphical views, and Google sign-in, connected to the Restaurant Billing System. A privacy policy and data deletion request flow are published on this website.',
    outcomes: ['Published on Google Play', 'Real-time view of daily sales and expenses', 'Published privacy policy and data deletion flow'],
    technologies: ['Android', 'Cloud sync', 'Google Sign-In'],
    links: [
      { label: 'Product details', href: '/products/ncafe' },
      { label: 'Privacy policy', href: '/ncafe/privacy' },
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
