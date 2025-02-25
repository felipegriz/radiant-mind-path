
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session); // Debug log
      
      if (!session) {
        const hash = window.location.hash;
        console.log("URL hash:", hash); // Debug log
        
        // Si no hay sesión pero hay un hash en la URL, intentamos procesarlo
        if (hash && hash.includes('type=recovery')) {
          // El usuario llegó a través del enlace de recuperación
          return;
        }
        
        navigate('/auth/login');
        toast({
          title: "Acceso no autorizado",
          description: "Por favor sigue el enlace enviado a tu correo",
          variant: "destructive",
        });
      }
    };

    getSession();
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      // Cerrar la sesión después de actualizar la contraseña
      await supabase.auth.signOut();

      toast({
        title: "¡Éxito!",
        description: "Tu contraseña ha sido actualizada correctamente. Por favor inicia sesión nuevamente.",
      });

      navigate("/auth/login");
    } catch (error: any) {
      console.error("Error al actualizar contraseña:", error); // Debug log
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar la contraseña",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Nueva Contraseña
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Actualizar Contraseña
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
