
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { EventFeatures } from "@/components/events/despertar360/EventFeatures";
import { StudentResources } from "@/components/events/despertar360/StudentResources";
import { PricingSection } from "@/components/events/despertar360/PricingSection";
import { HeroSection } from "@/components/events/despertar360/HeroSection";
import { StorySection } from "@/components/events/despertar360/StorySection";
import { TestimonialsSection } from "@/components/events/despertar360/TestimonialsSection";
import { GuaranteeSection } from "@/components/events/despertar360/GuaranteeSection";
import { FAQSection } from "@/components/events/despertar360/FAQSection";
import { FinalCTASection } from "@/components/events/despertar360/FinalCTASection";
import { GraduatesButton } from "@/components/events/despertar360/GraduatesButton";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { EventPrice } from "@/types/event";

const Despertar360 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState<EventPrice[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    const loadPrices = async () => {
      const fixedPrices: EventPrice[] = [
        {
          id: "general",
          event_name: "despertar-360-general",
          price_amount: 5000,
          currency: "USD",
          is_active: true,
          ticket_description: "GENERAL",
          valid_until: new Date(2024, 11, 31).toISOString()
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
          valid_until: new Date(2024, 11, 31).toISOString()
        }
      ];

      setPrices(fixedPrices);
      setIsLoading(false);
    };

    Promise.all([checkAuth(), loadPrices()]);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {isAuthenticated && <GraduatesButton onNavigate={() => navigate("/student-area")} />}
      
      <div className="absolute top-28 right-6 z-40 md:block">
        <Button 
          onClick={() => navigate("/events/despertar-explanation")}
          className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Ver video explicativo
        </Button>
      </div>
      
      <HeroSection />
      <StorySection />

      <div className="container mx-auto px-4 py-16">
        <EventFeatures />
      </div>

      <TestimonialsSection />
      <GuaranteeSection />

      <div id="pricing-section" className="bg-[#1A1F2C] py-16">
        <div className="container mx-auto px-4">
          <PricingSection prices={prices} />
        </div>
      </div>

      {isAuthenticated && (
        <div className="container mx-auto px-4 py-16">
          <StudentResources />
        </div>
      )}

      <FAQSection />
      <FinalCTASection onRegisterClick={scrollToPricing} />
    </div>
  );
};

export default Despertar360;
