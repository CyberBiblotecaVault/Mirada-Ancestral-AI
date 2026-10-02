import React from 'react';
import { AnalysisReport } from '../types';
import { exportToWordDoc, exportToPrintablePdf, downloadHtmlReport } from '../utils/reportExporter';
import { 
  X, Printer, Download, Bookmark, ShieldAlert, Sparkles, 
  Compass, Hand, Check, ScanFace, HelpCircle, CheckCircle2, FileCode 
} from 'lucide-react';

interface FullReportModalProps {
  report: AnalysisReport;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export const FullReportModal: React.FC<FullReportModalProps> = ({
  report,
  isOpen,
  onClose,
  onSave,
  isSaved
}) => {
  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    exportToPrintablePdf(report);
  };

  const handleDownloadHtml = () => {
    downloadHtmlReport(report);
  };

  const handleDownloadWord = () => {
    exportToWordDoc(report);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-2 sm:p-4 md:p-6 flex justify-center animate-fade-in report-modal-wrapper">
      <div className="relative w-full max-w-4xl bg-white text-[#191c28] rounded-2xl border-2 border-[#d4af37]/60 shadow-2xl overflow-hidden flex flex-col my-auto report-modal-card">
        {/* Sticky Action Toolbar (Hidden in Print) */}
        <div className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2.5 border-b border-[#ded5c5] bg-[#faf7f0]/95 px-4 sm:px-6 py-3 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-brand font-bold text-sm tracking-wider text-[#926d0a]">
              MIRADA ANCESTRAL AI
            </span>
            <span className="text-xs text-[#525970] font-medium">· Expediente Tradicional</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Abre el cuadro de diálogo para Imprimir o Guardar como PDF con fotos"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IMPRIMIR / PDF CON FOTOS</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#b89028] rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Descargar archivo HTML completo con fotos integradas en base64"
            >
              <FileCode className="w-3.5 h-3.5 text-[#926d0a]" />
              <span className="hidden sm:inline">DESCARGAR</span> ARCHIVO (.HTML)
            </button>

            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Descargar documento compatible con Word y Google Docs"
            >
              <Download className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>WORD (.DOC)</span>
            </button>

            <button
              onClick={onSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer shadow-sm ${
                isSaved 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                  : 'border-[#ded5c5] bg-white text-[#191c28] hover:border-[#b89028]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#5a6275] hover:text-[#171923] rounded-lg hover:bg-[#ece5d8] transition-colors ml-2 cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Printable Document Container */}
        <div className="print-container p-6 sm:p-10 md:p-12 space-y-10 bg-white text-[#191c28] relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none rotate-[-30deg]">
            <span className="font-brand text-6xl md:text-8xl font-bold tracking-widest text-center text-[#926d0a] whitespace-nowrap">
              MIRADA ANCESTRAL AI · CULTURA Y TRADICIÓN
            </span>
          </div>

          {/* ================= 1. PORTADA ================= */}
          <div className="text-center border-b-2 border-[#d4af37] pb-8 pt-4">
            <div className="inline-block p-2.5 rounded-full border border-[#d4af37] mb-3 bg-[#fdfaf3]">
              <Compass className="w-8 h-8 text-[#926d0a]" />
            </div>
            <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-[#171923]">
              MIRADA ANCESTRAL AI
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#926d0a] mt-1 font-semibold">
              Rostro • Manos • Tradición Oriental
            </p>
            <p className="text-xs uppercase tracking-widest text-[#525970] mt-1 font-semibold">
              "Descubre los símbolos que cuentan una historia."
            </p>

            {/* Metadata Table */}
            <div className="mt-8 max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] text-xs shadow-sm">
              <div>
                <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Consultante</span>
                <span className="font-bold text-[#171923] block truncate">
                  {report.userName || 'Viajero Cultural'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Fecha</span>
                <span className="font-bold text-[#171923] block">
                  {report.date.split(',')[0]}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Modalidad</span>
                <span className="font-bold text-[#926d0a] uppercase block">
                  {report.analysisType}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Arquetipo Wu Xing</span>
                <span className="font-bold text-[#926d0a] block">
                  {report.dominantElement}
                </span>
              </div>
            </div>

            {/* Cultural Notice Box */}
            <div className="mt-6 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs text-left flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong>Aviso Cultural y de Entretenimiento:</strong> Este informe recopila interpretaciones derivadas de la fisonomía tradicional china (Mian Xiang 面相) y la quiromancia clásica. Las interpretaciones no constituyen evaluaciones científicas, diagnósticos de salud, perfiles psicológicos ni predicciones del destino.
              </p>
            </div>
          </div>

          {/* ================= 2. FOTOGRAFÍAS REALES DEL ANÁLISIS ================= */}
          {(report.capturedFaceImage || report.capturedHandImage) && (
            <div className="space-y-4 print-page-break">
              <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2 flex items-center justify-between">
                <span>Fotografías Procesadas en el Análisis</span>
                <span className="text-xs font-semibold text-emerald-700">✓ 100% Memoria Local del Navegador</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
                {report.capturedFaceImage && (
                  <div className="flex flex-col items-center p-4 bg-[#fbf7ee] rounded-2xl border border-[#ded5c5] shadow-sm">
                    <div className="w-full max-w-[260px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#d4af37] bg-white shadow-md">
                      <img
                        src={report.capturedFaceImage}
                        alt="Fotografía del Rostro Analizado"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#171923] mt-2 flex items-center gap-1">
                      <ScanFace className="w-3.5 h-3.5 text-[#926d0a]" />
                      Rostro Analizado (Mian Xiang 面相)
                    </span>
                    <span className="text-[10px] text-[#525970] font-medium">
                      Extracción de proporciones San Ting (Cielo, Humano, Tierra)
                    </span>
                  </div>
                )}

                {report.capturedHandImage && (
                  <div className="flex flex-col items-center p-4 bg-[#fbf7ee] rounded-2xl border border-[#ded5c5] shadow-sm">
                    <div className="w-full max-w-[260px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#d4af37] bg-white shadow-md">
                      <img
                        src={report.capturedHandImage}
                        alt="Fotografía de la Mano Analizada"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#171923] mt-2 flex items-center gap-1">
                      <Hand className="w-3.5 h-3.5 text-[#926d0a]" />
                      Palma Analizada ({report.selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})
                    </span>
                    <span className="text-[10px] text-[#525970] font-medium">
                      Segmentación de líneas de corazón, cabeza, vida y montes
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= 3. SÍNTESIS GENERAL ================= */}
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
              1. Resumen General y Síntesis Simbólica
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#333a4c] leading-relaxed font-medium">
              <p className="bg-[#fbf7ee] p-4 rounded-xl border border-[#ded5c5] text-[#191c28]">
                {report.generalSynthesis}
              </p>
              <p className="text-xs text-[#525970]">
                {report.elementDescription}
              </p>
            </div>
          </div>

          {/* ================= 4. MAPA DEL ROSTRO & SAN TING ================= */}
          {report.analysisType !== 'hand' && (
            <div className="space-y-4 print-page-break">
              <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
                2. Geometría Facial y San Ting (三停)
              </h2>

              <p className="text-xs text-[#525970] font-medium">
                En la tradición clásica del Shen Xiang Quan Bian, el rostro se divide en tres reinos proporcionales que representan simbólicamente las tres etapas y facetas del ser humano:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] shadow-sm">
                  <span className="text-[10px] text-[#926d0a] font-mono font-bold block">Shang Ting (Cielo)</span>
                  <span className="font-editorial text-lg font-bold text-[#171923] block mt-0.5">
                    Frente y Raíces: {report.sanTingProportions.cielo}%
                  </span>
                  <p className="text-[11px] text-[#525970] mt-1 font-medium">
                    Juventud, aprendizaje y entorno familiar temprano.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] shadow-sm">
                  <span className="text-[10px] text-[#926d0a] font-mono font-bold block">Zhong Ting (Humano)</span>
                  <span className="font-editorial text-lg font-bold text-[#171923] block mt-0.5">
                    Nariz y Pómulos: {report.sanTingProportions.hombre}%
                  </span>
                  <p className="text-[11px] text-[#525970] mt-1 font-medium">
                    Madurez activa, relaciones sociales y administración de recursos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] shadow-sm">
                  <span className="text-[10px] text-[#926d0a] font-mono font-bold block">Xia Ting (Tierra)</span>
                  <span className="font-editorial text-lg font-bold text-[#171923] block mt-0.5">
                    Boca y Mentón: {report.sanTingProportions.tierra}%
                  </span>
                  <p className="text-[11px] text-[#525970] mt-1 font-medium">
                    Etapa posterior de vida, estabilidad y legado hacia las generaciones futuras.
                  </p>
                </div>
              </div>

              {/* Table of the facial zones */}
              <div className="overflow-x-auto rounded-xl border border-[#ded5c5] shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#fbf7ee] text-[#926d0a] font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5 border-b border-[#ded5c5]">Zona / Oficialía</th>
                      <th className="p-2.5 border-b border-[#ded5c5]">Nombre Tradicional</th>
                      <th className="p-2.5 border-b border-[#ded5c5]">Interpretación Simbólica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded5c5] text-[#333a4c]">
                    {report.selectedFacialZones.slice(0, 8).map(z => (
                      <tr key={z.id} className="hover:bg-[#faf6ee]">
                        <td className="p-2.5 font-bold text-[#171923] whitespace-nowrap">{z.name}</td>
                        <td className="p-2.5 font-serif italic text-[#8b6508] font-bold whitespace-nowrap">{z.traditionalName}</td>
                        <td className="p-2.5 text-[11px] text-[#4b5266]">{z.symbolicInterpretation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 3. QUIROMANCIA & LÍNEAS ================= */}
          {report.analysisType !== 'face' && (
            <div className="space-y-4 print-page-break">
              <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
                3. Cartografía Palmar: Líneas y Montes
              </h2>

              <p className="text-xs text-[#525970] font-medium">
                Análisis de la {report.selectedHand === 'left' ? 'Mano Izquierda (potencial heredado)' : 'Mano Derecha (trayectoria activa)'}:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {report.selectedHandLines.map(line => (
                  <div key={line.id} className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#171923] text-sm">{line.name}</span>
                      <span className="text-[10px] text-[#926d0a] font-mono font-bold">{line.symbolicTitle}</span>
                    </div>
                    <p className="text-[#333a4c] text-[11px] leading-relaxed font-medium">
                      {line.traditionalInterpretation}
                    </p>
                    <p className="text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200">
                      {line.culturalCaveat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. LAS 8 DIMENSIONES CON PREGUNTAS Y VEREDICTOS DIRECTOS ================= */}
          <div className="space-y-4 print-page-break">
            <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
              4. Respuestas Claras y Veredictos Tradicionales (Hijos, Finanzas, Amor, Trabajo)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.dimensions.map(dim => (
                <div key={dim.id} className="p-4 rounded-xl bg-white border border-[#ded5c5] space-y-2 text-xs shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#171923] text-sm">{dim.title}</h3>
                    <span className="text-[10px] font-mono text-[#8b6508] font-bold px-2 py-0.5 rounded bg-[#fbf7ee] border border-[#ded5c5]">
                      {dim.energyTone}
                    </span>
                  </div>

                  {/* Direct Question and Verdict */}
                  <div className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                    <div className="text-[11px] text-[#4b5266] font-semibold">
                      <strong>Pregunta:</strong> {dim.question}
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-extrabold text-[11px] border border-emerald-300">
                        {dim.directVerdict}
                      </span>
                      <span className="text-[11px] font-bold text-[#171923]">
                        {dim.verdictLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#191c28] pt-1 bg-white p-2 rounded border border-[#e8dfd0]">
                      <strong>Explicación Clara:</strong> {dim.directExplanation}
                    </p>
                  </div>

                  <p className="text-[#4b5266] text-[11px] leading-relaxed font-medium">
                    <strong>Fundamento:</strong> {dim.traditionalInterpretation}
                  </p>

                  {dim.advice && (
                    <p className="text-[10px] text-emerald-950 bg-emerald-50 p-2 rounded border border-emerald-200">
                      <strong>Consejo:</strong> {dim.advice}
                    </p>
                  )}

                  <p className="text-[10px] text-amber-950 bg-amber-50 p-2 rounded border border-amber-200">
                    {dim.culturalCaveat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 5. CONCLUSIONES & CIERRE ================= */}
          <div className="space-y-3 pt-4 border-t border-[#ded5c5] text-xs leading-relaxed text-[#4b5266] font-medium">
            <h3 className="font-editorial text-lg font-bold text-[#171923]">
              Conclusiones Tradicionales y Reflexión Cultural
            </h3>
            <p>
              En la cosmovisión oriental, los rasgos físicos y palmares nunca fueron concebidos como sentencias inmutables. El proverbio clásico del Mian Xiang recuerda: <em>"La mente engendra la apariencia; transformando la mente, el semblante se armoniza"</em> (有心無相，相逐心生). El verdadero destino de una persona se construye a través de la educación constante, la benevolencia en los actos y la templanza interior.
            </p>
            <p className="text-[11px] italic text-[#6b7280]">
              Este informe ha sido generado de manera 100% gratuita por Mirada Ancestral AI como un homenaje cultural a la rica literatura de fisonomía y quiromancia.
            </p>
          </div>

          {/* ================= 6. FOOTER DE DOCUMENTO ================= */}
          <div className="text-center pt-8 border-t border-[#ded5c5] text-xs text-[#6b7280] space-y-1">
            <p className="font-brand font-bold text-[#926d0a]">
              MIRADA ANCESTRAL AI · Tradición milenaria. Tecnología moderna.
            </p>
            <p>
              © 2026 Gustavo Gómez. Todos los derechos reservados. Proyecto independiente.
            </p>
            <p className="text-[10px] text-[#8b91a5]">
              Código de verificación ética: MA-{report.id.replace('rep-', '')} · Procesado localmente en navegador web.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
