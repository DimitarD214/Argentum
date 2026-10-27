import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import BestsellersCarousel from "@/components/home/BestsellersCarousel";
import GoldJewelrySection from "@/components/home/GoldJewelrySection";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandStory from "@/components/home/BrandStory";
import CampaignBanner from "@/components/home/CampaignBanner";
import Testimonials from "@/components/home/Testimonials";
import Services from "@/components/home/Services";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="bg-cream text-base">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <BestsellersCarousel />
        <GoldJewelrySection />
        <CategoryGrid />
        <BrandStory />
        <CampaignBanner />
        <Testimonials />
        <Services />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}