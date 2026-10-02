import React from 'react';
import { AnalysisReport } from '../types';
import { FileText, Trash2, Calendar, Eye, Download, X, PlusCircle, ShieldAlert } from 'lucide-react';
import { exportToWordDoc } from '../utils/reportExporter';

interface SavedReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedReports: AnalysisReport[];
  onOpenReport: (report: AnalysisReport) => void;
  onDeleteReport: (id: string) => void;
  onClearAll: () => void;
  onNewAnalysis: () => void;
}

export const SavedReportsModal: React.FC<SavedReportsModalProps> = ({
  isOpen,
  onClose,
  savedReports,
  onOpenReport,
  onDeleteReport,
  onClearAll,
  onNewAnalysis
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex justify-center animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white text-[#191c28] rounded-2xl border-2 border-[#d4af37]/60 shadow-2xl flex flex-col my-auto max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] bg-[#faf7f0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold">
                Almacenamiento Local
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#171923]">
                Mis Informes Guardados
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedReports.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-300 transition-colors font-medium cursor-pointer"
                title="Borra todos los informes de la memoria local"
              >
                Borrar todos
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#6b7280] hover:text-[#171923] rounded-lg hover:bg-[#f6f2ea] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 bg-white">
          {savedReports.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#fbf7ee] border border-[#ded5c5] flex items-center justify-center text-[#926d0a]">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#171923]">
                No tienes informes guardados aún
              </h3>
              <p className="text-xs text-[#525970] max-w-sm mx-auto font-medium">
                Realiza un análisis de rostro o manos y pulsa en "Guardar Informe" para conservarlo en tu navegador.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewAnalysis();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Comenzar Nuevo Análisis</span>
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
                    <div className="text-xs text-[#525970] flex items-center gap-3 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#926d0a]" />
                        {report.date}
                      </span>
                      <span>·</span>
                      <span>Elemento: <strong className="text-[#171923]">{report.dominantElement}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onOpenReport(report)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-lg transition-colors shadow-sm cursor-pointer"
                      title="Ver informe completo"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#926d0a]" />
                      <span>Ver</span>
                    </button>

                    <button
                      onClick={() => exportToWordDoc(report)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-lg transition-colors shadow-sm cursor-pointer"
                      title="Descargar en formato Word"
                    >
                      <Download className="w-3.5 h-3.5 text-[#926d0a]" />
                      <span>Word</span>
                    </button>

                    <button
                      onClick={() => onDeleteReport(report.id)}
                      className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-[#ded5c5] bg-white rounded-lg transition-colors cursor-pointer"
                      title="Eliminar de la lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
