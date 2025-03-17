
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { EventPrice } from "@/types/event";
import { AffiliateCodeInput } from "./AffiliateCodeInput";
import { AffiliateModal } from "./AffiliateModal";
import { PriceCard } from "./PriceCard";
import { 
  trackAffiliateReferral, 
  validateAffiliateCode, 
  getStoredAffiliateCode 
} from "@/utils/affiliateUtils";

interface PricingSectionProps {
  prices: EventPrice[];
}

const STRIPE_PAYMENT_LINKS = {
  general: "https://buy.stripe.com/dR6aGbcw6aMleRy2aT",
  vip: "https://buy.stripe.com/00gdSn9jU07H38Q16L",
  platinum: "https://buy.stripe.com/aEU15B1RsaMldNu9Di"
};

export const PricingSection = ({ prices }: PricingSectionProps) => {
  const [affiliateCode, setAffiliateCode] = useState<string>("");
  const [isAffiliateValid, setIsAffiliateValid] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userAffiliateCode, setUserAffiliateCode] = useState<string>("");
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
          const newCode = session.user.id.substring(0, 8);
          await supabase.from('affiliate_codes').insert({
            user_id: session.user.id,
            code: newCode
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
      validateAffiliateCode(codeFromUrl).then(setIsAffiliateValid);
    } else {
      // Check if there's a stored affiliate code
      const storedCode = getStoredAffiliateCode();
      if (storedCode) {
        setAffiliateCode(storedCode);
        validateAffiliateCode(storedCode).then(setIsAffiliateValid);
      }
    }
    
    checkAuth();
  }, []);
  
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
        await trackAffiliateReferral(affiliateCode, priceId);
        
        // Add affiliate code as custom field to Stripe checkout
        const stripeLink = `${stripeLinkWithoutAffiliate}?client_reference_id=${affiliateCode}`;
        
        // Show success message
        toast.success("Redirigiendo al pago con descuento de afiliado aplicado");
        
        // Open Stripe checkout in a new tab
        window.open(stripeLink, '_blank');
      } else {
        // No affiliate, use regular checkout
        toast.success("Redirigiendo al pago");
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

  const generalPrice = orderedPrices.find(price => price.id === 'general');
  const vipPrice = orderedPrices.find(price => price.id === 'vip');
  const platinumPrice = orderedPrices.find(price => price.id === 'platinum');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Elige tu Entrada</h2>
      
      {/* Affiliate Code Input Section */}
      <AffiliateCodeInput 
        affiliateCode={affiliateCode}
        setAffiliateCode={setAffiliateCode}
        setIsAffiliateValid={setIsAffiliateValid}
        isAuthenticated={isAuthenticated}
        onShowAffiliateModal={() => setShowAffiliateModal(true)}
      />
      
      {/* Affiliate Modal */}
      <AffiliateModal 
        show={showAffiliateModal}
        onClose={() => setShowAffiliateModal(false)}
        userAffiliateCode={userAffiliateCode}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="h-full flex flex-col">
          <h3 className="text-2xl font-bold text-white text-center mb-4">OPCIÓN 1</h3>
          <div className="flex-grow flex flex-col h-full">
            {generalPrice && (
              <PriceCard 
                price={generalPrice} 
                isAffiliateValid={isAffiliateValid}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
        
        <div className="h-full flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-white">OPCIÓN 2</h3>
            <h4 className="text-xl font-bold text-white">COMBO UPGRADE A VIP 3X1</h4>
          </div>
          <div className="flex-grow flex flex-col h-full">
            {vipPrice && (
              <PriceCard 
                price={vipPrice} 
                isAffiliateValid={isAffiliateValid}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="md:max-w-md mx-auto">
        {platinumPrice && (
          <PriceCard 
            price={platinumPrice} 
            isAffiliateValid={isAffiliateValid}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </motion.div>
  );
};
