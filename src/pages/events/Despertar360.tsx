
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { EventFeatures } from "@/components/events/despertar360/EventFeatures";
import { StudentResources } from "@/components/events/despertar360/StudentResources";
import { PricingSection } from "@/components/events/despertar360/PricingSection";
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
        .in('event_name', ['despertar-360-general', 'despertar-360-vip', 'despertar-360-platinum'])
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

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {!isLoading && (
        <div className="container mx-auto px-4">
          <div className="flex justify-end py-4">
            {isAuthenticated ? (
              <Button 
                onClick={() => document.getElementById('studentPortal')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
              >
                Portal de Graduados Despertar
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/auth/login')}
                className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
              >
                Acceder al Portal de Graduados Despertar
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">DESPERTAR 360</h1>
            <p className="text-xl text-gray-600 mb-8">
              Una experiencia transformadora que te llevará a descubrir tu verdadero potencial y despertar tu consciencia superior
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <EventFeatures />

        {!isLoading && isAuthenticated && <StudentResources />}

        <PricingSection
          prices={prices}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onPayment={handlePayment}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};

export default Despertar360;
