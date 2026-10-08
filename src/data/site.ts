import type { SiteConfig } from "@/types/site";
import { PRIVACY_POLICY_PATH } from "@/data/privacy";

export const siteConfig: SiteConfig = {
  name: "ParamShree",
  tagline: "ASSOCIATES",
  logo: {
    svgMark: false,
    markText: "PS",
    wordmark: "ParamShree",
    channelPartner: "ASSOCIATES",
    image: {
      src: "/images/logo/logo1.png",
      alt: "ParamShree logo",
      width: 1565,
      height: 1005,
    },
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
    eyebrow: "CHANNEL PARTNER OF",
    heading: "Own Your Private Retreat Near Haridwar",
    subheading: "600 Sq. Yd. Farmhouse | Private Villa | Private Pool | 100+ Experiences",
    /** Set only once ParamShree approves "Authorised Channel Partner" for use. */
    badge: undefined,
    brandLine: "SOUL Prakriti — by SOUL Agrofarms, powered by ETH Infra",
    primaryCta: {
      label: "GET PRICE & OFFERS",
      href: "#enquiry",
      variant: "primary",
    },
    secondaryCta: {
      label: "WHATSAPP US",
      href: "#enquiry",
      variant: "secondary",
    },
    tertiaryCta: {
      label: "BOOK SITE VISIT",
      href: "#enquiry?intent=site-visit",
      variant: "secondary",
    },
    offer: {
      heading: "Special Channel Partner Benefits*",
      items: [
        "Priority Inventory Assistance",
        "Payment Plan Assistance",
        "Site Visit Coordination",
      ],
    },
    whatsapp: {
      message:
        "Hi, I would like price and offers for SOUL Prakriti farmhouses and villas. Please share the details.",
      unconfiguredNotice:
        "Our WhatsApp number is being confirmed. Please use the enquiry form and our team will get in touch.",
    },
    backgroundImage: "/images/gallery/full villa structure at day.jpeg",
    // Supplied clips are 9-11 MB, too heavy to autoplay behind the fold.
    backgroundVideo: undefined,
  },
  footer: {
    description:
      "Partnering with SOUL Agro Farms Pvt. Ltd. to bring you SOUL Prakriti, a serene community of farmhouses and villas, powered by ETH Infra Pvt. Ltd.",
    quickLinks: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Developers", href: "#developers" },
      { label: "Amenities", href: "#amenities" },
      { label: "Contact Us", href: "#contact" },
    ],
    projects: [
      { label: "SOUL Prakriti Villa", href: "#projects" },
      { label: "SOUL Prakriti Farmhouse", href: "#projects" },
    ],
    social: [],
    newsletter: {
      heading: "Newsletter",
      description: "Stay updated with the latest updates and offerings.",
      enabled: false,
    },
    bottomLinks: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: PRIVACY_POLICY_PATH },
    ],
    copyrightYear: new Date().getFullYear(),
  },
};
