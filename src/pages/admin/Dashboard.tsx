
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardStats from "@/components/admin/DashboardStats";
import { useNavigate } from "react-router-dom";
import { Users, CalendarDays, BookOpen, Plus, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [status, setStatus] = useState<"registered" | "attended" | "graduated">("attended");
  const [cohorts, setCohorts] = useState<Array<{id: string, cohort_name: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCohorts, setIsFetchingCohorts] = useState(true);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const { data: cohortsData, error } = await supabase
          .from('event_cohorts')
          .select('id, cohort_name')
          .eq('event_type', 'despertar_360')
          .order('start_date', { ascending: false });

        if (error) throw error;

        if (cohortsData) {
          setCohorts(cohortsData);
          setIsFetchingCohorts(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las cohortes",
          variant: "destructive",
        });
      }
    };

    fetchCohorts();
  }, [toast]);

  const handleRegisterAttendee = async () => {
    if (!email || !selectedCohort) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo y selecciona una cohorte",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        const { error: accessError } = await supabase
          .from('user_event_access')
          .insert([
            {
              user_id: existingUser.id,
              cohort_id: selectedCohort,
              status: status,
              attendance_date: status === 'attended' || status === 'graduated' ? new Date().toISOString() : null,
            },
          ]);

        if (accessError) throw accessError;

        toast({
          title: "¡Éxito!",
          description: "El asistente ha sido registrado correctamente",
        });

        setEmail("");
        setSelectedCohort("");
      } else {
        toast({
          title: "Error",
          description: "No se encontró un usuario con ese correo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar al asistente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="mt-8 p-6 bg-card rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Registrar Asistente Previo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            disabled={isFetchingCohorts}
            value={selectedCohort}
            onValueChange={setSelectedCohort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar cohorte" />
            </SelectTrigger>
            <SelectContent>
              {cohorts.map((cohort) => (
                <SelectItem key={cohort.id} value={cohort.id}>
                  {cohort.cohort_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(val: "registered" | "attended" | "graduated") => setStatus(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registered">Registrado</SelectItem>
              <SelectItem value="attended">Asistió</SelectItem>
              <SelectItem value="graduated">Graduado</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleRegisterAttendee}
            disabled={isLoading || !email || !selectedCohort}
            className="md:col-span-3"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Registrar Asistente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
