/**
 * Buyer questions answered on each service page (and emitted as FAQPage structured data).
 * Keep answers factual and consistent with services.ts: no prices, timelines, client names,
 * partnerships, or certifications that the company has not published.
 */
export interface Faq {
  q: string
  a: string
}

export const serviceFaqs: Record<string, Faq[]> = {
  'iot-products-enterprise': [
    {
      q: 'Which devices and sensors can Nepfinder connect?',
      a: 'Nepfinder designs the device and gateway layer around your use case, such as stock and asset tags, temperature and humidity sensors, machine status and counters, energy meters, and vehicle or location trackers. The hardware choice depends on your site, power, and connectivity.',
    },
    {
      q: 'Does IoT data go into our ERP?',
      a: 'Yes. Readings can create ERP records, update stock, or start maintenance and reorder workflows through APIs, so people approve actions instead of checking dashboards by hand.',
    },
    {
      q: 'How does AI fit with IoT?',
      a: 'AI works on the history of device readings. Once enough data is collected, models can flag unusual patterns, forecast demand or maintenance needs, and support planning decisions. Models start simple and improve as the data grows.',
    },
  ],
  'erpnext-implementation': [
    {
      q: 'Is Nepfinder an official ERPNext or Frappe partner?',
      a: 'No. Nepfinder is an independent ERPNext implementation provider in Kathmandu, Nepal. It is not an official partner of, affiliated with, or endorsed by Frappe Technologies. ERPNext and Frappe are trademarks of Frappe Technologies Pvt. Ltd.',
    },
    {
      q: 'Which ERPNext modules can Nepfinder implement?',
      a: 'Nepfinder configures the modules a business actually uses, including accounting and finance, inventory, sales and purchasing, CRM, human resources, and manufacturing workflows, along with custom reports and integrations.',
    },
    {
      q: 'Can ERPNext be customised for how my business works?',
      a: 'Yes. Typical customisation includes custom fields, client and server scripts, workflows, print formats, reports, and dashboards. Larger needs can be built as a separate Frappe app so standard ERPNext upgrades stay clean.',
    },
    {
      q: 'Can you move our existing data into ERPNext?',
      a: 'Yes. Data migration is part of the implementation: master and transactional data from spreadsheets or legacy systems is cleaned, transformed, validated, and imported before go-live.',
    },
    {
      q: 'Where is ERPNext hosted, and who supports it after go-live?',
      a: 'ERPNext can be deployed on your own servers or on cloud infrastructure. Nepfinder handles production deployment, backups, upgrades, and technical support, and also offers a fixed monthly Enterprise ERP Support plan.',
    },
  ],
  'frappe-framework-development': [
    {
      q: 'What is the Frappe Framework?',
      a: 'Frappe is a full-stack, metadata-driven web framework written in Python and JavaScript. ERPNext is built on it, and it can also be used to build standalone business applications.',
    },
    {
      q: 'When should I build a custom Frappe app instead of customising ERPNext directly?',
      a: 'A custom Frappe app suits industry-specific modules, standalone operational or compliance systems, portals, and anything ERPNext does not cover out of the box. Keeping changes in an app makes ERPNext upgrades cleaner.',
    },
    {
      q: 'What does Nepfinder build with Frappe?',
      a: 'Custom DocTypes and business modules, workflow automation, role-based permissions, script and query reports, dashboards, customer or partner portals, and REST APIs and webhooks for web and mobile clients.',
    },
    {
      q: 'Is Nepfinder affiliated with Frappe Technologies?',
      a: 'No. Nepfinder is an independent Frappe developer in Nepal and is not an official partner of, or affiliated with, Frappe Technologies.',
    },
  ],
  'erp-implementation': [
    {
      q: 'What does an ERP implementation with Nepfinder include?',
      a: 'Consultation, requirements analysis, business process mapping, configuration, data migration, role-based user training, user acceptance testing, and support after go-live.',
    },
    {
      q: 'Which ERP does Nepfinder implement?',
      a: 'Nepfinder specialises in ERPNext and the Frappe Framework, and also supports other ERP systems through its Enterprise ERP Support plan.',
    },
    {
      q: 'Is ERP suitable for a business with several branches?',
      a: 'Yes. Standardising processes across branches or business units and giving management one set of reliable reports are common reasons to implement an ERP.',
    },
  ],
  'custom-software-development': [
    {
      q: 'When does custom software make more sense than an off-the-shelf product?',
      a: 'When a business has outgrown spreadsheets or packaged tools and needs software that follows its own workflows, data, and approval rules, such as internal business systems, dashboards, portals, or workflow applications.',
    },
    {
      q: 'How does Nepfinder run a custom software project?',
      a: 'Requirements and scoping workshops, then architecture and design, then short iterative delivery cycles with working software reviewed by your team, followed by deployment, training, documentation, and ongoing support.',
    },
    {
      q: 'Does Nepfinder work with clients outside Kathmandu?',
      a: 'Yes. Nepfinder is based in Basundhara, Kathmandu, and builds custom software for clients across Nepal and for remote clients.',
    },
  ],
  'web-mobile-development': [
    {
      q: 'What kinds of web and mobile apps does Nepfinder build?',
      a: 'Business websites, customer portals, web applications, mobile applications, and progressive web apps, all backed by secure APIs. Nepfinder’s own nInsurance app is an example of a customer-facing mobile product.',
    },
    {
      q: 'Can a mobile app connect to our ERP or back-office system?',
      a: 'Yes. Customer self-service apps are typically connected to back-office systems such as ERPNext through REST APIs.',
    },
  ],
  'api-system-integration': [
    {
      q: 'Can Nepfinder integrate payment gateways?',
      a: 'Yes. Nepfinder builds payment gateway integrations for web and mobile applications, including the digital payment integrations used in its nInsurance product.',
    },
    {
      q: 'Can you sync our e-commerce store with ERPNext?',
      a: 'Yes. Orders, stock, and customer records can be kept in sync between an e-commerce platform and the ERP using APIs and webhooks, with monitoring and retries so data is not lost.',
    },
  ],
  'business-process-automation': [
    {
      q: 'Which business processes can be automated?',
      a: 'Common examples are multi-level purchase, leave, and expense approvals; automatic email, SMS, or push notifications; scheduled management reports; and document generation and routing with audit trails.',
    },
    {
      q: 'Do you automate the process as it is today?',
      a: 'No. The current process is documented first and unnecessary steps are removed before anything is automated, then turnaround time is tracked to refine it.',
    },
  ],
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
