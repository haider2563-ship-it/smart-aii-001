import React from 'react';
import { Translations } from '../types';
import { CloudSun, CloudRain, Droplets } from 'lucide-react';

interface WeatherSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ t, lang }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.weatherTitle}
      </h2>

      <div className="bg-light-bg p-8 rounded-lg shadow-md border-t-4 border-accent">
          <div className="flex items-center gap-3 mb-6">
             <CloudSun className="w-10 h-10 text-accent" />
             <h3 className={`text-2xl font-bold text-primary ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.weatherCard1Title}</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start p-4 bg-white/60 rounded-md">
                <CloudRain className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                <p className={`text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>
                    {t.weatherCard1P1}
                </p>
            </div>

            <div className="flex gap-4 items-start p-4 bg-white/60 rounded-md">
                <Droplets className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <p className={`text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>
                    {t.weatherCard1P2}
                </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default WeatherSection;