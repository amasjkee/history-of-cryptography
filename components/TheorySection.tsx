import { BookOpen, TrendingUp, Key, Shuffle } from 'lucide-react';

export default function TheorySection() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">База знаний по криптоанализу</h2>
        </div>
        <p className="text-muted-foreground">
          Справочная информация для успешной расшифровки классических шифров
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Частота букв (Англ.)</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>E: 12.70%</li>
            <li>T: 9.06%</li>
            <li>A: 8.17%</li>
            <li>O: 7.51%</li>
            <li>I: 6.97%</li>
            <li>N: 6.75%</li>
            <li>S: 6.33%</li>
            <li>H: 6.09%</li>
            <li>R: 5.99%</li>
            <li>D: 4.25%</li>
            <li>L: 4.03%</li>
            <li>C: 2.78%</li>
            <li>U: 2.76%</li>
          </ul>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Биграммы (Англ.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">TH, HE, IN, ER, AN, RE, ON, AT, EN, ND, TI, ES, OR, TE, OF, ED, IS, IT, AL, AR</strong></p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Триграммы (Англ.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">THE, AND, ING, ENT, ION, HER, FOR, THA, NTH, INT, ERE, TIO, TER, EST, ERS</strong></p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Короткие слова (Англ.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">THE, BE, TO, OF, AND, A, IN, THAT, HAVE, I, IT, FOR, NOT, ON, WITH, HE, AS, YOU, DO, AT, THIS, BUT, HIS, BY, FROM, THEY, WE, SAY, HER, SHE</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Частота букв (Рус.)</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>О: 10.98%</li>
            <li>Е: 8.45%</li>
            <li>А: 8.01%</li>
            <li>И: 7.35%</li>
            <li>Н: 6.70%</li>
            <li>Т: 6.26%</li>
            <li>С: 5.47%</li>
            <li>Р: 4.73%</li>
            <li>В: 4.54%</li>
            <li>Л: 4.40%</li>
            <li>К: 3.49%</li>
            <li>М: 3.21%</li>
            <li>Д: 2.98%</li>
          </ul>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Биграммы (Рус.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">СТ, НО, ЕН, ТО, НА, ОВ, ПР, РО, ПО, ЕР, КО, РА, НЕ, ТА, ТЬ, АН, ОС, ВО, ОР, ЛО</strong></p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Триграммы (Рус.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">СТО, ЕНО, НИЕ, ОВА, ТЕЛ, ОСТ, ПРО, ОВО, СТА, НОВ, ПРИ, ТОР, КОТ, ПОЛ, ОГО</strong></p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Короткие слова (Рус.)</h3>
          <p className="text-sm text-muted-foreground"><strong className="text-primary">В, И, НЕ, НА, Я, ЧТО, ОН, С, А, ТО, ЭТО, ОНА, ПО, ВСЕ, ТЫ, ОНИ, НО, ТАК, ДА, ЕГО, ОТ, ДЛЯ, К, БЫ, КАК, МЫ, ЕЩЕ, У, ВЫ, ЗА</strong></p>
        </div>
      </div>



      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Лингвистические правила</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Английский язык</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong className="text-primary">Q</strong> почти всегда сопровождается <strong className="text-primary">U</strong> (в 99% случаев)</li>
              <li>Распространенные двойные буквы: <strong className="text-primary">LL, SS, EE, OO, TT, FF, RR, NN, PP, CC</strong></li>
              <li>Самое распространенное слово: <strong className="text-primary">THE</strong> (7% всех слов)</li>
              <li>Распространенные окончания слов: <strong className="text-primary">-ING, -ED, -TION, -ER, -LY, -EST</strong></li>
              <li><strong className="text-primary">E</strong> часто встречается в конце слов</li>
              <li>Однобуквенные слова: обычно <strong className="text-primary">A</strong> или <strong className="text-primary">I</strong></li>
              <li>Распространенные 2-буквенные слова: <strong className="text-primary">OF, TO, IN, IT, IS, BE, AS, AT, SO, WE, HE, BY, OR, ON, DO, IF, ME, MY</strong></li>
              <li>Распространенные 3-буквенные слова: <strong className="text-primary">THE, AND, FOR, ARE, BUT, NOT, YOU, ALL, CAN, HER, WAS, ONE, OUR, OUT, DAY</strong></li>
              <li>Гласные (<strong className="text-primary">A, E, I, O, U</strong>) составляют ~40% текста</li>
              <li>Слова редко заканчиваются на: <strong className="text-primary">J, K, Q, V, X, Z</strong></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Русский язык</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Ъ</strong> появляется редко, обычно между согласными</li>
              <li>Частые двойные буквы: <strong className="text-foreground">СС, НН, ЛЛ, ММ, РР, ТТ</strong></li>
              <li>Самое частое слово: <strong className="text-foreground">В</strong> (предлог)</li>
              <li>Частые окончания слов: <strong className="text-foreground">-ОГО, -ЕГО, -ОМУ, -ЕМУ, -ТЬ, -СЯ</strong></li>
              <li>Мягкий знак <strong className="text-foreground">Ь</strong> часто появляется в конце слов</li>
              <li>Однобуквенные слова: <strong className="text-foreground">В, И, С, К, О, У, Я</strong></li>
              <li>Частые 2-буквенные слова: <strong className="text-foreground">НЕ, НА, ТО, ТЫ, ОН, ЗА, МЫ, ТЕ, ВЫ, ОБ, ЕЩЕ, ОТ, ПО</strong></li>
              <li>Частые 3-буквенные слова: <strong className="text-foreground">ЧТО, ЭТО, ВСЕ, ОНА, ОНИ, ДЛЯ, ЕГО, МОЙ, ТАК, КАК, БЫЛ, ПРИ</strong></li>
              <li>Гласные (<strong className="text-foreground">А, Е, И, О, У, Ы, Э, Ю, Я</strong>) составляют ~42% текста</li>
              <li><strong className="text-foreground">Й</strong> появляется в основном в конце слов или после гласных</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Общие принципы криптоанализа</h3>
        <div className="space-y-4">
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">1. <strong className="text-primary">Частотный анализ</strong></h4>
            <p className="text-sm text-muted-foreground">
              Самый мощный инструмент для простых шифров замены. Сравните частоты букв в зашифрованном тексте с эталонными частотами языка. Самая частая буква в английском тексте - скорее всего E, в русском - О.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">2. <strong className="text-primary">Поиск паттернов</strong></h4>
            <p className="text-sm text-muted-foreground">
              Ищите повторяющиеся последовательности. Короткие слова (1-3 буквы) легко угадать. Двойные буквы часто указывают на LL, SS, EE, OO в английском или СС, НН в русском.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">3. <strong className="text-primary">Структура слов</strong></h4>
            <p className="text-sm text-muted-foreground">
              Используйте знания о структуре языка. В английском Q почти всегда идет с U. Обращайте внимание на окончания слов (-ING, -ED, -TION в английском).
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">4. <strong className="text-primary">Метод подстановки</strong></h4>
            <p className="text-sm text-muted-foreground">
              Начните с наиболее вероятных замен и проверяйте гипотезы. Если замена создает невозможные комбинации букв (например, три согласные подряд в необычном месте), попробуйте другой вариант.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">5. <strong className="text-primary">Определение типа шифра</strong></h4>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Индекс совпадений</strong> помогает определить тип шифра. Высокий индекс (≈0.065) указывает на <strong className="text-foreground">моноалфавитный шифр</strong> (простая замена, Цезарь). Низкий (≈0.038) - на <strong className="text-foreground">полиалфавитный</strong> (Виженер).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}