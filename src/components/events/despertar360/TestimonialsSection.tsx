
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-primary mb-12 text-center">
        TRANSFORMACIONES REALES DE NUESTROS GRADUADOS
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <p className="text-gray-600 mb-4">
            "En solo 3 días, logré más claridad y dirección que en años de terapia convencional..."
          </p>
          <p className="font-semibold text-primary">María G.</p>
          <p className="text-sm text-gray-500">Empresaria</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <p className="text-gray-600 mb-4">
            "Las técnicas que aprendí en Despertar 360 literalmente transformaron mi vida..."
          </p>
          <p className="font-semibold text-primary">Carlos R.</p>
          <p className="text-sm text-gray-500">Coach Profesional</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <p className="text-gray-600 mb-4">
            "Mi nivel de consciencia se expandió de una manera que nunca creí posible..."
          </p>
          <p className="font-semibold text-primary">Ana P.</p>
          <p className="text-sm text-gray-500">Terapeuta</p>
        </motion.div>
      </div>
    </div>
  );
};
