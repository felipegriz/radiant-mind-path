
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExplanationVideoPlayer } from "@/components/video/ExplanationVideoPlayer";
import { EventSidebar } from "@/components/events/despertar360/EventSidebar";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";

const DespertarExplanation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const vimeoUrl = "https://vimeo.com/1062910579/05e72b4425";
  const formattedVideoPath = formatVimeoUrl(vimeoUrl);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    const checkIfAdmin = async () => {
      const isUserAdmin = localStorage.getItem('is_admin') === 'true';
      setIsAdmin(isUserAdmin);
    };
    
    checkIfAdmin();
    return () => clearTimeout(timer);
  }, []);

  console.log("Original Vimeo URL:", vimeoUrl);
  console.log("Formatted video path:", formattedVideoPath);

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="text-white mb-6 hover:bg-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dale Play al video y aprende porque es el seminario número uno habla hispana
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-2/3 aspect-auto bg-black/40 rounded-xl overflow-hidden">
              <ExplanationVideoPlayer 
                videoPath={formattedVideoPath} 
                isLoading={isLoading}
              />
            </div>
            
            <EventSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespertarExplanation;
