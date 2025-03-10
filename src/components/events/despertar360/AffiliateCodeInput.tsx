
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { validateAffiliateCode } from "@/utils/affiliateUtils";

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
                <button
                  onClick={onShowAffiliateModal}
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
  );
};
