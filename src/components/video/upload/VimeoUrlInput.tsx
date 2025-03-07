
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VimeoUrlInputProps {
  vimeoUrl: string;
  setVimeoUrl: (url: string) => void;
  handleVimeoUrl: () => void;
}

export const VimeoUrlInput = ({ 
  vimeoUrl, 
  setVimeoUrl, 
  handleVimeoUrl 
}: VimeoUrlInputProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Ingresa la URL del video de Vimeo para la página de explicación de DESPERTAR 360°.
      </p>
      
      <Input
        type="text"
        placeholder="https://vimeo.com/123456789"
        value={vimeoUrl}
        onChange={(e) => setVimeoUrl(e.target.value)}
        className="w-full"
      />
      
      <Button 
        onClick={handleVimeoUrl}
        className="w-full"
      >
        Usar URL de Vimeo
      </Button>
      
      <div className="text-xs text-muted-foreground">
        <p>Ejemplo: https://vimeo.com/123456789</p>
      </div>
    </div>
  );
};
