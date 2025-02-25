
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import QuoteSection from "@/components/home/QuoteSection";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      
      <div className="hero-gradient pt-12 pb-32">
        <HeroSection />
      </div>

      <div className="container mx-auto px-4 -mt-28">
        <FeaturesSection />
        <StatisticsSection />
        <QuoteSection />
      </div>
    </div>
  );
};

export default Index;
