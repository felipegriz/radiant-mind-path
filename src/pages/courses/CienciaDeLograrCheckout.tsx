import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const CienciaDeLograrCheckout = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y correo.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const origin = window.location.origin;
      const { data, error } = await supabase.functions.invoke("enroll-course", {
        body: {
          courseSlug: "ciencia-de-lograr",
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          discountCode: discountCode.trim(),
          successUrl: `${origin}/courses/ciencia-de-lograr/view`,
          cancelUrl: `${origin}/courses/ciencia-de-lograr/checkout`,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.free) {
        // Store access info for confirmation page
        sessionStorage.setItem(
          "course_access_info",
          JSON.stringify({
            email: data.email,
            password: data.password,
            userExisted: data.userExisted,
            courseSlug: "ciencia-de-lograr",
          })
        );
        navigate("/courses/ciencia-de-lograr/access");
      } else if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo procesar la inscripción",
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
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Inscríbete a La Ciencia de Lograr
          </h1>
          <p className="text-gray-300 text-center mb-10">
            Completa tus datos para acceder al curso.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 p-8 rounded-lg border border-white/10 space-y-5"
          >
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                required
                maxLength={100}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                maxLength={255}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="discount" className="text-white mb-2 block">
                Código de descuento (opcional)
              </Label>
              <Input
                id="discount"
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Ingresa tu código"
                maxLength={50}
                className="bg-white/10 border-white/20 text-white uppercase"
              />
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-300">Total</span>
                <span className="font-bold text-accent">$250 USD</span>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/80 text-black text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  "Pagar y Acceder al Curso"
                )}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Si tienes un código válido, el precio se ajustará automáticamente.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CienciaDeLograrCheckout;
