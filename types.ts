export type Language = 'en' | 'ur';

export enum Section {
  HOME = 'home',
  SCAN = 'scan',
  HEALTH = 'health',
  LEARN = 'learn',
  WEATHER = 'weather',
  MARKET = 'market',
}

export interface Translations {
  navTitle: string;
  navHome: string;
  navScan: string;
  navHealth: string;
  navLearn: string;
  navWeather: string;
  navMarket: string;
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
  healthCard1Title: string;
  healthCard1P: string;
  healthCard2Title: string;
  healthCard2P: string;
  learnTitle: string;
  learnP1: string;
  learnCard1Title: string;
  learnCard1P: string;
  learnCard2Title: string;
  learnCard2P: string;
  learnCard3Title: string;
  learnCard3P: string;
  weatherTitle: string;
  weatherCard1Title: string;
  weatherCard1P1: string;
  weatherCard1P2: string;
  marketTitle: string;
  marketP1: string;
  marketTH1: string;
  marketTH2: string;
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