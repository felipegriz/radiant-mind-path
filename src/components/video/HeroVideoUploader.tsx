
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadInput } from "./upload/FileUploadInput";
import { InstagramUrlInput } from "./upload/InstagramUrlInput";
import { UploadedPathDisplay } from "./upload/UploadedPathDisplay";
import { formatInstagramUrl } from "./upload/VideoUrlHelpers";
import { Progress } from "@/components/ui/progress";

const MAX_FILE_SIZE_MB = 2000; // Aumentado de 100MB a 2000MB (2GB)

export const HeroVideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSize, setVideoSize] = useState<number | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [uploadStartTime, setUploadStartTime] = useState<number | null>(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<string | null>(null);

  // Efecto para actualizar el tiempo estimado
  useEffect(() => {
    if (uploading && uploadStartTime && progress > 0) {
      const elapsedTime = (Date.now() - uploadStartTime) / 1000; // en segundos
      const totalEstimatedTime = elapsedTime * (100 / progress);
      const timeLeft = totalEstimatedTime - elapsedTime;
      
      if (timeLeft > 0) {
        // Formatear el tiempo restante
        let timeString = '';
        if (timeLeft > 3600) {
          timeString = `${Math.floor(timeLeft / 3600)} horas ${Math.floor((timeLeft % 3600) / 60)} min`;
        } else if (timeLeft > 60) {
          timeString = `${Math.floor(timeLeft / 60)} minutos`;
        } else {
          timeString = `${Math.floor(timeLeft)} segundos`;
        }
        setEstimatedTimeLeft(timeString);
      }
    } else if (!uploading) {
      setEstimatedTimeLeft(null);
    }
  }, [uploading, progress, uploadStartTime]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setProgress(0);
      setUploadedPath(null);
      setUploadStartTime(Date.now());
      
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('video/')) {
        toast.error('Por favor sube un archivo de video.');
        setUploading(false);
        return;
      }

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
      
      // Usar el nuevo método upload con soporte para seguimiento de progreso
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setProgress(percent);
            console.log(`Progreso de carga: ${percent}%`);
          }
        });

      if (uploadError) {
        console.error('Error de carga:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      const videoPath = `/videos/${fileName}`;
      
      setUploadedPath(videoPath);

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

  const handleInstagramUrl = () => {
    if (!instagramUrl) {
      toast.error('Por favor ingresa una URL de Instagram');
      return;
    }

    try {
      const formattedUrl = formatInstagramUrl(instagramUrl.trim());
      console.log('Formatted Instagram URL:', formattedUrl);
      
      setUploadedPath(formattedUrl);
      
      navigator.clipboard.writeText(formattedUrl);
      toast.warning('URL de Instagram procesada. Recomendamos subir un video directo para mejor experiencia.');
    } catch (error) {
      console.error('Error al procesar la URL de Instagram:', error);
      toast.error('Error al procesar la URL. Verifica que sea una URL válida de Instagram');
    }
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-md rounded-xl border border-border">
      <h3 className="text-xl font-semibold">Subir Video de Explicación</h3>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Subir Archivo (Recomendado)</TabsTrigger>
          <TabsTrigger value="instagram">URL de Instagram</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <FileUploadInput 
            uploading={uploading}
            progress={progress}
            videoSize={videoSize}
            handleFileUpload={handleFileUpload}
            maxFileSize={MAX_FILE_SIZE_MB}
          />

          {uploading && estimatedTimeLeft && (
            <div className="mt-2 text-xs text-muted-foreground">
              Tiempo estimado restante: {estimatedTimeLeft}
            </div>
          )}

          {uploading && progress === 0 && (
            <div className="mt-2 text-amber-500 text-sm">
              La carga está en proceso pero aún no se ha registrado progreso. Para archivos grandes, esto puede tomar unos momentos.
            </div>
          )}
        </TabsContent>

        <TabsContent value="instagram">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded mb-3">
            <p className="text-sm text-amber-700">
              <strong>Recomendación:</strong> Para mejor experiencia y compatibilidad, recomendamos subir el video directamente en lugar de usar Instagram.
            </p>
          </div>
          <InstagramUrlInput 
            instagramUrl={instagramUrl}
            setInstagramUrl={setInstagramUrl}
            handleInstagramUrl={handleInstagramUrl}
          />
        </TabsContent>
      </Tabs>

      <UploadedPathDisplay uploadedPath={uploadedPath} />

      <div className="text-xs text-muted-foreground mt-2">
        <p>Después de configurar el video, debes actualizar la variable <code className="bg-muted px-1 rounded">explanationVideoPath</code> en el archivo <code className="bg-muted px-1 rounded">src/pages/events/DespertarExplanation.tsx</code>.</p>
      </div>
    </div>
  );
};
