export interface DaySoulItem {
  title: string;
  subtitle: string;
  /**
   * Circular timeline image. None are wired yet: "images/A Day At Soul" is
   * empty in this repo. Placeholder frames render until the approved assets
   * land here. TODO: drop the 9 approved "A Day At Soul" photos in that
   * folder and set these paths.
   */
  imagePath?: string;
  imageAlt?: string;
}

export interface ProjectFact {
  label: string;
  value: string;
  icon: "home" | "maximize" | "eye" | "layers" | "rupee" | "calendar" | "building";
}

export interface ProjectShowcaseImage {
  path: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProjectShowcase {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryImage: ProjectShowcaseImage;
  gallery: ProjectShowcaseImage[];
  facts: ProjectFact[];
  cta: {
    label: string;
    intent: string;
  };
}

export interface LocationHighlight {
  title: string;
  caption: string;
  icon: "route" | "mountain" | "leaf";
}

export interface TravelTime {
  place: string;
  duration: string;
}

export interface LocationBlock {
  eyebrow: string;
  title: string;
  description: string;
  highlights: LocationHighlight[];
  locationLabel: string;
  locationLines: string[];
  travelLabel: string;
  travelTimes: TravelTime[];
  map: {
    /** Exact Google Maps embed for Bhaguwala, Uttar Pradesh 246749. */
    embedUrl: string;
    linkUrl: string;
    title: string;
  };
}

export interface ProjectsSectionData {
  eyebrow: string;
  title: string;
  subtitle: string;
  timeline: DaySoulItem[];
  villa: ProjectShowcase;
  farmhouse: ProjectShowcase;
  location: LocationBlock;
}

export const projectsData: ProjectsSectionData = {
  eyebrow: "08 — A DAY AT SOUL",
  title: "A Day at SOUL",
  subtitle:
    "From peaceful mornings to memorable evenings, experience a day that feels like a getaway — every day.",
  timeline: [
    {
      title: "Morning",
      subtitle: "Nature Walk",
      imagePath: "/images/A Day At Soul/Morning.png",
      imageAlt: "Morning nature walk at SOUL Prakriti",
    },
    {
      title: "Breakfast",
      subtitle: "Private Setting",
      imagePath: "/images/A Day At Soul/Breakfast.png",
      imageAlt: "Breakfast in a private setting at SOUL Prakriti",
    },
    {
      title: "Pool",
      subtitle: "Family & Sports",
      imagePath: "/images/A Day At Soul/Pool.png",
      imageAlt: "Pool at SOUL Prakriti",
    },
    {
      // No "Clubhouse" asset in /images/A Day At Soul — pending frame shows.
      title: "Clubhouse",
      subtitle: "Leisure & Recreation",
      imagePath:"/images/A Day At Soul/ClubHouse.jpg",
      imageAlt: "ClubHouse at SOUL Prakriti",
    },
    {
      title: "Lunch",
      subtitle: "With Loved Ones",
      imagePath: "/images/A Day At Soul/Lunch.png",
      imageAlt: "Lunch with loved ones at SOUL Prakriti",
    },
    {
      title: "Wellness",
      subtitle: "Mind & Body",
      imagePath: "/images/A Day At Soul/Wellness.png",
      imageAlt: "Wellness session at SOUL Prakriti",
    },
    {
      title: "Gardens",
      subtitle: "Explore & Unwind",
      imagePath: "/images/A Day At Soul/Gardens.png",
      imageAlt: "Gardens at SOUL Prakriti",
    },
    {
      title: "Sunset",
      subtitle: "Golden Views",
      imagePath: "/images/A Day At Soul/Sunset.png",
      imageAlt: "Sunset at SOUL Prakriti",
    },
    {
      title: "Dinner",
      subtitle: "Outdoors",
      imagePath: "/images/A Day At Soul/Dinners.png",
      imageAlt: "Outdoor dinner at SOUL Prakriti",
    },
  ],
  villa: {
    id: "soul-prakriti-villa",
    eyebrow: "VILLA PROJECT",
    title: "Soul Prakriti Villa",
    subtitle: "Luxury Villas Designed for a Refined Lifestyle",
    description:
      "Elegant villas crafted for modern living with thoughtful design, premium finishes and a serene natural setting. Experience privacy, comfort and a lifestyle that goes beyond the ordinary.",
    primaryImage: {
      path: "/images/villa/villa2.jpeg",
      altText: "SOUL Prakriti luxury villa at dusk",
      width: 1080,
      height: 540,
    },
    gallery: [
      {
        path: "/images/villa/villa151.jpg",
        altText: "SOUL Prakriti luxury villa exterior",
        width: 1080,
        height: 545,
      },
      {
        path: "/images/villa/villa152.png",
        altText: "SOUL Prakriti villa — additional view",
        width: 1080,
        height: 837,
      },
      {
        path: "/images/villa/villa201.png",
        altText: "SOUL Prakriti villa — additional view",
        width: 783,
        height: 616,
      },
      {
        path: "/images/villa/villa202.png",
        altText: "SOUL Prakriti villa — additional view",
        width: 397,
        height: 632,
      },
      {
        path: "/images/villa/villa203.png",
        altText: "SOUL Prakriti villa — additional view",
        width: 791,
        height: 587,
      },
      {
        path: "/images/villa/villa153.png",
        altText: "SOUL Prakriti villa — additional view",
        width: 385,
        height: 616,
      },
    ],
    facts: [
      { label: "Type", value: "Villas", icon: "home" },
      { label: "Area", value: "150/200 Sq. Yards", icon: "maximize" },
      { label: "View", value: "River View", icon: "eye" },
      { label: "Category", value: "Luxury Villas", icon: "layers" },
      { label: "Price", value: "On Request", icon: "rupee" },
      { label: "Availability", value: "Yes", icon: "calendar" },
      { label: "Developer", value: "Soul Agro Farms Pvt. Ltd.", icon: "building" },
    ],
    cta: {
      label: "Get Price & Offers",
      intent: "enquire",
    },
  },
  farmhouse: {
    id: "soul-prakriti-farmhouse",
    eyebrow: "FARMHOUSE PROJECT",
    title: "Soul Prakriti Farmhouse",
    subtitle: "Premium Farmhouses for a Private Escape",
    description:
      "Spacious farmhouses set amidst nature, offering the perfect blend of privacy, open spaces and modern comforts. A peaceful retreat to create cherished moments with family and friends.",
    primaryImage: {
      path: "/images/farmhouse/farmhouse1.png",
      altText: "SOUL Prakriti farmhouse exterior",
      width: 814,
      height: 456,
    },
    gallery: [
      {
        path: "/images/farmhouse/farmhouse1.png",
        altText: "SOUL Prakriti farmhouse exterior",
        width: 814,
        height: 456,
      },
      {
        path: "/images/farmhouse/farmhouse2.png",
        altText: "SOUL Prakriti farmhouse — additional view",
        width: 696,
        height: 694,
      },
      {
        path: "/images/farmhouse/farmhouse3.png",
        altText: "SOUL Prakriti farmhouse — additional view",
        width: 470,
        height: 335,
      },
      {
        path: "/images/farmhouse/farmhouse4.png",
        altText: "SOUL Prakriti farmhouse — additional view",
        width: 469,
        height: 273,
      },
      {
        path: "/images/farmhouse/Price and advantages.jpeg",
        altText: "Price and channel partner advantages",
        width: 1280,
        height: 720,
      },
      {
        path: "/images/farmhouse/Why Buy Through ParamShree.jpeg",
        altText: "Why buy through ParamShree",
        width: 1280,
        height: 720,
      },
    ],
    facts: [
      { label: "Type", value: "Farmhouses", icon: "home" },
      { label: "Area", value: "600 Sq. Yards", icon: "maximize" },
      { label: "View", value: "Nature Facing", icon: "eye" },
      { label: "Category", value: "Premium Farmhouse", icon: "layers" },
      { label: "Price", value: "On Request", icon: "rupee" },
      { label: "Availability", value: "Yes", icon: "calendar" },
      { label: "Developer", value: "Soul Agro Farms Pvt. Ltd.", icon: "building" },
    ],
    cta: {
      label: "Get Price & Offers",
      intent: "enquire",
    },
  },
  location: {
    eyebrow: "LOCATION",
    title: "A Serene Location Near Haridwar",
    description:
      "Located in Bhaguwala, Najibabad, Uttar Pradesh, SOUL Prakriti offers a peaceful escape with easy connectivity to Haridwar and surrounding regions.",
    highlights: [
      { title: "Easy Connectivity", caption: "to Haridwar", icon: "route" },
      { title: "Peaceful & Scenic", caption: "Surroundings", icon: "mountain" },
      { title: "Close to Nature", caption: "Yet Well Connected", icon: "leaf" },
    ],
    locationLabel: "Project Location",
    locationLines: ["Bhaguwala, Najibabad,", "Uttar Pradesh"],
    travelLabel: "Travel Time (Approx.)",
    travelTimes: [
      { place: "Haridwar", duration: "45–60 mins" },
      { place: "Roorkee", duration: "60–75 mins" },
      { place: "Najibabad", duration: "15–20 mins" },
    ],
    map: {
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13862.00379935839!2d78.24691950649313!3d29.705245151534964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39095e5d6198e929%3A0xa743785f0e953447!2sBhaguwala%2C%20Uttar%20Pradesh%20246749!5e0!3m2!1sen!2sin!4v1791278273653!5m2!1sen!2sin",
      linkUrl: "https://www.google.com/maps/search/?api=1&query=Bhaguwala%2C%20Uttar%20Pradesh%20246749",
      title: "SOUL Prakriti location map — Bhaguwala, Uttar Pradesh 246749",
    },
  },
};