import React, { useState } from 'react';
import { Translations, MarketResult } from '../types';
import { getMarketUpdates } from '../services/geminiService';
import { TrendingUp, DollarSign, Loader2, ExternalLink } from 'lucide-react';

interface MarketSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const MarketSection: React.FC<MarketSectionProps> = ({ t, lang }) => {
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketResult | null>(null);

  const handleGetRates = async () => {
    setLoading(true);
    try {
      const data = await getMarketUpdates(lang);
      setMarketData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.marketTitle}
      </h2>
      
      {/* Action Button Area */}
      {!marketData && !loading && (
        <div className="text-center py-10 bg-light-bg rounded-lg border-2 border-dashed border-primary/30">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
          <p className="mb-6 text-lg text-text/80">
            {lang === 'en' 
             ? "Get the latest wholesale mandi rates for Wheat, Rice, Cotton, and more directly from online sources."
             : "آن لائن ذرائع سے گندم، چاول، کپاس اور دیگر کے لیے تازہ ترین ہول سیل منڈی کے نرخ حاصل کریں۔"}
          </p>
          <button 
            onClick={handleGetRates}
            className={`flex items-center gap-2 mx-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 ${lang === 'ur' ? 'font-urdu text-lg' : ''}`}
          >
            <DollarSign className="h-5 w-5" />
            {t.marketBtn}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 text-accent animate-spin mx-auto mb-4" />
          <p className={`text-xl font-bold text-primary-dark ${lang === 'ur' ? 'font-urdu' : ''}`}>
            {t.marketLoading}
          </p>
        </div>
      )}

      {/* Result Display */}
      {marketData && (
        <div className="bg-light-bg p-8 rounded-lg shadow-md border-t-4 border-accent animate-fade-in">
          <div className="flex items-start justify-between mb-6 border-b border-primary/20 pb-4">
             <div className="flex items-center gap-3">
               <TrendingUp className="w-10 h-10 text-accent" />
               <h3 className={`text-2xl font-bold text-primary ${lang === 'ur' ? 'font-urdu' : ''}`}>
                 {lang === 'en' ? "Market Analysis" : "مارکیٹ کا تجزیہ"}
               </h3>
             </div>
             <button 
                onClick={handleGetRates} 
                className="text-sm text-primary underline hover:text-accent"
             >
                {lang === 'en' ? "Refresh Rates" : "ریٹس ریفریش کریں"}
             </button>
          </div>
          
          <div className={`prose prose-lg max-w-none text-text ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
             <div className="whitespace-pre-wrap leading-relaxed">
               {marketData.text}
             </div>
          </div>

          {/* Source Links (Grounding) */}
          {marketData.sources.length > 0 && (
            <div className={`mt-8 pt-4 border-t border-gray-300 ${lang === 'ur' ? 'text-right' : ''}`}>
              <h4 className={`font-bold text-sm text-gray-500 mb-2 uppercase tracking-wide ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.marketSources}
              </h4>
              <ul className="space-y-1">
                {marketData.sources.map((source, idx) => (
                  <li key={idx}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline text-sm truncate"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketSection;