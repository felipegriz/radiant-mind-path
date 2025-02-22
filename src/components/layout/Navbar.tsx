
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const programas = [
  "ACCIONADORES",
  "ACTITUD DE PLENITUD",
  "INFO-EMPRENDIMIENTO",
  "AI MASTERY"
];

const eventosInmersion = [
  { name: "DESPERTAR 360", path: "/events/despertar-360" },
  { name: "CITA CON LO IMPOSIBLE", path: "/events/cita-con-lo-imposible" },
  { name: "MISSION MASTERY", path: "/events/mission-mastery" }
];

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white whitespace-nowrap">FELIPE GRIZ</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Inicio
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium inline-flex items-center flex-col leading-tight">
                <span className="whitespace-nowrap">Eventos de</span>
                <span className="whitespace-nowrap flex items-center">Inmersión <ChevronDown className="ml-1 h-4 w-4" /></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border border-white/10">
                {eventosInmersion.map((evento) => (
                  <Link
                    key={evento.name}
                    to={evento.path}
                    className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer block px-4 py-2"
                  >
                    {evento.name}
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium inline-flex items-center">
                Programas <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border border-white/10">
                {programas.map((programa) => (
                  <DropdownMenuItem
                    key={programa}
                    className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    {programa}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/coaching-consultoria" 
              className="bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-md text-sm font-medium"
            >
              Coaching y Consultoría
            </Link>

            <Link 
              to="/student-area" 
              className="bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-md text-sm font-medium"
            >
              Área de Estudiantes
            </Link>

            <Link to="/grey-training" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              GREY TRAINING ACADEMY
            </Link>

            <Link to="/cursos-gratis" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Cursos Gratis
            </Link>

            <Link to="/sobre-mi" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Sobre Mí
            </Link>

            <Link to="/contacto" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Contacto
            </Link>
          </div>
          <button className="bg-accent hover:bg-accent/80 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
            Comienza Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
