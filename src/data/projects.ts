export interface Project {
  slug: string
  title: string
  category: string
  image?: { src: string; alt: string }
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
    slug: 'ncafe-mobile-app',
    title: 'nCafe — Mobile Application',
    category: 'Mobile Application',
    summary: 'A Google Play mobile application by Nepfinder with Google account sign-in and a published privacy policy.',
    challenge:
      'Deliver a mobile application on the Google platform with account sign-in while meeting Google Play privacy and data-deletion requirements.',
    solution:
      'Nepfinder developed the nCafe mobile application with Google sign-in, published a privacy policy, and provided a user data deletion request process on the company website.',
    outcomes: ['Published privacy policy', 'User data deletion request flow'],
    technologies: ['Mobile App', 'Google Sign-In'],
    links: [{ label: 'Privacy policy', href: '/ncafe/privacy' }],
  },
  {
    slug: 'restaurant-billing-desktop',
    title: 'Restaurant Billing — Windows Desktop Application',
    category: 'Desktop Software',
    summary: 'A Windows restaurant billing application distributed and updated from the Nepfinder website.',
    challenge: 'Restaurants needed reliable billing software that runs on standard Windows machines without constant connectivity.',
    solution: 'Nepfinder developed a desktop billing application and distributes installer updates directly from nepfinder.com.np.',
    outcomes: ['Installable Windows application', 'Update distribution from the company website'],
    technologies: ['Windows Desktop'],
    links: [{ label: 'Download installer', href: '/download/restaurant/update/NepFinderResturentBIlling.exe' }],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
