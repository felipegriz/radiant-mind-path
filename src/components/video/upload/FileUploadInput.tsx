
import React from 'react';
import { Button } from "@/components/ui/button";

interface FileUploadInputProps {
  uploading: boolean;
  progress: number;
  videoSize: number | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadInput = ({ 
  uploading, 
  progress, 
  videoSize, 
  handleFileUpload 
}: FileUploadInputProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Sube un video para la página de explicación de DESPERTAR 360°. Tamaño máximo: 100MB.
      </p>
      
      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="hero-video-upload"
      />
      
      <label htmlFor="hero-video-upload">
        <Button 
          variant="outline" 
          disabled={uploading}
          className="cursor-pointer w-full"
          asChild
        >
          <span>
            {uploading ? `Subiendo video... ${progress}%` : 'Seleccionar video para subir'}
          </span>
        </Button>
      </label>
      
      {uploading && (
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {videoSize && (
        <div className="text-xs text-muted-foreground">
          Tamaño del archivo: {videoSize.toFixed(2)} MB
        </div>
      )}
    </div>
  );
};
