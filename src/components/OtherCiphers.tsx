import { useState } from 'react';
import { atbashCipher, railFenceDecrypt, affineDecrypt, playfairCipher } from '../utils/cipherUtils';
import { CipherState } from '../types/cipher';

type CipherTab = 'atbash' | 'railfence' | 'affine' | 'rot13' | 'playfair' | 'polybius';

interface OtherCiphersProps {
  state: CipherState['other'];
  setState: React.Dispatch<React.SetStateAction<CipherState>>;
}

export default function OtherCiphers({ state, setState }: OtherCiphersProps) {
  const [activeTab, setActiveTab] = useState<CipherTab>('atbash');

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'atbash', label: 'Атбаш' },
            { id: 'railfence', label: 'Железнодорожная изгородь' },
            { id: 'affine', label: 'Аффинный' },
            { id: 'rot13', label: 'ROT13' },
            { id: 'playfair', label: 'Плейфер' },
            { id: 'polybius', label: 'Полибий' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CipherTab)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'atbash' && <AtbashCipher state={state.atbash} setState={setState} />}
        {activeTab === 'railfence' && <RailFenceCipher state={state.railfence} setState={setState} />}
        {activeTab === 'affine' && <AffineCipher state={state.affine} setState={setState} />}
        {activeTab === 'rot13' && <ROT13Cipher state={state.rot13} setState={setState} />}
        {activeTab === 'playfair' && <PlayfairCipher state={state.playfair} setState={setState} />}
        {activeTab === 'polybius' && <PolybiusCipher state={state.polybius} setState={setState} />}
      </div>
    </div>
  );
}

// --- Sub-components --- //

interface SubCipherProps<T extends keyof CipherState['other']> {
  state: CipherState['other'][T];
  setState: React.Dispatch<React.SetStateAction<CipherState>>;
}

