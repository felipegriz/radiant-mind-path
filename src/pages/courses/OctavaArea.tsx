
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

const OctavaArea = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre el poder transformador de la octava área de tu vida y cómo puede potenciar todas las demás áreas para alcanzar una vida extraordinaria.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"
        >
          <iframe 
            className="w-full h-full"
            src="https://us02web.zoom.us/rec/play/dMiLFSh5sXdOAM7AnSnmhxTdXD9J_Q0wJ0LDcuArsB5qYjEcCjbJuyQnAjtMu1m2.Y3ggY4hg5heU2eLm"
            frameBorder="0" 
            allow="autoplay; fullscreen" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default OctavaArea;
