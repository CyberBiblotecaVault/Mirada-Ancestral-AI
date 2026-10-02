import React from 'react';
import { AnalysisReport } from '../types';
import { FileText, Calendar, Eye, Download, Trash2, PlusCircle, Sparkles } from 'lucide-react';
import { exportToWordDoc } from '../utils/reportExporter';

interface SavedReportsSectionProps {
  savedReports: AnalysisReport[];
  onOpenReport: (report: AnalysisReport) => void;
  onDeleteReport: (id: string) => void;
  onClearAll: () => void;
  onNewAnalysis: () => void;
}

export const SavedReportsSection: React.FC<SavedReportsSectionProps> = ({
  savedReports,
  onOpenReport,
  onDeleteReport,
  onClearAll,
  onNewAnalysis
}) => {
  return (
    <div className="space-y-6 py-2 animate-fade-in text-[#191c28]">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-white via-[#fbf7ee] to-white border border-[#ded5c5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Almacenamiento Local del Dispositivo</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
            Mis Informes Tradicionales
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5266] mt-1 font-medium">
            Expedientes culturales guardados en la memoria de tu navegador. Totalmente confidenciales y libres de servidores externos.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {savedReports.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50 px-3 py-2 rounded-xl border border-rose-300 transition-colors font-medium cursor-pointer"
            >
              Borrar todos
            </button>
          )}
          <button
            onClick={onNewAnalysis}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Análisis</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="rounded-2xl border border-[#ded5c5] bg-white p-5 sm:p-6 shadow-sm">
        {savedReports.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#fbf7ee] border border-[#ded5c5] flex items-center justify-center text-[#926d0a]">
              <FileText className="w-8 h-8 opacity-70" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#171923]">
              No tienes informes guardados aún
            </h3>
            <p className="text-xs text-[#525970] max-w-sm mx-auto leading-relaxed font-medium">
              Realiza un análisis de rostro o manos con tu cámara o subiendo una foto, y pulsa en "Guardar Informe" para conservarlo aquí.
            </p>
            <button
              onClick={onNewAnalysis}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Comenzar mi primer análisis</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-[#ded5c5] bg-[#fbf7ee] hover:border-[#b89028] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-editorial font-bold text-base text-[#171923]">
                      {report.userName || 'Viajero Cultural'}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-[#926d0a] border border-[#ded5c5] font-bold">
                      {report.analysisType}
                    </span>
                  </div>
                  <div className="text-xs text-[#525970] flex flex-wrap items-center gap-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#926d0a]" />
                      {report.date}
                    </span>
                    <span>·</span>
                    <span>Arquetipo: <strong className="text-[#171923]">{report.dominantElement}</strong></span>
                    <span>·</span>
                    <span>{report.dimensions.length} Dimensiones Clave</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenReport(report)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#926d0a]" />
                    <span>Ver Resultado</span>
                  </button>

                  <button
                    onClick={() => exportToWordDoc(report)}
                    className="p-2 text-[#4b5266] hover:text-[#171923] border border-[#ded5c5] bg-white hover:bg-[#f6f2ea] rounded-lg transition-colors shadow-sm cursor-pointer"
                    title="Exportar a Word"
                  >
                    <Download className="w-3.5 h-3.5 text-[#926d0a]" />
                  </button>

                  <button
                    onClick={() => onDeleteReport(report.id)}
                    className="p-2 text-rose-600 hover:text-rose-700 border border-[#ded5c5] bg-white hover:bg-rose-50 rounded-lg transition-colors shadow-sm cursor-pointer"
                    title="Eliminar de almacenamiento local"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
