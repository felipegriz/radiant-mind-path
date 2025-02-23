
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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
import type { EventPrice } from "@/types/event";

const stripePromise = loadStripe("pk_test_51Op7kfLsUYD3w5DwwooYfzIZaKnZ4XKr5aKuCVU9NeM2WJaD2Vhq94mzwEwqn4H1fxD5bDVmaf6Yh19NoSkhiWYe00wvDQG3ZH");

const Despertar360 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prices, setPrices] = useState<EventPrice[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<EventPrice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    const loadPrices = async () => {
      const { data, error } = await supabase
        .from('event_prices')
        .select('*')
        .like('event_name', 'despertar-360%')
        .eq('is_active', true)
        .order('price_amount');

      if (error) {
        console.error('Error loading prices:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los precios del evento. Por favor, intenta más tarde.",
        });
        return;
      }

      if (data) {
        setPrices(data);
        const generalTicket = data.find(price => price.event_name === 'despertar-360-general');
        if (generalTicket) {
          setSelectedPrice(generalTicket);
        }
      }
    };

    Promise.all([checkAuth(), loadPrices()]).then(() => setIsLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handlePayment = async () => {
    if (!selectedPrice) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, selecciona un tipo de entrada.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(
        'https://awbrvqrtqxwomnevipdt.supabase.co/functions/v1/create-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: selectedPrice.id,
            eventName: selectedPrice.event_name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Error al cargar Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo procesar el pago. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('.bg-[#1A1F2C]');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {isAuthenticated && <GraduatesButton onNavigate={() => navigate("/student-area")} />}
      
      <HeroSection />
      <StorySection />

      <div className="container mx-auto px-4 py-16">
        <EventFeatures />
      </div>

      <TestimonialsSection />
      <GuaranteeSection />

      <div className="bg-[#1A1F2C] py-16">
        <div className="container mx-auto px-4">
          <PricingSection
            prices={prices}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onPayment={handlePayment}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      {!isLoading && isAuthenticated && (
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
