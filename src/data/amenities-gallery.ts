import type { DeveloperFeatureIcon } from "@/data/developers";

/**
 * Content rules for this file:
 * - Amenity names, categories and descriptions come from the supplied project
 *   photographs in `public/images/` and the verified project copy already in
 *   `siteConfig.hero.features`, `aboutData`, `developersData` and `faqData`.
 * - No amenity, facility, claim, location, price or availability is invented.
 * - `src` must be an existing file in `public/images/`. Spaces in the supplied
 *   filenames are percent-encoded, which is a valid public path.
 */

export type AmenitiesGalleryView = "amenities" | "gallery";

export type AmenityIcon = DeveloperFeatureIcon;

/**
 * Editorial collage placement of one gallery tile.
 *
 * The eight supplied photographs have different aspect ratios (two portrait,
 * six landscape), so the collage is described per breakpoint instead of being
 * forced into one fixed shape. `span` is the grid column span and `ratio` is the
 * width-to-height ratio of the tile box; both are chosen so the box stays close
 * to the photograph's own ratio, which keeps `object-cover` cropping small and
 * keeps every card free of stretching.
 */
export interface GalleryTile {
  /** Column span classes, phone through desktop. */
  span: string;
  /** Tile box aspect ratio: phones, tablets, desktop. */
  ratio: { base: string; md: string; lg: string };
  /** Responsive `sizes` hint matching the slot the tile actually occupies. */
  sizes: string;
}

export interface ProjectAsset {
  /** Public path of a supplied project photograph. */
  src: string;
  alt: string;
  /** Intrinsic pixel width of the file in `public/`. */
  width: number;
  /** Intrinsic pixel height of the file in `public/`. */
  height: number;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: AmenityIcon;
  image: ProjectAsset;
}

export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  layout: GalleryTile;
  image: ProjectAsset;
}

export interface AmenitiesGalleryViewOption {
  id: AmenitiesGalleryView;
  label: string;
  description: string;
}

export interface AmenitiesGalleryData {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  views: AmenitiesGalleryViewOption[];
  amenities: Amenity[];
  gallery: GalleryImage[];
  amenitiesCta: {
    label: string;
    /** Prefilled WhatsApp text. The message is only opened in WhatsApp, never sent here. */
    message: string;
    unconfiguredNotice: string;
  };
  galleryCta: {
    label: string;
  };
  lightbox: {
    dialog: string;
    close: string;
    previous: string;
    next: string;
    counter: string;
    unavailable: string;
  };
}

/** The six project photographs supplied in `public/images/`. */
const golf = {
  src: "/images/Amenities3 GolfCourse.jpg",
  alt: "Golf Course for extra sport activities",
  width: 673,
  height: 480,
};

const badminton = {
  src: "/images/Amenities1 badminton.jpg",
  alt: "Badminton court at SOUL Prakriti",
  width: 886,
  height: 493,
};

const sculptureGarden = {
  src: "/images/Amenities2 SCULPTURE GARDEN.jpg",
  alt: "Sculpture garden with landscaped planting at SOUL Prakriti",
  width: 429,
  height: 419,
};

const clubHouse = {
  src: "/images/Amenities4 CLUB HOUSE.jpg",
  alt: "Club house at SOUL Prakriti",
  width: 914,
  height: 567,
};

const singingBowl = {
  src: "/images/Amenities5 SINGING BOWL MEDITATION POINT.jpg",
  alt: "Singing bowl meditation point at SOUL Prakriti",
  width: 905,
  height: 587,
};

const restaurant = {
  src: "/images/Amenities6 RESTURANT WITH OUTDOOR SEATING.jpg",
  alt: "Restaurant with outdoor seating at SOUL Prakriti",
  width: 909,
  height: 511,
};

/**
 * Grid slot descriptors for the collage.
 *
 * Desktop is a four column grid capped at 92rem: a one column slot is 356px and
 * a two column slot is 728px. Every gallery source is at least 733px wide, so no
 * slot ever asks the browser to render an image larger than it really is.
 */
const slot = (columns: 1 | 2): GalleryTile["sizes"] =>
  columns === 1
    ? "(min-width: 1024px) 356px, (min-width: 640px) 50vw, 92vw"
    : "(min-width: 1024px) 728px, (min-width: 640px) 92vw, 92vw";

/**
 * The eight project photographs supplied in `public/images/gallery/`.
 *
 * Titles and descriptions describe what each supplied file shows, taken from the
 * filenames and the verified villa and farmhouse terminology. Nothing about
 * pricing, availability or returns is claimed.
 */
