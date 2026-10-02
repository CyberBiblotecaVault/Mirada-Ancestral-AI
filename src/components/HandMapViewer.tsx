import React, { useState } from 'react';
import { HandLine, HandMount, HandSelection } from '../types';
import { HAND_LINES, HAND_MOUNTS, HAND_TRADITION_RULES } from '../data/palmistryTradition';
import { Hand, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface HandMapViewerProps {
  analyzedImage?: string;
  selectedHand: HandSelection;
  onSelectHand: (hand: HandSelection) => void;
  onAnalyzeHand?: () => void;
}

export const HandMapViewer: React.FC<HandMapViewerProps> = ({
  analyzedImage,
  selectedHand,
  onSelectHand,
  onAnalyzeHand
}) => {
  const [selectedFeatureType, setSelectedFeatureType] = useState<'line' | 'mount'>('line');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('vida');

  const selectedLine = HAND_LINES.find(l => l.id === selectedFeatureId) || HAND_LINES[0];
  const selectedMount = HAND_MOUNTS.find(m => m.id === selectedFeatureId) || HAND_MOUNTS[0];

  const rule = selectedHand === 'left' ? HAND_TRADITION_RULES.leftHand : HAND_TRADITION_RULES.rightHand;

  return (
    <div className="space-y-6 text-[#191c28]">
      {/* Intro box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded5c5] text-[#333a4c] shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
          <Hand className="w-4 h-4" />
          <span>Quiromancia Tradicional · Lectura Simbólica de las Manos</span>
        </div>
        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#171923] mb-2">
          Mapa de Líneas y Montes Palmares
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4b5266] font-medium">
          "En la quiromancia tradicional, la palma de la mano se contempla como un paisaje de surcos y colinas que representan simbólicamente arquetipos de energía, temperamento y reflexiones de vida. No constituye una evaluación científica ni una predicción médica."
        </p>

        {/* Hand switcher bar */}
        <div className="mt-4 pt-3 border-t border-[#ded5c5] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#4b5266]">
            <span className="text-[#171923] font-bold">{rule.title}:</span> {rule.symbolicRole}
          </div>
          <div className="flex gap-1.5 p-1 bg-[#fbf7ee] rounded-lg border border-[#ded5c5]">
            <button
              onClick={() => onSelectHand('left')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedHand === 'left'
                  ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-sm'
                  : 'text-[#4b5266] hover:text-[#171923]'
              }`}
            >
              ✋ Mano Izquierda
            </button>
            <button
              onClick={() => onSelectHand('right')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedHand === 'right'
                  ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-sm'
                  : 'text-[#4b5266] hover:text-[#171923]'
              }`}
            >
              🤚 Mano Derecha
            </button>
          </div>
        </div>
      </div>

      {/* Mode selector (Lines vs Mounts) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[#4b5266] font-medium">
          Elige qué elemento explorar en la palma:
        </div>
        <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#ded5c5] shadow-sm">
          <button
            onClick={() => {
              setSelectedFeatureType('line');
              setSelectedFeatureId('vida');
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              selectedFeatureType === 'line'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Líneas Principales (5)
          </button>
          <button
            onClick={() => {
              setSelectedFeatureType('mount');
              setSelectedFeatureId('venus');
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              selectedFeatureType === 'mount'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Montes Palmares (7)
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: SVG Hand Visualizer */}
        <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#ded5c5] p-4 flex flex-col items-center shadow-md">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#fbf8f2] to-[#f4eedf] flex items-center justify-center border border-[#ded5c5]">
            {analyzedImage ? (
              <img
                src={analyzedImage}
                alt="Mano analizada"
                className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-105"
              />
            ) : (
              /* Stylized Classical Hand SVG Contour */
              <svg
                viewBox="0 0 100 130"
                className={`w-full h-full opacity-45 text-[#926d0a] ${selectedHand === 'right' ? 'scale-x-[-1]' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                {/* Palm outline */}
                <path d="M 32 45 C 32 30, 38 18, 42 18 C 46 18, 48 30, 48 44 C 50 30, 54 12, 58 12 C 62 12, 64 28, 64 45 C 66 32, 70 16, 74 16 C 78 16, 79 32, 79 48 C 81 38, 85 28, 88 28 C 91 28, 92 38, 91 55 C 90 75, 88 105, 78 118 C 72 124, 40 124, 30 115 C 20 95, 12 70, 16 60 C 20 50, 28 62, 32 68 Z" />
              </svg>
            )}

            {/* Interactive Lines & Mounts Overlay */}
            <svg
              viewBox="0 0 100 130"
              className={`absolute inset-0 w-full h-full cursor-pointer ${selectedHand === 'right' ? 'scale-x-[-1]' : ''}`}
            >
              {/* Lines Mode */}
              {selectedFeatureType === 'line' && HAND_LINES.map((line) => {
                const isSelected = line.id === selectedFeatureId;
                return (
                  <g
                    key={line.id}
                    onClick={() => setSelectedFeatureId(line.id)}
                    className="cursor-pointer group"
                  >
                    {/* Wider transparent stroke for easier clicking */}
                    <path
                      d={line.pathD}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="8"
                    />
                    <path
                      d={line.pathD}
                      fill="none"
                      stroke={isSelected ? '#926d0a' : '#d4af37'}
                      strokeWidth={isSelected ? '3.5' : '2'}
                      strokeLinecap="round"
                      className="transition-all hover:stroke-[#926d0a]"
                    />
                  </g>
                );
              })}

              {/* Mounts Mode */}
              {selectedFeatureType === 'mount' && HAND_MOUNTS.map((mount) => {
                const isSelected = mount.id === selectedFeatureId;
                return (
                  <g
                    key={mount.id}
                    onClick={() => setSelectedFeatureId(mount.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={mount.cx}
                      cy={mount.cy}
                      r="5"
                      fill={isSelected ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.25)'}
                      stroke={isSelected ? '#926d0a' : '#d4af37'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />
                    <circle
                      cx={mount.cx}
                      cy={mount.cy}
                      r="2"
                      fill={isSelected ? '#ffffff' : '#926d0a'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 text-[11px] text-[#525970] text-center font-medium">
            Pulsa en las {selectedFeatureType === 'line' ? 'líneas doradas' : 'colinas circulares'} o en la botonera lateral para examinar cada detalle.
          </div>

          {onAnalyzeHand && (
            <button
              onClick={onAnalyzeHand}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] text-[#0c0d12] text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Hand className="w-4 h-4" />
              <span>ACTIVAR CÁMARA PARA ESTA MANO</span>
            </button>
          )}
        </div>

        {/* Right: Selected Feature Detailed Inspection Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border-2 border-[#d4af37]/50 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden text-[#191c28]">
            {selectedFeatureType === 'line' ? (
              <>
                <div className="flex items-start justify-between gap-3 border-b border-[#ded5c5] pb-3 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#926d0a] font-bold block">
                      Línea Palmar Principal
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
                      {selectedLine.name}
                    </h4>
                    <p className="text-xs font-serif italic text-[#8b6508] mt-0.5 font-semibold">
                      {selectedLine.symbolicTitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#6b7280] block font-semibold">Claridad Visual</span>
                    <span className="font-mono text-sm font-bold text-[#926d0a]">
                      {selectedLine.confidence}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-[#333a4c] leading-relaxed font-medium">
                  <div>
                    <span className="font-bold text-[#171923] block mb-1">
                      Trayectoria y Ubicación en la Palma:
                    </span>
                    <p className="bg-[#fbf7ee] p-3 rounded-xl border border-[#ded5c5] text-[#191c28]">
                      {selectedLine.description}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#171923] block mb-1">
                      Interpretación Tradicional:
                    </span>
                    <p className="text-[#191c28] bg-[#fbf7ee] p-3 rounded-xl border-l-3 border-[#d4af37]">
                      {selectedLine.traditionalInterpretation}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                      <span>Salvedad Cultural Crucial</span>
                    </div>
                    {selectedLine.culturalCaveat}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 border-b border-[#ded5c5] pb-3 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#926d0a] font-bold block">
                      Monte Palmar Tradicional
                    </span>
                    <h4 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
                      {selectedMount.name}
                    </h4>
                    <p className="text-xs font-serif italic text-[#8b6508] mt-0.5 font-semibold">
                      {selectedMount.traditionalAssociation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-[#333a4c] leading-relaxed font-medium">
                  <div>
                    <span className="font-bold text-[#171923] block mb-1">
                      Significado Simbólico en los Tratados:
                    </span>
                    <p className="text-[#191c28] bg-[#fbf7ee] p-3 rounded-xl border-l-3 border-[#d4af37]">
                      {selectedMount.symbolicMeaning}
                    </p>
                  </div>
                  <div className="text-[11px] text-[#6b7280] italic">
                    * Los montes se corresponden alegóricamente con las esferas planetarias del mundo antiguo, simbolizando aspiraciones y talentos cultivables.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {selectedFeatureType === 'line'
              ? HAND_LINES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedFeatureId(l.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      l.id === selectedFeatureId
                        ? 'border-[#b89028] bg-[#fbf7ee] text-[#191c28] shadow-sm font-bold'
                        : 'border-[#ded5c5] bg-white text-[#4b5266] hover:border-[#b89028] hover:text-[#171923] hover:bg-[#faf6ee]'
                    }`}
                  >
                    <span className="block truncate font-semibold">{l.name}</span>
                    <span className="text-[10px] text-[#6b7280] block truncate">
                      {l.symbolicTitle.split(',')[0]}
                    </span>
                  </button>
                ))
              : HAND_MOUNTS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedFeatureId(m.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      m.id === selectedFeatureId
                        ? 'border-[#b89028] bg-[#fbf7ee] text-[#191c28] shadow-sm font-bold'
                        : 'border-[#ded5c5] bg-white text-[#4b5266] hover:border-[#b89028] hover:text-[#171923] hover:bg-[#faf6ee]'
                    }`}
                  >
                    <span className="block truncate font-semibold">{m.name}</span>
                    <span className="text-[10px] text-[#6b7280] block truncate">
                      {m.traditionalAssociation}
                    </span>
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
