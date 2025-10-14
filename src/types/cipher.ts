export type CipherType =
  | 'substitution'
  | 'caesar'
  | 'vigenere'
  | 'alberti'
  | 'playfair'
  | 'railfence'
  | 'atbash'
  | 'affine'
  | 'rot13'
  | 'columnar'
  | 'polybius'
  | 'gronsfeld'
  | 'foursquare'
  | 'bacon';

export interface FrequencyData {
  char: string;
  count: number;
  percentage: number;
}

export interface BigramData {
  bigram: string;
  count: number;
  percentage: number;
}

export interface LanguageStats {
  letterFrequencies: Record<string, number>;
  commonBigrams: string[];
  commonTrigrams: string[];
  commonWords: string[];
}
