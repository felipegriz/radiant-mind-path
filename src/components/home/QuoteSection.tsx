
import { motion } from "framer-motion";

const QuoteSection = () => {
  return (
    <section className="text-center max-w-4xl mx-auto my-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <blockquote className="text-3xl md:text-4xl font-medium text-white italic">
          "Vinimos a este mundo a Crecer, a experimentar y a vivir en libertad, compartiendo nuestra pasión con el mundo y sirviendo a otros. Con la mentalidad correcta vas a encontrar siempre que ante toda dualidad, ante todo blanco y negro, siempre hay un gris, una verdad mas elevada que te libera y que te lleva a crecer. Y cuando ese gris sirve a la mayor cantidad de los seres humanos y al planeta, se convierte en una digna meta"
        </blockquote>
        <p className="mt-6 text-gray-300 text-5xl font-bold">-FELIPE GRIZ</p>
      </motion.div>
    </section>
  );
};

export default QuoteSection;
