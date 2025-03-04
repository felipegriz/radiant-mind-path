
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  // You can update this path after uploading a new video
  const backgroundVideoPath = "/videos/background-loop.mp4";

  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Reduced opacity of the gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background/30 z-10" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/48d6c89f-ff5c-447f-9f9b-c5e0d1674f9c.png')] bg-center bg-cover" />
      </div>
      
      {/* Main content */}
      <div className="container relative z-20 mx-auto px-6 py-16 md:py-24 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 bg-primary/20 backdrop-blur-sm inline-block rounded-full text-sm font-medium text-primary mb-6 border border-primary/20"
          >
            PRÓXIMO EVENTO
          </motion.span>
          
          <div className="relative">
            {/* Video background for the heading */}
            <div className="absolute inset-0 overflow-hidden rounded-lg -z-10">
              <video 
                className="w-full h-full object-cover opacity-40"
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src={backgroundVideoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-background/50"></div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
            >
              Crea una vida<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">
                extraordinaria a través de cambiar tu subconsciente
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-white max-w-2xl mt-6 mb-10"
          >
            Aprende la mentalidad y las mejores estrategias de las mentes más brillantes del mundo para transformar tu vida
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button 
              onClick={() => navigate("/events/despertar-360")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 text-lg rounded-full font-semibold"
              size="lg"
            >
              Conseguir entradas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => navigate("/events/despertar-360")}
              variant="outline"
              className="border-white/40 bg-transparent hover:bg-white/10 text-white px-8 py-7 text-lg rounded-full"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver video
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Floating event card */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute right-10 bottom-20 z-30 hidden md:block"
      >
        <div className="bg-card/30 backdrop-blur-md rounded-xl p-4 border border-border w-80">
          <div className="aspect-video bg-gradient-to-r from-muted to-accent rounded-lg flex flex-col items-center justify-center overflow-hidden mb-3 relative">
            <span className="text-center text-lg font-bold text-white">FELIPE GRIZ</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">DESPERTAR</span>
            <span className="absolute bottom-2 right-2 text-xs text-white/70">360°</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium">Mirar ahora</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
