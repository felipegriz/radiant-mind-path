
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

const OctavaArea = () => {
  // URL del video de Zoom con los parámetros necesarios
  const videoUrl = "https://us02web.zoom.us/rec/share/FkkpYzLoxzF7cEMhHnKxXTRfbLUIVXygxnNm41IuIRkEhYpkNwuL7PAjSWqIhJvl.J75Pjz1LTc-d7mMk?startTime=1739145699000&embed=true&hidewindow=true&showsharebutton=false&showdownloadbutton=false&hidejoinlabel=true&hidedescription=true";

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
            src={videoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ aspectRatio: '16/9' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OctavaArea;
