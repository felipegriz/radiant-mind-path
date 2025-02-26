
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuthForm = () => {
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
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('email', email)
        .single();

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (!studentData) {
        const { error: prospectError } = await supabase
          .from('prospects')
          .insert([{
            email,
            user_id: authData.user?.id,
            source: 'web_signup'
          }]);

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
      if (!email.trim()) {
        throw new Error("Por favor ingresa tu correo electrónico");
      }

      // Usar la URL de producción para el reseteo de contraseña
      const resetUrl = 'https://felipegriz.com/auth/reset-password';

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: resetUrl
      });

      if (error) throw error;

      toast({
        title: "Correo enviado",
        description: "Se ha enviado un enlace a tu correo para restablecer tu contraseña.",
      });
      
      setEmail("");
      setPassword("");
      setIsResettingPassword(false);
    } catch (error: any) {
      console.error("Error en reseteo de contraseña:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el correo de restablecimiento",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    isResettingPassword,
    setIsResettingPassword,
    isRegistering,
    setIsRegistering,
    handleLogin,
    handleRegister,
    handlePasswordReset,
  };
};
