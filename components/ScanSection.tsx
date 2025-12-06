import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Translations, DiagnosisResult } from '../types';
import { analyzeCropImage } from '../services/geminiService';
import { Camera, AlertTriangle, CheckCircle, Search } from 'lucide-react';

interface ScanSectionProps {
  t: Translations;
  lang: 'en' | 'ur';
}

const ScanSection: React.FC<ScanSectionProps> = ({ t, lang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [streamError, setStreamError] = useState(false);

  // Initialize Camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStreamError(false);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setStreamError(true);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsAnalyzing(true);
    setResult(null);

    // Capture frame
    const context = canvasRef.current.getContext('2d');
    if (context) {
        // Match canvas size to video size for correct aspect ratio
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageBase64 = canvasRef.current.toDataURL('image/jpeg', 0.8);

        // Call Gemini Service
        try {
            const data = await analyzeCropImage(imageBase64, lang);
            setResult(data);
        } catch (error) {
            console.error("Analysis failed", error);
            setResult({ isPlant: false, message: "Failed to analyze image." });
        } finally {
            setIsAnalyzing(false);
        }
    }
  }, [lang]);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.scanTitle}
      </h2>
      <p className={`mb-6 text-lg leading-relaxed ${lang === 'ur' ? 'font-urdu' : ''}`}>
        {t.scanP1}
      </p>

      {/* Camera Viewport */}
      <div className="relative rounded-lg overflow-hidden border-4 border-primary bg-black shadow-lg aspect-[4/3] mx-auto max-w-md">
        {!streamError ? (
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
            />
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-white p-4 text-center">
                <AlertTriangle className="h-12 w-12 mb-2 text-yellow-500" />
                <p>Camera access denied or unavailable.</p>
            </div>
        )}
        
        {/* Loading Overlay */}
        {isAnalyzing && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white z-10">
                <Search className="h-10 w-10 animate-spin mb-2 text-accent" />
                <p className={`${lang === 'ur' ? 'font-urdu' : ''}`}>{t.aiStatusAnalyzing}</p>
            </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Action Button */}
      <div className="flex justify-center mt-6">
        <button 
            onClick={handleScan}
            disabled={isAnalyzing || streamError}
            className={`flex items-center gap-2 bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-md transition-all shadow-md transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${lang === 'ur' ? 'font-urdu text-xl' : 'text-lg'}`}
        >
            <Camera className="h-6 w-6" />
            {t.scanButton}
        </button>
      </div>
      
      {!isAnalyzing && !result && (
        <p className="text-center text-primary-dark italic mt-4">{t.aiStatusReady}</p>
      )}

      {/* Results Display */}
      {result && (
        <div className={`mt-8 p-6 rounded-lg shadow-md border-l-8 animate-fade-in
            ${result.isPlant ? 'bg-success-light border-primary' : 'bg-alert border-accent'}`}
        >
            {result.isPlant ? (
                <div className={`${lang === 'ur' ? 'font-urdu text-right' : 'text-left'}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <h4 className="text-xl font-bold text-primary-dark">{result.plantName}</h4>
                     </div>
                     
                     {result.alertLevel === 'HIGH' && (
                         <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold mb-3 border border-red-200">
                             High Alert / شدید خطرہ
                         </div>
                     )}

                     <div className="space-y-3">
                         <p className="text-lg">
                             <span className="font-bold">{lang === 'ur' ? 'تشخیص:' : 'Diagnosis:'}</span> {result.diagnosis}
                         </p>
                         <div className="bg-white/50 p-4 rounded border border-primary/20">
                             <p className="font-bold text-accent mb-1">{lang === 'ur' ? 'علاج:' : 'Recommended Treatment:'}</p>
                             <p>{result.treatment}</p>
                         </div>
                     </div>
                </div>
            ) : (
                <div className={`${lang === 'ur' ? 'font-urdu text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-2 text-accent">
                        <AlertTriangle className="h-6 w-6" />
                        <h4 className="text-xl font-bold">{lang === 'ur' ? 'کوئی پودا نہیں ملا' : 'No Plant Detected'}</h4>
                    </div>
                    <p className="text-lg">{result.message || (lang === 'ur' ? 'براہ کرم پودے کی واضح تصویر لیں۔' : 'Please capture a clear image of a crop or plant.')}</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ScanSection;