
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Webinar3 = () => {
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
          funnel_stage: "webinar_3"
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
    navigate("/cursos-gratis/webinar-4");
  };

  if (!leadData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">La Octava Área: Fase 3</h2>
            <div className="text-sm">
              <span className="text-accent font-medium">3</span> / 4
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden mb-8">
            {/* Video Embed Placeholder */}
            <div className="aspect-video bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Video del Webinar - Fase 3</h3>
                <p className="text-gray-400">Implementación de la Octava Área en tu vida diaria</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium mb-4">Puntos clave del Webinar</h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">1.</span>
                <div>
                  <h4 className="font-medium">La rutina de activación matutina</h4>
                  <p className="text-gray-300 text-sm">Los 7 minutos que transformarán tu día y activarán tu potencial desde primera hora.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">2.</span>
                <div>
                  <h4 className="font-medium">Gestión de obstáculos internos</h4>
                  <p className="text-gray-300 text-sm">Técnicas específicas para superar la resistencia mental y las creencias limitantes.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">3.</span>
                <div>
                  <h4 className="font-medium">Mapa de implementación gradual</h4>
                  <p className="text-gray-300 text-sm">Los pasos secuenciales para integrar estas prácticas en tu vida sin sentirte abrumado.</p>
                </div>
              </li>
            </ul>
            
            <div className="p-4 border border-accent/30 bg-accent/5 rounded-md">
              <h4 className="font-medium text-accent mb-2">Testimonios de estudiantes</h4>
              <div className="space-y-3">
                <p className="text-sm italic">"Después de implementar las técnicas de la Octava Área, mis ingresos aumentaron un 40% en tres meses, pero lo más sorprendente fue la claridad mental que obtuve." - María G.</p>
                <p className="text-sm italic">"Llevaba años luchando con problemas de enfoque y procrastinación. Con solo aplicar la rutina matutina, mi productividad se ha duplicado." - Carlos R.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleNextWebinar}
              className="bg-accent hover:bg-accent/80 text-black font-medium px-8 py-6"
            >
              Continuar a la Fase Final →
            </Button>
            
            <p className="mt-4 text-sm text-gray-400">
              En la próxima fase, descubrirás cómo llevar estos conceptos al siguiente nivel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar3;
