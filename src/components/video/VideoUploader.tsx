
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
}

export const VideoUploader = ({ onUploadComplete }: VideoUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Aumentado el límite a 600MB
      const maxSize = 600 * 1024 * 1024; // 600MB en bytes
      if (file.size > maxSize) {
        throw new Error('El archivo es demasiado grande. El tamaño máximo es 600MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `octava-area-video-${Date.now()}.${fileExt}`;

      console.log('Iniciando subida del archivo:', fileName);
      
      const { data, error: uploadError } = await supabase.storage
        .from('course_videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error de subida:', uploadError);
        throw uploadError;
      }

      console.log('Archivo subido exitosamente:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('course_videos')
        .getPublicUrl(fileName);

      console.log('URL pública generada:', publicUrl);

      onUploadComplete(publicUrl);
      
      toast({
        title: "¡Éxito!",
        description: "El video se ha subido correctamente.",
      });

    } catch (err) {
      console.error('Error en el proceso de subida:', err);
      setError('Error al subir el video. Por favor, intenta de nuevo.');
      toast({
        title: "Error",
        description: err.message || 'Error al subir el video. Por favor, intenta de nuevo.',
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload">
        <Button 
          variant="outline" 
          disabled={uploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {uploading ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Subiendo video... 
              </div>
            ) : (
              'Subir video del curso'
            )}
          </span>
        </Button>
      </label>
      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};
