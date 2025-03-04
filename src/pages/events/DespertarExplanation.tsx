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
  const [isInstagramUrl, setIsInstagramUrl] = useState(false);
  
  // Actualiza esta ruta después de subir tu video de explicación
  // Para Instagram, debe ser la URL completa con el formato: https://www.instagram.com/p/CODIGO/embed
  const explanationVideoPath = "https://www.instagram.com/reel/C6F2yMVAw_1/embed/";
  
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

    // Verificar si es una URL de Instagram
    const checkIfInstagramUrl = () => {
      const isInstagram = 
        explanationVideoPath.includes('instagram.com') || 
        explanationVideoPath.includes('instagr.am');
      
      setIsInstagramUrl(isInstagram);
      console.log("¿Es video de Instagram?", isInstagram);
      console.log("URL del video:", explanationVideoPath);
    };
    
    checkIfAdmin();
    checkIfInstagramUrl();
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

  const renderVideo = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      );
    }

    if (isInstagramUrl) {
      console.log("Renderizando video de Instagram:", explanationVideoPath);
      
      return (
        <div className="w-full h-full flex items-center justify-center">
          <iframe 
            src={explanationVideoPath}
            className="instagram-media w-full h-[600px] md:h-[700px]"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      );
    }

    return (
      <video 
        className="w-full h-full object-cover"
        controls
        playsInline
        autoPlay
      >
        <source src={explanationVideoPath} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
    );
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
        
        <div className="max-w-6xl mx-auto">
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
                    2. Sube tu video de explicación (hasta 100MB) o usa una URL de Instagram
                  </p>
                  <p className="text-sm text-white/80">
                    3. Copia la ruta o URL generada
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
          
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className={`${isInstagramUrl ? 'lg:w-2/5' : 'lg:w-2/3'} aspect-auto bg-black/40 rounded-xl overflow-hidden`}>
              {renderVideo()}
            </div>
            
            <div className={`${isInstagramUrl ? 'lg:w-3/5' : 'lg:w-1/3'} bg-white/10 rounded-xl p-6 text-white`}>
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
    </div>
  );
};

export default DespertarExplanation;
