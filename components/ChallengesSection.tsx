"use client"

import { useState } from "react"
import { Trophy, CheckCircle2, XCircle, Lightbulb } from "lucide-react"

interface Challenge {
  id: string
  title: string
  difficulty: "easy" | "medium" | "hard"
  cipherType: string
  ciphertext: string
  hint: string
  solution: string
  points: number
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Послание Цезаря",
    difficulty: "easy",
    cipherType: "Шифр Цезаря",
    ciphertext: "KHOOR ZRUOG",
    hint: "Попробуйте сдвиг 3",
    solution: "HELLO WORLD",
    points: 10,
  },
  {
    id: "2",
    title: "Секретное сообщение",
    difficulty: "easy",
    cipherType: "Простая замена",
    ciphertext: "MJQQT BTWQI",
    hint: "H=E, самая частая буква",
    solution: "HELLO WORLD",
    points: 15,
  },
  {
    id: "3",
    title: "Зеркальный текст",
    difficulty: "easy",
    cipherType: "Атбаш",
    ciphertext: "SVOOL DLIOW",
    hint: "A↔Z, B↔Y, C↔X...",
    solution: "HELLO WORLD",
    points: 10,
  },
  {
    id: "4",
    title: "Ключевое слово",
    difficulty: "medium",
    cipherType: "Виженер",
    ciphertext: "RIJVS UYVJN",
    hint: "Ключ: KEY",
    solution: "HELLO WORLD",
    points: 25,
  },
  {
    id: "5",
    title: "Военный шифр",
    difficulty: "medium",
    cipherType: "Простая замена",
    ciphertext: "WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ",
    hint: "Используйте частотный анализ",
    solution: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
    points: 30,
  },
  {
    id: "6",
    title: "Сложный Виженер",
    difficulty: "hard",
    cipherType: "Виженер",
    ciphertext: "LXFOPVEFRNHR",
    hint: "Ключ длиной 6 букв, начинается с C",
    solution: "ATTACKATDAWN",
    points: 50,
  },
]

export default function ChallengesSection() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({})
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set())

  const handleCheck = (challengeId: string, solution: string) => {
    const userAnswer = userAnswers[challengeId]?.toUpperCase().replace(/\s+/g, " ").trim()
    const correctAnswer = solution.toUpperCase().replace(/\s+/g, " ").trim()
    const isCorrect = userAnswer === correctAnswer

    setCheckedAnswers({ ...checkedAnswers, [challengeId]: isCorrect })

    if (isCorrect) {
      setSolvedChallenges(new Set([...solvedChallenges, challengeId]))
    }
  }

  const toggleHint = (challengeId: string) => {
    setShowHints({ ...showHints, [challengeId]: !showHints[challengeId] })
  }

  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0)
  const earnedPoints = Array.from(solvedChallenges).reduce((sum, id) => {
    const challenge = challenges.find((c) => c.id === id)
    return sum + (challenge?.points || 0)
  }, 0)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "hard":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Практические задачи</h2>
              <p className="text-sm text-muted-foreground">Проверьте свои навыки дешифровки</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{earnedPoints}</div>
            <div className="text-sm text-muted-foreground">из {totalPoints} очков</div>
          </div>
        </div>

        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(earnedPoints / totalPoints) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {challenges.map((challenge) => {
          const isSolved = solvedChallenges.has(challenge.id)
          const isChecked = checkedAnswers[challenge.id] !== undefined
          const isCorrect = checkedAnswers[challenge.id]

          return (
            <div
              key={challenge.id}
              className={`bg-card rounded-xl shadow-sm border p-6 transition-all ${
                isSolved ? "border-green-500/50 bg-green-500/5" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                    {isSolved && <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty === "easy"
                        ? "Легко"
                        : challenge.difficulty === "medium"
                          ? "Средне"
                          : "Сложно"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                      {challenge.cipherType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {challenge.points} очков
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Зашифрованный текст</label>
                  <div className="bg-secondary/50 rounded-lg p-4 font-mono text-lg">{challenge.ciphertext}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ваш ответ</label>
                  <input
                    type="text"
                    value={userAnswers[challenge.id] || ""}
                    onChange={(e) => setUserAnswers({ ...userAnswers, [challenge.id]: e.target.value })}
                    disabled={isSolved}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    placeholder="Введите расшифрованный текст..."
                  />
                </div>

                {showHints[challenge.id] && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">Подсказка</div>
                        <div className="text-sm">{challenge.hint}</div>
                      </div>
                    </div>
                  </div>
                )}

                {isChecked && (
                  <div
                    className={`rounded-lg p-4 ${isCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            Правильно! +{challenge.points} очков
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            Неправильно. Попробуйте еще раз!
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCheck(challenge.id, challenge.solution)}
                    disabled={isSolved || !userAnswers[challenge.id]}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Проверить
                  </button>
                  <button
                    onClick={() => toggleHint(challenge.id)}
                    disabled={isSolved}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {showHints[challenge.id] ? "Скрыть подсказку" : "Показать подсказку"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
