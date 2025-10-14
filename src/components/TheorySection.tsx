import { Lock, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { englishStats, russianStats, languageRules } from '../data/languageStats';

export default function TheorySection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-2xl font-bold">База знаний по криптоанализу</h2>
        </div>
        <p className="text-blue-100">
          Справочная информация для успешной расшифровки классических шифров
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Частота букв в английском языке</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(englishStats.letterFrequencies)
            .slice(0, 13)
            .map(([letter, freq]) => (
              <div key={letter} className="flex items-center gap-3">
                <span className="font-mono font-bold text-lg w-8">{letter}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-green-500 h-6 rounded-full transition-all"
                    style={{ width: `${(freq / 13) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                    {freq.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Самые частые биграммы</h4>
            <div className="flex flex-wrap gap-2">
              {englishStats.commonBigrams.slice(0, 20).map((bigram) => (
                <span
                  key={bigram}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded font-mono text-sm font-bold"
                >
                  {bigram}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Самые частые триграммы</h4>
            <div className="flex flex-wrap gap-2">
              {englishStats.commonTrigrams.slice(0, 15).map((trigram) => (
                <span
                  key={trigram}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-mono text-sm font-bold"
                >
                  {trigram}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">Частые короткие слова</h4>
          <div className="flex flex-wrap gap-2">
            {englishStats.commonWords.slice(0, 30).map((word) => (
              <span
                key={word}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-mono text-xs font-bold"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">Частота букв в русском языке</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(russianStats.letterFrequencies)
            .slice(0, 13)
            .map(([letter, freq]) => (
              <div key={letter} className="flex items-center gap-3">
                <span className="font-mono font-bold text-lg w-8">{letter}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-blue-500 h-6 rounded-full transition-all"
                    style={{ width: `${(freq / 11) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                    {freq.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Самые частые биграммы</h4>
            <div className="flex flex-wrap gap-2">
              {russianStats.commonBigrams.slice(0, 20).map((bigram) => (
                <span
                  key={bigram}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-mono text-sm font-bold"
                >
                  {bigram}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Самые частые триграммы</h4>
            <div className="flex flex-wrap gap-2">
              {russianStats.commonTrigrams.slice(0, 15).map((trigram) => (
                <span
                  key={trigram}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded font-mono text-sm font-bold"
                >
                  {trigram}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">Частые короткие слова</h4>
          <div className="flex flex-wrap gap-2">
            {russianStats.commonWords.slice(0, 30).map((word) => (
              <span
                key={word}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-mono text-xs font-bold"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-800">Лингвистические правила</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Английский язык
            </h4>
            <ul className="space-y-2">
              {languageRules.english.map((rule, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Русский язык
            </h4>
            <ul className="space-y-2">
              {languageRules.russian.map((rule, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-gray-800">Общие принципы криптоанализа</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">1. Частотный анализ</h4>
            <p className="text-sm text-red-800">
              Самый мощный инструмент для простых шифров замены. Сравните частоты букв в
              зашифрованном тексте с эталонными частотами языка. Самая частая буква в английском
              тексте - скорее всего E, в русском - О.
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">2. Поиск паттернов</h4>
            <p className="text-sm text-orange-800">
              Ищите повторяющиеся последовательности. Короткие слова (1-3 буквы) легко угадать.
              Двойные буквы часто указывают на LL, SS, EE, OO в английском или СС, НН в русском.
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">3. Структура слов</h4>
            <p className="text-sm text-yellow-800">
              Используйте знания о структуре языка. В английском Q почти всегда идет с U.
              Обращайте внимание на окончания слов (-ING, -ED, -TION в английском).
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">4. Метод подстановки</h4>
            <p className="text-sm text-green-800">
              Начните с наиболее вероятных замен и проверяйте гипотезы. Если замена создает
              невозможные комбинации букв (например, три согласные подряд в необычном месте),
              попробуйте другой вариант.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">5. Определение типа шифра</h4>
            <p className="text-sm text-blue-800">
              Индекс совпадений помогает определить тип шифра. Высокий индекс (≈0.065) указывает
              на моноалфавитный шифр (простая замена, Цезарь). Низкий (≈0.038) - на
              полиалфавитный (Виженер).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
