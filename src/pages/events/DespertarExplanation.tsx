
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";
import { PricingSection } from "@/components/events/despertar360/PricingSection";
import { EventFeatures } from "@/components/events/despertar360/EventFeatures";
import { GuaranteeSection } from "@/components/events/despertar360/GuaranteeSection";
import { TestimonialsSection } from "@/components/events/despertar360/TestimonialsSection";
import { FAQSection } from "@/components/events/despertar360/FAQSection";
import { FinalCTASection } from "@/components/events/despertar360/FinalCTASection";
import { VideoHeroSection } from "@/components/events/despertar360/VideoHeroSection";
import { LearningOutcomesSection } from "@/components/events/despertar360/LearningOutcomesSection";
import { EventSidebar } from "@/components/events/despertar360/EventSidebar";
import type { EventPrice } from "@/types/event";

const DespertarExplanation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [prices, setPrices] = useState<EventPrice[]>([]);
  
  // Definir URL de Vimeo directamente
  const vimeoUrl = "https://vimeo.com/1062910579/05e72b4425";
  const formattedVideoPath = formatVimeoUrl(vimeoUrl);
  
  useEffect(() => {
    console.log("Using Vimeo URL:", vimeoUrl);
    console.log("Formatted to:", formattedVideoPath);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    const checkIfAdmin = async () => {
      const isUserAdmin = localStorage.getItem('is_admin') === 'true';
      setIsAdmin(isUserAdmin);
    };
    
    // Set fixed prices
    const loadPrices = () => {
      const fixedPrices: EventPrice[] = [
        {
          id: "general",
          event_name: "despertar-360-general",
          price_amount: 5000,
          currency: "USD",
          is_active: true,
          ticket_description: "ENTRADA GENERAL",
          valid_until: new Date(2025, 2, 10).toISOString() // 10 de marzo de 2025 (mes es 0-indexado)
        },
        {
          id: "vip",
          event_name: "despertar-360-vip",
          price_amount: 15000,
          currency: "USD",
          is_active: true,
          ticket_description: "VIP",
          valid_until: new Date(2024, 11, 31).toISOString()
        },
        {
          id: "platinum",
          event_name: "despertar-360-platinum",
          price_amount: 30000,
          currency: "USD",
          is_active: true,
          ticket_description: "VIP PLATINO",
          valid_until: new Date(2025, 2, 10).toISOString() // Updated to March 10, 2025
        }
      ];

      setPrices(fixedPrices);
    };
    
    checkIfAdmin();
    loadPrices();
    return () => clearTimeout(timer);
  }, [formattedVideoPath]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <VideoHeroSection 
        videoPath={formattedVideoPath}
        isLoading={isLoading}
      />
      
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <EventFeatures />
        </div>
      </div>
      
      <TestimonialsSection />
      <GuaranteeSection />
      
      <div id="pricing-section" className="bg-[#1A1F2C] py-16">
        <div className="container mx-auto px-4">
          <PricingSection prices={prices} />
        </div>
      </div>
      
      <LearningOutcomesSection />
      <FAQSection />
      <FinalCTASection onRegisterClick={scrollToPricing} />
    </div>
  );
};

export default DespertarExplanation;
