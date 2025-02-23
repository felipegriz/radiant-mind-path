
import { motion } from "framer-motion";
import { PlayCircle, FileText, BookOpen } from "lucide-react";

const studentResources = [
  {
    icon: PlayCircle,
    title: "Videos del Evento",
    description: "Accede a las grabaciones de todas las sesiones"
  },
  {
    icon: FileText,
    title: "Material Complementario",
    description: "Descarga guías y recursos exclusivos"
  },
  {
    icon: BookOpen,
    title: "Ejercicios Prácticos",
    description: "Profundiza tu aprendizaje con ejercicios guiados"
  }
];

export const StudentResources = () => {
  return (
    <motion.div
      id="studentPortal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div className="glass-card p-8 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Portal del Estudiante</h2>
          <p className="text-gray-300">
            Accede a todos los recursos exclusivos del evento Despertar 360
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {studentResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover-lift cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <resource.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300">{resource.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
