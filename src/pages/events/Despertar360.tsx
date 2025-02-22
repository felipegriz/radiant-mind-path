
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Clock, Lock, BookOpen, PlayCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Despertar360 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const studentResources = [
    {
      icon: PlayCircle,
      title: "Videos del Evento",
      description: "Accede a las grabaciones de todas las sesiones"
    },
    {
      icon: FileText,
      title: "Material Complementario",
      description: "Descarga guías y recursos exclusivos"
    },
    {
      icon: BookOpen,
      title: "Ejercicios Prácticos",
      description: "Profundiza tu aprendizaje con ejercicios guiados"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">DESPERTAR 360</h1>
            <p className="text-xl text-gray-300 mb-8">
              Una experiencia transformadora que te llevará a descubrir tu verdadero potencial y despertar tu consciencia superior
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Sobre el Evento</h2>
            <p className="text-gray-300 mb-6">
              DESPERTAR 360 es un seminario intensivo de tres días diseñado para ayudarte a romper 
              limitaciones, transformar creencias y acceder a estados elevados de consciencia. 
              A través de técnicas avanzadas de programación mental y ejercicios prácticos, 
              descubrirás herramientas poderosas para manifestar la vida que deseas.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <CalendarDays className="w-6 h-6 text-white" />
                <span className="text-gray-300">3 días intensivos</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-white" />
                <span className="text-gray-300">Grupo reducido</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-white" />
                <span className="text-gray-300">Ubicación Premium</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-white" />
                <span className="text-gray-300">Inmersión Total</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">¿Qué Aprenderás?</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Técnicas avanzadas de meditación y mindfulness
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Herramientas de programación mental y PNL
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Métodos para elevar tu frecuencia vibracional
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Prácticas para manifestación consciente
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Estrategias para mantener estados elevados
              </li>
            </ul>
          </motion.div>
        </div>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            {isAuthenticated ? (
              <div className="glass-card p-8 rounded-2xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Portal del Estudiante</h2>
                  <p className="text-gray-300">
                    Accede a todos los recursos exclusivos del evento Despertar 360
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {studentResources.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-card p-6 rounded-xl hover-lift cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <resource.icon className="w-12 h-12 text-accent mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                        <p className="text-gray-300">{resource.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto text-center">
                <Lock className="w-12 h-12 text-white mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Acceso Exclusivo para Estudiantes</h2>
                <p className="text-gray-300 mb-6">
                  Inicia sesión para acceder a todos los recursos exclusivos del evento Despertar 360
                </p>
                <Button 
                  onClick={() => navigate('/auth/login')}
                  className="bg-accent hover:bg-accent/80 text-background px-8 py-4 rounded-full text-lg font-bold transition-colors"
                >
                  Iniciar Sesión
                </Button>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-accent hover:bg-accent/80 text-background px-8 py-4 rounded-full text-lg font-bold transition-colors">
            Reserva Tu Lugar Ahora
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Despertar360;
