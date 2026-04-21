import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FaqSection from "@/components/sections/FaqSection";
import GoogleReviews from "@/components/sections/GoogleReviews";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <WhyUsSection />
      <GoogleReviews />
      <FaqSection />
    </>
  );
}