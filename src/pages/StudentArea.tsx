
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Calendar, MessageCircle, FileText, PlayCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const resources = [
  {
    icon: PlayCircle,
    title: "Videos y Cursos",
    description: "Accede a todo el contenido multimedia y cursos disponibles",
    link: "#cursos"
  },
  {
    icon: Calendar,
    title: "Calendario de Eventos",
    description: "Mantente al día con los próximos eventos y sesiones",
    link: "#calendario"
  },
  {
    icon: FileText,
    title: "Materiales de Estudio",
    description: "Descarga documentos, guías y recursos complementarios",
    link: "#materiales"
  },
  {
    icon: MessageCircle,
    title: "Comunidad",
    description: "Conecta con otros estudiantes y comparte experiencias",
    link: "#comunidad"
  }
];

const StudentArea = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Área de Estudiantes</h1>
            <p className="text-xl text-gray-300 mb-8">
              Bienvenido al espacio exclusivo para estudiantes de Felipe Griz
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl hover-lift cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <resource.icon className="w-8 h-8 text-white shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-300">{resource.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda?</h2>
            <p className="text-gray-300 mb-6">
              Nuestro equipo está aquí para apoyarte en tu proceso de aprendizaje
            </p>
            <button className="bg-accent hover:bg-accent/80 text-background px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Contactar Soporte
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentArea;
