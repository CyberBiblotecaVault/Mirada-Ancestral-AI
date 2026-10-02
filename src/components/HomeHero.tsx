import React from 'react';
import { ScanFace, Hand, Upload, BookOpen, FileText, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_mian_xiang_facial_1790690351591.jpg';
import palmImg from '../assets/images/palmistry_hand_art_1790690364298.jpg';
import scrollImg from '../assets/images/mian_xiang_scroll_1790690379362.jpg';
import mountsImg from '../assets/images/palmar_mounts_chart_1790690391686.jpg';

interface HomeHeroProps {
  onAnalyzeFace: () => void;
  onAnalyzeHands: () => void;
  onUploadPhoto: () => void;
  onLearnTradition: () => void;
  onViewReports: () => void;
  onOpenPrivacyNotice: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onAnalyzeFace,
  onAnalyzeHands,
  onUploadPhoto,
  onLearnTradition,
  onViewReports,
  onOpenPrivacyNotice
}) => {
  return (
    <div className="space-y-12 py-4 sm:py-6 text-[#191c28]">
      {/* ================= HERO SECTION (LUMINOUS LIGHT EDITORIAL) ================= */}
      <section className="relative overflow-hidden rounded-3xl border border-[#e2d8c6] bg-gradient-to-b from-[#ffffff] via-[#fbf8f2] to-[#f5efe5] p-6 sm:p-10 lg:p-12 shadow-lg">
        {/* Subtle decorative golden ambient radial glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#d4af37]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Big CTAs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-[#ffffff] px-3.5 py-1 text-xs font-semibold text-[#8b6508] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>Rostro • Manos • Tradición Oriental</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-[#171923] leading-[1.1]">
                MIRADA ANCESTRAL <span className="text-[#926d0a]">AI</span>
              </h1>
              <h2 className="font-editorial text-xl sm:text-2xl text-[#926d0a] font-semibold italic">
                Explora las antiguas tradiciones de interpretación del rostro y las manos
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#42485c] leading-relaxed max-w-xl font-normal">
              "Una experiencia digital inspirada en tradiciones orientales de fisonomía y quiromancia. Utiliza tu cámara o una fotografía para explorar símbolos y conceptos tradicionales."
            </p>

            {/* The 5 Big Requested Buttons with High Contrast & Readability */}
            <div className="pt-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={onAnalyzeFace}
                  className="flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] font-bold text-sm text-[#0c0d12] shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-xl">📷</span>
                  <span className="tracking-wide">ANALIZAR MI ROSTRO</span>
                </button>

                <button
                  onClick={onAnalyzeHands}
                  className="flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-[#ffffff] border-2 border-[#b89028] hover:border-[#8e6b12] font-bold text-sm text-[#191c28] shadow-md hover:bg-[#faf6ee] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-xl">✋</span>
                  <span className="tracking-wide">ANALIZAR MIS MANOS</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={onUploadPhoto}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#ffffff] border border-[#d6ccbc] hover:border-[#b89028] text-xs font-semibold text-[#1e2230] hover:bg-[#f6f2ea] shadow-sm transition-colors cursor-pointer"
                >
                  <span>📸</span>
                  <span>SUBIR FOTOGRAFÍA</span>
                </button>

                <button
                  onClick={onLearnTradition}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#ffffff] border border-[#d6ccbc] hover:border-[#b89028] text-xs font-semibold text-[#1e2230] hover:bg-[#f6f2ea] shadow-sm transition-colors cursor-pointer"
                >
                  <span>📚</span>
                  <span>APRENDER SOBRE LA TRADICIÓN</span>
                </button>

                <button
                  onClick={onViewReports}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#ffffff] border border-[#d6ccbc] hover:border-[#b89028] text-xs font-semibold text-[#1e2230] hover:bg-[#f6f2ea] shadow-sm transition-colors cursor-pointer"
                >
                  <span>📄</span>
                  <span>VER MIS INFORMES</span>
                </button>
              </div>
            </div>

            {/* Cultural & Privacy Safeguard inline */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-[#525970]">
              <Shield className="w-4 h-4 text-[#926d0a] shrink-0" />
              <span>
                Procesamiento local confidencial. Fines culturales y de entretenimiento.
              </span>
            </div>
          </div>

          {/* Right Visual Marquee: Curatorial Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-xl group bg-white">
              <img
                src={heroImg}
                alt="Mirada Ancestral Mian Xiang"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5ebd7] font-semibold">
                  Canon Clásico · Shen Xiang Quan Bian
                </span>
                <span className="font-editorial text-lg text-white font-semibold">
                  Mian Xiang (面相) & Quiromancia Oriental
                </span>
                <span className="text-[11px] text-[#e0e2ec] mt-0.5">
                  La contemplación del ser a través de los símbolos de la armonía.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 100% GRATIS SECTION ================= */}
      <section className="rounded-2xl border-2 border-[#d4af37]/40 bg-gradient-to-r from-[#ffffff] via-[#fbf7ee] to-[#ffffff] p-6 sm:p-8 text-center space-y-4 shadow-md text-[#191c28]">
        <div className="inline-block px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#8b6508] font-mono text-xs font-bold uppercase tracking-widest">
          Compromiso Abierto
        </div>

        <h3 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#171923]">
          100% GRATIS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto pt-2 text-xs sm:text-sm font-semibold text-[#1c1e28]">
          <div className="p-3.5 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Sin suscripción</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Sin tarjeta</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Sin prueba limitada</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#ded5c5] flex flex-col items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Sin pago obligatorio</span>
          </div>
        </div>

        <p className="text-xs text-[#525970] max-w-lg mx-auto pt-2 font-medium">
          Diseñado como una obra educativa y cultural de libre acceso para todo viajero interesado en el patrimonio de Oriente.
        </p>
      </section>

      {/* ================= CULTURAL HIGHLIGHTS GRID ================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#926d0a] font-bold">
            Los Dos Pilares Tradicionales
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
            La Sabiduría del Rostro y el Lenguaje de las Manos
          </h3>
          <p className="text-xs sm:text-sm text-[#4b5266]">
            Descubre cómo las escuelas clásicas organizaron la lectura de proporciones, oficiales celestes y surcos palmares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Mian Xiang */}
          <div className="group rounded-2xl border border-[#ded5c5] bg-white p-5 sm:p-6 space-y-4 hover:border-[#b89028] transition-all flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#e0d6c6]">
                <img
                  src={scrollImg}
                  alt="Tratado Mian Xiang"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold">
                Fisonomía Clásica China
              </span>
              <h4 className="font-editorial text-xl font-bold text-[#171923]">
                Mian Xiang (面相): Las Tres Eras y Doce Oficialías
              </h4>
              <p className="text-xs text-[#4b5266] leading-relaxed">
                El rostro se concibe como un microcosmos dividido en los Tres Reinos (San Ting): Cielo (Shang Ting), Humano (Zhong Ting) y Tierra (Xia Ting). Cada oficialía simboliza aspectos como la receptividad, la tenacidad o la administración de los propios talentos.
              </p>
            </div>
            <button
              onClick={onAnalyzeFace}
              className="w-full py-2.5 px-4 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <ScanFace className="w-4 h-4" />
              Explorar Fisonomía Facial
            </button>
          </div>

          {/* Card 2: Palmistry */}
          <div className="group rounded-2xl border border-[#ded5c5] bg-white p-5 sm:p-6 space-y-4 hover:border-[#b89028] transition-all flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#e0d6c6]">
                <img
                  src={palmImg}
                  alt="Quiromancia Tradicional"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold">
                Quiromancia Tradicional
              </span>
              <h4 className="font-editorial text-xl font-bold text-[#171923]">
                Surcos y Montes: El Mapa de la Voluntad
              </h4>
              <p className="text-xs text-[#4b5266] leading-relaxed">
                Las líneas del corazón, cabeza, vida y destino se interpretan como alegorías de emociones, discernimiento y cambios de rumbo. La mano izquierda evoca el punto de partida; la mano derecha refleja el camino conscientemente trazado.
              </p>
            </div>
            <button
              onClick={onAnalyzeHands}
              className="w-full py-2.5 px-4 text-xs font-bold text-[#191c28] bg-[#fbf7ee] hover:bg-[#f6edd8] border border-[#b89028] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Hand className="w-4 h-4 text-[#926d0a]" />
              Explorar Líneas Palmares
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRIVACY PROMISE ================= */}
      <section className="rounded-2xl border border-[#ded5c5] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#926d0a]">
            <Shield className="w-4 h-4" />
            <span>🔐 COMPROMISO INQUEBRANTABLE DE PRIVACIDAD</span>
          </div>
          <h4 className="font-editorial text-xl font-bold text-[#171923]">
            Tus fotografías nunca abandonan tu dispositivo
          </h4>
          <p className="text-xs text-[#4b5266] leading-relaxed">
            Las fotografías utilizadas para el análisis se procesan localmente en el navegador. La aplicación no almacena imágenes personales en servidores en la nube sin autorización explícita.
          </p>
        </div>

        <button
          onClick={onOpenPrivacyNotice}
          className="px-4 py-2 text-xs font-semibold text-[#1e2230] bg-[#f7f4ee] hover:bg-[#ede5d6] border border-[#d6ccbc] rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-sm"
        >
          Ver Protocolo de Seguridad
        </button>
      </section>
    </div>
  );
};
