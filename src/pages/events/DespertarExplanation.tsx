
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExplanationVideoPlayer } from "@/components/video/ExplanationVideoPlayer";
import { EventSidebar } from "@/components/events/despertar360/EventSidebar";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";

const DespertarExplanation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
    
    checkIfAdmin();
    return () => clearTimeout(timer);
  }, []);

  console.log("Original Vimeo URL:", vimeoUrl);
  console.log("Formatted video path:", formattedVideoPath);

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
            DESPERTAR 360° - Dale Play al video y aprende porque es el seminario número uno habla hispana
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-2/3 aspect-auto bg-black/40 rounded-xl overflow-hidden">
              <ExplanationVideoPlayer 
                videoPath={formattedVideoPath} 
                isLoading={isLoading}
              />
            </div>
            
            <div className="lg:w-1/3 bg-white/10 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6">Descubre DESPERTAR 360°</h2>
              <div className="space-y-4">
                <p className="text-lg">
                  El seminario intensivo de transformación personal más potente de habla hispana.
                </p>
                
                <div className="space-y-3 my-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <p>3 días de inmersión total para reprogramar tu mente y conectar con tu verdadero potencial</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <p>Técnicas avanzadas de PNL, meditación y reprogramación mental</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <p>Garantía de satisfacción: Si no te convence, te devolvemos el 100% de tu inversión</p>
                  </div>
                </div>
                
                <p className="text-lg">
                  Este no es un seminario más, es una experiencia transformadora que ha cambiado la 
                  vida de más de 10,000 personas en América Latina.
                </p>
                
                <Button 
                  className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-semibold w-full"
                  onClick={() => navigate("/events/despertar-360")}
                >
                  Ver fechas y precios
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-8 text-white mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">¿Qué aprenderás en DESPERTAR 360°?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Reprogramación Mental</h3>
                <p>Técnicas avanzadas para eliminar creencias limitantes y patrones saboteadores que te impiden alcanzar tus metas.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Expansión de Consciencia</h3>
                <p>Métodos prácticos para elevar tu nivel de consciencia y conectar con estados superiores de tu ser.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Manifestación Consciente</h3>
                <p>Aprende a utilizar las leyes universales para manifestar la vida que deseas con precisión y rapidez.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Liberación Emocional</h3>
                <p>Herramientas para liberar traumas, miedos y bloqueos emocionales que te mantienen atrapado en patrones del pasado.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Propósito de Vida</h3>
                <p>Descubre tu verdadera misión y propósito, alineando tu vida con lo que realmente viniste a hacer en este mundo.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Relación con el Dinero</h3>
                <p>Transforma tu relación con la abundancia y elimina los bloqueos que te impiden prosperar financieramente.</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full font-semibold"
                onClick={() => navigate("/events/despertar-360")}
              >
                Quiero transformar mi vida ahora
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-8 text-white mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Testimonios de Graduados</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="italic mb-4">
                  "DESPERTAR 360° cambió mi vida por completo. Llegué con depresión y sin rumbo, 
                  y salí con una claridad y propósito que nunca había experimentado antes. Ahora 
                  vivo la vida que siempre soñé."
                </p>
                <p className="font-semibold">Carlos Rodríguez, 34 años</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="italic mb-4">
                  "Había intentado todo tipo de terapias y cursos, pero nada me dio los resultados 
                  que obtuve con DESPERTAR 360°. En solo tres días, transformé patrones que llevaba 
                  arrastrando toda mi vida."
                </p>
                <p className="font-semibold">María López, 42 años</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full font-semibold"
                onClick={() => navigate("/events/despertar-360")}
              >
                Reserva tu lugar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespertarExplanation;
