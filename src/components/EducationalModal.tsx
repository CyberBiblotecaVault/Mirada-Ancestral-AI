import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/educationalContent';
import { BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: () => void;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(EDUCATIONAL_ARTICLES[0].id);

  if (!isOpen) return null;

  const activeArticle = EDUCATIONAL_ARTICLES.find(a => a.id === selectedArticleId) || EDUCATIONAL_ARTICLES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex justify-center animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white text-[#191c28] rounded-2xl border-2 border-[#d4af37]/60 shadow-2xl flex flex-col my-auto max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#ded5c5] bg-[#faf7f0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold">
                Biblioteca Cultural
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#171923]">
                Aprender sobre la Tradición Oriental
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onStartAnalysis();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Probar Análisis
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6b7280] hover:text-[#171923] rounded-lg hover:bg-[#f6f2ea] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar list + Active Article */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Article List */}
          <div className="md:col-span-4 border-r border-[#ded5c5] bg-[#fcfaf6] p-3 overflow-y-auto max-h-[40vh] md:max-h-full">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] font-bold px-2 py-1 block">
              Tratados y Lecciones
            </span>
            <div className="space-y-1.5 mt-1">
              {EDUCATIONAL_ARTICLES.map((article) => {
                const isSelected = article.id === selectedArticleId;
                return (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-white border border-[#b89028] text-[#171923] shadow-sm font-semibold'
                        : 'border border-transparent text-[#4b5266] hover:bg-[#f6f0e4] hover:text-[#171923]'
                    }`}
                  >
                    <div>
                      <span className="font-editorial font-bold block text-sm text-[#171923]">
                        {article.title}
                      </span>
                      <span className="text-[11px] text-[#6b7280] block line-clamp-1 mt-0.5">
                        {article.subtitle}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isSelected ? 'text-[#926d0a] rotate-90' : 'text-[#8b91a5]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Article Reader */}
          <div className="md:col-span-8 p-6 sm:p-8 overflow-y-auto bg-white">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Article Meta */}
              <div className="border-b border-[#ded5c5] pb-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280] mb-2 font-medium">
                  <span className="flex items-center gap-1.5 text-[#926d0a] font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeArticle.era}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#926d0a]" />
                    {activeArticle.readTime}
                  </span>
                </div>
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
                  {activeArticle.title}
                </h1>
                <p className="font-serif italic text-sm text-[#8b6508] mt-1 font-semibold">
                  {activeArticle.subtitle}
                </p>
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyPoints && activeArticle.keyPoints.length > 0 && (
                <div className="p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#926d0a] block">
                    Conceptos Fundamentales:
                  </span>
                  <div className="space-y-1.5 text-xs text-[#333a4c] font-medium">
                    {activeArticle.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Body */}
              <div className="space-y-4 text-sm text-[#2a2f3f] leading-relaxed font-sans">
                {Array.isArray(activeArticle.content)
                  ? activeArticle.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  : <p>{activeArticle.content}</p>
                }
              </div>

              {/* Next Steps CTA */}
              <div className="pt-6 border-t border-[#ded5c5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#525970] font-medium">
                  ¿Listo para explorar estas nociones en tu propio rostro o manos?
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onStartAnalysis();
                  }}
                  className="px-5 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  Comenzar Exploración
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
