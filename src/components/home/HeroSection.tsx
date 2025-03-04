
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-70 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: 0.2
            }}
            animate={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 15 + i * 5,
              ease: "linear" 
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-7/12 space-y-6 text-center md:text-left"
        >
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm inline-block rounded-full text-sm font-medium text-white mb-2 border border-white/20">
            FELIPE GRIZ
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            <span className="relative">
              Creando{" "}
              <span className="inline-block">
                <span className="relative z-10">Super Humanos</span>
                <motion.span
                  className="absolute bottom-2 left-0 h-3 bg-primary/20 w-full -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </span>
            <br />
            <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-primary/70 text-transparent bg-clip-text">
              A Través Del Crecimiento Personal
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl">
            Aprende la mentalidad y las mejores estrategias de las mentes más brillantes del mundo para transformar tu vida y alcanzar tu máximo potencial
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              onClick={() => navigate("/events/despertar-360")}
              className="bg-primary hover:bg-primary/90 text-background px-8 py-6 text-lg rounded-full font-semibold"
              size="lg"
            >
              Próximos Eventos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => navigate("/contacto")}
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white px-8 py-6 text-lg rounded-full font-semibold"
              size="lg"
            >
              Contactar
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full md:w-5/12 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl rounded-full"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-5xl md:text-6xl font-bold text-white">
                FG
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
