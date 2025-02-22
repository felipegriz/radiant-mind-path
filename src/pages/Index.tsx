
import { motion } from "framer-motion";
import { Brain, Target, Heart } from "lucide-react";

const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="hero-gradient py-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center space-y-8 animate-fade-up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-6 py-2 bg-white/10 inline-block rounded-full text-sm font-medium text-primary mb-6">
              FELIPE GRIZ
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient mb-6">
              Transformando Vidas a Través del
              <br /> Desarrollo Personal
            </h1>
            <p className="text-xl text-primary/90 max-w-3xl mx-auto">
              Te acompaño en el camino hacia tu mejor versión, con herramientas y estrategias probadas para alcanzar tu máximo potencial.
            </p>
          </motion.div>
        </section>
      </div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 pt-8">
          {[
            {
              icon: Brain,
              title: "Mentalidad de Éxito",
              description: "Desarrolla una mentalidad ganadora y supera las barreras mentales que te limitan.",
            },
            {
              icon: Target,
              title: "Estrategias de Alto Impacto",
              description: "Aprende técnicas comprobadas para alcanzar tus metas y transformar tu realidad.",
            },
            {
              icon: Heart,
              title: "Desarrollo Integral",
              description: "Optimiza todas las áreas de tu vida para lograr un crecimiento completo y duradero.",
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
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
              <p className="text-primary/80">{feature.description}</p>
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
            <blockquote className="text-3xl md:text-4xl font-medium text-primary italic">
              "El éxito no es un destino, es un viaje constante de crecimiento y superación personal."
            </blockquote>
            <p className="mt-6 text-primary/80 text-xl">Felipe Griz</p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
