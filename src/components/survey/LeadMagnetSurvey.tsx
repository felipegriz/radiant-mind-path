
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
import { useToast } from "@/components/ui/use-toast";
import { questions } from "./types";
import { calculateUserLevel } from "./utils";
import { InitialForm } from "./InitialForm";
import { QuestionForm } from "./QuestionForm";

const LeadMagnetSurvey = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/80 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
          Comienza Ahora
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          {step === 0 && (
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
          )}
          <div className="space-y-4 mt-4">
            {step === 0 ? (
              <InitialForm 
                formData={formData}
                onInputChange={handleInputChange}
                onContinue={() => setStep(1)}
              />
            ) : (
              <QuestionForm 
                question={questions[step - 1]}
                value={surveyAnswers[step] || ""}
                onAnswerSelect={handleAnswerSelect}
                onNext={handleNext}
                isLastQuestion={step === questions.length}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetSurvey;
