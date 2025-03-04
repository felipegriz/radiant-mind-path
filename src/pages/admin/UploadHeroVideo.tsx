
import { HeroVideoUploader } from "@/components/video/HeroVideoUploader";

const UploadHeroVideo = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <HeroVideoUploader />
      </div>
    </div>
  );
};

export default UploadHeroVideo;
