
import { motion } from "framer-motion";
import { Brain, Target, Heart } from "lucide-react";

const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-up">
          <span className="px-4 py-2 bg-accent inline-block rounded-full text-sm font-medium text-secondary-foreground">
            Bienvenido a Tu Viaje
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
            Transforma Tu Vida a Través del
            <br /> Desarrollo Personal
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Descubre las herramientas, conocimientos y guía que necesitas para liberar tu máximo potencial y crear cambios positivos duraderos.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 pt-8">
          {[
            {
              icon: Brain,
              title: "Crecimiento Consciente",
              description: "Desarrolla una mayor autoconciencia e inteligencia emocional a través de prácticas guiadas.",
            },
            {
              icon: Target,
              title: "Logro de Objetivos",
              description: "Establece metas significativas y crea planes de acción para alcanzar tu máximo potencial.",
            },
            {
              icon: Heart,
              title: "Bienestar Personal",
              description: "Equilibra tu bienestar físico, mental y emocional para una vida óptima.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Quote Section */}
        <section className="text-center max-w-4xl mx-auto">
          <blockquote className="text-2xl font-medium text-primary italic">
            "La única persona en la que estás destinado a convertirte es la persona que decides ser."
          </blockquote>
          <p className="mt-4 text-secondary">Ralph Waldo Emerson</p>
        </section>
      </div>
    </div>
  );
};

export default Index;
