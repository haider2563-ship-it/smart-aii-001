import React, { useState, useEffect } from 'react';
import { Translations, CropData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Trash2, PlusCircle, Sprout, BarChart2 } from 'lucide-react';

interface HealthSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const HealthSection: React.FC<HealthSectionProps> = ({ t, lang }) => {
  // Initialize with empty array if nothing in localStorage to ensure "my last data"
  const [crops, setCrops] = useState<CropData[]>(() => {
    const saved = localStorage.getItem('myCrops');
    return saved ? JSON.parse(saved) : [];
  });

  // Form State
  const [newName, setNewName] = useState('');
  const [newGrowth, setNewGrowth] = useState<number>(50);
  const [newStatus, setNewStatus] = useState('');

  // Persist to localStorage whenever crops change
  useEffect(() => {
    localStorage.setItem('myCrops', JSON.stringify(crops));
  }, [crops]);

  const handleAddCrop = () => {
    if (!newName) return;
    
    // Generate a random earthy color for the bar
    const colors = ['#546E38', '#7A8D5C', '#B85C38', '#A5BD79', '#D4A373'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCrop: CropData = {
      id: Date.now().toString(),
      name: newName,
      growth: newGrowth,
      waterLevel: 'Medium', // Default for simplicity
      status: newStatus || 'Monitoring',
      fill: randomColor
    };

    setCrops([...crops, newCrop]);
    
    // Reset Form
    setNewName('');
    setNewGrowth(50);
    setNewStatus('');
  };

  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.healthTitle}
      </h2>
      <p className={`mb-8 text-lg ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.healthP1}
      </p>

      {/* --- 1. ADD CROP FORM (FIRST) --- */}
      <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary mb-8 animate-fade-in relative z-10">
        <h3 className={`text-xl font-bold text-primary-dark mb-4 flex items-center gap-2 ${lang === 'ur' ? 'font-urdu' : ''}`}>
          <PlusCircle className="h-6 w-6" /> {t.healthAddTitle}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium text-text mb-1 ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthFormName}</label>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={lang === 'en' ? "e.g. Cotton" : "مثال: کپاس"}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-text mb-1 ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthFormGrowth} ({newGrowth}%)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={newGrowth} 
              onChange={(e) => setNewGrowth(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-text mb-1 ${lang === 'ur' ? 'font-urdu' : ''}`}>{t.healthFormStatus}</label>
            <input 
              type="text" 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={lang === 'en' ? "e.g. Healthy" : "مثال: صحت مند"}
            />
          </div>
        </div>
        <button 
          onClick={handleAddCrop}
          className={`mt-4 w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded transition-colors ${lang === 'ur' ? 'font-urdu' : ''}`}
        >
          {t.healthFormBtn}
        </button>
      </div>

      {/* --- 2. DYNAMIC CHART (VISUALIZES LAST DATA) --- */}
      {crops.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-primary/20 h-[350px] animate-fade-in">
          <div className="flex items-center gap-2 mb-2 px-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary-dark">Live Growth Analytics</span>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={crops} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0EADD" />
              <XAxis dataKey="name" stroke="#4F361F" />
              <YAxis stroke="#4F361F" />
              <Tooltip 
                  cursor={{fill: '#F5EFE1'}}
                  contentStyle={{ backgroundColor: '#FFF8E1', borderColor: '#546E38', color: '#4F361F' }}
              />
              <Bar dataKey="growth" radius={[4, 4, 0, 0]} animationDuration={500}>
                  {crops.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500 italic bg-light-bg rounded-lg mb-8 border-2 border-dashed border-primary/20">
           {t.healthNoData}
        </div>
      )}

      {/* --- 3. CROP LIST --- */}
      {crops.length > 0 && (
        <>
            <h3 className={`text-xl font-bold text-accent mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.healthListTitle}
            </h3>
            <div className="space-y-4">
                {crops.map((crop) => (
                <div key={crop.id} className="bg-light-bg p-6 rounded-lg shadow-md border-l-4 border-primary relative group flex justify-between items-start animate-fade-in">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sprout className="h-5 w-5 text-primary" />
                            <h4 className={`text-xl font-bold text-primary-dark ${lang === 'ur' ? 'font-urdu' : ''}`}>{crop.name}</h4>
                        </div>
                        <p className={`text-text opacity-90 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                            {lang === 'en' ? 'Growth' : 'نشوونما'}: <strong>{crop.growth}%</strong> | {crop.status}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleDeleteCrop(crop.id)}
                        className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                        title="Delete Crop"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default HealthSection;