import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { DevelopersSection } from "@/components/sections/DevelopersSection";
import { AmenitiesGallerySection } from "@/components/sections/AmenitiesGallerySection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FinalCtaSection />
      <DevelopersSection />
      <AmenitiesGallerySection />
      <VideoShowcaseSection />
      <ContactSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
