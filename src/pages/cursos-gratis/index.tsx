
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const CursosGratis = () => {
  const navigate = useNavigate();

  const handleStartFunnel = () => {
    navigate("/cursos-gratis/lead-magnet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cursos Gratuitos de Felipe Griz
          </h1>
          
          <p className="text-xl mb-12">
            Aprende metodologías transformadoras que han ayudado a miles de personas a alcanzar su máximo potencial.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-accent/50 transition-all">
              <h2 className="text-2xl font-bold mb-4 text-accent">La Octava Área</h2>
              <p className="mb-6">
                Descubre el área oculta que influye en todas las demás áreas de tu vida y cómo dominarla para obtener resultados extraordinarios.
              </p>
              <Button 
                onClick={handleStartFunnel}
                className="w-full bg-accent hover:bg-accent/80 text-black"
              >
                Acceder Ahora
              </Button>
            </div>
            
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 opacity-70">
              <h2 className="text-2xl font-bold mb-4">Próximamente</h2>
              <p className="mb-6">
                Estamos preparando nuevos cursos gratuitos que estarán disponibles muy pronto. ¡Mantente atento!
              </p>
              <Button 
                disabled
                className="w-full"
              >
                Próximamente
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">¿Por qué mis cursos gratuitos?</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="text-left">
                <h4 className="font-semibold text-accent mb-2">Contenido de Calidad</h4>
                <p className="text-sm">
                  No son simples introducciones. Mis cursos gratuitos contienen información valiosa y aplicable de inmediato.
                </p>
              </div>
              
              <div className="text-left">
                <h4 className="font-semibold text-accent mb-2">Metodología Probada</h4>
                <p className="text-sm">
                  Técnicas y estrategias que han funcionado para miles de estudiantes en más de 20 países.
                </p>
              </div>
              
              <div className="text-left">
                <h4 className="font-semibold text-accent mb-2">Transformación Real</h4>
                <p className="text-sm">
                  Enfoque práctico orientado a resultados concretos en tu vida personal y profesional.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartFunnel}
              className="mt-4 bg-accent hover:bg-accent/80 text-black px-8"
            >
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursosGratis;
