
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const Contacto = () => {
  const whatsappNumber = "17869925648";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Contáctanos</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-gray-300" />
                  <span className="text-gray-300">+1 (786) 992-5648</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-gray-300" />
                  <span className="text-gray-300">contacto@felipegriz.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-gray-300" />
                  <span className="text-gray-300">Miami, Florida</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Contacto Directo</h2>
              <p className="text-gray-300 mb-6">
                ¿Tienes alguna pregunta? No dudes en contactarme directamente a través de WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-full transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacto;
