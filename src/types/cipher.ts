export type CipherState = {
  substitution: {
    ciphertext: string;
    mapping: Record<string, string>;
    enforceUnique: boolean;
    includeSpecial: boolean;
  };
  caesar: {
    ciphertext: string;
    shift: number;
  };
  vigenere: {
    ciphertext: string;
    key: string;
  };
  alberti: {
    ciphertext: string;
    outerRotation: number;
    innerRotation: number;
    mode: 'encrypt' | 'decrypt';
  };
  other: {
    atbash: {
      text: string;
    };
    railfence: {
      ciphertext: string;
      rails: number;
    };
    affine: {
      ciphertext: string;
      a: number;
      b: number;
    };
    rot13: {
      text: string;
    };
    playfair: {
      ciphertext: string;
      key: string;
    };
    polybius: {
      ciphertext: string;
    };
  };
};