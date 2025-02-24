
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  isRegistering: boolean;
  isResettingPassword: boolean;
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onToggleRegister: () => void;
  onTogglePasswordReset: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isRegistering,
  isResettingPassword,
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleRegister,
  onTogglePasswordReset,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>

      {!isResettingPassword && (
        <div>
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={onPasswordChange}
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
          onClick={onToggleRegister}
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
            onClick={onTogglePasswordReset}
          >
            {isResettingPassword 
              ? "Volver al inicio de sesión" 
              : "¿Olvidaste tu contraseña?"
            }
          </Button>
        )}
      </div>
    </form>
  );
};
