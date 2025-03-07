
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramUrlInput } from "./upload/InstagramUrlInput";
import { UploadedPathDisplay } from "./upload/UploadedPathDisplay";
import { VimeoUrlInput } from "./upload/VimeoUrlInput";
import { handleInstagramUrl, handleVimeoUrl } from "./upload/VideoUrlHandlers";

export const HeroVideoUploader = () => {
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [vimeoUrl, setVimeoUrl] = useState('');

  const processInstagramUrl = () => {
    handleInstagramUrl(instagramUrl, setUploadedPath);
  };

  const processVimeoUrl = () => {
    handleVimeoUrl(vimeoUrl, setUploadedPath);
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
            handleVimeoUrl={processVimeoUrl}
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
            handleInstagramUrl={processInstagramUrl}
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
