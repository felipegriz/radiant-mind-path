
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon } from "lucide-react";

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
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Ingresa la URL del video de Vimeo para la página de explicación de DESPERTAR 360°.
      </p>
      
      <div className="flex items-center space-x-2">
        <LinkIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
        <Input
          type="url"
          placeholder="https://vimeo.com/123456789"
          value={vimeoUrl}
          onChange={(e) => setVimeoUrl(e.target.value)}
          className="flex-grow"
        />
      </div>
      
      <div className="text-xs text-muted-foreground mt-1">
        <p>Ejemplo: https://vimeo.com/123456789</p>
      </div>
      
      <Button 
        onClick={handleVimeoUrl}
        className="w-full"
      >
        Usar URL de Vimeo
      </Button>
    </div>
  );
};
