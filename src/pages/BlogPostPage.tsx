import React, { useEffect } from 'react';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, HelpCircle, 
  ChevronRight, CheckCircle2, ShieldAlert, Sparkles, BookOpen 
} from 'lucide-react';
import { BlogArticle } from '../data/blogArticles';
import { SITE_CONFIG, MANDATORY_LEGAL_NOTICE } from '../config/siteConfig';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface BlogPostPageProps {
  article: BlogArticle;
  onNavigate: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ article, onNavigate }) => {
  // Inject structured data for Article and FAQPage if present
  useEffect(() => {
    // Schema.org Article
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.metaDescription,
      "author": {
        "@type": "Person",
        "name": article.author,
        "url": `${SITE_CONFIG.siteUrl}/sobre-nosotros`
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.siteUrl
      },
      "datePublished": article.publishDate,
      "inLanguage": "es"
    };

    // Schema.org FAQPage if FAQs exist
    const faqSchema = article.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify([articleSchema, ...(faqSchema ? [faqSchema] : [])]);
    script.id = 'article-structured-data';

    // Remove existing if any
    const existing = document.getElementById('article-structured-data');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('article-structured-data');
      if (el) el.remove();
    };
  }, [article]);

  return (
    <div className="space-y-8 animate-fade-in text-[#191c28] py-2 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6b7280]">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-[#171923] cursor-pointer"
        >
          Inicio
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('/blog')}
          className="hover:text-[#171923] cursor-pointer"
        >
          Blog
        </button>
        <span>/</span>
        <span className="text-[#926d0a] font-medium truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Back to Blog Button */}
      <div>
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs text-[#4b5266] hover:text-[#171923] font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al índice de artículos</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#ded5c5] pb-6">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-mono uppercase px-2.5 py-0.5 rounded bg-[#fbf7ee] text-[#8b6508] font-bold border border-[#ded5c5]">
            {article.categoryLabel}
          </span>
          <span className="text-[#6b7280] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#926d0a]" />
            {article.readTime}
          </span>
          <span className="text-[#6b7280] font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#926d0a]" />
            {article.publishDate}
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] leading-tight">
          {article.title}
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[#8b6508] leading-relaxed font-semibold">
          {article.metaDescription}
        </p>

        <div className="flex items-center gap-2 pt-1 text-xs text-[#6b7280]">
          <User className="w-3.5 h-3.5 text-[#926d0a]" />
          <span>Autor: <strong className="text-[#171923]">{article.author}</strong></span>
          <span>·</span>
          <span>Proyecto {SITE_CONFIG.name}</span>
        </div>
      </header>

      {/* AdSense Slot In-Article (arriba) */}
      <AdPlaceholder slot="desktop-in-blog" />

      {/* Article Body */}
      <article className="space-y-8 text-[#2a2f3f] leading-relaxed text-sm sm:text-base font-normal">
        {/* Intro */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#fbf7ee] border border-[#ded5c5] text-xs sm:text-sm text-[#191c28] leading-relaxed font-medium">
          {article.intro}
        </div>

        {/* Content Sections */}
        {article.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#171923] pt-2 border-b border-[#f0eae0] pb-1.5">
              {sec.heading}
            </h2>
            {sec.subheading && (
              <h3 className="font-serif text-base sm:text-lg text-[#8b6508] font-semibold italic">
                {sec.subheading}
              </h3>
            )}
            <div className="space-y-3 text-xs sm:text-sm text-[#333a4c] leading-relaxed font-normal">
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </section>
        ))}

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#faf7f0] border-2 border-[#d4af37]/60 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#926d0a] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Puntos Clave de este Ensayo
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#191c28] font-medium">
              {article.keyTakeaways.map((point, kIdx) => (
                <li key={kIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conclusion */}
        <section className="space-y-2 pt-2 border-t border-[#ded5c5]">
          <h2 className="font-editorial text-xl font-bold text-[#171923]">
            Conclusión y Reflexión
          </h2>
          <p className="text-xs sm:text-sm text-[#333a4c] leading-relaxed">
            {article.conclusion}
          </p>
        </section>

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-[#ded5c5]">
            <h3 className="font-editorial text-xl font-bold text-[#171923] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#926d0a]" />
              <span>Preguntas Frecuentes sobre este Tema</span>
            </h3>
            <div className="space-y-2">
              {article.faqs.map((faq, fIdx) => (
                <details
                  key={fIdx}
                  className="rounded-xl border border-[#ded5c5] bg-white p-3.5 open:border-[#b89028] transition-all shadow-sm"
                >
                  <summary className="text-xs sm:text-sm font-bold text-[#171923] cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-xs text-[#4b5266] leading-relaxed pt-2 border-t border-[#f0eae0]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Tool Banner in Blog */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-white via-[#fbf7ee] to-white border-2 border-[#d4af37]/60 text-center space-y-3 shadow-sm">
          <h3 className="font-editorial text-xl font-bold text-[#171923]">
            ¿Deseas explorar estos conceptos en tu propio rostro o manos?
          </h3>
          <p className="text-xs text-[#4b5266] max-w-md mx-auto">
            Utiliza nuestra herramienta interactiva con tu cámara o una fotografía para observar proporciones y generar tu informe PDF.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('/analizar-rostro')}
              className="py-2.5 px-4 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Analizar mi Rostro
            </button>
            <button
              onClick={() => onNavigate('/analizar-mano')}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#faf6ee] text-[#191c28] border border-[#b89028] font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Analizar mi Mano
            </button>
          </div>
        </div>

        {/* Related Internal Links */}
        {article.internalLinks && article.internalLinks.length > 0 && (
          <section className="space-y-2.5 pt-4 border-t border-[#ded5c5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923]">
              Lecturas Relacionadas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {article.internalLinks.map((link, lIdx) => (
                <button
                  key={lIdx}
                  onClick={() => onNavigate(`/blog/${link.slug}`)}
                  className="p-3 rounded-xl border border-[#ded5c5] bg-white hover:border-[#b89028] hover:bg-[#faf6ee] transition-all text-left text-xs font-semibold text-[#191c28] flex items-center justify-between gap-2 shadow-sm cursor-pointer"
                >
                  <span className="truncate">{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#926d0a] shrink-0" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <strong>Aviso de la Obra:</strong> {article.disclaimer} {MANDATORY_LEGAL_NOTICE}
          </p>
        </div>
      </article>

      {/* AdSense Slot Pre-footer */}
      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
