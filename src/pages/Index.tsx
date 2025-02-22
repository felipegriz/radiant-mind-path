
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
      {/* Navigation Bar */}
      <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-white">FELIPE GRIZ</span>
            <div className="hidden md:flex space-x-1">
              {[
                "Inicio",
                "Programas",
                "Eventos",
                "Recursos",
                "Blog",
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

      <div className="hero-gradient py-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center space-y-8 animate-fade-up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-6 py-2 bg-white/10 inline-block rounded-full text-sm font-medium text-white mb-6">
              FELIPE GRIZ
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient mb-6">
              Transformando Vidas a Través del
              <br /> Desarrollo Personal
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
              <feature.icon className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
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
