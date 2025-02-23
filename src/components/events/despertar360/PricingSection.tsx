
import { motion } from "framer-motion";
import { Users, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventPrice } from "@/types/event";

interface PricingSectionProps {
  prices: EventPrice[];
  selectedPrice: EventPrice | null;
  setSelectedPrice: (price: EventPrice) => void;
  onPayment: () => void;
  isProcessing: boolean;
}

export const PricingSection = ({
  prices,
  selectedPrice,
  setSelectedPrice,
  onPayment,
  isProcessing
}: PricingSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Elige tu Entrada</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {prices.map((price) => (
          <motion.div
            key={price.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`bg-white p-6 rounded-xl cursor-pointer transition-all shadow-lg hover:shadow-xl ${
              selectedPrice?.id === price.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPrice(price)}
          >
            <div className="flex flex-col items-center text-center">
              {price.event_name.includes('platinum') ? (
                <Crown className="w-12 h-12 text-primary mb-4" />
              ) : price.event_name.includes('vip') ? (
                <Star className="w-12 h-12 text-primary mb-4" />
              ) : (
                <Users className="w-12 h-12 text-primary mb-4" />
              )}
              <h3 className="text-xl font-semibold text-primary mb-2">{price.ticket_description}</h3>
              <p className="text-2xl font-bold text-primary mb-2">
                ${(price.price_amount / 100).toFixed(2)} {price.currency}
              </p>
              <p className="text-sm text-gray-600">
                Válido hasta el {new Date(price.valid_until).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={onPayment}
          disabled={isProcessing || !selectedPrice}
          className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors"
        >
          {isProcessing ? "Procesando..." : selectedPrice ? `Reserva Tu Lugar Ahora - $${(selectedPrice.price_amount / 100).toFixed(2)} ${selectedPrice.currency}` : "Selecciona una entrada"}
        </Button>
      </div>
    </motion.div>
  );
};
