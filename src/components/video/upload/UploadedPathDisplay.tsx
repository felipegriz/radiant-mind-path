
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"; 
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface UploadedPathDisplayProps {
  uploadedPath: string | null;
}

export const UploadedPathDisplay = ({ uploadedPath }: UploadedPathDisplayProps) => {
  if (!uploadedPath) return null;
  
  return (
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
  );
};
