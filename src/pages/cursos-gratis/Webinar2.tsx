
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Webinar2 = () => {
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
          funnel_stage: "webinar_2"
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

  const handleNextWebinar = () => {
    navigate("/cursos-gratis/webinar-3");
  };

  if (!leadData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">La Octava Área: Fase 2</h2>
            <div className="text-sm">
              <span className="text-accent font-medium">2</span> / 4
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden mb-8">
            {/* Video Embed Placeholder */}
            <div className="aspect-video bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Video del Webinar - Fase 2</h3>
                <p className="text-gray-400">Los 3 pilares de la Octava Área</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium mb-4">Puntos clave del Webinar</h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">1.</span>
                <div>
                  <h4 className="font-medium">El primer pilar: Conciencia expandida</h4>
                  <p className="text-gray-300 text-sm">Cómo desarrollar una perspectiva que trasciende las limitaciones cotidianas.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">2.</span>
                <div>
                  <h4 className="font-medium">El segundo pilar: Integración interna</h4>
                  <p className="text-gray-300 text-sm">El proceso para alinear tus diferentes aspectos internos y eliminar conflictos subconscientes.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">3.</span>
                <div>
                  <h4 className="font-medium">El tercer pilar: Manifestación consciente</h4>
                  <p className="text-gray-300 text-sm">Las leyes que gobiernan la materialización de tus objetivos y cómo aprovecharlas a tu favor.</p>
                </div>
              </li>
            </ul>
            
            <div className="p-4 border border-accent/30 bg-accent/5 rounded-md">
              <h4 className="font-medium text-accent mb-2">Ejercicio práctico</h4>
              <p className="text-sm">Dedica 10 minutos hoy a identificar un área de tu vida donde sientes resistencia o estancamiento. Observa cómo se relaciona con los tres pilares explicados en este webinar.</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleNextWebinar}
              className="bg-accent hover:bg-accent/80 text-black font-medium px-8 py-6"
            >
              Continuar a la Fase 3 →
            </Button>
            
            <p className="mt-4 text-sm text-gray-400">
              No olvides realizar el ejercicio práctico para obtener el máximo beneficio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar2;
