export type PolicySection = { heading?: string; paragraphs: string[]; bullets?: string[] };
export type Policy = {
  slug: string;
  title: string;
  updated?: string;
  intro: string;
  sections: PolicySection[];
};

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    intro:
      "This website is owned and operated by Savygurlfashion LLC. These terms set forth the conditions under which you may use our website.",
    sections: [
      {
        paragraphs: [
          "When buying an item, you agree that you are responsible for reading the full item description before making a commitment to purchase. You enter into a legally binding contract to purchase an item when you commit to buy it and you complete the check-out payment process.",
          "The prices we charge for items are listed on the website. We reserve the right to change our prices at any time.",
          "We reserve the right to modify these terms from time to time at our sole discretion. You should review this page periodically. When we change the terms in a material manner, we will notify you. Your continued use of the website after any such change constitutes your acceptance of the new terms. If you do not agree to any of these terms, do not use or continue to access the website.",
          "You agree to receive from time to time promotional messages from us, by email or any other contact form you may provide us with. If you do not want to receive such promotional notices, notify us at any time.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro:
      "Savygurlfashion LLC (“we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, and mobile messaging program.",
    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: ["We only collect information necessary to process your purchase and enhance your experience, such as your name, contact details, shipping address, and order information."],
        bullets: ["We do not sell or redistribute your personal information to third parties."],
      },
      {
        heading: "2. How We Use Your Information",
        paragraphs: ["We use the collected data to process and fulfill your orders, provide customer support, improve your shopping experience, and — with your consent — send marketing communications."],
        bullets: ["If you prefer not to receive marketing messages, you can opt out at any time."],
      },
      {
        heading: "3. Mobile Messaging Terms & Conditions",
        paragraphs: [
          "By opting into our SMS/text messaging service, you agree to receive recurring messages from Savygurlfashion LLC, including order updates and promotions. Message and data rates may apply.",
          "For support, text HELP to the same number or email savygurlfashion@gmail.com. Wireless carriers are not responsible for delayed or undelivered messages.",
        ],
      },
      {
        heading: "4. Data Security & Protection",
        paragraphs: ["We implement industry-standard security measures to protect your personal information. While we strive to ensure data safety, no online transmission is 100% secure."],
      },
      {
        heading: "5. Third-Party Services & Payment Processing",
        paragraphs: ["We may use third-party services (e.g., PayPal, Afterpay, Wix Payments) to process transactions securely. These providers have their own privacy policies, and we recommend reviewing them."],
      },
      {
        heading: "6. Cookies & Tracking Technologies",
        paragraphs: ["Our website may use cookies to remember your preferences, analyze traffic, and improve your experience. By using our website, you consent to our use of cookies. You can manage cookie settings through your browser."],
      },
      {
        heading: "7. Changes to This Privacy Policy",
        paragraphs: ["We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated policy."],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    updated: "This statement was created on 7 November 2023.",
    intro: "This is an accessibility statement from Savygurlfashion LLC.",
    sections: [
      {
        heading: "Our commitment",
        paragraphs: ["Savygurlfashion LLC takes measures to ensure the accessibility of our online shop, so that as many people as possible can browse and shop with ease."],
      },
      {
        heading: "Conformance status",
        paragraphs: [
          "The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.",
          "Our online shop is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.",
        ],
      },
      {
        heading: "Feedback",
        paragraphs: [
          "We welcome your feedback on the accessibility of our online shop. Please let us know if you encounter accessibility barriers by emailing savygurlfashion@gmail.com or calling 347-669-1457.",
          "We try to respond to feedback within 2 business days.",
        ],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
