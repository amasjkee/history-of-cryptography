import { useState, useEffect, useRef } from 'react';
import { calculateFrequency } from '../utils/frequencyAnalysis';
import { englishStats, russianStats } from '../data/languageStats';

export default function SubstitutionCipher() {
  const [ciphertext, setCiphertext] = useState('');
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [showFrequency, setShowFrequency] = useState(false);
  const [enforceUnique, setEnforceUnique] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);

  const handleCiphertextChange = (text: string) => {
    const upper = text.toUpperCase();
    setCiphertext(upper);
  };

  const handleMappingChange = (cipherChar: string, plainChar: string) => {
    const newMapping = { ...mapping };

    if (plainChar) {
      const upper = plainChar.toUpperCase();
      newMapping[cipherChar] = upper;

      if (enforceUnique) {
        Object.keys(newMapping).forEach((key) => {
          if (key !== cipherChar && newMapping[key] === upper) {
            delete newMapping[key];
          }
        });
      }
    } else {
      delete newMapping[cipherChar];
    }

    setMapping(newMapping);
  };

  const clearMapping = () => {
    setMapping({});
  };

  const applyMapping = (text: string): string => {
    return text
      .split('')
      .map((char) => {
        if (/[A-ZА-Я]/.test(char)) {
          return mapping[char] || char;
        }
        return char;
      })
      .join('');
  };

  const getUnderscored = (text: string): string => {
    return text
      .split('')
      .map((char) => {
        if (/[A-ZА-Я]/.test(char)) {
          return mapping[char] || '_';
        }
        return char;
      })
      .join('');
  };

  const uniqueChars = Array.from(new Set(ciphertext.split('').filter((c) => /[A-ZА-Я]/.test(c))));
  const decrypted = applyMapping(ciphertext);
  const underscored = getUnderscored(ciphertext);
  const frequencies = calculateFrequency(ciphertext);

  const isRussian = /[А-Я]/.test(ciphertext);
  const refStats = isRussian ? russianStats : englishStats;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Зашифрованный текст
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => handleCiphertextChange(e.target.value)}
          placeholder="Введите зашифрованный текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical font-mono text-sm"
        />

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={clearMapping}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Очистить замены
          </button>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enforceUnique}
              onChange={(e) => setEnforceUnique(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Уникальные замены</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFrequency}
              onChange={(e) => setShowFrequency(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Показать частоту</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={(e) => setIncludeSpecial(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Цифры и символы</span>
          </label>
        </div>
      </div>

      {ciphertext && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Исходный текст
            </h3>
            <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words">
              {ciphertext}
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Введите соответствия
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
              {uniqueChars.map((char) => (
                <MappingTile
                  key={char}
                  cipherChar={char}
                  plainChar={mapping[char] || ''}
                  onChange={(plain) => handleMappingChange(char, plain)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Расшифрованный текст
            </h3>
            <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words">
              {decrypted.split('').map((char, i) => {
                const original = ciphertext[i];
                const isMapped = /[A-ZА-Я]/.test(original) && mapping[original];
                return (
                  <span key={i} className={isMapped ? 'text-orange-600 font-bold' : ''}>
                    {char}
                  </span>
                );
              })}
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Подстановки (_ = неизвестно)
            </h3>
            <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words">
              {underscored}
            </pre>
          </div>

          {showFrequency && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Частотный анализ
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    Частота в зашифрованном тексте
                  </h4>
                  <div className="space-y-1">
                    {frequencies.slice(0, 15).map(({ char, count, percentage }) => (
                      <div key={char} className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm w-6">{char}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className="bg-blue-500 h-6 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    Эталонная частота ({isRussian ? 'Русский' : 'Английский'})
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(refStats.letterFrequencies)
                      .slice(0, 15)
                      .map(([char, percentage]) => (
                        <div key={char} className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm w-6">{char}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                            <div
                              className="bg-green-500 h-6 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface MappingTileProps {
  cipherChar: string;
  plainChar: string;
  onChange: (value: string) => void;
}

function MappingTile({ cipherChar, plainChar, onChange }: MappingTileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !plainChar) {
      const allInputs = Array.from(
        document.querySelectorAll<HTMLInputElement>('input[data-mapping-input]')
      );
      const currentIndex = allInputs.indexOf(inputRef.current!);
      if (currentIndex > 0) {
        allInputs[currentIndex - 1].focus();
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value.toUpperCase();

    if (value && /[A-ZА-Я]/.test(value[value.length - 1])) {
      onChange(value[value.length - 1]);

      const allInputs = Array.from(
        document.querySelectorAll<HTMLInputElement>('input[data-mapping-input]')
      );
      const currentIndex = allInputs.indexOf(target);
      if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
      }
    } else if (!value) {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center font-mono font-bold text-lg">
        {cipherChar === ' ' ? '␣' : cipherChar}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={plainChar}
        onChange={(e) => onChange(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        maxLength={1}
        data-mapping-input
        className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-mono font-bold text-lg uppercase"
      />
    </div>
  );
}
