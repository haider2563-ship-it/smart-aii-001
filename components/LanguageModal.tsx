import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onSelectLanguage: (lang: Language) => void;
  currentLang: Language; // Used for initial text before selection
}

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onSelectLanguage, currentLang }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang];

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-light-bg p-8 rounded-xl shadow-2xl max-w-md w-full text-center relative border-t-4 border-accent">
        
        <h2 className="text-2xl font-bold text-accent mb-2">
            Choose Your Language <br/>
            <span className="font-urdu text-xl mt-1 block">اپنی زبان منتخب کریں</span>
        </h2>
        
        <p className="mb-6 text-text opacity-80">
          Please select your preferred language to continue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
            onClick={() => onSelectLanguage('en')}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded transition-colors shadow-md"
            >
            English
            </button>
            <button
            onClick={() => onSelectLanguage('ur')}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded transition-colors shadow-md font-urdu"
            >
            اردو (Urdu)
            </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;