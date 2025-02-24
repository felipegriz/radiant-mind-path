
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const LeadMagnetSurvey = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    challenge: "",
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Aquí puedes agregar la lógica para enviar los datos a tu CRM o base de datos
      console.log("Form submitted:", formData);
      
      toast({
        title: "¡Gracias por compartir tu información!",
        description: "Te enviaremos recursos valiosos a tu correo electrónico.",
      });
      
      setOpen(false);
      setStep(1);
      setFormData({
        name: "",
        email: "",
        goal: "",
        challenge: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tus respuestas. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>¡Descubre Tu Potencial!</DialogTitle>
              <DialogDescription>
                Comienza tu viaje hacia el éxito respondiendo estas preguntas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Tu nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Button 
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email}
              >
                Siguiente
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>¡Estamos casi listos!</DialogTitle>
              <DialogDescription>
                Cuéntanos un poco más sobre tus objetivos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="¿Cuál es tu principal objetivo profesional?"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
              />
              <Input
                placeholder="¿Cuál es tu mayor desafío actual?"
                name="challenge"
                value={formData.challenge}
                onChange={handleInputChange}
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Anterior
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.goal || !formData.challenge}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/80 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
          Comienza Ahora
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetSurvey;
