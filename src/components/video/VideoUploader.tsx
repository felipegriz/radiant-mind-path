
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
}

export const VideoUploader = ({ onUploadComplete }: VideoUploaderProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Por favor, ingresa el enlace de Zoom');
      return;
    }

    if (!url.includes('zoom.us')) {
      setError('Por favor, ingresa un enlace válido de Zoom');
      return;
    }

    onUploadComplete(url);
    
    toast({
      title: "¡Éxito!",
      description: "El enlace de Zoom se ha guardado correctamente.",
      duration: 5000,
      className: "bg-green-50 text-green-900 border border-green-200",
    });

    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Pega aquí el enlace de Zoom"
        className="w-full"
      />
      
      <Button 
        type="submit"
        variant="outline"
        className="w-full"
      >
        Guardar enlace de Zoom
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200 text-red-900">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};
