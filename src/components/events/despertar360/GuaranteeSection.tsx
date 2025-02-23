
import { motion } from "framer-motion";

export const GuaranteeSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">GARANTÍA DE SATISFACCIÓN</h2>
          <p className="text-xl text-gray-600 mb-8">
            Si al finalizar el primer día del evento no estás 100% convencido de que esta es la 
            experiencia más transformadora de tu vida, te devolvemos el 100% de tu inversión, 
            sin preguntas.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
