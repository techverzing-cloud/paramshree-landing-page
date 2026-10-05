export interface SiteVisitData {
  heading: string;
  description: string;
  fields: {
    fullName: string;
    mobile: string;
    preferredTime: string;
    productInterest: string;
  };
  placeholders: {
    fullName: string;
    mobile: string;
    preferredTime: string;
    productInterest: string;
  };
  timeOptions: string[];
  productOptions: string[];
  submitLabel: string;
  closeLabel: string;
  validation: {
    fullName: string;
    mobile: string;
    preferredTime: string;
    productInterest: string;
  };
  success: {
    heading: string;
    message: string;
    confirmLabel: string;
    closeLabel: string;
  };
}

export const siteVisitData: SiteVisitData = {
  heading: "Picture tells you about SOUL. A visit let you feel it",
  description:
    "Experience SOUL Prakriti in person. Share your details and preferred time, and our team will help coordinate your visit.",
  fields: {
    fullName: "Full Name",
    mobile: "Mobile Number",
    preferredTime: "Preferred Time",
    productInterest: "Product Interest",
  },
  placeholders: {
    fullName: "Enter your full name",
    mobile: "Enter your mobile number",
    preferredTime: "Select preferred time",
    productInterest: "Select product",
  },
  timeOptions: ["Morning", "Afternoon"],
  productOptions: ["SOUL Prakriti Villa", "SOUL Prakriti Farmhouse"],
  submitLabel: "Book My Site Visit",
  closeLabel: "Close",
  validation: {
    fullName: "Please enter your full name.",
    mobile: "Please enter a valid mobile number.",
    preferredTime: "Please select your preferred time.",
    productInterest: "Please select a product.",
  },
  success: {
    heading: "Thank You!",
    message:
      "Your site visit request has been received. Our team will get in touch with you to coordinate your visit.",
    confirmLabel: "Got It",
    closeLabel: "Close",
  },
};