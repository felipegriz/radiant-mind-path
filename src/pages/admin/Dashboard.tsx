
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import DashboardStats from "@/components/admin/DashboardStats";
import Navbar from "@/components/layout/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth/login');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleData?.role !== 'admin') {
      navigate('/student-area');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>
        
        <DashboardStats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center text-center"
            onClick={() => navigate('/courses/octava-area')}
          >
            <h3 className="text-lg font-semibold mb-2">Gestionar La Octava Area</h3>
            <p className="text-sm text-muted-foreground">
              Actualizar videos y contenido del curso
            </p>
          </Button>

          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center text-center"
            onClick={() => navigate('/admin/students')}
          >
            <h3 className="text-lg font-semibold mb-2">Gestionar Estudiantes</h3>
            <p className="text-sm text-muted-foreground">
              Ver y administrar estudiantes registrados
            </p>
          </Button>

          <Button 
            variant="outline"
            className="p-6 h-auto flex flex-col items-center text-center"
            onClick={() => navigate('/admin/content')}
          >
            <h3 className="text-lg font-semibold mb-2">Gestionar Contenido</h3>
            <p className="text-sm text-muted-foreground">
              Administrar contenido y recursos
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
