/**
 * Content for the Restaurant Billing product page.
 * Source: "NepFinder Restaurant Billing System" product brochure (2023) supplied by Nepfinder.
 */
const img = (name: string) => `/images/restaurant-billing/${name}.webp`

export const restaurantBilling = {
  audience: ['Restaurants', 'Hotels', 'Fast food corners', 'Coffee houses'],

  intro:
    'The Restaurant Management System is made for restaurants, hotels, fast food corners, coffee houses, and similar businesses. Orders are taken in the desktop application, which is easy to install and easy to use. Staff can work with a keyboard, a mouse, or a touch screen, and owners always have up-to-date billing and records.',

  /** Grouped feature lists, in the order the brochure presents them. */
  groups: [
    {
      icon: 'records',
      title: 'Keep every record',
      items: [
        'Financial, food-wise, and table-wise records for the owner, weekly, monthly, or yearly',
        "Customers' debit and credit details",
        'Expense records for your restaurant',
        'Bar stock and kitchen stock balances',
      ],
    },
    {
      icon: 'print',
      title: 'Billing and printing',
      items: [
        'Print a bill on your printer in one click',
        'Custom header and footer message on every bill',
        'Works with many printers',
        'Save income, expense, and stock reports as PDF',
      ],
    },
    {
      icon: 'settings',
      title: 'Simple settings',
      items: [
        'Add tables in seconds',
        'Service tax, service charge, and discounts',
        'Add products manually, or import and export by CSV',
        'Change menu prices easily',
        'Import and export backups',
      ],
    },
    {
      icon: 'reports',
      title: 'Reports when you need them',
      items: [
        'Financial, food-wise, and table-wise reports',
        'Today, yesterday, last 7 days, this month, last month',
        'Any custom date range',
      ],
    },
  ],

  /** The three parts of the system. */
  apps: [
    {
      key: 'counter',
      title: 'Counter billing software',
      platform: 'Windows desktop',
      text: 'Table-wise ordering, billing, and printing at the counter. Staff log in with their own PIN.',
      image: { src: img('pos-tables'), alt: 'Counter billing screen showing open tables with their orders and totals' },
    },
    {
      key: 'owner',
      title: 'Restaurant owner app',
      platform: 'Android · nCafe',
      text: 'Owners see today’s sales, bills, quantities, expenses, and cash balance from their phone, with real-time cloud data and graphs.',
      image: { src: img('owner-app'), alt: 'Restaurant owner mobile app showing total sales, bills, and expenses for the day' },
    },
    {
      key: 'scan',
      title: 'Scan & pay bill',
      platform: 'Any QR scanner',
      text: 'Each printed bill carries a QR code. Guests scan it with their phone and pay online with digital wallets such as eSewa, Khalti, and SCT nPay.',
      image: { src: img('scan-pay'), alt: 'A guest scanning the QR code on a printed bill with a phone to pay' },
    },
  ],

  online: {
    title: 'Online application',
    text: 'For restaurants and cafés that want everything in the cloud, the online application adds recipe, kitchen, and stock management with analytical reports and a graphical dashboard.',
    items: ['Café recipe management', 'Kitchen and stock management', 'Data analytical reports', 'Graphical analytical dashboard', 'Other customised features'],
    images: [
      { src: img('online-app'), alt: 'Online café application home with accounting, stock, customers, vendors, menu, and reports' },
      { src: img('dashboard'), alt: 'Graphical analytical dashboard with income, expense, and profit charts' },
    ],
  },

  gallery: [
    { src: img('table-order'), alt: 'Order panel for a single table with service charge, discount, and total bill', caption: 'Order panel per table' },
    { src: img('printer-settings'), alt: 'Printer settings with a live preview of the printed bill', caption: 'Printer setup with bill preview' },
    { src: img('income-report'), alt: 'Income report listing bills with tax, discount, and grand totals', caption: 'Income report' },
    { src: img('analysis-report'), alt: 'Analysis report showing item-wise sales for a date range', caption: 'Food-wise analysis report' },
    { src: img('income-report-v2'), alt: 'Income report with a bill preview and export to Excel, PDF, and HTML', caption: 'Export to Excel, PDF, or HTML' },
    { src: img('pin-login'), alt: 'Staff PIN login keypad', caption: 'Staff PIN login' },
  ],

  /** Clients named in the brochure's "Existing clients" section. Listed by name only. */
  clients: [
    'Sakwo Resort',
    'Cafe Tara',
    'Nepalaya Kitchen',
    'Sunrise Cafe',
    'Padhmajyoti',
    'Hot Pot Restaurant, Thamel',
    'Himalayan Coffee Stop',
    'The Divine Taste',
    'Mazzako Coffee House',
    'Cafe Pokhara',
    'Tiffany Restaurant',
    'Friendship Cafe Restaurant',
    'A One Taj Mahal',
    'China Valley Restaurant',
  ],
}
