import React, { useState } from 'react';
import { 
  Menu, X, Sparkles, Heart, Mail, Eye, Sun, Moon, Globe, 
  ChevronDown, ScanFace, Hand, BookOpen, Compass, Shield, HelpCircle, Download
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAudit: () => void;
  onStartAnalysis: () => void;
  savedCount: number;
  lang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenAccessibility: () => void;
  onOpenDonate: () => void;
  onOpenContact: () => void;
  onOpenSourceCode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onStartAnalysis,
  savedCount,
  lang,
  onSelectLang,
  isDarkMode,
  onToggleTheme,
  onOpenAccessibility,
  onOpenDonate,
  onOpenContact,
  onOpenSourceCode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const languages: { id: SupportedLanguage; name: string; flag: string }[] = [
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'pt', name: 'Português', flag: '🇵🇹' },
    { id: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const navItems = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'analizar-rostro', label: 'Analizar rostro', path: '/analizar-rostro' },
    { id: 'analizar-mano', label: 'Analizar mano', path: '/analizar-mano' },
    { id: 'mian-xiang', label: 'Mian Xiang', path: '/mian-xiang' },
    { id: 'quiromancia', label: 'Quiromancia', path: '/quiromancia' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'como-funciona', label: 'Cómo funciona', path: '/como-funciona' },
    { id: 'privacidad', label: 'Privacidad', path: '/privacidad' },
    { id: 'contacto', label: 'Contacto', path: '/contacto' },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#ded5c5] bg-white/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('inicio')}
          className="group flex cursor-pointer items-center gap-2 shrink-0"
        >
          <span className="font-brand text-base sm:text-lg lg:text-xl font-bold tracking-wider text-[#171923] transition-colors group-hover:text-[#926d0a]">
            MIRADA ANCESTRAL <span className="text-xs font-sans font-semibold tracking-normal text-[#926d0a] px-1.5 py-0.5 border border-[#926d0a]/40 rounded bg-[#fdf9f0]">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Menu (9 items exactos solicitados) */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-medium text-[#4b5266]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === 'blog' && currentTab.startsWith('blog'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors hover:text-[#171923] cursor-pointer py-1 ${
                  isActive 
                    ? 'text-[#926d0a] font-bold border-b-2 border-[#926d0a]' 
                    : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Highlighted Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Theme Toggle (Light/Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-[#ded5c5] bg-white text-[#4b5266] hover:text-[#926d0a] hover:border-[#926d0a]/40 transition-colors shadow-sm cursor-pointer"
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Cambiar tema claro u oscuro"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 p-2 rounded-lg border border-[#ded5c5] bg-white text-xs font-semibold text-[#1e2230] hover:border-[#926d0a]/40 transition-colors shadow-sm cursor-pointer"
              title="Cambiar idioma de la plataforma"
            >
              <span>{TRANSLATIONS[lang]?.flag || '🇪🇸'}</span>
              <span className="hidden sm:inline uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3 text-[#646b80]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-[#ded5c5] bg-white p-1.5 shadow-xl z-50 animate-fade-in text-[#1e2230]">
                {languages.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      onSelectLang(l.id);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      lang === l.id
                        ? 'bg-[#fbf7ee] text-[#926d0a] font-bold'
                        : 'text-[#4b5266] hover:bg-[#f6f2ea] hover:text-[#171923]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Settings */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-lg border border-[#ded5c5] bg-white text-[#4b5266] hover:text-[#926d0a] hover:border-[#926d0a]/40 transition-colors shadow-sm cursor-pointer"
            title={t.accessibility?.title || 'Accesibilidad'}
            aria-label="Opciones de accesibilidad e inclusión"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Download Source Code Modal Trigger */}
          {onOpenSourceCode && (
            <button
              onClick={onOpenSourceCode}
              className="p-2 rounded-lg border border-[#ded5c5] bg-white text-[#4b5266] hover:text-[#926d0a] hover:border-[#926d0a]/40 transition-colors shadow-sm cursor-pointer"
              title="Descargar código fuente y guía de dominio propio"
              aria-label="Descargar código fuente"
            >
              <Download className="w-4 h-4 text-[#926d0a]" />
            </button>
          )}

          {/* Botón destacado: Comenzar análisis */}
          <button
            onClick={onStartAnalysis}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2c15c] to-[#c79d28] px-3 sm:px-4 py-2 text-xs font-bold text-[#0c0d12] shadow-sm hover:brightness-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#0c0d12]" />
            <span>Comenzar análisis</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border border-[#ded5c5] bg-white text-[#171923] hover:text-[#926d0a] transition-colors shadow-sm cursor-pointer ml-1"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Menu Hamburguesa) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#ded5c5] bg-white/98 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id || (item.id === 'blog' && currentTab.startsWith('blog'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#fbf7ee] text-[#926d0a] font-bold border border-[#d4af37]/30'
                      : 'text-[#333a4d] hover:bg-[#faf6ee] hover:text-[#171923]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#926d0a]" />}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons in Mobile */}
          <div className="mt-4 pt-4 border-t border-[#ded5c5] space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenDonate();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#ded5c5] bg-[#faf6ee] text-xs font-semibold text-[#171923]"
              >
                <Heart className="w-3.5 h-3.5 text-[#926d0a]" />
                <span>Donar</span>
              </button>

              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#ded5c5] bg-[#faf6ee] text-xs font-semibold text-[#171923]"
              >
                <Mail className="w-3.5 h-3.5 text-[#926d0a]" />
                <span>Contacto</span>
              </button>
            </div>

            {onOpenSourceCode && (
              <button
                onClick={() => {
                  onOpenSourceCode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#d4af37] bg-[#fbf7ee] text-xs font-bold text-[#171923]"
              >
                <Download className="w-3.5 h-3.5 text-[#926d0a]" />
                <span>Descargar Código / Dominio Propio</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
