import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import DashboardStats from "@/components/admin/DashboardStats";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AffiliateReport from "@/components/admin/AffiliateReport";

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
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Dashboard de Administración</h1>
        
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="affiliates">Afiliados</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <DashboardStats />
          </TabsContent>
          
          <TabsContent value="affiliates">
            <AffiliateReport />
          </TabsContent>
          
          <TabsContent value="customers">
            <div className="grid grid-cols-1 gap-6">
              <h2 className="text-2xl font-bold">Próximamente</h2>
              <p>La gestión de clientes estará disponible pronto.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="grid grid-cols-1 gap-6">
              <h2 className="text-2xl font-bold">Próximamente</h2>
              <p>La gestión de contenido estará disponible pronto.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
