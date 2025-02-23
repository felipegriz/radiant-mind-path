
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

const stripePromise = loadStripe("pk_live_51Op7kfLsUYD3w5DwMzYhZj6XHnQnPHYD4pD4M0JqaPY6qPnLHwgaTzAPKwRgxGNV2eK8UjZo3FWPQ0rhSWH6OZ8U00pPHXMtmG", {
  locale: 'es'
});

const Despertar360 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPriceId, setProcessingPriceId] = useState<string | null>(null);
  const [prices, setPrices] = useState<EventPrice[]>([]);
  const { toast } = useToast();

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
          price_amount: 5000, // $50.00
          currency: "USD",
          is_active: true,
          ticket_description: "GENERAL",
          valid_until: new Date(2024, 11, 31).toISOString()
        },
        {
          id: "vip",
          event_name: "despertar-360-vip",
          price_amount: 15000, // $150.00
          currency: "USD",
          is_active: true,
          ticket_description: "VIP",
          valid_until: new Date(2024, 11, 31).toISOString()
        },
        {
          id: "platinum",
          event_name: "despertar-360-platinum",
          price_amount: 30000, // $300.00
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

  const handlePayment = async (selectedPrice: EventPrice) => {
    setProcessingPriceId(selectedPrice.id);
    try {
      console.log('Iniciando proceso de pago para:', selectedPrice.event_name);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Error al inicializar Stripe');
      }

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: {
          event_name: selectedPrice.event_name,
          price_amount: selectedPrice.price_amount
        }
      });

      console.log('Respuesta del servidor:', { checkoutData, checkoutError });

      if (checkoutError || !checkoutData) {
        throw new Error(checkoutError?.message || 'Error al crear la sesión de pago');
      }

      if (!checkoutData.sessionId) {
        throw new Error('No se recibió el ID de la sesión de pago');
      }

      console.log('Redirigiendo a Stripe con sessionId:', checkoutData.sessionId);
      
      const { error: stripeError } = await stripe.redirectToCheckout({ 
        sessionId: checkoutData.sessionId 
      });

      if (stripeError) {
        throw stripeError;
      }

    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      toast({
        variant: "destructive",
        title: "Error en el proceso de pago",
        description: error.message || "Hubo un problema al procesar el pago. Por favor, intenta de nuevo.",
      });
      setProcessingPriceId(null);
    }
  };

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
      
      <HeroSection />
      <StorySection />

      <div className="container mx-auto px-4 py-16">
        <EventFeatures />
      </div>

      <TestimonialsSection />
      <GuaranteeSection />

      <div id="pricing-section" className="bg-[#1A1F2C] py-16">
        <div className="container mx-auto px-4">
          <PricingSection
            prices={prices}
            onPayment={handlePayment}
            processingPriceId={processingPriceId}
          />
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
