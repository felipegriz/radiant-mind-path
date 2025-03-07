
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramUrlInput } from "./upload/InstagramUrlInput";
import { UploadedPathDisplay } from "./upload/UploadedPathDisplay";
import { VimeoUrlInput } from "./upload/VimeoUrlInput";
import { handleInstagramUrl, handleVimeoUrl } from "./upload/VideoUrlHandlers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
      
      <Alert variant="warning" className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-700">
          <strong>Importante:</strong> Después de obtener la URL, debes copiarla y reemplazar el valor
          de <code className="bg-amber-100 px-1 rounded">explanationVideoPath</code> en el archivo 
          <code className="bg-amber-100 px-1 rounded">src/pages/events/DespertarExplanation.tsx</code>
        </AlertDescription>
      </Alert>
      
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

      <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-4">
        <h4 className="font-bold text-blue-700 mb-2">¿Cómo hacer que el video quede embebido?</h4>
        <ol className="list-decimal pl-5 space-y-2 text-blue-700">
          <li>Copia la URL generada arriba después de ingresar tu enlace de Vimeo</li>
          <li>Abre el archivo <code className="bg-blue-100 px-1 rounded">src/pages/events/DespertarExplanation.tsx</code></li>
          <li>Encuentra la variable <code className="bg-blue-100 px-1 rounded">explanationVideoPath</code></li>
          <li>Reemplaza su valor actual por la URL que copiaste</li>
          <li>Guarda el archivo y el video quedará embebido automáticamente</li>
        </ol>
      </div>
    </div>
  );
};
