
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onRegisterClick: () => void;
}

export const FinalCTASection = ({ onRegisterClick }: FinalCTASectionProps) => {
  return (
    <section className="bg-[#1A1F2C] text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            ¿ESTÁS LISTO PARA TRANSFORMAR TU VIDA?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Las plazas son limitadas y se agotan rápidamente. 
            No pierdas la oportunidad de ser parte de esta experiencia única.
          </p>
          <Button 
            onClick={onRegisterClick}
            size="lg"
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors"
          >
            ¡RESERVA TU LUGAR AHORA!
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
