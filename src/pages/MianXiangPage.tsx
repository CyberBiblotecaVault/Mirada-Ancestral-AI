import React from 'react';
import { Compass, ScanFace, Sparkles, BookOpen, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';
import scrollImg from '../assets/images/mian_xiang_scroll_1790690379362.jpg';

interface MianXiangPageProps {
  onNavigate: (path: string) => void;
}

export const MianXiangPage: React.FC<MianXiangPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fade-in text-[#191c28] py-2 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="rounded-3xl border border-[#ded5c5] bg-gradient-to-r from-white via-[#fbf7ee] to-white p-6 sm:p-10 shadow-sm text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 text-xs font-semibold text-[#8b6508]">
          <Compass className="w-3.5 h-3.5 text-[#926d0a]" />
          <span>Fisiognomía Tradicional China</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171923]">
          Mian Xiang (面相): El Rostro como Microcosmos
        </h1>
        <p className="text-xs sm:text-sm text-[#4b5266] max-w-2xl mx-auto leading-relaxed">
          Conoce la filosofía, la división de los Tres Reinos (San Ting) y el canon de los Doce Palacios en la fisonomía tradicional china.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/analizar-rostro')}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <ScanFace className="w-4 h-4" />
            <span>Probar Herramienta de Rostro</span>
          </button>
        </div>
      </div>

      {/* Main Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          <section className="space-y-3 bg-white p-6 rounded-2xl border border-[#ded5c5] shadow-sm">
            <h2 className="font-editorial text-2xl font-bold text-[#171923]">
              1. La Trinidad del Semblante: San Ting (三停)
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5266] leading-relaxed">
              La regla dorada del Mian Xiang divide el rostro verticalmente en tres proporciones simétricas:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
                <strong className="text-[#171923] text-xs block">Shang Ting (上停) · El Reino del Cielo (15 a 30 años)</strong>
                <p className="text-xs text-[#525970] mt-0.5">
                  De la raíz del cabello a la línea de las cejas. Simboliza los orígenes familiares, la educación temprana y la imaginación filosófica.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
                <strong className="text-[#171923] text-xs block">Zhong Ting (中停) · El Reino Humano (31 a 50 años)</strong>
                <p className="text-xs text-[#525970] mt-0.5">
                  De las cejas a la base de la nariz. Simboliza la madurez activa, la gestión de recursos, las responsabilidades sociales y la perseverancia.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
                <strong className="text-[#171923] text-xs block">Xia Ting (下停) · El Reino de la Tierra (51 años en adelante)</strong>
                <p className="text-xs text-[#525970] mt-0.5">
                  De la base nasal al mentón. Simboliza la estabilidad en el retiro, el arraigo y el legado moral hacia los descendientes.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-[#ded5c5] shadow-sm">
            <h2 className="font-editorial text-2xl font-bold text-[#171923]">
              2. Los Doce Palacios de la Vida (Shi Er Gong)
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5266] leading-relaxed">
              Sobre los Tres Reinos, el tratado Shen Xiang Quan Bian mapea doce sectores con correspondencias alegóricas:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#333a4c] pt-2">
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Yin Tang (印堂):</strong> Palacio del Destino entre las cejas.
              </li>
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Cai Bo Guan (財帛):</strong> Palacio de los Recursos en la nariz.
              </li>
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Xiong Di Guan (兄弟):</strong> Palacio de Amigos y Hermanos en las cejas.
              </li>
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Fu Mu Guan (父母):</strong> Palacio de los Padres en la frente.
              </li>
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Qi Qie Guan (妻妾):</strong> Palacio Conyugal en las sienes.
              </li>
              <li className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
                <strong>Nan Nü Guan (男女):</strong> Palacio de la Descendencia bajo los párpados.
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[#ded5c5] bg-white p-5 space-y-3 shadow-sm">
            <img
              src={scrollImg}
              alt="Mian Xiang clásico"
              className="w-full aspect-[4/3] rounded-xl object-cover border border-[#ded5c5]"
            />
            <span className="text-[10px] font-mono uppercase text-[#926d0a] font-bold block">
              Tratado Clásico de Referencia
            </span>
            <h3 className="font-editorial text-lg font-bold text-[#171923]">
              Shen Xiang Quan Bian (神相全編)
            </h3>
            <p className="text-xs text-[#525970] leading-relaxed">
              Compilado en la dinastía Song, es la obra canónica que sintetizó mil años de fisonomía oriental bajo principios taoístas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>Aviso de Rigor</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              El Mian Xiang es una cosmovisión filosófica tradicional. No constituye evaluación psicológica de personalidad ni diagnóstico médico.
            </p>
          </div>
        </div>
      </div>

      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
