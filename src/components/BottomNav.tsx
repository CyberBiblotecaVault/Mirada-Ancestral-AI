import React from 'react';
import { Home, ScanFace, Hand, BookOpen, FileText } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, savedCount }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'analizar-rostro', label: 'Rostro', icon: ScanFace },
    { id: 'analizar-mano', label: 'Mano', icon: Hand },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'informe', label: 'Informe', icon: FileText, badge: savedCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-[#ded5c5] backdrop-blur-md px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'blog' && currentTab.startsWith('blog'));
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors relative cursor-pointer ${
                isActive ? 'text-[#926d0a] font-bold' : 'text-[#646b80] hover:text-[#171923]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight font-medium whitespace-nowrap">
                {item.label}
              </span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span className="absolute top-0 right-1 w-4 h-4 bg-[#8b1d1d] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
