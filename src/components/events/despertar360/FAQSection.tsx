
export const FAQSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        PREGUNTAS FRECUENTES
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-primary mb-2">
            ¿Es este evento para mí?
          </h3>
          <p className="text-gray-600">
            Si estás buscando una transformación profunda y estás dispuesto a hacer el trabajo 
            interior necesario, definitivamente este evento es para ti.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-primary mb-2">
            ¿Necesito experiencia previa?
          </h3>
          <p className="text-gray-600">
            No, el programa está diseñado para funcionar sin importar tu nivel de experiencia 
            en desarrollo personal.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-primary mb-2">
            ¿Qué pasa si no puedo asistir?
          </h3>
          <p className="text-gray-600">
            Tienes hasta 7 días antes del evento para transferir tu entrada a otra fecha o 
            persona sin costo adicional.
          </p>
        </div>
      </div>
    </div>
  );
};