const galleryImages: GalleryImage[] = [
  {
    id: "villa-structure-night",
    title: "SOUL Prakriti Villa at Night",
    caption: "The villa elevation after dark, within the SOUL Prakriti setting.",
    layout: { span: "col-span-1", ratio: { base: "0.72", md: "0.72", lg: "0.6" }, sizes: slot(1) },
    image: {
      src: "/images/gallery/full villa structure for night.jpeg",
      alt: "Full villa structure at SOUL Prakriti photographed at night",
      width: 1080,
      height: 1890,
    },
  },
  {
    id: "villa-structure-day",
    title: "SOUL Prakriti Villa by Day",
    caption: "Thoughtfully designed villa living within the serene SOUL Prakriti setting.",
    layout: { span: "col-span-1", ratio: { base: "0.72", md: "0.72", lg: "0.6" }, sizes: slot(1) },
    image: {
      src: "/images/gallery/full villa structure at day.jpeg",
      alt: "Full villa structure at SOUL Prakriti photographed in daylight",
      width: 914,
      height: 1600,
    },
  },
  {
    id: "villa-200sqy-day",
    title: "200 sq. Yards Villa · Day",
    caption: "A 200 sq. yards villa home in daylight.",
    layout: {
      span: "col-span-1 md:col-span-2 lg:col-span-2",
      ratio: { base: "1.3", md: "1.3", lg: "1.23" },
      sizes: slot(2),
    },
    image: {
      src: "/images/gallery/villa 200sq yards day.png",
      alt: "200 sq. yards villa at SOUL Prakriti in daylight",
      width: 793,
      height: 594,
    },
  },
  {
    id: "villa-200sqy-night",
    title: "200 sq. Yards Villa · Night",
    caption: "A 200 sq. yards villa home after dark.",
    layout: {
      span: "col-span-1 md:col-span-2 lg:col-span-2",
      ratio: { base: "1.3", md: "1.3", lg: "1.46" },
      sizes: slot(2),
    },
    image: {
      src: "/images/gallery/villa 200sq yards night.png",
      alt: "200 sq. yards villa at SOUL Prakriti at night",
      width: 798,
      height: 597,
    },
  },
  {
    id: "villa-150sqy-night",
    title: "150 sq. Yards Villa · Night",
    caption: "A 150 sq. yards villa home after dark.",
    layout: {
      span: "col-span-1 md:col-span-2 lg:col-span-2",
      ratio: { base: "1.3", md: "1.4", lg: "1.46" },
      sizes: slot(2),
    },
    image: {
      src: "/images/gallery/villa 150sq yards night.png",
      alt: "150 sq. yards villa at SOUL Prakriti at night",
      width: 789,
      height: 623,
    },
  },
  {
    id: "layout-of-farmhouse",
    title: "Farmhouse Layout",
    caption: "The farmhouse layout within SOUL Prakriti.",
    layout: { span: "col-span-1", ratio: { base: "1.15", md: "1.09", lg: "0.86" }, sizes: slot(1) },
    image: {
      src: "/images/gallery/layout of farmhouse.png",
      alt: "Farmhouse layout at SOUL Prakriti",
      width: 733,
      height: 673,
    },
  },
  {
    id: "villa-150sqy-day",
    title: "150 sq. Yards Villa · Day",
    caption: "A 150 sq. yards villa home in daylight.",
    layout: { span: "col-span-1", ratio: { base: "1.15", md: "1.11", lg: "0.86" }, sizes: slot(1) },
    image: {
      src: "/images/gallery/villa 150sq yards day.png",
      alt: "150 sq. yards villa at SOUL Prakriti in daylight",
      width: 751,
      height: 675,
    },
  },
  {
    id: "farmhouse-2bhk",
    title: "SOUL Prakriti Farmhouse · 2 BHK",
    caption:
      "A private farmhouse experience surrounded by nature and landscaped surroundings.",
    layout: {
      span: "col-span-1 md:col-span-2 lg:col-span-2",
      ratio: { base: "1.6", md: "1.77", lg: "1.77" },
      sizes: slot(2),
    },
    image: {
      src: "/images/gallery/farmhouse 2bhk.png",
      alt: "2 BHK farmhouse at SOUL Prakriti",
      width: 813,
      height: 460,
    },
  },
];

export const amenitiesGalleryData: AmenitiesGalleryData = {
  id: "amenities",
  eyebrow: "SOUL PRAKRITI",
  heading: "Amenities & Gallery",
  description:
    "Nature, wellness and thoughtfully planned living, brought together in one serene community.",
  views: [
    {
      id: "amenities",
      label: "Amenities",
      description: "Lifestyle highlights planned across the SOUL Prakriti community.",
    },
    {
      id: "gallery",
      label: "Gallery",
      description: "Villa and farmhouse visuals from SOUL Prakriti.",
    },
  ],
  amenities: [
    {
      id: "golf",
      name: "Golf Course",
      description:
        "Pristine greens and a premium clubhouse perfect for networking and relaxing",
      category: "SPORTS",
      icon: "users",
      image: golf,
    },
    {
      id: "badminton-court",
      name: "Badminton Court",
      description:
        "A badminton court within the community for active outdoor play and everyday fitness.",
      category: "SPORTS",
      icon: "users",
      image: badminton,
    },
    {
      id: "sculpture-garden",
      name: "Sculpture Garden",
      description:
        "A sculpture garden set within the landscaped grounds, shaped as a calm point of interest.",
      category: "LANDSCAPES",
      icon: "sprout",
      image: sculptureGarden,
    },
    {
      id: "club-house",
      name: "Club House",
      description:
        "The club house acts as a shared gathering space at the heart of the community.",
      category: "COMMUNITY",
      icon: "building",
      image: clubHouse,
    },
    {
      id: "singing-bowl-meditation-point",
      name: "Singing Bowl Meditation Point",
      description:
        "A dedicated singing bowl meditation point for quiet, restorative practice.",
      category: "WELLNESS",
      icon: "heart",
      image: singingBowl,
    },
    {
      id: "restaurant-outdoor-seating",
      name: "Restaurant with Outdoor Seating",
      description:
        "A restaurant with outdoor seating, opening onto the landscaped surroundings of the community.",
      category: "DINING",
      icon: "sparkle",
      image: restaurant,
    },
  ],
  gallery: galleryImages,
  amenitiesCta: {
    label: "Explore More on WhatsApp",
    message: "Hello, I would like to know more about SOUL Prakriti and its amenities.",
    unconfiguredNotice:
      "Our WhatsApp number is being confirmed. Please use the enquiry form and our team will get in touch.",
  },
  galleryCta: {
    label: "Visit the Site",
  },
  lightbox: {
    dialog: "SOUL PRAKRITI",
    close: "Close image viewer",
    previous: "Previous image",
    next: "Next image",
    counter: "Image",
    unavailable: "Image not yet available",
  },
};
