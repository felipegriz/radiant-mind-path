
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
  const [authStatus, setAuthStatus] = useState<string>("Verificando autenticación...");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthStatus("Obteniendo sesión...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setAuthStatus("Error al obtener sesión: " + error.message);
          toast({
            variant: "destructive",
            title: "Error de autenticación",
            description: error.message
          });
          navigate('/auth/login', { replace: true });
          return;
        }

        if (!session) {
          setAuthStatus("No hay sesión activa");
          toast({
            variant: "destructive",
            title: "Acceso denegado",
            description: "Por favor inicia sesión para acceder"
          });
          navigate('/auth/login', { replace: true });
          return;
        }

        setAuthStatus("Sesión verificada correctamente");
        toast({
          title: "Autenticación exitosa",
          description: "Bienvenido al área de estudiantes"
        });
      } catch (error) {
        setAuthStatus("Error inesperado: " + (error as Error).message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Ocurrió un error inesperado"
        });
        navigate('/auth/login', { replace: true });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthStatus("Sesión terminada");
        toast({
          variant: "destructive",
          title: "Sesión finalizada",
          description: "Por favor vuelve a iniciar sesión"
        });
        navigate('/auth/login', { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Estado de autenticación</AlertTitle>
          <AlertDescription>{authStatus}</AlertDescription>
        </Alert>
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    </div>
  );
};

export default StudentArea;
