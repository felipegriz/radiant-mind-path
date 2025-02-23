
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPriceId, setProcessingPriceId] = useState<string | null>(null);
  const [prices, setPrices] = useState<EventPrice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const checkStripeError = () => {
      const hasStripeError = searchParams.get('stripe_error');
      if (hasStripeError) {
        toast({
          variant: "destructive",
          title: "Error en el proceso de pago",
          description: "La sesión de pago ha expirado o no es válida. Por favor, intenta realizar la compra nuevamente.",
          duration: 5000,
        });
        // Limpiar el parámetro de error de la URL
        navigate('/events/despertar-360', { replace: true });
      }
    };

    checkStripeError();
  }, [searchParams, toast, navigate]);

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

  const handlePayment = async (selectedPrice: EventPrice) => {
    setProcessingPriceId(selectedPrice.id);
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Error al inicializar Stripe');
      }

      toast({
        title: "Iniciando proceso de pago",
        description: "Preparando el checkout de Stripe...",
      });

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: {
          event_name: selectedPrice.event_name,
          price_amount: selectedPrice.price_amount
        }
      });

      if (checkoutError) {
        console.error('Error al crear sesión:', checkoutError);
        throw new Error('Error al crear la sesión de pago. Por favor, intenta de nuevo.');
      }

      if (!checkoutData?.sessionId) {
        throw new Error('No se pudo crear la sesión de pago. Por favor, intenta de nuevo.');
      }

      toast({
        title: "Redirigiendo al checkout",
        description: "Te estamos llevando a la página segura de pago...",
      });

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: checkoutData.sessionId
      });

      if (stripeError) {
        console.error('Error de Stripe:', stripeError);
        navigate('/events/despertar-360?stripe_error=true', { replace: true });
        return;
      }

    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      toast({
        variant: "destructive",
        title: "Error en el proceso de pago",
        description: "Hubo un problema al procesar tu pago. Por favor, intenta de nuevo en unos momentos o contacta a soporte si el problema persiste.",
        duration: 5000,
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
