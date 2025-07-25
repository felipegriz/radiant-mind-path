
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Despertar360 from "./pages/events/Despertar360";
import DespertarExplanation from "./pages/events/DespertarExplanation";
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
import UploadHeroVideo from "./pages/admin/UploadHeroVideo";
import AffiliateDashboard from "./pages/eventos/AffiliateDashboard";
import SobreMi from "./pages/SobreMi";
import CursosGratis from "./pages/cursos-gratis";
import LeadMagnet from "./pages/cursos-gratis/LeadMagnet";
import Webinar1 from "./pages/cursos-gratis/Webinar1";
import Webinar2 from "./pages/cursos-gratis/Webinar2";
import Webinar3 from "./pages/cursos-gratis/Webinar3";
import Webinar4 from "./pages/cursos-gratis/Webinar4";
import WakeUpTony2025 from "./pages/events/WakeUpTony2025";

const queryClient = new QueryClient();

// ProtectedRoute con redirección inmediata
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

    // Suscribirse a cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  // Si no está autenticado, redirigir inmediatamente
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/events/despertar-360" element={<Despertar360 />} />
            <Route path="/events/despertar-explanation" element={<DespertarExplanation />} />
            <Route path="/events/cita-con-lo-imposible" element={<CitaConLoImposible />} />
            <Route path="/events/mission-mastery" element={<MissionMastery />} />
            <Route path="/events/wake-up-tony-2025" element={<WakeUpTony2025 />} />
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
            <Route path="/admin/upload-hero-video" element={<UploadHeroVideo />} />
            <Route path="/eventos/affiliate-dashboard" element={<AffiliateDashboard />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            
            {/* Webinar Funnel Routes */}
            <Route path="/cursos-gratis" element={<CursosGratis />} />
            <Route path="/cursos-gratis/lead-magnet" element={<LeadMagnet />} />
            <Route path="/cursos-gratis/webinar-1" element={<Webinar1 />} />
            <Route path="/cursos-gratis/webinar-2" element={<Webinar2 />} />
            <Route path="/cursos-gratis/webinar-3" element={<Webinar3 />} />
            <Route path="/cursos-gratis/webinar-4" element={<Webinar4 />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
