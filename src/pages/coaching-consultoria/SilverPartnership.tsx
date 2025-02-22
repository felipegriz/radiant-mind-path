
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SilverPartnership = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            SILVER PARTNERSHIP
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Eleva tu negocio y tu vida al siguiente nivel con mentoría ejecutiva premium
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Acceso Privilegiado</h3>
            <p className="text-gray-400">Comunicación directa y priorizada para respuestas rápidas a tus consultas</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Estrategia Empresarial</h3>
            <p className="text-gray-400">Asesoramiento experto para optimizar tus operaciones y maximizar resultados</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Networking Exclusivo</h3>
            <p className="text-gray-400">Conexiones con otros miembros Silver y acceso a eventos privados</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="bg-white text-background hover:bg-white/90">
            Solicita una entrevista de evaluación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SilverPartnership;
