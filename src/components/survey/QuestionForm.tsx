
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "./types";
import { useNavigate } from "react-router-dom";

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
  isLoading,
}: QuestionFormProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLastQuestion) {
      onNext(); // This will submit the form
      navigate('/courses/octava-area');
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-4 max-w-full">
      <h3 className="text-lg font-medium mb-4 break-words">{question.text}</h3>
      <RadioGroup
        value={value}
        onValueChange={onAnswerSelect}
        className="space-y-3"
      >
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        onClick={handleClick}
        disabled={!value || isLoading}
        className="w-full mt-4 whitespace-normal h-auto py-2 px-4 text-sm"
      >
        {isLoading ? (
          "Enviando..."
        ) : isLastQuestion ? (
          "¡FELICIDADES! Terminaste la encuesta! Dale click a este enlace para accesar al curso Online de LA OCTAVA AREA"
        ) : (
          "Siguiente"
        )}
      </Button>
    </div>
  );
};
