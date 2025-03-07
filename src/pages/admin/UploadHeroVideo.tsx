
import { HeroVideoUploader } from "@/components/video/HeroVideoUploader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const UploadHeroVideo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <Navbar />
      <div className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/events/despertar-explanation")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver a Explicación
          </Button>
        </div>
        <HeroVideoUploader />
      </div>
    </div>
  );
};

export default UploadHeroVideo;
