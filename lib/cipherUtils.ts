export function caesarShift(text: string, shift: number): string {
  const russianAlphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const russianAlphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const englishAlphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const englishAlphabetLower = 'abcdefghijklmnopqrstuvwxyz';

  return text
    .split('')
    .map(char => {
      // Russian uppercase
      let index = russianAlphabetUpper.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + shift % 33 + 33) % 33;
        return russianAlphabetUpper[newIndex];
      }

      // Russian lowercase
      index = russianAlphabetLower.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + shift % 33 + 33) % 33;
        return russianAlphabetLower[newIndex];
      }

      // English uppercase
      index = englishAlphabetUpper.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + shift % 26 + 26) % 26;
        return englishAlphabetUpper[newIndex];
      }

      // English lowercase
      index = englishAlphabetLower.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + shift % 26 + 26) % 26;
        return englishAlphabetLower[newIndex];
      }

      return char;
    })
    .join('');
}

export function atbashCipher(text: string): string {
  const russianAlphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const russianAlphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const englishAlphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const englishAlphabetLower = 'abcdefghijklmnopqrstuvwxyz';

  return text
    .split('')
    .map(char => {
      // Russian uppercase
      let index = russianAlphabetUpper.indexOf(char);
      if (index !== -1) {
        return russianAlphabetUpper[32 - index];
      }

      // Russian lowercase
      index = russianAlphabetLower.indexOf(char);
      if (index !== -1) {
        return russianAlphabetLower[32 - index];
      }

      // English uppercase
      index = englishAlphabetUpper.indexOf(char);
      if (index !== -1) {
        return englishAlphabetUpper[25 - index];
      }

      // English lowercase
      index = englishAlphabetLower.indexOf(char);
      if (index !== -1) {
        return englishAlphabetLower[25 - index];
      }

      return char;
    })
    .join('');
}

export function railFenceDecrypt(ciphertext: string, rails: number): string {
  if (rails <= 1) {
    return ciphertext;
  }

  const len = ciphertext.length;
  const railLens = new Array(rails).fill(0);
  let dir = 1;
  let rail = 0;

  for (let i = 0; i < len; i++) {
    railLens[rail]++;
    rail += dir;
    if (rail === 0 || rail === rails - 1) {
      dir *= -1;
    }
  }

  const railStarts = new Array(rails).fill(0);
  for (let i = 1; i < rails; i++) {
    railStarts[i] = railStarts[i - 1] + railLens[i - 1];
  }

  const result = new Array(len);
  dir = 1;
  rail = 0;
  const railCounters = new Array(rails).fill(0);

  for (let i = 0; i < len; i++) {
    const index = railStarts[rail] + railCounters[rail];
    result[i] = ciphertext[index];
    railCounters[rail]++;
    rail += dir;
    if (rail === 0 || rail === rails - 1) {
      dir *= -1;
    }
  }

  return result.join('');
}

export function affineDecrypt(ciphertext: string, a: number, b: number): string {
  const russianAlphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const russianAlphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const englishAlphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const englishAlphabetLower = 'abcdefghijklmnopqrstuvwxyz';

  const isRussian = /[А-ЯЁ]/i.test(ciphertext);
  const alphabetUpper = isRussian ? russianAlphabetUpper : englishAlphabetUpper;
  const alphabetLower = isRussian ? russianAlphabetLower : englishAlphabetLower;
  const alphabetSize = isRussian ? 33 : 26;

  let modInverse = -1;
  for (let i = 0; i < alphabetSize; i++) {
    if ((a * i) % alphabetSize === 1) {
      modInverse = i;
      break;
    }
  }

  if (modInverse === -1) {
    return 'Invalid \'a\' value for the detected alphabet.';
  }

  return ciphertext
    .split('')
    .map(char => {
      // Uppercase
      let index = alphabetUpper.indexOf(char);
      if (index !== -1) {
        const newIndex = (modInverse * (index - b + alphabetSize)) % alphabetSize;
        return alphabetUpper[newIndex];
      }

      // Lowercase
      index = alphabetLower.indexOf(char);
      if (index !== -1) {
        const newIndex = (modInverse * (index - b + alphabetSize)) % alphabetSize;
        return alphabetLower[newIndex];
      }

      return char;
    })
    .join('');
}

