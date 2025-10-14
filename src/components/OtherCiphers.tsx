import { useState } from 'react';
import { atbashCipher, railFenceDecrypt, affineDecrypt } from '../utils/cipherUtils';

type CipherTab = 'atbash' | 'railfence' | 'affine' | 'rot13' | 'playfair' | 'polybius';

export default function OtherCiphers() {
  const [activeTab, setActiveTab] = useState<CipherTab>('atbash');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'atbash' && <AtbashCipher />}
        {activeTab === 'railfence' && <RailFenceCipher />}
        {activeTab === 'affine' && <AffineCipher />}
        {activeTab === 'rot13' && <ROT13Cipher />}
        {activeTab === 'playfair' && <PlayfairCipher />}
        {activeTab === 'polybius' && <PolybiusCipher />}
      </div>
    </div>
  );
}

function AtbashCipher() {
  const [text, setText] = useState('');
  const result = atbashCipher(text);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Текст
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          placeholder="Введите текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical font-mono text-sm"
        />
      </div>

      {text && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Результат (Атбаш)
          </label>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Об Атбаше</h4>
        <p className="text-sm text-blue-800">
          Простейший шифр замены: первая буква алфавита меняется на последнюю (A↔Z),
          вторая на предпоследнюю (B↔Y) и т.д. Шифрование и дешифрование идентичны.
        </p>
      </div>
    </div>
  );
}

function RailFenceCipher() {
  const [ciphertext, setCiphertext] = useState('');
  const [rails, setRails] = useState(3);

  const decrypted = railFenceDecrypt(ciphertext, rails);

  return (
    <div className="space-y-4">
      <div>
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Количество рельсов: {rails}
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={rails}
          onChange={(e) => setRails(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">О шифре Rail Fence</h4>
        <p className="text-sm text-blue-800">
          Текст записывается зигзагом по нескольким рельсам, затем читается построчно.
          Для взлома попробуйте разное количество рельсов (обычно 2-5).
        </p>
      </div>
    </div>
  );
}

function AffineCipher() {
  const [ciphertext, setCiphertext] = useState('');
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);

  const validAValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  const decrypted = affineDecrypt(ciphertext, a, b);

  return (
    <div className="space-y-4">
      <div>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Параметр a: {a}
          </label>
          <select
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
          >
            {validAValues.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-600 mt-1">Должно быть взаимно просто с 26</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Параметр b: {b}
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Об аффинном шифре</h4>
        <p className="text-sm text-blue-800">
          Формула: E(x) = (ax + b) mod 26. Параметр 'a' должен быть взаимно прост с 26.
          Комбинирует умножение и сдвиг для более сложной замены.
        </p>
      </div>
    </div>
  );
}

function ROT13Cipher() {
  const [text, setText] = useState('');

  const rot13 = (str: string) => {
    return str.replace(/[A-Z]/g, (char) => {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65);
    });
  };

  const result = rot13(text);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Текст
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          placeholder="Введите текст..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical font-mono text-sm"
        />
      </div>

      {text && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Результат (ROT13)
          </label>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">О ROT13</h4>
        <p className="text-sm text-blue-800">
          ROT13 - это шифр Цезаря со сдвигом 13. Особенность: шифрование и дешифрование
          идентичны (применение ROT13 дважды возвращает исходный текст). Часто использовался
          в форумах для скрытия спойлеров.
        </p>
      </div>
    </div>
  );
}

function PlayfairCipher() {
  const [ciphertext] = useState('');
  const [key] = useState('');

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">В разработке</h4>
        <p className="text-sm text-yellow-800">
          Шифр Плейфера будет добавлен в следующей версии. Пока используйте онлайн инструменты
          или ручную расшифровку с таблицей 5×5.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">О шифре Плейфера</h4>
        <p className="text-sm text-blue-800 mb-2">
          Использует таблицу 5×5, заполненную ключевым словом и оставшимися буквами алфавита.
          Шифрует пары букв (биграммы).
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• I и J считаются одной буквой</li>
          <li>• Если буквы в паре одинаковые, вставляется X</li>
          <li>• Правила замены зависят от позиций букв в таблице</li>
        </ul>
      </div>
    </div>
  );
}

function PolybiusCipher() {
  const [ciphertext, setCiphertext] = useState('');

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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Зашифрованный текст (пары цифр)
        </label>
        <textarea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          placeholder="Например: 11 42 31 51 15..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-vertical font-mono text-sm"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Таблица Полибия</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-200 font-mono text-sm"></th>
                {[1, 2, 3, 4, 5].map((col) => (
                  <th key={col} className="border border-gray-300 p-2 bg-gray-200 font-mono text-sm">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POLYBIUS_SQUARE.map((row, i) => (
                <tr key={i}>
                  <th className="border border-gray-300 p-2 bg-gray-200 font-mono text-sm">
                    {i + 1}
                  </th>
                  {row.map((letter, j) => (
                    <td
                      key={j}
                      className="border border-gray-300 p-2 text-center font-mono font-bold"
                    >
                      {letter}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          J объединена с I. Каждая буква кодируется парой цифр (ряд, колонка).
        </p>
      </div>

      {ciphertext && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Расшифрованный текст
          </label>
          <pre className="font-mono text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 whitespace-pre-wrap break-words">
            {decrypted}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">О квадрате Полибия</h4>
        <p className="text-sm text-blue-800">
          Древнегреческий шифр, где каждая буква заменяется на пару чисел (координаты в таблице 5×5).
          Например, H = 23 (ряд 2, колонка 3).
        </p>
      </div>
    </div>
  );
}
