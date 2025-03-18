
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExplanationVideoPlayer } from "@/components/video/ExplanationVideoPlayer";
import { CheckCircle } from "lucide-react";

interface VideoHeroSectionProps {
  videoPath: string;
  isLoading: boolean;
}

export const VideoHeroSection = ({ videoPath, isLoading }: VideoHeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#1A1F2C] text-white py-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="text-white mb-6 hover:bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            DESPERTAR 360°
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-6">
            Dale Play al video y aprende porque es el seminario número uno habla hispana
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-black rounded-xl overflow-hidden mb-10">
          <ExplanationVideoPlayer 
            videoPath={videoPath} 
            isLoading={isLoading}
          />
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl mb-6">
            El seminario intensivo de transformación personal más potente de habla hispana.
          </p>
          
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6 text-left mb-8">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
              <p>3 días de inmersión total para reprogramar tu mente</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
              <p>Técnicas avanzadas de PNL y meditación</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
