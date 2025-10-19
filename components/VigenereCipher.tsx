import { vigenereDecrypt } from '../lib/cipherUtils';
import { calculateIndexOfCoincidence } from '../lib/frequencyAnalysis';
import { CipherState } from '../types/cipher';

interface VigenereCipherProps {
  state: CipherState['vigenere'];
  setState: React.Dispatch<React.SetStateAction<CipherState>>;
}

export default function VigenereCipher({ state, setState }: VigenereCipherProps) {
  const { ciphertext, key } = state;

  const handleStateChange = (newState: Partial<CipherState['vigenere']>) => {
    setState((prevState) => ({
      ...prevState,
      vigenere: { ...prevState.vigenere, ...newState }
    }));
  };

  const decrypted = vigenereDecrypt(ciphertext, key);
  const ic = calculateIndexOfCoincidence(ciphertext);

  const findRepeatingPatterns = (text: string, minLength: number = 3) => {
    const cleanText = text.replace(/[^A-ZА-Я]/g, '');
    const patterns: { pattern: string; positions: number[]; distances: number[] }[] = [];

    for (let len = minLength; len <= 6; len++) {
      const found = new Map<string, number[]>();

      for (let i = 0; i <= cleanText.length - len; i++) {
        const substr = cleanText.substring(i, i + len);
        if (!found.has(substr)) {
          found.set(substr, []);
        }
        found.get(substr)!.push(i);
      }

      found.forEach((positions, pattern) => {
        if (positions.length > 1) {
          const distances: number[] = [];
          for (let i = 1; i < positions.length; i++) {
            distances.push(positions[i] - positions[i - 1]);
          }
          patterns.push({ pattern, positions, distances });
        }
      });
    }

    return patterns
      .sort((a, b) => b.positions.length - a.positions.length)
      .slice(0, 10);
  };

  const patterns = ciphertext ? findRepeatingPatterns(ciphertext) : [];

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const findGCD = (numbers: number[]): number => {
    return numbers.reduce((acc, num) => gcd(acc, num));
  };

  const suggestedKeyLengths = patterns
    .map((p) => findGCD(p.distances))
    .filter((len) => len > 1 && len <= 20);

  const uniqueKeyLengths = Array.from(new Set(suggestedKeyLengths))
    .sort((a, b) => {
      const countA = suggestedKeyLengths.filter((x) => x === a).length;
      const countB = suggestedKeyLengths.filter((x) => x === b).length;
      return countB - countA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <label className="block text-sm font-semibold text-muted-foreground mb-2">
          Зашифрованный текст
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => handleStateChange({ ciphertext: e.target.value.toUpperCase() })}
          placeholder="Введите зашифрованный текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-background border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all resize-vertical font-mono text-sm text-foreground"
        />

        <div className="mt-4">
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            Ключ
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => handleStateChange({ key: e.target.value.toUpperCase() })}
            placeholder="Введите ключ..."
            className="w-full px-4 py-3 border-2 bg-background border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm text-foreground"
          />
        </div>
      </div>

      {ciphertext && key && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Расшифрованный текст
          </h3>
          <pre className="font-mono text-sm bg-secondary p-4 rounded-lg whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      {ciphertext && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Анализ (метод Касиски)
          </h3>

          <div className="mb-4 p-4 bg-secondary border border-border rounded-lg">
            <p className="text-sm text-foreground">
              <strong className="text-primary">Индекс совпадений:</strong> {ic.toFixed(4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {ic > 0.06
                ? 'Похоже на моноалфавитный шифр (простая замена или Цезарь)'
                : ic > 0.04
                ? 'Вероятно, полиалфавитный шифр (Виженер, Гронсфельд)'
                : 'Возможно, случайный текст или сложный шифр'}
            </p>
          </div>

          {uniqueKeyLengths.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Предполагаемая длина ключа:
              </h4>
              <div className="flex flex-wrap gap-2">
                {uniqueKeyLengths.map((len) => (
                  <button
                    key={len}
                    onClick={() => handleStateChange({ key: 'A'.repeat(len) })}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
                  >
                    {len} букв
                  </button>
                ))}
              </div>
            </div>
          )}

          {patterns.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Повторяющиеся паттерны:
              </h4>
              <div className="space-y-2">
                {patterns.slice(0, 5).map((p, i) => (
                  <div key={i} className="p-3 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-sm text-primary">{p.pattern}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.positions.length} раз(а)
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Расстояния: {p.distances.join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      НОД: {findGCD(p.distances)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Как взломать шифр Виженера</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">1.</span>
            <span>Найдите <strong className="text-primary">повторяющиеся последовательности</strong> в тексте</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">2.</span>
            <span>Измерьте <strong className="text-primary">расстояния</strong> между повторениями</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">3.</span>
            <span>Найдите <strong className="text-primary">НОД</strong> расстояний - это вероятная длина ключа</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">4.</span>
            <span>Разделите текст на колонки по длине ключа</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">5.</span>
            <span>Примените <strong className="text-primary">частотный анализ</strong> к каждой колонке отдельно</span>
          </li>
        </ul>
      </div>
    </div>
  );
}