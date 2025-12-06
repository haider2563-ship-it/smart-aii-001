import React, { useState } from 'react';
import { Translations, WeatherResult } from '../types';
import { getWeatherInsight } from '../services/geminiService';
import { CloudSun, MapPin, Loader2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface WeatherSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ t, lang }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResult | null>(null);

  const handleGetWeather = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherInsight(latitude, longitude, lang);
          setWeatherData(data);
        } catch (err) {
          setError(t.weatherError);
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geo Error", err);
        setError(t.weatherError);
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-6 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.weatherTitle}
      </h2>

      {/* Default State / Action Button */}
      {!weatherData && !loading && (
        <div className="text-center py-10 bg-light-bg rounded-lg border-2 border-dashed border-primary/30">
          <CloudSun className="h-16 w-16 text-primary mx-auto mb-4" />
          <p className="mb-6 text-lg text-text/80">
            {lang === 'en' 
              ? "Click below to analyze real-time weather conditions for your exact farm location using AI." 
              : "AI کا استعمال کرتے ہوئے اپنے فارم کے درست مقام کے لیے حقیقی وقت کے موسمی حالات کا تجزیہ کرنے کے لیے نیچے کلک کریں۔"}
          </p>
          <button 
            onClick={handleGetWeather}
            className={`flex items-center gap-2 mx-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 ${lang === 'ur' ? 'font-urdu text-lg' : ''}`}
          >
            <MapPin className="h-5 w-5" />
            {t.weatherBtn}
          </button>
          {error && <p className="mt-4 text-red-600 font-bold bg-red-100 py-2 px-4 rounded inline-block">{error}</p>}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 text-accent animate-spin mx-auto mb-4" />
          <p className={`text-xl font-bold text-primary-dark ${lang === 'ur' ? 'font-urdu' : ''}`}>
            {t.weatherLoading}
          </p>
        </div>
      )}

      {/* Result Display */}
      {weatherData && (
        <div className="bg-light-bg p-8 rounded-lg shadow-md border-t-4 border-accent animate-fade-in">
          <div className="flex items-start justify-between mb-6 border-b border-primary/20 pb-4">
             <div className="flex items-center gap-3">
               <CloudSun className="w-10 h-10 text-accent" />
               <h3 className={`text-2xl font-bold text-primary ${lang === 'ur' ? 'font-urdu' : ''}`}>
                 {lang === 'en' ? "Weather Analysis" : "موسم کا تجزیہ"}
               </h3>
             </div>
             <button 
                onClick={handleGetWeather} 
                className="text-sm text-primary underline hover:text-accent"
             >
                {lang === 'en' ? "Refresh" : "ریفریش"}
             </button>
          </div>
          
          <div className={`prose prose-lg max-w-none text-text ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
             {/* Simple rendering of text. In a real app, Markdown parsing would be ideal. 
                 Using white-space-pre-wrap to preserve formatting from Gemini. */}
             <div className="whitespace-pre-wrap leading-relaxed">
               {weatherData.text}
             </div>
          </div>

          {/* Source Links (Grounding) */}
          {weatherData.sources.length > 0 && (
            <div className={`mt-8 pt-4 border-t border-gray-300 ${lang === 'ur' ? 'text-right' : ''}`}>
              <h4 className={`font-bold text-sm text-gray-500 mb-2 uppercase tracking-wide ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {t.weatherSources}
              </h4>
              <ul className="space-y-1">
                {weatherData.sources.map((source, idx) => (
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

export default WeatherSection;