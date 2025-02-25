
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 text-center space-y-6 animate-fade-up">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <span className="px-6 py-2 bg-gray-800 inline-block text-sm font-medium text-white">
          FELIPE GRIZ
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient flex flex-col gap-1">
          <span>Creando</span>
          <span>Super Humanos</span>
          <span>A Través Del</span>
          <span>Crecimiento Personal</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-4xl mx-auto pt-2 whitespace-nowrap">
          Aprende la mentalidad y las mejores estrategias de las mentes más brillantes del mundo
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
