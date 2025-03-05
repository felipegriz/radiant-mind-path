
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadInputProps {
  uploading: boolean;
  progress: number;
  videoSize: number | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxFileSize?: number;
}

export const FileUploadInput = ({ 
  uploading, 
  progress, 
  videoSize, 
  handleFileUpload,
  maxFileSize = 100
}: FileUploadInputProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Sube un video para la página de explicación de DESPERTAR 360°. Tamaño máximo: {maxFileSize}MB.
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
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {progress === 0 ? 'Iniciando carga...' : `${progress}% completado`}
          </div>
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
