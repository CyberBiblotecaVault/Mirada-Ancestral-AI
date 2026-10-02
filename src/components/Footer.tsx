import React from 'react';
import { Shield, Heart, Mail, Lock, CheckCircle2, ShieldCheck, Compass, FileText, Scale, Cookie, HelpCircle, Download } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { SITE_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
  onOpenLegal: (tab: 'terminos' | 'aviso-legal' | 'sobre-nosotros' | 'como-funciona') => void;
  onOpenAudit: () => void;
  onOpenDonate: () => void;
  onOpenContact: () => void;
  onOpenSourceCode?: () => void;
  lang: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenCookies,
  onOpenLegal,
  onOpenAudit,
  onOpenDonate,
  onOpenContact,
  onOpenSourceCode,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full border-t border-[#ded5c5] bg-[#faf7f0] text-[#4b5266] pt-12 pb-24 md:pb-12 text-xs shadow-inner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-brand text-lg font-bold tracking-wider text-[#171923] block">
              MIRADA ANCESTRAL <span className="text-[#926d0a]">AI</span>
            </span>
            <p className="font-serif italic text-sm text-[#8b6508] font-semibold">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs text-[#4b5266] leading-relaxed font-normal">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-block text-[11px] font-mono text-[#8b6508] bg-white px-2.5 py-1 rounded-lg border border-[#ded5c5] font-bold shadow-sm">
                100% GRATIS · Sin suscripción · Sin tarjeta
              </span>
              <button
                onClick={onOpenDonate}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-900 bg-[#fffdf8] px-2.5 py-1 rounded-lg border border-[#b89028] hover:bg-[#f6edd8] transition-colors shadow-sm cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#926d0a] fill-[#926d0a]" />
                <span>PayPal @gsordo12</span>
              </button>
            </div>
          </div>

          {/* Column 2: Herramientas y Tradición */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#171923] block mb-2">
              Exploración y Análisis
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/analizar-rostro')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Analizar rostro (Mian Xiang)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/analizar-mano')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Analizar mano (Quiromancia)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mian-xiang')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Tratado de Mian Xiang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/quiromancia')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Tratado de Quiromancia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Blog (20 Artículos Originales)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legalidad & Transparencia */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#171923] block mb-2">
              Institucional y Legal
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('como-funciona')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCookies}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Gestión de Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terminos')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('aviso-legal')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Aviso Legal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('sobre-nosotros')}
                  className="text-[#4b5266] hover:text-[#926d0a] transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </button>
              </li>
              {onOpenSourceCode && (
                <li>
                  <button
                    onClick={onOpenSourceCode}
                    className="text-[#926d0a] hover:underline font-bold flex items-center gap-1 transition-colors cursor-pointer pt-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Código Fuente</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contacto & AdSense */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#171923] block mb-1">
              Contacto y Soporte
            </span>
            <div className="space-y-1.5 text-xs text-[#4b5266] font-medium">
              <p>Propietario: <strong className="text-[#171923]">{SITE_CONFIG.owner}</strong></p>
              <div className="flex items-center gap-1.5 text-[#926d0a] font-mono select-all font-bold">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{SITE_CONFIG.contactEmail}</span>
              </div>
              <button
                onClick={onOpenContact}
                className="text-[11px] text-[#926d0a] hover:underline font-bold block pt-0.5 cursor-pointer"
              >
                Abrir formulario de contacto directo →
              </button>
            </div>

            {onOpenSourceCode && (
              <button
                onClick={onOpenSourceCode}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#d4af37] bg-white hover:bg-[#fbf7ee] text-xs font-bold text-[#171923] shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#926d0a]" />
                <span>Descargar Código Fuente (.zip)</span>
              </button>
            )}

            <div className="pt-1 text-[10px] text-[#6b7280]">
              <span>Cuenta AdSense Verificada: </span>
              <span className="font-mono text-[#171923] font-bold">{SITE_CONFIG.adsenseAccountEmail}</span>
            </div>
          </div>
        </div>

        {/* Divider and Exact Copyright */}
        <div className="border-t border-[#ded5c5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6b7280]">
          <div className="font-bold text-[#171923]">
            {SITE_CONFIG.copyright}
          </div>
          <div className="font-serif italic text-[#4b5266] text-center sm:text-right">
            "Experiencia cultural y educativa. No constituye una evaluación científica ni un diagnóstico médico."
          </div>
        </div>
      </div>
    </footer>
  );
};
