
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

const stripePromise = loadStripe("pk_live_51Op7kfLsUYD3w5DwMzYhZj6XHnQnPHYD4pD4M0JqaPY6qPnLHwgaTzAPKwRgxGNV2eK8UjZo3FWPQ0rhSWH6OZ8U00pPHXMtmG");

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
      setIsLoading(false);
    };

    Promise.all([checkAuth(), loadPrices()]);

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
      console.log('Iniciando proceso de pago para:', selectedPrice.event_name);
      
      const { data: checkoutResponse, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: {
          event_name: selectedPrice.event_name,
        }
      });

      console.log('Respuesta de create-checkout:', { checkoutResponse, checkoutError });

      if (checkoutError || !checkoutResponse?.sessionId) {
        console.error('Error al crear la sesión de checkout:', checkoutError);
        throw new Error(checkoutError?.message || 'Error al crear la sesión de pago');
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Error al cargar Stripe');
      }

      console.log('Redirigiendo a Stripe con sessionId:', checkoutResponse.sessionId);
      
      const { error: stripeError } = await stripe.redirectToCheckout({ 
        sessionId: checkoutResponse.sessionId 
      });
      
      if (stripeError) {
        console.error('Error de Stripe:', stripeError);
        throw stripeError;
      }
    } catch (error) {
      console.error('Error detallado del pago:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo procesar el pago. Por favor, intenta de nuevo.",
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
