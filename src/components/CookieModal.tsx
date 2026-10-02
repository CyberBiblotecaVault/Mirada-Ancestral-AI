import React, { useState, useEffect } from 'react';
import { X, Cookie, ShieldCheck, Check } from 'lucide-react';
import { CookiePreferences } from './CookieBanner';

const STORAGE_KEY = 'mirada_cookie_consent_v1';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
    configured: false
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setPreferences(JSON.parse(saved));
        } catch {
          // default
        }
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    const updated: CookiePreferences = {
      ...preferences,
      necessary: true,
      configured: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-[#d4af37]/60 bg-white text-[#191c28] p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                Panel de Preferencias de Cookies
              </h3>
              <p className="text-[11px] text-[#525970] font-medium">
                Personaliza qué tecnologías de almacenamiento autorizas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6b7280] hover:text-[#171923] rounded-lg hover:bg-[#f6f2ea] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 text-xs text-[#333a4c]">
          {/* Necessary Cookies */}
          <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#171923]">
                1. Cookies Técnicas Necesarias
              </span>
              <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
                Siempre Activas
              </span>
            </div>
            <p className="text-[#4b5266] leading-relaxed">
              Indispensables para navegar por el sitio, recordar tus preferencias de accesibilidad y mantener en la memoria local de tu navegador (localStorage) los informes que decidas guardar.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div className="p-4 rounded-xl bg-white border border-[#ded5c5] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#171923]">
                2. Cookies Analíticas
              </span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 text-[#d4af37] accent-[#d4af37] rounded cursor-pointer"
              />
            </div>
            <p className="text-[#4b5266] leading-relaxed">
              Nos permiten medir métricas anónimas de rendimiento, velocidad de carga (Core Web Vitals) y páginas más leídas para mejorar continuamente los artículos educativos.
            </p>
          </div>

          {/* Advertising Cookies */}
          <div className="p-4 rounded-xl bg-white border border-[#ded5c5] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#171923]">
                3. Cookies Publicitarias (Google AdSense)
              </span>
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                className="w-4 h-4 text-[#d4af37] accent-[#d4af37] rounded cursor-pointer"
              />
            </div>
            <p className="text-[#4b5266] leading-relaxed">
              Permiten mostrar anuncios relevantes y no intrusivos gestionados por Google para sostener los costes de desarrollo y mantener la plataforma 100% gratuita para todo el público.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#ded5c5] pt-4 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4b5266] hover:text-[#171923] hover:bg-[#f6f2ea] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Guardar Preferencias
          </button>
        </div>
      </div>
    </div>
  );
};
