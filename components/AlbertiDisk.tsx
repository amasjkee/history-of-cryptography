import { useState } from 'react';
import { CipherState } from '../types/cipher';

const EN_OUTER_RING = 'ABCDEFGHILMNOPQRSTVXZ1234';
const EN_INNER_RING = 'abcdefghilmnopqrstuvxyz&';
const RU_OUTER_RING = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const RU_INNER_RING = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

interface AlbertiDiskProps {
  state: CipherState['alberti'];
  setState: React.Dispatch<React.SetStateAction<CipherState>>;
}

export default function AlbertiDisk({ state, setState }: AlbertiDiskProps) {
  const { outerRotation, innerRotation, ciphertext, mode } = state;
  const [language, setLanguage] = useState<'en' | 'ru'>('en');

  const OUTER_RING = language === 'ru' ? RU_OUTER_RING : EN_OUTER_RING;
  const INNER_RING = language === 'ru' ? RU_INNER_RING : EN_INNER_RING;

  const handleStateChange = (newState: Partial<CipherState['alberti']>) => {
    setState((prevState) => ({
      ...prevState,
      alberti: { ...prevState.alberti, ...newState }
    }));
  };

  const rotateOuter = (steps: number) => {
    handleStateChange({
      outerRotation: (outerRotation + steps + OUTER_RING.length) % OUTER_RING.length
    });
  };

  const rotateInner = (steps: number) => {
    handleStateChange({
      innerRotation: (innerRotation + steps + INNER_RING.length) % INNER_RING.length
    });
  };

  const getRotatedRing = (ring: string, rotation: number) => {
    return ring.slice(rotation) + ring.slice(0, rotation);
  };

  const rotatedOuter = getRotatedRing(OUTER_RING, outerRotation);
  const rotatedInner = getRotatedRing(INNER_RING, innerRotation);

  const createMapping = () => {
    const mapping: Record<string, string> = {};
    for (let i = 0; i < OUTER_RING.length; i++) {
      mapping[rotatedOuter[i]] = rotatedInner[i % INNER_RING.length];
      mapping[rotatedInner[i % INNER_RING.length]] = rotatedOuter[i];
    }
    return mapping;
  };

  const mapping = createMapping();

  const processText = (text: string) => {
    return text
      .split('')
      .map((char) => {
        const upper = char.toUpperCase();
        return mapping[upper] || mapping[char] || char;
      })
      .join('');
  };

  const result = processText(ciphertext);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Визуализация дисков</h3>
                <div className="flex gap-2">
                    <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-xs rounded-md ${language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>EN</button>
                    <button onClick={() => setLanguage('ru')} className={`px-3 py-1 text-xs rounded-md ${language === 'ru' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>RU</button>
                </div>
            </div>

            <div className="relative w-full max-w-md mx-auto aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>

                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="#334155"
                  stroke="#475569"
                  strokeWidth="3"
                  filter="url(#shadow)"
                />

                {OUTER_RING.split('').map((char, i) => {
                  const angle = ((i + outerRotation) / OUTER_RING.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 200 + Math.cos(angle) * 150;
                  const y = 200 + Math.sin(angle) * 150;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-lg font-bold fill-foreground"
                    >
                      {char}
                    </text>
                  );
                })}

                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="#475569"
                  stroke="#64748b"
                  strokeWidth="3"
                  filter="url(#shadow)"
                />

                {INNER_RING.split('').map((char, i) => {
                  const angle = ((i + innerRotation) / INNER_RING.length) * 2 * Math.PI - Math.PI / 2;
                  const x = 200 + Math.cos(angle) * 90;
                  const y = 200 + Math.sin(angle) * 90;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-base font-bold fill-secondary-foreground"
                    >
                      {char}
                    </text>
                  );
                })}

                <line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="20"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle cx="200" cy="20" r="6" fill="#f59e0b" />

                <circle cx="200" cy="200" r="15" fill="#1e293b" />
              </svg>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">
                  Внешнее кольцо (сдвиг: {outerRotation})
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => rotateOuter(-1)}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    ← Влево
                  </button>
                  <button
                    onClick={() => handleStateChange({ outerRotation: 0 })}
                    className="px-4 py-2 bg-background text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Сброс
                  </button>
                  <button
                    onClick={() => rotateOuter(1)}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Вправо →
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">
                  Внутреннее кольцо (сдвиг: {innerRotation})
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => rotateInner(-1)}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    ← Влево
                  </button>
                  <button
                    onClick={() => handleStateChange({ innerRotation: 0 })}
                    className="px-4 py-2 bg-background text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Сброс
                  </button>
                  <button
                    onClick={() => rotateInner(1)}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Вправо →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              Текст для {mode === 'encrypt' ? 'шифрования' : 'дешифрования'}
            </label>
            <textarea
              value={ciphertext}
              onChange={(e) => handleStateChange({ ciphertext: e.target.value.toUpperCase() })}
              placeholder="Введите текст..."
              rows={8}
              className="w-full px-4 py-3 border-2 bg-background border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all resize-vertical font-mono text-sm text-foreground"
            />

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleStateChange({ mode: 'encrypt' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'encrypt'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                Шифрование
              </button>
              <button
                onClick={() => handleStateChange({ mode: 'decrypt' })}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  mode === 'decrypt'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                Дешифрование
              </button>
            </div>

            {ciphertext && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Результат:</h4>
                <pre className="font-mono text-sm bg-secondary p-4 rounded-lg border-2 border-border whitespace-pre-wrap break-words">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Текущее соответствие
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">Внешнее → Внутреннее</h4>
            <div className="font-mono text-xs bg-secondary p-3 rounded-lg">
              <div className="grid grid-cols-6 gap-2">
                {OUTER_RING.split('').map((char, i) => (
                  <div key={i} className="text-center">
                    <div className="font-bold text-foreground">{char}</div>
                    <div className="text-muted-foreground">↓</div>
                    <div className="font-bold text-primary">
                      {rotatedInner[i % INNER_RING.length]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">Внутреннее → Внешнее</h4>
            <div className="font-mono text-xs bg-secondary p-3 rounded-lg">
              <div className="grid grid-cols-6 gap-2">
                {INNER_RING.split('').map((char, i) => (
                  <div key={i} className="text-center">
                    <div className="font-bold text-foreground">{char}</div>
                    <div className="text-muted-foreground">↓</div>
                    <div className="font-bold text-primary">{rotatedOuter[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">О диске Альберти</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">•</span>
            <span>Изобретён <strong className="text-primary">Леоном Баттистой Альберти</strong> в 1467 году</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">•</span>
            <span>Первый <strong className="text-primary">полиалфавитный шифр</strong> в истории</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">•</span>
            <span>Внешний диск: 24 заглавные буквы + цифры</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">•</span>
            <span>Внутренний диск: 24 строчные буквы + символ &</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground font-bold">•</span>
            <span>Буквы H, J, K, U, W, Y отсутствуют (латинский алфавит XV века)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
