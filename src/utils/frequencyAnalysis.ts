import { FrequencyData, BigramData } from '../types/cipher';

export function calculateFrequency(text: string): FrequencyData[] {
  const counts = new Map<string, number>();
  let totalChars = 0;

  for (const char of text.toUpperCase()) {
    if (/[A-ZА-Я]/.test(char)) {
      totalChars++;
      counts.set(char, (counts.get(char) || 0) + 1);
    }
  }

  const frequencies: FrequencyData[] = [];
  counts.forEach((count, char) => {
    frequencies.push({
      char,
      count,
      percentage: totalChars > 0 ? (count / totalChars) * 100 : 0
    });
  });

  return frequencies.sort((a, b) => b.count - a.count);
}

export function calculateBigrams(text: string): BigramData[] {
  const counts = new Map<string, number>();
  const cleanText = text.toUpperCase().replace(/[^A-ZА-Я]/g, '');
  let totalBigrams = 0;

  for (let i = 0; i < cleanText.length - 1; i++) {
    const bigram = cleanText.substring(i, i + 2);
    totalBigrams++;
    counts.set(bigram, (counts.get(bigram) || 0) + 1);
  }

  const bigrams: BigramData[] = [];
  counts.forEach((count, bigram) => {
    bigrams.push({
      bigram,
      count,
      percentage: totalBigrams > 0 ? (count / totalBigrams) * 100 : 0
    });
  });

  return bigrams.sort((a, b) => b.count - a.count).slice(0, 30);
}

export function calculateTrigrams(text: string): BigramData[] {
  const counts = new Map<string, number>();
  const cleanText = text.toUpperCase().replace(/[^A-ZА-Я]/g, '');
  let totalTrigrams = 0;

  for (let i = 0; i < cleanText.length - 2; i++) {
    const trigram = cleanText.substring(i, i + 3);
    totalTrigrams++;
    counts.set(trigram, (counts.get(trigram) || 0) + 1);
  }

  const trigrams: BigramData[] = [];
  counts.forEach((count, trigram) => {
    trigrams.push({
      bigram: trigram,
      count,
      percentage: totalTrigrams > 0 ? (count / totalTrigrams) * 100 : 0
    });
  });

  return trigrams.sort((a, b) => b.count - a.count).slice(0, 20);
}

export function calculateIndexOfCoincidence(text: string): number {
  const counts = new Map<string, number>();
  const cleanText = text.toUpperCase().replace(/[^A-ZА-Я]/g, '');
  const N = cleanText.length;

  if (N <= 1) return 0;

  for (const char of cleanText) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }

  let sum = 0;
  counts.forEach((count) => {
    sum += count * (count - 1);
  });

  return sum / (N * (N - 1));
}

export function detectLanguage(text: string): 'english' | 'russian' | 'unknown' {
  const upperText = text.toUpperCase();
  const hasCyrillic = /[А-Я]/.test(upperText);
  const hasLatin = /[A-Z]/.test(upperText);

  if (hasCyrillic && !hasLatin) return 'russian';
  if (hasLatin && !hasCyrillic) return 'english';
  return 'unknown';
}
