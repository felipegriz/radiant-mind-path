
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#1A1F2C] text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            DESCUBRE EL SECRETO QUE EL 95% DE LAS PERSONAS IGNORAN PARA ALCANZAR SU MÁXIMO POTENCIAL
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            La mayoría vive una vida mediocre porque nadie les enseñó esta poderosa técnica de transformación mental...
          </p>
          <div className="aspect-video mb-8 relative">
            <div className="w-full h-full bg-black/40 rounded-xl flex items-center justify-center">
              <p className="text-xl">Video VSL</p>
              <Button
                onClick={() => navigate("/events/despertar-explanation")}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
