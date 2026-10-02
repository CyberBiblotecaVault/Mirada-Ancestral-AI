import React, { useState } from 'react';
import { AnalysisReport, DimensionInterpretation } from '../types';
import { 
  Sparkles, Heart, Brain, Briefcase, Coins, Users, Palette, Flame, 
  FileText, Bookmark, Trash2, Download, AlertTriangle, CheckCircle2, HelpCircle,
  ScanFace, Hand, ArrowRight
} from 'lucide-react';

interface AnalysisResultsProps {
  report: AnalysisReport;
  onUpdateUserName: (name: string) => void;
  onGenerateFullReport: () => void;
  onSaveReport: () => void;
  onClearResult: () => void;
  onDeletePhotos: () => void;
  isSaved: boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  report,
  onUpdateUserName,
  onGenerateFullReport,
  onSaveReport,
  onClearResult,
  onDeletePhotos,
  isSaved
}) => {
  const [userNameInput, setUserNameInput] = useState<string>(report.userName || '');

  const getDimensionIcon = (category: string) => {
    switch (category) {
      case 'resumen': return Sparkles;
      case 'relaciones': return Heart;
      case 'pensamiento': return Brain;
      case 'trabajo': return Briefcase;
      case 'prosperidad': return Coins;
      case 'familia': return Users;
      case 'creatividad': return Palette;
      case 'cambios': return Flame;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#191c28]">
      {/* Top Banner / User Metadata Form */}
      <div className="rounded-2xl border-2 border-[#d4af37]/50 bg-gradient-to-r from-white via-[#fbf7ee] to-white p-5 sm:p-7 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#ded5c5] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#926d0a]" />
              <span>Análisis Concluido · Respuestas Tradicionales Claras</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
              Tu Informe Tradicional Personalizado
            </h2>
            <p className="text-xs text-[#4b5266] mt-0.5 font-medium">
              Fecha de examen: <span className="text-[#171923] font-bold">{report.date}</span> · Modalidad: <span className="text-[#926d0a] font-bold uppercase">{report.analysisType}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onSaveReport}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-[#191c28] border border-[#ded5c5] hover:border-[#926d0a]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>{isSaved ? 'Informe Guardado' : 'Guardar Informe'}</span>
            </button>

            <button
              onClick={onGenerateFullReport}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#0c0d12] bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] hover:brightness-105 rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>DESCARGAR PDF / VER INFORME COMPLETO</span>
            </button>
          </div>
        </div>

        {/* Optional Name Personalizer & Privacy Cleaners */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs text-[#4b5266] font-semibold whitespace-nowrap">
              Nombre para el documento (opcional):
            </label>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => {
                setUserNameInput(e.target.value);
                onUpdateUserName(e.target.value);
              }}
              placeholder="Ej: Sofía Chen"
              maxLength={40}
              className="bg-white border border-[#ded5c5] focus:border-[#926d0a] rounded-lg px-3 py-1.5 text-xs text-[#191c28] font-semibold outline-none transition-colors w-48 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#525970]">
            <button
              onClick={onDeletePhotos}
              className="flex items-center gap-1 text-[#4b5266] hover:text-amber-800 transition-colors font-medium cursor-pointer"
              title="Borra la fotografía tomada de la memoria del navegador"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Eliminar fotografía</span>
            </button>
            <span>·</span>
            <button
              onClick={onClearResult}
              className="text-[#4b5266] hover:text-rose-700 transition-colors font-medium cursor-pointer"
            >
              Borrar resultado
            </button>
          </div>
        </div>
      </div>

      {/* Captured Photos Preview Strip (if photos exist) */}
      {(report.capturedFaceImage || report.capturedHandImage) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded5c5] space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#926d0a] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Fotografías en Memoria Local (Incluidas en el PDF)
            </span>
            <span className="text-[11px] text-[#6b7280] font-medium">Procesadas 100% en tu dispositivo</span>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {report.capturedFaceImage && (
              <div className="flex items-center gap-3 bg-[#fbf7ee] p-2.5 rounded-xl border border-[#ded5c5] shadow-sm">
                <img
                  src={report.capturedFaceImage}
                  alt="Rostro analizado"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-[#d4af37]"
                />
                <div>
                  <span className="text-xs font-bold text-[#171923] block flex items-center gap-1">
                    <ScanFace className="w-3.5 h-3.5 text-[#926d0a]" />
                    Rostro Analizado
                  </span>
                  <span className="text-[11px] text-[#4b5266] block font-medium">Mian Xiang (San Ting)</span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">✓ Listo para exportar en PDF</span>
                </div>
              </div>
            )}

            {report.capturedHandImage && (
              <div className="flex items-center gap-3 bg-[#fbf7ee] p-2.5 rounded-xl border border-[#ded5c5] shadow-sm">
                <img
                  src={report.capturedHandImage}
                  alt="Mano analizada"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-[#d4af37]"
                />
                <div>
                  <span className="text-xs font-bold text-[#171923] block flex items-center gap-1">
                    <Hand className="w-3.5 h-3.5 text-[#926d0a]" />
                    Palma Analizada ({report.selectedHand === 'left' ? 'Izquierda' : 'Derecha'})
                  </span>
                  <span className="text-[11px] text-[#4b5266] block font-medium">Quiromancia Tradicional</span>
                  <span className="text-[10px] text-emerald-700 font-bold mt-0.5 block">✓ Listo para exportar en PDF</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dominant Element & San Ting Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded5c5] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#926d0a] font-bold">
            Elemento Simbólico Predominante (Wu Xing)
          </span>
          <h4 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
            Arquetipo de {report.dominantElement}
          </h4>
          <p className="text-xs text-[#4b5266] mt-1 max-w-2xl leading-relaxed font-medium">
            {report.elementDescription}
          </p>
        </div>

        {report.analysisType !== 'hand' && (
          <div className="flex items-center gap-2.5 text-center shrink-0">
            <div className="p-2.5 px-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[10px] text-[#6b7280] block font-semibold">Cielo</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">
                {report.sanTingProportions.cielo}%
              </span>
            </div>
            <div className="p-2.5 px-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[10px] text-[#6b7280] block font-semibold">Humano</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">
                {report.sanTingProportions.hombre}%
              </span>
            </div>
            <div className="p-2.5 px-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[10px] text-[#6b7280] block font-semibold">Tierra</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">
                {report.sanTingProportions.tierra}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* The 8 Dimension Cards with Explicit Direct Questions and Answers */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ded5c5] pb-3">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#171923]">
              Respuestas Claras por Dimensión de Vida
            </h3>
            <p className="text-xs text-[#4b5266] font-medium">
              Interpretaciones tradicionales directas con preguntas cotidianas sobre amor, hijos, finanzas y trabajo.
            </p>
          </div>
          <button
            onClick={onGenerateFullReport}
            className="text-xs font-bold text-[#926d0a] hover:underline flex items-center gap-1 self-start sm:self-center cursor-pointer"
          >
            <span>Ver formato informe imprimible</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.dimensions.map((dim) => {
            const Icon = getDimensionIcon(dim.category);
            return (
              <div
                key={dim.id}
                className="group rounded-2xl border border-[#ded5c5] hover:border-[#b89028] bg-white p-5 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Title & Tone */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5] group-hover:bg-[#f6ecda] transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-editorial text-xl font-bold text-[#171923]">
                          {dim.title}
                        </h4>
                        <span className="text-[11px] text-[#6b7280] block font-medium">
                          Rasgo analizado: <strong className="text-[#374151] font-semibold">{dim.analyzedFeature}</strong>
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#fbf7ee] text-[#8b6508] border border-[#ded5c5] font-bold">
                      {dim.energyTone}
                    </span>
                  </div>

                  {/* Highlighted Direct Question & Verdict Box */}
                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#ded5c5] space-y-2">
                    <div className="flex items-start gap-1.5 text-xs text-[#4b5266]">
                      <HelpCircle className="w-4 h-4 text-[#926d0a] shrink-0 mt-0.5" />
                      <span className="font-bold text-[#171923]">{dim.question}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#e5dccf]">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs tracking-wide shadow-sm">
                        {dim.directVerdict}
                      </span>
                      <span className="text-xs font-bold text-[#171923]">
                        {dim.verdictLabel}
                      </span>
                    </div>

                    {/* Direct plain explanation */}
                    <p className="text-xs text-[#2a2f3f] leading-relaxed bg-white p-3 rounded-lg border border-[#e2d8c6] font-medium">
                      <strong className="text-[#926d0a] font-bold block mb-0.5">Explicación Clara:</strong>
                      {dim.directExplanation}
                    </p>
                  </div>

                  {/* Classical Traditional Context */}
                  <div className="space-y-1.5 text-xs text-[#4b5266] leading-relaxed font-medium">
                    <p className="text-[11px] text-[#4b5266]">
                      <strong className="text-[#171923]">Fundamento tradicional:</strong> {dim.traditionalInterpretation}
                    </p>
                    {dim.advice && (
                      <p className="text-[11px] text-emerald-950 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                        <strong className="text-emerald-800 font-bold">Consejo oriental:</strong> {dim.advice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Cultural Caveat */}
                <div className="mt-3 pt-3 border-t border-[#ded5c5] text-[11px] text-amber-950 bg-amber-50/80 p-2 rounded-lg flex items-start gap-2 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-700 mt-0.5" />
                  <span>{dim.culturalCaveat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA to generate the complete multi-page document */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white via-[#fbf7ee] to-white border-2 border-[#d4af37]/50 text-center space-y-3.5 shadow-md">
        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
          ¿Deseas descargar el informe completo con las fotos de tu rostro y manos?
        </h4>
        <p className="text-xs text-[#4b5266] max-w-lg mx-auto font-medium">
          Genera un documento profesional con las imágenes integradas, respuestas claras a cada pregunta, proporciones San Ting y conclusiones tradicionales para guardar en PDF o Word.
        </p>
        <button
          onClick={onGenerateFullReport}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          DESCARGAR PDF CON FOTOS Y RESPUESTAS COMPLETAS
        </button>
      </div>
    </div>
  );
};
