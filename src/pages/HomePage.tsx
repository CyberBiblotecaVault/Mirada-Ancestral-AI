import React from 'react';
import { 
  ScanFace, Hand, BookOpen, Sparkles, CheckCircle2, Shield, ArrowRight,
  Eye, HelpCircle, ChevronRight, Compass, Heart, Brain, Sun, FileText
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { BLOG_ARTICLES } from '../data/blogArticles';
import heroImg from '../assets/images/hero_mian_xiang_facial_1790690351591.jpg';
import palmImg from '../assets/images/palmistry_hand_art_1790690364298.jpg';
import scrollImg from '../assets/images/mian_xiang_scroll_1790690379362.jpg';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Las 9 preguntas frecuentes requeridas exactamente por el usuario
  const faqs = [
    {
      q: '¿Qué es Mian Xiang?',
      a: 'Mian Xiang (面相) es el arte tradicional chino de contemplación del rostro humano. Desarrollado durante siglos bajo el influjo del taoísmo y el confucianismo, concibe el rostro como un mapa alegórico donde convergen los Tres Reinos (Cielo, Hombre y Tierra) y doce oficialías simbólicas que invitan a la autorreflexión y al cultivo moral.'
    },
    {
      q: '¿La lectura del rostro es científica?',
      a: 'No. El Mian Xiang es una disciplina cultural, filosófica e histórica tradicional, no una ciencia biomédica ni psicológica. Sus interpretaciones son analógicas y metafóricas, y no deben ser utilizadas como pruebas diagnósticas ni como criterios de evaluación de la personalidad en entornos formales.'
    },
    {
      q: '¿La quiromancia puede predecir el futuro?',
      a: 'No. Las líneas de las manos son pliegues anatómicos de flexión de la piel desarrollados en la etapa embrionaria para permitir el movimiento y agarre. La quiromancia tradicional ofrece un lenguaje poético y arquetípico sobre la voluntad humana, pero no tiene capacidad de predecir acontecimientos futuros.'
    },
    {
      q: '¿La aplicación guarda mis fotografías?',
      a: 'No. En Mirada Ancestral AI priorizamos la privacidad: las fotografías que utilizas con tu cámara o subes desde tu galería se procesan localmente en la memoria RAM de tu propio navegador web (mediante la API Canvas) y no se guardan en servidores remotos.'
    },
    {
      q: '¿Puedo utilizar la cámara del celular?',
      a: 'Sí. La aplicación está diseñada con enfoque mobile-first y permite activar directamente la cámara frontal o trasera de tu teléfono celular mediante la API multimedia del navegador o a través del selector nativo de cámara.'
    },
    {
      q: '¿Puedo descargar mi informe?',
      a: 'Sí. Al concluir cualquier análisis visual interactivo puedes generar y descargar tu informe completo en formato PDF listo para imprimir, en documento editable de Word (.doc) o imprimirlo directamente de manera 100% gratuita.'
    },
    {
      q: '¿El servicio es gratuito?',
      a: 'Sí, es 100% gratuito. No requiere suscripción, no solicita tarjetas de crédito ni impone límites artificiales de consultas. Su sostenimiento se planifica mediante publicidad discreta de Google AdSense.'
    },
    {
      q: '¿Puedo eliminar mis resultados?',
      a: 'Sí. En cualquier momento puedes pulsar en "Eliminar fotografía" o "Borrar resultado" en la barra de resultados. Si guardaste un informe en tu navegador, puedes eliminarlo con un solo clic desde la sección de informes o en el panel de privacidad.'
    },
    {
      q: '¿Qué ocurre si la fotografía no tiene suficiente calidad?',
      a: 'Si la iluminación es muy tenue o la imagen se encuentra borrosa, el sistema te lo notificará amablemente con el aviso: "No podemos identificar esta zona o línea con suficiente claridad. Intenta tomar otra fotografía con mejor iluminación".'
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in text-[#191c28]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl border border-[#ded5c5] bg-gradient-to-b from-white via-[#fbf8f2] to-[#f5efe5] p-6 sm:p-10 lg:p-12 shadow-md">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 text-xs font-semibold text-[#8b6508] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>{SITE_CONFIG.name} · Patrimonio Cultural</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-[#171923] leading-[1.1]">
                MIRADA ANCESTRAL <span className="text-[#926d0a]">AI</span>
              </h1>
              <h2 className="font-editorial text-xl sm:text-2xl text-[#926d0a] font-semibold italic">
                {SITE_CONFIG.tagline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#4b5266] leading-relaxed max-w-xl font-normal">
              "Explora de manera interactiva las tradiciones de interpretación del rostro y las manos. Captura una fotografía, conoce el significado tradicional de diferentes zonas y genera tu propio informe."
            </p>

            {/* Los 3 botones principales requeridos */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('/analizar-rostro')}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] font-bold text-sm text-[#0c0d12] shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>📷</span>
                <span>Analizar rostro</span>
              </button>

              <button
                onClick={() => onNavigate('/analizar-mano')}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white border-2 border-[#b89028] hover:border-[#8e6b12] font-bold text-sm text-[#191c28] shadow-md hover:bg-[#faf6ee] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>✋</span>
                <span>Analizar mano</span>
              </button>

              <button
                onClick={() => onNavigate('/mian-xiang')}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white border border-[#ded5c5] hover:border-[#b89028] font-semibold text-sm text-[#4b5266] hover:text-[#171923] hover:bg-[#faf6ee] transition-all cursor-pointer shadow-sm"
              >
                <span>📚</span>
                <span>Aprender</span>
              </button>
            </div>

            {/* Aviso obligatorio debajo del Hero */}
            <div className="pt-2">
              <p className="text-xs text-[#6b7280] font-medium flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#926d0a] shrink-0" />
                <span>Experiencia cultural y educativa. No constituye una evaluación científica.</span>
              </p>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-xl bg-white">
              <img
                src={heroImg}
                alt="Mirada Ancestral AI - Fisonomía Oriental y Quiromancia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#fbf8f2] font-bold">
                  Canon Tradicional
                </span>
                <span className="font-editorial text-lg text-white font-bold">
                  Mian Xiang & Quiromancia
                </span>
                <span className="text-[11px] text-[#e0e2ec]">
                  Visión por computador local y contenido educativo riguroso.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Slot 1: Desktop debajo del hero / Mobile después del hero */}
      <AdPlaceholder slot="desktop-below-header" />

      {/* ================= LOS DOS PILARES ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#926d0a] font-bold">
            Fundamentos del Proyecto
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
            Dos Tradiciones Ancestrales de Observación Visual
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5266]">
            Conoce los principios que guiaron durante siglos la lectura geométrica del semblante y las líneas de la palma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Mian Xiang */}
          <div className="rounded-2xl border border-[#ded5c5] bg-white p-6 space-y-4 shadow-sm hover:border-[#b89028] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#ded5c5]">
                <img
                  src={scrollImg}
                  alt="Tratado Mian Xiang"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold block">
                Fisonomía Clásica China (面相)
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                Mian Xiang: Los Tres Reinos y las Doce Oficialías
              </h3>
              <p className="text-xs text-[#4b5266] leading-relaxed">
                El rostro se divide en el Cielo (juventud y mente), el Hombre (madurez y acción) y la Tierra (estabilidad y legado). Aprende a observar las proporciones de frente, nariz, ojos y mentón sin determinismos.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onNavigate('/analizar-rostro')}
                className="flex-1 py-2 px-3 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-sm transition-all text-center cursor-pointer"
              >
                Analizar Rostro Ahora
              </button>
              <button
                onClick={() => onNavigate('/mian-xiang')}
                className="py-2 px-3 text-xs font-semibold text-[#191c28] bg-[#fbf7ee] hover:bg-[#f5ecda] border border-[#ded5c5] rounded-xl transition-all cursor-pointer"
              >
                Leer Guía
              </button>
            </div>
          </div>

          {/* Card 2: Quiromancia */}
          <div className="rounded-2xl border border-[#ded5c5] bg-white p-6 space-y-4 shadow-sm hover:border-[#b89028] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#ded5c5]">
                <img
                  src={palmImg}
                  alt="Quiromancia Tradicional"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold block">
                Quiromancia Tradicional
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                Surcos y Montes: La Cartografía de la Voluntad
              </h3>
              <p className="text-xs text-[#4b5266] leading-relaxed">
                Examina con rigor las líneas del corazón, cabeza, vida y destino. Explicamos con honestidad que la línea de la vida no mide la longevidad ni predice enfermedades, recuperando su verdadero sentido poético.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onNavigate('/analizar-mano')}
                className="flex-1 py-2 px-3 text-xs font-bold text-[#191c28] bg-[#fbf7ee] hover:bg-[#f6edd8] border border-[#b89028] rounded-xl shadow-sm transition-all text-center cursor-pointer"
              >
                Analizar Mano Ahora
              </button>
              <button
                onClick={() => onNavigate('/quiromancia')}
                className="py-2 px-3 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f5ecda] border border-[#ded5c5] rounded-xl transition-all cursor-pointer"
              >
                Leer Guía
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Slot 2: Entre contenido */}
      <AdPlaceholder slot="desktop-between-content" />

      {/* ================= COMPROMISO 100% GRATUITO & PRIVACIDAD ================= */}
      <section className="rounded-2xl border-2 border-[#d4af37]/40 bg-gradient-to-r from-white via-[#fbf7ee] to-white p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#8b6508] font-mono text-xs font-bold uppercase tracking-wider">
          Compromiso Abierto y Universal
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#171923]">
          Acceso 100% Gratuito y Procesamiento Local en Navegador
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 text-xs sm:text-sm font-semibold text-[#191c28]">
          <div className="p-3 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Sin suscripciones</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Sin tarjetas</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Memoria local privada</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Informes PDF libres</span>
          </div>
        </div>
      </section>

      {/* ================= BLOG EDUCATIVO DESTACADO ================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#ded5c5] pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#926d0a] font-bold">
              Biblioteca y Ensayos
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
              Artículos Educativos Originales
            </h2>
            <p className="text-xs text-[#4b5266]">
              20 lecturas completas con rigor histórico, límites éticos y consejos de fotografía.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="flex items-center gap-1 text-xs font-bold text-[#926d0a] hover:underline cursor-pointer"
          >
            <span>Ver los 20 artículos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_ARTICLES.slice(0, 6).map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate(`/blog/${art.slug}`)}
              className="rounded-xl border border-[#ded5c5] bg-white p-5 space-y-2.5 hover:border-[#b89028] transition-all cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#fbf7ee] text-[#8b6508] font-bold border border-[#ded5c5] inline-block">
                  {art.categoryLabel}
                </span>
                <h3 className="font-editorial text-base font-bold text-[#171923] hover:text-[#926d0a] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#525970] line-clamp-2 leading-relaxed">
                  {art.metaDescription}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#6b7280] pt-2 border-t border-[#f0eae0]">
                <span>{art.readTime}</span>
                <span className="font-bold text-[#926d0a] flex items-center gap-1">
                  Leer artículo <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PREGUNTAS FRECUENTES (9 EXACTAS REQUERIDAS) ================= */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#926d0a] font-bold">
            Transparencia y Claridad
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs text-[#4b5266]">
            Resolvemos con total honestidad las dudas habituales sobre Mian Xiang, quiromancia y privacidad.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-[#ded5c5] bg-white p-4 open:border-[#b89028] transition-all shadow-sm"
            >
              <summary className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#171923] cursor-pointer list-none">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#926d0a] shrink-0" />
                  {faq.q}
                </span>
                <ChevronRight className="w-4 h-4 text-[#8b91a5] transition-transform group-open:rotate-90 shrink-0" />
              </summary>
              <div className="mt-3 pt-3 border-t border-[#f0eae0] text-xs text-[#4b5266] leading-relaxed font-normal">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* AdSense Slot 3: Pre-footer */}
      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
