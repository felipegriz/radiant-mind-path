
import { Button } from "@/components/ui/button";
import DashboardStats from "@/components/admin/DashboardStats";
import { useNavigate } from "react-router-dom";
import { Users, CalendarDays, BookOpen } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/students")}>
            <Users className="mr-2" /> Estudiantes
          </Button>
          <Button onClick={() => navigate("/admin/calendar")}>
            <CalendarDays className="mr-2" /> Calendario
          </Button>
          <Button onClick={() => navigate("/admin/programs")}>
            <BookOpen className="mr-2" /> Programas
          </Button>
        </div>
      </div>

      <DashboardStats />
    </div>
  );
};

export default Dashboard;
