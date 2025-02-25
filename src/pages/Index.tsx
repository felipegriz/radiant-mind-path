
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import QuoteSection from "@/components/home/QuoteSection";
import StatisticsSection from "@/components/home/StatisticsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bg-white" style={{ height: "calc(100% + 300px)" }}></div>
        <div className="relative">
          <Navbar />
          <HeroSection />
          <FeaturesSection />
        </div>
      </div>
      <QuoteSection />
      <StatisticsSection />
    </div>
  );
};

export default Index;
