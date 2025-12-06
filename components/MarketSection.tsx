import React from 'react';
import { Translations } from '../types';
import { MARKET_DATA } from '../constants';
import { TrendingUp, DollarSign } from 'lucide-react';

interface MarketSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const MarketSection: React.FC<MarketSectionProps> = ({ t, lang }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.marketTitle}
      </h2>
      <p className={`mb-8 text-lg ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.marketP1}
      </p>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white">
            <thead>
                <tr className="bg-primary text-white">
                    <th className={`p-4 text-left border-b border-primary-dark ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
                        <div className="flex items-center gap-2">
                           <SproutIcon /> {t.marketTH1}
                        </div>
                    </th>
                    <th className={`p-4 text-left border-b border-primary-dark ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
                        <div className="flex items-center gap-2">
                           <TrendingUp className="w-4 h-4" /> {t.marketTH2}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {MARKET_DATA.map((item, index) => (
                    <tr key={index} className={`hover:bg-light-bg/50 transition-colors ${index % 2 === 0 ? 'bg-light-bg/20' : ''}`}>
                        <td className={`p-4 border-b border-gray-200 ${lang === 'ur' ? 'font-urdu text-right text-lg' : 'text-lg'}`}>
                            {lang === 'ur' ? getUrduCropName(item.name) : item.name}
                        </td>
                        <td className={`p-4 border-b border-gray-200 font-bold text-primary-dark ${lang === 'ur' ? 'font-urdu text-right text-xl' : 'text-xl'}`}>
                            {item.price}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper for Urdu mapping (static for demo)
function getUrduCropName(name: string): string {
    const map: Record<string, string> = {
        'Wheat': 'گندم',
        'Rice': 'چاول',
        'Corn': 'مکئی',
        'Potatoes': 'آلو'
    };
    return map[name] || name;
}

// Simple icon component
const SproutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-1.3 2.9-3.3 3-5.5-3 1.3-4.9 2.2-6.2 2.9z"/></svg>
);

export default MarketSection;