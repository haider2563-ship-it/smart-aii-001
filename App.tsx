import React, { useState, useEffect } from 'react';
import { Language, Section } from './types';
import { TRANSLATIONS } from './constants';
import LanguageModal from './components/LanguageModal';
import Navigation from './components/Navigation';
import ScanSection from './components/ScanSection';
import HealthSection from './components/HealthSection';
import LearnSection from './components/LearnSection';
import WeatherSection from './components/WeatherSection';
import MarketSection from './components/MarketSection';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);

  useEffect(() => {
    const storedLang = localStorage.getItem('appLanguage') as Language;
    if (storedLang) {
      setLang(storedLang);
      setIsLanguageModalOpen(false);
    } else {
      setIsLanguageModalOpen(true);
    }
  }, []);

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    localStorage.setItem('appLanguage', selectedLang);
    setIsLanguageModalOpen(false);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div 
        className={`min-h-screen bg-background text-text font-sans ${lang === 'ur' ? 'font-urdu' : ''}`}
        dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <LanguageModal 
        isOpen={isLanguageModalOpen} 
        onSelectLanguage={handleLanguageSelect} 
        currentLang={lang} 
      />

      <Navigation 
        t={t} 
        currentSection={currentSection} 
        onNavigate={setCurrentSection} 
        lang={lang}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {currentSection === Section.HOME && (
          <section className="text-center max-w-4xl mx-auto mt-6">
            
            {/* Prominent Header Card for Names */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8 md:p-12 rounded-2xl shadow-xl mb-12 transform hover:scale-[1.01] transition-transform duration-300">
               <p className={`text-lg md:text-xl opacity-80 mb-2 font-medium tracking-wide uppercase ${lang === 'ur' ? 'font-urdu' : ''}`}>
                  {t.homeP1}
               </p>
               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
                 Syed Haider
               </h1>
               <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
               <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xl md:text-2xl font-medium text-white/90">
                 <span>Talha Anwar</span>
                 <span className="hidden md:inline text-accent">•</span>
                 <span>Ahmad Habib</span>
               </div>
            </div>

            <h2 className={`text-3xl font-bold text-primary-dark mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.homeTitle}
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-accent">
                <p className={`text-lg md:text-xl leading-relaxed text-gray-700 ${lang === 'ur' ? 'font-urdu text-2xl leading-loose' : ''}`}>
                    {t.homeP2}
                </p>
            </div>
            
            <button 
                onClick={() => setCurrentSection(Section.SCAN)}
                className={`mt-10 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${lang === 'ur' ? 'font-urdu text-xl' : 'text-lg'}`}
            >
                {t.scanButton}
            </button>
          </section>
        )}

        {currentSection === Section.SCAN && <ScanSection t={t} lang={lang} />}
        {currentSection === Section.HEALTH && <HealthSection t={t} lang={lang} />}
        {currentSection === Section.LEARN && <LearnSection t={t} lang={lang} />}
        {currentSection === Section.WEATHER && <WeatherSection t={t} lang={lang} />}
        {currentSection === Section.MARKET && <MarketSection t={t} lang={lang} />}
      </main>
      
      {/* Footer / Copyright */}
      <footer className="text-center p-6 text-primary-dark opacity-60 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Smart AI Agriculture. All rights reserved.
      </footer>
    </div>
  );
};

export default App;