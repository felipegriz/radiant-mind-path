
import { motion } from "framer-motion";
import { Brain, Target, Map } from "lucide-react";

const features = [
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
    icon: Map,
    title: "MENTORÍA & COACHING AVANZADO",
    description: "Trabaja de la mano de uno de los Top 10 Coaches de habla hispana para transformar tu vida y tu negocio",
  },
];

const FeaturesSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="container mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
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
  );
};

export default FeaturesSection;
