import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import BrandStory from "@/components/home/BrandStory";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CampaignBanner from "@/components/home/CampaignBanner";
import Testimonials from "@/components/home/Testimonials";
import Services from "@/components/home/Services";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="bg-white text-base">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <BrandStory />
        <CategoryGrid />
        <FeaturedProducts />
        <CampaignBanner />
        <Testimonials />
        <Services />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
