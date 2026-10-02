import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, X, Globe, MessageSquare } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLanguage;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang].contact;
  const contactEmail = 'lukasluna816@gmail.com';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-[#d4af37]/60 bg-white text-[#191c28] p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#171923]">
                {t.title}
              </h3>
              <p className="text-[11px] text-[#525970] font-medium">
                {t.subtitle}
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

        {/* Content Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-3.5 text-center shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-full bg-white border border-[#ded5c5] flex items-center justify-center text-[#926d0a] shadow-sm">
            <Globe className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-[#6b7280] block font-semibold">
              Correo de Contacto Directo
            </span>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="font-mono text-base sm:text-lg font-bold text-[#171923] select-all">
                {contactEmail}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 text-[#926d0a] hover:text-[#0c0d12] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#ded5c5] cursor-pointer"
                title={t.copyEmail}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-700 font-bold block mt-1 animate-fade-in">
                {t.emailCopied}
              </span>
            )}
          </div>

          <p className="text-xs text-[#4b5266] leading-relaxed font-medium">
            ¿Tienes dudas, deseas una página web similar o requieres soporte para tu organización? Escríbenos directamente.
          </p>

          <a
            href={`mailto:${contactEmail}?subject=Consulta%20sobre%20Mirada%20Ancestral%20AI%20/%20Pagina%20Web`}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] hover:brightness-105 text-[#0c0d12] font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>{t.cta}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Note */}
        <div className="flex items-center gap-2 text-[11px] text-[#525970] pt-1">
          <MessageSquare className="w-3.5 h-3.5 text-[#926d0a] shrink-0" />
          <span>Respondemos consultas técnicas, propuestas y soporte habitualmente en menos de 24 horas.</span>
        </div>
      </div>
    </div>
  );
};
