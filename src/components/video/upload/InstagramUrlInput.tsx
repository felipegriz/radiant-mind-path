
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";

interface InstagramUrlInputProps {
  instagramUrl: string;
  setInstagramUrl: (url: string) => void;
  handleInstagramUrl: () => void;
}

export const InstagramUrlInput = ({ 
  instagramUrl, 
  setInstagramUrl, 
  handleInstagramUrl 
}: InstagramUrlInputProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Ingresa la URL del video de Instagram que deseas usar
      </p>
      <div className="flex items-center space-x-2">
        <LinkIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
        <Input
          type="url"
          placeholder="https://www.instagram.com/reel/..."
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        <p>Ejemplo: https://www.instagram.com/p/XXXX/ o https://www.instagram.com/reel/XXXX/</p>
      </div>
      <Button 
        onClick={handleInstagramUrl}
        className="w-full"
      >
        Procesar URL de Instagram
      </Button>
    </div>
  );
};
