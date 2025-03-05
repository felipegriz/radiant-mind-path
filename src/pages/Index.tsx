import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import QuoteSection from "@/components/home/QuoteSection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute w-full z-50"
      >
        <Navbar />
      </motion.div>
      
      <HeroSection />

      <div className="container mx-auto px-4">
        <FeaturesSection />
        <StatisticsSection />
        <QuoteSection />
      </div>

      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="p-4 bg-card/30 backdrop-blur-md rounded-xl border border-border max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Acceso Rápido Administrador</h3>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/admin/upload-hero-video')}
              className="w-full"
              variant="outline"
            >
              Subir Video de Explicación
            </Button>
            <Button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full"
              variant="outline"
            >
              Dashboard Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
