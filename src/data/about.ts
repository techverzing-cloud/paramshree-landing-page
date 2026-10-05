export interface AboutTrustFeature {
  title: string;
  icon: "user-check" | "shield-check" | "headset";
}

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  altText: string;
  bgColor: string;
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
      id: "about-paramshree",
      title: "About ParamShree",
      description:
        "ParamShree is an authorised channel partner for SOUL Prakriti. We help you explore the project, understand the options and navigate the buying process with clear information and dedicated support, so your journey to a private retreat is seamless and reassuring.",
      imagePath: "/images/About ParamShree.jpeg",
      altText: "ParamShree brand signage and presence",
      bgColor: "#f2d9c4",
    },
    {
      id: "why-soul-prakriti",
      title: "Why SOUL Prakriti",
      description:
        "SOUL Prakriti brings together nature, modern living and wellness in a carefully planned community. With expansive green spaces, a wide range of lifestyle experiences and thoughtfully designed farmhouses and villas, it offers a serene environment to relax, rejuvenate and create lasting memories.",
      imagePath: "/images/Why Soul Prakriti.png",
      altText: "SOUL Prakriti",
      bgColor: "#d6ddd2",
    },
    {
      id: "why-buy-through",
      title: "Why Buy Through ParamShree",
      description:
        "As an authorised channel partner, ParamShree provides you with end-to-end support - from project insights and personalised guidance to site visit coordination and handholding through the buying process. Our focus is on helping you make a well-informed decision with confidence and ease.",
      imagePath: "/images/Why Buy Through ParamShree.jpeg",
      altText: "Villa patio and outdoor living space",
      bgColor: "#f0d8c8",
    },
  ],
};
