import React from 'react';
import { Lock, ShieldCheck, Trash2, X, CheckCircle2, AlertTriangle, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurgeAllData: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onPurgeAllData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex justify-center items-center animate-fade-in">
      <div className="relative w-full max-w-xl bg-white text-[#191c28] rounded-2xl border-2 border-[#d4af37]/60 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold">
                Seguridad & Soberanía del Usuario
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#171923]">
                Protocolo de Privacidad y Protección
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6b7280] hover:text-[#171923] rounded-lg hover:bg-[#f6f2ea] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Policy Statement */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-3 text-xs leading-relaxed text-[#333a4c] shadow-sm">
          <p className="font-bold text-[#171923]">
            "Las fotografías utilizadas para el análisis se procesan localmente en el navegador siempre que sea técnicamente posible. La aplicación no almacena imágenes personales sin autorización explícita."
          </p>

          <div className="space-y-2 pt-3 border-t border-[#ded5c5] text-[#4b5266]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Sin envío a la nube:</strong> Los algoritmos de proporción geométrica y San Ting operan mediante la API Canvas y memoria local (RAM) de tu dispositivo.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Validación estricta de archivos:</strong> Tamaño limitado a 10MB con verificación de tipo MIME (JPG, PNG, WEBP) para impedir ejecución de código arbitrario.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Limpieza en 1-clic:</strong> Puedes purgar de inmediato cualquier rastro de la memoria RAM o localStorage con el botón inferior.
              </span>
            </div>
          </div>
        </div>

        {/* Local Storage details */}
        <div className="space-y-3 text-xs text-[#4b5266]">
          <h4 className="font-bold text-sm text-[#171923] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ¿Qué datos se guardan en tu navegador?
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed pl-1">
            <li>Solo los informes que pulses explícitamente en "Guardar Informe".</li>
            <li>Tus preferencias de accesibilidad, tamaño de fuente y tema.</li>
            <li>No se utilizan cookies de seguimiento publicitario invasivo ni perfiles biométricos transferibles.</li>
          </ul>
        </div>

        {/* Purge action */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-rose-900 block flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Purga Total de Datos Locales
            </span>
            <span className="text-[11px] text-rose-800">
              Elimina todos los informes guardados y limpia la memoria del navegador.
            </span>
          </div>

          <button
            onClick={() => {
              onPurgeAllData();
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Todo</span>
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
