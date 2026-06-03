import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const CienciaDeLograr = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              La Ciencia de Lograr
            </h1>
            <p className="text-xl md:text-2xl text-accent font-light max-w-3xl mx-auto">
              La habilidad maestra número uno que Tony Robbins dice que garantiza
              una vida extraordinaria.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-accent">
              ¿Qué vas a aprender?
            </h2>
            <ul className="space-y-4 text-gray-200">
              {[
                "El sistema exacto que usan las personas más exitosas del mundo para lograr cualquier meta.",
                "Cómo eliminar la procrastinación y pasar a la acción masiva con claridad absoluta.",
                "La fórmula psicológica que convierte sueños en resultados predecibles.",
                "Estrategias prácticas para implementar desde el primer día.",
                "Acceso de por vida al contenido completo del curso.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-accent/10 p-8 rounded-lg border border-accent/30">
            <p className="text-lg text-gray-300 mb-2">Inversión única</p>
            <p className="text-5xl font-bold text-accent mb-6">$250 USD</p>
            <Link to="/courses/ciencia-de-lograr/checkout">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/80 text-black text-lg px-8 py-6"
              >
                Quiero Inscribirme Ahora
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Pago seguro · Acceso inmediato
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CienciaDeLograr;
