import React from 'react';
import { Eye, Volume2, Sun, Moon, Clock, Sliders, X, Check, Type } from 'lucide-react';
import { AccessibilitySettings, SupportedLanguage, ThemeMode } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  themeMode: ThemeMode;
  onUpdateThemeMode: (mode: ThemeMode) => void;
  lang: SupportedLanguage;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  themeMode,
  onUpdateThemeMode,
  lang
}) => {
  const t = TRANSLATIONS[lang].accessibility;
  const th = TRANSLATIONS[lang].theme;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-[#d4af37]/60 bg-white text-[#191c28] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                {t.title}
              </h3>
              <p className="text-[11px] text-[#525970] font-medium">
                Personaliza la visualización, el tamaño y la asistencia por voz
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

        {/* 1. Font Size Control */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
              <Type className="w-4 h-4 text-[#926d0a]" />
              {t.fontSize}
            </span>
            <span className="text-xs font-mono font-bold text-[#926d0a] uppercase">
              {settings.fontSize === 'normal' ? t.normal : settings.fontSize === 'large' ? t.large : t.xlarge}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['normal', 'large', 'xlarge'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdateSettings({ fontSize: size })}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  settings.fontSize === size
                    ? 'bg-[#d4af37] text-[#0c0d12] border-[#d4af37] shadow-sm'
                    : 'bg-[#fbf7ee] text-[#4b5266] border-[#ded5c5] hover:bg-[#f5ecda] hover:text-[#171923]'
                }`}
              >
                {size === 'normal' ? t.normal : size === 'large' ? `${t.large} (+)` : `${t.xlarge} (++)`}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Theme Mode Selector */}
        <div className="space-y-2.5 border-t border-[#ded5c5] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#171923] flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-[#926d0a]" />
              Modo Visual
            </span>
            <span className="text-[11px] text-[#525970] font-semibold">
              Recomendado: Modo Claro
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateThemeMode('light')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                themeMode === 'light'
                  ? 'bg-amber-50 border-[#926d0a] text-[#171923] font-bold shadow-sm'
                  : 'bg-[#fbf7ee] border-[#ded5c5] text-[#4b5266] hover:bg-[#f5ecda]'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-600" />
              <span className="text-xs">{th.light}</span>
            </button>

            <button
              onClick={() => onUpdateThemeMode('dark')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-slate-100 border-[#926d0a] text-[#171923] font-bold shadow-sm'
                  : 'bg-[#fbf7ee] border-[#ded5c5] text-[#4b5266] hover:bg-[#f5ecda]'
              }`}
            >
              <Moon className="w-4 h-4 text-slate-700" />
              <span className="text-xs">{th.dark}</span>
            </button>

            <button
              onClick={() => onUpdateThemeMode('auto')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                themeMode === 'auto'
                  ? 'bg-amber-50 border-[#926d0a] text-[#171923] font-bold shadow-sm'
                  : 'bg-[#fbf7ee] border-[#ded5c5] text-[#4b5266] hover:bg-[#f5ecda]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#926d0a]" />
              <span className="text-xs">{th.auto}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#525970] leading-relaxed">
            {th.autoDesc}
          </p>
        </div>

        {/* 3. Contrast & Readability Toggles */}
        <div className="space-y-3 border-t border-[#ded5c5] pt-4">
          <span className="text-xs font-bold text-[#171923] block">
            Mejoras Visuales e Inclusión
          </span>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] cursor-pointer hover:bg-[#f6eedc] transition-colors">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#171923] block">
                {t.highContrast}
              </span>
              <span className="text-[11px] text-[#525970] block">
                Bordes marcados y contraste superior para personas con baja visión
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
              className="w-4 h-4 text-[#d4af37] accent-[#d4af37] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] cursor-pointer hover:bg-[#f6eedc] transition-colors">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#171923] block">
                {t.voiceReader}
              </span>
              <span className="text-[11px] text-[#525970] block">
                Lectura guiada de los resultados en voz alta para personas con baja visión
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.speechEnabled}
              onChange={(e) => onUpdateSettings({ speechEnabled: e.target.checked })}
              className="w-4 h-4 text-[#d4af37] accent-[#d4af37] rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#ded5c5] pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
