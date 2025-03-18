
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Webinar4 = () => {
  const [leadData, setLeadData] = useState<{ name: string; email: string; whatsapp: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user came through the funnel
    const storedLead = localStorage.getItem("webinarLead");
    if (!storedLead) {
      toast({
        title: "Acceso denegado",
        description: "Debes registrarte primero para acceder a este contenido.",
        variant: "destructive",
      });
      navigate("/cursos-gratis");
      return;
    }

    setLeadData(JSON.parse(storedLead));
    
    // Update funnel stage in Supabase
    const updateFunnelStage = async () => {
      try {
        const parsedLead = JSON.parse(storedLead);
        const { error } = await supabase.from("webinar_leads").upsert({
          email: parsedLead.email,
          name: parsedLead.name,
          whatsapp: parsedLead.whatsapp,
          funnel_stage: "webinar_4_completed"
        }, { onConflict: "email" });
        
        if (error) {
          console.error("Error updating funnel stage:", error);
        }
      } catch (error) {
        console.error("Error in updateFunnelStage:", error);
      }
    };

    updateFunnelStage();
  }, [navigate, toast]);

  const handleUpgrade = () => {
    // Here you would redirect to the premium course sales page
    window.location.href = "/coaching-consultoria/super-humano";
  };

  if (!leadData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">La Octava Área: Fase Final</h2>
            <div className="text-sm">
              <span className="text-accent font-medium">4</span> / 4
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden mb-8">
            {/* Video Embed Placeholder */}
            <div className="aspect-video bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Video del Webinar - Fase Final</h3>
                <p className="text-gray-400">Resultados exponenciales con la Octava Área</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium mb-4">Puntos clave del Webinar</h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">1.</span>
                <div>
                  <h4 className="font-medium">El principio de aceleración</h4>
                  <p className="text-gray-300 text-sm">Cómo multiplicar tus resultados a través de ciclos específicos de implementación.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">2.</span>
                <div>
                  <h4 className="font-medium">Integración con otras áreas</h4>
                  <p className="text-gray-300 text-sm">El método para que la Octava Área potencie tus finanzas, relaciones, salud y espiritualidad.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">3.</span>
                <div>
                  <h4 className="font-medium">Limitaciones del curso gratuito</h4>
                  <p className="text-gray-300 text-sm">Lo que no hemos podido cubrir en este curso introductorio y cómo acceder al conocimiento completo.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-accent/10 p-8 rounded-lg border border-accent mb-10">
            <h3 className="text-2xl font-bold mb-4 text-center">¿Listo para el siguiente nivel?</h3>
            <p className="mb-6 text-center">
              Has completado el curso gratuito sobre la Octava Área. Este es solo el primer paso hacia una transformación completa.
            </p>
            
            <div className="bg-white/10 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-semibold mb-3">Con el programa completo SÚPER HUMANO obtendrás:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>12 módulos avanzados con técnicas exclusivas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Mentoría personalizada para tu caso específico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Comunidad privada de practicantes avanzados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Material práctico para implementación inmediata</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Acceso de por vida a actualizaciones futuras</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handleUpgrade}
                className="bg-accent hover:bg-accent/90 text-black font-bold text-lg px-8 py-6"
              >
                ACCEDER AL PROGRAMA COMPLETO
              </Button>
              <p className="mt-4 text-sm">
                <span className="font-medium">Oferta especial:</span> Los primeros 20 inscritos reciben una sesión privada con Felipe Griz
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>Gracias por completar el curso gratuito de La Octava Área.</p>
            <p>Recibirás recursos adicionales en tu correo electrónico en los próximos días.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar4;
