
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Question } from "./types";

interface QuestionFormProps {
  question: Question;
  value: string;
  onAnswerSelect: (value: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  isLoading: boolean;
}

export const QuestionForm = ({ 
  question, 
  value, 
  onAnswerSelect, 
  onNext, 
  isLastQuestion,
  isLoading 
}: QuestionFormProps) => {
  const renderQuestion = () => {
    switch (question.type) {
      case "radio":
        return (
          <RadioGroup 
            value={value} 
            onValueChange={onAnswerSelect}
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
        return <Input onChange={(e) => onAnswerSelect(e.target.value)} />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">
        {question.text}
      </h3>
      {renderQuestion()}
      <Button 
        onClick={onNext}
        disabled={isLoading || !value}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : isLastQuestion ? (
          "¡Quiero mi regalo!"
        ) : (
          "Siguiente"
        )}
      </Button>
    </div>
  );
};
