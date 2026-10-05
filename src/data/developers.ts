export type DeveloperFeatureIcon =
  | "leaf"
  | "sprout"
  | "heart"
  | "sparkle"
  | "shield"
  | "compass"
  | "users"
  | "building";

export interface DeveloperFeature {
  label: string;
  icon: DeveloperFeatureIcon;
}

export interface DeveloperAsset {
  path: string;
  altText: string;
  width: number;
  height: number;
}

export interface DeveloperCta {
  label: string;
  href: string;
  intent?: string;
  variant: "primary" | "secondary";
  tone?: "white" | "ivory";
}

export interface Developer {
  id: string;
  role: string;
  name: string;
  tagline: string;
  description: string;
  layout: "image-right" | "image-left";
  logo: DeveloperAsset;
  image: DeveloperAsset;
  features: DeveloperFeature[];
  cta: DeveloperCta;
}

export interface DevelopersSectionData {
  eyebrow: string;
  title: string;
  subtitle: string;
  developers: Developer[];
}

export const developersData: DevelopersSectionData = {
  eyebrow: "DEVELOPERS",
  title: "Visionary Partners Behind SOUL Prakriti",
  subtitle: "A shared vision for a healthier, greener and more meaningful tomorrow.",
  developers: [
    {
      id: "soul-agro-farms",
      role: "DEVELOPER",
      name: "SOUL Agro Farms Pvt. Ltd.",
      tagline: "ROOTED IN NATURE, GROWING A BETTER TOMORROW",
      description:
        "SOUL Agro Farms Pvt. Ltd. focuses on nature-centric communities that bring together thoughtful development, wellness and meaningful lifestyle experiences. SOUL Prakriti reflects a vision of living closer to nature while enjoying carefully planned spaces for relaxation and recreation.",
      layout: "image-right",
      logo: {
        path: "/images/developers/Soul Living Emblem Logo.png",
        altText: "SOUL Agro Farms Pvt. Ltd. logo",
        width: 320,
        height: 120,
      },
      image: {
        path: "/images/developers/villa 200sq yards night.png",
        altText:
          "Landscaped green surroundings at SOUL Prakriti, the nature-centric community by SOUL Agro Farms Pvt. Ltd.",
        width: 1200,
        height: 800,
      },
      features: [
        { label: "Nature-Focused Development", icon: "leaf" },
        { label: "Wellness-Centric Communities", icon: "heart" },
        { label: "Sustainable Living Spaces", icon: "sprout" },
        { label: "Meaningful Experiences", icon: "sparkle" },
      ],
      cta: {
        label: "Explore SOUL Prakriti",
        href: "#projects",
        variant: "primary",
        tone: "ivory",
      },
    },
    {
      id: "eth-infra",
      role: "DEVELOPER",
      name: "ETH Infra Pvt. Ltd.",
      tagline: "BUILDING LANDMARKS FOR A BRIGHTER TOMORROW",
      description:
        "ETH Infra Pvt. Ltd. is a real estate development company focused on quality, thoughtful planning and customer-centric development. Its approach brings together modern infrastructure and carefully planned communities designed around the needs of contemporary living.",
      layout: "image-left",
      logo: {
        path: "/images/developers/eth_logo_194x80_v2.png",
        altText: "ETH Infra Pvt. Ltd. logo",
        width: 320,
        height: 120,
      },
      image: {
        path: "/images/developers/villa 150sq yards night.png",
        altText:
          "Planned residential development landscape by ETH Infra Pvt. Ltd., showing landscaped open spaces and built surroundings.",
        width: 1200,
        height: 800,
      },
      features: [
        { label: "Quality Development", icon: "shield" },
        { label: "Innovative Planning", icon: "compass" },
        { label: "Customer-Centric Approach", icon: "users" },
        { label: "Future-Ready Communities", icon: "building" },
      ],
      cta: {
        label: "Enquire About SOUL Prakriti",
        href: "#enquiry",
        intent: "soul-prakriti",
        variant: "primary",
        tone: "ivory",
      },
    },
  ],
};