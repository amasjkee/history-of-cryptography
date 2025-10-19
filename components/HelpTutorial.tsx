"use client"

import { HelpCircle, BookOpen, Lightbulb, Target, Zap } from "lucide-react"

export default function HelpTutorial() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold">Помощь и руководство</h2>
        </div>
        <p className="text-muted-foreground">Узнайте, как эффективно использовать инструменты для дешифровки</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Начало работы</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">1. Выберите тип шифра</h4>
              <p className="text-muted-foreground">
                Используйте вкладки в верхней части страницы для выбора нужного шифра.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">2. Введите зашифрованный текст</h4>
              <p className="text-muted-foreground">Вставьте или введите текст, который нужно расшифровать.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">3. Используйте инструменты</h4>
              <p className="text-muted-foreground">
                Применяйте частотный анализ, подстановки и другие методы для расшифровки.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Советы по дешифровке</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Начните с частотного анализа для простых шифров замены</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Ищите короткие слова (1-3 буквы) - их легче угадать</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Обращайте внимание на двойные буквы и паттерны</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Используйте раздел "Теория" для справки по частотам</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Для Виженера определите длину ключа с помощью теста Касиски</span>
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Типы шифров</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Моноалфавитные</h4>
              <p className="text-muted-foreground">
                Каждая буква заменяется одной и той же буквой (Цезарь, простая замена, Атбаш).
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Полиалфавитные</h4>
              <p className="text-muted-foreground">Одна буква может заменяться разными буквами (Виженер, Альберти).</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Транспозиционные</h4>
              <p className="text-muted-foreground">
                Буквы переставляются, но не заменяются (Железнодорожная изгородь).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Быстрые действия</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Экспорт/Импорт</h4>
              <p className="text-muted-foreground">
                Сохраняйте свой прогресс и делитесь им с помощью кнопок в правом верхнем углу.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Темная/Светлая тема</h4>
              <p className="text-muted-foreground">Переключайте тему для комфортной работы в любое время суток.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Практические задачи</h4>
              <p className="text-muted-foreground">Проверьте свои навыки в разделе "Задачи" и зарабатывайте очки.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-xl border border-primary/20 p-6">
        <h3 className="text-xl font-bold mb-3">Методология дешифровки</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold mb-2 text-primary">Шаг 1: Анализ</div>
            <p className="text-muted-foreground">
              Изучите зашифрованный текст, определите длину, найдите паттерны и повторения.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2 text-primary">Шаг 2: Гипотеза</div>
            <p className="text-muted-foreground">
              Сформулируйте предположения о типе шифра и возможных заменах на основе частотного анализа.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2 text-primary">Шаг 3: Проверка</div>
            <p className="text-muted-foreground">
              Применяйте подстановки, проверяйте результаты и корректируйте гипотезы до получения читаемого текста.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
