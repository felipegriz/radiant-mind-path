
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InitialFormProps {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

export const InitialForm = ({ formData, onInputChange, onContinue }: InitialFormProps) => {
  return (
    <>
      <Input
        placeholder="Tu nombre"
        name="name"
        value={formData.name}
        onChange={onInputChange}
      />
      <Input
        type="email"
        placeholder="Tu correo electrónico"
        name="email"
        value={formData.email}
        onChange={onInputChange}
      />
      <Input
        placeholder="Tu WhatsApp (incluye código de país)"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={onInputChange}
      />
      <Button 
        onClick={onContinue}
        disabled={!formData.name || !formData.email || !formData.whatsapp}
        className="w-full"
      >
        Continuar
      </Button>
    </>
  );
};
