
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Flame, Brain, Smartphone, Sparkles, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import xprendeteHero from "@/assets/xprendete-hero.jpeg";

const features = [
  { icon: Brain, text: "Mentalidad Imparable" },
  { icon: Smartphone, text: "Más Negocios Digitales" },
  { icon: Sparkles, text: "Más Inteligencia Artificial" },
  { icon: Users, text: "Más Todo en Marca Personal" },
  { icon: TrendingUp, text: "La Metodología #1 en Ventas del Mundo" },
];

const Xprendete = () => {
  return (
    <div className="min-h-screen bg-[#1a1008]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={xprendeteHero}
            alt="XPRÉNDETE"
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1008]/60 via-[#1a1008]/40 to-[#1a1008]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center py-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#c9a84c] uppercase tracking-[0.3em] text-sm md:text-base mb-4"
          >
            Por primera vez en Bogotá
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <CalendarDays className="w-5 h-5 text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-lg md:text-xl font-bold tracking-wider">
              MARZO 6 AL 8
            </span>
            <span className="text-[#c9a84c]/60 mx-2">|</span>
            <MapPin className="w-5 h-5 text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-lg md:text-xl font-bold tracking-wider">
              BOGOTÁ
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 uppercase tracking-widest text-sm mb-2"
          >
            Seminario de alto impacto:
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase mb-4"
            style={{
              background: "linear-gradient(180deg, #f5d780 0%, #c9a84c 40%, #8b6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 60px rgba(201, 168, 76, 0.3)",
            }}
          >
            XPRÉNDETE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 tracking-wide mb-10"
          >
            CÓMO GANAR EL JUEGO DEL DINERO
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#c9a84c] to-[#f5d780] text-[#1a1008] hover:from-[#f5d780] hover:to-[#c9a84c] text-lg px-10 py-7 rounded-full font-bold shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.6)]"
            >
              Reserva Tu Lugar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1008] via-[#2a1a0a] to-[#1a1008]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Flame className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              ¿Qué vas a aprender?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Un seminario diseñado para darte las herramientas que necesitas para dominar el juego del dinero
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-[#c9a84c]/20 rounded-xl p-6 text-center hover:border-[#c9a84c]/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Felipe Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#1a1008]" />
        <div className="container relative z-10 mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black uppercase mb-8"
              style={{
                background: "linear-gradient(180deg, #f5d780 0%, #c9a84c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Felipe Griz
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Coach, Consultor y Conferencista Internacional.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Experto en Crecimiento Personal y Comportamiento Humano, con dos décadas de experiencia impactando miles de personas en Latinoamérica, España y Estados Unidos.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Y discípulo principal de <span className="text-[#c9a84c] font-bold">Tony Robbins</span> en habla hispana con más de 50 eventos de formación con él y de coaching privado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/10 to-[#1a1008]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              ¿Estás listo para ganar el juego del dinero?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Bogotá · Marzo 6 al 8 · Cupos limitados
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#c9a84c] to-[#f5d780] text-[#1a1008] hover:from-[#f5d780] hover:to-[#c9a84c] text-lg px-10 py-7 rounded-full font-bold shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.6)]"
            >
              Reserva Tu Lugar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Xprendete;
