
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const CitaConLoImposible = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">CITA CON LO IMPOSIBLE</h1>
            <p className="text-xl text-gray-300 mb-8">
              Desafía tus límites y transforma lo imposible en inevitable en este evento único
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Sobre el Evento</h2>
            <p className="text-gray-300 mb-6">
              CITA CON LO IMPOSIBLE es un evento transformador donde aprenderás a 
              reprogramar tus limitaciones y crear nuevas posibilidades en tu vida. 
              A través de ejercicios prácticos y experiencias inmersivas, 
              descubrirás cómo convertir tus mayores desafíos en oportunidades de crecimiento.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <CalendarDays className="w-6 h-6 text-white" />
                <span className="text-gray-300">2 días intensivos</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-white" />
                <span className="text-gray-300">Grupo selecto</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-white" />
                <span className="text-gray-300">Locación Exclusiva</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-white" />
                <span className="text-gray-300">Transformación Total</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">¿Qué Aprenderás?</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Técnicas para superar límites autoimpuestos
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Metodologías de manifestación avanzada
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Estrategias para reprogramación mental
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Herramientas para transformar creencias limitantes
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prácticas para mantener estados peak
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-accent hover:bg-accent/80 text-background px-8 py-4 rounded-full text-lg font-bold transition-colors">
            Reserva Tu Lugar Ahora
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CitaConLoImposible;
