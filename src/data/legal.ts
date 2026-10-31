export interface PolicySection {
  heading: string
  intro?: string
  items?: { title: string; text: string }[]
  text?: string
}

/** nCafe privacy policy, carried over from the previous website. */
export const ncafePrivacy: { title: string; sections: PolicySection[] } = {
  title: 'Privacy Policy for nCafe App on Google',
  sections: [
    {
      heading: 'Introduction',
      text: 'Welcome to nCafe, a mobile application developed by NepFinder, available on the Google platform. At NepFinder, we are committed to protecting your privacy and ensuring the security of your personal information when using the nCafe app on Google. This Privacy Policy outlines how we collect, use, disclose, and protect your data.',
    },
    {
      heading: 'Information we collect',
      items: [
        { title: 'Google account information', text: 'When you sign in to nCafe with your Google account, we may collect basic information associated with your Google profile, such as your name and email address.' },
        { title: 'Usage and device information', text: 'We collect information about your interactions with the app, including features used and content viewed. Device information, such as device type and unique identifiers, may also be collected.' },
      ],
    },
    {
      heading: 'How we use your information',
      intro: 'We use the collected information for the following purposes:',
      items: [
        { title: 'Providing and improving services', text: 'To deliver and maintain the nCafe app on the Google platform, enhance user experience, and develop new features.' },
        { title: 'Google services integration', text: 'To leverage Google services for authentication and to enhance app functionality.' },
        { title: 'Analytics', text: 'To analyze usage patterns, track trends, and improve the performance and functionality of the nCafe app on Google.' },
      ],
    },
    {
      heading: 'Data sharing and disclosure',
      intro: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy or as required by law.',
      items: [
        { title: 'Google services', text: 'We may share relevant information with Google services to provide seamless integration and enhance the user experience.' },
        { title: 'Service providers', text: 'We may engage third-party service providers to assist in delivering and improving the nCafe app on the Google platform.' },
        { title: 'Legal requirements', text: 'We may disclose your information if required by law or in response to a valid legal request.' },
      ],
    },
    {
      heading: 'Data security',
      text: 'We employ reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction on the Google platform.',
    },
    {
      heading: 'Your choices',
      text: 'You have the right to access, correct, or delete your personal information associated with the nCafe app on Google. Manage your preferences within the app or your Google account settings, or submit a data deletion request on this website.',
    },
    {
      heading: 'Changes to this privacy policy',
      text: 'We may update this Privacy Policy from time to time. Any changes will be posted within the app or on our website, and the updated date will be indicated at the top of the policy.',
    },
    {
      heading: 'Contact us',
      text: 'If you have any questions or concerns about this Privacy Policy, please contact us at info@nepfinder.com.np.',
    },
  ],
}

/** Google Form used for user data deletion requests (carried over from the previous website). */
export const dataDeletionFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSdd1Tl_sUO2RZuYz_anEi06CeItqM8iJyGqXNm_2yIP8uu5Nw/viewform'