function AtbashCipher({ state, setState }: SubCipherProps<'atbash'>) {
  const { text } = state;
  const result = atbashCipher(text);

  const handleTextChange = (newText: string) => {
    setState((prev) => ({ ...prev, other: { ...prev.other, atbash: { text: newText } } }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Текст
        </label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value.toUpperCase())}
          placeholder="Введите текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-vertical font-mono text-sm text-slate-200"
        />
      </div>

      {text && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Результат (Атбаш)
          </label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">Об Атбаше</h4>
        <p className="text-sm text-slate-300">
          Простейший шифр замены: первая буква алфавита меняется на последнюю (<strong className="text-yellow-400">A↔Z</strong>),
          вторая на предпоследнюю (<strong className="text-yellow-400">B↔Y</strong>) и т.д. Шифрование и дешифрование идентичны.
        </p>
      </div>
    </div>
  );
}

function RailFenceCipher({ state, setState }: SubCipherProps<'railfence'>) {
  const { ciphertext, rails } = state;
  const decrypted = railFenceDecrypt(ciphertext, rails);

  const handleStateChange = (newState: Partial<CipherState['other']['railfence']>) => {
    setState((prev) => ({
      ...prev,
      other: { ...prev.other, railfence: { ...prev.other.railfence, ...newState } }
    }));
  };

  return (
    <div className="space-y-4">
      <div>
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Количество рельсов: {rails}
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={rails}
          onChange={(e) => handleStateChange({ rails: Number(e.target.value) })}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
        />
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">О шифре Rail Fence</h4>
        <p className="text-sm text-slate-300">
          Текст записывается <strong className="text-yellow-400">зигзагом</strong> по нескольким рельсам, затем читается построчно.
          Для взлома попробуйте разное количество рельсов (обычно 2-5).
        </p>
      </div>
    </div>
  );
}

function AffineCipher({ state, setState }: SubCipherProps<'affine'>) {
  const { ciphertext, a, b } = state;
  const validAValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  const decrypted = affineDecrypt(ciphertext, a, b);

  const handleStateChange = (newState: Partial<CipherState['other']['affine']>) => {
    setState((prev) => ({ ...prev, other: { ...prev.other, affine: { ...prev.other.affine, ...newState } } }));
  };

  return (
    <div className="space-y-4">
      <div>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Параметр a: {a}
          </label>
          <select
            value={a}
            onChange={(e) => handleStateChange({ a: Number(e.target.value) })}
            className="w-full px-4 py-2 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-200"
          >
            {validAValues.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">Должно быть взаимно просто с 26</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Параметр b: {b}
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={b}
            onChange={(e) => handleStateChange({ b: Number(e.target.value) })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
          />
        </div>
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">Об аффинном шифре</h4>
        <p className="text-sm text-slate-300">
          Формула: <strong className="text-yellow-400">E(x) = (ax + b) mod 26</strong>. Параметр 'a' должен быть взаимно прост с 26.
          Комбинирует умножение и сдвиг для более сложной замены.
        </p>
      </div>
    </div>
  );
}

function ROT13Cipher({ state, setState }: SubCipherProps<'rot13'>) {
  const { text } = state;
  const rot13 = (str: string) => {
    return str.replace(/[A-Z]/g, (char) => {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65);
    });
  };
  const result = rot13(text);

  const handleTextChange = (newText: string) => {
    setState((prev) => ({ ...prev, other: { ...prev.other, rot13: { text: newText } } }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Текст
        </label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value.toUpperCase())}
          placeholder="Введите текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-vertical font-mono text-sm text-slate-200"
        />
      </div>

      {text && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Результат (ROT13)
          </label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">О ROT13</h4>
        <p className="text-sm text-slate-300">
          <strong className="text-yellow-400">ROT13</strong> - это шифр Цезаря со сдвигом 13. Особенность: шифрование и дешифрование
          идентичны (применение ROT13 дважды возвращает исходный текст). Часто использовался
          в форумах для скрытия спойлеров.
        </p>
      </div>
    </div>
  );
}

function PlayfairCipher({ state, setState }: SubCipherProps<'playfair'>) {
  const { ciphertext, key } = state;
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleStateChange = (newState: Partial<CipherState['other']['playfair']>) => {
    setState((prev) => ({
      ...prev,
      other: { ...prev.other, playfair: { ...prev.other.playfair, ...newState } }
    }));
  };

  const result = playfairCipher(ciphertext, key, mode);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <textarea
          value={ciphertext}
          onChange={(e) => handleStateChange({ ciphertext: e.target.value })}
          placeholder="Текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-vertical font-mono text-sm text-slate-200 col-span-2"
        />
        <input
          type="text"
          value={key}
          onChange={(e) => handleStateChange({ key: e.target.value })}
          placeholder="Ключ..."
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all font-mono text-sm text-slate-200 col-span-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('encrypt')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            mode === 'encrypt' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Шифрование
        </button>
        <button
          onClick={() => setMode('decrypt')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            mode === 'decrypt' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Дешифрование
        </button>
      </div>

      {result && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Результат:</label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">О шифре Плейфера</h4>
        <p className="text-sm text-slate-300 mb-2">
          Использует <strong className="text-yellow-400">таблицу 5×5</strong>, заполненную ключевым словом и оставшимися буквами алфавита.
          Шифрует пары букв (<strong className="text-yellow-400">биграммы</strong>).
        </p>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• <strong className="text-yellow-400">I</strong> и <strong className="text-yellow-400">J</strong> считаются одной буквой</li>
          <li>• Если буквы в паре одинаковые, вставляется <strong className="text-yellow-400">X</strong></li>
          <li>• Правила замены зависят от позиций букв в таблице</li>
        </ul>
      </div>
    </div>
  );
}

function PolybiusCipher({ state, setState }: SubCipherProps<'polybius'>) {
  const { ciphertext } = state;

  const handleTextChange = (newText: string) => {
    setState((prev) => ({ ...prev, other: { ...prev.other, polybius: { ciphertext: newText } } }));
  };

  const POLYBIUS_SQUARE = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ];

  const decrypt = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let result = '';

    for (let i = 0; i < cleaned.length - 1; i += 2) {
      const row = parseInt(cleaned[i]) - 1;
      const col = parseInt(cleaned[i + 1]) - 1;

      if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        result += POLYBIUS_SQUARE[row][col];
      }
    }

    return result;
  };

  const decrypted = decrypt(ciphertext);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Зашифрованный текст (пары цифр)
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Например: 11 42 31 51 15..."
          rows={4}
          className="w-full px-4 py-3 border-2 bg-slate-800 border-slate-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all resize-vertical font-mono text-sm text-slate-200"
        />
      </div>

      <div className="bg-slate-700 p-4 rounded-lg border-2 border-slate-600">
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Таблица Полибия</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-slate-600 p-2 bg-slate-800 font-mono text-sm"></th>
                {[1, 2, 3, 4, 5].map((col) => (
                  <th key={col} className="border border-slate-600 p-2 bg-slate-800 font-mono text-sm">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POLYBIUS_SQUARE.map((row, i) => (
                <tr key={i}>
                  <th className="border border-slate-600 p-2 bg-slate-800 font-mono text-sm">
                    {i + 1}
                  </th>
                  {row.map((letter, j) => (
                    <td
                      key={j}
                      className="border border-slate-600 p-2 text-center font-mono font-bold"
                    >
                      {letter}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          <strong className="text-yellow-400">J</strong> объединена с <strong className="text-yellow-400">I</strong>. Каждая буква кодируется парой цифр (ряд, колонка).
        </p>
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-slate-700 p-4 rounded-lg border-2 border-slate-600 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">О квадрате Полибия</h4>
        <p className="text-sm text-slate-300">
          Древнегреческий шифр, где каждая буква заменяется на пару чисел (координаты в <strong className="text-yellow-400">таблице 5×5</strong>).
          Например, <strong className="text-yellow-400">H = 23</strong> (ряд 2, колонка 3).
        </p>
      </div>
    </div>
  );
}
