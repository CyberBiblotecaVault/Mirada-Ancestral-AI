import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export type AdSlotPosition = 
  | 'desktop-below-header'
  | 'desktop-between-content'
  | 'desktop-in-blog'
  | 'desktop-pre-footer'
  | 'mobile-after-hero'
  | 'mobile-between-sections'
  | 'mobile-pre-footer';

interface AdPlaceholderProps {
  slot: AdSlotPosition;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slot,
  format = 'horizontal',
  className = ''
}) => {
  // Si AdSense no está habilitado, mostramos un marco reservado discreto para el maquetado
  // técnico de Google AdSense sin cargar scripts no autorizados.
  const isEnabled = SITE_CONFIG.adsenseEnabled && SITE_CONFIG.adsenseClientId.startsWith('ca-pub-');

  // Si está activado oficialmente, inyectamos el bloque de AdSense reglamentario
  if (isEnabled) {
    return (
      <div 
        className={`my-6 mx-auto w-full text-center transition-all ${className}`}
        aria-label="Espacio publicitario"
      >
        <span className="block text-[10px] uppercase tracking-wider text-[#8b91a5] font-mono mb-1">
          Publicidad
        </span>
        <div className="overflow-hidden rounded-xl border border-[#ded5c5] bg-white p-2">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={SITE_CONFIG.adsenseClientId}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Si aún no está activado por el propietario, se muestra un contenedor reservado estético y neutro
  // para verificar la correcta distribución de espacios publicitarios sin alterar el diseño ni confundir al usuario.
  return (
    <div 
      className={`my-6 mx-auto max-w-4xl w-full px-2 transition-all ${className}`}
      aria-label="Espacio publicitario reservado"
    >
      <div className="rounded-xl border border-dashed border-[#ded5c5] bg-[#faf7f0]/60 p-4 text-center">
        <span className="inline-block text-[10px] uppercase font-mono tracking-widest text-[#926d0a] font-semibold px-2 py-0.5 rounded bg-white border border-[#ded5c5]">
          Publicidad · Espacio Reservado
        </span>
        <p className="text-[11px] text-[#6b7280] mt-1.5 font-medium">
          Espacio técnico preparado para Google AdSense ({slot})
        </p>
      </div>
    </div>
  );
};
