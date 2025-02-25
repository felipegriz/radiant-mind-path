
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface GraduatesButtonProps {
  onNavigate: () => void;
}

export const GraduatesButton = ({ onNavigate }: GraduatesButtonProps) => {
  return (
    <div className="fixed top-20 right-4 z-50">
      <Button 
        variant="secondary"
        onClick={onNavigate}
        className="shadow-xl bg-white/10 hover:bg-white/20 text-white gap-2"
      >
        <GraduationCap className="w-4 h-4" />
        Área de Graduados
      </Button>
    </div>
  );
};
