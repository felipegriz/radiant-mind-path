
import { toast } from "sonner";
import { formatInstagramUrl } from "./VideoUrlHelpers";
import { formatVimeoUrl } from "./VimeoUrlHelpers";

export const handleInstagramUrl = (instagramUrl: string, setUploadedPath: (path: string | null) => void) => {
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

export const handleVimeoUrl = (vimeoUrl: string, setUploadedPath: (path: string | null) => void) => {
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

    // Format the URL using the helper
    const formattedUrl = formatVimeoUrl(vimeoUrl);
    
    console.log('Formatted Vimeo URL:', formattedUrl);
    setUploadedPath(formattedUrl);
    
    navigator.clipboard.writeText(formattedUrl);
    toast.success('URL de Vimeo procesada. La dirección ha sido copiada al portapapeles.');
  } catch (error) {
    console.error('Error al procesar la URL de Vimeo:', error);
    toast.error('Error al procesar la URL. Verifica que sea una URL válida de Vimeo');
  }
};
