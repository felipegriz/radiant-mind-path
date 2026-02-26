
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const seminars = [
  {
    title: "CÓDIGOS DE LIBERTAD",
    description: "Descubre los códigos que te permitirán liberar tu máximo potencial y romper las cadenas que te limitan.",
    path: "/events/codigos-de-libertad",
    available: false,
  },
  {
    title: "DESPERTAR 360°",
    description: "Una experiencia inmersiva de transformación total que despierta tu poder interior en todas las áreas de tu vida.",
    path: "/events/despertar-360",
    available: true,
  },
  {
    title: "XPRÉNDETE",
    description: "Un seminario diseñado para sorprenderte y sacarte de tu zona de confort hacia resultados extraordinarios.",
    path: "/events/xprendete",
    available: false,
  },
  {
    title: "CITA CON LO IMPOSIBLE",
    description: "Atrévete a ir más allá de lo que crees posible. Un evento que redefine tus límites.",
    path: "/events/cita-con-lo-imposible",
    available: true,
  },
  {
    title: "MISSION MASTERY",
    description: "Domina tu misión de vida y conviértela en un legado de impacto y trascendencia.",
    path: "/events/mission-mastery",
    available: true,
  },
];

const Seminarios = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 uppercase">
            Seminarios de Inmersión
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Formato de alto impacto que garantiza la retención de la información y tu transformación
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {seminars.map((seminar, index) => (
            <motion.div
              key={seminar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-lift cursor-pointer"
              onClick={() => seminar.available && navigate(seminar.path)}
            >
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {seminar.title}
                </h2>
                <p className="text-muted-foreground">{seminar.description}</p>
              </div>
              <Button
                variant={seminar.available ? "default" : "secondary"}
                className="rounded-full shrink-0"
                disabled={!seminar.available}
                onClick={(e) => {
                  e.stopPropagation();
                  if (seminar.available) navigate(seminar.path);
                }}
              >
                {seminar.available ? (
                  <>
                    Ver más <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Próximamente"
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seminarios;
