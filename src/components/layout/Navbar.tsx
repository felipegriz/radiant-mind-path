import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import LeadMagnetSurvey from "../survey/LeadMagnetSurvey";

const programas = [
  "ACCIONADORES",
  "ACTITUD DE PLENITUD",
  "INFO-EMPRENDIMIENTO",
  "AI MASTERY"
];

const eventosInmersion = [
  { name: "WAKE UP TONY 2025", path: "/events/wake-up-tony-2025" },
  { name: "CÓDIGOS DE LIBERTAD", path: "/events/codigos-de-libertad" },
  { name: "DESPERTAR 360", path: "/events/despertar-360" },
  { name: "CITA CON LO IMPOSIBLE", path: "/events/cita-con-lo-imposible" },
  { name: "MISSION MASTERY", path: "/events/mission-mastery" }
];

const coachingOptions = [
  { name: "SÚPER HUMANO", path: "/coaching-consultoria/super-humano" },
  { name: "SILVER PARTNERSHIP", path: "/coaching-consultoria/silver-partnership" },
  { name: "GREY PLATINUM", path: "/coaching-consultoria/grey-platinum" }
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white whitespace-nowrap">FELIPE GRIZ</Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Abrir menú"
                  className="p-2 text-white hover:bg-white/10 rounded-md"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 text-white w-[85%] sm:w-[360px] overflow-y-auto">
                <div className="flex flex-col gap-2 mt-8">
                  <Link to="/" onClick={closeMobile} className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium">
                    Inicio
                  </Link>

                  <div onClick={closeMobile}>
                    <LeadMagnetSurvey />
                  </div>

                  <Link to="/sobre-mi" onClick={closeMobile} className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium">
                    Sobre Mí
                  </Link>

                  <Link to="/cursos-gratis" onClick={closeMobile} className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium">
                    Cursos Gratis
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="eventos" className="border-white/10">
                      <AccordionTrigger className="px-3 text-gray-200 hover:text-white text-base font-medium">
                        Eventos de Inmersión
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {eventosInmersion.map((evento) => (
                            <Link
                              key={evento.name}
                              to={evento.path}
                              onClick={closeMobile}
                              className="px-5 py-2 text-gray-300 hover:text-white hover:bg-white/5 text-sm"
                            >
                              {evento.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="programas" className="border-white/10">
                      <AccordionTrigger className="px-3 text-gray-200 hover:text-white text-base font-medium">
                        Programas Online en vivo
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {programas.map((programa) => (
                            <span
                              key={programa}
                              className="px-5 py-2 text-gray-300 text-sm"
                            >
                              {programa}
                            </span>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="coaching" className="border-white/10">
                      <AccordionTrigger className="px-3 text-gray-200 hover:text-white text-base font-medium">
                        Coaching & Consultoría
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {coachingOptions.map((option) => (
                            <Link
                              key={option.name}
                              to={option.path}
                              onClick={closeMobile}
                              className="px-5 py-2 text-gray-300 hover:text-white hover:bg-white/5 text-sm"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link to="/student-area" onClick={closeMobile} className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium">
                    Área de Estudiantes
                  </Link>

                  <a
                    href="https://www.greytrainingacademy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium"
                  >
                    GREY TRAINING ACADEMY
                  </a>

                  <Link to="/contacto" onClick={closeMobile} className="px-3 py-3 text-gray-200 hover:bg-white/5 rounded-md text-base font-medium">
                    Contacto
                  </Link>

                  <Link to="/terminos-y-condiciones" onClick={closeMobile} className="px-3 py-3 text-gray-300 hover:bg-white/5 rounded-md text-sm">
                    Términos y Condiciones
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Inicio
            </Link>

            <LeadMagnetSurvey />

            <Link to="/sobre-mi" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Sobre Mí
            </Link>

            <Link to="/cursos-gratis" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Cursos Gratis
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
              <DropdownMenuTrigger className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium inline-flex items-center flex-col leading-tight">
                <span className="whitespace-nowrap">Programas Online</span>
                <span className="whitespace-nowrap flex items-center">en vivo <ChevronDown className="ml-1 h-4 w-4" /></span>
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

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-md text-sm font-medium inline-flex items-center">
                COACHING & CONSULTORÍA <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border border-white/10">
                {coachingOptions.map((option) => (
                  <Link
                    key={option.name}
                    to={option.path}
                    className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer block px-4 py-2"
                  >
                    {option.name}
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/student-area" 
              className="bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-colors rounded-md text-sm font-medium"
            >
              Área de Estudiantes
            </Link>

            <a 
              href="https://www.greytrainingacademy.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium"
            >
              GREY TRAINING ACADEMY
            </a>

            <Link to="/contacto" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Contacto
            </Link>

            <Link to="/terminos-y-condiciones" className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
              Términos y Condiciones
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
