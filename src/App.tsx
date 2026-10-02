import React, { useState, useEffect } from 'react';
import { 
  AnalysisType, HandSelection, AnalysisReport, AuditLogEntry, 
  SupportedLanguage, ThemeMode, AccessibilitySettings 
} from './types';
import { processVisualAnalysis } from './utils/imageAnalyzer';
import { saveReportToStorage, getSavedReports, deleteSavedReport, clearAllLocalData } from './utils/reportExporter';
import { TRANSLATIONS, speechNarrator } from './utils/i18n';
import { BLOG_ARTICLES, BlogArticle } from './data/blogArticles';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { AnalyzeFacePage } from './pages/AnalyzeFacePage';
import { AnalyzeHandPage } from './pages/AnalyzeHandPage';
import { MianXiangPage } from './pages/MianXiangPage';
import { QuiromanciaPage } from './pages/QuiromanciaPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ReportPage } from './pages/ReportPage';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CameraCapture } from './components/CameraCapture';
import { FaceMapViewer } from './components/FaceMapViewer';
import { HandMapViewer } from './components/HandMapViewer';
import { EducationalSection } from './components/EducationalSection';
import { SavedReportsSection } from './components/SavedReportsSection';
import { AnalysisResults } from './components/AnalysisResults';
import { FullReportModal } from './components/FullReportModal';
import { EducationalModal } from './components/EducationalModal';
import { SavedReportsModal } from './components/SavedReportsModal';
import { AuditLogDrawer } from './components/AuditLogDrawer';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieModal } from './components/CookieModal';
import { CookieBanner } from './components/CookieBanner';
import { LegalTermsModal, LegalTabType } from './components/LegalTermsModal';
import { DonateModal } from './components/DonateModal';
import { ContactModal } from './components/ContactModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { SourceCodeModal } from './components/SourceCodeModal';
import { AudioNarratorBar } from './components/AudioNarratorBar';
import { Footer } from './components/Footer';
import { Sparkles, ScanFace, Hand, ArrowLeft, RefreshCw, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('face');
  const [selectedHand, setSelectedHand] = useState<HandSelection>('left');
  
  // Language & Internationalization
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('mirada_language');
    return (saved as SupportedLanguage) || 'es';
  });

  // Theme: Default to pure light mode for maximum legibility as requested
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('mirada_theme_mode');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const isDarkMode = themeMode === 'dark';

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
    localStorage.setItem('mirada_theme_mode', themeMode);
  }, [themeMode, isDarkMode]);

  // Accessibility Settings (Font scale, High contrast, Speech narrator)
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('mirada_accessibility');
    return saved ? JSON.parse(saved) : {
      fontSize: 'normal',
      highContrast: false,
      speechEnabled: false,
      readingSpeed: 1.0,
    };
  });

  useEffect(() => {
    document.body.classList.toggle('font-large', accessibility.fontSize === 'large');
    document.body.classList.toggle('font-xlarge', accessibility.fontSize === 'xlarge');
    document.body.classList.toggle('high-contrast', accessibility.highContrast);
    localStorage.setItem('mirada_accessibility', JSON.stringify(accessibility));
  }, [accessibility]);

  // Speech Narration State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCaption, setCurrentCaption] = useState<string | undefined>(undefined);

  // Modals & Overlays
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isFullReportOpen, setIsFullReportOpen] = useState<boolean>(false);
  const [isEducationalOpen, setIsEducationalOpen] = useState<boolean>(false);
  const [isSavedReportsOpen, setIsSavedReportsOpen] = useState<boolean>(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>('como-funciona');
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);
  const [isSourceCodeOpen, setIsSourceCodeOpen] = useState<boolean>(false);

  // Data & Reports
  const [currentReport, setCurrentReport] = useState<AnalysisReport | null>(null);
  const [savedReports, setSavedReports] = useState<AnalysisReport[]>([]);
  const [capturedFaceImage, setCapturedFaceImage] = useState<string | undefined>(undefined);
  const [capturedHandImage, setCapturedHandImage] = useState<string | undefined>(undefined);
  const [pendingAnalysisType, setPendingAnalysisType] = useState<AnalysisType>('face');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize saved reports from storage
  useEffect(() => {
    const list = getSavedReports();
    setSavedReports(list);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // URL Path Routing Listener
  const handleNavigate = (path: string) => {
    setIsCapturing(false);
    setIsDisclaimerOpen(false);
    setIsEducationalOpen(false);
    setIsSavedReportsOpen(false);

    if (path === '/' || path === '/inicio' || path === 'inicio') {
      setCurrentTab('inicio');
      setActiveBlogSlug(null);
    } else if (path === '/analizar-rostro' || path === 'analizar-rostro' || path === 'rostro') {
      setCurrentTab('analizar-rostro');
      setActiveBlogSlug(null);
    } else if (path === '/analizar-mano' || path === 'analizar-mano' || path === 'manos') {
      setCurrentTab('analizar-mano');
      setActiveBlogSlug(null);
    } else if (path === '/mian-xiang' || path === 'mian-xiang') {
      setCurrentTab('mian-xiang');
      setActiveBlogSlug(null);
    } else if (path === '/quiromancia' || path === 'quiromancia') {
      setCurrentTab('quiromancia');
      setActiveBlogSlug(null);
    } else if (path === '/blog' || path === 'blog') {
      setCurrentTab('blog');
      setActiveBlogSlug(null);
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').trim();
      setActiveBlogSlug(slug);
      setCurrentTab('blog-post');
    } else if (path === '/informe' || path === 'informe') {
      setCurrentTab('informe');
      setActiveBlogSlug(null);
    } else if (path === '/informes' || path === 'informes') {
      setCurrentTab('informes');
      setActiveBlogSlug(null);
    } else if (path === '/resultado' || path === 'resultado') {
      setCurrentTab('resultado');
      setActiveBlogSlug(null);
    } else if (path === '/como-funciona' || path === 'como-funciona') {
      setLegalModalTab('como-funciona');
      setIsLegalModalOpen(true);
    } else if (path === '/privacidad' || path === 'privacidad') {
      setIsPrivacyModalOpen(true);
    } else if (path === '/cookies' || path === 'cookies') {
      setIsCookieModalOpen(true);
    } else if (path === '/terminos' || path === 'terminos') {
      setLegalModalTab('terminos');
      setIsLegalModalOpen(true);
    } else if (path === '/aviso-legal' || path === 'aviso-legal') {
      setLegalModalTab('aviso-legal');
      setIsLegalModalOpen(true);
    } else if (path === '/sobre-nosotros' || path === 'sobre-nosotros') {
      setLegalModalTab('sobre-nosotros');
      setIsLegalModalOpen(true);
    } else if (path === '/contacto' || path === 'contacto') {
      setIsContactOpen(true);
    } else if (path === '/descargar-codigo' || path === 'descargar-codigo') {
      setIsSourceCodeOpen(true);
    } else {
      setCurrentTab('inicio');
      setActiveBlogSlug(null);
    }

    if (typeof window !== 'undefined' && window.history && path.startsWith('/')) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync initial URL on mount and handle popstate (Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path && path !== '/') {
        handleNavigate(path);
      } else {
        handleNavigate('/');
      }
    };

    if (window.location.pathname && window.location.pathname !== '/') {
      handleNavigate(window.location.pathname);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Anticopy Protection Listener on Sensitive Zones
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('.anticopy-zone')) {
        e.preventDefault();
        showToast('Contenido protegido por derechos de autor © 2026 Gustavo Gómez — Todos los derechos reservados.');
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const handleSelectLanguage = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('mirada_language', newLang);
    showToast(`Idioma cambiado a ${TRANSLATIONS[newLang]?.name || newLang}`);
  };

  const handleToggleTheme = () => {
    if (themeMode === 'auto') {
      setThemeMode(isDarkMode ? 'light' : 'dark');
    } else if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  // Voice Narration
  const handleStartVoiceReading = (customText?: string) => {
    let text = customText;
    if (!text && currentReport) {
      text = `Informe tradicional de ${currentReport.userName || 'Consultante Cultural'}. ${currentReport.generalSynthesis}. `;
      currentReport.dimensions.forEach((dim) => {
        text += `${dim.title}. Pregunta: ${dim.question}. Veredicto: ${dim.directVerdict}. Explicación: ${dim.directExplanation}. `;
      });
    } else if (!text) {
      text = 'Bienvenido a Mirada Ancestral AI. Explora las tradiciones de fisonomía y quiromancia con tecnología moderna.';
    }

    setCurrentCaption(text.slice(0, 150) + '...');
    setIsSpeaking(true);

    speechNarrator.speak(
      text,
      lang,
      accessibility.readingSpeed,
      () => {
        setIsSpeaking(false);
        setCurrentCaption(undefined);
      }
    );
  };

  const handleStopVoiceReading = () => {
    speechNarrator.stop();
    setIsSpeaking(false);
    setCurrentCaption(undefined);
  };

  // Initiate analysis flow
  const initiateAnalysisFlow = (type: AnalysisType) => {
    setPendingAnalysisType(type);
    const alreadyAccepted = sessionStorage.getItem('mirada_disclaimer_accepted') === 'true';
    if (alreadyAccepted) {
      setAnalysisType(type);
      setIsCapturing(true);
    } else {
      setIsDisclaimerOpen(true);
    }
  };

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem('mirada_disclaimer_accepted', 'true');
    setIsDisclaimerOpen(false);
    setAnalysisType(pendingAnalysisType);
    setIsCapturing(true);
  };

  const handleImagesReady = async (faceDataUrl?: string, handDataUrl?: string) => {
    setIsCapturing(false);
    setIsAnalyzing(true);
    setCapturedFaceImage(faceDataUrl);
    setCapturedHandImage(handDataUrl);

    try {
      const report = await processVisualAnalysis({
        analysisType,
        selectedHand,
        faceImageUrl: faceDataUrl,
        handImageUrl: handDataUrl,
        userName: 'Consultante Cultural'
      });

      setCurrentReport(report);
      setIsAnalyzing(false);
      setCurrentTab('resultado');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (accessibility.speechEnabled) {
        handleStartVoiceReading();
      }
    } catch (err) {
      setIsAnalyzing(false);
      showToast('Error procesando imagen localmente. Inténtalo nuevamente.');
    }
  };

  const handleSaveCurrentReport = () => {
    if (!currentReport) return;
    saveReportToStorage(currentReport);
    setSavedReports(getSavedReports());
    showToast('Informe guardado en el almacenamiento local de tu navegador.');
  };

  const handleDeleteSavedReport = (id: string) => {
    deleteSavedReport(id);
    const updated = getSavedReports();
    setSavedReports(updated);
    if (currentReport && currentReport.id === id) {
      setCurrentReport(null);
      setCurrentTab('inicio');
    }
    showToast('Informe eliminado con éxito.');
  };

  const handlePurgeAll = () => {
    clearAllLocalData();
    setSavedReports([]);
    setCurrentReport(null);
    setCapturedFaceImage(undefined);
    setCapturedHandImage(undefined);
    setIsCapturing(false);
    handleStopVoiceReading();
    showToast('Todas las fotografías y registros han sido purgados.');
  };

  const isCurrentReportSaved = currentReport
    ? savedReports.some(r => r.id === currentReport.id)
    : false;

  // Active blog article lookup
  const activeBlogArticle = activeBlogSlug
    ? BLOG_ARTICLES.find(a => a.slug === activeBlogSlug) || BLOG_ARTICLES[0]
    : null;

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#191c28] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#191c28]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        onOpenAudit={() => setIsAuditDrawerOpen(true)}
        onStartAnalysis={() => initiateAnalysisFlow('face')}
        savedCount={savedReports.length}
        lang={lang}
        onSelectLang={handleSelectLanguage}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenDonate={() => setIsDonateOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSourceCode={() => setIsSourceCodeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-3 sm:px-6 lg:px-8 py-5">
        {/* Active Analysis Banner (shown when navigating away from results) */}
        {currentReport && currentTab !== 'resultado' && !isCapturing && (
          <div className="mb-6 p-3 px-4 rounded-xl bg-gradient-to-r from-white via-[#fbf8f2] to-white border border-[#d4af37]/50 flex items-center justify-between gap-3 text-xs animate-fade-in shadow-sm text-[#191c28]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#926d0a] shrink-0" />
              <span>
                Tienes un análisis activo para <strong>{currentReport.userName || 'Consultante Cultural'}</strong> ({currentReport.analysisType.toUpperCase()}).
              </span>
            </div>
            <button
              onClick={() => handleNavigate('/resultado')}
              className="flex items-center gap-1 font-semibold text-[#926d0a] hover:underline whitespace-nowrap cursor-pointer"
            >
              <span>Ver mi resultado</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isAnalyzing && (
          <div className="my-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin" />
              <div className="absolute inset-3 rounded-full border-2 border-emerald-500/20 border-b-emerald-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center text-[#926d0a]">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#171923]">
                Extrayendo Proporciones Geométricas...
              </h3>
              <p className="text-xs text-[#4b5266] mt-1 max-w-sm mx-auto">
                Mapeando los Tres Reinos (San Ting), alineación de oficialías y reglas clásicas de los tratados orientales en memoria local.
              </p>
            </div>
          </div>
        )}

        {/* Live Camera Capture Modal/View */}
        {!isAnalyzing && isCapturing && (
          <CameraCapture
            analysisType={analysisType}
            selectedHand={selectedHand}
            onSelectHand={setSelectedHand}
            onSelectAnalysisType={(type) => setAnalysisType(type)}
            onNavigateTab={handleNavigate}
            onImageReady={handleImagesReady}
            onCancel={() => setIsCapturing(false)}
          />
        )}

        {/* Primary Views (when not capturing and not analyzing) */}
        {!isAnalyzing && !isCapturing && (
          <>
            {/* VIEW: INICIO (HOME) */}
            {currentTab === 'inicio' && (
              <HomePage onNavigate={handleNavigate} />
            )}

            {/* VIEW: ANALIZAR ROSTRO */}
            {currentTab === 'analizar-rostro' && (
              <AnalyzeFacePage
                onNavigate={handleNavigate}
                onAnalysisComplete={(photo) => {
                  setCapturedFaceImage(photo);
                  handleImagesReady(photo, undefined);
                }}
              />
            )}

            {/* VIEW: ANALIZAR MANO */}
            {currentTab === 'analizar-mano' && (
              <AnalyzeHandPage
                onNavigate={handleNavigate}
                onAnalysisComplete={(photo) => {
                  setCapturedHandImage(photo);
                  handleImagesReady(undefined, photo);
                }}
              />
            )}

            {/* VIEW: MIAN XIANG */}
            {currentTab === 'mian-xiang' && (
              <MianXiangPage onNavigate={handleNavigate} />
            )}

            {/* VIEW: QUIROMANCIA */}
            {currentTab === 'quiromancia' && (
              <QuiromanciaPage onNavigate={handleNavigate} />
            )}

            {/* VIEW: BLOG CATALOG */}
            {currentTab === 'blog' && (
              <BlogIndexPage onNavigate={handleNavigate} />
            )}

            {/* VIEW: BLOG ARTICLE READER */}
            {currentTab === 'blog-post' && activeBlogArticle && (
              <BlogPostPage
                article={activeBlogArticle}
                onNavigate={handleNavigate}
              />
            )}

            {/* VIEW: INFORME OFICIAL DESCARGABLE */}
            {currentTab === 'informe' && (
              <ReportPage
                onNavigate={handleNavigate}
                currentReport={currentReport}
                capturedFaceImage={capturedFaceImage}
                capturedHandImage={capturedHandImage}
              />
            )}

            {/* VIEW: INFORMES GUARDADOS */}
            {currentTab === 'informes' && (
              <SavedReportsSection
                savedReports={savedReports}
                onOpenReport={(rep) => {
                  setCurrentReport(rep);
                  setCurrentTab('resultado');
                }}
                onDeleteReport={handleDeleteSavedReport}
                onClearAll={handlePurgeAll}
                onNewAnalysis={() => initiateAnalysisFlow('face')}
              />
            )}

            {/* VIEW: RESULTADO ACTIVO DE ANÁLISIS */}
            {currentTab === 'resultado' && currentReport && (
              <div className="space-y-10 animate-fade-in anticopy-zone">
                {/* Top Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ded5c5] pb-4">
                  <button
                    onClick={() => handleNavigate('/')}
                    className="flex items-center gap-1.5 text-xs text-[#4b5266] hover:text-[#171923] font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver al Inicio</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Read Aloud Button */}
                    <button
                      onClick={() => isSpeaking ? handleStopVoiceReading() : handleStartVoiceReading()}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSpeaking
                          ? 'border-rose-400 bg-rose-50 text-rose-700 animate-pulse'
                          : 'border-[#ded5c5] bg-white text-[#191c28] hover:border-[#926d0a]'
                      }`}
                      title="Lectura en voz alta del informe"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#926d0a]" />
                      <span>{isSpeaking ? 'Detener Voz' : 'Escuchar Informe'}</span>
                    </button>

                    {/* Go to Printable / Downloadable Report Page */}
                    <button
                      onClick={() => handleNavigate('/informe')}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <span>Descargar PDF / Word</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Interactive Results Component */}
                <AnalysisResults
                  report={currentReport}
                  isSaved={isCurrentReportSaved}
                  onSaveReport={handleSaveCurrentReport}
                  onGenerateFullReport={() => handleNavigate('/informe')}
                  onClearResult={() => {
                    setCurrentReport(null);
                    handleNavigate('/');
                  }}
                  onDeletePhotos={() => {
                    setCapturedFaceImage(undefined);
                    setCapturedHandImage(undefined);
                    showToast('Fotografías eliminadas de la memoria local.');
                  }}
                  onUpdateUserName={(name) => {
                    if (currentReport) {
                      setCurrentReport({ ...currentReport, userName: name });
                    }
                  }}
                />

                {/* Interactive Visual Map according to modality */}
                <div className="pt-8 border-t border-[#ded5c5]">
                  <div className="mb-4">
                    <h3 className="font-editorial text-xl font-bold text-[#171923]">
                      Exploración Visual Interactiva de Puntos y Zonas
                    </h3>
                    <p className="text-xs text-[#525970]">
                      Haz clic en cualquier punto del mapa para consultar la correspondencia clásica y la observación fisonómica.
                    </p>
                  </div>

                  {currentReport.analysisType === 'face' ? (
                    <FaceMapViewer />
                  ) : (
                    <HandMapViewer
                      selectedHand={currentReport.selectedHand || 'left'}
                      onSelectHand={(hand) => setSelectedHand(hand)}
                      onAnalyzeHand={() => initiateAnalysisFlow('hand')}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Audio Narrator Indicator */}
      <AudioNarratorBar
        isSpeaking={isSpeaking}
        currentCaption={currentCaption}
        onPlay={() => handleStartVoiceReading()}
        onStop={handleStopVoiceReading}
        lang={lang}
      />

      {/* Bottom Sticky Mobile Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        savedCount={savedReports.length}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPreferences={() => setIsCookieModalOpen(true)} />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenCookies={() => setIsCookieModalOpen(true)}
        onOpenLegal={(tab) => {
          setLegalModalTab(tab);
          setIsLegalModalOpen(true);
        }}
        onOpenAudit={() => setIsAuditDrawerOpen(true)}
        onOpenDonate={() => setIsDonateOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSourceCode={() => setIsSourceCodeOpen(true)}
        lang={lang}
      />

      {/* Modals & Overlays */}
      <SourceCodeModal
        isOpen={isSourceCodeOpen}
        onClose={() => setIsSourceCodeOpen(false)}
      />
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleAcceptDisclaimer}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onPurgeAllData={handlePurgeAll}
      />

      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />

      <LegalTermsModal
        isOpen={isLegalModalOpen}
        activeTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
        onSelectTab={(tab) => setLegalModalTab(tab)}
      />

      <AuditLogDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
        logs={currentReport?.auditLogs || []}
      />

      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={(partial) => setAccessibility(prev => ({ ...prev, ...partial }))}
        themeMode={themeMode}
        onUpdateThemeMode={setThemeMode}
        lang={lang}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        lang={lang}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 md:bottom-6 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[#d4af37] text-[#191c28] font-bold text-xs shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#926d0a]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