export function playfairCipher(text: string, key: string, mode: 'encrypt' | 'decrypt'): string {
    const isRussian = /[А-ЯЁ]/i.test(key) || /[А-ЯЁ]/i.test(text);

    const gridSize = isRussian ? 6 : 5;
    const alphabet = isRussian
        ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.,_'
        : 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

    const prepareKey = (key: string) => {
        let keyUpper = key.toUpperCase();
        if (isRussian) {
            keyUpper = keyUpper.replace(/[^А-ЯЁ.,_]/g, '');
        } else {
            keyUpper = keyUpper.replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        }
        const keySet = new Set(keyUpper.split(''));
        let result = Array.from(keySet).join('');
        for (const char of alphabet) {
            if (!keySet.has(char)) {
                result += char;
            }
        }
        return result;
    };

    const generateMatrix = (key: string) => {
        const matrix = [];
        for (let i = 0; i < gridSize; i++) {
            matrix.push(key.slice(i * gridSize, i * gridSize + gridSize).split(''));
        }
        return matrix;
    };

    const findPos = (matrix: string[][], char: string) => {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (matrix[i][j] === char) {
                    return { row: i, col: j };
                }
            }
        }
        return { row: -1, col: -1 };
    };

    const preparedKey = prepareKey(key);
    const matrix = generateMatrix(preparedKey);
    let textUpper = text.toUpperCase();
    if (isRussian) {
        textUpper = textUpper.replace(/[^А-ЯЁ.,_]/g, '');
    } else {
        textUpper = textUpper.replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    }

    let result = '';

    if (mode === 'encrypt') {
        const pairs = [];
        for (let i = 0; i < textUpper.length; i += 2) {
            const p1 = textUpper[i];
            let p2 = (i + 1 < textUpper.length) ? textUpper[i + 1] : 'X';
            if (p1 === p2) {
                p2 = 'X';
                i--;
            }
            pairs.push(p1 + p2);
        }

        for (const pair of pairs) {
            const p1 = pair[0];
            const p2 = pair[1];
            const pos1 = findPos(matrix, p1);
            const pos2 = findPos(matrix, p2);

            if (pos1.row === pos2.row) {
                result += matrix[pos1.row][(pos1.col + 1) % gridSize];
                result += matrix[pos2.row][(pos2.col + 1) % gridSize];
            } else if (pos1.col === pos2.col) {
                result += matrix[(pos1.row + 1) % gridSize][pos1.col];
                result += matrix[(pos2.row + 1) % gridSize][pos2.col];
            } else {
                result += matrix[pos1.row][pos2.col];
                result += matrix[pos2.row][pos1.col];
            }
        }
    } else { // decrypt
        for (let i = 0; i < textUpper.length; i += 2) {
            const p1 = textUpper[i];
            const p2 = textUpper[i + 1];
            const pos1 = findPos(matrix, p1);
            const pos2 = findPos(matrix, p2);

            if (pos1.row === pos2.row) {
                result += matrix[pos1.row][(pos1.col + gridSize - 1) % gridSize];
                result += matrix[pos2.row][(pos2.col + gridSize - 1) % gridSize];
            } else if (pos1.col === pos2.col) {
                result += matrix[(pos1.row + gridSize - 1) % gridSize][pos1.col];
                result += matrix[(pos2.row + gridSize - 1) % gridSize][pos2.col];
            } else {
                result += matrix[pos1.row][pos2.col];
                result += matrix[pos2.row][pos1.col];
            }
        }
    }
    return result;
}

function normalizeText(text: string): string {
    // Converts text to uppercase and removes any non-alphabetic characters.
    return text.toUpperCase().replace(/[^A-ZА-ЯЁ]/g, '');
}

export function vigenereDecrypt(ciphertext: string, keyword: string): string {
    const russianAlphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const englishAlphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const normalizedCiphertext = normalizeText(ciphertext);
    const normalizedKeyword = normalizeText(keyword);
    let decryptedText = '';

    if (normalizedKeyword.length === 0) {
        return ciphertext;
    }

    for (let i = 0; i < normalizedCiphertext.length; i++) {
        const cipherChar = normalizedCiphertext[i];
        const keyChar = normalizedKeyword[i % normalizedKeyword.length];

        let alphabet, alphabetSize;
        if (russianAlphabetUpper.includes(cipherChar)) {
            alphabet = russianAlphabetUpper;
            alphabetSize = 33;
        } else {
            alphabet = englishAlphabetUpper;
            alphabetSize = 26;
        }

        const cipherValue = alphabet.indexOf(cipherChar);
        const keyValue = alphabet.indexOf(keyChar);

        if (cipherValue === -1 || keyValue === -1) {
            decryptedText += cipherChar;
            continue;
        }

        const decryptedValue = (cipherValue - keyValue + alphabetSize) % alphabetSize;
        const decryptedChar = alphabet[decryptedValue];
        decryptedText += decryptedChar;
    }

    return decryptedText;
}