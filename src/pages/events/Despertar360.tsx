
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";

const Despertar360 = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">DESPERTAR 360</h1>
            <p className="text-xl text-gray-300 mb-8">
              Una experiencia transformadora que te llevará a descubrir tu verdadero potencial y despertar tu consciencia superior
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
              DESPERTAR 360 es un seminario intensivo de tres días diseñado para ayudarte a romper 
              limitaciones, transformar creencias y acceder a estados elevados de consciencia. 
              A través de técnicas avanzadas de programación mental y ejercicios prácticos, 
              descubrirás herramientas poderosas para manifestar la vida que deseas.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <CalendarDays className="w-6 h-6 text-white" />
                <span className="text-gray-300">3 días intensivos</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-white" />
                <span className="text-gray-300">Grupo reducido</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-white" />
                <span className="text-gray-300">Ubicación Premium</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-white" />
                <span className="text-gray-300">Inmersión Total</span>
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
                Técnicas avanzadas de meditación y mindfulness
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Herramientas de programación mental y PNL
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Métodos para elevar tu frecuencia vibracional
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prácticas para manifestación consciente
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Estrategias para mantener estados elevados
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

export default Despertar360;
