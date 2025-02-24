
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
    whatsapp: "",
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
        title: "¡Gracias por tu interés!",
        description: "Te enviaremos el acceso al curso gratuitamente.",
      });
      
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/80 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
          Comienza Ahora
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">¡Quiero darte el mejor regalo!</DialogTitle>
            <DialogDescription className="text-base mt-4">
              Para poder transformarte de la manera más rápida posible necesito conocerte un poco mejor para poder personalizar la información al nivel que estás actualmente y lo que necesitas para llegar al siguiente nivel para lo cual he diseñado una pequeña encuesta y a cambio de que la llenes te quiero regalar mi mejor curso online.
              <br /><br />
              Me tomó 15 años de carrera en el crecimiento personal para darme cuenta que existe una octava área de la vida y que además es la más poderosa porque influye todas las demás.
              <br /><br />
              Me tomó 15 años y cientos de miles de dólares en información descubrirla y te la quiero regalar para que impacte tu vida tanto como impactó la mía.
              <br /><br />
              Déjame tu correo y WhatsApp para hacerte llegar el acceso a este curso de manera gratuita.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
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
            <Input
              placeholder="Tu WhatsApp (incluye código de país)"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !formData.name || !formData.email || !formData.whatsapp}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "¡Quiero mi regalo!"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetSurvey;
