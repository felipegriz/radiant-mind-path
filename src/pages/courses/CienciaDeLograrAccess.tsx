import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AccessInfo {
  email: string;
  password: string | null;
  userExisted: boolean;
  courseSlug: string;
}

const CienciaDeLograrAccess = () => {
  const [info, setInfo] = useState<AccessInfo | null>(null);
  const [autoLoggingIn, setAutoLoggingIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem("course_access_info");
    if (!raw) {
      navigate("/courses/ciencia-de-lograr/checkout");
      return;
    }
    setInfo(JSON.parse(raw));
  }, [navigate]);

  const copy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    toast({ title: "Copiado al portapapeles" });
  };

  const handleAccessCourse = async () => {
    if (!info) return;
    setAutoLoggingIn(true);
    try {
      if (info.password) {
        await supabase.auth.signInWithPassword({
          email: info.email,
          password: info.password,
        });
      }
      navigate("/courses/ciencia-de-lograr/view");
    } catch {
      navigate("/auth/login");
    } finally {
      setAutoLoggingIn(false);
    }
  };

  if (!info) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              ¡Inscripción Confirmada!
            </h1>
            <p className="text-gray-300 text-lg">
              Tu acceso al curso "La Ciencia de Lograr" está listo.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-lg border border-white/10 space-y-5 mb-8">
            <h2 className="text-xl font-bold text-accent mb-4">
              Tus datos de acceso
            </h2>

            <div>
              <p className="text-sm text-gray-400 mb-1">Correo / Usuario</p>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-3 rounded">
                <span className="flex-1 font-mono">{info.email}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(info.email)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {info.password ? (
              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Contraseña (guárdala en lugar seguro)
                </p>
                <div className="flex items-center gap-2 bg-black/40 px-4 py-3 rounded">
                  <span className="flex-1 font-mono">{info.password}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(info.password!)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Puedes cambiar tu contraseña desde la opción "¿Olvidaste tu
                  contraseña?" en el login.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-300 bg-accent/10 p-3 rounded">
                Ya tenías una cuenta con este correo. Usa tu contraseña habitual
                para entrar.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccessCourse}
              disabled={autoLoggingIn}
              className="flex-1 bg-accent hover:bg-accent/80 text-black text-lg py-6"
            >
              {autoLoggingIn ? "Entrando..." : "Ver el curso ahora"}
            </Button>
            <Link to="/auth/login" className="flex-1">
              <Button variant="outline" className="w-full text-lg py-6">
                Ir al login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CienciaDeLograrAccess;
