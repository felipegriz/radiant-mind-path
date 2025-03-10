
import { motion } from "framer-motion";
import { Users, Crown, Star } from "lucide-react";
import type { EventPrice } from "@/types/event";
import { applyAffiliateDiscount } from "@/utils/affiliateUtils";

interface PriceCardProps {
  price: EventPrice;
  isAffiliateValid: boolean;
  onCheckout: (priceId: string) => void;
}

export const PriceCard = ({
  price,
  isAffiliateValid,
  onCheckout
}: PriceCardProps) => {
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

  const ticketDetails = getTicketDetails(price.id);
  
  let validUntilDate = new Date(price.valid_until);
  if (price.id === 'general' || price.id === 'platinum') {
    validUntilDate = new Date(2025, 2, 10); // 10 de marzo de 2025 (mes es 0-indexado)
  }
  
  // Apply affiliate discount if valid
  const originalPrice = price.price_amount / 100;
  const discountedPrice = applyAffiliateDiscount(originalPrice, isAffiliateValid);
  
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
          onClick={() => onCheckout(price.id)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full px-4 py-2 rounded-full text-lg font-bold"
        >
          Comprar Ahora
        </button>
      </div>
    </motion.div>
  );
};
