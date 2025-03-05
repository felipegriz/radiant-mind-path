
import React, { useState } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadInput } from "./upload/FileUploadInput";
import { InstagramUrlInput } from "./upload/InstagramUrlInput";
import { UploadedPathDisplay } from "./upload/UploadedPathDisplay";
import { formatInstagramUrl } from "./upload/VideoUrlHelpers";

const MAX_FILE_SIZE_MB = 2000; // Aumentado de 100MB a 2000MB (2GB)

export const HeroVideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSize, setVideoSize] = useState<number | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setProgress(0);
      setUploadedPath(null);
      
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
      
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
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
