
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
      <div className="aspect-video w-full bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  // Handle Vimeo videos
  if (videoPath.includes('player.vimeo.com') || videoPath.includes('vimeo.com')) {
    if (!videoPlaying) {
      return (
        <div className="aspect-video w-full bg-black relative overflow-hidden">
          {/* Thumbnail background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ 
              backgroundImage: "url('/lovable-uploads/c3831263-4ae7-44fb-ab9a-2d7fc8cde391.png')"
            }}
          />
          
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
    
    // Process Vimeo URL to ensure autoplay works
    let vimeoSrc = videoPath;
    
    // Add autoplay parameter
    if (vimeoSrc.includes('?')) {
      if (!vimeoSrc.includes('autoplay=')) {
        vimeoSrc += '&autoplay=1';
      }
    } else {
      vimeoSrc += '?autoplay=1';
    }
    
    return (
      <div className="aspect-video w-full bg-black">
        <iframe 
          src={vimeoSrc}
          className="w-full h-full" 
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    );
  }

  // Default handling for other video types
  if (!videoPlaying) {
    return (
      <div className="aspect-video w-full bg-black relative overflow-hidden">
        {/* Thumbnail */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ 
            backgroundImage: "url('/lovable-uploads/c3831263-4ae7-44fb-ab9a-2d7fc8cde391.png')" 
          }}
        />
        
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
      className="aspect-video w-full object-cover"
      controls
      autoPlay
      playsInline
    >
      <source src={videoPath} type="video/mp4" />
      Tu navegador no soporta la reproducción de video.
    </video>
  );
};
