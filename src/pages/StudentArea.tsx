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
import { useToast } from "@/components/ui/use-toast";
import type { EventCohort, UserEventAccess, EventContentModule } from "@/types/event";

const StudentArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    const immediateAuthCheck = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Acceso Restringido",
          description: "Por favor inicia sesión para acceder al área de estudiantes"
        });
        navigate('/auth/login', { replace: true });
      }
    };
    immediateAuthCheck();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        toast({
          variant: "destructive",
          title: "Sesión finalizada",
          description: "Por favor inicia sesión para continuar"
        });
        navigate('/auth/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/auth/login', { replace: true });
          return;
        }

        // Cargar perfil del usuario
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, nickname')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo cargar tu perfil"
          });
          return;
        }

        if (profile) {
          setFullName(profile.full_name || '');
          setNickname(profile.nickname || '');
        }

        // Cargar accesos a eventos
        const { data: access } = await supabase
          .from('user_event_access')
          .select('*')
          .eq('user_id', session.user.id);

        setUserEventAccess(access || []);

        // Cargar cohortes activos
        const { data: activeCohortes } = await supabase
          .from('event_cohorts')
          .select('*')
          .eq('is_active', true);

        setCohorts(activeCohortes || []);

        // Cargar módulos
        const { data: modules } = await supabase
          .from('event_content_modules')
          .select('*')
          .order('sequence_order');

        setEventModules(modules || []);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error al cargar los datos del estudiante"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate, toast]);

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

  if (cohorts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sin acceso a eventos</AlertTitle>
            <AlertDescription>
              No tienes acceso a ningún evento en este momento. Por favor contacta con soporte si crees que esto es un error.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Contactar por WhatsApp
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${emailAddress}`}>
                <Mail className="w-4 h-4 mr-2" />
                Contactar por Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenido, {nickname || fullName || 'Estudiante'}
            </h1>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${emailAddress}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </Button>
            </div>
          </div>

          {userEventAccess.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sin acceso activo</AlertTitle>
              <AlertDescription>
                Aún no tienes acceso a ningún evento. Si acabas de realizar tu compra, 
                el acceso se activará en breve. Si tienes dudas, por favor contáctanos.
              </AlertDescription>
            </Alert>
          )}

          {cohorts.map((cohort) => {
            const status = getUserEventStatus(cohort.id);
            const availableModules = getAvailableModules(cohort.event_type, status);
            
            return (
              <motion.div
                key={cohort.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-primary">
                    {cohort.cohort_name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Estado: {status || 'Sin acceso'}
                    </span>
                  </div>
                </div>

                {status && availableModules.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {availableModules.map((module) => (
                      <a
                        key={module.id}
                        href={module.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-background rounded-md hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-primary">{module.icon}</span>
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            {module.description && (
                              <p className="text-sm text-muted-foreground">
                                {module.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Sin acceso a este evento</AlertTitle>
                    <AlertDescription>
                      No tienes acceso a este evento en este momento. Si crees que esto es un error,
                      por favor contacta con soporte.
                    </AlertDescription>
                  </Alert>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentArea;
