
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

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

      console.log('Archivo seleccionado:', {
        nombre: file.name,
        tamaño: file.size,
        tipo: file.type
      });

      const maxSize = 1024 * 1024 * 1024; // 1GB en bytes
      if (file.size > maxSize) {
        throw new Error('El video es demasiado grande. Por favor, asegúrate que sea menor a 1GB o contáctanos para ayudarte con la subida.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `octava-area-video-${Date.now()}.${fileExt}`;

      console.log('Iniciando subida del archivo:', fileName);
      
      // Usar el método upload de Supabase con un controlador de progreso personalizado
      const { error: uploadError } = await supabase.storage
        .from('course_videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100;
            setProgress(percentage);
            console.log(`Progreso de subida: ${percentage.toFixed(2)}%`);
          },
        });

      if (uploadError) {
        console.error('Error detallado de Supabase:', uploadError);
        throw new Error(`Error al subir el video: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('course_videos')
        .getPublicUrl(fileName);

      console.log('URL pública generada:', publicUrl);

      onUploadComplete(publicUrl);
      
      toast({
        title: "¡Éxito!",
        description: "El video se ha subido correctamente.",
        duration: 5000,
        className: "bg-green-50 text-green-900 border border-green-200",
      });

    } catch (err) {
      console.error('Error completo:', err);
      const errorMessage = err.message || 'Error al subir el video. Por favor, intenta de nuevo.';
      setError(errorMessage);
      toast({
        title: "Error en la subida",
        description: errorMessage,
        variant: "destructive",
        duration: 10000,
        className: "bg-red-50 text-red-900 border border-red-200",
      });
    } finally {
      setUploading(false);
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
                Subiendo video... {Math.round(progress)}%
              </div>
            ) : (
              'Subir video del curso (máximo 1GB)'
            )}
          </span>
        </Button>
      </label>
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">
            Subiendo video... {Math.round(progress)}%
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200 text-red-900">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
