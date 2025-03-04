
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HeroVideoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSize, setVideoSize] = useState<number | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState('');
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

  const handleInstagramUrl = () => {
    if (!instagramUrl) {
      toast.error('Por favor ingresa una URL de Instagram');
      return;
    }

    // Clean up the Instagram URL (remove /embed if it's there)
    let cleanUrl = instagramUrl.trim();
    cleanUrl = cleanUrl.replace('/embed', '');
    
    // Ensure URL ends at the post and remove any trailing parameters
    if (cleanUrl.includes('?')) {
      cleanUrl = cleanUrl.substring(0, cleanUrl.indexOf('?'));
    }

    // Set the URL directly as the path
    setUploadedPath(cleanUrl);
    
    // Copy to clipboard
    navigator.clipboard.writeText(cleanUrl);
    toast.success('URL copiada al portapapeles');
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-md rounded-xl border border-border">
      <h3 className="text-xl font-semibold">Subir Video de Explicación</h3>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Subir Archivo</TabsTrigger>
          <TabsTrigger value="instagram">URL de Instagram</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="space-y-4">
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
          </div>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Ingresa la URL del video de Instagram que deseas usar
            </p>
            <Input
              type="url"
              placeholder="https://www.instagram.com/reel/..."
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
            <Button 
              onClick={handleInstagramUrl}
              className="w-full"
            >
              Usar URL de Instagram
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {uploadedPath && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Video configurado correctamente</AlertTitle>
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
        <p>Después de configurar el video, debes actualizar la variable <code className="bg-muted px-1 rounded">explanationVideoPath</code> en el archivo <code className="bg-muted px-1 rounded">src/pages/events/DespertarExplanation.tsx</code>.</p>
      </div>
    </div>
  );
};
