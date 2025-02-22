
import { motion } from "framer-motion";
import { Brain, Target, Heart, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const programas = [
    "ACCIONADORES",
    "ACTITUD DE PLENITUD",
    "INFO-EMPRENDIMIENTO",
    "AI MASTERY"
  ];

  const eventosInmersion = [
    "DESPERTAR 360",
    "CITA CON LO IMPOSIBLE",
    "MISSION MASTERY"
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Navigation Bar */}
      <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-white whitespace-nowrap">FELIPE GRIZ</span>
            <div className="hidden md:flex items-center space-x-1">
              <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium">
                Inicio
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium inline-flex items-center flex-col leading-tight">
                  <span className="whitespace-nowrap">Eventos de</span>
                  <span className="whitespace-nowrap flex items-center">Inmersión <ChevronDown className="ml-1 h-4 w-4" /></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur-sm border border-white/10">
                  {eventosInmersion.map((evento) => (
                    <DropdownMenuItem
                      key={evento}
                      className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      {evento}
                    </DropdownMenuItem>
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

              {[
                "Recursos",
                "Cursos Gratis",
                "Sobre Mí",
                "Contacto"
              ].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="bg-accent hover:bg-accent/80 transition-colors text-white px-6 py-2 rounded-full text-sm font-medium">
              Comienza Ahora
            </button>
          </div>
        </div>
      </nav>

      <div className="hero-gradient pt-12 pb-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center space-y-6 animate-fade-up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="px-6 py-2 bg-gray-800 inline-block rounded-full text-sm font-medium text-white">
              FELIPE GRIZ
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient flex flex-col gap-1">
              <span>Creando</span>
              <span>Super Humanos</span>
              <span>A Través Del</span>
              <span>Crecimiento Personal</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto pt-2">
              Aprende la mentalidad y las mejores estrategias de las mentes más brillantes del mundo
            </p>
          </motion.div>
        </section>
      </div>

      <div className="container mx-auto px-4 -mt-40">
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "SEMINARIOS DE INMERSIÓN",
              description: "Formato de alto impacto que garantiza la retención de la información y tu transformación",
            },
            {
              icon: Target,
              title: "RE-CONDICIONAMIENTO MENTAL",
              description: "Aprende a reprogramar tu mente para cambiar tu vida para siempre",
            },
            {
              icon: Heart,
              title: "MENTORÍA & COACHING AVANZADO",
              description: "Trabaja de la mano de uno de los Top 10 Coaches de habla hispana para transformar tu vida y tu negocio",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              <feature.icon className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-semibold mb-5 text-white">{feature.title}</h3>
              <p className="text-[#C8C8C9]">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Quote Section */}
        <section className="text-center max-w-4xl mx-auto my-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-3xl md:text-4xl font-medium text-white italic">
              "El éxito no es un destino, es un viaje constante de crecimiento y superación personal."
            </blockquote>
            <p className="mt-6 text-gray-300 text-xl">Felipe Griz</p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
