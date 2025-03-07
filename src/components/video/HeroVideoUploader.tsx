
import React, { useState } from 'react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramUrlInput } from "./upload/InstagramUrlInput";
import { UploadedPathDisplay } from "./upload/UploadedPathDisplay";
import { formatInstagramUrl } from "./upload/VideoUrlHelpers";
import { VimeoUrlInput } from "./upload/VimeoUrlInput";

export const HeroVideoUploader = () => {
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [vimeoUrl, setVimeoUrl] = useState('');

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
      toast.warning('URL de Instagram procesada. Recomendamos usar Vimeo para mejor experiencia.');
    } catch (error) {
      console.error('Error al procesar la URL de Instagram:', error);
      toast.error('Error al procesar la URL. Verifica que sea una URL válida de Instagram');
    }
  };

  const handleVimeoUrl = () => {
    if (!vimeoUrl) {
      toast.error('Por favor ingresa una URL de Vimeo');
      return;
    }

    try {
      // Simple validation to ensure it's a Vimeo URL
      if (!vimeoUrl.includes('vimeo.com')) {
        toast.error('Por favor ingresa una URL válida de Vimeo (debe contener vimeo.com)');
        return;
      }

      // Format URL to embed format if it's not already
      let formattedUrl = vimeoUrl.trim();
      if (!formattedUrl.includes('/embed')) {
        // Extract the Vimeo ID
        const vimeoId = formattedUrl.split('/').pop();
        if (vimeoId) {
          formattedUrl = `https://player.vimeo.com/video/${vimeoId}`;
        }
      }
      
      console.log('Formatted Vimeo URL:', formattedUrl);
      setUploadedPath(formattedUrl);
      
      navigator.clipboard.writeText(formattedUrl);
      toast.success('URL de Vimeo procesada. La dirección ha sido copiada al portapapeles.');
    } catch (error) {
      console.error('Error al procesar la URL de Vimeo:', error);
      toast.error('Error al procesar la URL. Verifica que sea una URL válida de Vimeo');
    }
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-md rounded-xl border border-border">
      <h3 className="text-xl font-semibold">Configurar Video de Explicación</h3>
      
      <Tabs defaultValue="vimeo" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vimeo">URL de Vimeo (Recomendado)</TabsTrigger>
          <TabsTrigger value="instagram">URL de Instagram</TabsTrigger>
        </TabsList>

        <TabsContent value="vimeo">
          <div className="bg-green-50 border border-green-200 p-3 rounded mb-3">
            <p className="text-sm text-green-700">
              <strong>Recomendación:</strong> Usar Vimeo ofrece mejor experiencia, rendimiento y compatibilidad que subir videos directamente o usar Instagram.
            </p>
          </div>
          <VimeoUrlInput 
            vimeoUrl={vimeoUrl}
            setVimeoUrl={setVimeoUrl}
            handleVimeoUrl={handleVimeoUrl}
          />
        </TabsContent>

        <TabsContent value="instagram">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded mb-3">
            <p className="text-sm text-amber-700">
              <strong>Recomendación:</strong> Para mejor experiencia y compatibilidad, recomendamos usar Vimeo en lugar de Instagram.
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
