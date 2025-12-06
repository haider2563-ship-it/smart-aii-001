import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

// Initialize Gemini Client
// Note: We use process.env.API_KEY as per the requirement.
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
        temperature: 0.4, // Lower temperature for more deterministic analysis
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(jsonText) as DiagnosisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback error response
    return {
      isPlant: false,
      message: language === 'ur' 
        ? "معذرت، تصویر کا تجزیہ کرنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔"
        : "Sorry, there was an error analyzing the image. Please try again."
    };
  }
};