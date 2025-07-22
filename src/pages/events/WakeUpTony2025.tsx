import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Target, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const WakeUpTony2025 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            WAKE UP TONY 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Un evento de transformación personal que despertará tu máximo potencial y te llevará al siguiente nivel
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span>Marzo 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-orange-400" />
              <span>3 días intensivos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>Por definir</span>
            </div>
          </div>
        </div>

        {/* What You'll Experience */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">¿Qué Experimentarás?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-400">
                  <Zap className="w-8 h-8" />
                  Despertar Mental
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Técnicas avanzadas para romper patrones limitantes y expandir tu mentalidad hacia el éxito ilimitado.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-400">
                  <Target className="w-8 h-8" />
                  Claridad de Propósito
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Descubre tu misión de vida y crea un plan de acción concreto para alcanzar tus metas más ambiciosas.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-400">
                  <Trophy className="w-8 h-8" />
                  Mentalidad de Campeón
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Desarrolla la mentalidad imparable de los grandes triunfadores y aprende a mantenerla bajo presión.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Highlights del Evento</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sesiones de Inmersión Total</h3>
                  <p className="text-gray-300">Experiencias transformadoras que te sacarán de tu zona de confort</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Networking de Alto Nivel</h3>
                  <p className="text-gray-300">Conecta con personas exitosas y ambiciosas como tú</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Técnicas Exclusivas</h3>
                  <p className="text-gray-300">Metodologías probadas para el desarrollo del máximo potencial</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mentoring Personalizado</h3>
                  <p className="text-gray-300">Atención directa y feedback personalizado durante el evento</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Material Exclusivo</h3>
                  <p className="text-gray-300">Recursos y herramientas para continuar tu transformación</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comunidad Exclusiva</h3>
                  <p className="text-gray-300">Acceso a la comunidad privada de participantes del evento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-orange-500/20 to-red-500/20 p-8 rounded-2xl border border-orange-500/30">
          <h2 className="text-3xl font-bold mb-4">¿Estás Listo Para Despertar?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Los cupos son limitados. No pierdas la oportunidad de transformar tu vida para siempre.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold">Solo 50 participantes</span>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-8 py-4 text-lg"
          >
            RESERVAR MI LUGAR
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Próximamente más detalles sobre fechas y ubicación
          </p>
        </div>
      </div>
    </div>
  );
};

export default WakeUpTony2025;