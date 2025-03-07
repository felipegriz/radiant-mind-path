
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EventSidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="lg:w-1/3 bg-white/10 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Sobre DESPERTAR 360°</h2>
      <p className="text-lg mb-4">
        DESPERTAR 360° es un evento transformador diseñado para ayudarte a alcanzar 
        tu máximo potencial a través de técnicas revolucionarias de reprogramación mental.
      </p>
      <p className="text-lg mb-4">
        En este video, Felipe Griz explica detalladamente la metodología y los beneficios 
        que obtendrás al participar en este evento único.
      </p>
      <Button 
        className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-semibold"
        onClick={() => navigate("/events/despertar-360")}
      >
        Ver detalles del evento
      </Button>
    </div>
  );
};
