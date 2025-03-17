
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  validateAffiliateCode, 
  getStoredAffiliateCode,
  getAffiliateStats 
} from "@/utils/affiliateUtils";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AffiliateCodeInputProps {
  affiliateCode: string;
  setAffiliateCode: (code: string) => void;
  setIsAffiliateValid: (isValid: boolean) => void;
  isAuthenticated: boolean;
  onShowAffiliateModal: () => void;
}

export const AffiliateCodeInput = ({
  affiliateCode,
  setAffiliateCode,
  setIsAffiliateValid,
  isAuthenticated,
  onShowAffiliateModal
}: AffiliateCodeInputProps) => {
  const [hasAffiliateProgram, setHasAffiliateProgram] = useState<boolean>(false);
  const [affiliateStats, setAffiliateStats] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a stored affiliate code
    const storedCode = getStoredAffiliateCode();
    if (storedCode && !affiliateCode) {
      setAffiliateCode(storedCode);
      validateAffiliateCode(storedCode).then(setIsAffiliateValid);
    }
    
    // Check if user has affiliate program
    const checkAffiliateProgram = async () => {
      if (isAuthenticated) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Check if user has an affiliate code
          const stats = await getAffiliateStats(session.user.id);
          if (stats) {
            setHasAffiliateProgram(true);
            setAffiliateStats(stats);
          }
        }
      }
    };
    
    checkAffiliateProgram();
  }, [isAuthenticated, affiliateCode, setAffiliateCode, setIsAffiliateValid]);

  const handleValidateCode = async () => {
    const isValid = await validateAffiliateCode(affiliateCode);
    setIsAffiliateValid(isValid);
  };

  return (
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
                  onClick={handleValidateCode}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Aplicar
                </button>
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="pt-2">
                {hasAffiliateProgram ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent">Tu programa de afiliados está activo</span>
                      <Badge variant="outline" className="bg-accent/20 text-accent border-accent">
                        {affiliateStats?.referralCount || 0} referidos
                      </Badge>
                    </div>
                    <button
                      onClick={() => navigate("/eventos/affiliate-dashboard")}
                      className="text-accent underline text-sm hover:text-accent/80 w-full text-center"
                    >
                      Ver mi panel de afiliados
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onShowAffiliateModal}
                    className="text-accent underline text-sm hover:text-accent/80"
                  >
                    ¿Quieres ganar comisiones? Genera tu código de afiliado
                  </button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
