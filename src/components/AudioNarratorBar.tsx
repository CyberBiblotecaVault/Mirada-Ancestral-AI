import React from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface AudioNarratorBarProps {
  isSpeaking: boolean;
  onPlay: () => void;
  onStop: () => void;
  currentCaption?: string;
  lang: SupportedLanguage;
}

export const AudioNarratorBar: React.FC<AudioNarratorBarProps> = ({
  isSpeaking,
  onPlay,
  onStop,
  currentCaption,
  lang
}) => {
  const t = TRANSLATIONS[lang].accessibility;

  return (
    <aside
      aria-label="Reproductor de accesibilidad de voz"
      className="fixed bottom-16 md:bottom-5 left-4 right-4 md:left-auto md:right-5 z-40 max-w-md bg-white/95 text-[#191c28] border-2 border-[#d4af37]/70 rounded-2xl shadow-2xl p-3.5 backdrop-blur-md animate-fade-in flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isSpeaking ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]'}`}>
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#926d0a] font-bold block">
              Accesibilidad Auditiva & Visual
            </span>
            <span className="text-xs font-bold text-[#171923]">
              {isSpeaking ? 'Narrando en voz alta...' : t.voiceReader}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isSpeaking ? (
            <button
              onClick={onStop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{t.stopReading}</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.readAloud}</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Subtitle Caption Display for Deaf/Hard-of-hearing or Reading Along */}
      {currentCaption && (
        <div className="p-2 rounded-lg bg-[#fbf7ee] border border-[#ded5c5] text-[11px] text-[#191c28] line-clamp-2 leading-relaxed">
          <span className="text-[#926d0a] font-bold mr-1">Transcripción:</span>
          {currentCaption}
        </div>
      )}
    </aside>
  );
};
