
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Despertar360 from "./pages/events/Despertar360";
import CitaConLoImposible from "./pages/events/CitaConLoImposible";
import MissionMastery from "./pages/events/MissionMastery";
import StudentArea from "./pages/StudentArea";
import Login from "./pages/auth/Login";
import Contacto from "./pages/Contacto";
import SuperHumano from "./pages/coaching-consultoria/SuperHumano";
import SilverPartnership from "./pages/coaching-consultoria/SilverPartnership";
import GreyPlatinum from "./pages/coaching-consultoria/GreyPlatinum";
import Dashboard from "./pages/admin/Dashboard";
import OctavaArea from "./pages/courses/OctavaArea";
import ResetPassword from "@/pages/auth/ResetPassword";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// AuthProvider para manejar el estado global de autenticación
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar la sesión inicial
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        // Si no hay sesión y estamos en una ruta protegida, redirigir al login
        if (!session && window.location.pathname.includes('/student-area')) {
          navigate('/auth/login', { replace: true });
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
      }
    };

    checkSession();

    // Suscribirse a cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate('/auth/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return children;
};

// Componente de protección para rutas que requieren autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth/login', { replace: true });
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth:', error);
        navigate('/auth/login', { replace: true });
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events/despertar-360" element={<Despertar360 />} />
              <Route path="/events/cita-con-lo-imposible" element={<CitaConLoImposible />} />
              <Route path="/events/mission-mastery" element={<MissionMastery />} />
              <Route 
                path="/student-area" 
                element={
                  <ProtectedRoute>
                    <StudentArea />
                  </ProtectedRoute>
                } 
              />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/coaching-consultoria/super-humano" element={<SuperHumano />} />
              <Route path="/coaching-consultoria/silver-partnership" element={<SilverPartnership />} />
              <Route path="/coaching-consultoria/grey-platinum" element={<GreyPlatinum />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/courses/octava-area" element={<OctavaArea />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
