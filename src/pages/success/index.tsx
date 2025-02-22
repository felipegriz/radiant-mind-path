
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí podrías implementar la lógica para actualizar el estado del usuario
    // por ejemplo, marcar que ha pagado por el evento
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8"
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">¡Pago Exitoso!</h1>
        <p className="text-xl text-gray-300 mb-8">
          Tu reserva para Despertar 360 ha sido confirmada.
        </p>
        <Button
          onClick={() => navigate('/events/despertar-360')}
          className="bg-accent hover:bg-accent/80 text-background px-6 py-3 rounded-full font-bold"
        >
          Volver al Evento
        </Button>
      </motion.div>
    </div>
  );
};

export default Success;
