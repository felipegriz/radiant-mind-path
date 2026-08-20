import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

const BASE_PRICE = 250;
const VALID_CODES: Record<string, number> = { TIGRE: 100 };

const CienciaDeLograrCheckout = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const finalPrice = BASE_PRICE - (BASE_PRICE * discountPct) / 100;
  const isFree = finalPrice <= 0;

  const handleValidateCode = () => {
    const normalized = discountCode.trim().toUpperCase();
    if (!normalized) {
      setCodeError("Ingresa un código");
      return;
    }
    const pct = VALID_CODES[normalized];
    if (!pct) {
      setAppliedCode(null);
      setDiscountPct(0);
      setCodeError("Código no válido");
      return;
    }
    setAppliedCode(normalized);
    setDiscountPct(pct);
    setCodeError(null);
    toast({ title: "Código aplicado", description: `Descuento del ${pct}%` });
  };

  const handleRemoveCode = () => {
    setAppliedCode(null);
    setDiscountPct(0);
    setDiscountCode("");
    setCodeError(null);
  };

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
          discountCode: appliedCode || "",
          successUrl: `${origin}/courses/ciencia-de-lograr/access?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/courses/ciencia-de-lograr/checkout`,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.free) {
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
              <div className="flex gap-2">
                <Input
                  id="discount"
                  type="text"
                  value={discountCode}
                  onChange={(e) => {
                    setDiscountCode(e.target.value);
                    if (appliedCode) {
                      setAppliedCode(null);
                      setDiscountPct(0);
                    }
                    setCodeError(null);
                  }}
                  placeholder="Ingresa tu código"
                  maxLength={50}
                  disabled={!!appliedCode}
                  className="bg-white/10 border-white/20 text-white uppercase flex-1"
                />
                {appliedCode ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveCode}
                  >
                    Quitar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleValidateCode}
                  >
                    Validar
                  </Button>
                )}
              </div>
              {appliedCode && (
                <p className="text-sm text-accent mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Código "{appliedCode}" aplicado ({discountPct}% de descuento)
                </p>
              )}
              {codeError && (
                <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {codeError}
                </p>
              )}
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-300">Total</span>
                <span className="font-bold text-accent">
                  {discountPct > 0 && (
                    <span className="text-gray-500 line-through mr-2 text-base font-normal">
                      ${BASE_PRICE}
                    </span>
                  )}
                  ${finalPrice} USD
                </span>
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
                ) : isFree ? (
                  "Acceder al Curso Gratis"
                ) : (
                  "Pagar y Acceder al Curso"
                )}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-3">
                {isFree
                  ? "Tu código cubre el 100% del valor del curso."
                  : "Pago seguro procesado por Stripe."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CienciaDeLograrCheckout;
