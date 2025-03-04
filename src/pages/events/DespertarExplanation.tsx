
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DespertarExplanation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Actualiza esta ruta después de subir tu video de explicación
  const explanationVideoPath = "/videos/explanation-video.mp4";
  
  useEffect(() => {
    // Simular la carga del video
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Verificar si el usuario es administrador (simplificado)
    const checkIfAdmin = async () => {
      const isUserAdmin = localStorage.getItem('is_admin') === 'true';
      setIsAdmin(isUserAdmin);
    };
    
    checkIfAdmin();
    return () => clearTimeout(timer);
  }, []);

  const handleCopyInstructions = () => {
    const instructions = `
1. Ve a /admin/upload-hero-video
2. Sube tu video de explicación
3. Copia la ruta del video generada
4. Actualiza la variable 'explanationVideoPath' en el archivo src/pages/events/DespertarExplanation.tsx
    `;
    navigator.clipboard.writeText(instructions);
    toast.success("Instrucciones copiadas al portapapeles");
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="text-white mb-6 hover:bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DESPERTAR 360° - Explicación Completa
          </h1>
          
          {/* Instrucciones para administradores */}
          {isAdmin && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-primary">Instrucciones para subir el video</h3>
                  <p className="text-sm text-white/80 mt-1">
                    1. Ve a <a href="/admin/upload-hero-video" className="text-primary underline">admin/upload-hero-video</a>
                  </p>
                  <p className="text-sm text-white/80">
                    2. Sube tu video de explicación (hasta 100MB)
                  </p>
                  <p className="text-sm text-white/80">
                    3. Copia la ruta del video generada
                  </p>
                  <p className="text-sm text-white/80">
                    4. Actualiza la variable 'explanationVideoPath' en el archivo src/pages/events/DespertarExplanation.tsx
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs"
                    onClick={handleCopyInstructions}
                  >
                    Copiar instrucciones
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="aspect-video bg-black/40 rounded-xl overflow-hidden mb-8">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
              </div>
            ) : (
              <video 
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src={explanationVideoPath} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            )}
          </div>
          
          <div className="bg-white/10 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Sobre DESPERTAR 360°</h2>
            <p className="text-lg mb-4">
              DESPERTAR 360° es un evento transformador diseñado para ayudarte a alcanzar 
              tu máximo potencial a través de técnicas revolucionarias de reprogramación mental.
            </p>
            <p className="text-lg mb-4">
              En este video, Felipe Griz explica detalladamente la metodología y los beneficios 
              que obtendrás al participar en este evento único.
            </p>
            <Button 
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-semibold"
              onClick={() => navigate("/events/despertar-360")}
            >
              Ver detalles del evento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespertarExplanation;
