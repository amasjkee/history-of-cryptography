import { useState } from 'react';
import { caesarShift } from '../utils/cipherUtils';
import { CipherState } from '../types/cipher';

interface CaesarCipherProps {
  state: CipherState['caesar'];
  setState: React.Dispatch<React.SetStateAction<CipherState>>;
}

export default function CaesarCipher({ state, setState }: CaesarCipherProps) {
  const [showAllShifts, setShowAllShifts] = useState(false);

  const { ciphertext, shift } = state;

  const handleStateChange = (newState: Partial<CipherState['caesar']>) => {
    setState((prevState) => ({
      ...prevState,
      caesar: { ...prevState.caesar, ...newState }
    }));
  };

  const decrypted = caesarShift(ciphertext, shift);

  const allShifts = Array.from({ length: 26 }, (_, i) => ({
    shift: i,
    text: caesarShift(ciphertext, i)
  }));

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Зашифрованный текст
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => handleStateChange({ ciphertext: e.target.value.toUpperCase() })}
          placeholder="Введите зашифрованный текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-vertical font-mono text-sm text-slate-200"
        />

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Сдвиг: {shift}
            </label>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => handleStateChange({ shift: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0</span>
              <span>13</span>
              <span>25</span>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAllShifts}
              onChange={(e) => setShowAllShifts(e.target.checked)}
              className="w-4 h-4 accent-yellow-400"
            />
            <span className="text-sm text-slate-300">Показать все варианты (перебор)</span>
          </label>
        </div>
      </div>

      {ciphertext && !showAllShifts && (
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Расшифрованный текст (сдвиг {shift})
          </h3>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      {ciphertext && showAllShifts && (
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Все возможные сдвиги
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {allShifts.map(({ shift: s, text }) => (
              <div
                key={s}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  s === shift
                    ? 'bg-slate-700 border-yellow-400'
                    : 'bg-slate-800 border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => handleStateChange({ shift: s })}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Сдвиг {s}</span>
                  {s === shift && (
                    <span className="text-xs bg-yellow-400 text-slate-900 px-2 py-1 rounded">
                      Выбрано
                    </span>
                  )}
                </div>
                <pre className="font-mono text-xs whitespace-pre-wrap break-words">
                  {text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Как взломать шифр Цезаря</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">1.</span>
            <span>Используйте перебор всех 26 возможных сдвигов</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">2.</span>
            <span>Ищите осмысленные слова в расшифрованных вариантах</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">3.</span>
            <span><strong className="text-yellow-400">ROT13</strong> - это шифр Цезаря со сдвигом 13</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">4.</span>
            <span><strong className="text-yellow-400">Частотный анализ</strong>: самая частая буква вероятно <strong className="text-yellow-400">E</strong> (англ.) или <strong className="text-yellow-400">О</strong> (рус.)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
