
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Target } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const SobreMi = () => {
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase">Felipe Griz</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              COACH, CONSULTOR Y CONFERENCISTA INTERNACIONAL.
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              EXPERTO EN CRECIMIENTO PERSONAL Y COMPORTAMIENTO HUMANO, CON DOS DÉCADAS DE EXPERIENCIA IMPACTANDO MILES DE PERSONAS EN LATINOAMÉRICA, ESPAÑA Y ESTADOS UNIDOS.
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              Y DISCÍPULO PRINCIPAL DE TONY ROBBINS EN HABLA HISPANA CON MÁS DE 50 EVENTOS DE FORMACIÓN CON ÉL Y DE COACHING PRIVADO.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Mi Historia</h2>
              <p className="text-gray-300">
                Con más de una década de experiencia en el desarrollo personal y profesional, 
                me he dedicado a transformar la vida de miles de personas a través de programas 
                innovadores y metodologías probadas que combinan principios de psicología, 
                neurociencia y prácticas de alto rendimiento.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Mi Misión</h2>
              <p className="text-gray-300">
                Mi misión es empoderar a las personas para que alcancen su máximo potencial, 
                rompiendo las barreras mentales que les impiden lograr sus objetivos y 
                construyendo una mentalidad de abundancia y éxito.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <Users className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">+10,000</h3>
              <p className="text-gray-300">Vidas Impactadas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">+20</h3>
              <p className="text-gray-300">Programas Desarrollados</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <Award className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">+15</h3>
              <p className="text-gray-300">Años de Experiencia</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl text-center"
          >
            <Target className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">¿Listo para dar el siguiente paso?</h2>
            <p className="text-gray-300 mb-6">
              Descubre cómo puedo ayudarte a alcanzar tus metas y transformar tu vida
            </p>
            <button className="bg-accent hover:bg-accent/80 text-background px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Comienza Tu Transformación
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SobreMi;
