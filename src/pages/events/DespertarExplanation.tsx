
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExplanationVideoPlayer } from "@/components/video/ExplanationVideoPlayer";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";
import { PricingSection } from "@/components/events/despertar360/PricingSection";
import { EventFeatures } from "@/components/events/despertar360/EventFeatures";
import { GuaranteeSection } from "@/components/events/despertar360/GuaranteeSection";
import { TestimonialsSection } from "@/components/events/despertar360/TestimonialsSection";
import { FAQSection } from "@/components/events/despertar360/FAQSection";
import { FinalCTASection } from "@/components/events/despertar360/FinalCTASection";
import type { EventPrice } from "@/types/event";

const DespertarExplanation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [prices, setPrices] = useState<EventPrice[]>([]);
  
  const vimeoUrl = "https://vimeo.com/1062910579/05e72b4425";
  const formattedVideoPath = formatVimeoUrl(vimeoUrl);
  
  useEffect(() => {
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
    };
    
    checkIfAdmin();
    loadPrices();
    return () => clearTimeout(timer);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-[#1A1F2C] text-white py-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white mb-6 hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver
          </Button>
          
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              DESPERTAR 360°
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-6">
              Dale Play al video y aprende porque es el seminario número uno habla hispana
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto bg-black/40 rounded-xl overflow-hidden mb-10">
            <ExplanationVideoPlayer 
              videoPath={formattedVideoPath} 
              isLoading={isLoading}
            />
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl mb-6">
              El seminario intensivo de transformación personal más potente de habla hispana.
            </p>
            
            <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6 text-left mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                <p>3 días de inmersión total para reprogramar tu mente</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                <p>Técnicas avanzadas de PNL y meditación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
      
      <div className="bg-white/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">¿Qué aprenderás en DESPERTAR 360°?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Reprogramación Mental</h3>
                <p className="text-gray-600">Técnicas avanzadas para eliminar creencias limitantes y patrones saboteadores.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Expansión de Consciencia</h3>
                <p className="text-gray-600">Métodos prácticos para elevar tu nivel de consciencia y conectar con estados superiores.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Manifestación Consciente</h3>
                <p className="text-gray-600">Aprende a utilizar las leyes universales para manifestar la vida que deseas.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Liberación Emocional</h3>
                <p className="text-gray-600">Herramientas para liberar traumas, miedos y bloqueos emocionales.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Propósito de Vida</h3>
                <p className="text-gray-600">Descubre tu verdadera misión y propósito, alineando tu vida con tu esencia.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">Relación con el Dinero</h3>
                <p className="text-gray-600">Transforma tu relación con la abundancia y elimina los bloqueos financieros.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FAQSection />
      <FinalCTASection onRegisterClick={scrollToPricing} />
    </div>
  );
};

export default DespertarExplanation;
