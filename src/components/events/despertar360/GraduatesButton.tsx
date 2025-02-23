
import { Button } from "@/components/ui/button";

interface GraduatesButtonProps {
  onNavigate: () => void;
}

export const GraduatesButton = ({ onNavigate }: GraduatesButtonProps) => {
  return (
    <div className="absolute top-24 right-4 z-10">
      <Button 
        variant="secondary"
        onClick={onNavigate}
        className="shadow-lg"
      >
        Acceder al Área de Graduados
      </Button>
    </div>
  );
};
