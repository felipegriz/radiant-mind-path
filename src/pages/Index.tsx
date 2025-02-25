
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import QuoteSection from "@/components/home/QuoteSection";
import StatisticsSection from "@/components/home/StatisticsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/courses/octava-area">
          <Button variant="default" size="lg">
            Subir Video - La Octava Area
          </Button>
        </Link>
      </div>
      <FeaturesSection />
      <QuoteSection />
      <StatisticsSection />
    </div>
  );
};

export default Index;
