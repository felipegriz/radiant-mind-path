
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuthForm } from "@/hooks/auth/use-auth-form";

const Login = () => {
  const {
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
  } = useAuthForm();

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="w-full max-w-md mx-auto flex items-center justify-between pt-2 pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm"
        >
          <Home className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
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
                : "Iniciar sesión"}
          </h1>

          <AuthForm
            isRegistering={isRegistering}
            isResettingPassword={isResettingPassword}
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={
              isRegistering
                ? handleRegister
                : isResettingPassword
                  ? handlePasswordReset
                  : handleLogin
            }
            onToggleRegister={() => {
              setIsRegistering(!isRegistering);
              setIsResettingPassword(false);
              setPassword("");
            }}
            onTogglePasswordReset={() => {
              setIsResettingPassword(!isResettingPassword);
              setIsRegistering(false);
              setPassword("");
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
