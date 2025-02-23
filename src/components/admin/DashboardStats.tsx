
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Calendar, Users, GraduationCap, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DashboardStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: totalStudents } = await supabase
        .from('students')
        .select('id', { count: 'exact' });

      const { data: activeEnrollments } = await supabase
        .from('enrollments')
        .select('id', { count: 'exact' })
        .eq('status', 'active');

      const { data: upcomingSessions } = await supabase
        .from('program_sessions')
        .select('id', { count: 'exact' })
        .gte('session_date', new Date().toISOString());

      const { data: premiumStudents } = await supabase
        .from('enrollments')
        .select('id', { count: 'exact' })
        .eq('status', 'active')
        .in('program_id', (await supabase
          .from('programs')
          .select('id')
          .eq('is_premium', true)).data?.map(p => p.id) || []);

      return {
        totalStudents: totalStudents?.count || 0,
        activeEnrollments: activeEnrollments?.count || 0,
        upcomingSessions: upcomingSessions?.count || 0,
        premiumStudents: premiumStudents?.count || 0
      };
    }
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-20 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      label: "Estudiantes Totales",
      value: stats?.totalStudents || 0,
      icon: Users,
      description: "Total de estudiantes registrados"
    },
    {
      label: "Inscripciones Activas",
      value: stats?.activeEnrollments || 0,
      icon: GraduationCap,
      description: "Programas actualmente en curso"
    },
    {
      label: "Próximas Sesiones",
      value: stats?.upcomingSessions || 0,
      icon: Calendar,
      description: "Sesiones programadas"
    },
    {
      label: "Estudiantes Premium",
      value: stats?.premiumStudents || 0,
      icon: TrendingUp,
      description: "En programas premium"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <metric.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </p>
              <h3 className="text-2xl font-bold">
                {metric.value}
              </h3>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {metric.description}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
