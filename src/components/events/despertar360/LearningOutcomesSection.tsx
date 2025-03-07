
import { motion } from "framer-motion";

export const LearningOutcomesSection = () => {
  return (
    <div className="bg-white/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">¿Qué aprenderás en DESPERTAR 360°?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Reprogramación Mental</h3>
              <p className="text-gray-600">Técnicas avanzadas para eliminar creencias limitantes y patrones saboteadores.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Expansión de Consciencia</h3>
              <p className="text-gray-600">Métodos prácticos para elevar tu nivel de consciencia y conectar con estados superiores.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Manifestación Consciente</h3>
              <p className="text-gray-600">Aprende a utilizar las leyes universales para manifestar la vida que deseas.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Liberación Emocional</h3>
              <p className="text-gray-600">Herramientas para liberar traumas, miedos y bloqueos emocionales.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Propósito de Vida</h3>
              <p className="text-gray-600">Descubre tu verdadera misión y propósito, alineando tu vida con tu esencia.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">Relación con el Dinero</h3>
              <p className="text-gray-600">Transforma tu relación con la abundancia y elimina los bloqueos financieros.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
