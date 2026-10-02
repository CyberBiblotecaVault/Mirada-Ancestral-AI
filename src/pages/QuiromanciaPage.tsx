import React from 'react';
import { Hand, Sparkles, Heart, Brain, Sprout, Star, Sun, ShieldAlert, ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';
import palmImg from '../assets/images/palmistry_hand_art_1790690364298.jpg';

interface QuiromanciaPageProps {
  onNavigate: (path: string) => void;
}

export const QuiromanciaPage: React.FC<QuiromanciaPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fade-in text-[#191c28] py-2 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#ded5c5] bg-gradient-to-r from-white via-[#fbf7ee] to-white p-6 sm:p-10 shadow-sm text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 text-xs font-semibold text-[#8b6508]">
          <Hand className="w-3.5 h-3.5 text-[#926d0a]" />
          <span>Quirología y Tradición Palmar</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171923]">
          Quiromancia Tradicional: El Mapa de la Voluntad
        </h1>
        <p className="text-xs sm:text-sm text-[#4b5266] max-w-2xl mx-auto leading-relaxed">
          Un recorrido histórico y pedagógico por los pliegues de la palma humana, desmintiendo mitos alarmistas y recuperando su verdadero significado simbólico.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/analizar-mano')}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Hand className="w-4 h-4" />
            <span>Probar Herramienta de Mano</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          {/* Anatomía y Verdad Científica */}
          <section className="space-y-3 bg-white p-6 rounded-2xl border border-[#ded5c5] shadow-sm">
            <h2 className="font-editorial text-2xl font-bold text-[#171923]">
              1. La Realidad Anatómica de las Líneas
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5266] leading-relaxed">
              Biológicamente, las líneas de la mano son <strong>pliegues de flexión palmar</strong>. Se desarrollan en el embrión alrededor de la semana 12 de gestación y permiten que la piel se comprima y doble sin desgarrarse al sujetar herramientas o estrechar una mano.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
              <strong>Aclaración ética fundamental:</strong> Las líneas no son cables mágicos conectados al futuro. La longitud de la línea de la vida <em>jamás</em> indica cuántos años vivirá una persona ni predice enfermedades.
            </div>
          </section>

          {/* Las Cinco Líneas Clásicas */}
          <section className="space-y-4 bg-white p-6 rounded-2xl border border-[#ded5c5] shadow-sm">
            <h2 className="font-editorial text-2xl font-bold text-[#171923]">
              2. El Simbolismo de las Cinco Grandes Líneas
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600" />
                  Línea del Corazón
                </span>
                <p className="text-xs text-[#4b5266]">
                  Pliegue horizontal superior. Simboliza en la tradición la empatía, el cuidado en los vínculos de pareja y la expresión afectiva.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-blue-600" />
                  Línea de la Cabeza
                </span>
                <p className="text-xs text-[#4b5266]">
                  Pliegue medio transversal. Evoca el método de pensamiento: la rectitud simboliza pragmatismo; la curvatura hacia abajo, imaginación y creatividad.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  Línea de la Vida
                </span>
                <p className="text-xs text-[#4b5266]">
                  Curva que rodea el pulgar. Representa el vigor vital cotidiano y el arraigo. No mide la duración cronológica de la vida.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-600" />
                  Línea del Destino (Saturno)
                </span>
                <p className="text-xs text-[#4b5266]">
                  Trazo vertical hacia el dedo medio. Simboliza la autodisciplina y las metas profesionales que se trazan conscientemente.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-orange-500" />
                  Línea del Sol (Apolo)
                </span>
                <p className="text-xs text-[#4b5266]">
                  Trazo hacia el anular. Simboliza el deleite por la belleza artística, el brillo interior y el aprecio sincero de la comunidad.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[#ded5c5] bg-white p-5 space-y-3 shadow-sm">
            <img
              src={palmImg}
              alt="Quiromancia tradicional"
              className="w-full aspect-[4/3] rounded-xl object-cover border border-[#ded5c5]"
            />
            <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold block">
              Cartografía Tradicional
            </span>
            <h3 className="font-editorial text-lg font-bold text-[#171923]">
              Mano Izquierda vs. Mano Derecha
            </h3>
            <p className="text-xs text-[#525970] leading-relaxed">
              La mano no dominante refleja el equipaje heredado; la mano dominante refleja las decisiones, hábitos y aprendizajes forjados por la voluntad del individuo.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
