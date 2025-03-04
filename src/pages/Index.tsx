
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import QuoteSection from "@/components/home/QuoteSection";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
      </motion.div>
      
      <div className="bg-gradient-to-b from-gray-800 to-background">
        <HeroSection />
      </div>

      <div className="container mx-auto px-4">
        <FeaturesSection />
        <StatisticsSection />
        <QuoteSection />
      </div>
    </div>
  );
};

export default Index;
