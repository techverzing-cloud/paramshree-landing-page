export interface FinalCtaCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  icon: "phone" | "whatsapp" | "pin";
}

export interface FinalCtaData {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  cards: FinalCtaCard[];
  whatsapp: {
    /** Prefilled text. WhatsApp is only opened with it; nothing is sent here. */
    message: string;
    unconfiguredNotice: string;
  };
}

export const finalCtaData: FinalCtaData = {
  id: "final-cta",
  eyebrow: "READY TO EXPLORE SOUL PRAKRITI?",
  heading: "Your Next Step Starts Here",
  description:
    "Have questions, want to speak with our team, or prefer to experience SOUL Prakriti in person? Choose how you'd like to connect with us.",
  cards: [
    {
      id: "call",
      title: "Call Us",
      description: "Speak with our team and request a convenient callback.",
      ctaLabel: "Call Us",
      icon: "phone",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Continue the conversation with our team on WhatsApp.",
      ctaLabel: "Chat on WhatsApp",
      icon: "whatsapp",
    },
    {
      id: "site-visit",
      title: "Visit the Site",
      description: "Experience SOUL Prakriti in person and feel the difference for yourself.",
      ctaLabel: "Visit the Site",
      icon: "pin",
    },
  ],
  whatsapp: {
    message:
      "Hi, I would like to know more about SOUL Prakriti. Please share the available details.",
    unconfiguredNotice:
      "Our WhatsApp number is being confirmed. Please use the enquiry form and our team will get in touch.",
  },
};