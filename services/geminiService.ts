import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, WeatherResult, MarketResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    isPlant: {
      type: Type.BOOLEAN,
      description: "True if a plant or crop is detected in the image.",
    },
    plantName: {
      type: Type.STRING,
      description: "The name of the detected plant, e.g., 'Wheat', 'Rice'.",
    },
    diagnosis: {
      type: Type.STRING,
      description: "A short diagnosis of the plant's health (e.g., 'Wheat Rust', 'Healthy').",
    },
    treatment: {
      type: Type.STRING,
      description: "Recommended treatment or action using local Pakistani context/products if possible.",
    },
    alertLevel: {
      type: Type.STRING,
      enum: ["LOW", "MEDIUM", "HIGH"],
      description: "The severity of the issue.",
    },
    message: {
      type: Type.STRING,
      description: "A message to the user, especially if no plant is found.",
    },
  },
  required: ["isPlant"],
};

export const analyzeCropImage = async (base64Image: string, language: 'en' | 'ur'): Promise<DiagnosisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Remove header from base64 string if present (data:image/jpeg;base64,...)
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const langInstruction = language === 'ur' ? 'Respond strictly in Urdu language.' : 'Respond in English.';

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this agricultural image. 
                   If it is a crop or plant, identify it and diagnose any health issues (pests, diseases, deficiencies). 
                   Provide a low-cost, locally available treatment suggestion for Pakistan.
                   ${langInstruction}
                   Return JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: diagnosisSchema,
        temperature: 0.4,
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(jsonText) as DiagnosisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      isPlant: false,
      message: language === 'ur' 
        ? "معذرت، تصویر کا تجزیہ کرنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔"
        : "Sorry, there was an error analyzing the image. Please try again."
    };
  }
};

export const getWeatherInsight = async (lat: number, lon: number, language: 'en' | 'ur'): Promise<WeatherResult> => {
  try {
    const model = 'gemini-2.5-flash';
    const langInstruction = language === 'ur' ? 'Respond in Urdu.' : 'Respond in English.';
    
    // Using Search Grounding for real-time weather
    const response = await ai.models.generateContent({
      model: model,
      contents: `What is the current weather and 3-day forecast for coordinates ${lat}, ${lon}? 
                 Provide a concise summary focused on agriculture (irrigation advice, pest risks due to humidity/heat).
                 ${langInstruction}`,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are NOT allowed with googleSearch
      },
    });

    // Extract search grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
      .filter((s: any) => s !== null);

    return {
      text: response.text || "No weather data available.",
      sources: sources
    };

  } catch (error) {
    console.error("Weather Analysis Error:", error);
    throw error;
  }
};

export const getMarketUpdates = async (language: 'en' | 'ur'): Promise<MarketResult> => {
  try {
    const model = 'gemini-2.5-flash';
    const langInstruction = language === 'ur' ? 'Respond in Urdu.' : 'Respond in English.';
    
    // Using Search Grounding for real-time market prices
    const response = await ai.models.generateContent({
      model: model,
      contents: `Search for the latest wholesale market prices (Mandi rates) in Pakistan today for major crops: Wheat, Rice (Basmati/Irri), Corn/Maize, Cotton, and Sugarcane.
                 Provide a clear list or summary of rates per 40kg or 100kg.
                 ${langInstruction}`,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are NOT allowed with googleSearch
      },
    });

    // Extract search grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
      .filter((s: any) => s !== null);

    return {
      text: response.text || "No market data available.",
      sources: sources
    };

  } catch (error) {
    console.error("Market Analysis Error:", error);
    throw error;
  }
};