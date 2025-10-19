

export function caesarShift(text: string, shift: number): string {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    })
    .join('');
}

export function atbashCipher(text: string): string {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(90 - (code - 65));
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(122 - (code - 97));
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
  let modInverse = -1;
  for (let i = 0; i < 26; i++) {
    if ((a * i) % 26 === 1) {
      modInverse = i;
      break;
    }
  }

  if (modInverse === -1) {
    return 'Invalid \'a\' value';
  }

  return ciphertext
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        let num = code - 65;
        num = (modInverse * (num - b + 26)) % 26;
        return String.fromCharCode(num + 65);
      } else if (code >= 97 && code <= 122) {
        let num = code - 97;
        num = (modInverse * (num - b + 26)) % 26;
        return String.fromCharCode(num + 97);
      }
      return char;
    })
    .join('');
}

export function playfairCipher(text: string, key: string, mode: 'encrypt' | 'decrypt'): string {
    // This is a simplified implementation and may not handle all edge cases.
    const prepareKey = (key: string) => {
        let keyUpper = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        let keySet = new Set(keyUpper.split(''));
        let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        let result = Array.from(keySet).join('');
        for (let char of alphabet) {
            if (!keySet.has(char)) {
                result += char;
            }
        }
        return result;
    };

    const generateMatrix = (key: string) => {
        let matrix = [];
        for (let i = 0; i < 5; i++) {
            matrix.push(key.slice(i * 5, i * 5 + 5).split(''));
        }
        return matrix;
    };

    const findPos = (matrix: string[][], char: string) => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === char) {
                    return { row: i, col: j };
                }
            }
        }
        return { row: -1, col: -1 };
    };

    const preparedKey = prepareKey(key);
    const matrix = generateMatrix(preparedKey);
    let textUpper = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let result = '';

    if (mode === 'encrypt') {
        let pairs = [];
        for (let i = 0; i < textUpper.length; i += 2) {
            let p1 = textUpper[i];
            let p2 = (i + 1 < textUpper.length) ? textUpper[i + 1] : 'X';
            if (p1 === p2) {
                p2 = 'X';
                i--;
            }
            pairs.push(p1 + p2);
        }

        for (let pair of pairs) {
            let p1 = pair[0];
            let p2 = pair[1];
            let pos1 = findPos(matrix, p1);
            let pos2 = findPos(matrix, p2);

            if (pos1.row === pos2.row) {
                result += matrix[pos1.row][(pos1.col + 1) % 5];
                result += matrix[pos2.row][(pos2.col + 1) % 5];
            } else if (pos1.col === pos2.col) {
                result += matrix[(pos1.row + 1) % 5][pos1.col];
                result += matrix[(pos2.row + 1) % 5][pos2.col];
            } else {
                result += matrix[pos1.row][pos2.col];
                result += matrix[pos2.row][pos1.col];
            }
        }
    } else { // decrypt
        for (let i = 0; i < textUpper.length; i += 2) {
            let p1 = textUpper[i];
            let p2 = textUpper[i + 1];
            let pos1 = findPos(matrix, p1);
            let pos2 = findPos(matrix, p2);

            if (pos1.row === pos2.row) {
                result += matrix[pos1.row][(pos1.col + 4) % 5];
                result += matrix[pos2.row][(pos2.col + 4) % 5];
            } else if (pos1.col === pos2.col) {
                result += matrix[(pos1.row + 4) % 5][pos1.col];
                result += matrix[(pos2.row + 4) % 5][pos2.col];
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
    return text.toUpperCase().replace(/[^A-Z]/g, '');
}

export function vigenereDecrypt(ciphertext: string, keyword: string): string {
    const normalizedCiphertext = normalizeText(ciphertext);
    const normalizedKeyword = normalizeText(keyword);
    let decryptedText = '';

    if (normalizedKeyword.length === 0) {
        // If the keyword is empty, decryption is not possible.
        return ciphertext;
    }

    for (let i = 0; i < normalizedCiphertext.length; i++) {
        const cipherChar = normalizedCiphertext[i];
        // Cycle through the keyword for each character in the ciphertext.
        const keyChar = normalizedKeyword[i % normalizedKeyword.length];

        // Convert characters to 0-25 scale (A=0, B=1, ..., Z=25).
        const cipherValue = cipherChar.charCodeAt(0) - 'A'.charCodeAt(0);
        const keyValue = keyChar.charCodeAt(0) - 'A'.charCodeAt(0);

        // Vigenere decryption formula: (C - K + 26) % 26
        // Adding 26 before modulo handles negative results from (C - K).
        const decryptedValue = (cipherValue - keyValue + 26) % 26;
        // Convert the numerical value back to a character.
        const decryptedChar = String.fromCharCode(decryptedValue + 'A'.charCodeAt(0));
        decryptedText += decryptedChar;
    }

    return decryptedText;
}
