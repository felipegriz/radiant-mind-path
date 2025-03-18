
import React, { useEffect, useState } from 'react';
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExplanationVideoPlayerProps {
  videoPath: string;
  isLoading: boolean;
}

export const ExplanationVideoPlayer: React.FC<ExplanationVideoPlayerProps> = ({ 
  videoPath, 
  isLoading 
}) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  useEffect(() => {
    console.log("ExplanationVideoPlayer received videoPath:", videoPath);
  }, [videoPath]);

  // Reset player state when videoPath changes
  useEffect(() => {
    setVideoPlaying(false);
  }, [videoPath]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  // Handle Vimeo videos
  if (videoPath.includes('player.vimeo.com') || videoPath.includes('vimeo.com')) {
    if (!videoPlaying) {
      return (
        <div className="w-full h-[600px] md:h-[700px] relative overflow-hidden rounded-lg bg-black">
          {/* Thumbnail background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/lovable-uploads/c3831263-4ae7-44fb-ab9a-2d7fc8cde391.png')"
            }}
          >
            {/* Translucent overlay */}
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
    
    // Add autoplay parameter to the URL
    let vimeoSrc = videoPath;
    if (vimeoSrc.includes('?')) {
      vimeoSrc = `${vimeoSrc}&autoplay=1`;
    } else {
      vimeoSrc = `${vimeoSrc}?autoplay=1`;
    }
    
    return (
      <div className="w-full h-[600px] md:h-[700px] bg-black rounded-lg overflow-hidden">
        <iframe 
          src={vimeoSrc}
          className="w-full h-full" 
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Default handling for other video types (like direct MP4)
  if (!videoPlaying) {
    return (
      <div className="w-full h-[600px] md:h-[700px] relative overflow-hidden rounded-lg bg-black">
        {/* Thumbnail */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/c3831263-4ae7-44fb-ab9a-2d7fc8cde391.png')" 
          }}
        >
          {/* Translucent overlay */}
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
      className="w-full h-full object-cover rounded-lg"
      controls
      autoPlay
      playsInline
    >
      <source src={videoPath} type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
  );
};
