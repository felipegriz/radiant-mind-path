
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AFFILIATE_COMMISSION_PERCENT, AFFILIATE_DISCOUNT_PERCENT, generateAffiliateLink } from "@/utils/affiliateUtils";

interface AffiliateModalProps {
  show: boolean;
  onClose: () => void;
  userAffiliateCode: string;
}

export const AffiliateModal = ({
  show,
  onClose,
  userAffiliateCode
}: AffiliateModalProps) => {
  const [affiliateLink, setAffiliateLink] = useState<string>("");
  
  if (!show) return null;

  // Generate affiliate link for the user
  const handleGenerateLink = () => {
    const link = generateAffiliateLink(userAffiliateCode);
    setAffiliateLink(link);
    return link;
  };
  
  // Copy affiliate link to clipboard
  const copyAffiliateLink = () => {
    const link = handleGenerateLink();
    navigator.clipboard.writeText(link);
    toast.success("¡Enlace copiado al portapapeles!");
  };
  
  // Share affiliate link via social media
  const shareAffiliateLink = (platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter') => {
    const link = handleGenerateLink();
    const message = encodeURIComponent("¡Únete a Despertar 360 y obtén un 10% de descuento con mi código de afiliado!");
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message}%20${encodeURIComponent(link)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${message}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(link)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md bg-gray-800 text-white border-none">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Tu Programa de Afiliados</h3>
          <p className="mb-4">
            Comparte este enlace con tus amigos y gana una comisión del {AFFILIATE_COMMISSION_PERCENT}% por cada venta completada. 
            Tus referidos recibirán un {AFFILIATE_DISCOUNT_PERCENT}% de descuento en su compra.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="affiliateLink" className="text-white">
                Tu enlace de afiliado:
              </Label>
              <div className="flex gap-2">
                <Input
                  id="affiliateLink"
                  value={affiliateLink || handleGenerateLink()}
                  readOnly
                  className="bg-gray-700 text-white border-gray-600"
                />
                <button 
                  onClick={copyAffiliateLink}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Copiar
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="mb-2 text-sm">Compartir en redes sociales:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => shareAffiliateLink('whatsapp')}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => shareAffiliateLink('telegram')}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  Telegram
                </button>
                <button
                  onClick={() => shareAffiliateLink('facebook')}
                  className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareAffiliateLink('twitter')}
                  className="bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500"
                >
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cerrar
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};
