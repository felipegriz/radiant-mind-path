import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const cursos = [
  {
    title: "La Octava Área",
    description:
      "Descubre el área oculta que influye en todas las demás áreas de tu vida y aprende a dominarla.",
    path: "/courses/octava-area",
    cta: "Ver Curso",
    available: true,
  },
  {
    title: "ACCIONADORES",
    description:
      "Programa online en vivo para pasar a la acción y crear resultados reales en tu vida.",
    available: false,
  },
  {
    title: "ACTITUD DE PLENITUD",
    description:
      "Transforma tu estado interno y vive desde la plenitud todos los días.",
    available: false,
  },
  {
    title: "INFO-EMPRENDIMIENTO",
    description:
      "Construye y escala tu negocio digital con metodologías probadas.",
    available: false,
  },
  {
    title: "AI MASTERY",
    description:
      "Domina la inteligencia artificial y aplícala en tu vida y negocio.",
    available: false,
  },
];

const Cursos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cursos</h1>
            <p className="text-xl text-gray-300">
              Programas y entrenamientos diseñados para transformar tu vida y tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cursos.map((curso) => (
              <div
                key={curso.title}
                className={`bg-white/5 p-6 rounded-lg border border-white/10 transition-all ${
                  curso.available ? "hover:border-accent/50" : "opacity-70"
                }`}
              >
                <h2 className="text-2xl font-bold mb-3 text-accent">
                  {curso.title}
                </h2>
                <p className="mb-6 text-gray-300">{curso.description}</p>
                {curso.available && curso.path ? (
                  <Link to={curso.path}>
                    <Button className="w-full bg-accent hover:bg-accent/80 text-black">
                      {curso.cta}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Próximamente
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
