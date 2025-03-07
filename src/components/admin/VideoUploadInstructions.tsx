
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadInstructionsProps {
  isAdmin: boolean;
}

export const VideoUploadInstructions: React.FC<VideoUploadInstructionsProps> = ({ isAdmin }) => {
  if (!isAdmin) return null;

  const handleCopyInstructions = () => {
    const instructions = `
1. Ve a /admin/upload-hero-video
2. Ingresa la URL de tu video de Vimeo
3. Copia la ruta generada
4. Actualiza la variable 'explanationVideoPath' en el archivo src/pages/events/DespertarExplanation.tsx
    `;
    navigator.clipboard.writeText(instructions);
    toast.success("Instrucciones copiadas al portapapeles");
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
      <div className="flex items-start">
        <Info className="w-5 h-5 text-primary mr-2 mt-0.5" />
        <div>
          <h3 className="font-medium text-primary">Instrucciones para subir el video</h3>
          <p className="text-sm text-white/80 mt-1">
            1. Ve a <a href="/admin/upload-hero-video" className="text-primary underline">admin/upload-hero-video</a>
          </p>
          <p className="text-sm text-white/80">
            2. Ingresa la URL de tu video de Vimeo
          </p>
          <p className="text-sm text-white/80">
            3. Copia la ruta generada
          </p>
          <p className="text-sm text-white/80">
            4. Actualiza la variable 'explanationVideoPath' en el archivo src/pages/events/DespertarExplanation.tsx
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 text-xs"
            onClick={handleCopyInstructions}
          >
            Copiar instrucciones
          </Button>
        </div>
      </div>
    </div>
  );
};
