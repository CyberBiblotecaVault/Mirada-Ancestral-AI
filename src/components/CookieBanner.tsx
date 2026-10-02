import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, X, Check } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean; // siempre true
  analytics: boolean;
  advertising: boolean;
  configured: boolean;
}

const STORAGE_KEY = 'mirada_cookie_consent_v1';

export const CookieBanner: React.FC<{
  onOpenPreferences: () => void;
}> = ({ onOpenPreferences }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Mostrar tras breve retardo para no obstaculizar la carga inicial
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      configured: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
      configured: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t-2 border-[#d4af37]/60 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] animate-fade-in"
      role="region"
      aria-label="Consentimiento de cookies"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5] shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#171923]">
              Respetamos tu Privacidad y Soberanía Digital
            </h4>
            <p className="text-xs text-[#4b5266] leading-relaxed font-normal">
              Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y almacenamiento local de tus análisis. Opcionalmente, podemos utilizar cookies analíticas y publicitarias (Google AdSense) para sostener este servicio de acceso 100% gratuito. Consulta nuestra{' '}
              <a href="/cookies" className="text-[#926d0a] font-semibold underline hover:text-[#171923]">
                Política de Cookies
              </a>{' '}
              y{' '}
              <a href="/privacidad" className="text-[#926d0a] font-semibold underline hover:text-[#171923]">
                Política de Privacidad
              </a>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4b5266] hover:text-[#171923] bg-[#fbf7ee] hover:bg-[#f5ecda] border border-[#ded5c5] rounded-xl transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-[#926d0a]" />
            <span>Configurar</span>
          </button>

          <button
            onClick={handleRejectNonEssential}
            className="px-3.5 py-2 text-xs font-semibold text-[#191c28] hover:text-[#0c0d12] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Solo necesarias
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
};
