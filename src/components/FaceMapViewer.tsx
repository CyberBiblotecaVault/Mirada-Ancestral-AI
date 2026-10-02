import React, { useState } from 'react';
import { FacialZone } from '../types';
import { FACIAL_ZONES, SAN_TING_REALMS } from '../data/facialTradition';
import { Info, Sparkles, Compass, CheckCircle } from 'lucide-react';

interface FaceMapViewerProps {
  analyzedImage?: string;
  sanTing?: {
    cielo: number;
    hombre: number;
    tierra: number;
  };
}

export const FaceMapViewer: React.FC<FaceMapViewerProps> = ({ analyzedImage, sanTing }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('nariz');
  const [activeRealmFilter, setActiveRealmFilter] = useState<'all' | 'cielo' | 'hombre' | 'tierra'>('all');

  const selectedZone = FACIAL_ZONES.find(z => z.id === selectedZoneId) || FACIAL_ZONES[0];

  const filteredZones = activeRealmFilter === 'all'
    ? FACIAL_ZONES
    : FACIAL_ZONES.filter(z => z.realm === activeRealmFilter);

  return (
    <div className="space-y-6 text-[#191c28]">
      {/* Introduction box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ded5c5] text-[#333a4c] shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Mian Xiang (面相) · Fisiognomía Tradicional</span>
        </div>
        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#171923] mb-2">
          Mapa Simbólico de las Oficialías Faciales
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4b5266] font-medium">
          "Mian Xiang es una tradición china histórica relacionada con la interpretación simbólica de diferentes zonas del rostro. Las interpretaciones varían según la escuela clásica y no constituyen evidencia científica."
        </p>
      </div>

      {/* San Ting Proportions bar if available */}
      {sanTing && (
        <div className="p-4 rounded-xl bg-white border border-[#ded5c5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#4b5266] mb-2 font-medium">
            <span className="font-bold text-[#171923]">Distribución de los Tres Reinos (San Ting 三停):</span>
            <span className="text-[11px] text-[#926d0a] font-bold">Equilibrio Armónico Tradicional</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[11px] text-[#6b7280] block font-medium">Shang Ting (Cielo)</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">{sanTing.cielo}%</span>
              <span className="text-[10px] text-[#4b5266] block mt-0.5">Juventud y orígenes</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[11px] text-[#6b7280] block font-medium">Zhong Ting (Humano)</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">{sanTing.hombre}%</span>
              <span className="text-[10px] text-[#4b5266] block mt-0.5">Madurez y propósitos</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5]">
              <span className="text-[11px] text-[#6b7280] block font-medium">Xia Ting (Tierra)</span>
              <span className="font-mono text-base font-bold text-[#926d0a]">{sanTing.tierra}%</span>
              <span className="text-[10px] text-[#4b5266] block mt-0.5">Estabilidad y legado</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[#4b5266] font-medium">
          Selecciona una oficialía para consultar su significado tradicional:
        </div>
        <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#ded5c5] shadow-sm">
          <button
            onClick={() => setActiveRealmFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRealmFilter === 'all'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Todas (11)
          </button>
          <button
            onClick={() => setActiveRealmFilter('cielo')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRealmFilter === 'cielo'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Cielo
          </button>
          <button
            onClick={() => setActiveRealmFilter('hombre')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRealmFilter === 'hombre'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Humano
          </button>
          <button
            onClick={() => setActiveRealmFilter('tierra')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRealmFilter === 'tierra'
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
            }`}
          >
            Tierra
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: SVG Facial Visualizer */}
        <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#ded5c5] p-4 flex flex-col items-center shadow-md">
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#fbf8f2] to-[#f4eedf] flex items-center justify-center border border-[#ded5c5]">
            {analyzedImage ? (
              <img
                src={analyzedImage}
                alt="Rostro analizado"
                className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-105"
              />
            ) : (
              /* Stylized Classical Face SVG Silhouette */
              <svg
                viewBox="0 0 100 130"
                className="w-full h-full opacity-45 text-[#926d0a]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                {/* Face oval */}
                <ellipse cx="50" cy="62" rx="34" ry="48" />
                {/* San Ting Divider Lines */}
                <line x1="20" y1="42" x2="80" y2="42" strokeDasharray="2 2" strokeWidth="0.8" />
                <line x1="18" y1="78" x2="82" y2="78" strokeDasharray="2 2" strokeWidth="0.8" />
                {/* Eye guides */}
                <circle cx="36" cy="54" r="5" strokeWidth="0.8" />
                <circle cx="64" cy="54" r="5" strokeWidth="0.8" />
                {/* Nose bridge */}
                <path d="M50 48 L48 72 L54 72" strokeWidth="1" />
                {/* Mouth */}
                <path d="M40 92 Q50 97 60 92" strokeWidth="1" />
              </svg>
            )}

            {/* Interactive SVG Hotspot Overlays */}
            <svg
              viewBox="0 0 100 130"
              className="absolute inset-0 w-full h-full cursor-pointer pointer-events-auto"
            >
              {filteredZones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={zone.r * 1.5}
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="1.5"
                        className="animate-ping origin-center opacity-40"
                      />
                    )}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={zone.r}
                      fill={isSelected ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.25)'}
                      stroke={isSelected ? '#926d0a' : '#d4af37'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="transition-all hover:fill-[#d4af37]/80"
                    />
                    {/* Small dot center */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="2"
                      fill={isSelected ? '#ffffff' : '#926d0a'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 text-[11px] text-[#525970] text-center font-medium">
            Pulsa en los círculos dorados o en la lista lateral para explorar cada oficialía.
          </div>
        </div>

        {/* Right: Selected Zone Detailed Inspection Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border-2 border-[#d4af37]/50 bg-white p-5 sm:p-6 shadow-md relative overflow-hidden text-[#191c28]">
            <div className="flex items-start justify-between gap-3 border-b border-[#ded5c5] pb-3 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#926d0a] font-bold block">
                  {selectedZone.realm === 'cielo' && 'Shang Ting · Reino Celestial'}
                  {selectedZone.realm === 'hombre' && 'Zhong Ting · Reino Humano'}
                  {selectedZone.realm === 'tierra' && 'Xia Ting · Reino Terrenal'}
                </span>
                <h4 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
                  {selectedZone.name}
                </h4>
                <p className="text-xs font-serif italic text-[#8b6508] mt-0.5 font-semibold">
                  {selectedZone.traditionalName}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase text-[#6b7280] block font-semibold">Confianza Visual</span>
                <span className="font-mono text-sm font-bold text-[#926d0a]">
                  {selectedZone.visualConfidence}%
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-[#333a4c] leading-relaxed font-medium">
              <div>
                <span className="font-bold text-[#171923] block mb-1">
                  Significado Tradicional:
                </span>
                <p className="bg-[#fbf7ee] p-3 rounded-xl border border-[#ded5c5] text-[#191c28]">
                  {selectedZone.shortDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#171923] block mb-1">
                  Explicación Histórica y Clásica:
                </span>
                <p className="text-[#4b5266]">
                  {selectedZone.historicalMeaning}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#171923] block mb-1">
                  Interpretación Simbólica:
                </span>
                <p className="text-[#191c28] bg-[#fbf7ee] p-3 rounded-xl border-l-3 border-[#d4af37]">
                  {selectedZone.symbolicInterpretation}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-[#6b7280] italic">
                * Recordatorio: Esta característica se interpreta simbólicamente como parte del legado cultural de Mian Xiang; no constituye una evaluación científica.
              </div>
            </div>
          </div>

          {/* Quick Select Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredZones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZoneId(z.id)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                  z.id === selectedZoneId
                    ? 'border-[#b89028] bg-[#fbf7ee] text-[#191c28] shadow-sm font-bold'
                    : 'border-[#ded5c5] bg-white text-[#4b5266] hover:border-[#b89028] hover:text-[#171923] hover:bg-[#faf6ee]'
                }`}
              >
                <span className="block truncate font-semibold">{z.name}</span>
                <span className="text-[10px] text-[#6b7280] block truncate">
                  {z.traditionalName.split('—')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
