/**
 * Single source of truth for landing-page CTA behaviour.
 *
 * The site is one page, so a CTA either scrolls to a section that already
 * exists or opens a modal. Add new CTAs here instead of wiring behaviour into
 * individual components.
 */
export const ctaConfig = {
  /** Navbar "Enquiry Now" -> the existing Contact / Enquiry section. */
  enquiry: {
    type: "scroll",
    target: "#contact",
  },
  /** Navbar "Call Now" -> Request a Call Back modal. */
  callback: {
    type: "modal",
  },
  /** Hero/Gallery/Video site-visit CTAs -> one shared SiteVisitModal. */
  siteVisit: {
    type: "modal",
    modal: "site-visit",
  },
} as const;

export interface CallbackData {
  heading: string;
  description: string;
  fields: {
    fullName: string;
    phone: string;
    email: string;
    preferredTime: string;
  };
  placeholders: {
    fullName: string;
    phone: string;
    email: string;
    preferredTime: string;
  };
  timeOptions: string[];
  submitLabel: string;
  validation: {
    fullName: string;
    phone: string;
    email: string;
    preferredTime: string;
  };
  success: {
    heading: string;
    message: string;
    confirmLabel: string;
    closeLabel: string;
  };
}

export const callbackData: CallbackData = {
  heading: "Request a Call Back",
  description:
    "Share your details and preferred time, and our team will get in touch with you.",
  fields: {
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    preferredTime: "Preferred Call Time",
  },
  placeholders: {
    fullName: "Enter your full name",
    phone: "Enter your phone number",
    email: "Enter your email address",
    preferredTime: "Select preferred time",
  },
  timeOptions: [
    "Morning - 9:00 AM – 12:00 PM",
    "Afternoon - 12:00 PM – 3:00 PM",
    "Evening - 3:00 PM – 6:00 PM",
  ],
  submitLabel: "Request a Call Back",
  validation: {
    fullName: "Please enter your full name.",
    phone: "Please enter a valid phone number.",
    email: "Please enter a valid email address.",
    preferredTime: "Please select a preferred call time.",
  },
  success: {
    heading: "Thank You!",
    message:
      "Thank you for your request. Our team will contact you at your preferred time.",
    confirmLabel: "Got It",
    closeLabel: "Close",
  },
};