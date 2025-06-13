import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AudiobooksSection from "@/components/audiobooks-section";
import VideosSection from "@/components/videos-section";
import GuidesSection from "@/components/guides-section";
import PDFSection from "@/components/pdf-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import CallToAction from "@/components/call-to-action";
import FeaturedQuote from "@/components/featured-quote";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedQuote />
      <AudiobooksSection />
      <VideosSection />
      <GuidesSection />
      <PDFSection />
      <TestimonialsSection />
      <CallToAction />
      <ContactSection />
    </main>
  );
}