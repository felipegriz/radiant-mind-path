
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import QuoteSection from "@/components/home/QuoteSection";
import StatisticsSection from "@/components/home/StatisticsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <QuoteSection />
      <StatisticsSection />
    </div>
  );
};

export default Index;
