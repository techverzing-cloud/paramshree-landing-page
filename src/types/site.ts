export interface NavLink {
  label: string;
  href: string;
  type?: "link" | "anchor" | "button";
}

export interface CTA {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface FooterLinkGroup {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logo: {
    svgMark?: boolean;
    markText?: string;
    wordmark: string;
    channelPartner: string;
    image?: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    };
  };
  navLinks: NavLink[];
  enquiry: {
    href: string;
    label: string;
  };
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    officeLocation?: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    /** Omitted from the page until usage is approved. */
    badge?: string;
    brandLine: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    tertiaryCta: CTA;
    offer: {
      heading: string;
      items: string[];
    };
    whatsapp: {
      /** Prefilled text. WhatsApp is only opened with it; nothing is sent here. */
      message: string;
      unconfiguredNotice: string;
    };
    backgroundImage?: string;
    backgroundVideo?: string;
  };
  footer: {
    description: string;
    quickLinks: Array<{ label: string; href: string }>;
    projects: Array<{ label: string; href: string }>;
    social?: Array<{ label: string; href: string }>;
    newsletter: {
      heading: string;
      description: string;
      enabled: boolean;
    };
    bottomLinks: Array<{ label: string; href: string }>;
    copyrightYear: number;
  };
}
