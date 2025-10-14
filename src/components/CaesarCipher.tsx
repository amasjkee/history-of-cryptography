import { useState } from 'react';
import { caesarShift } from '../utils/cipherUtils';

export default function CaesarCipher() {
  const [ciphertext, setCiphertext] = useState('');
  const [shift, setShift] = useState(3);
  const [showAllShifts, setShowAllShifts] = useState(false);

  const decrypted = caesarShift(ciphertext, shift);

  const allShifts = Array.from({ length: 26 }, (_, i) => ({
    shift: i,
    text: caesarShift(ciphertext, i)
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Зашифрованный текст
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value.toUpperCase())}
          placeholder="Введите зашифрованный текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical font-mono text-sm"
        />

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Сдвиг: {shift}
            </label>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
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
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-700">Показать все варианты (перебор)</span>
          </label>
        </div>
      </div>

      {ciphertext && !showAllShifts && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Расшифрованный текст (сдвиг {shift})
          </h3>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      {ciphertext && showAllShifts && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Все возможные сдвиги
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {allShifts.map(({ shift: s, text }) => (
              <div
                key={s}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  s === shift
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setShift(s)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-600">Сдвиг {s}</span>
                  {s === shift && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
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

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">Как взломать шифр Цезаря</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>Используйте перебор всех 26 возможных сдвигов</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Ищите осмысленные слова в расшифрованных вариантах</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>ROT13 - это шифр Цезаря со сдвигом 13</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Частотный анализ: самая частая буква вероятно E (англ.) или О (рус.)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
