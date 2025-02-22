
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GreyPlatinum = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            GREY PLATINUM
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            La experiencia más exclusiva de coaching y consultoría para líderes visionarios
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Acceso Total</h3>
            <p className="text-gray-400">Disponibilidad 24/7 para consultas y soporte empresarial crítico</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Mastermind Elite</h3>
            <p className="text-gray-400">Participación en sesiones estratégicas con líderes de alto nivel</p>
          </div>
          <div className="glass-card p-8 rounded-xl hover-lift">
            <h3 className="text-xl font-semibold mb-4">Eventos VIP</h3>
            <p className="text-gray-400">Acceso exclusivo a retiros y eventos de networking premium</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="bg-white text-background hover:bg-white/90">
            Solicita una invitación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GreyPlatinum;
