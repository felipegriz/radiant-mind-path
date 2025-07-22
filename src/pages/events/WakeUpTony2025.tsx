import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star, CheckCircle } from "lucide-react";
import wakeUpHeader from "@/assets/wake-up-header.jpg";
import speakersCollage from "@/assets/speakers-collage.jpg";
import dateLocationCard from "@/assets/date-location-card.jpg";

const WakeUpTony2025 = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const togglePackage = (packageName: string) => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };

  const testimonials = [
    {
      text: "Participar en Wake Up fue transformador. Los contactos que hice y las ideas que compartimos me ayudaron a darle un giro completo a mi negocio. Ahora tengo un socio estratégico gracias a este evento.",
      author: "Javier López"
    },
    {
      text: "Lo que más destaco de Wake Up es la energía que se siente al estar rodeado de emprendedores apasionados. Salí con una red de contactos que jamás habría imaginado.",
      author: "Andrés Gutiérrez"
    },
    {
      text: "Wake Up no es solo un evento, es un cambio de perspectiva. Los contactos que hice ahí están ayudándome a llevar mi empresa al siguiente nivel. Es una inversión que vale cada centavo.",
      author: "Gabriela Martínez"
    },
    {
      text: "Lo que más me impactó de Wake Up fue la calidad de las personas que conocí. Hacer networking nunca había sido tan fácil y efectivo. Me llevo grandes amigos y aliados estratégicos.",
      author: "Luis Rodríguez"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <a href="#tony" className="text-sm font-medium hover:text-purple-400 transition-colors">
                ¿Quién es Felipe Griz?
              </a>
              <a href="#mentes" className="text-sm font-medium hover:text-purple-400 transition-colors">
                MENTES MAESTRAS
              </a>
              <a href="#es" className="text-sm font-medium hover:text-purple-400 transition-colors">
                ¿ES WAKE UP CONFERENCES PARA MÍ?
              </a>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-6">
              QUIERO MI ENTRADA
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${wakeUpHeader})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-gray-900/70 to-black/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white mr-4 transform rotate-45"></div>
              <div className="w-8 h-8 bg-white mr-2 transform rotate-45"></div>
              <div className="w-6 h-6 bg-white transform rotate-45"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              WAKE UP
            </h1>
            <p className="text-2xl md:text-3xl font-light italic mb-2">
              CONFERENCES INTERNACIONAL 2025
            </p>
            <p className="text-lg md:text-xl text-cyan-400 font-medium">
              Con Felipe Griz
            </p>
          </div>

          <img 
            src={speakersCollage} 
            alt="Speakers" 
            className="mx-auto mb-8 rounded-lg max-w-4xl w-full"
          />

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>

          <div className="mt-12 flex justify-center">
            <img 
              src={dateLocationCard} 
              alt="03 y 04 de Octubre" 
              className="max-w-md w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Haz Posible lo Imposible */}
      <section className="py-20 bg-gradient-to-r from-purple-800/20 to-blue-800/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">haz posible</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">lo imposible</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            Felipe Griz tiene un mensaje directo para ti. Descubre por qué ser parte de Wake Up Conferences 
            y cómo puede marcar un antes y un después en tu vida y tus negocios.
          </p>
          
          <div className="text-4xl md:text-5xl font-bold mb-8">
            03 <span className="text-purple-400">y</span> 04 de Octubre
          </div>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Felipe Griz Section */}
      <section id="tony" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            FELIPE <span className="font-black">GRIZ</span>
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
            <p className="mb-6">
              <strong className="text-white">Felipe Griz</strong> es un mentor, emprendedor y conferencista internacional 
              reconocido por su enfoque en la <strong className="text-white">transformación personal y empresarial</strong>. 
              Es ampliamente reconocido por su metodología en <strong className="text-white">desarrollo de liderazgo</strong>, 
              estrategias de negocio y cambios organizacionales radicales.
            </p>
            <p>
              Felipe también es un emprendedor exitoso, escritor y <strong className="text-white">filántropo</strong>, 
              considerado uno de los principales estrategas de la vida y los negocios en Latinoamérica.
            </p>
          </div>
        </div>
      </section>

      {/* Dos Días de Alto Impacto */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">dos días</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">de alto impacto</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            Durante dos días completos, cargados de energía, más de 10,000 emprendedores conectarán 
            en un espacio único para interactuar con los líderes, empresarios y mentores que están 
            marcando la pauta y fortaleciendo el ecosistema empresarial en Latinoamérica.
          </p>

          {/* Image Gallery Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-400">Imagen del evento {i}</span>
              </div>
            ))}
          </div>

          <p className="text-xl mb-8">
            Aquí conectamos a LOS LÍDERES y LOS EMPRESARIOS más relevantes para crear 
            una comunidad transformadora bajo una misma visión:
          </p>
        </div>
      </section>

      {/* Cinco Mentes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            CINCO MENTES QUE TRANSFORMAN NEGOCIOS
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"].map((speaker, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 h-32 flex items-center justify-center">
                <span className="text-sm">{speaker}</span>
              </div>
            ))}
          </div>

          <p className="text-xl mb-8">El panel más influyente de Latinoamérica llega a Wake up conferences 2025</p>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Foundation Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">FOUNDATION</span></h3>
                <div className="text-3xl font-bold mb-6">USD $ 127</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría Foundation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>10 raciones de alimentos donados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  COMPRAR ENTRADA
                </Button>
              </CardContent>
            </Card>

            {/* Executive Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">EJECUTIVA</span></h3>
                <div className="text-3xl font-bold mb-6">USD $ 332</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría Ejecutiva</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo ZONA EJECUTIVA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>20 raciones de alimentos donados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  COMPRAR ENTRADA
                </Button>
              </CardContent>
            </Card>

            {/* Life Mastery Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">LIFE MASTERY</span></h3>
                <div className="text-3xl font-bold mb-6">USD $ 612</div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial categoría LIFE MASTERY</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Certificado digital de participación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona LIFE MASTERY</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>40 raciones de alimentos donados</span>
                  </li>
                </ul>
                
                <button 
                  onClick={() => togglePackage('life-mastery')}
                  className="flex items-center gap-2 text-purple-400 mb-4 hover:text-purple-300 transition-colors"
                >
                  Ver + Beneficios
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedPackage === 'life-mastery' ? 'rotate-180' : ''
                  }`} />
                </button>

                {expandedPackage === 'life-mastery' && (
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 Master class con Felipe Griz (virtual)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias por 30 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Traducción simultánea</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>10% de descuento en compras</span>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  COMPRAR ENTRADA
                </Button>
              </CardContent>
            </Card>

            {/* Platinum Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">PLATINUM</span></h3>
                <div className="text-3xl font-bold mb-6">USD $ 1060</div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial categoría PLATINUM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Certificado digital de participación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona PLATINUM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>80 raciones de alimentos donados</span>
                  </li>
                </ul>
                
                <button 
                  onClick={() => togglePackage('platinum')}
                  className="flex items-center gap-2 text-purple-400 mb-4 hover:text-purple-300 transition-colors"
                >
                  Ver + Beneficios
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedPackage === 'platinum' ? 'rotate-180' : ''
                  }`} />
                </button>

                {expandedPackage === 'platinum' && (
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master classes con Felipe Griz (virtual)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias por 60 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a networking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>10% de descuento en merch WUC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Felipe Griz</span>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  COMPRAR ENTRADA
                </Button>
              </CardContent>
            </Card>

            {/* Diamond Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">DIAMOND</span></h3>
                <div className="text-3xl font-bold mb-6">USD $ 1356</div>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial categoría DIAMOND</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona DIAMOND</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>100 raciones de alimentos donados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea</span>
                  </li>
                </ul>
                
                <button 
                  onClick={() => togglePackage('diamond')}
                  className="flex items-center gap-2 text-purple-400 mb-4 hover:text-purple-300 transition-colors"
                >
                  Ver + Beneficios
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    expandedPackage === 'diamond' ? 'rotate-180' : ''
                  }`} />
                </button>

                {expandedPackage === 'diamond' && (
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Certificado digital de participación</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master classes con Felipe Griz (virtual)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias por 120 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Almuerzo 2 días (3 y 4 de octubre)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a Coffee break</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a after party VIP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Networking entre empresarios LATAM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Felipe Griz</span>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  COMPRAR ENTRADA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentes Maestras Section */}
      <section id="mentes" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">mentes</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">maestras</h3>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            <strong className="text-white">Wake Up Conferences</strong> va más allá de un evento de crecimiento. 
            <strong className="text-white"> Es una experiencia de élite diseñada</strong> para expandir tu visión, 
            multiplicar tu impacto y conectarte con líderes que 
            <strong className="text-white"> ya están viviendo lo que tú estás construyendo.</strong>
          </p>

          {/* Speakers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-4 h-32 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-sm">Speaker {i + 1}</span>
              </div>
            ))}
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Conexiones de Por Vida */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">CONEXIONES</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">DE POR VIDA</h3>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 rounded-lg h-64 mb-8 flex items-center justify-center">
              <span className="text-gray-400">Imagen de networking</span>
            </div>
            
            <p className="text-lg text-gray-300 mb-6">
              Wake Up Conferences va más allá de un evento de crecimiento. Es una experiencia de élite 
              diseñada para expandir tu visión, multiplicar tu impacto y conectarte con líderes que ya 
              están viviendo lo que tú estás construyendo.
            </p>
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* ¿Es Wake Up Para Mí? */}
      <section id="es" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">¿es wake up conferences</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-12">PARA MÍ?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              "Si buscas transformar tu mindset empresarial",
              "Si quieres conectar con líderes de alto nivel",
              "Si estás listo para expandir tu red de contactos",
              "Si quieres llevar tu negocio al siguiente nivel"
            ].map((text, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 h-40 flex items-center justify-center text-center">
                <p className="text-lg">{text}</p>
              </div>
            ))}
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-purple-900/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-white font-semibold">– {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            ¿Estás Listo Para Despertar Tu Potencial?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a miles de emprendedores que ya transformaron sus vidas y negocios. 
            Los cupos son limitados.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-6 rounded-full">
            RESERVAR MI LUGAR AHORA
          </Button>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 shadow-lg">
          <span className="text-2xl">💬</span>
        </Button>
      </div>
    </div>
  );
};

export default WakeUpTony2025;