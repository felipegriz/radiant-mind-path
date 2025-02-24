
import { motion } from "framer-motion";
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
  );
};

export default Login;
