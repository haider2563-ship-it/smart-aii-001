import React, { useState } from 'react';
import { Section, Translations } from '../types';
import { Menu, X, Sprout, Globe } from 'lucide-react';

interface NavigationProps {
  t: Translations;
  currentSection: Section;
  onNavigate: (section: Section) => void;
  lang: 'en' | 'ur';
  onOpenLanguageModal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ t, currentSection, onNavigate, lang, onOpenLanguageModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Section.HOME, label: t.navHome },
    { id: Section.SCAN, label: t.navScan },
    { id: Section.HEALTH, label: t.navHealth },
    { id: Section.LEARN, label: t.navLearn },
    { id: Section.WEATHER, label: t.navWeather },
    { id: Section.MARKET, label: t.navMarket },
  ];

  const handleNavClick = (section: Section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick(Section.HOME)}>
             <Sprout className="h-8 w-8 text-white" />
             <h1 className={`text-xl font-bold tracking-wide ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.navTitle}</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentSection === item.id
                    ? 'bg-primary-dark text-white shadow-inner'
                    : 'hover:bg-accent hover:text-white hover:underline'
                } ${lang === 'ur' ? 'font-urdu text-base' : ''}`}
              >
                {item.label}
              </button>
            ))}

            {/* Desktop Language Button */}
            <button
                onClick={onOpenLanguageModal}
                className={`ml-2 flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-colors border border-white/30 ${lang === 'ur' ? 'font-urdu' : ''}`}
                title={lang === 'en' ? "Change Language" : "زبان تبدیل کریں"}
            >
                <Globe className="w-4 h-4" />
                <span>{t.navLanguage}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentSection === item.id
                    ? 'bg-primary-dark text-white'
                    : 'hover:bg-accent hover:text-white'
                } ${lang === 'ur' ? 'font-urdu text-right' : ''}`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Button */}
            <button
                onClick={() => {
                    onOpenLanguageModal();
                    setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white text-yellow-100 ${lang === 'ur' ? 'font-urdu flex-row-reverse text-right' : ''}`}
            >
                <Globe className="w-5 h-5" />
                <span>{t.navLanguage}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;