
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [videoPlaying, setVideoPlaying] = useState(false);

  const vimeoEmbedUrl = "https://player.vimeo.com/video/1062910579?h=05e72b4425";
  
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
          <div className="aspect-video mb-8 relative rounded-xl overflow-hidden">
            {!videoPlaying ? (
              <div className="w-full h-full relative">
                <img
                  src="https://vumbnail.com/1062910579.jpg"
                  alt="Despertar 360 - Video explicativo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button
                    onClick={() => setVideoPlaying(true)}
                    className="w-20 h-20 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center"
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={`${vimeoEmbedUrl}&autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
