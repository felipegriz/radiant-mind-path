
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const HeroVideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSize, setVideoSize] = useState<number | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  // Aumentamos el tamaño máximo a 100MB
  const MAX_FILE_SIZE_MB = 100;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setProgress(0);
      setUploadedPath(null);
      
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error('Por favor sube un archivo de video.');
        setUploading(false);
        return;
      }

      // Show file size in MB
      const fileSizeMB = file.size / (1024 * 1024);
      setVideoSize(fileSizeMB);
      console.log(`Subiendo archivo de ${fileSizeMB.toFixed(2)} MB`);
      
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`El archivo es demasiado grande. El límite es de ${MAX_FILE_SIZE_MB}MB.`);
        setUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `explanation-video-${Date.now()}.${fileExt}`;
      
      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true, // Change to true to overwrite existing files
        });

      if (uploadError) {
        console.error('Error de carga:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      const videoPath = `/videos/${fileName}`;
      
      // Set the uploaded path
      setUploadedPath(videoPath);

      // Copy the path to clipboard
      await navigator.clipboard.writeText(videoPath);
      
      toast.success('Video subido con éxito. La ruta se ha copiado al portapapeles.');
      console.log('Video URL:', publicUrl);
      setProgress(100);
      
    } catch (err) {
      console.error('Error uploading video:', err);
      toast.error('Error al subir el video. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-md rounded-xl border border-border">
      <h3 className="text-xl font-semibold">Subir Video de Explicación</h3>
      <p className="text-sm text-muted-foreground">
        Sube un video para la página de explicación de DESPERTAR 360°. Tamaño máximo: {MAX_FILE_SIZE_MB}MB.
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

      {uploadedPath && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Video subido correctamente</AlertTitle>
          <AlertDescription className="text-green-700">
            <p>Usa esta ruta en la variable <code className="bg-green-100 px-1 rounded">explanationVideoPath</code> en el archivo:</p>
            <p className="font-mono text-xs mt-1 bg-green-100 p-2 rounded break-all">{uploadedPath}</p>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(uploadedPath);
                toast.success('Ruta copiada al portapapeles');
              }}
              variant="outline"
              size="sm"
              className="mt-2 text-xs bg-white border-green-300 text-green-700 hover:bg-green-50"
            >
              Copiar ruta
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Después de subir el video, debes actualizar la variable <code className="bg-muted px-1 rounded">explanationVideoPath</code> en el archivo <code className="bg-muted px-1 rounded">src/pages/events/DespertarExplanation.tsx</code>.</p>
      </div>

      <div className="mt-4 p-3 bg-amber-100/10 border border-amber-200/20 rounded-lg">
        <h4 className="text-sm font-medium text-amber-700">Consejos para optimizar videos:</h4>
        <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
          <li>Usa un formato como MP4 con códec h.264 para mejor compatibilidad.</li>
          <li>Reduce la resolución a 720p para reducir el tamaño del archivo.</li>
          <li>Comprime el video antes de subirlo usando herramientas como <a href="https://handbrake.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Handbrake</a> (gratis).</li>
          <li>Mantén la duración del video lo más corta posible.</li>
        </ul>
      </div>
    </div>
  );
};
