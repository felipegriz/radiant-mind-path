
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type UserLevel = "Bronce" | "Plata" | "Oro" | "Diamante" | "Platino" | "Grey Platinum";

interface Question {
  id: number;
  text: string;
  type: "income" | "text" | "radio";
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cuáles son tus ingresos mensuales actuales?",
    type: "radio",
    options: [
      "Menos de $1,000",
      "$1,000 - $3,000",
      "$3,000 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $15,000",
      "Más de $15,000"
    ]
  },
  {
    id: 2,
    text: "¿A qué te dedicas?",
    type: "radio",
    options: [
      "Empresari@ consciente",
      "Empresari@",
      "Emprendedor tradicional",
      "Emprendedor digital",
      "Experto/Info-emprendedor",
      "Conferencista",
      "Coach",
      "Vendedor",
      "Networker",
      "Marketing de afiliados",
      "Emplead@",
      "Desemplead@",
      "Fuera del mercado/retirad@",
      "Otros"
    ]
  }
];

const calculateUserLevel = (income: string): UserLevel => {
  if (income === "Menos de $1,000") return "Bronce";
  if (income === "$1,000 - $3,000") return "Plata";
  if (income === "$3,000 - $5,000") return "Oro";
  if (income === "$5,000 - $10,000") return "Diamante";
  if (income === "$10,000 - $15,000") return "Platino";
  return "Grey Platinum";
};

const LeadMagnetSurvey = () => {
  const [step, setStep] = useState(0); // 0 for initial form, 1+ for questions
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnswerSelect = (value: string) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [step]: value
    }));
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const userLevel = calculateUserLevel(surveyAnswers[1] || "");
      const submissionData = {
        ...formData,
        answers: surveyAnswers,
        level: userLevel,
      };
      
      console.log("Form submitted:", submissionData);
      
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
      setSurveyAnswers({});
      setStep(0);
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

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "radio":
        return (
          <RadioGroup 
            value={surveyAnswers[question.id]} 
            onValueChange={(value) => handleAnswerSelect(value)}
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return <Input onChange={(e) => handleAnswerSelect(e.target.value)} />;
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
              Para poder transformarte de manera más rápida necesito conocerte un poco mejor para poder personalizar la información al nivel en el que estás actualmente y a lo que necesitas aprender para llegar al siguiente nivel, para lo cual he diseñado una pequeña encuesta y a cambio de que la llenes te quiero regalar mi mejor Curso online!
              <br /><br />
              Me tomó 15 años de carrera en el crecimiento personal y cientos de miles de dólares invertidos darme cuenta que existe una octava área de la vida y que además es la más poderosa porque influye todas las demás, pero nadie la utiliza de manera correcta!
              <br /><br />
              Este curso se llama LA OCTAVA ÁREA y apenas completes esta pequeña encuesta tendrás acceso inmediato al curso. ¿Tenemos un trato?
              <br /><br />
              Acá está la encuesta :)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {step === 0 ? (
              <>
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
                  onClick={() => setStep(1)}
                  disabled={!formData.name || !formData.email || !formData.whatsapp}
                  className="w-full"
                >
                  Continuar
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">
                    {questions[step - 1]?.text}
                  </h3>
                  {questions[step - 1] && renderQuestion(questions[step - 1])}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={isLoading || !surveyAnswers[step]}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : step === questions.length ? (
                    "¡Quiero mi regalo!"
                  ) : (
                    "Siguiente"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetSurvey;
