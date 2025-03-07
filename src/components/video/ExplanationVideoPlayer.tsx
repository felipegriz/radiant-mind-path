
import React, { useEffect } from 'react';
import { formatInstagramUrl } from "@/components/video/upload/VideoUrlHelpers";
import { formatVimeoUrl } from "@/components/video/upload/VimeoUrlHelpers";

interface ExplanationVideoPlayerProps {
  videoPath: string;
  isLoading: boolean;
}

export const ExplanationVideoPlayer: React.FC<ExplanationVideoPlayerProps> = ({ videoPath, isLoading }) => {
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
  
  // Vimeo embed
  if (isVimeoUrl || formattedVideoPath.includes('player.vimeo.com')) {
    console.log("Renderizando video de Vimeo:", formattedVideoPath);
    
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
