import React from 'react';
import { Translations } from '../types';
import { HEALTH_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Activity, AlertTriangle } from 'lucide-react';

interface HealthSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const HealthSection: React.FC<HealthSectionProps> = ({ t, lang }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.healthTitle}
      </h2>
      <p className={`mb-8 text-lg ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.healthP1}
      </p>

      {/* Chart Container */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-primary/20 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={HEALTH_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0EADD" />
            <XAxis dataKey="name" stroke="#4F361F" />
            <YAxis stroke="#4F361F" />
            <Tooltip 
                cursor={{fill: '#F5EFE1'}}
                contentStyle={{ backgroundColor: '#FFF8E1', borderColor: '#546E38', color: '#4F361F' }}
            />
            <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                {HEALTH_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Health Cards */}
      <div className="space-y-4">
        {/* Wheat Card */}
        <div className="bg-light-bg p-6 rounded-lg shadow-md border-t-4 border-accent relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className={`text-xl font-bold text-primary mb-2 ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthCard1Title}</h3>
                    <p className={`text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthCard1P}</p>
                </div>
                <Activity className="text-primary opacity-20 w-12 h-12 absolute right-4 top-4 group-hover:scale-110 transition-transform" />
            </div>
        </div>

        {/* Rice Card */}
        <div className="bg-light-bg p-6 rounded-lg shadow-md border-t-4 border-red-500 relative overflow-hidden group hover:shadow-lg transition-shadow">
             <div className="flex items-start justify-between">
                <div>
                    <h3 className={`text-xl font-bold text-primary mb-2 ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthCard2Title}</h3>
                    <div className="flex items-start gap-2">
                        {lang === 'en' && <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />}
                        <p className={`text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthCard2P}</p>
                        {lang === 'ur' && <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;