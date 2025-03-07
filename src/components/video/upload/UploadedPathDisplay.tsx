
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AlertCircle, Copy, Check } from "lucide-react"; 
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState } from 'react';

interface UploadedPathDisplayProps {
  uploadedPath: string | null;
}

export const UploadedPathDisplay = ({ uploadedPath }: UploadedPathDisplayProps) => {
  const [copied, setCopied] = useState(false);
  
  if (!uploadedPath) return null;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(uploadedPath);
    toast.success('URL copiada al portapapeles');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Alert className="bg-green-50 border-green-200">
      <AlertCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-800">Video configurado correctamente</AlertTitle>
      <AlertDescription className="text-green-700">
        <p className="mb-2">Copia esta URL y úsala para reemplazar el valor de <code className="bg-green-100 px-1 rounded">explanationVideoPath</code> en el archivo:</p>
        <div className="relative">
          <div className="font-mono text-xs mt-1 bg-green-100 p-2 rounded break-all">
            {uploadedPath}
          </div>
          <Button 
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0 text-xs bg-white border-green-300 text-green-700 hover:bg-green-50"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
        <Button 
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="mt-2 text-xs bg-white border-green-300 text-green-700 hover:bg-green-50"
        >
          {copied ? "¡Copiado!" : "Copiar URL para embeber"}
        </Button>
      </AlertDescription>
    </Alert>
  );
};
