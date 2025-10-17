"use client"

import { useState } from "react"
import { BarChart3, Shield, Clock, Zap } from "lucide-react"

interface CipherInfo {
  name: string
  type: string
  security: number
  speed: number
  complexity: number
  keySpace: string
  strengths: string[]
  weaknesses: string[]
  useCases: string[]
}

const ciphers: CipherInfo[] = [
  {
    name: "Шифр Цезаря",
    type: "Моноалфавитная замена",
    security: 1,
    speed: 5,
    complexity: 1,
    keySpace: "25 (только сдвиг)",
    strengths: ["Очень простой", "Быстрый", "Легко понять"],
    weaknesses: ["Легко взломать", "Малое ключевое пространство", "Уязвим к частотному анализу"],
    useCases: ["Обучение", "Простые головоломки"],
  },
  {
    name: "Простая замена",
    type: "Моноалфавитная замена",
    security: 2,
    speed: 4,
    complexity: 2,
    keySpace: "26! ≈ 4×10²⁶",
    strengths: ["Большое ключевое пространство", "Простая реализация"],
    weaknesses: ["Уязвим к частотному анализу", "Сохраняет паттерны языка"],
    useCases: ["Головоломки", "Базовое шифрование"],
  },
  {
    name: "Шифр Виженера",
    type: "Полиалфавитная замена",
    security: 4,
    speed: 3,
    complexity: 3,
    keySpace: "Зависит от длины ключа",
    strengths: ["Устойчив к простому частотному анализу", "Гибкая длина ключа"],
    weaknesses: ["Уязвим к тесту Касиски", "Требует безопасного обмена ключами"],
    useCases: ["Исторические военные коммуникации", "Средний уровень безопасности"],
  },
  {
    name: "Диск Альберти",
    type: "Полиалфавитная замена",
    security: 4,
    speed: 2,
    complexity: 4,
    keySpace: "Зависит от настроек",
    strengths: ["Первый полиалфавитный шифр", "Механическая реализация"],
    weaknesses: ["Медленный вручную", "Сложная настройка"],
    useCases: ["Историческое значение", "Обучение концепциям"],
  },
  {
    name: "Шифр Плейфера",
    type: "Биграммная замена",
    security: 3,
    speed: 3,
    complexity: 3,
    keySpace: "25! / 2",
    strengths: ["Шифрует пары букв", "Устойчивее к частотному анализу"],
    weaknesses: ["Уязвим к известному открытому тексту", "Требует подготовки текста"],
    useCases: ["Военные коммуникации (исторически)", "Тактическое шифрование"],
  },
  {
    name: "Атбаш",
    type: "Моноалфавитная замена",
    security: 1,
    speed: 5,
    complexity: 1,
    keySpace: "1 (фиксированный)",
    strengths: ["Очень простой", "Не требует ключа"],
    weaknesses: ["Нет секретности", "Тривиально взломать"],
    useCases: ["Головоломки", "Обучение"],
  },
]

export default function ComparisonTool() {
  const [selectedCiphers, setSelectedCiphers] = useState<string[]>(["Шифр Цезаря", "Шифр Виженера"])

  const toggleCipher = (name: string) => {
    if (selectedCiphers.includes(name)) {
      setSelectedCiphers(selectedCiphers.filter((c) => c !== name))
    } else {
      setSelectedCiphers([...selectedCiphers, name])
    }
  }

  const selectedCipherData = ciphers.filter((c) => selectedCiphers.includes(c.name))

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold">Сравнение шифров</h2>
        </div>
        <p className="text-muted-foreground">Сравните характеристики различных классических шифров</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Выберите шифры для сравнения</h3>
        <div className="flex flex-wrap gap-2">
          {ciphers.map((cipher) => (
            <button
              key={cipher.name}
              onClick={() => toggleCipher(cipher.name)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCiphers.includes(cipher.name)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cipher.name}
            </button>
          ))}
        </div>
      </div>

      {selectedCipherData.length > 0 && (
        <>
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Визуальное сравнение</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">Безопасность</span>
                </div>
                <div className="space-y-2">
                  {selectedCipherData.map((cipher) => (
                    <div key={cipher.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cipher.name}</span>
                        <span className="text-muted-foreground">{cipher.security}/5</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${(cipher.security / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-medium">Скорость</span>
                </div>
                <div className="space-y-2">
                  {selectedCipherData.map((cipher) => (
                    <div key={cipher.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cipher.name}</span>
                        <span className="text-muted-foreground">{cipher.speed}/5</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-chart-2 transition-all"
                          style={{ width: `${(cipher.speed / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Сложность реализации</span>
                </div>
                <div className="space-y-2">
                  {selectedCipherData.map((cipher) => (
                    <div key={cipher.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cipher.name}</span>
                        <span className="text-muted-foreground">{cipher.complexity}/5</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-chart-3 transition-all"
                          style={{ width: `${(cipher.complexity / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCipherData.map((cipher) => (
              <div key={cipher.name} className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-xl font-bold mb-2">{cipher.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cipher.type}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Ключевое пространство</h4>
                    <p className="text-sm text-muted-foreground">{cipher.keySpace}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-400">Преимущества</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {cipher.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-600 dark:text-red-400">Недостатки</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {cipher.weaknesses.map((weakness, i) => (
                        <li key={i}>{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Применение</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {cipher.useCases.map((useCase, i) => (
                        <li key={i}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
