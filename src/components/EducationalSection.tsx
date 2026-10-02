import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/educationalContent';
import { BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, Sparkles, ScanFace, Hand } from 'lucide-react';

interface EducationalSectionProps {
  onAnalyzeFace: () => void;
  onAnalyzeHands: () => void;
}

export const EducationalSection: React.FC<EducationalSectionProps> = ({
  onAnalyzeFace,
  onAnalyzeHands
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(EDUCATIONAL_ARTICLES[0].id);

  const activeArticle = EDUCATIONAL_ARTICLES.find(a => a.id === selectedArticleId) || EDUCATIONAL_ARTICLES[0];

  return (
    <div className="space-y-6 py-2 animate-fade-in text-[#191c28]">
      {/* Intro banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-white via-[#fbf7ee] to-white border border-[#ded5c5] shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca y Tratados Antiguos</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
          Tradición y Sabiduría Oriental
        </h2>
        <p className="text-xs sm:text-sm text-[#4b5266] mt-1 max-w-2xl leading-relaxed font-medium">
          Explora la historia, filosofía y reglas clásicas de la fisonomía china (Mian Xiang 面相), el equilibrio de los Tres Reinos (San Ting), las Cinco Fases (Wu Xing) y la quiromancia tradicional.
        </p>

        {/* Quick action buttons */}
        <div className="mt-4 pt-3 border-t border-[#ded5c5] flex flex-wrap gap-2.5">
          <button
            onClick={onAnalyzeFace}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <ScanFace className="w-3.5 h-3.5" />
            <span>Probar en mi Rostro</span>
          </button>
          <button
            onClick={onAnalyzeHands}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#191c28] bg-white hover:bg-[#f6f2ea] border border-[#b89028] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Hand className="w-3.5 h-3.5 text-[#926d0a]" />
            <span>Probar en mis Manos</span>
          </button>
        </div>
      </div>

      {/* Main Educational Reader Layout */}
      <div className="rounded-2xl border border-[#ded5c5] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-md">
        {/* Left Column: Navigation list */}
        <div className="md:col-span-4 border-r border-[#ded5c5] bg-[#fcfaf6] p-3 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-[#6b7280] font-bold px-2 block">
            Tratados y Ensayos Clásicos
          </span>
          <div className="space-y-1.5">
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
        <div className="md:col-span-8 p-6 sm:p-8 bg-white">
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
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171923]">
                {activeArticle.title}
              </h3>
              <p className="font-serif italic text-sm text-[#8b6508] mt-1 font-semibold">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Article Body */}
            <div className="space-y-4 text-xs sm:text-sm text-[#2a2f3f] leading-relaxed font-normal">
              {Array.isArray(activeArticle.content)
                ? activeArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                : <p>{activeArticle.content}</p>
              }
            </div>

            {/* Key Points */}
            {activeArticle.keyPoints && activeArticle.keyPoints.length > 0 && (
              <div className="p-4 sm:p-5 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#926d0a] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Principios Clave de este Tratado
                </span>
                <ul className="space-y-2 text-xs text-[#333a4c] font-medium">
                  {activeArticle.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Educational Disclaimer */}
            <div className="text-[11px] text-[#6b7280] italic border-t border-[#ded5c5] pt-3">
              * Textos curados de referencias históricas y tratados de fisonomía oriental con propósitos estrictamente culturales, educativos y recreativos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
