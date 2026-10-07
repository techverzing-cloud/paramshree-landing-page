export interface ContactFeature {
  title: string;
  description: string;
  icon: "message-clock" | "user-heart" | "calendar-pin";
}

export interface ContactFeatureItem {
  label: string;
  icon: "pin" | "route" | "landmark";
}

export interface EnquiryIntentPreset {
  intent: string;
  interestedIn: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactSectionData {
  eyebrow: string;
  heading: string;
  subtitle: string;
  description: string;
  features: ContactFeature[];
  image: {
    path: string;
    altText: string;
    width: number;
    height: number;
  };
  form: {
    id: string;
    heading: string;
    description: string;
    consentLabel: string;
    submitLabel: string;
    fields: {
      fullName: string;
      phone: string;
      email: string;
      interestedIn: string;
      message: string;
    };
    validation: {
      fullNameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailRequired: string;
      emailInvalid: string;
      interestedInRequired: string;
      consentRequired: string;
    };
  };
  enquiryOptions: string[];
  intentPresets: EnquiryIntentPreset[];
  statusMessages: {
    success: string;
    deliveryUnavailable: string;
    genericError: string;
  };
}

export interface LocationSectionData {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  items: ContactFeatureItem[];
  office: {
    name: string;
    addressLines: string[];
    city: string;
    state: string;
    pinCode: string;
    mapEmbedUrl?: string;
    mapLinkUrl?: string;
    gettingHere?: string;
    nearbyLandmarks?: string[];
    whatsappNumber?: string;
  };
  pendingNotice: string;
  pendingValueLabel: string;
}

export interface FaqSectionData {
  id: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaIntent: string;
  items: FaqItem[];
}

export const contactData: ContactSectionData = {
  eyebrow: "CONTACT US",
  heading: "Get in Touch",
  subtitle: "WE'RE HERE TO HELP",
  description:
    "Have questions about SOUL Prakriti? Our team is here to assist you with project details, site visits and personalised guidance.",
  features: [
    {
      title: "Quick Response",
      description: "Enquiries are reviewed and responded to in order of receipt.",
      icon: "message-clock",
    },
    {
      title: "Personalised Assistance",
      description: "Guidance tailored to your requirement and preferred way of connecting.",
      icon: "user-heart",
    },
    {
      title: "Site Visit Coordination",
      description: "We coordinate visit timing and share verified details before you travel.",
      icon: "calendar-pin",
    },
  ],
  image: {
    path: "/images/villa-patio.webp",
    altText: "Villa patio and outdoor living space at SOUL Prakriti",
    width: 1200,
    height: 800,
  },
  form: {
    id: "enquiry",
    heading: "Enquiry Form",
    description: "Fill in your details and our team will get in touch with you soon.",
    consentLabel:
      "I agree to be contacted by ParamShree about my enquiry and accept the relevant privacy terms.",
    submitLabel: "Submit Enquiry",
    fields: {
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      interestedIn: "Interested In",
      message: "Message (optional)",
    },
    validation: {
      fullNameRequired: "Please enter your full name.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "Please enter a valid phone number.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      interestedInRequired: "Please select what you are interested in.",
      consentRequired: "Please accept the consent to continue.",
    },
  },
  enquiryOptions: [
    "SOUL Prakriti Project",
    "SOUL Prakriti Villa",
    "SOUL Prakriti Farmhouse",
    "General Enquiry",
  ],
  intentPresets: [
    { intent: "soul-prakriti", interestedIn: "SOUL Prakriti Project" },
    { intent: "eth-infra", interestedIn: "SOUL Prakriti Project" },
    { intent: "site-visit", interestedIn: "Site Visit" },
    { intent: "enquire", interestedIn: "General Enquiry" },
    { intent: "general-enquiry", interestedIn: "General Enquiry" },
  ],
  statusMessages: {
    success: "Thank you. Your enquiry has been received and our team will get in touch with you soon.",
    deliveryUnavailable:
      "Our enquiry service is being connected right now. Please try again shortly.",
    genericError: "We could not submit your enquiry just now. Please try again.",
  },
};

export const locationData: LocationSectionData = {
  id: "location",
  eyebrow: "PARAMSHREE OFFICE",
  heading: "Our Location",
  description:
    "ParamShree assists visitors with SOUL Prakriti project information, site visits and personalised guidance. Below is our confirmed office location.",
  items: [
    { label: "Office Location", icon: "pin" },
    { label: "Getting Here", icon: "route" },
    { label: "Nearby Landmarks", icon: "landmark" },
  ],
  office: {
    name: "ParamShree Office",
    addressLines: [
      "15, DDA Local Shopping Complex, A-Block Ring Road",
      "Naraina Vihar, New Delhi - 110028",
    ],
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110028",
    mapEmbedUrl:
      "https://www.google.com/maps?q=15,+DDA+Local+Shopping+Complex,+A-Block+Ring+Road,+Naraina+Vihar,+New+Delhi+-+110028&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps/search/15,+DDA+Local+Shopping+Complex,+A-Block+Ring+Road,+Naraina+Vihar,+New+Delhi+-+110028",
    gettingHere: "Easily accessible via Ring Road, Naraina Vihar, New Delhi.",
    nearbyLandmarks: [],
  },
  pendingNotice: "",
  pendingValueLabel: "To be confirmed",
};

export const faqData: FaqSectionData = {
  id: "faq",
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  subtitle: "FIND ANSWERS TO COMMON QUESTIONS",
  description:
    "A few of the things visitors ask us most often about SOUL Prakriti and working with ParamShree.",
  ctaLabel: "Still Have Questions?",
  ctaIntent: "general-enquiry",
  items: [
    {
      question: "What is SOUL Prakriti?",
      answer:
        "SOUL Prakriti is a nature-centric community of thoughtfully designed farmhouses and villas by SOUL Agro Farms Pvt. Ltd., powered by ETH Infra Pvt. Ltd. The community is planned around nature connected living, wellness focused spaces and thoughtfully landscaped surroundings.",
    },
    {
      question: "What types of properties are available?",
      answer:
        "SOUL Prakriti is planned with farmhouses and villas. Current availability, layouts and configuration details are confirmed during a site visit, so please share your requirement through the enquiry form and our team will guide you.",
    },
    {
      question: "Where is SOUL Prakriti located?",
      answer:
        "The verified project location and directions are shared by our team when we schedule your visit. Choose “Site Visit” in the enquiry form and we will share the location details with you.",
    },
    {
      question: "How can I schedule a site visit?",
      answer:
        "Submit the enquiry form with “Site Visit” selected, or use the “Visit a Site” button on this page. Our team coordinates visit timing with you and shares the details you need before you travel.",
    },
    {
      question: "Is ParamShree the official channel partner?",
      answer:
        "ParamShree is the channel partner for SOUL Prakriti and works with SOUL Agro Farms Pvt. Ltd. Project information, site visit coordination and guidance are provided through ParamShree.",
    },
    {
      question: "What amenities are available at SOUL Prakriti?",
      answer:
        "SOUL Prakriti is planned around nature connected living, a wellness focused community, thoughtful landscapes and modern lifestyle amenities. Detailed amenity information is shared during site visits.",
    },
  ],
};