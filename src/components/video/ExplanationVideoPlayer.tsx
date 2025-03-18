
import React, { useEffect, useState } from 'react';
import { formatInstagramUrl } from "@/components/video/upload/VideoUrlHelpers";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExplanationVideoPlayerProps {
  videoPath: string;
  isLoading: boolean;
}

export const ExplanationVideoPlayer: React.FC<ExplanationVideoPlayerProps> = ({ videoPath, isLoading }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  // Log the video path for debugging
  useEffect(() => {
    console.log("ExplanationVideoPlayer received videoPath:", videoPath);
  }, [videoPath]);

  // Determine video type
  const isInstagramUrl = videoPath.includes('instagram.com') || videoPath.includes('instagr.am');
  const isVimeoUrl = videoPath.includes('vimeo.com') || videoPath.includes('player.vimeo.com');
  
  // Format the URL appropriately (this is redundant if already formatted in the parent component)
  const formattedVideoPath = isInstagramUrl 
    ? formatInstagramUrl(videoPath)
    : isVimeoUrl 
      ? formatVimeoUrl(videoPath) 
      : videoPath;
  
  useEffect(() => {
    console.log("Formatted video path:", formattedVideoPath);
  }, [formattedVideoPath]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  // Instagram embed
  if (isInstagramUrl) {
    console.log("Renderizando video de Instagram:", formattedVideoPath);
    
    return (
      <div className="w-full h-full flex items-center justify-center">
        <iframe 
          src={formattedVideoPath}
          className="instagram-media w-full h-[600px] md:h-[700px]" 
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    );
  }
  
  // Vimeo embed with thumbnail preview
  if (isVimeoUrl || formattedVideoPath.includes('player.vimeo.com')) {
    console.log("Renderizando video de Vimeo:", formattedVideoPath);
    
    if (!videoPlaying) {
      return (
        <div className="w-full h-[600px] md:h-[700px] relative overflow-hidden rounded-lg">
          {/* Display user's face as the thumbnail */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/lovable-uploads/901da032-3adc-4f26-a5b8-549512d2495b.png')" }}
          >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => setVideoPlaying(true)}
              className="bg-primary/80 hover:bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center"
            >
              <Play className="h-10 w-10 ml-1" />
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full">
        <iframe 
          src={formattedVideoPath}
          className="w-full h-[600px] md:h-[700px]" 
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Direct video embed (default)
  if (!videoPlaying) {
    return (
      <div className="w-full h-[600px] md:h-[700px] relative overflow-hidden rounded-xl">
        {/* Display user's face as the thumbnail */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lovable-uploads/901da032-3adc-4f26-a5b8-549512d2495b.png')" }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={() => setVideoPlaying(true)}
            className="bg-primary/80 hover:bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center"
          >
            <Play className="h-10 w-10 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <video 
      className="w-full h-full object-cover rounded-xl"
      controls
      playsInline
      autoPlay
    >
      <source src={formattedVideoPath} type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
  );
};
