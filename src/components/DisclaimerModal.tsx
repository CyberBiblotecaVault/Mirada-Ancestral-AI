import React from 'react';
import { BookOpenCheck, CheckCircle2 } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onAccept, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-[#d4af37]/60 bg-white p-6 sm:p-8 shadow-2xl text-[#191c28]">
        {/* Emblem */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37] bg-[#fbf7ee] mb-5">
          <BookOpenCheck className="h-7 w-7 text-[#926d0a]" />
        </div>

        <div className="text-center mb-5">
          <span className="text-xs uppercase tracking-widest text-[#926d0a] font-bold">
            Marco Ético y Cultural
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923] mt-1">
            Aviso de Transparencia
          </h2>
        </div>

        <div className="space-y-3.5 text-sm text-[#333a4c] leading-relaxed bg-[#fbf7ee] p-4 sm:p-5 rounded-xl border border-[#ded5c5] mb-6">
          <p className="font-semibold text-[#171923]">
            "Esta aplicación presenta interpretaciones tradicionales de fisonomía y quiromancia con fines culturales y de entretenimiento. Las interpretaciones no constituyen diagnósticos médicos, psicológicos, científicos, financieros ni predicciones verificables del futuro."
          </p>

          <div className="space-y-2 pt-3 border-t border-[#ded5c5] text-xs text-[#4b5266]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Tratamiento local:</strong> La captura o fotografía se procesa exclusivamente en tu navegador. Ninguna imagen se transmite ni almacena en servidores externos.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Sin determinismo:</strong> Las tradiciones como Mian Xiang (面相) son concebidas como artes alegóricas sobre el cultivo personal y no como mediciones biológicas.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-1/3 py-2.5 px-4 text-xs font-semibold text-[#4b5266] hover:text-[#171923] rounded-xl border border-[#ded5c5] bg-white hover:bg-[#f6f2ea] transition-colors cursor-pointer shadow-sm"
          >
            Volver
          </button>
          <button
            onClick={onAccept}
            className="w-full sm:w-2/3 py-2.5 px-5 text-sm font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            ENTENDIDO — COMENZAR
          </button>
        </div>
      </div>
    </div>
  );
};
