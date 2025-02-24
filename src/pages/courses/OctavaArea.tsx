
import React from "react";
import { motion } from "framer-motion";

const OctavaArea = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LA OCTAVA AREA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre el poder transformador de la octava área de tu vida y cómo puede potenciar todas las demás áreas para alcanzar una vida extraordinaria.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Módulo 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Módulo 1: Introducción a la Octava Área</h3>
            <p className="text-gray-600">Descubre qué es la octava área y por qué es fundamental para tu desarrollo personal.</p>
          </motion.div>

          {/* Módulo 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Módulo 2: Conexión con tu Propósito</h3>
            <p className="text-gray-600">Aprende a identificar y alinear tu propósito con la octava área de tu vida.</p>
          </motion.div>

          {/* Módulo 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Módulo 3: Implementación Práctica</h3>
            <p className="text-gray-600">Herramientas y estrategias para implementar los principios de la octava área en tu vida diaria.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OctavaArea;
