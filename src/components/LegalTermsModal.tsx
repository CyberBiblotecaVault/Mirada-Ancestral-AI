import React from 'react';
import { X, Shield, FileText, Scale, UserCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, MANDATORY_LEGAL_NOTICE } from '../config/siteConfig';

export type LegalTabType = 'terminos' | 'aviso-legal' | 'sobre-nosotros' | 'como-funciona';

interface LegalTermsModalProps {
  isOpen: boolean;
  activeTab: LegalTabType;
  onClose: () => void;
  onSelectTab: (tab: LegalTabType) => void;
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border-2 border-[#d4af37]/60 bg-white text-[#191c28] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ded5c5] flex items-center justify-between bg-gradient-to-r from-white via-[#fbf7ee] to-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              {activeTab === 'terminos' && <FileText className="w-5 h-5" />}
              {activeTab === 'aviso-legal' && <Scale className="w-5 h-5" />}
              {activeTab === 'sobre-nosotros' && <UserCheck className="w-5 h-5" />}
              {activeTab === 'como-funciona' && <HelpCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#171923]">
                {activeTab === 'terminos' && 'Términos y Condiciones de Uso'}
                {activeTab === 'aviso-legal' && 'Aviso Legal y Deslinde de Responsabilidad'}
                {activeTab === 'sobre-nosotros' && 'Sobre Nosotros · Gustavo Gómez'}
                {activeTab === 'como-funciona' && 'Cómo Funciona Mirada Ancestral AI'}
              </h2>
              <p className="text-[11px] text-[#525970] font-medium">
                {SITE_CONFIG.name} · {SITE_CONFIG.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#ded5c5] text-[#525970] hover:text-[#171923] hover:bg-[#faf6ee] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#ded5c5] bg-[#faf7f0] px-4 pt-2 gap-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => onSelectTab('como-funciona')}
            className={`px-3 py-2 border-b-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'como-funciona'
                ? 'border-[#926d0a] text-[#926d0a] bg-white'
                : 'border-transparent text-[#525970] hover:text-[#171923]'
            }`}
          >
            Cómo funciona
          </button>
          <button
            onClick={() => onSelectTab('terminos')}
            className={`px-3 py-2 border-b-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'terminos'
                ? 'border-[#926d0a] text-[#926d0a] bg-white'
                : 'border-transparent text-[#525970] hover:text-[#171923]'
            }`}
          >
            Términos y Condiciones
          </button>
          <button
            onClick={() => onSelectTab('aviso-legal')}
            className={`px-3 py-2 border-b-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'aviso-legal'
                ? 'border-[#926d0a] text-[#926d0a] bg-white'
                : 'border-transparent text-[#525970] hover:text-[#171923]'
            }`}
          >
            Aviso Legal
          </button>
          <button
            onClick={() => onSelectTab('sobre-nosotros')}
            className={`px-3 py-2 border-b-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'sobre-nosotros'
                ? 'border-[#926d0a] text-[#926d0a] bg-white'
                : 'border-transparent text-[#525970] hover:text-[#171923]'
            }`}
          >
            Sobre Nosotros
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-[#333a4d] leading-relaxed">
          {/* TAB: CÓMO FUNCIONA */}
          {activeTab === 'como-funciona' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-medium">
                <strong>Principio Fundamental de la Plataforma:</strong> Diferenciamos estrictamente lo que técnicamente puede observarse en una imagen de la explicación cultural e histórica tradicional.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5">
                  <h4 className="font-bold text-[#171923] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#926d0a]" />
                    Observación Visual
                  </h4>
                  <p className="text-[11px] text-[#525970]">
                    Lo que técnicamente puede observarse en una fotografía: posición aproximada de las zonas, forma, proporciones, líneas visibles de la palma, calidad de imagen, iluminación y orientación.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5">
                  <h4 className="font-bold text-[#171923] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#926d0a]" />
                    Interpretación Tradicional
                  </h4>
                  <p className="text-[11px] text-[#525970]">
                    La explicación cultural basada en tradiciones milenarias como el Mian Xiang y la quiromancia. Nunca se presenta como un hecho científico comprobado, sino como una metáfora filosófica.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-[#171923] text-sm">Flujo de 3 Pasos</h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                  <li><strong>Captura o subida:</strong> Activa tu cámara o selecciona una imagen nítida. El procesamiento ocurre localmente en la memoria de tu navegador.</li>
                  <li><strong>Mapeo interactivo:</strong> Haz clic en cada zona o línea visible para descubrir su nombre clásico, contexto dinástico e interpretación tradicional.</li>
                  <li><strong>Generación de informe:</strong> Descarga tu documento en PDF o Word (.doc) con portada completa, fecha, advertencias y copyright.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB: TÉRMINOS Y CONDICIONES */}
          {activeTab === 'terminos' && (
            <div className="space-y-4">
              <p>
                Bienvenido a <strong>{SITE_CONFIG.name}</strong>. Al acceder o utilizar este sitio web, usted acepta cumplir con estos Términos y Condiciones de Uso.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">1. Naturaleza Cultural y Entretenimiento Educativo</h4>
                <p className="text-[11px]">
                  Este sitio web ofrece una experiencia estrictamente educativa, histórica y cultural basada en tradiciones folclóricas orientales y occidentales. No constituye un servicio médico, psicológico, financiero ni jurídico.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">2. Prohibición de Inferencias Sensibles</h4>
                <p className="text-[11px]">
                  La aplicación rechaza explícitamente cualquier intento de inferir raza, etnia, religión, salud, criminalidad o ideología a través de rostros o manos. No se permite el uso del software con fines discriminatorios ni de evaluación laboral.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">3. Propiedad Intelectual</h4>
                <p className="text-[11px]">
                  Todos los textos originales, diagramas interactivos, ensayos del blog, código fuente y elementos gráficos son propiedad de <strong>Gustavo Gómez</strong> bajo el copyright: <strong>{SITE_CONFIG.copyright}</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">4. Gratuidad del Servicio</h4>
                <p className="text-[11px]">
                  El acceso a todas las herramientas, visualizadores y descargas de informes es 100% gratuito. No se solicitan pagos ni suscripciones para utilizar las funciones esenciales.
                </p>
              </div>
            </div>
          )}

          {/* TAB: AVISO LEGAL */}
          {activeTab === 'aviso-legal' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-medium">
                {MANDATORY_LEGAL_NOTICE}
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">Datos Identificativos</h4>
                <p className="text-[11px]">
                  <strong>Titular y Propietario:</strong> Gustavo Gómez<br />
                  <strong>Marca:</strong> MIRADA ANCESTRAL AI<br />
                  <strong>Eslogan:</strong> Tradición milenaria. Tecnología moderna.<br />
                  <strong>Contacto:</strong> lukasluna816@gmail.com<br />
                  <strong>Monetización prevista:</strong> Google AdSense (cuenta de administración: gsordo@gmail.com)<br />
                  <strong>Donaciones voluntarias:</strong> PayPal @gsordo12
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#171923]">Limitación de Responsabilidad</h4>
                <p className="text-[11px]">
                  Gustavo Gómez y Mirada Ancestral AI no asumen responsabilidad alguna por decisiones personales, financieras o emocionales tomadas por los usuarios con base en las interpretaciones tradicionales descritas en este portal.
                </p>
              </div>
            </div>
          )}

          {/* TAB: SOBRE NOSOTROS */}
          {activeTab === 'sobre-nosotros' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#926d0a] font-bold text-lg font-editorial">
                  GG
                </div>
                <div>
                  <h4 className="font-editorial text-base font-bold text-[#171923]">
                    Gustavo Gómez
                  </h4>
                  <p className="text-[11px] text-[#926d0a] font-semibold">
                    Fundador, Investigador Cultural & Desarrollador Principal
                  </p>
                </div>
              </div>

              <p>
                <strong>MIRADA ANCESTRAL AI</strong> nació con la visión de crear un puente ético y respetuoso entre la sabiduría fisonómica clásica y la tecnología digital contemporánea.
              </p>

              <p>
                Durante siglos, tradiciones como el Mian Xiang chino o la quiromancia han sido malinterpretadas o utilizadas con fines alarmistas y charlatanes. Nuestra misión es devolver a estas disciplinas su carácter original: un lenguaje alegórico de contemplación, cultivo moral, autoconocimiento y estudio histórico, respaldado por una arquitectura de privacidad que protege incondicionalmente a cada usuario.
              </p>

              <div className="pt-2 border-t border-[#ded5c5] text-[11px] text-[#525970]">
                <strong>Copyright:</strong> {SITE_CONFIG.copyright}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ded5c5] bg-[#faf7f0] flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
