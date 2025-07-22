import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star, CheckCircle } from "lucide-react";
import group96 from "@/assets/group-96.png";
import speakersHorizontal from "@/assets/speakers-horizontal.png";
import fechaLugar2 from "@/assets/fecha-lugar-2.png";
import fechaLugar1 from "@/assets/fecha-lugar-1.png";
import group50 from "@/assets/group-50.png";
import group136 from "@/assets/group-136.png";
import group137 from "@/assets/group-137.png";
import group138 from "@/assets/group-138.png";
import group139 from "@/assets/group-139.png";
import group149 from "@/assets/group-149.png";

const WakeUpTony2025 = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const togglePackage = (packageName: string) => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8 text-sm">
              <a href="#tony" className="font-medium hover:text-purple-400 transition-colors">
                ¿Quien es Tony Robbins?
              </a>
              <a href="#mentes" className="font-medium hover:text-purple-400 transition-colors">
                MENTES MAESTRAS
              </a>
              <a href="#es" className="font-medium hover:text-purple-400 transition-colors">
                ¿es WAKE UP CONFERENCES PARA MI?
              </a>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-6">
              QUIERO MI ENTRADA
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src={group96} alt="Wake Up Logo" className="mx-auto mb-8 max-w-md" />
          </div>

          <img 
            src={speakersHorizontal} 
            alt="Speakers" 
            className="mx-auto mb-8 rounded-lg max-w-4xl w-full"
          />

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full mb-12">
            QUIERO MI ENTRADA
          </Button>

          <div className="flex justify-center space-x-8">
            <img src={fechaLugar2} alt="Fecha y Lugar" className="max-w-xs" />
            <img src={fechaLugar1} alt="Fecha y Lugar" className="max-w-xs" />
          </div>
        </div>
      </section>

      {/* Haz Posible lo Imposible */}
      <section className="py-20 bg-gradient-to-r from-purple-800/20 to-blue-800/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">haz posible</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">lo imposible</h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            Tony Robbins tiene un mensaje directo para ti. Descubre por qué ser parte de Wake Up Conferences 
            y cómo puede marcar un antes y un después en tu vida y tus negocios.
          </p>
          
          <div className="text-4xl md:text-5xl font-bold mb-8">
            03 <span className="font-black">y</span> 04 de Octubre
          </div>
          
          <img src={group50} alt="Group 50" className="mx-auto mb-8 max-w-sm" />
          
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Tony Robbins Section */}
      <section id="tony" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            TONY <span className="font-black">ROBBINS</span>
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed mb-8">
            <p className="mb-6">
              <strong className="text-white">Tony Robbins</strong> (nacido como Anthony Jay Robbins el 29 de febrero de 1960) 
              <strong className="text-white"> es un autor, coach, y orador</strong> estadounidense, conocido por sus seminarios y 
              libros de autoayuda como <strong className="text-white">«Unlimited Power» y «Awaken the Giant Within».</strong> 
              Es ampliamente reconocido por su enfoque en la <strong className="text-white">psicología del liderazgo,</strong> 
              las negociaciones, y los cambios organizativos radicales. Robbins también es un emprendedor, escritor de éxito, 
              <strong className="text-white">filántropo</strong>, y se le considera uno de los principales estrategas de la vida y los 
              <strong className="text-white">negocios en Estados Unidos.</strong>
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
            <p>
              Tony Robbins (nacido como Anthony Jay Robbins el 29 de febrero de 1960) es un autor, coach, y orador estadounidense, 
              conocido por sus seminarios y libros de autoayuda como «Unlimited Power» y «Awaken the Giant Within». Es ampliamente 
              reconocido por su enfoque en la psicología del liderazgo, las negociaciones, y los cambios organizativos radicales. 
              Robbins también es un emprendedor, escritor de éxito, filántropo, y se le considera uno de los principales estrategas 
              de la vida y los negocios en Estados Unidos.
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
            marcando la pauta y fortaleciendo el ecosistema empresarial en Perú y Latinoamérica.
          </p>

          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-12 rounded"></div>

          {/* Image Gallery */}
          <div className="flex overflow-x-auto space-x-4 mb-12 pb-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-lg min-w-[200px] h-32 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Imagen {i + 1}</span>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            CINCO MENTES QUE TRANSFORMAN NEGOCIOS
          </h2>
          
          <h3 className="text-6xl font-black mb-12 text-purple-400">SHARKS</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <img src={group136} alt="Shark 1" className="mx-auto" />
            <img src={group137} alt="Shark 2" className="mx-auto" />
            <img src={group138} alt="Shark 3" className="mx-auto" />
            <img src={group139} alt="Shark 4" className="mx-auto" />
            <img src={group149} alt="Shark 5" className="mx-auto" />
          </div>

          <p className="text-xl mb-8">El panel más influyente de Colombia llega a Wake up conferences 2025</p>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Jorge Loza Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">¿Quién es Jorge Loza?</h2>
              <p className="text-xl text-purple-400 mb-6">La visión detrás de Wake Up Conferences</p>
              <p className="text-gray-300 leading-relaxed">
                Jorge Loza es empresario, conferencista internacional y fundador de Ciudapolis y Wake Up Conferences, 
                reconocidas plataformas de desarrollo inmobiliario y transformación personal en Latinoamérica. Con una 
                visión estratégica y enfoque espiritual aplicado a los negocios, ha inspirado a miles de emprendedores 
                a construir con propósito, liderazgo y resultados sostenibles.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">+10</div>
                  <div className="text-sm text-gray-400">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">+500</div>
                  <div className="text-sm text-gray-400">Empresarios impactados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">+50</div>
                  <div className="text-sm text-gray-400">Eventos realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">+100</div>
                  <div className="text-sm text-gray-400">Millones generados</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400">Imagen de Jorge Loza</span>
            </div>
          </div>
        </div>
      </section>

      {/* Jenny Barrera Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/10 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400">Imagen de Jenny Barrera</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">¿Quién es Jenny Barrera?</h2>
              <p className="text-xl text-purple-400 mb-6">La estrategia detrás de Wake Up Conferences</p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Cofundadora de Ciudapolis, la primera franquicia inmobiliaria del Perú, y de Wake Up Conferences, 
                    la conferencia de transformación más impactante de la región.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Lidera el desarrollo de comunidades sostenibles, generando impacto social real y oportunidades 
                    de libertad financiera para miles de personas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Inspira desde el escenario y ejecuta en el campo, empoderando a líderes con alma y guiando 
                    especialmente a mujeres a construir negocios con propósito.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Su misión es abrir caminos donde antes no los había, impulsando una nueva generación de 
                    liderazgo consciente, humano y próspero.</span>
                </li>
              </ul>
            </div>
          </div>
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
                <div className="bg-white/10 rounded-lg h-20 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Icono Foundation</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  COMPRAR ENTRADA
                </Button>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría Foundation.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>10 raciones de alimentos donados a la Fundación Ciudapolis para personas en situación de necesidad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea.</span>
                  </li>
                </ul>
                <div className="text-3xl font-bold text-center">USD $ 127</div>
                <div className="bg-white/10 rounded-lg h-8 mt-4"></div>
              </CardContent>
            </Card>

            {/* Executive Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">ejecutiva</span></h3>
                <div className="bg-white/10 rounded-lg h-20 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Icono Ejecutiva</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  COMPRAR ENTRADA
                </Button>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría Ejectutiva.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo ZONA EJECUTIVA.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>20 raciones de alimentos donados a la Fundación Ciudapolis, para personas en situación de necesidad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea.</span>
                  </li>
                </ul>
                <div className="text-3xl font-bold text-center">USD $ 332</div>
                <div className="bg-white/10 rounded-lg h-8 mt-4"></div>
              </CardContent>
            </Card>

            {/* Life Mastery Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">LIFE MASTERY</span></h3>
                <div className="bg-white/10 rounded-lg h-20 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Icono Life Mastery</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  COMPRAR ENTRADA
                </Button>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría LIFE MASTERY (3ra zona en explanada).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Certificado digital de participación.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona LIFE MASTERY.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>40 raciones de alimentos donados a la Fundación Ciudapolis, para personas en situación de necesidad.</span>
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
                      <span>1 Master class con ISMAEL CALA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 Master class con JORGE LOZA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 Master class con SUSI VEREECKEN (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias de speaker seleccionados durante 30 días.</span>
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

                <div className="text-3xl font-bold text-center">USD $ 612</div>
                <div className="bg-white/10 rounded-lg h-8 mt-4"></div>
              </CardContent>
            </Card>

            {/* Platinum Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">PLATINUM</span></h3>
                <div className="bg-white/10 rounded-lg h-20 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Icono Platinum</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  COMPRAR ENTRADA
                </Button>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría PLATINUM(1ra zona en explanada).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Certificado digital de participación.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona PLATINUM.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>80 raciones de alimentos donados a la Fundación Ciudapolis, para personas en situación de necesidad.</span>
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
                      <span>2 Master class con ISMAEL CALA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master class con JORGE LOZA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master class con SUSI VEREECKEN (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias de speaker seleccionados durante 60 días.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Traducción simultánea</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a networking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>10% de descuento en compra</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>10% de descuento en compras de merch WUC.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Jorge Loza.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Tony Robbins.</span>
                    </div>
                  </div>
                )}

                <div className="text-3xl font-bold text-center">USD $ 1060</div>
                <div className="bg-white/10 rounded-lg h-8 mt-4"></div>
              </CardContent>
            </Card>

            {/* Diamond Package */}
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Experiencia <span className="font-black">DIAMOND</span></h3>
                <div className="bg-white/10 rounded-lg h-20 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Icono Diamond</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  COMPRAR ENTRADA
                </Button>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Acceso a la conferencia 2 días.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Asiento presencial en categoría DIAMOND (1ra zona en explanada).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Welcome Kit exclusivo zona DIAMOND.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>100 raciones de alimentos donados a la Fundación Ciudapolis, para personas en situación de necesidad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Traducción simultánea.</span>
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
                      <span>Certificado digital de participación.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master class con ISMAEL CALA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master class con JORGE LOZA (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>2 Master class con SUSI VEREECKEN (virtual).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a grabación de ponencias de speaker seleccionados durante 120 días.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Almuerzo 2 días (3 y 4 de octubre).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a Coffee break.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Acceso a after party VIP al cierre del evento.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Oportunidad de networking entre empresarios LATAM.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>10% de descuento en compras de merch WUC.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Jorge Loza.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>1 libro de Tony Robbins.</span>
                    </div>
                  </div>
                )}

                <div className="text-3xl font-bold text-center">USD $ 1356</div>
                <div className="bg-white/10 rounded-lg h-8 mt-4"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experiencia Wake Up */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 rounded-lg h-64 mb-8 flex items-center justify-center">
            <span className="text-gray-400">Imagen Experiencia Wake Up</span>
          </div>
          
          <p className="text-lg mb-4">Disfruta de este y más beneficios en la exclusiva <em>Experiencia Wake Up.</em></p>
          
          <h2 className="text-4xl font-bold mb-4">EXPERIENCIA</h2>
          <h3 className="text-6xl font-black mb-4">WAKE UP</h3>
          <h4 className="text-2xl mb-8">UNA VIVENCIA TRANSFORMADORA</h4>
          
          <div className="bg-white/10 rounded-lg h-32 mb-8 flex items-center justify-center">
            <span className="text-gray-400">Imagen adicional</span>
          </div>
          
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Mentes Maestras */}
      <section id="mentes" className="py-20 bg-gradient-to-r from-purple-900/30 to-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded"></div>
          
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">mentes</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">maestras</h3>
          
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded"></div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            <strong className="text-white">Wake Up Conferences</strong> va más allá de un evento de crecimiento. 
            <strong className="text-white"> Es una experiencia de élite diseñada</strong> para expandir tu visión, 
            multiplicar tu impacto y conectarte con líderes que 
            <strong className="text-white"> ya están viviendo lo que tú estás construyendo.</strong>
          </p>

          {/* Speakers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {Array.from({ length: 13 }, (_, i) => (
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
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">CONEXIONES</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-8">DE POR VIDA</h3>
          
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded"></div>
          
          <div className="bg-white/10 rounded-lg h-64 mb-8 flex items-center justify-center">
            <span className="text-gray-400">Imagen de networking</span>
          </div>
          
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Wake Up Conferences va más allá de un evento de crecimiento. Es una experiencia de élite 
            diseñada para expandir tu visión, multiplicar tu impacto y conectarte con líderes que ya 
            están viviendo lo que tú estás construyendo.
          </p>
          
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Wake Up Conferences va más allá de un evento de crecimiento. Es una experiencia de élite 
            diseñada para expandir tu visión, multiplicar tu impacto y conectarte con líderes que ya 
            están viviendo lo que tú estás construyendo.
          </p>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Wake Up Conferences va más allá de un evento de crecimiento. Es una experiencia de élite 
            diseñada para expandir tu visión, multiplicar tu impacto y conectarte con líderes que ya 
            están viviendo lo que tú estás construyendo.
          </p>

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* ¿Es Wake Up Para Mí? */}
      <section id="es" className="py-20 bg-gradient-to-r from-gray-900/50 to-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/10 rounded-lg h-32 mb-8 flex items-center justify-center">
            <span className="text-gray-400">Imagen decorativa</span>
          </div>
          
          <h2 className="text-lg uppercase tracking-wider text-gray-300 mb-4">¿es wake up conferences</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-12">PARA MI?</h3>
          
          <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {["C1", "C2", "C3", "C4"].map((image, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 h-40 flex items-center justify-center text-center">
                <span className="text-gray-400">{image}</span>
              </div>
            ))}
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full">
            QUIERO MI ENTRADA
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 rounded-lg h-4 mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-4 italic">
                "Participar en Wake Up fue transformador. Los contactos que hice y las ideas que compartimos me ayudaron a darle un giro completo a mi negocio. Ahora tengo un socio estratégico gracias a este evento."
              </p>
              <p className="text-white font-semibold">– Javier López</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-4 italic">
                "Lo que más destaco de Wake Up es la energía que se siente al estar rodeado de emprendedores apasionados. Salí con una red de contactos que jamás habría imaginado."
              </p>
              <p className="text-white font-semibold">– Andrés Gutiérrez</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-4 italic">
                "Wake Up no es solo un evento, es un cambio de perspectiva. Los contactos que hice ahí están ayudándome a llevar mi empresa al siguiente nivel. Es una inversión que vale cada centavo."
              </p>
              <p className="text-white font-semibold">– Gabriela Martínez</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-4 italic">
                "Lo que más me impactó de Wake Up fue la calidad de las personas que conocí. Hacer networking nunca había sido tan fácil y efectivo. Me llevo grandes amigos y aliados estratégicos."
              </p>
              <p className="text-white font-semibold">– Luis Rodríguez</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16 shadow-lg flex items-center justify-center">
          <span className="text-white text-sm">Reserva tu entrada aquí</span>
        </Button>
      </div>
    </div>
  );
};

export default WakeUpTony2025;