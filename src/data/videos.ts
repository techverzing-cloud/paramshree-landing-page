/**
 * Video Showcase content.
 *
 * - Every `src` is a supplied file in `public/images/videos/`.
 * - `width` and `height` are the intrinsic dimensions read from the MP4 track
 *   header, so the browser reserves the right box and nothing is stretched.
 * - No stock footage, no external URLs, no invented filenames.
 */

export type VideoOrientation = "portrait" | "landscape";

export interface ProjectVideo {
  id: string;
  /** Public path of the supplied clip. */
  src: string;
  label: string;
  title: string;
  subtitle: string;
  description?: string;
  /** Existing project still used as the poster frame, so the card is never blank. */
  poster: string;
  posterAlt: string;
  /** Intrinsic dimensions of the video track. */
  width: number;
  height: number;
  /** Intrinsic width / height, e.g. "9 / 16". */
  aspectRatio: string;
  /** Holds the meaningful middle of the frame where the card crops with object-cover. */
  objectPosition: string;
  orientation: VideoOrientation;
  /** Desktop column span. The portrait clip gets the narrower column. */
  span: string;
  /** Mobile and tablet frame, close to the source ratio without an extreme height. */
  frame: string;
}

export interface VideoShowcaseData {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  videos: ProjectVideo[];
  cta: {
    label: string;
  };
  lightbox: {
    dialog: string;
    close: string;
    previous: string;
    next: string;
    counter: string;
    fullscreen: string;
    hint: string;
  };
}

export const videoShowcaseData: VideoShowcaseData = {
  id: "videos",
  eyebrow: "SOUL PRAKRITI",
  heading: "Experience SOUL Prakriti",
  description:
    "Take a closer look at SOUL Prakriti through our curated videos, showcasing the project, its surroundings and the lifestyle it is designed to offer.",
  videos: [
    {
      id: "soul-prakriti",
      src: "/images/videos/soulprakriti.mp4",
      label: "Video 1",
      title: "SOUL Prakriti",
      subtitle: "A closer look at the project and its vision",
      description: "A closer look at SOUL Prakriti and its vision.",
      poster: "/images/gallery/full villa structure at day.jpeg",
      posterAlt: "SOUL Prakriti villa structure in daylight",
      width: 478,
      height: 850,
      aspectRatio: "9 / 16",
      objectPosition: "center 32%",
      orientation: "portrait",
      span: "lg:col-span-6",
      frame: "aspect-[3/4]",
    },
    {
      id: "soul-prakriti-location",
      src: "/images/videos/soulprakritilocation.mp4",
      label: "Video 2",
      title: "SOUL Prakriti Location",
      subtitle: "Explore the location and surrounding landscape",
      description: "Explore the location and surrounding landscape.",
      poster: "/images/locationcover.jpeg",
      posterAlt: "Landscaped surroundings at SOUL Prakriti",
      width: 848,
      height: 480,
      aspectRatio: "16 / 9",
      objectPosition: "center",
      orientation: "landscape",
      span: "lg:col-span-6",
      frame: "aspect-video",
    },
  ],
  cta: {
    label: "Plan Your Visit",
  },
  lightbox: {
    dialog: "SOUL PRAKRITI videos",
    close: "Close video player",
    previous: "Previous video",
    next: "Next video",
    counter: "Video",
    fullscreen: "Toggle fullscreen",
    hint: "Use the arrow keys to change video, Escape to close",
  },
};
