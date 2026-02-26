
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const seminars = [
  {
    title: "CÓDIGOS DE LIBERTAD",
    description: "Descubre los códigos que te permitirán liberar tu máximo potencial y romper las cadenas que te limitan.",
    path: "/events/codigos-de-libertad",
    available: false,
  },
  {
    title: "DESPERTAR 360°",
    description: "Una experiencia inmersiva de transformación total que despierta tu poder interior en todas las áreas de tu vida.",
    path: "/events/despertar-360",
    available: true,
  },
  {
    title: "XPRÉNDETE",
    description: "Un seminario diseñado para sorprenderte y sacarte de tu zona de confort hacia resultados extraordinarios.",
    path: "/events/xprendete",
    available: false,
  },
  {
    title: "CITA CON LO IMPOSIBLE",
    description: "Atrévete a ir más allá de lo que crees posible. Un evento que redefine tus límites.",
    path: "/events/cita-con-lo-imposible",
    available: true,
  },
  {
    title: "MISSION MASTERY",
    description: "Domina tu misión de vida y conviértela en un legado de impacto y trascendencia.",
    path: "/events/mission-mastery",
    available: true,
  },
];

type CalendarEvent = {
  title: string;
  dates: string;
  location?: string;
  color: string;
};

type CalendarMonth = {
  month: string;
  events: CalendarEvent[];
};

const calendar: CalendarMonth[] = [
  {
    month: "MARZO",
    events: [
      { title: "XPRÉNDETE", dates: "6 – 8 marzo", color: "bg-purple-500" },
      { title: "Códigos de Libertad", dates: "26 marzo", location: "Bogotá", color: "bg-blue-500" },
    ],
  },
  {
    month: "ABRIL",
    events: [
      { title: "AYA RETREAT", dates: "9 – 13 abril", location: "Tulum", color: "bg-emerald-500" },
      { title: "Despertar 360°", dates: "17 – 19 abril", location: "Bogotá", color: "bg-red-500" },
    ],
  },
  {
    month: "MAYO",
    events: [],
  },
  {
    month: "JUNIO",
    events: [
      { title: "Códigos de Libertad", dates: "4 junio", location: "Ciudad de México", color: "bg-blue-500" },
      { title: "Cita con lo Imposible", dates: "11 – 15 junio", location: "Cartagena", color: "bg-orange-500" },
    ],
  },
  {
    month: "JULIO",
    events: [
      { title: "Códigos de Libertad", dates: "11 julio", location: "Lima, Perú", color: "bg-blue-500" },
      { title: "Mindvalley University", dates: "22 julio – 2 agosto", color: "bg-cyan-500" },
    ],
  },
  {
    month: "AGOSTO",
    events: [
      { title: "Códigos de Libertad", dates: "8 agosto", location: "Ciudad de Panamá", color: "bg-blue-500" },
      { title: "Business Mastery – Tony Robbins", dates: "12 – 16 agosto", color: "bg-red-500" },
      { title: "Despertar 360° #2", dates: "28 – 30 agosto", location: "Bogotá", color: "bg-red-500" },
    ],
  },
  {
    month: "SEPTIEMBRE",
    events: [
      { title: "UPW – Tony Robbins", dates: "3 – 6 septiembre", location: "Colonia, Alemania", color: "bg-red-500" },
      { title: "Mission Mastery", dates: "24 – 28 septiembre", location: "Peñón", color: "bg-purple-500" },
    ],
  },
  {
    month: "OCTUBRE",
    events: [
      { title: "AYA RETREAT", dates: "8 – 12 octubre", location: "Cancún, México", color: "bg-emerald-500" },
      { title: "Despertar 360°", dates: "23 – 25 octubre", location: "Miami", color: "bg-red-500" },
    ],
  },
  {
    month: "NOVIEMBRE",
    events: [
      { title: "UPW Miami – Tony Robbins", dates: "5 – 8 noviembre", location: "Miami", color: "bg-red-500" },
      { title: "Cita con lo Imposible", dates: "20 – 22 noviembre", location: "Miami", color: "bg-orange-500" },
    ],
  },
  {
    month: "DICIEMBRE",
    events: [
      { title: "Date With Destiny – Tony Robbins", dates: "4 – 9 diciembre", location: "West Palm Beach", color: "bg-red-500" },
      { title: "AYA RETREAT", dates: "17 – 21 diciembre", color: "bg-emerald-500" },
    ],
  },
];

const Seminarios = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 uppercase">
            Seminarios de Inmersión
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Formato de alto impacto que garantiza la retención de la información y tu transformación
          </p>
        </motion.div>

        {/* Seminars list */}
        <div className="grid gap-6 max-w-4xl mx-auto mb-24">
          {seminars.map((seminar, index) => (
            <motion.div
              key={seminar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-lift ${seminar.available ? "cursor-pointer" : ""}`}
              onClick={() => seminar.available && navigate(seminar.path)}
            >
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {seminar.title}
                </h2>
                <p className="text-muted-foreground">{seminar.description}</p>
              </div>
              <Button
                variant={seminar.available ? "default" : "secondary"}
                className="rounded-full shrink-0"
                disabled={!seminar.available}
                onClick={(e) => {
                  e.stopPropagation();
                  if (seminar.available) navigate(seminar.path);
                }}
              >
                {seminar.available ? (
                  <>
                    Ver más <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Próximamente"
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-10 justify-center">
            <CalendarDays className="w-8 h-8 text-foreground" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground uppercase">
              Calendario 2026
            </h2>
          </div>

          <div className="space-y-8">
            {calendar.map((month, mIndex) => (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: mIndex * 0.08 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-muted-foreground mb-3 tracking-widest">
                  {month.month}
                </h3>

                {month.events.length === 0 ? (
                  <p className="text-muted-foreground/60 italic pl-4 border-l-2 border-border">
                    Sin eventos presenciales
                  </p>
                ) : (
                  <div className="grid gap-3">
                    {month.events.map((event) => (
                      <div
                        key={event.title + event.dates}
                        className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        <div className={`w-3 h-3 rounded-full ${event.color} shrink-0 mt-1 sm:mt-0`} />
                        <div className="flex-1">
                          <span className="text-lg font-semibold text-foreground">
                            {event.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4" />
                            {event.dates}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Seminarios;
