
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LeadMagnet = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store the lead information in Supabase
      const { error } = await supabase.from("webinar_leads").insert({
        name,
        email,
        whatsapp,
        funnel_stage: "lead_magnet"
      });

      if (error) {
        console.error("Supabase error:", error);
        if (error.code === "23505") {
          toast({
            title: "Este email ya está registrado",
            description: "Ya tienes acceso al contenido. Serás redirigido en un momento.",
            variant: "default",
          });
          
          // Store lead info in localStorage for access throughout the funnel
          localStorage.setItem("webinarLead", JSON.stringify({ name, email, whatsapp }));
          
          // Small delay before redirect
          setTimeout(() => {
            navigate("/cursos-gratis/webinar-1");
          }, 2000);
          return;
        }
        throw error;
      }

      // Store lead info in localStorage for access throughout the funnel
      localStorage.setItem("webinarLead", JSON.stringify({ name, email, whatsapp }));

      toast({
        title: "¡Registro exitoso!",
        description: "Ahora accederás al contenido exclusivo.",
      });

      // Navigate to the first webinar page
      navigate("/cursos-gratis/webinar-1");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu información. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Descubre LA OCTAVA ÁREA De Tu Vida
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-accent">
            El secreto que transformará todas las áreas de tu vida
          </h2>
          
          <div className="bg-white/5 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-white/10 mb-12">
            <h3 className="text-xl font-medium mb-4">
              Curso gratuito exclusivo con Felipe Griz
            </h3>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span> 
                <span>Descubre por qué esta área es fundamental para el éxito en todas las demás</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span> 
                <span>Aprende a dominar esta área oculta que nadie te ha enseñado</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span> 
                <span>Metodología paso a paso para implementar de inmediato</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span> 
                <span>Transforma resultados en tu salud, relaciones, finanzas y más</span>
              </li>
            </ul>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-white/20"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Tu WhatsApp (con código de país)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  className="bg-white/10 border-white/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/80 text-black font-medium py-6"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "¡QUIERO ACCEDER AL CURSO AHORA!"}
              </Button>
            </form>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>Al registrarte, aceptas recibir información relacionada con el curso.</p>
            <p>Tus datos están seguros y nunca serán compartidos con terceros.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;
