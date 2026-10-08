export interface AboutTrustFeature {
  title: string;
  icon: "user-check" | "shield-check" | "headset";
}

export interface AboutPillar {
  title: string;
  description: string;
  icon: "space" | "privacy" | "nature" | "experience";
}

export interface AboutPriceAdvantage {
  eyebrow: string;
  heading: string;
  description: string;
  /** Compact label/value fact rows. Values are "on request" until approved data lands. */
  facts: Array<{ label: string; value: string }>;
  benefitHeading: string;
  benefitDescription: string;
  ctaLabel: string;
  ctaIntent: string;
}

export interface AboutAdvantage {
  title: string;
  description: string;
  icon: "badge-check" | "sparkles" | "home" | "map-pin" | "file-text" | "user";
}

export interface AboutConversion {
  hook: string;
  ctaLabel: string;
  ctaIntent: string;
}

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  altText: string;
  bgColor: string;
  /** Small overline label shown inside the card above the heading. */
  eyebrow?: string;
  /** Optional four-point visual explanation, currently only on "Why SOUL Prakriti". */
  pillars?: AboutPillar[];
  /** Optional price + channel-partner card, replaces the generic body when present. */
  priceAdvantage?: AboutPriceAdvantage;
  /** Optional compact 2-column advantage grid, currently only on "Why Buy Through ParamShree". */
  advantages?: AboutAdvantage[];
  /** Optional bottom conversion message + CTA, shared with the "Why Buy Through" card. */
  conversion?: AboutConversion;
}

export interface AboutSectionData {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  trustFeatures: AboutTrustFeature[];
  image: {
    path: string;
    altText: string;
    badgeText: string;
  };
  cards: AboutCard[];
}

export const aboutData: AboutSectionData = {
  eyebrow: "ABOUT",
  title: "About ParamShree",
  subtitle: "YOUR TRUSTED CHANNEL PARTNER",
  description:
    "ParamShree is a dedicated channel partner for SOUL Prakriti, working to connect discerning buyers with thoughtfully designed farmhouses and villas. We focus on providing personalised guidance, transparent information and a smooth buying experience, so you can make a confident decision for your dream retreat.",
  trustFeatures: [
    { title: "Client-First Approach", icon: "user-check" },
    { title: "Reliable Guidance", icon: "shield-check" },
    { title: "Dedicated Support", icon: "headset" },
  ],
  image: {
    path: "/images/gallery/full villa structure for night.jpeg",
    altText: "Premium modern villa at golden hour surrounded by landscaped gardens and trees",
    badgeText: "BRINGING YOU CLOSER TO NATURE",
  },
  cards: [
    {
      id: "price-advantage",
      title: "Price + Channel Partner Advantage",
      description: "",
      imagePath: "/images/Price and advantages.jpeg",
      altText: "SOUL Prakriti villa configuration in daylight",
      bgColor: "#f2d9c4",
      priceAdvantage: {
        eyebrow: "PRICE + CHANNEL PARTNER ADVANTAGE",
        heading: "Your SOUL Prakriti Opportunity",
        description:
          "Explore the available configuration, current pricing and applicable channel partner benefits with ParamShree.",
        facts: [
          { label: "Plot / Farmhouse Size", value: "600 Sq. Yd. Farmhouse" },
          { label: "Villa Configuration", value: "150 & 200 Sq. Yd. Villas" },
          { label: "Pool", value: "Private Pool (as applicable)" },
          { label: "Current Price", value: "Price on Request" },
          { label: "Availability", value: "Enquire for Details" },
        ],
        benefitHeading: "ParamShree Channel Partner Benefit",
        benefitDescription:
          "Enquire for applicable channel partner benefits applicable for this project.",
        ctaLabel: "UNLOCK TODAY'S CHANNEL PARTNER PRICE",
        ctaIntent: "enquire",
      },
    },
    {
      id: "why-soul-prakriti",
      title: "Why SOUL Prakriti",
      description:
        "SOUL Prakriti is designed for those seeking more space, privacy and a closer connection with nature - complemented by thoughtfully planned lifestyle, wellness and recreation experiences.",
      imagePath: "/images/Why Soul Prakriti.png",
      altText: "SOUL Prakriti",
      bgColor: "#d6ddd2",
      pillars: [
        {
          title: "Space",
          description:
            "Large-format private settings designed to give you room to slow down, unwind and reconnect.",
          icon: "space",
        },
        {
          title: "Privacy",
          description:
            "A more private retreat experience, with the villa and pool proposition as applicable.",
          icon: "privacy",
        },
        {
          title: "Nature",
          description:
            "A nature-led escape from dense urban living, with landscaped surroundings and a calmer setting.",
          icon: "nature",
        },
        {
          title: "Experience",
          description:
            "100+ planned lifestyle, wellness, recreation and community experiences designed to enrich everyday living.",
          icon: "experience",
        },
      ],
    },
    {
      id: "why-buy-through",
      eyebrow: "WHY BUY THROUGH PARAMSHREE?",
      title: "Your Advantage Starts Here",
      description:
        "Buying through ParamShree gives you dedicated guidance throughout your SOUL Prakriti journey - from understanding the project and available options to site visits and documentation.",
      imagePath: "/images/Why Buy Through ParamShree.jpeg",
      altText: "Villa patio and outdoor living space",
      bgColor: "#f0d8c8",
      advantages: [
        {
          title: "Authorised Channel Partner",
          description:
            "Dedicated channel-partner support for your SOUL Prakriti purchase journey.",
          icon: "badge-check",
        },
        {
          title: "Applicable Channel Partner Benefits",
          description:
            "Enquire about applicable channel-partner benefits for your preferred unit.",
          icon: "sparkles",
        },
        {
          title: "Inventory Assistance",
          description:
            "Guidance on available options and the unit that best matches your requirements.",
          icon: "home",
        },
        {
          title: "Site Visit Concierge",
          description:
            "Personalised assistance with planning and coordinating your SOUL Prakriti site visit.",
          icon: "map-pin",
        },
        // {
        //   title: "Documentation Support",
        //   description: "Guidance through the documentation and buying process.",
        //   icon: "file-text",
        // },
        // {
        //   title: "Dedicated Relationship Manager",
        //   description:
        //     "A dedicated point of contact to help you through the buying journey.",
        //   icon: "user",
        // },
      ],
      conversion: {
        hook: "Buying directly? Speak to us first and check whether a channel-partner benefit is available for your preferred unit.",
        ctaLabel: "SPEAK TO PARAMSHREE",
        ctaIntent: "enquire",
      },
    },
  ],
};
