
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { AffiliatePanel } from "@/components/events/despertar360/AffiliatePanel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Debes iniciar sesión para acceder al panel de afiliados");
        navigate("/auth/login");
        return;
      }
      
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      
      {isAuthenticated ? (
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Afiliados</h1>
            <Button
              onClick={() => navigate("/events/despertar-360")}
              variant="outline"
              className="bg-white"
            >
              Volver a Despertar 360
            </Button>
          </div>
          
          <AffiliatePanel />
        </div>
      ) : (
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Restringido</h1>
          <p className="mb-8">Debes iniciar sesión para acceder al panel de afiliados.</p>
          <Button 
            onClick={() => navigate("/auth/login")}
            className="bg-primary hover:bg-primary/90"
          >
            Iniciar Sesión
          </Button>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard;
