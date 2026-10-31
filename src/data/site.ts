export const site = {
  name: 'Nepfinder',
  legalName: 'NepFinder',
  url: 'https://nepfinder.com.np',
  tagline: 'Engineering Software. Empowering Businesses.',
  positioning: 'Software Development & Enterprise ERP Solutions',
  description:
    'Nepfinder is a software development company in Nepal delivering custom software, ERP implementation, ERPNext customization, Frappe Framework development, and system integration services.',
  // Verified facts from the existing website and repository README.
  foundedDate: '2014-03-30',
  email: 'info@nepfinder.com.np',
  location: 'Nepal',
  social: {
    twitter: 'https://www.twitter.com/nepfinder',
    instagram: 'https://www.instagram.com/nepfinder',
  },
  logo: {
    wordmark: '/logos/nepfinder-logo.png',
    icon: '/logos/nepfinder-icon.png',
    mark: '/logos/nepfinder-mark.svg',
  },
  /**
   * Optional contact form endpoint (e.g. a Formspree / Getform / Web3Forms URL).
   * Configure through VITE_CONTACT_ENDPOINT at build time. When unset, the contact
   * form falls back to composing an email to the company inbox.
   */
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
  trademarkNotice:
    'Nepfinder is an independent software development and ERP implementation provider and is not an official partner of or affiliated with Frappe Technologies. ERPNext and Frappe are trademarks of Frappe Technologies Pvt. Ltd.',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services', children: true },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact Us', to: '/contact' },
] as const
