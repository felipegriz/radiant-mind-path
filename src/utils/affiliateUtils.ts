
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AffiliateReferral } from "@/types/event";

// Discount percentage for affiliate purchases
export const AFFILIATE_DISCOUNT_PERCENT = 10;
// Commission percentage for affiliates
export const AFFILIATE_COMMISSION_PERCENT = 20;

// Generate affiliate code based on user ID
export const generateAffiliateCode = (userId: string): string => {
  return userId.substring(0, 8);
};

// Validate affiliate code
export const validateAffiliateCode = async (code: string) => {
  if (!code) {
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('affiliate_codes')
      .select('*')
      .eq('code', code)
      .single();
    
    if (error || !data) {
      return false;
    } else {
      toast.success("Código de afiliado aplicado. ¡Descuento del 10% activado!");
      return true;
    }
  } catch (error) {
    console.error("Error validating affiliate code:", error);
    return false;
  }
};

// Apply discount to price if affiliate code is valid
export const applyAffiliateDiscount = (price: number, isAffiliateValid: boolean): number => {
  if (isAffiliateValid) {
    return price - (price * AFFILIATE_DISCOUNT_PERCENT / 100);
  }
  return price;
};

// Generate affiliate link
export const generateAffiliateLink = (userAffiliateCode: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?aff=${userAffiliateCode}`;
};

// Track affiliate referral
export const trackAffiliateReferral = async (
  affiliateCode: string, 
  priceId: string
) => {
  try {
    // Store the referral in Supabase
    const referralData: Omit<AffiliateReferral, 'id' | 'completed_at'> = {
      affiliate_code: affiliateCode,
      product_id: priceId,
      status: 'pending',
      order_id: null,
      created_at: new Date().toISOString()
    };
    
    await supabase.from('affiliate_referrals').insert(referralData);
    return true;
  } catch (error) {
    console.error("Error tracking affiliate referral:", error);
    return false;
  }
};
