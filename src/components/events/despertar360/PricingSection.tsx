
import { motion } from "framer-motion";
import { Users, Crown, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { EventPrice } from "@/types/event";

interface PricingSectionProps {
  prices: EventPrice[];
}

const STRIPE_PAYMENT_LINKS = {
  general: "https://buy.stripe.com/dR6aGbcw6aMleRy2aT",
  vip: "https://buy.stripe.com/00gdSn9jU07H38Q16L",
  platinum: "https://buy.stripe.com/aEU15B1RsaMldNu9Di"
};

// Discount percentage for affiliate purchases
const AFFILIATE_DISCOUNT_PERCENT = 10;
// Commission percentage for affiliates
const AFFILIATE_COMMISSION_PERCENT = 20;

export const PricingSection = ({ prices }: PricingSectionProps) => {
  const [affiliateCode, setAffiliateCode] = useState<string>("");
  const [isAffiliateValid, setIsAffiliateValid] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userAffiliateCode, setUserAffiliateCode] = useState<string>("");
  const [affiliateLink, setAffiliateLink] = useState<string>("");
  const [showAffiliateModal, setShowAffiliateModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated and get their affiliate code
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        // Check if user has an affiliate code or generate one
        const { data, error } = await supabase
          .from('affiliate_codes')
          .select('code')
          .eq('user_id', session.user.id)
          .single();
        
        if (error || !data) {
          // Generate a new affiliate code for the user
          const newCode = generateAffiliateCode(session.user.id);
          await supabase.from('affiliate_codes').insert({
            user_id: session.user.id,
            code: newCode,
            created_at: new Date().toISOString()
          });
          setUserAffiliateCode(newCode);
        } else {
          setUserAffiliateCode(data.code);
        }
      }
    };
    
    // Check if there's an affiliate code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('aff');
    if (codeFromUrl) {
      setAffiliateCode(codeFromUrl);
      validateAffiliateCode(codeFromUrl);
    }
    
    checkAuth();
  }, []);
  
  // Generate affiliate code based on user ID
  const generateAffiliateCode = (userId: string): string => {
    return userId.substring(0, 8);
  };
  
  // Validate affiliate code
  const validateAffiliateCode = async (code: string) => {
    if (!code) {
      setIsAffiliateValid(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('affiliate_codes')
        .select('*')
        .eq('code', code)
        .single();
      
      if (error || !data) {
        setIsAffiliateValid(false);
      } else {
        setIsAffiliateValid(true);
        toast.success("Código de afiliado aplicado. ¡Descuento del 10% activado!");
      }
    } catch (error) {
      console.error("Error validating affiliate code:", error);
      setIsAffiliateValid(false);
    }
  };

  // Apply discount to price if affiliate code is valid
  const applyAffiliateDiscount = (price: number): number => {
    if (isAffiliateValid) {
      return price - (price * AFFILIATE_DISCOUNT_PERCENT / 100);
    }
    return price;
  };
  
  // Generate affiliate link for the user
  const generateAffiliateLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?aff=${userAffiliateCode}`;
    setAffiliateLink(link);
    return link;
  };
  
  // Copy affiliate link to clipboard
  const copyAffiliateLink = () => {
    const link = generateAffiliateLink();
    navigator.clipboard.writeText(link);
    toast.success("¡Enlace copiado al portapapeles!");
  };
  
  // Share affiliate link via social media
  const shareAffiliateLink = (platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter') => {
    const link = generateAffiliateLink();
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
  
  // Process checkout with affiliate tracking
  const handleCheckout = async (priceId: string) => {
    try {
      const stripeLinkWithoutAffiliate = STRIPE_PAYMENT_LINKS[priceId as keyof typeof STRIPE_PAYMENT_LINKS];
      
      if (!stripeLinkWithoutAffiliate) {
        toast.error("Error al procesar el pago. Opción de compra no disponible.");
        return;
      }
      
      // If there's an affiliate code, track the potential purchase
      if (isAffiliateValid && affiliateCode) {
        // Store the referral in Supabase
        await supabase.from('affiliate_referrals').insert({
          affiliate_code: affiliateCode,
          product_id: priceId,
          status: 'pending',
          created_at: new Date().toISOString()
        });
        
        // Add affiliate code as custom field to Stripe checkout
        const stripeLink = `${stripeLinkWithoutAffiliate}?client_reference_id=${affiliateCode}`;
        window.open(stripeLink, '_blank');
      } else {
        // No affiliate, use regular checkout
        window.open(stripeLinkWithoutAffiliate, '_blank');
      }
    } catch (error) {
      console.error("Error processing checkout:", error);
      toast.error("Error al procesar el pago. Inténtalo de nuevo más tarde.");
    }
  };

  const orderedPrices = [...prices].sort((a, b) => {
    const order = { general: 1, vip: 2, platinum: 3 };
    const aOrder = order[a.id as keyof typeof order] || 0;
    const bOrder = order[b.id as keyof typeof order] || 0;
    return aOrder - bOrder;
  });
  
  const getTicketDetails = (priceId: string) => {
    switch(priceId) {
      case 'general':
        return [
          'Ubicación General',
          'Workbook de Trabajo'
        ];
      case 'vip':
        return [
          '3 Entradas VIP al evento',
          '1 Mes del programa ACCIONADORES',
          '1 Mes de sesiones de Q&A grupales',
          'Ubicación VIP',
          'Mesa cómoda para toma de apuntes',
          'Workbook de trabajo'
        ];
      case 'platinum':
        return [
          'Ubicación en las primeras filas del evento',
          'Almuerzo VIP y consultoría de negocios con Felipe',
          'Foto profesional con Felipe',
          '1 Mes del programa ACCIONADORES',
          '1 Mes de sesiones de Q&A grupales',
          'Mesa cómoda para toma de apuntes',
          'Workbook de trabajo'
        ];
      default:
        return [];
    }
  };

  const generalPrice = orderedPrices.find(price => price.id === 'general');
  const vipPrice = orderedPrices.find(price => price.id === 'vip');
  const platinumPrice = orderedPrices.find(price => price.id === 'platinum');

  const renderPriceCard = (price: EventPrice | undefined, title?: string) => {
    if (!price) return null;
    
    const ticketDetails = getTicketDetails(price.id);
    
    let validUntilDate = new Date(price.valid_until);
    if (price.id === 'general' || price.id === 'platinum') {
      validUntilDate = new Date(2025, 2, 10); // 10 de marzo de 2025 (mes es 0-indexado)
    }
    
    // Apply affiliate discount if valid
    const originalPrice = price.price_amount / 100;
    const discountedPrice = applyAffiliateDiscount(originalPrice);
    
    return (
      <motion.div
        key={price.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-6 rounded-xl shadow-lg hover:shadow-xl flex flex-col h-full ${
          price.id === 'platinum' 
            ? 'bg-[#2A3456] bg-opacity-80' 
            : price.id === 'vip'
              ? 'bg-[#32293A] bg-opacity-80'
              : 'bg-[#243042] bg-opacity-80'
        }`}
      >
        <div className="flex flex-col items-center text-center mb-4">
          {price.event_name.includes('platinum') ? (
            <Crown className="w-12 h-12 text-accent mb-4" />
          ) : price.event_name.includes('vip') ? (
            <Star className="w-12 h-12 text-accent mb-4" />
          ) : (
            <Users className="w-12 h-12 text-accent mb-4" />
          )}
          <h3 className="text-xl font-semibold text-white mb-2">
            {price.id === 'general' ? "ENTRADA GENERAL" : price.ticket_description}
          </h3>
          
          {isAffiliateValid ? (
            <div className="space-y-1">
              <p className="text-2xl font-bold text-accent mb-0">
                ${discountedPrice.toFixed(0)} {price.currency}
              </p>
              <p className="text-sm text-gray-300 line-through">
                ${originalPrice.toFixed(0)} {price.currency}
              </p>
              <p className="text-xs text-green-400">
                ¡10% de descuento aplicado!
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-accent mb-2">
              ${originalPrice.toFixed(0)} {price.currency}
            </p>
          )}
          
          <p className="text-sm text-gray-300 mb-4">
            Válido hasta el {validUntilDate.toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex-grow">
          <ul className="text-left text-gray-200 mb-6 space-y-2">
            {ticketDetails.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <button 
            onClick={() => handleCheckout(price.id)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full px-4 py-2 rounded-full text-lg font-bold"
          >
            Comprar Ahora
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Elige tu Entrada</h2>
      
      {/* Affiliate Code Input Section */}
      <div className="mb-8 max-w-md mx-auto">
        <Card className="bg-gray-800 text-white border-none">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="affiliateCode" className="text-white">
                  ¿Tienes un código de afiliado?
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="affiliateCode"
                    placeholder="Ingresa tu código aquí"
                    value={affiliateCode}
                    onChange={(e) => setAffiliateCode(e.target.value)}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <button 
                    onClick={() => validateAffiliateCode(affiliateCode)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowAffiliateModal(true)}
                    className="text-accent underline text-sm hover:text-accent/80"
                  >
                    ¿Quieres ganar comisiones? Genera tu código de afiliado
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Affiliate Modal */}
      {showAffiliateModal && (
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
                      value={affiliateLink || generateAffiliateLink()}
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
                onClick={() => setShowAffiliateModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cerrar
              </button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="h-full flex flex-col">
          <h3 className="text-2xl font-bold text-white text-center mb-4">OPCIÓN 1</h3>
          <div className="flex-grow flex flex-col h-full">
            {renderPriceCard(generalPrice)}
          </div>
        </div>
        
        <div className="h-full flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-white">OPCIÓN 2</h3>
            <h4 className="text-xl font-bold text-white">COMBO UPGRADE A VIP 3X1</h4>
          </div>
          <div className="flex-grow flex flex-col h-full">
            {renderPriceCard(vipPrice)}
          </div>
        </div>
      </div>
      
      <div className="md:max-w-md mx-auto">
        {renderPriceCard(platinumPrice)}
      </div>
    </motion.div>
  );
};
