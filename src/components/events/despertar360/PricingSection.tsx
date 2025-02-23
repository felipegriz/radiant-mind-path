
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventPrice } from "@/types/event";

interface PricingSectionProps {
  prices: EventPrice[];
  onPayment: (selectedPrice: EventPrice) => void;
  processingPriceId: string | null;
}

// Enlaces directos de pago de Stripe
const STRIPE_PAYMENT_LINKS = {
  general: "https://buy.stripe.com/4gw29F7bM4nX6l26qW",
  vip: "https://buy.stripe.com/00gdSn9jU07H38Q16L",
  platinum: "https://buy.stripe.com/aEU15B1RsaMldNu9Di"
};

export const PricingSection = ({
  prices,
  onPayment,
  processingPriceId: initialProcessingPriceId
}: PricingSectionProps) => {
  const [processingPriceId, setProcessingPriceId] = useState<string | null>(initialProcessingPriceId);

  // Ordenar los precios en el orden correcto: GENERAL, VIP, VIP PLATINO
  const orderedPrices = [...prices].sort((a, b) => {
    const order = { general: 1, vip: 2, platinum: 3 };
    const aOrder = order[a.id as keyof typeof order] || 0;
    const bOrder = order[b.id as keyof typeof order] || 0;
    return aOrder - bOrder;
  });

  const handlePayment = (price: EventPrice) => {
    setProcessingPriceId(price.id);
    onPayment(price);
    
    const paymentLink = STRIPE_PAYMENT_LINKS[price.id as keyof typeof STRIPE_PAYMENT_LINKS];
    if (paymentLink) {
      window.open(paymentLink, '_self');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Elige tu Entrada</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {orderedPrices.map((price) => (
          <motion.div
            key={price.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1F2C] p-6 rounded-xl shadow-lg hover:shadow-xl flex flex-col"
          >
            <div className="flex flex-col items-center text-center flex-grow">
              {price.event_name.includes('platinum') ? (
                <Crown className="w-12 h-12 text-accent mb-4" />
              ) : price.event_name.includes('vip') ? (
                <Star className="w-12 h-12 text-accent mb-4" />
              ) : (
                <Users className="w-12 h-12 text-accent mb-4" />
              )}
              <h3 className="text-xl font-semibold text-white mb-2">{price.ticket_description}</h3>
              <p className="text-2xl font-bold text-accent mb-2">
                ${(price.price_amount / 100).toFixed(2)} {price.currency}
              </p>
              <p className="text-sm text-gray-300 mb-4">
                Válido hasta el {new Date(price.valid_until).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={() => handlePayment(price)}
                disabled={processingPriceId === price.id}
                variant="default"
                className="w-full px-4 py-2 rounded-full text-lg font-bold"
              >
                {processingPriceId === price.id ? 'Procesando...' : 'Comprar Ahora'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
