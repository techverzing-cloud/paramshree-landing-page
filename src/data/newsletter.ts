export type BenefitIcon = "spark" | "megaphone" | "leaf";

export interface NewsletterBenefit {
  id: string;
  label: string;
  icon: BenefitIcon;
}

export interface NewsletterData {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  /** Existing project still used as a subdued texture. Decorative only. */
  visual: {
    src: string;
    alt: string;
  };
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
  };
  validation: {
    emailRequired: string;
    emailInvalid: string;
  };
  benefits: NewsletterBenefit[];
  popup: {
    heading: string;
    message: string;
    confirmLabel: string;
    closeLabel: string;
  };
}

export const newsletterData: NewsletterData = {
  id: "newsletter",
  eyebrow: "STAY UPDATED",
  heading: "Be the First to Know",
  description: "Subscribe for updates on new projects and the latest from ParamShree.",
  visual: {
    src: "/images/newletter.jpeg",
    alt: "",
  },
  form: {
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    submitLabel: "Subscribe",
  },
  validation: {
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
  },
  benefits: [
    { id: "new-projects", label: "New Project Updates", icon: "spark" },
    { id: "announcements", label: "Latest Announcements", icon: "megaphone" },
    { id: "soul-prakriti", label: "SOUL Prakriti Updates", icon: "leaf" },
  ],
  popup: {
    heading: "Thank You!",
    message:
      "You have successfully subscribed. We will keep you updated with our new projects first.",
    confirmLabel: "Got It",
    closeLabel: "Close",
  },
};
