import React, { useState } from 'react';
import { 
  BookOpen, Search, Clock, Calendar, ChevronRight, Tag, Sparkles, Filter 
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface BlogIndexPageProps {
  onNavigate: (path: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos (20)' },
    { id: 'mian-xiang', label: 'Mian Xiang (7)' },
    { id: 'quiromancia', label: 'Quiromancia (7)' },
    { id: 'tecnologia', label: 'Tecnología e IA (3)' },
    { id: 'cultura', label: 'Reflexión y Cultura (3)' }
  ];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in text-[#191c28] py-2">
      {/* Blog Hero Banner */}
      <div className="rounded-3xl border border-[#ded5c5] bg-gradient-to-r from-white via-[#fbf7ee] to-white p-6 sm:p-10 shadow-sm text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 text-xs font-semibold text-[#8b6508]">
          <BookOpen className="w-3.5 h-3.5 text-[#926d0a]" />
          <span>Biblioteca y Artículos Educativos</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171923]">
          Ensayos y Tratados de Sabiduría Clásica
        </h1>
        <p className="text-xs sm:text-sm text-[#4b5266] max-w-2xl mx-auto leading-relaxed">
          Explora nuestra colección de 20 artículos originales dedicados al Mian Xiang, la historia de la quiromancia, la tecnología de visión por computador y los límites éticos de la interpretación tradicional.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 absolute left-3.5 top-5 text-[#8b91a5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por tema (frente, nariz, corazón, ciencia...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-xs text-[#191c28] placeholder-[#8b91a5] focus:outline-none focus:border-[#926d0a] shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                : 'bg-white border border-[#ded5c5] text-[#4b5266] hover:bg-[#faf6ee] hover:text-[#171923]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* AdSense Slot 1: Desktop in blog */}
      <AdPlaceholder slot="desktop-in-blog" />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredArticles.map((article, index) => (
          <article
            key={article.id}
            onClick={() => onNavigate(`/blog/${article.slug}`)}
            className="group rounded-2xl border border-[#ded5c5] bg-white p-6 space-y-4 hover:border-[#b89028] transition-all cursor-pointer shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono uppercase px-2 py-0.5 rounded bg-[#fbf7ee] text-[#8b6508] font-bold border border-[#ded5c5]">
                  {article.categoryLabel}
                </span>
                <span className="text-[#6b7280] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#926d0a]" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="font-editorial text-lg font-bold text-[#171923] group-hover:text-[#926d0a] transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-[#4b5266] line-clamp-3 leading-relaxed font-normal">
                {article.metaDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-[#f0eae0] flex items-center justify-between text-xs">
              <span className="text-[#6b7280] text-[11px] font-medium">
                Por {article.author}
              </span>
              <span className="font-bold text-[#926d0a] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Leer artículo <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="p-12 text-center text-xs text-[#6b7280]">
          No se encontraron artículos con el término ingresado. Intenta con otra palabra clave.
        </div>
      )}

      {/* AdSense Slot 2 */}
      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
