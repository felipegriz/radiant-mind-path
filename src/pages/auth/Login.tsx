
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .single();

      if (roleError) throw roleError;

      if (roleData?.role === 'admin') {
        toast({
          title: "¡Bienvenido Administrador!",
          description: "Has iniciado sesión como administrador.",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate("/student-area");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First check if email exists in students table
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('email', email)
        .single();

      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (!studentData) {
        // If email is not in students table, create a prospect
        const { error: prospectError } = await supabase
          .from('prospects')
          .insert([
            {
              email,
              user_id: authData.user?.id,
              source: 'web_signup'
            }
          ]);

        if (prospectError) throw prospectError;
      }

      toast({
        title: "Registro exitoso",
        description: "Por favor verifica tu correo electrónico para completar el registro.",
      });
      setIsRegistering(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo completar el registro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Correo enviado",
        description: "Se ha enviado un enlace a tu correo para restablecer tu contraseña.",
      });
      setIsResettingPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el correo de restablecimiento",
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
          {isRegistering 
            ? "Registro" 
            : isResettingPassword 
              ? "Restablecer contraseña" 
              : "Iniciar sesión"
          }
        </h1>

        <form 
          onSubmit={
            isRegistering 
              ? handleRegister 
              : isResettingPassword 
                ? handlePasswordReset 
                : handleLogin
          } 
          className="space-y-4"
        >
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!isResettingPassword && (
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isRegistering 
              ? "Registrarse" 
              : isResettingPassword 
                ? "Enviar correo de restablecimiento" 
                : "Iniciar Sesión"
            }
          </Button>

          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              variant="link"
              className="text-sm text-white/70 hover:text-white"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setIsResettingPassword(false);
                setPassword("");
              }}
            >
              {isRegistering 
                ? "¿Ya tienes una cuenta? Inicia sesión" 
                : "¿No tienes una cuenta? Regístrate"
              }
            </Button>

            {!isRegistering && (
              <Button
                type="button"
                variant="link"
                className="text-sm text-white/70 hover:text-white"
                onClick={() => {
                  setIsResettingPassword(!isResettingPassword);
                  setIsRegistering(false);
                  setPassword("");
                }}
              >
                {isResettingPassword 
                  ? "Volver al inicio de sesión" 
                  : "¿Olvidaste tu contraseña?"
                }
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
