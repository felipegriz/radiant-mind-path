import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  LogIn,
  LogOut,
  Loader2,
  PlayCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import cienciaDeLograrImg from "@/assets/ciencia-de-lograr.jpeg.asset.json";

const cursos = [
  {
    title: "La Ciencia de Lograr",
    description:
      "La habilidad maestra número uno que Tony Robbins dice que garantiza una vida extraordinaria.",
    path: "/courses/ciencia-de-lograr",
    viewPath: "/courses/ciencia-de-lograr/view",
    slug: "ciencia-de-lograr",
    image: cienciaDeLograrImg.url,
    available: true,
  },
  {
    title: "La Octava Área",
    description:
      "Descubre el área oculta que influye en todas las demás áreas de tu vida y aprende a dominarla.",
    path: "/courses/octava-area",
    slug: "octava-area",
    available: true,
  },
  {
    title: "ACCIONADORES",
    description:
      "Programa online en vivo para pasar a la acción y crear resultados reales en tu vida.",
    available: false,
  },
  {
    title: "ACTITUD DE PLENITUD",
    description:
      "Transforma tu estado interno y vive desde la plenitud todos los días.",
    available: false,
  },
  {
    title: "INFO-EMPRENDIMIENTO",
    description:
      "Construye y escala tu negocio digital con metodologías probadas.",
    available: false,
  },
  {
    title: "AI MASTERY",
    description:
      "Domina la inteligencia artificial y aplícala en tu vida y negocio.",
    available: false,
  },
];

const StudentArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessSlugs, setAccessSlugs] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsLoading(false);
        return;
      }

      setUserEmail(session.user.email ?? null);

      const { data: access } = await supabase
        .from("course_access")
        .select("course_slug")
        .eq("user_id", session.user.id)
        .eq("status", "active");

      setAccessSlugs((access || []).map((a) => a.course_slug));
      setIsLoading(false);
    };

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserEmail(null);
        setAccessSlugs([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setAccessSlugs([]);
    toast({ title: "Sesión cerrada" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Área de Estudiantes
              </h1>
              <p className="text-gray-300 text-lg">
                {userEmail
                  ? `Bienvenido, ${userEmail}`
                  : "Conoce nuestros cursos o accede al tuyo si ya eres alumno."}
              </p>
            </div>
            <div className="flex gap-3">
              {userEmail ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/auth/login")}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Ya soy alumno · Iniciar sesión
                </Button>
              )}
            </div>
          </div>

          {/* Mis cursos (si tiene acceso) */}
          {userEmail && accessSlugs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-accent" />
                Mis cursos
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {cursos
                  .filter((c) => c.slug && accessSlugs.includes(c.slug))
                  .map((curso) => (
                    <div
                      key={curso.title}
                      className="bg-accent/10 p-6 rounded-lg border border-accent/30"
                    >
                      <h3 className="text-xl font-bold mb-2 text-accent">
                        {curso.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {curso.description}
                      </p>
                      {curso.viewPath && (
                        <Link to={curso.viewPath}>
                          <Button className="w-full bg-accent hover:bg-accent/80 text-black">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Ver curso
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Catálogo de cursos */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Cursos disponibles</h2>
            <p className="text-gray-400 mb-6">
              Inscríbete a un curso. Si tienes un código de descuento, podrás
              aplicarlo en el checkout.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {cursos.map((curso) => {
                const alreadyOwned =
                  !!userEmail &&
                  !!curso.slug &&
                  accessSlugs.includes(curso.slug);

                return (
                  <div
                    key={curso.title}
                    className={`bg-white/5 rounded-lg border border-white/10 transition-all overflow-hidden ${
                      curso.available ? "hover:border-accent/50" : "opacity-70"
                    }`}
                  >
                    {(curso as any).image && (
                      <img
                        src={(curso as any).image}
                        alt={curso.title}
                        className="w-full aspect-square object-cover"
                      />
                    )}
                    <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-accent">
                      {curso.title}
                    </h3>
                    <p className="mb-6 text-gray-300 text-sm">
                      {curso.description}
                    </p>
                    {curso.available && curso.path ? (
                      alreadyOwned && curso.viewPath ? (
                        <Link to={curso.viewPath}>
                          <Button className="w-full bg-accent hover:bg-accent/80 text-black">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Ver curso
                          </Button>
                        </Link>
                      ) : (
                        <Link to={curso.path}>
                          <Button className="w-full bg-accent hover:bg-accent/80 text-black">
                            Inscribirme
                          </Button>
                        </Link>
                      )
                    ) : (
                      <Button disabled className="w-full">
                        Próximamente
                      </Button>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentArea;
