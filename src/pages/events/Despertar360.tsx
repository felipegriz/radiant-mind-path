
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
      
      {/* Botón de Graduados (Fuera del contenedor del hero para posicionamiento absoluto) */}
      {isAuthenticated && (
        <div className="absolute top-24 right-4 z-10">
          <Button 
            variant="secondary"
            onClick={() => navigate("/student-area")}
            className="shadow-lg"
          >
            Acceder al Área de Graduados
          </Button>
        </div>
      )}
      
      {/* Hook Section - Gancho Inicial */}
      <div className="bg-[#1A1F2C] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              DESCUBRE EL SECRETO QUE EL 95% DE LAS PERSONAS IGNORAN PARA ALCANZAR SU MÁXIMO POTENCIAL
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              La mayoría vive una vida mediocre porque nadie les enseñó esta poderosa técnica de transformación mental...
            </p>
            <div className="aspect-video mb-8">
              {/* Aquí iría tu video de VSL */}
              <div className="w-full h-full bg-black/40 rounded-xl flex items-center justify-center">
                <p className="text-xl">Video VSL</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Story Section - Historia de Transformación */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              DE ESTAR AL BORDE DEL COLAPSO A DESCUBRIR MI VERDADERO PROPÓSITO
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Hace años, me encontraba exactamente donde tú podrías estar ahora. Trabajaba sin parar, 
                intentando mantener el control de mi vida, pero por dentro sentía un vacío inexplicable...
              </p>
              <p className="mb-4">
                Fue entonces cuando descubrí el método que cambiaría mi vida para siempre. Una técnica tan 
                poderosa que transformó completamente mi realidad en cuestión de semanas.
              </p>
              <p className="mb-4 font-semibold">
                Hoy, después de haber ayudado a más de 10,000 personas a transformar sus vidas, he 
                perfeccionado este método y estoy listo para compartirlo contigo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Problem & Solution Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            ¿POR QUÉ LA MAYORÍA DE MÉTODOS DE DESARROLLO PERSONAL FALLAN?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Lo que NO funciona:</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✗ Técnicas superficiales de visualización</li>
                <li>✗ Afirmaciones positivas sin fundamento</li>
                <li>✗ Métodos que ignoran tu programación subconsciente</li>
                <li>✗ Prácticas que no abordan las creencias limitantes</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Lo que SÍ funciona:</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Reprogramación mental profunda</li>
                <li>✓ Técnicas basadas en neurociencia</li>
                <li>✓ Métodos probados y validados</li>
                <li>✓ Sistema integral de transformación</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <EventFeatures />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          TRANSFORMACIONES REALES DE NUESTROS GRADUADOS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <p className="text-gray-600 mb-4">
              "En solo 3 días, logré más claridad y dirección que en años de terapia convencional..."
            </p>
            <p className="font-semibold text-primary">María G.</p>
            <p className="text-sm text-gray-500">Empresaria</p>
          </motion.div>
          {/* Testimonial 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <p className="text-gray-600 mb-4">
              "Las técnicas que aprendí en Despertar 360 literalmente transformaron mi vida..."
            </p>
            <p className="font-semibold text-primary">Carlos R.</p>
            <p className="text-sm text-gray-500">Coach Profesional</p>
          </motion.div>
          {/* Testimonial 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <p className="text-gray-600 mb-4">
              "Mi nivel de consciencia se expandió de una manera que nunca creí posible..."
            </p>
            <p className="font-semibold text-primary">Ana P.</p>
            <p className="text-sm text-gray-500">Terapeuta</p>
          </motion.div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">GARANTÍA DE SATISFACCIÓN</h2>
            <p className="text-xl text-gray-600 mb-8">
              Si al finalizar el primer día del evento no estás 100% convencido de que esta es la 
              experiencia más transformadora de tu vida, te devolvemos el 100% de tu inversión, 
              sin preguntas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section with Dark Background */}
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

      {/* Student Portal Section (if authenticated) */}
      {!isLoading && isAuthenticated && (
        <div className="container mx-auto px-4 py-16">
          <StudentResources />
        </div>
      )}

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          PREGUNTAS FRECUENTES
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              ¿Es este evento para mí?
            </h3>
            <p className="text-gray-600">
              Si estás buscando una transformación profunda y estás dispuesto a hacer el trabajo 
              interior necesario, definitivamente este evento es para ti.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              ¿Necesito experiencia previa?
            </h3>
            <p className="text-gray-600">
              No, el programa está diseñado para funcionar sin importar tu nivel de experiencia 
              en desarrollo personal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              ¿Qué pasa si no puedo asistir?
            </h3>
            <p className="text-gray-600">
              Tienes hasta 7 días antes del evento para transferir tu entrada a otra fecha o 
              persona sin costo adicional.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-[#1A1F2C] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              ¿ESTÁS LISTO PARA TRANSFORMAR TU VIDA?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Las plazas son limitadas y se agotan rápidamente. 
              No pierdas la oportunidad de ser parte de esta experiencia única.
            </p>
            <Button 
              onClick={() => {
                const pricingSection = document.querySelector('.bg-[#1A1F2C]');
                pricingSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors"
            >
              ¡RESERVA TU LUGAR AHORA!
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Despertar360;
