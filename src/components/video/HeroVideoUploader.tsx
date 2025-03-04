
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const HeroVideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setProgress(0);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error('Por favor sube un archivo de video.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `hero-background-${Date.now()}.${fileExt}`;
      
      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          // Use the onUploadProgress function through the upload events
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Copy the path to clipboard
      await navigator.clipboard.writeText(`/videos/${fileName}`);
      
      toast.success('Video subido con éxito. La ruta se ha copiado al portapapeles.');
      console.log('Video URL:', publicUrl);
      
    } catch (err) {
      console.error('Error uploading video:', err);
      toast.error('Error al subir el video. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-md rounded-xl border border-border">
      <h3 className="text-xl font-semibold">Subir Video de Fondo</h3>
      <p className="text-sm text-muted-foreground">
        Sube un video corto para usar como fondo del hero section. Se recomienda un video de menos de 10MB.
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
            {uploading ? `Subiendo video... ${progress}%` : 'Seleccionar video para el fondo'}
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
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Nota: Después de subir el video, la ruta se copiará automáticamente al portapapeles.</p>
        <p>Actualiza la ruta del video en el componente HeroSection.tsx, en la etiqueta source.</p>
      </div>
    </div>
  );
};

