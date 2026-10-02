import React from 'react';
import { AuditLogEntry } from '../types';
import { ShieldCheck, X, CheckCircle2, Info, AlertTriangle, Cpu } from 'lucide-react';

interface AuditLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLogEntry[];
}

export const AuditLogDrawer: React.FC<AuditLogDrawerProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-lg bg-white text-[#191c28] h-full shadow-2xl border-l border-[#ded5c5] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#ded5c5] bg-[#faf7f0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold">
                Transparencia & Trazabilidad
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                Registro de Auditoría Local
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6b7280] hover:text-[#171923] rounded-lg hover:bg-[#f6f2ea] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <div className="p-4 bg-[#fbf7ee] border-b border-[#ded5c5] text-xs text-[#4b5266] leading-relaxed font-medium">
          <div className="flex items-center gap-1.5 font-bold text-[#926d0a] mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Motor de Decisión Explicable (XAI)</span>
          </div>
          Cada etapa del cálculo geométrico y mapeo de reglas tradicionales se audita en memoria del navegador para asegurar total transparencia y cumplimiento de las directrices de privacidad y ética.
        </div>

        {/* Log Entries List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 font-mono text-xs bg-white">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-[#6b7280] font-sans text-xs">
              No hay ejecuciones registradas en esta sesión aún. Inicia un análisis para observar la traza.
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl border border-[#ded5c5] bg-[#fcfaf6] space-y-1.5 shadow-sm"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#926d0a] font-bold">[{log.phase}]</span>
                  <span className="text-[#6b7280]">{log.timestamp}</span>
                </div>
                <div className="font-sans font-bold text-[#171923] text-xs">
                  {log.action}
                </div>
                <div className="font-sans text-[11px] text-[#4b5266] leading-relaxed">
                  {log.details}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ded5c5] bg-[#faf7f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#191c28] bg-white border border-[#ded5c5] rounded-xl hover:bg-[#f6f2ea] transition-colors cursor-pointer shadow-sm"
          >
            Cerrar Registro
          </button>
        </div>
      </div>
    </div>
  );
};
