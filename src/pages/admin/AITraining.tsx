
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { AITrainingManager } from "@/components/admin/AITrainingManager";

const AITraining = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8">Gestión de Contenido AI</h1>
          <AITrainingManager />
        </motion.div>
      </div>
    </div>
  );
};

export default AITraining;
