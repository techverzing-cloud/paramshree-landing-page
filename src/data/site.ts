import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "ParamShree",
  tagline: "CHANNEL PARTNER",
  logo: {
    svgMark: true,
    markText: "PS",
    wordmark: "ParamShree",
    channelPartner: "CHANNEL PARTNER",
  },
  navLinks: [
    { label: "About", href: "#about", type: "anchor" },
    { label: "Projects", href: "#projects", type: "anchor" },
    { label: "Developers", href: "#developers", type: "anchor" },
    { label: "Amenities", href: "#amenities", type: "anchor" },
    { label: "Contact Us", href: "#contact", type: "anchor" },
  ],
  enquiry: {
    href: "#enquiry",
    label: "Enquire Now",
  },
  contact: {
    phone: undefined,
    // Single source of truth for the WhatsApp CTA and the footer link.
    // TODO: replace this placeholder with ParamShree's real, verified WhatsApp
    // number (country code + number, no "+", spaces or dashes).
    whatsapp: "https://wa.me/919999999999",
    email: undefined,
    officeLocation: undefined,
  },
  hero: {
    eyebrow: "EXCLUSIVE CHANNEL PARTNER OF",
    heading: "SOUL PRAKRITI",
    subheading: "A New Way of Living, Closer to Nature",
    description:
      "Thoughtfully designed farmhouses and villas set in a serene, wellness-focused community by SOUL Agro Farms Pvt. Ltd., powered by ETH Infra Pvt. Ltd.",
    primaryCta: {
      label: "Enquire Now",
      href: "#enquiry",
      variant: "primary",
    },
    secondaryCta: {
      label: "Visit a Site",
      href: "#enquiry?intent=site-visit",
      variant: "secondary",
    },
    features: [
      { label: "Nature Connected Living" },
      { label: "Wellness Focused Community" },
      { label: "Thoughtful Landscapes" },
      { label: "Modern Lifestyle Amenities" },
    ],
    backgroundImage: undefined,
    backgroundVideo: undefined,
  },
  footer: {
    description:
      "Partnering with SOUL Agro Farms Pvt. Ltd. to bring you SOUL Prakriti  a serene community of farmhouses and villas, powered by ETH Infra Pvt. Ltd.",
    quickLinks: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Developers", href: "#developers" },
      { label: "Amenities", href: "#amenities" },
      { label: "Contact Us", href: "#contact" },
    ],
    projects: [
      { label: "A Day at SOUL", href: "#projects" },
      { label: "SOUL Prakriti Villa", href: "#projects" },
      { label: "SOUL Prakriti Farmhouse", href: "#projects" },
      { label: "Location", href: "#location" },
      { label: "Channel Partner Advantages", href: "#advantages" },
    ],
    social: [],
    newsletter: {
      heading: "Newsletter",
      description: "Stay updated with the latest updates and offerings.",
      enabled: false,
    },
    bottomLinks: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
    copyrightYear: new Date().getFullYear(),
  },
};
