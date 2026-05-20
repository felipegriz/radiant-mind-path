import Navbar from "@/components/layout/Navbar";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h2>
    <div className="text-gray-300 space-y-3 leading-relaxed">{children}</div>
  </section>
);

const TerminosYCondiciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Términos y Condiciones Generales de Uso y Venta
          </h1>
          <p className="text-gray-400">GREYT TRAINING LLC — Marca Felipe Griz</p>
          <p className="text-gray-500 text-sm mt-2">
            Fecha de Vigencia Original: 1 de enero de 2021 · Última Actualización: 1 de enero de 2025
          </p>
        </header>

        <Section title="1. Aceptación del Acuerdo">
          <p>
            Estos Términos y Condiciones ("Términos") regulan el acceso, compra y uso de todos los seminarios,
            entrenamientos, eventos presenciales, programas digitales, mentorías, membresías, retiros, contenidos y
            servicios ofrecidos por GREYT TRAINING LLC, comercializados bajo la marca personal Felipe Griz (en
            adelante, "la Compañía").
          </p>
          <p>
            Al registrarse, comprar, asistir o participar en cualquiera de nuestros Servicios, usted declara haber
            leído, entendido y aceptado íntegramente estos Términos.
          </p>
          <p>Si no está de acuerdo, no debe adquirir ni utilizar nuestros servicios.</p>
        </Section>

        <Section title="2. Aplicación Temporal y Versiones">
          <p>Estos Términos aplican a todas las compras realizadas desde el 1 de enero de 2021.</p>
          <p>
            Las versiones actualizadas aplicarán desde su fecha de publicación y no afectarán retroactivamente compras
            anteriores, salvo cuando la ley aplicable así lo exija.
          </p>
          <p>La versión vigente será la publicada en los canales oficiales de la Compañía.</p>
        </Section>

        <Section title="3. Decisión Consciente y Principio de Compromiso">
          <p>
            Los programas de la Compañía se fundamentan en principios de desarrollo personal, liderazgo y neurociencia
            aplicada.
          </p>
          <p>El participante reconoce que:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La decisión de compra fue tomada de manera libre, voluntaria y consciente.</li>
            <li>
              Al realizar una inversión significativa fuera de su rutina habitual, el cerebro humano puede activar
              mecanismos de conservación energética que generen dudas posteriores.
            </li>
            <li>Tales reacciones no invalidan la decisión consciente inicialmente adoptada.</li>
            <li>
              La compra constituye un compromiso personal con el proceso de crecimiento y aplicación de las
              metodologías impartidas.
            </li>
          </ul>
        </Section>

        <Section title="4. Política General de No Devoluciones">
          <p>Todos los productos y servicios ofrecidos por la Compañía son de venta final.</p>
          <p>
            No se realizan devoluciones, reembolsos ni reintegros de dinero bajo ninguna circunstancia, en la máxima
            medida permitida por la ley aplicable.
          </p>
          <p>El participante acepta expresamente que:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El pago confirma su compromiso.</li>
            <li>
              El acceso a contenidos digitales, reservas logísticas, cupos limitados y costos operativos se ejecutan
              inmediatamente tras la compra.
            </li>
            <li>
              No existe derecho automático de retracto cuando la ley contemple excepciones para eventos con fecha
              determinada, contenidos digitales ejecutados con consentimiento previo o servicios ya iniciados.
            </li>
          </ul>
        </Section>

        <Section title="5. Descuentos, Bonos y Beneficios Especiales">
          <p>En determinadas ocasiones, la Compañía puede ofrecer:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Precios promocionales</li>
            <li>Descuentos exclusivos</li>
            <li>Bonos adicionales</li>
            <li>Beneficios por pago anticipado</li>
          </ul>
          <p>
            Estos beneficios se conceden para cubrir costos fijos, asegurar logística y garantizar planeación
            financiera anticipada.
          </p>
          <p>Por lo tanto, cuando un producto es adquirido bajo condiciones especiales:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              El comprador renuncia de manera expresa, irrevocable y definitiva a cualquier tipo de devolución,
              compensación o reembolso.
            </li>
            <li>Esta renuncia constituye condición esencial del beneficio otorgado.</li>
          </ul>
        </Section>

        <Section title="6. Excepciones Legales Obligatorias">
          <p>
            Nada en estos Términos pretende desconocer derechos imperativos del consumidor cuando la ley aplicable
            disponga lo contrario.
          </p>
          <p>
            Sin embargo, cuando la normativa contemple excepciones al derecho de retracto o desistimiento (como en
            actividades con fecha específica, contenidos digitales iniciados con consentimiento expreso o servicios ya
            ejecutados), dichas excepciones serán aplicables.
          </p>
        </Section>

        <Section title="7. Resultados y Exención de Garantías">
          <p>
            La Compañía no garantiza resultados financieros, empresariales, emocionales o personales específicos.
          </p>
          <p>El éxito depende exclusivamente del nivel de implementación individual del participante.</p>
          <p>Los Servicios no constituyen asesoría médica, psicológica, financiera, contable ni legal.</p>
          <p>Los contenidos se proporcionan "tal cual" y según disponibilidad.</p>
        </Section>

        <Section title="8. Propiedad Intelectual">
          <p>
            Todos los materiales, metodologías, contenidos audiovisuales, presentaciones, marcas, nombres comerciales
            y estructuras formativas son propiedad exclusiva de GREYT TRAINING LLC y Felipe Griz.
          </p>
          <p>Queda prohibido:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Grabar o retransmitir eventos sin autorización escrita.</li>
            <li>Reproducir o distribuir contenidos.</li>
            <li>Compartir accesos personales.</li>
            <li>Revender información.</li>
            <li>Utilizar el material para crear programas similares.</li>
            <li>Usar contenidos para entrenar modelos de inteligencia artificial.</li>
          </ul>
          <p>El incumplimiento podrá dar lugar a acciones legales civiles y penales.</p>
        </Section>

        <Section title="9. Derecho de Admisión y Permanencia">
          <p>La Compañía se reserva el derecho de admisión y permanencia en cualquier evento o programa.</p>
          <p>
            Conductas disruptivas, irrespetuosas, ilegales o que afecten la experiencia de otros participantes podrán
            generar expulsión inmediata sin derecho a reembolso.
          </p>
        </Section>

        <Section title="10. Limitación de Responsabilidad">
          <p>En la máxima medida permitida por la ley:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La Compañía no será responsable por daños indirectos, incidentales o consecuenciales.</li>
            <li>
              La responsabilidad total, de proceder, no excederá el monto efectivamente pagado por el servicio
              específico en cuestión.
            </li>
            <li>No se responderá por decisiones tomadas por el participante basadas en los contenidos.</li>
          </ul>
        </Section>

        <Section title="11. Indemnización">
          <p>
            El participante acepta defender, indemnizar y mantener indemne a GREYT TRAINING LLC y Felipe Griz frente a
            cualquier reclamación derivada de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uso indebido de los servicios.</li>
            <li>Incumplimiento de estos Términos.</li>
            <li>Violación de derechos de terceros.</li>
          </ul>
        </Section>

        <Section title="12. Uso de Imagen y Testimonios">
          <p>
            Al asistir a eventos presenciales o virtuales, el participante autoriza el uso de su imagen, voz y
            testimonios con fines promocionales y educativos, sin compensación adicional.
          </p>
        </Section>

        <Section title="13. Pagos y Suscripciones">
          <p>Cuando un programa incluya pagos recurrentes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El usuario autoriza cargos automáticos.</li>
            <li>La cancelación deberá solicitarse antes del siguiente ciclo de facturación.</li>
            <li>Los pagos ya efectuados no son reembolsables.</li>
          </ul>
        </Section>

        <Section title="14. Resolución de Disputas">
          <p>
            Antes de iniciar cualquier acción legal, las partes intentarán resolver cualquier controversia mediante
            negociación directa durante treinta (30) días.
          </p>
          <p>Si no se alcanza acuerdo, la disputa será resuelta mediante arbitraje vinculante.</p>
          <p>
            <strong className="text-white">Ley aplicable:</strong> Estado de Florida, Estados Unidos.
            <br />
            <strong className="text-white">Sede:</strong> Miami, Florida.
            <br />
            <strong className="text-white">Idioma:</strong> Español.
          </p>
          <p>Las partes renuncian a demandas colectivas.</p>
        </Section>

        <Section title="15. Fuerza Mayor">
          <p>
            La Compañía no será responsable por incumplimientos derivados de eventos fuera de su control razonable,
            incluyendo desastres naturales, actos gubernamentales, fallas técnicas o emergencias.
          </p>
        </Section>

        <Section title="16. Modificaciones">
          <p>La Compañía podrá modificar estos Términos en cualquier momento.</p>
          <p>Las actualizaciones aplicarán desde su publicación oficial.</p>
        </Section>

        <Section title="17. Acuerdo Completo">
          <p>
            Estos Términos constituyen el acuerdo completo entre las partes y reemplazan cualquier entendimiento
            previo verbal o escrito.
          </p>
        </Section>
      </main>
    </div>
  );
};

export default TerminosYCondiciones;
