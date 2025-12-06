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
      />

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {currentSection === Section.HOME && (
          <section className="text-center max-w-2xl mx-auto mt-10">
            <h2 className={`text-3xl font-bold text-primary-dark mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.homeTitle}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-accent">
                <p className="font-semibold text-accent mb-4">{t.homeP1}</p>
                <p className={`text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu text-xl' : ''}`}>
                    {t.homeP2}
                </p>
            </div>
            
            <button 
                onClick={() => setCurrentSection(Section.SCAN)}
                className={`mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 ${lang === 'ur' ? 'font-urdu text-xl' : ''}`}
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