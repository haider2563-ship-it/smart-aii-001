import React from 'react';
import { Translations } from '../types';
import { BookOpen, Sprout } from 'lucide-react';

interface LearnSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const LearnSection: React.FC<LearnSectionProps> = ({ t, lang }) => {
  const cards = [
    { title: t.learnCard1Title, content: t.learnCard1P },
    { title: t.learnCard2Title, content: t.learnCard2P },
    { title: t.learnCard3Title, content: t.learnCard3P },
  ];

  return (
    <div className="max-w-4xl mx-auto">
       <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.learnTitle}
      </h2>
      <p className={`mb-8 text-lg ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.learnP1}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
            <div key={index} className="bg-light-bg p-6 rounded-lg shadow-md border-t-4 border-accent hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <Sprout className="w-6 h-6 text-primary" />
                    <h3 className={`text-xl font-bold text-primary ${lang === 'ur' ? 'font-urdu' : ''}`}>
                        {card.title}
                    </h3>
                </div>
                <p className={`text-lg leading-relaxed text-text/90 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                    {card.content}
                </p>
            </div>
        ))}
      </div>
      
      <div className="mt-8 bg-primary/10 p-6 rounded-lg border border-primary/30 flex items-center gap-4">
         <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
         <p className={`italic text-primary-dark ${lang === 'ur' ? 'font-urdu' : ''}`}>
            {lang === 'ur' 
                ? "مزید معلومات کے لیے، ہمارے مقامی زرعی ماہرین سے رابطہ کریں۔" 
                : "For more detailed guides, contact our local agricultural experts."}
         </p>
      </div>

    </div>
  );
};

export default LearnSection;