import { LanguageStats } from '../types/cipher';

export const englishStats: LanguageStats = {
  letterFrequencies: {
    'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97, 'N': 6.75,
    'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78,
    'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97,
    'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15,
    'Q': 0.10, 'Z': 0.07
  },
  commonBigrams: [
    'TH', 'HE', 'IN', 'ER', 'AN', 'RE', 'ON', 'AT', 'EN', 'ND',
    'TI', 'ES', 'OR', 'TE', 'OF', 'ED', 'IS', 'IT', 'AL', 'AR',
    'ST', 'TO', 'NT', 'NG', 'SE', 'HA', 'AS', 'OU', 'IO', 'LE'
  ],
  commonTrigrams: [
    'THE', 'AND', 'ING', 'ENT', 'ION', 'HER', 'FOR', 'THA', 'NTH', 'INT',
    'ERE', 'TIO', 'TER', 'EST', 'ERS', 'ATI', 'HAT', 'ATE', 'ALL', 'ETH'
  ],
  commonWords: [
    'THE', 'BE', 'TO', 'OF', 'AND', 'A', 'IN', 'THAT', 'HAVE', 'I',
    'IT', 'FOR', 'NOT', 'ON', 'WITH', 'HE', 'AS', 'YOU', 'DO', 'AT',
    'THIS', 'BUT', 'HIS', 'BY', 'FROM', 'THEY', 'WE', 'SAY', 'HER', 'SHE',
    'OR', 'AN', 'WILL', 'MY', 'ONE', 'ALL', 'WOULD', 'THERE', 'THEIR', 'WHAT'
  ]
};

export const russianStats: LanguageStats = {
  letterFrequencies: {
    'О': 10.98, 'Е': 8.45, 'А': 8.01, 'И': 7.35, 'Н': 6.70, 'Т': 6.26,
    'С': 5.47, 'Р': 4.73, 'В': 4.54, 'Л': 4.40, 'К': 3.49, 'М': 3.21,
    'Д': 2.98, 'П': 2.81, 'У': 2.62, 'Я': 2.01, 'Ы': 1.90, 'Ь': 1.74,
    'Г': 1.70, 'З': 1.65, 'Б': 1.59, 'Ч': 1.44, 'Й': 1.21, 'Х': 0.97,
    'Ж': 0.94, 'Ш': 0.73, 'Ю': 0.64, 'Ц': 0.48, 'Щ': 0.36, 'Э': 0.32,
    'Ф': 0.26, 'Ъ': 0.04, 'Ё': 0.04
  },
  commonBigrams: [
    'СТ', 'НО', 'ЕН', 'ТО', 'НА', 'ОВ', 'ПР', 'РО', 'ПО', 'ЕР',
    'КО', 'РА', 'НЕ', 'ТА', 'ТЬ', 'АН', 'ОС', 'ВО', 'ОР', 'ЛО',
    'ВА', 'ОЛ', 'ЛИ', 'ЕС', 'ИН', 'АЛ', 'НИ', 'ЕД', 'ИЯ', 'ОТ'
  ],
  commonTrigrams: [
    'СТО', 'ЕНО', 'НИЕ', 'ОВА', 'ТЕЛ', 'ОСТ', 'ПРО', 'ОВО', 'СТА', 'НОВ',
    'ПРИ', 'ТОР', 'КОТ', 'ПОЛ', 'ОГО', 'РАЗ', 'ВОЗ', 'КАК', 'ТОВ', 'ТАК'
  ],
  commonWords: [
    'В', 'И', 'НЕ', 'НА', 'Я', 'ЧТО', 'ОН', 'С', 'А', 'ТО',
    'ЭТО', 'ОНА', 'ПО', 'ВСЕ', 'ТЫ', 'ОНИ', 'НО', 'ТАК', 'ДА', 'ЕГО',
    'ОТ', 'ДЛЯ', 'К', 'БЫ', 'КАК', 'МЫ', 'ЕЩЕ', 'У', 'ВЫ', 'ЗА'
  ]
};

export const languageRules = {
  english: [
    'Q is almost always followed by U (99% of cases)',
    'Common double letters: LL, SS, EE, OO, TT, FF, RR, NN, PP, CC',
    'Most common word: THE (7% of all words)',
    'Common word endings: -ING, -ED, -TION, -ER, -LY, -EST',
    'E is often at the end of words',
    'Single letter words are usually A or I',
    'Common 2-letter words: OF, TO, IN, IT, IS, BE, AS, AT, SO, WE, HE, BY, OR, ON, DO, IF, ME, MY',
    'Common 3-letter words: THE, AND, FOR, ARE, BUT, NOT, YOU, ALL, CAN, HER, WAS, ONE, OUR, OUT, DAY',
    'Vowels (A, E, I, O, U) make up ~40% of text',
    'Words rarely end in: J, K, Q, V, X, Z'
  ],
  russian: [
    'Ъ appears rarely, usually between consonants',
    'Common double letters: СС, НН, ЛЛ, ММ, РР, ТТ',
    'Most common word: В (preposition)',
    'Common word endings: -ОГО, -ЕГО, -ОМУ, -ЕМУ, -ТЬ, -СЯ',
    'Soft sign Ь appears often at the end of words',
    'Single letter words: В, И, С, К, О, У, Я',
    'Common 2-letter words: НЕ, НА, ТО, ТЫ, ОН, ЗА, МЫ, ТЕ, ВЫ, ОБ, ЕЩЕ, ОТ, ПО',
    'Common 3-letter words: ЧТО, ЭТО, ВСЕ, ОНА, ОНИ, ДЛЯ, ЕГО, МОЙ, ТАК, КАК, БЫЛ, ПРИ',
    'Vowels (А, Е, И, О, У, Ы, Э, Ю, Я) make up ~42% of text',
    'Й appears mostly at the end of words or after vowels'
  ]
};
