import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CienciaDeLograrView = () => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/login");
        return;
      }
      const { data, error } = await supabase
        .from("course_access")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_slug", "ciencia-de-lograr")
        .eq("status", "active")
        .maybeSingle();

      if (!error && data) setHasAccess(true);
      setLoading(false);
    };
    check();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso restringido</h1>
          <p className="text-gray-300 mb-6">
            No tienes acceso a este curso todavía.
          </p>
          <Button
            onClick={() => navigate("/courses/ciencia-de-lograr")}
            className="bg-accent hover:bg-accent/80 text-black"
          >
            Ver detalles del curso
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            La Ciencia de Lograr
          </h1>
          <p className="text-gray-300 mb-8">
            Bienvenido. Aquí encontrarás todo el contenido del curso.
          </p>

          <div className="aspect-video bg-black/60 rounded-lg border border-white/10 flex items-center justify-center mb-8">
            <p className="text-gray-400">
              Próximamente: video principal del curso
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Módulo 1 — Fundamentos",
              "Módulo 2 — El sistema",
              "Módulo 3 — Aplicación práctica",
              "Módulo 4 — Maestría",
            ].map((m) => (
              <div
                key={m}
                className="bg-white/5 p-5 rounded border border-white/10"
              >
                <h3 className="font-semibold mb-1">{m}</h3>
                <p className="text-sm text-gray-400">Contenido próximamente</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CienciaDeLograrView;
