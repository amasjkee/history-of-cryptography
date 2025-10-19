export interface LetterFrequency {
  letter: string
  count: number
  frequency: number
}

export interface LanguageStats {
  name: string
  frequencies: { [key: string]: number }
}

export const languageStats: { [key: string]: LanguageStats } = {
  russian: {
    name: "Русский",
    frequencies: {
      о: 10.97,
      е: 8.45,
      а: 8.01,
      и: 7.35,
      н: 6.7,
      т: 6.26,
      с: 5.47,
      р: 4.73,
      в: 4.54,
      л: 4.4,
      к: 3.49,
      м: 3.21,
      д: 2.98,
      п: 2.81,
      у: 2.62,
      я: 2.01,
      ы: 1.9,
      ь: 1.74,
      г: 1.7,
      з: 1.65,
      б: 1.59,
      ч: 1.44,
      й: 1.21,
      х: 0.97,
      ж: 0.94,
      ш: 0.73,
      ю: 0.64,
      ц: 0.48,
      щ: 0.36,
      э: 0.32,
      ф: 0.26,
      ъ: 0.04,
      ё: 0.04,
    },
  },
  english: {
    name: "English",
    frequencies: {
      e: 12.7,
      t: 9.06,
      a: 8.17,
      o: 7.51,
      i: 6.97,
      n: 6.75,
      s: 6.33,
      h: 6.09,
      r: 5.99,
      d: 4.25,
      l: 4.03,
      c: 2.78,
      u: 2.76,
      m: 2.41,
      w: 2.36,
      f: 2.23,
      g: 2.02,
      y: 1.97,
      p: 1.93,
      b: 1.29,
      v: 0.98,
      k: 0.77,
      j: 0.15,
      x: 0.15,
      q: 0.1,
      z: 0.07,
    },
  },
}

export function analyzeFrequency(text: string): LetterFrequency[] {
  const cleanText = text.toLowerCase().replace(/[^а-яёa-z]/g, "")
  const letterCounts: { [key: string]: number } = {}

  for (const char of cleanText) {
    letterCounts[char] = (letterCounts[char] || 0) + 1
  }

  const total = cleanText.length
  const frequencies: LetterFrequency[] = Object.entries(letterCounts).map(([letter, count]) => ({
    letter,
    count,
    frequency: (count / total) * 100,
  }))

  return frequencies.sort((a, b) => b.frequency - a.frequency)
}

export function detectLanguage(text: string): "russian" | "english" {
  const russianChars = (text.match(/[а-яё]/gi) || []).length
  const englishChars = (text.match(/[a-z]/gi) || []).length
  return russianChars > englishChars ? "russian" : "english"
}

export function compareWithLanguage(frequencies: LetterFrequency[], language: "russian" | "english"): number {
  const langFreq = languageStats[language].frequencies
  let similarity = 0
  let count = 0

  frequencies.slice(0, 10).forEach(({ letter, frequency }) => {
    if (langFreq[letter]) {
      similarity += Math.abs(frequency - langFreq[letter])
      count++
    }
  })

  return count > 0 ? 100 - similarity / count : 0
}

export function calculateIndexOfCoincidence(text: string): number {
    // 1. Clean the input text: convert to uppercase and filter out non-alphabetic characters.
    const cleanedText = text.toUpperCase().replace(/[^A-Z]/g, '');

    const N = cleanedText.length;

    // Handle edge case: if N < 2, it's impossible to pick two distinct letters.
    if (N < 2) {
        return 0;
    }

    // 2. Count the frequency of each letter (A-Z).
    const frequencies: { [key: string]: number } = {};
    for (let i = 0; i < 26; i++) {
        const char = String.fromCharCode('A'.charCodeAt(0) + i);
        frequencies[char] = 0;
    }

    for (const char of cleanedText) {
        if (frequencies[char] !== undefined) {
            frequencies[char]++;
        }
    }

    // 3. Calculate the numerator: sum(f_i * (f_i - 1))
    let sumFiFiMinus1 = 0;
    for (const char in frequencies) {
        const fi = frequencies[char];
        sumFiFiMinus1 += fi * (fi - 1);
    }

    // 4. Calculate the denominator: N * (N - 1)
    const denominator = N * (N - 1);

    // 5. Return the result.
    return sumFiFiMinus1 / denominator;
}