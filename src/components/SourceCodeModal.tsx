import React, { useState } from 'react';
import { 
  X, Download, Globe, ShieldCheck, Terminal, Server, 
  CheckCircle2, Copy, Check, ExternalLink, ArrowRight, Lock, Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl border-2 border-[#d4af37]/60 bg-white text-[#191c28] shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ded5c5] flex items-center justify-between bg-gradient-to-r from-white via-[#fbf7ee] to-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#171923]">
                Descargar Código Fuente y Subir a Dominio Propio
              </h2>
              <p className="text-[11px] text-[#525970] font-medium">
                Guía oficial de respaldo, soberanía de datos y seguridad para Gustavo Gómez
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#ded5c5] text-[#525970] hover:text-[#171923] hover:bg-[#faf6ee] transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#333a4d] leading-relaxed">
          {/* Alerta de Seguridad y Propiedad */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-[#f0fdf4] to-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold text-emerald-900">
                Seguridad y Propiedad Garantizada
              </strong>
              <p className="text-[11px] leading-relaxed">
                Este proyecto es 100% de tu propiedad (<strong>{SITE_CONFIG.owner}</strong>). Toda la lógica de análisis fisonómico y de manos se procesa en el navegador del usuario final (localmente vía Canvas HTML5), por lo que <strong>no hay servidores externos almacenando fotos ni datos biométricos</strong>. Puedes llevarte todo el código y alojarlo en tu propio servidor con total tranquilidad.
              </p>
            </div>
          </div>

          {/* PASO 1: Cómo descargar desde Google AI Studio */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#171923]">
              <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#0c0d12] flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <h3>Cómo descargar todo el archivo ZIP desde Google AI Studio</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-2">
              <p>
                Para descargar todo el repositorio con todos los archivos fuente (código TypeScript, componentes, 20 artículos del blog, estilos y configuración):
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-[11px]">
                <li>
                  Mira la <strong>barra superior de Google AI Studio</strong> (arriba a la derecha de esta misma pantalla).
                </li>
                <li>
                  Haz clic en el botón <strong>"Export"</strong> o en el ícono de descarga / GitHub (esquina superior derecha).
                </li>
                <li>
                  Selecciona <strong>"Download ZIP"</strong> (o "Export to GitHub" si deseas tenerlo sincronizado con tu cuenta personal de GitHub).
                </li>
                <li>
                  Se descargará en tu computadora un archivo <strong>.zip</strong> con todo el código fuente intacto.
                </li>
              </ol>
            </div>
          </section>

          {/* PASO 2: Compilar el código en tu computadora */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#171923]">
              <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#0c0d12] flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <h3>Compilar el proyecto para tu hosting</h3>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#ded5c5] space-y-3">
              <p>
                Descomprime el ZIP y abre una terminal en esa carpeta. Ejecuta estos dos comandos:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#191c28] text-[#f7f5ef] font-mono text-[11px]">
                  <span>npm install</span>
                  <button
                    onClick={() => copyToClipboard('npm install', 'install')}
                    className="p-1 hover:text-[#d4af37] transition-colors"
                    title="Copiar comando"
                  >
                    {copiedCmd === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#191c28] text-[#f7f5ef] font-mono text-[11px]">
                  <span>npm run build</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'build')}
                    className="p-1 hover:text-[#d4af37] transition-colors"
                    title="Copiar comando"
                  >
                    {copiedCmd === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#525970]">
                Esto creará una carpeta llamada <strong>dist/</strong>. Esa carpeta contiene los archivos listos para subir a cualquier hosting del mundo.
              </p>
            </div>
          </section>

          {/* PASO 3: Subida a tu Dominio Propio */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#171923]">
              <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#0c0d12] flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <h3>Subir a tu hosting o proveedor de dominio</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Opción Vercel / Netlify */}
              <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#171923]">
                  <Globe className="w-4 h-4 text-[#926d0a]" />
                  <span>Opción A: Vercel / Netlify (Gratis y con SSL)</span>
                </div>
                <p className="text-[11px] text-[#525970]">
                  Crea una cuenta en Vercel o Netlify, sube el repositorio o arrastra la carpeta <code>dist/</code>, y en la sección de Dominios escribe tu dominio propio (ej. <code>miradaancestral.com</code>). Vercel o Netlify configuran el candado de seguridad HTTPS (SSL) de manera automática.
                </p>
              </div>

              {/* Opción Hosting cPanel / Apache */}
              <div className="p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#171923]">
                  <Server className="w-4 h-4 text-[#926d0a]" />
                  <span>Opción B: cPanel / Hostinger / DonWeb</span>
                </div>
                <p className="text-[11px] text-[#525970]">
                  Entra al Administrador de Archivos de tu cPanel, ingresa a la carpeta <code>public_html</code> y sube el contenido de <code>dist/</code>. El archivo <code>.htaccess</code> ya está incluido para que ninguna ruta dé error 404.
                </p>
              </div>
            </div>
          </section>

          {/* Lista de Seguridad para el Dominio Propio */}
          <section className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Checklist de Seguridad para tu Dominio Propio</span>
            </div>
            <ul className="space-y-1 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span><strong>Activar certificado SSL HTTPS:</strong> Indispensable para que los usuarios puedan usar la cámara de su móvil o webcam con seguridad.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span><strong>Google AdSense:</strong> Cuando tu dominio esté publicado, añade la URL a tu cuenta AdSense ({SITE_CONFIG.adsenseAccountEmail}).</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span><strong>Google Search Console:</strong> Envía tu <code>sitemap.xml</code> para indexar tus 20 artículos.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ded5c5] bg-[#faf7f0] flex flex-wrap items-center justify-between gap-3 rounded-b-2xl text-xs">
          <span className="text-[#525970] text-[11px]">
            {SITE_CONFIG.copyright}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
