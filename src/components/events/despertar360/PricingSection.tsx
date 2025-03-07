
import { motion } from "framer-motion";
import { Users, Crown, Star } from "lucide-react";
import type { EventPrice } from "@/types/event";

interface PricingSectionProps {
  prices: EventPrice[];
}

const STRIPE_PAYMENT_LINKS = {
  general: "https://buy.stripe.com/dR6aGbcw6aMleRy2aT",
  vip: "https://buy.stripe.com/00gdSn9jU07H38Q16L",
  platinum: "https://buy.stripe.com/aEU15B1RsaMldNu9Di"
};

export const PricingSection = ({ prices }: PricingSectionProps) => {
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
          'Escarapela',
          'Entrada 3 DESPERTAR',
          'Workbook de Trabajo'
        ];
      case 'vip':
        return [
          'Escarapela Vip',
          '3 Entradas a 3 DESPERTAR',
          'Ubicaión VIP - Mesa',
          'Workbook de Trabajo',
          '1 Mes Accionadores',
          '1 Mes de sesiones de Q&A grupales'
        ];
      case 'platinum':
        return [
          'Escarapela Platinum',
          'Entradas 3 días',
          'Ubicación privilegiada primeras filas',
          'Foto con Felipe',
          'Almuerzo y Networking Premium con Felipe',
          'Mesa para tomar apuntes con comodidad',
          'Workbook de Trabajo',
          '1 Mes Accionadores',
          '1 Mes de sesiones de Q&A grupales'
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
    
    return (
      <motion.div
        key={price.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1A1F2C] p-6 rounded-xl shadow-lg hover:shadow-xl flex flex-col h-full"
      >
        <div className="flex flex-col items-center text-center mb-4">
          {price.event_name.includes('platinum') ? (
            <Crown className="w-12 h-12 text-accent mb-4" />
          ) : price.event_name.includes('vip') ? (
            <Star className="w-12 h-12 text-accent mb-4" />
          ) : (
            <Users className="w-12 h-12 text-accent mb-4" />
          )}
          <h3 className="text-xl font-semibold text-white mb-2">{price.ticket_description}</h3>
          <p className="text-2xl font-bold text-accent mb-2">
            ${(price.price_amount / 100).toFixed(0)} {price.currency}
          </p>
          <p className="text-sm text-gray-300 mb-4">
            Válido hasta el {new Date(price.valid_until).toLocaleDateString()}
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
            onClick={() => {
              const link = STRIPE_PAYMENT_LINKS[price.id as keyof typeof STRIPE_PAYMENT_LINKS];
              if (link) {
                window.open(link, '_blank');
              }
            }}
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
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-white text-center mb-4">OPCIÓN 1</h3>
          {renderPriceCard(generalPrice)}
        </div>
        
        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-white">OPCIÓN 2</h3>
            <h4 className="text-xl font-bold text-white">COMBO UPGRADE A VIP 3X1</h4>
          </div>
          {renderPriceCard(vipPrice)}
        </div>
      </div>
      
      <div className="md:max-w-md mx-auto">
        {renderPriceCard(platinumPrice)}
      </div>
    </motion.div>
  );
};
