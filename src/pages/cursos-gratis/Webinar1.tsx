
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Webinar1 = () => {
  const [leadData, setLeadData] = useState<{ name: string; email: string; whatsapp: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came through the lead magnet page
    const storedLead = localStorage.getItem("webinarLead");
    if (!storedLead) {
      navigate("/cursos-gratis");
      return;
    }

    setLeadData(JSON.parse(storedLead));
    
    // Update funnel stage in Supabase
    const updateFunnelStage = async () => {
      const parsedLead = JSON.parse(storedLead);
      await supabase.from("webinar_leads").upsert({
        email: parsedLead.email,
        funnel_stage: "webinar_1"
      }, { onConflict: "email" });
    };

    updateFunnelStage();
  }, [navigate]);

  const handleNextWebinar = () => {
    navigate("/cursos-gratis/webinar-2");
  };

  if (!leadData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">La Octava Área: Fase 1</h2>
            <div className="text-sm">
              <span className="text-accent font-medium">1</span> / 4
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden mb-8">
            {/* Video Embed Placeholder */}
            <div className="aspect-video bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Video del Webinar - Fase 1</h3>
                <p className="text-gray-400">Descubriendo la Octava Área de tu vida</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium mb-4">Puntos clave del Webinar</h3>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">1.</span>
                <div>
                  <h4 className="font-medium">El problema de las 7 áreas tradicionales</h4>
                  <p className="text-gray-300 text-sm">Por qué los modelos tradicionales de desarrollo personal no abordan el área más importante.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">2.</span>
                <div>
                  <h4 className="font-medium">Indicadores de que necesitas la octava área</h4>
                  <p className="text-gray-300 text-sm">Señales que indican que estás experimentando un desequilibrio en esta área fundamental.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">3.</span>
                <div>
                  <h4 className="font-medium">El efecto dominó de la octava área</h4>
                  <p className="text-gray-300 text-sm">Cómo esta área influencia directamente todas las demás áreas de tu vida.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Button
              onClick={handleNextWebinar}
              className="bg-accent hover:bg-accent/80 text-black font-medium px-8 py-6"
            >
              Continuar a la Fase 2 →
            </Button>
            
            <p className="mt-4 text-sm text-gray-400">
              Asegúrate de ver el video completo antes de continuar para aprovechar al máximo el curso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar1;
