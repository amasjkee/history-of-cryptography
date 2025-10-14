export function caesarShift(text: string, shift: number): string {
  return text
    .split('')
    .map((char) => {
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      } else if (/[a-z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      } else if (/[А-Я]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 1040 + shift) % 33) + 1040);
      } else if (/[а-я]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 1072 + shift) % 33) + 1072);
      }
      return char;
    })
    .join('');
}

export function vigenereDecrypt(ciphertext: string, key: string): string {
  if (!key) return ciphertext;

  const upperKey = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (const char of ciphertext) {
    if (/[A-Z]/.test(char)) {
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
      result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      keyIndex++;
    } else if (/[a-z]/.test(char)) {
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
      result += String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      keyIndex++;
    } else if (/[А-Я]/.test(char)) {
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 1040;
      result += String.fromCharCode(((char.charCodeAt(0) - 1040 - shift + 33) % 33) + 1040);
      keyIndex++;
    } else if (/[а-я]/.test(char)) {
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 1072;
      result += String.fromCharCode(((char.charCodeAt(0) - 1072 - shift + 33) % 33) + 1072);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

export function atbashCipher(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
      } else if (/[a-z]/.test(char)) {
        return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
      } else if (/[А-Я]/.test(char)) {
        return String.fromCharCode(1071 - (char.charCodeAt(0) - 1040));
      } else if (/[а-я]/.test(char)) {
        return String.fromCharCode(1103 - (char.charCodeAt(0) - 1072));
      }
      return char;
    })
    .join('');
}

export function railFenceDecrypt(ciphertext: string, rails: number): string {
  if (rails <= 1) return ciphertext;

  const cleanText = ciphertext.replace(/[^A-ZА-Я]/gi, '');
  const len = cleanText.length;
  const fence: string[][] = Array.from({ length: rails }, () => []);

  const railLengths = Array(rails).fill(0);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < len; i++) {
    railLengths[rail]++;
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  let index = 0;
  for (let i = 0; i < rails; i++) {
    fence[i] = cleanText.substring(index, index + railLengths[i]).split('');
    index += railLengths[i];
  }

  let result = '';
  rail = 0;
  direction = 1;
  const indices = Array(rails).fill(0);

  for (let i = 0; i < len; i++) {
    result += fence[rail][indices[rail]];
    indices[rail]++;
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return result;
}

export function affineDecrypt(ciphertext: string, a: number, b: number): string {
  const modInverse = (a: number, m: number): number => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1;
  };

  const aInv = modInverse(a, 26);

  return ciphertext
    .split('')
    .map((char) => {
      if (/[A-Z]/.test(char)) {
        const y = char.charCodeAt(0) - 65;
        const x = (aInv * (y - b + 26)) % 26;
        return String.fromCharCode(x + 65);
      } else if (/[a-z]/.test(char)) {
        const y = char.charCodeAt(0) - 97;
        const x = (aInv * (y - b + 26)) % 26;
        return String.fromCharCode(x + 97);
      }
      return char;
    })
    .join('');
}
