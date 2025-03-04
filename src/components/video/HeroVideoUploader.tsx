
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

      // Show file size in MB
      const fileSizeMB = file.size / (1024 * 1024);
      console.log(`Subiendo archivo de ${fileSizeMB.toFixed(2)} MB`);
      
      if (fileSizeMB > 50) {
        toast.error('El archivo es demasiado grande. El límite es de 50MB.');
        setUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `hero-background-${Date.now()}.${fileExt}`;
      
      // Upload to Supabase storage with progress tracking
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = progress.loaded / progress.total * 100;
            setProgress(Math.round(percent));
            console.log(`Progreso: ${Math.round(percent)}%`);
          }
        });

      if (uploadError) {
        console.error('Error de carga:', uploadError);
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
        Sube un video corto para usar como fondo del hero section. Tamaño máximo: 50MB.
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
        <p>Actualiza la ruta del video en el componente HeroSection.tsx, en la variable backgroundVideoPath.</p>
      </div>

      <div className="mt-4 p-3 bg-amber-100/10 border border-amber-200/20 rounded-lg">
        <h4 className="text-sm font-medium text-amber-700">Consejos para optimizar videos:</h4>
        <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
          <li>Usa un formato como MP4 con códec h.264 para mejor compatibilidad.</li>
          <li>Reduce la resolución a 720p o menos para videos de fondo.</li>
          <li>Comprime el video antes de subirlo usando herramientas como <a href="https://handbrake.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Handbrake</a> (gratis).</li>
          <li>Mantén la duración del video lo más corta posible para reducir el tamaño.</li>
        </ul>
      </div>
    </div>
  );
};
