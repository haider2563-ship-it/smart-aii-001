export type Language = 'en' | 'ur';

export enum Section {
  HOME = 'home',
  SCAN = 'scan',
  HEALTH = 'health',
  LEARN = 'learn',
  WEATHER = 'weather',
  MARKET = 'market',
}

export interface CropData {
  id: string;
  name: string;
  growth: number;
  waterLevel: 'Low' | 'Medium' | 'High';
  status: string;
  fill: string;
}

export interface Translations {
  navTitle: string;
  navHome: string;
  navScan: string;
  navHealth: string;
  navLearn: string;
  navWeather: string;
  navMarket: string;
  navLanguage: string;
  homeTitle: string;
  homeP1: string;
  homeP2: string;
  scanTitle: string;
  scanP1: string;
  scanButton: string;
  aiStatusReady: string;
  aiStatusAnalyzing: string;
  aiStatusComplete: string;
  healthTitle: string;
  healthP1: string;
  healthAddTitle: string;
  healthFormName: string;
  healthFormGrowth: string;
  healthFormStatus: string;
  healthFormBtn: string;
  healthListTitle: string;
  healthNoData: string;
  learnTitle: string;
  learnP1: string;
  learnCard1Title: string;
  learnCard1P: string;
  learnCard2Title: string;
  learnCard2P: string;
  learnCard3Title: string;
  learnCard3P: string;
  weatherTitle: string;
  weatherBtn: string;
  weatherLoading: string;
  weatherError: string;
  weatherSources: string;
  marketTitle: string;
  marketBtn: string;
  marketLoading: string;
  marketSources: string;
  languageModalTitle: string;
  languageModalDesc: string;
  btnEnglish: string;
  btnUrdu: string;
}

export interface DiagnosisResult {
  isPlant: boolean;
  plantName?: string;
  diagnosis?: string;
  treatment?: string;
  alertLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  message?: string;
}

export interface WeatherResult {
  text: string;
  sources: Array<{ uri: string; title: string }>;
}

export interface MarketResult {
  text: string;
  sources: Array<{ uri: string; title: string }>;
}