
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SuperHumano = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            SÚPER HUMANO
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Desbloquea tu máximo potencial y alcanza niveles extraordinarios de rendimiento
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Mentoría Personalizada</h3>
            <p className="text-gray-400">Sesiones one-on-one diseñadas específicamente para tus objetivos y desafíos</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Plan Estratégico</h3>
            <p className="text-gray-400">Desarrollo de una hoja de ruta clara para alcanzar tus metas más ambiciosas</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Seguimiento Continuo</h3>
            <p className="text-gray-400">Apoyo constante y ajustes en tiempo real para maximizar resultados</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="bg-white text-background hover:bg-white/90">
            Agenda una llamada de descubrimiento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperHumano;
