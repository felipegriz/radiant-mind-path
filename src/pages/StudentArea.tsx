import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Mail, 
  Phone,
  AlertCircle,
  Loader2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { AIChat } from "@/components/chat/AIChat";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { EventCohort, UserEventAccess, EventContentModule } from "@/types/event";

const StudentArea = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [userEventAccess, setUserEventAccess] = useState<UserEventAccess[]>([]);
  const [eventModules, setEventModules] = useState<EventContentModule[]>([]);
  const [cohorts, setCohorts] = useState<EventCohort[]>([]);
  const whatsappNumber = "17869925648";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const emailAddress = "contacto@felipegriz.com";

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth/login', { replace: true });
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, nickname')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name);
          setNickname(profile.nickname);
        }

        const { data: access } = await supabase
          .from('user_event_access')
          .select('*')
          .eq('user_id', session.user.id);

        if (access) {
          setUserEventAccess(access);
        }

        const { data: activeCohortes } = await supabase
          .from('event_cohorts')
          .select('*')
          .eq('is_active', true);

        if (activeCohortes) {
          setCohorts(activeCohortes);
        }

        const { data: modules } = await supabase
          .from('event_content_modules')
          .select('*')
          .order('sequence_order');

        if (modules) {
          setEventModules(modules);
        }
      } catch (error) {
        console.error('Error loading student data:', error);
        navigate('/auth/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  const getUserEventStatus = (cohortId: string) => {
    const access = userEventAccess.find(a => a.cohort_id === cohortId);
    return access?.status || null;
  };

  const getAvailableModules = (eventType: string, status: string | null) => {
    if (!status) return [];
    return eventModules.filter(module => 
      module.event_type === eventType && 
      module.required_status.includes(status)
    );
  };

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
            <div className="flex justify-center mb-6">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {nickname ? `¡Bienvenido, ${nickname}!` : "Área de Estudiantes"}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Bienvenido al espacio exclusivo para estudiantes de Felipe Griz
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {cohorts.map((cohort) => {
          const status = getUserEventStatus(cohort.id);
          const availableModules = getAvailableModules(cohort.event_type, status);
          const cohortDate = new Date(cohort.start_date);
          const today = new Date();

          if (!status) return null;

          return (
            <motion.div
              key={cohort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-6">{cohort.cohort_name}</h2>
              
              {status === 'registered' && cohortDate > today && (
                <Alert variant="default" className="mb-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Evento Próximo</AlertTitle>
                  <AlertDescription>
                    Tu evento comienza el {new Date(cohort.start_date).toLocaleDateString()}. 
                    Podrás acceder al contenido completo después de asistir al evento.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {availableModules.map((module, index) => (
                  <motion.a
                    key={module.id}
                    href={module.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-card p-8 rounded-2xl hover-lift cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 text-white mb-4">{module.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
                      {module.description && (
                        <p className="text-gray-300">{module.description}</p>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <AIChat />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda?</h2>
            <p className="text-gray-300 mb-6">
              Nuestro equipo está aquí para apoyarte en tu proceso de aprendizaje
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-accent hover:bg-accent/80 text-background px-8 py-3 rounded-full text-lg font-medium transition-colors">
                  Contactar Soporte
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[200px]">
                <DropdownMenuItem onClick={() => window.open(whatsappUrl, '_blank')} className="cursor-pointer">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = `mailto:${emailAddress}`} className="cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentArea;
