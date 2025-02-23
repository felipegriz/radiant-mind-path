
import { motion } from "framer-motion";

export const StorySection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            DE ESTAR AL BORDE DEL COLAPSO A DESCUBRIR MI VERDADERO PROPÓSITO
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-4">
              Hace años, me encontraba exactamente donde tú podrías estar ahora. Trabajaba sin parar, 
              intentando mantener el control de mi vida, pero por dentro sentía un vacío inexplicable...
            </p>
            <p className="mb-4">
              Fue entonces cuando descubrí el método que cambiaría mi vida para siempre. Una técnica tan 
              poderosa que transformó completamente mi realidad en cuestión de semanas.
            </p>
            <p className="mb-4 font-semibold">
              Hoy, después de haber ayudado a más de 10,000 personas a transformar sus vidas, he 
              perfeccionado este método y estoy listo para compartirlo contigo.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
